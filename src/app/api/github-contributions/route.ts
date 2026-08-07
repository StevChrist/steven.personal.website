import { NextResponse } from 'next/server'

export const revalidate = 3600 // Cache for 1 hour

interface DayData {
  date: string
  level: number
  text: string
  count: number
}

const GRAPHQL_LEVEL_TO_NUMBER: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

function ordinal(n: number): string {
  if (n > 3 && n < 21) return `${n}th`
  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

function dayText(date: string, count: number): string {
  const d = new Date(`${date}T00:00:00Z`)
  const month = d.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' })
  const dayNum = d.getUTCDate()
  return count === 0
    ? `No contributions on ${month} ${ordinal(dayNum)}.`
    : `${count} contribution${count > 1 ? 's' : ''} on ${month} ${ordinal(dayNum)}.`
}

/**
 * Primary source: GitHub GraphQL API with a Personal Access Token — includes
 * PRIVATE repository contributions (same source & totals as the Pen Platform
 * observability site), so the grid matches the account owner's own view.
 */
async function fetchWithToken(username: string): Promise<DayData[] | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return null

  const to = new Date()
  const from = new Date(to.getTime() - 364 * 86_400_000)
  const query = `query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'User-Agent': 'StevChrist-Personal-Website',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          login: username,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null

    const data = (await res.json()) as {
      data?: {
        user?: {
          contributionsCollection?: {
            contributionCalendar?: {
              weeks: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }[]
            }
          }
        }
      }
      errors?: { message: string }[]
    }
    if (data.errors?.length) return null

    const weeks = data.data?.user?.contributionsCollection?.contributionCalendar?.weeks
    if (!weeks?.length) return null

    return weeks
      .flatMap((w) => w.contributionDays)
      .map((day) => {
        const date = day.date.slice(0, 10)
        const count = day.contributionCount
        return {
          date,
          level: GRAPHQL_LEVEL_TO_NUMBER[day.contributionLevel] ?? 0,
          text: dayText(date, count),
          count,
        }
      })
  } catch {
    return null
  }
}

/**
 * Fallback: anonymous GitHub contribution-graph fragment (public activity
 * only). Kept so the widget still works when no token is configured or the
 * GraphQL call fails.
 */
async function fetchAnonymousFragment(username: string): Promise<DayData[] | null> {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null

    const html = await res.text()

    // Matches <td ... data-date="YYYY-MM-DD" ... data-level="L" ...>...</td>
    // followed by <tool-tip ...>TEXT</tool-tip>
    const regex = /<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>[\s\S]*?<tool-tip[^>]*>([^<]+)<\/tool-tip>/g
    const days: DayData[] = []

    let match
    while ((match = regex.exec(html)) !== null) {
      const date = match[1]
      const level = parseInt(match[2], 10) || 0
      const text = match[3].trim()

      let count = 0
      const countMatch = text.match(/^(\d+)\s+contribution/)
      if (countMatch) {
        count = parseInt(countMatch[1], 10)
      }

      days.push({ date, level, text, count })
    }

    return days.length > 0 ? days : null
  } catch {
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || 'StevChrist'

  const days = (await fetchWithToken(username)) || (await fetchAnonymousFragment(username))
  if (!days) {
    return NextResponse.json({ error: 'Failed to fetch GitHub contributions' }, { status: 502 })
  }

  return NextResponse.json(
    { username, days },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  )
}

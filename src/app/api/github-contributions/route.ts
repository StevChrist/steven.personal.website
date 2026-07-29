import { NextResponse } from 'next/server'

export const revalidate = 3600 // Cache for 1 hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || 'StevChrist'

  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch GitHub contributions' }, { status: res.status })
    }

    const html = await res.text()

    // Extract contribution day cells and tooltips
    // Pattern matches <td ... data-date="YYYY-MM-DD" ... data-level="L" ...>...</td> followed by <tool-tip ...>TEXT</tool-tip>
    const regex = /<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>[\s\S]*?<tool-tip[^>]*>([^<]+)<\/tool-tip>/g
    const days: Array<{ date: string; level: number; text: string; count: number }> = []

    let match
    while ((match = regex.exec(html)) !== null) {
      const date = match[1]
      const level = parseInt(match[2], 10) || 0
      const text = match[3].trim()

      // Parse count from text like "10 contributions on July 25th." or "No contributions on..."
      let count = 0
      const countMatch = text.match(/^(\d+)\s+contribution/)
      if (countMatch) {
        count = parseInt(countMatch[1], 10)
      }

      days.push({ date, level, text, count })
    }

    return NextResponse.json({ username, days }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error fetching github contributions:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

'use client'

import { useEffect, useState, useMemo, useRef } from 'react'

interface DayData {
  date: string
  level: number
  text: string
  count: number
}

interface GithubContributionsProps {
  username?: string
}

export default function GithubContributions({ username = 'StevChrist' }: GithubContributionsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [daysData, setDaysData] = useState<Record<string, DayData>>({})
  const [hoveredDay, setHoveredDay] = useState<{
    text: string
    x: number
    y: number
  } | null>(null)

  // Get current month date properties dynamically
  const { monthName, daysInMonth, cols, currentYearMonth } = useMemo(() => {
    const now = new Date()
    const year = now.getFullYear()
    const monthIndex = now.getMonth() // 0 - 11
    const mName = now.toLocaleString('en-US', { month: 'long' })
    const totalDays = new Date(year, monthIndex + 1, 0).getDate()
    const columns = Math.ceil(totalDays / 3) // Max 3 rows
    const yearMonth = `${year}-${String(monthIndex + 1).padStart(2, '0')}`

    return {
      monthName: mName,
      daysInMonth: totalDays,
      cols: columns,
      currentYearMonth: yearMonth,
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    async function fetchContributions() {
      try {
        const res = await fetch(`/api/github-contributions?username=${username}`)
        if (!res.ok) throw new Error('API fetch failed')
        const data = await res.json()

        if (isMounted && data.days) {
          const map: Record<string, DayData> = {}
          data.days.forEach((d: DayData) => {
            map[d.date] = d
          })
          setDaysData(map)
        }
      } catch (err) {
        console.error('Failed to load GitHub contributions:', err)
      }
    }

    fetchContributions()
    return () => {
      isMounted = false
    }
  }, [username])

  // Helper for ordinal day string
  const getOrdinal = (day: number) => {
    if (day > 3 && day < 21) return `${day}th`
    switch (day % 10) {
      case 1:
        return `${day}st`
      case 2:
        return `${day}nd`
      case 3:
        return `${day}rd`
      default:
        return `${day}th`
    }
  }

  // Calculate total monthly contributions
  const monthlyTotal = useMemo(() => {
    let sum = 0
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYearMonth}-${String(day).padStart(2, '0')}`
      if (daysData[dateStr]) {
        sum += daysData[dateStr].count
      }
    }
    return sum
  }, [daysData, daysInMonth, currentYearMonth])

  // Colors corresponding to levels
  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return '#0e4429'
      case 2:
        return '#006d32'
      case 3:
        return '#26a641'
      case 4:
        return '#39d353'
      default:
        return 'rgba(255, 255, 255, 0.08)'
    }
  }

  const handleMouseEnter = (e: React.MouseEvent, text: string) => {
    if (!containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const cellRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setHoveredDay({
      text,
      x: cellRect.left - containerRect.left + cellRect.width / 2,
      y: cellRect.top - containerRect.top - 8,
    })
  }

  const handleMouseLeave = () => {
    setHoveredDay(null)
  }

  return (
    <div ref={containerRef} className="bento-card github-card relative flex flex-col justify-between h-full">
      {/* TOP SECTION: Header with GitHub Icon & Subtitle */}
      <div>
        <h3 className="card-section-title" style={{ margin: '0 0 8px 0' }}>
          {/* GitHub SVG Icon */}
          <span style={{ fontSize: '1rem', display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>
            <svg
              style={{ width: '1rem', height: '1rem' }}
              className="text-[#00b4d8] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </span>
          <span>GITHUB CONTRIBUTIONS</span>
        </h3>

        <p style={{ fontSize: '0.74rem', margin: '0 0 8px 0' }} className="text-slate-400 font-normal">
          <strong className="font-medium text-slate-200">{monthlyTotal}</strong> contributions in {monthName}
        </p>
      </div>

      {/* MIDDLE SECTION: 3-Row Grid Container */}
      <div className="w-full my-auto py-1">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gap: '6px',
          }}
        >
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1
            const dateStr = `${currentYearMonth}-${String(dayNum).padStart(2, '0')}`
            const dayData = daysData[dateStr]

            const level = dayData ? dayData.level : 0
            const count = dayData ? dayData.count : 0
            const tooltipText = dayData
              ? dayData.text
              : count === 0
              ? `No contributions on ${monthName} ${getOrdinal(dayNum)}.`
              : `${count} contribution${count > 1 ? 's' : ''} on ${monthName} ${getOrdinal(dayNum)}.`

            const isHasContributions = level > 0

            return (
              <div
                key={dateStr}
                onMouseEnter={(e) => handleMouseEnter(e, tooltipText)}
                onMouseLeave={handleMouseLeave}
                style={{
                  backgroundColor: getLevelColor(level),
                  boxShadow:
                    level >= 3
                      ? `0 0 6px ${getLevelColor(level)}a0`
                      : 'none',
                }}
                className={`w-full aspect-square rounded-[3px] cursor-pointer transition-all duration-150 hover:scale-125 hover:z-20 ${
                  isHasContributions ? 'border border-[#39d353]/50' : 'border border-white/5'
                }`}
              />
            )
          })}
        </div>
      </div>

      {/* BOTTOM SECTION: Live Status & Profile Link (Matching fun-fact-text alignment) */}
      <div>
        <div className="fun-fact-divider"></div>
        <p className="fun-fact-text flex items-center justify-between">
          <span className="inline-flex items-center">
            <span className="live-green-dot" />
            <span style={{ fontSize: '0.72rem', fontWeight: 500 }} className="text-slate-300">
              Live Activity
            </span>
          </span>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00b4d8] hover:underline flex items-center gap-1"
            style={{ textDecoration: 'none', fontSize: '0.72rem' }}
          >
            <span>@{username}</span>
            <span style={{ fontSize: '9px' }}>↗</span>
          </a>
        </p>
      </div>

      {/* Floating Tooltip */}
      {hoveredDay && (
        <div
          style={{
            position: 'absolute',
            left: `${hoveredDay.x}px`,
            top: `${hoveredDay.y}px`,
            transform: 'translate(-50%, -100%)',
            zIndex: 50,
          }}
          className="pointer-events-none px-2.5 py-1 rounded bg-[#09152b] text-white text-[11px] font-medium border border-[#00b4d8]/50 shadow-2xl backdrop-blur-md whitespace-nowrap animate-fade-in"
        >
          {hoveredDay.text}
        </div>
      )}
    </div>
  )
}

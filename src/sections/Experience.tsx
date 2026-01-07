'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedText from '@/components/AnimatedText'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

type ExperienceItem = {
  date: string
  company: string
  location: string
  role: string
  bullets: string[]
}

const Experience = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  useScrollAnimations(sectionRef)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const experiences: ExperienceItem[] = [
    {
      date: 'Jul 2025 - Aug 2025',
      company: 'PT Prasetia Dwidhama',
      location: 'Jakarta, Indonesia',
      role: 'Data Analyst & Data Engineer Intern',
      bullets: [
        'Managed and maintained company databases using PostgreSQL to support daily operations and data migration projects.',
        'Extracted and prepared datasets with SQL queries, structuring outputs in Excel for migration to ERP systems.',
        'Performed data cleaning and validation to resolve null values, duplicates, and inconsistencies, ensuring data accuracy and readiness.',
        'Conducted cross-checks between PostgreSQL, Excel, and ERP/Odoo to verify consistency across different systems.',
        'Supported the IT team in database operations and created documentation for data preparation and validation workflows.',
      ],
    },
  ]

  const getTitleSize = () => {
    if (screenWidth >= 2560) return '80px'
    if (screenWidth >= 1920) return '75px'
    if (screenWidth >= 1536) return '70px'
    if (screenWidth >= 1280) return '70px'
    if (screenWidth >= 1024) return '65px'
    if (screenWidth >= 800) return '50px'
    if (screenWidth >= 768) return '55px'
    if (screenWidth >= 640) return '45px'
    if (screenWidth >= 568) return '32px'
    return '28px'
  }

  const getTitleMargin = () => {
    if (screenWidth >= 2560) return '60px'
    if (screenWidth >= 1920) return '55px'
    if (screenWidth >= 1536) return '50px'
    if (screenWidth >= 1280) return '50px'
    if (screenWidth >= 1024) return '45px'
    if (screenWidth >= 800) return '30px'
    if (screenWidth >= 768) return '35px'
    if (screenWidth >= 640) return '25px'
    if (screenWidth >= 568) return '18px'
    return '15px'
  }

  const getSectionPadding = () => {
    if (screenWidth >= 2560) return '60px'
    if (screenWidth >= 1920) return '55px'
    if (screenWidth >= 1536) return '50px'
    if (screenWidth >= 1280) return '50px'
    if (screenWidth >= 1024) return '45px'
    if (screenWidth >= 800) return '30px'
    if (screenWidth >= 768) return '35px'
    if (screenWidth >= 640) return '25px'
    if (screenWidth >= 568) return '15px'
    return '12px'
  }

  const getTextSize = () => {
    if (screenWidth >= 2560) return '22px'
    if (screenWidth >= 1920) return '21px'
    if (screenWidth >= 1536) return '20px'
    if (screenWidth >= 1280) return '20px'
    if (screenWidth >= 1024) return '18px'
    if (screenWidth >= 800) return '16px'
    if (screenWidth >= 768) return '17px'
    if (screenWidth >= 640) return '14px'
    if (screenWidth >= 568) return '11px'
    return '10px'
  }

  const GAP_BETWEEN_ITEMS = 34
  const DOT_SIZE = 12
  const LINE_WIDTH = 2

  const isSingle = experiences.length === 1

  const getDateColWidth = () => {
    if (screenWidth >= 1024) return 200
    if (screenWidth >= 768) return 180
    return 140
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="bg-black text-white min-h-[100vh]"
      style={{ padding: `40px ${getSectionPadding()} 0` }}
    >
      <div className="flex flex-col">
        {/* Title: center */}
        <div className="flex justify-center">
          <AnimatedText
            text="Experience_"
            className="text-center font-bold gsap-fade-up"
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: getTitleSize(),
              marginBottom: getTitleMargin(),
            }}
            delayStep={0.05}
            triggerOnce={false}
          />
        </div>

        {/* Timeline: align left */}
        <div
          className="w-full gsap-fade-up"
          style={{
            fontFamily: "'Roboto'",
            maxWidth: '1200px',
            paddingLeft: '140px',
          }}
        >
          {experiences.map((item, idx) => {
            const isLast = idx === experiences.length - 1
            const showLine = isSingle ? true : !isLast

            // FIX: no any — define style in two branches
            const lineStyleSingle: React.CSSProperties = { height: 70 }
            const lineStyleMulti: React.CSSProperties = {
              height: `calc(100% + ${GAP_BETWEEN_ITEMS}px)`,
            }

            return (
              <div
                key={`${item.company}-${item.role}-${idx}`}
                className="flex"
                style={{ paddingBottom: isLast ? 0 : GAP_BETWEEN_ITEMS }}
              >
                {/* Date */}
                <div
                  className="shrink-0"
                  style={{
                    width: getDateColWidth(),
                    fontSize: getTextSize(),
                    fontWeight: 300,
                    lineHeight: '1.6',
                    opacity: 0.95,
                    textAlign: 'left',
                  }}
                >
                  {item.date}
                </div>

                {/* Dot + line */}
                <div
                  className="relative shrink-0"
                  style={{
                    width: 34,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      borderRadius: 999,
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      marginTop: 4,
                      zIndex: 2,
                    }}
                  />

                  {showLine && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 4 + DOT_SIZE,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: LINE_WIDTH,
                        borderLeft: `${LINE_WIDTH}px dashed rgba(255,255,255,0.75)`,
                        ...(isSingle ? lineStyleSingle : lineStyleMulti),
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div style={{ fontSize: getTextSize(), lineHeight: '1.65' }}>
                    <div style={{ fontWeight: 700 }}>
                      {item.company}{' '}
                      <span style={{ fontWeight: 300, opacity: 0.75 }}>
                        - {item.location}
                      </span>
                    </div>

                    <div style={{ fontWeight: 600, marginTop: 4, opacity: 0.95 }}>
                      {item.role}
                    </div>

                    <ul style={{ marginTop: 12, paddingLeft: 18, fontWeight: 300, fontSize: '18px' }}>
                      {item.bullets.map((b, bi) => (
                        <li key={bi} style={{ marginBottom: 10 }}>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
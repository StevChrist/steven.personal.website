'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedText from '@/components/AnimatedText'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

type EducationItem = {
  date: string
  school: string
  location: string
  major: string
  bullets: string[]
}

const Education = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  useScrollAnimations(sectionRef)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const educations: EducationItem[] = [
    {
      date: 'Jul 2019 - Apr 2022',
      school: 'SMA Kristen Kalam Kudus Pematangsiantar',
      location: 'Sumatera Utara, Indonesia',
      major: 'Science Major',
      bullets: [
      ],
    },
    {
      date: 'Sep 2022 - Jan 2026',
      school: 'Universitas Telkom',
      location: 'Bandung, Indonesia',
      major: 'Bachelor of Data Science, GPA 3.67/4.00',
      bullets: [
      ],
    },
  ]

  const getTitleSize = () => {
    if (screenWidth >= 2560) return '80px'
    if (screenWidth >= 1920) return '75px'
    if (screenWidth >= 1536) return '70px'
    if (screenWidth >= 1280) return '65px'
    if (screenWidth >= 1024) return '58px' // Reduced
    if (screenWidth >= 800) return '48px' // Reduced
    if (screenWidth >= 768) return '45px' // Reduced
    if (screenWidth >= 640) return '40px' // Reduced
    if (screenWidth >= 414) return '34px'
    return '30px'
  }

  const getTitleMargin = () => {
    if (screenWidth >= 2560) return '60px'
    if (screenWidth >= 1920) return '55px'
    if (screenWidth >= 1536) return '50px'
    if (screenWidth >= 1280) return '40px'
    if (screenWidth >= 1024) return '32px' // Reduced
    if (screenWidth >= 800) return '26px' // Reduced
    if (screenWidth >= 768) return '24px' // Reduced
    if (screenWidth >= 640) return '20px' // Reduced
    if (screenWidth >= 414) return '18px'
    return '16px'
  }

  const getSectionPadding = () => {
    if (screenWidth >= 2560) return '60px'
    if (screenWidth >= 1920) return '55px'
    if (screenWidth >= 1536) return '50px'
    if (screenWidth >= 1280) return '35px'
    if (screenWidth >= 1024) return '25px' // CRITICAL: iPad landscape
    if (screenWidth >= 800) return '20px' // CRITICAL: Galaxy Tab A
    if (screenWidth >= 768) return '18px' // CRITICAL: iPad mini portrait
    if (screenWidth >= 640) return '16px'
    if (screenWidth >= 414) return '14px'
    return '10px'
  }

  const getTextSize = () => {
    if (screenWidth >= 2560) return '22px'
    if (screenWidth >= 1920) return '21px'
    if (screenWidth >= 1536) return '20px'
    if (screenWidth >= 1280) return '18px'
    if (screenWidth >= 1024) return '16px' // Reduced
    if (screenWidth >= 800) return '14px' // Reduced
    if (screenWidth >= 768) return '13px' // Reduced
    if (screenWidth >= 640) return '12px' // Reduced
    if (screenWidth >= 414) return '10px'
    return '9px'
  }

  const getBulletTextSize = () => {
    if (screenWidth >= 2560) return '20px'
    if (screenWidth >= 1920) return '19px'
    if (screenWidth >= 1536) return '18px'
    if (screenWidth >= 1280) return '16px'
    if (screenWidth >= 1024) return '14px' // Reduced
    if (screenWidth >= 800) return '13px' // Reduced
    if (screenWidth >= 768) return '12px' // Reduced
    if (screenWidth >= 640) return '11px' // Reduced
    if (screenWidth >= 414) return '9px'
    return '9px'
  }

  const getContainerPaddingLeft = () => {
    if (screenWidth >= 1536) return '100px'
    if (screenWidth >= 1280) return '60px'
    if (screenWidth >= 1024) return '35px' // CRITICAL: iPad landscape 1024x768
    if (screenWidth >= 800) return '25px' // CRITICAL: Galaxy Tab A 800x1280
    if (screenWidth >= 768) return '20px' // CRITICAL: iPad mini portrait 768x1024
    if (screenWidth >= 640) return '18px'
    if (screenWidth >= 414) return '14px'
    return '8px'
  }

  const DOT_SIZE = screenWidth >= 768 ? 11 : 9 // Reduced
  const LINE_WIDTH = 2

  const isSingle = educations.length === 1

  const getDateColWidth = () => {
    if (screenWidth >= 1536) return 180
    if (screenWidth >= 1280) return 150
    if (screenWidth >= 1024) return 120 // CRITICAL: Reduced for iPad landscape
    if (screenWidth >= 800) return 110 // CRITICAL: Reduced for Galaxy Tab A
    if (screenWidth >= 768) return 100 // CRITICAL: Reduced for iPad mini
    if (screenWidth >= 640) return 90
    if (screenWidth >= 414) return 80
    return 70
  }

  const getTimelineGap = () => {
    if (screenWidth >= 1024) return 24 // Reduced
    if (screenWidth >= 768) return 20 // Reduced
    if (screenWidth >= 414) return 16 // Reduced
    return 14
  }

  const getTimelineColumnWidth = () => {
    if (screenWidth >= 1024) return 28 // Reduced
    if (screenWidth >= 768) return 24 // Reduced
    return 18 // Reduced
  }

  return (
    <section
      ref={sectionRef}
      id="education"
      className="bg-black text-white min-h-[100vh]"
      style={{ 
        padding: `40px ${getSectionPadding()} 0`,
        overflowX: 'hidden' // Prevent horizontal scroll
      }}
    >
      <div className="flex flex-col">
        {/* Title: center */}
        <div className="flex justify-center">
          <AnimatedText
            text="Education_"
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
            paddingLeft: getContainerPaddingLeft(),
            paddingRight: getSectionPadding(),
          }}
        >
          {educations.map((item, idx) => {
            const isLast = idx === educations.length - 1
            const showLine = isSingle ? true : !isLast

            const lineStyleSingle: React.CSSProperties = { 
              height: screenWidth >= 768 ? 55 : 45 // Reduced
            }
            const lineStyleMulti: React.CSSProperties = {
              height: `calc(100% + ${getTimelineGap()}px)`,
            }

            return (
              <div
                key={`${item.school}-${item.major}-${idx}`}
                className="flex"
                style={{ 
                  paddingBottom: isLast ? 0 : getTimelineGap(),
                  gap: screenWidth >= 768 ? 0 : '4px' // Reduced
                }}
              >
                {/* Date */}
                <div
                  className="shrink-0"
                  style={{
                    width: getDateColWidth(),
                    fontSize: getTextSize(),
                    fontWeight: 300,
                    lineHeight: '1.5', // Reduced from 1.6
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
                    width: getTimelineColumnWidth(),
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
                <div className="flex-1" style={{ minWidth: 0, overflow: 'hidden' }}>
                  <div style={{ fontSize: getTextSize(), lineHeight: '1.6' }}>
                    <div style={{ fontWeight: 700 }}>
                      {item.school}{' '}
                      <span style={{ fontWeight: 300, opacity: 0.75 }}>
                        - {item.location}
                      </span>
                    </div>

                    <div style={{ fontWeight: 600, marginTop: 3, opacity: 0.95 }}>
                      {item.major}
                    </div>

                    <ul 
                      style={{ 
                        marginTop: screenWidth >= 768 ? 6 : 5, // Reduced
                        paddingLeft: screenWidth >= 768 ? 12 : 10, // Reduced
                        fontWeight: 300, 
                        fontSize: getBulletTextSize()
                      }}
                    >
                      {item.bullets.map((b, bi) => (
                        <li key={bi} style={{ marginBottom: screenWidth >= 768 ? 6 : 5 }}> {/* Reduced */}
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

export default Education

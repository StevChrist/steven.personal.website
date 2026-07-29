'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedText from '@/components/AnimatedText'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import '@/styles/educationTimeline.css'

type EducationItem = {
  id: string
  date: string
  gpa?: string
  school: string
  location: string
  degree: string
  bullets: string[]
  thesisLink?: string
  position: 'left' | 'right'
}

const Education = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  // Trigger animation when ~half of About section scrolls away (threshold: 0.35)
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.35,
  })

  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Detect scroll direction (up vs down)
  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY.current + 5) {
        setScrollDirection('down')
      } else if (currentScrollY < lastScrollY.current - 5) {
        setScrollDirection('up')
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [])

  // Order: SMA #1 (Top, Left), Telkom University #2 (Bottom, Right)
  const educations: EducationItem[] = [
    {
      id: 'sma-item',
      date: 'Jul 2019 - Apr 2022',
      school: 'SMA Kristen Kalam Kudus Pematangsiantar',
      location: 'North Sumatra, Indonesia',
      degree: 'Natural Science Major (IPA)',
      bullets: [
        'Focus on Mathematics, Physics & Computer Fundamentals',
        'Active participant in academic competitions & student activities',
      ],
      position: 'left',
    },
    {
      id: 'telkom-item',
      date: 'Sep 2022 - Jan 2026',
      gpa: 'GPA 3.67 / 4.00',
      school: 'Telkom University',
      location: 'Bandung, West Java, Indonesia',
      degree: 'Bachelor of Data Science (S.S.D.)',
      bullets: [
        'Specialization in Machine Learning, Deep Learning & Natural Language Processing (NLP)',
        'Data Warehousing & Business Intelligence Architecture (PowerBI & ETL Pipelines)',
        'Active Student Organization Committee & Technical Team Lead',
      ],
      thesisLink: '/cv/buku-ta.pdf',
      position: 'right',
    },
  ]

  // Dynamic entrance animation depending on scroll direction
  useEffect(() => {
    if (!sectionRef.current || !inView) return

    const centerLine = sectionRef.current.querySelector('.timeline-center-line')
    const smaItem = sectionRef.current.querySelector('.sma-item')
    const telkomItem = sectionRef.current.querySelector('.telkom-item')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (scrollDirection === 'down') {
      // SCROLLING DOWN: Animate from Top to Bottom
      if (centerLine) {
        tl.fromTo(
          centerLine,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, duration: 0.9, ease: 'power2.inOut' }
        )
      }

      if (smaItem) {
        tl.fromTo(
          smaItem,
          { opacity: 0, x: -50, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.2)' },
          '-=0.65'
        )
      }

      if (telkomItem) {
        tl.fromTo(
          telkomItem,
          { opacity: 0, x: 50, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.2)' },
          '-=0.45'
        )
      }
    } else {
      // SCROLLING UP: Clean Smooth Fade-In Only (No Line Growth or Card Sliding)
      if (centerLine) {
        tl.fromTo(
          centerLine,
          { opacity: 0, scaleY: 1 },
          { opacity: 1, scaleY: 1, duration: 0.6, ease: 'power2.out' }
        )
      }

      if (smaItem) {
        tl.fromTo(
          smaItem,
          { opacity: 0, x: 0, scale: 1 },
          { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.5'
        )
      }

      if (telkomItem) {
        tl.fromTo(
          telkomItem,
          { opacity: 0, x: 0, scale: 1 },
          { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.5'
        )
      }
    }
  }, [inView, scrollDirection])

  const getTitleSize = () => {
    if (screenWidth >= 2560) return '110px'
    if (screenWidth >= 1920) return '90px'
    if (screenWidth >= 1536) return '76px'
    if (screenWidth >= 1280) return '68px'
    if (screenWidth >= 1024) return '60px'
    if (screenWidth >= 768) return '52px'
    if (screenWidth >= 425) return '42px'
    if (screenWidth >= 375) return '38px'
    return '34px'
  }

  const getTitleMargin = () => {
    if (screenWidth >= 1280) return '20px'
    if (screenWidth >= 1024) return '16px'
    if (screenWidth >= 768) return '14px'
    return '10px'
  }

  return (
    <section
      ref={(el) => {
        sectionRef.current = el
        inViewRef(el)
      }}
      id="education"
      className="bg-transparent text-white min-h-screen py-20 lg:py-28 w-full flex flex-col justify-center items-center relative overflow-hidden"
      style={{
        paddingTop: '120px',
        paddingBottom: '60px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      <div className="w-full max-w-[1140px] flex flex-col items-center mx-auto relative">
        {/* Section Title Wrapper with Cyan Glow */}
        <div className="edu-title-wrapper flex justify-center items-center w-full text-center">
          <AnimatedText
            text="Education_"
            className="text-center font-bold gsap-fade-up"
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: getTitleSize(),
              marginBottom: getTitleMargin(),
              color: '#00b4d8',
              textShadow: '0 0 16px rgba(0, 180, 216, 0.8), 0 0 35px rgba(0, 136, 255, 0.5)',
            }}
            delayStep={0.05}
            triggerOnce={false}
          />
        </div>

        {/* Vertical Timeline Structure */}
        <div className="education-timeline-wrapper w-full">
          {/* Central Line - Animated Path Drawing Effect */}
          <div className="timeline-center-line" />

          {/* Timeline Items */}
          {educations.map((item) => (
            <div
              key={item.id}
              className={`timeline-item ${item.position} ${item.id}`}
            >
              {/* Left Column (50%) */}
              <div className="timeline-left-col">
                {item.position === 'left' && (
                  <div className="timeline-card-wrapper">
                    <div className="edu-card">
                      {/* Top Header Row (Date & GPA Badge) */}
                      <div className="edu-header">
                        <div className="edu-date">
                          <span>📅</span>
                          <span>{item.date}</span>
                        </div>

                        {item.gpa && (
                          <div className="gpa-badge">
                            <span>🎗️</span>
                            <span>{item.gpa}</span>
                          </div>
                        )}
                      </div>

                      {/* School Name */}
                      <h3 className="edu-school">
                        <span>🎓</span>
                        <span>{item.school}</span>
                      </h3>

                      {/* Location */}
                      <div className="edu-location">
                        <span>📍</span>
                        <span>{item.location}</span>
                      </div>

                      {/* Degree / Major */}
                      <div className="edu-major">{item.degree}</div>

                      <div className="edu-divider" />

                      {/* Bullets List */}
                      <ul className="edu-bullets">
                        {item.bullets.map((b, bi) => (
                          <li key={bi} className="edu-bullet-item">
                            <span className="edu-bullet-dot">•</span>
                            <span>{b}</span>
                          </li>
                        ))}

                        {item.thesisLink && (
                          <li className="edu-bullet-item mt-1">
                            <span className="edu-bullet-dot">•</span>
                            <span>
                              Thesis:{' '}
                              <a
                                href={item.thesisLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-[#00b4d8] hover:text-sky-300 transition-colors"
                              >
                                Anomaly Detection in Oil & Gas Operational Data using Transformer Models
                              </a>
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Solid Filled Glowing Node Circle on Center Line */}
              <div className="timeline-node" />

              {/* Right Column (50%) */}
              <div className="timeline-right-col">
                {item.position === 'right' && (
                  <div className="timeline-card-wrapper">
                    <div className="edu-card">
                      {/* Top Header Row (Date & GPA Badge) */}
                      <div className="edu-header">
                        <div className="edu-date">
                          <span>📅</span>
                          <span>{item.date}</span>
                        </div>

                        {item.gpa && (
                          <div className="gpa-badge">
                            <span>🎗️</span>
                            <span>{item.gpa}</span>
                          </div>
                        )}
                      </div>

                      {/* School Name */}
                      <h3 className="edu-school">
                        <span>🎓</span>
                        <span>{item.school}</span>
                      </h3>

                      {/* Location */}
                      <div className="edu-location">
                        <span>📍</span>
                        <span>{item.location}</span>
                      </div>

                      {/* Degree / Major */}
                      <div className="edu-major">{item.degree}</div>

                      <div className="edu-divider" />

                      {/* Bullets List */}
                      <ul className="edu-bullets">
                        {item.bullets.map((b, bi) => (
                          <li key={bi} className="edu-bullet-item">
                            <span className="edu-bullet-dot">•</span>
                            <span>{b}</span>
                          </li>
                        ))}

                        {item.thesisLink && (
                          <li className="edu-bullet-item mt-1">
                            <span className="edu-bullet-dot">•</span>
                            <span>
                              Thesis:{' '}
                              <a
                                href={item.thesisLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-[#00b4d8] hover:text-sky-300 transition-colors"
                              >
                                Anomaly Detection in Oil & Gas Operational Data using Transformer Models
                              </a>
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
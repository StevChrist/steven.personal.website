'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedText from '@/components/AnimatedText'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import '@/styles/educationTimeline.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

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

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const titleEl = sectionRef.current?.querySelector('.edu-title-wrapper')
      const centerLine = sectionRef.current?.querySelector('.timeline-center-line')
      const smaItem = sectionRef.current?.querySelector('.sma-item')
      const telkomItem = sectionRef.current?.querySelector('.telkom-item')

      if (!titleEl || !centerLine || !smaItem || !telkomItem) return

      // Explicit initial states
      gsap.set(titleEl, { opacity: 0, y: 30 })
      gsap.set(centerLine, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set([smaItem, telkomItem], { opacity: 0, y: 40 })

      // Pinned ScrollTrigger Timeline for Education
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2200',
          pin: true,
          scrub: 1.5, // Buttery smooth momentum
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      })

      // Entry buffer
      tl.to({}, { duration: 0.4 })

      // Step 1: Scroll reveals Title "Education_"
      .to(titleEl, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      })

      // Step 2: Draw Line down to 50% & Reveal SMA Box
      .to(centerLine, {
        scaleY: 0.5,
        duration: 1.2,
        ease: 'power1.inOut',
      })
      .to(
        smaItem,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.8'
      )

      // Step 3: Draw Line down to 100% & Reveal Telkom University Box
      .to(centerLine, {
        scaleY: 1,
        duration: 1.2,
        ease: 'power1.inOut',
      })
      .to(
        telkomItem,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.8'
      )

      // Exit buffer for smooth transition to next section
      .to({}, { duration: 0.8 })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  const getTitleSize = () => {
    if (screenWidth >= 2560) return '80px'
    if (screenWidth >= 1920) return '75px'
    if (screenWidth >= 1536) return '68px'
    if (screenWidth >= 1280) return '60px'
    if (screenWidth >= 1024) return '52px'
    if (screenWidth >= 800) return '44px'
    if (screenWidth >= 768) return '40px'
    if (screenWidth >= 640) return '36px'
    if (screenWidth >= 414) return '30px'
    return '28px'
  }

  const getTitleMargin = () => {
    if (screenWidth >= 1280) return '20px'
    if (screenWidth >= 1024) return '16px'
    if (screenWidth >= 768) return '14px'
    return '10px'
  }

  const getSectionPadding = () => {
    if (screenWidth >= 1536) return '60px'
    if (screenWidth >= 1280) return '40px'
    if (screenWidth >= 1024) return '30px'
    if (screenWidth >= 768) return '24px'
    return '16px'
  }

  return (
    <section
      ref={sectionRef}
      id="education"
      className="bg-transparent text-white h-screen w-full flex flex-col justify-center items-center relative overflow-hidden"
      style={{
        paddingTop: '30px',
        paddingBottom: '30px',
        paddingLeft: getSectionPadding(),
        paddingRight: getSectionPadding(),
      }}
    >
      <div className="w-full max-w-[1140px] flex flex-col items-center">
        {/* Section Title Wrapper (Step 1 in Pin Timeline) */}
        <div className="edu-title-wrapper flex justify-center w-full">
          <AnimatedText
            text="Education_"
            className="text-center font-bold"
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: getTitleSize(),
              marginBottom: getTitleMargin(),
            }}
            delayStep={0.05}
            triggerOnce={false}
          />
        </div>

        {/* Vertical Timeline Structure */}
        <div className="education-timeline-wrapper">
          {/* Central Line - Animated Path Drawing Effect with Gradient Mask */}
          <div className="timeline-center-line" />

          {/* Timeline Items */}
          {educations.map((item) => (
            <div
              key={item.id}
              className={`timeline-item ${item.position} ${item.id}`}
            >
              {/* Glowing Node Circle on Line */}
              <div className="timeline-node" />

              {/* Card Container */}
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
                            className="underline text-[#00a8ff] hover:text-sky-300 transition-colors"
                          >
                            Anomaly Detection in Oil & Gas Operational Data using Transformer Models
                          </a>
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
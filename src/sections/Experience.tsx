'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedText from '@/components/AnimatedText'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import '@/styles/experienceCard.css'

type ExperienceItem = {
  date: string
  company: string
  location: string
  role: string
  bullets: string[]
  tags: string[]
}

const Experience = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.35,
  })

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // GSAP Smooth Entrance Animation for Card, Bullets, and Tech Tags when inView
  useEffect(() => {
    if (!sectionRef.current || !inView) return

    const cards = sectionRef.current.querySelectorAll('.experience-card')
    const bullets = sectionRef.current.querySelectorAll('.exp-bullet-item')
    const tags = sectionRef.current.querySelectorAll('.exp-tag-pill')

    // 1. Card Fade & Slide Up Entrance
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 45, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      )
    }

    // 2. Checkmark Bullets Staggered Slide In
    if (bullets.length > 0) {
      gsap.fromTo(
        bullets,
        { opacity: 0, x: -25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.25,
        }
      )
    }

    // 3. Tech Stack Tags Staggered Scale Pop
    if (tags.length > 0) {
      gsap.fromTo(
        tags,
        { opacity: 0, scale: 0.8, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'back.out(1.4)',
          delay: 0.55,
        }
      )
    }
  }, [inView])

  const experiences: ExperienceItem[] = [
    {
      date: 'Jul 2025 - Aug 2025',
      company: 'PT Prasetia Dwidhama',
      location: 'Jakarta, Indonesia',
      role: 'Data Analyst & Data Engineer Intern',
      bullets: [
        'Managed and maintained production company databases using PostgreSQL to support daily operations and enterprise data migration projects.',
        'Extracted, structured, and cleaned datasets using complex SQL queries for seamless ERP/Odoo system integration.',
        'Executed thorough data validation workflows to eliminate null values, duplicates, and system schema inconsistencies.',
        'Conducted cross-system audit checks between PostgreSQL, Excel spreadsheets, and Odoo ERP modules to guarantee 100% data integrity.',
        'Collaborated directly with the senior IT engineering team and produced technical documentation for data pipeline preparation.',
      ],
      tags: [
        'PostgreSQL',
        'SQL Queries',
        'Data Engineering',
        'Odoo ERP',
        'Data Validation',
        'Excel Analytics',
      ],
    },
  ]

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
    if (screenWidth >= 2560) return '60px'
    if (screenWidth >= 1920) return '55px'
    if (screenWidth >= 1536) return '50px'
    if (screenWidth >= 1280) return '35px'
    if (screenWidth >= 1024) return '28px'
    if (screenWidth >= 768) return '22px'
    return '16px'
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
      ref={(el) => {
        sectionRef.current = el
        inViewRef(el)
      }}
      id="experience"
      className="bg-transparent text-white min-h-screen py-16 lg:py-24 flex flex-col justify-center items-center relative overflow-visible"
      style={{
        paddingLeft: getSectionPadding(),
        paddingRight: getSectionPadding(),
      }}
    >
      <div className="experience-container flex flex-col items-center">
        {/* Title */}
        <div className="w-full flex justify-center py-2 overflow-visible">
          <AnimatedText
            text="Experience_"
            className="text-center font-bold gsap-fade-up"
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: getTitleSize(),
              marginBottom: getTitleMargin(),
              lineHeight: '1.3',
              display: 'block',
              color: '#00b4d8',
              textShadow: '0 0 16px rgba(0, 180, 216, 0.8), 0 0 35px rgba(0, 136, 255, 0.5)',
            }}
            delayStep={0.05}
            triggerOnce={false}
          />
        </div>

        {/* Experience Cards Container */}
        <div className="w-full flex flex-col gap-8">
          {experiences.map((exp, idx) => (
            <div key={`${exp.company}-${idx}`} className="experience-card">
              {/* Header Row */}
              <div className="exp-header-row">
                <div className="exp-company-group">
                  <div className="exp-icon-badge">
                    <span>💼</span>
                  </div>
                  <div>
                    <h3 className="exp-company-name">{exp.company}</h3>
                    <p className="exp-location">
                      <span>📍</span>
                      <span>{exp.location}</span>
                    </p>
                  </div>
                </div>

                <div className="exp-date-badge">
                  <span>📅</span>
                  <span>{exp.date}</span>
                </div>
              </div>

              {/* Role Title */}
              <h4 className="exp-role-title">{exp.role}</h4>

              <div className="exp-divider" />

              {/* Bullet Points with Checkmarks */}
              <ul className="exp-bullets-list">
                {exp.bullets.map((b, bi) => (
                  <li key={bi} className="exp-bullet-item">
                    <span className="exp-check-icon">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Tags Row */}
              <div className="exp-tags-row">
                {exp.tags.map((tag, ti) => (
                  <span key={ti} className="exp-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

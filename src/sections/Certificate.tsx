'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import AnimatedText from '@/components/AnimatedText'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { FaFilePdf, FaAward, FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa'
import '@/styles/certificateCard.css'

type CertificateItem = {
  id: string
  title: string
  issuer: string
  location: string
  issuedDate: string
  expiryDate: string
  description: string
  tags: string[]
  pdfUrl: string
}

const certificates: CertificateItem[] = [
  {
    id: 'eprt-2025',
    title: 'English Proficiency Test (EPrT)',
    issuer: 'Telkom University',
    location: 'Bandung, Indonesia',
    issuedDate: '08 October 2025',
    expiryDate: '08 October 2027',
    description:
      'Official English Proficiency Test (EPrT) certificate issued by Telkom University, certifying English language proficiency for academic and professional communication.',
    tags: ['English Proficiency', 'Telkom University', 'Certificate'],
    pdfUrl: '/certificate/EPRT_Steven_2025.pdf',
  },
  {
    id: 'power-bi-achievement-2025',
    title: 'Power BI Data Analytics Achievement',
    issuer: 'Microsoft',
    location: 'Microsoft Learn',
    issuedDate: '21 November 2025',
    expiryDate: 'Lifetime',
    description:
      'Official achievement from Microsoft for completing data analytics and business intelligence training using Microsoft Power BI, mastering data modeling, interactive dashboards, and reporting.',
    tags: ['Microsoft', 'Power BI', 'Data Analytics', 'Business Intelligence', 'Data Modeling'],
    pdfUrl: '/certificate/Power_BI_Data_Analytics_Steven.pdf',
  },
  {
    id: 'explore-core-data-concepts-2025',
    title: 'Explore Core Data Concepts',
    issuer: 'Microsoft',
    location: 'Microsoft Learn',
    issuedDate: '19 November 2025',
    expiryDate: 'Lifetime',
    description:
      'Official Microsoft achievement certifying foundational mastery of core data concepts, data roles, relational and non-relational database fundamentals, and cloud analytics architectures.',
    tags: ['Microsoft', 'Data Engineering', 'Database Fundamentals', 'Cloud Analytics', 'Big Data'],
    pdfUrl: '/certificate/Explore_Core_Data_Concepts_Steven.pdf',
  },
]

const springTransition = {
  type: 'spring',
  stiffness: 65,
  damping: 16,
  mass: 0.8,
} as const

const Certificate = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const { ref: inViewRef } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
  }, [])

  // Auto slide every 5 seconds (paused when hovering)
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  // Mobile touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 45
    if (distance > minSwipeDistance) {
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      prevSlide()
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

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

  // Calculate 3D position styling for each card relative to currentIndex
  const getCardTransform = (index: number) => {
    const diff = (index - currentIndex + certificates.length) % certificates.length
    const isMobile = screenWidth < 640
    const isTablet = screenWidth >= 640 && screenWidth < 1024

    if (diff === 0) {
      // Active center card
      return {
        x: 0,
        y: 0,
        z: 80,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
        pointerEvents: 'auto' as const,
      }
    } else if (diff === 1) {
      // Right tilted fan card
      const xOffset = isMobile ? 85 : isTablet ? 240 : 330
      return {
        x: xOffset,
        y: isMobile ? 8 : 12,
        z: -50,
        rotateY: isMobile ? -12 : -18,
        rotateZ: isMobile ? 5 : 8,
        scale: isMobile ? 0.72 : isTablet ? 0.78 : 0.82,
        opacity: isMobile ? 0.38 : 0.55,
        zIndex: 5,
        pointerEvents: 'auto' as const,
      }
    } else if (diff === 2) {
      // Left tilted fan card
      const xOffset = isMobile ? -85 : isTablet ? -240 : -330
      return {
        x: xOffset,
        y: isMobile ? 8 : 12,
        z: -50,
        rotateY: isMobile ? 12 : 18,
        rotateZ: isMobile ? -5 : -8,
        scale: isMobile ? 0.72 : isTablet ? 0.78 : 0.82,
        opacity: isMobile ? 0.38 : 0.55,
        zIndex: 5,
        pointerEvents: 'auto' as const,
      }
    }

    return {
      x: 0,
      y: 0,
      z: -150,
      rotateY: 0,
      rotateZ: 0,
      scale: 0.5,
      opacity: 0,
      zIndex: 1,
      pointerEvents: 'none' as const,
    }
  }

  const handleCardClick = (index: number) => {
    const diff = (index - currentIndex + certificates.length) % certificates.length
    if (diff === 1) {
      nextSlide()
    } else if (diff === 2) {
      prevSlide()
    }
  }

  return (
    <section
      ref={(el) => {
        sectionRef.current = el
        inViewRef(el)
      }}
      id="certificates"
      className="bg-transparent text-white min-h-screen w-full flex flex-col justify-start items-center border-0 outline-none overflow-x-hidden"
      style={{
        paddingTop: '90px',
        paddingBottom: '80px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      <div className="cert-container flex flex-col items-center w-full max-w-6xl">
        {/* Title */}
        <AnimatedText
          text="Certificate_"
          className="text-center font-bold gsap-fade-up"
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: getTitleSize(),
            marginBottom: getTitleMargin(),
            color: '#64b59b',
            textShadow: '0 0 20px rgba(64, 138, 113, 0.8), 0 0 40px rgba(100, 181, 155, 0.5)',
          }}
          delayStep={0.05}
          triggerOnce={false}
        />

        {/* 3D Fan Carousel Stage */}
        <div
          className="cert-stage-wrapper relative w-full flex flex-col items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 3D Cards Viewport */}
          <div className="cert-3d-viewport relative w-full flex items-center justify-center">
            {certificates.map((cert, index) => {
              const transform = getCardTransform(index)
              const isCenter = index === currentIndex

              return (
                <motion.div
                  key={cert.id}
                  className={`cert-3d-card-wrapper absolute ${isCenter ? 'is-active-card' : 'is-side-card'}`}
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: transform.zIndex,
                  }}
                  animate={{
                    x: transform.x,
                    y: transform.y,
                    z: transform.z,
                    rotateY: transform.rotateY,
                    rotateZ: transform.rotateZ,
                    scale: transform.scale,
                    opacity: transform.opacity,
                  }}
                  transition={springTransition}
                  onClick={() => {
                    if (!isCenter) {
                      handleCardClick(index)
                    }
                  }}
                  whileHover={
                    isCenter
                      ? { scale: 1.015, z: 95 }
                      : { scale: transform.scale * 1.05, opacity: 0.85 }
                  }
                >
                  <div className={`cert-card ${isCenter ? 'cert-card-center' : 'cert-card-side'}`}>
                    {/* Top Header Row (Issued Date & Validity Badge) */}
                    <div className="cert-header">
                      <div className="cert-badge cert-date">
                        <span>📅</span>
                        <span>Issued: {cert.issuedDate}</span>
                      </div>

                      <div className="cert-badge cert-validity">
                        <span>⏳</span>
                        <span>Valid: {cert.expiryDate}</span>
                      </div>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="cert-title">
                      <span className="cert-award-icon">
                        <FaAward />
                      </span>
                      <span>{cert.title}</span>
                    </h3>

                    {/* Issuer & Location */}
                    <div className="cert-location">
                      <span>🏛️</span>
                      <span>{cert.issuer}</span>
                      <span className="cert-location-sep">•</span>
                      <span>📍</span>
                      <span>{cert.location}</span>
                    </div>

                    <div className="cert-divider" />

                    {/* Description */}
                    <p className="cert-desc">{cert.description}</p>

                    {/* Tech Tags Row */}
                    <div className="cert-tags-row">
                      {cert.tags.map((tag, idx) => (
                        <span key={idx} className="cert-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Certificate Button (No Photo Preview, Direct PDF Link) */}
                    <div className="cert-actions">
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cert-view"
                        onClick={(e) => {
                          if (!isCenter) {
                            e.preventDefault()
                            handleCardClick(index)
                          }
                        }}
                      >
                        <FaFilePdf />
                        <span>View Certificate</span>
                        <FaExternalLinkAlt className="text-xs opacity-75" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Navigation Controls (Left & Right Circular Buttons & Pagination Dots) */}
          <div className="flex items-center gap-4 mt-8 sm:mt-10 z-30">
            <button
              type="button"
              aria-label="Previous Certificate"
              onClick={prevSlide}
              className="cert-nav-circle-btn group cursor-pointer"
            >
              <FaArrowLeft className="text-white/80 group-hover:text-white transition-colors duration-200 text-sm" />
            </button>

            {/* Pagination Indicator Pills */}
            <div className="flex items-center gap-2 px-2">
              {certificates.map((cert, index) => (
                <button
                  key={cert.id}
                  type="button"
                  aria-label={`Go to ${cert.title}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`cert-pill-dot ${index === currentIndex ? 'active' : ''}`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next Certificate"
              onClick={nextSlide}
              className="cert-nav-circle-btn group cursor-pointer"
            >
              <FaArrowRight className="text-white/80 group-hover:text-white transition-colors duration-200 text-sm" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificate

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import { FaFilePdf, FaAward, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
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
  imageUrl: string
}

const Certificate = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // GSAP Smooth Entrance Animation for Cards & Inner Elements when inView
  useEffect(() => {
    if (!sectionRef.current || !inView) return

    const cards = sectionRef.current.querySelectorAll('.cert-3d-card')
    const badges = sectionRef.current.querySelectorAll('.cert-badge')
    const buttons = sectionRef.current.querySelectorAll('.btn-cert-view')

    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
        }
      )
    }

    if (badges.length > 0) {
      gsap.fromTo(
        badges,
        { opacity: 0, scale: 0.8, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'back.out(1.4)',
          delay: 0.35,
        }
      )
    }

    if (buttons.length > 0) {
      gsap.fromTo(
        buttons,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.55,
        }
      )
    }
  }, [inView])

  // Complete list of certificates with preview images
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
      imageUrl: '/certificate/EPRT_Steven_2025.png',
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
      imageUrl: '/certificate/Power_BI_Data_Analytics_Steven.png',
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
      imageUrl: '/certificate/Explore_Core_Data_Concepts_Steven.png',
    },
  ]

  // 3D Coverflow State
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length)
  }, [certificates.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
  }, [certificates.length])

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

  // Calculate 3D position class for each certificate
  const getCardPositionClass = (index: number) => {
    const diff = (index - currentIndex + certificates.length) % certificates.length
    if (diff === 0) return 'card-center'
    if (diff === 1) return 'card-right'
    if (diff === 2) return 'card-left'
    return 'card-hidden'
  }

  const handleCardClick = (index: number) => {
    const diff = (index - currentIndex + certificates.length) % certificates.length
    if (diff === 1) {
      nextSlide()
    } else if (diff === 2) {
      prevSlide()
    }
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
        paddingBottom: '60px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      <div className="cert-container flex flex-col items-center">
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

        {/* 3D Fan Coverflow Stage */}
        <div
          className="cert-3d-stage-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="cert-3d-stage">
            {certificates.map((cert, index) => {
              const posClass = getCardPositionClass(index)
              const isCenter = posClass === 'card-center'

              return (
                <div
                  key={cert.id}
                  className={`cert-3d-card ${posClass}`}
                  onClick={() => handleCardClick(index)}
                  role={isCenter ? 'region' : 'button'}
                  tabIndex={isCenter ? 0 : -1}
                  aria-label={cert.title}
                >
                  <div className="cert-card">
                    {/* Certificate Preview Image Box */}
                    <div className="cert-preview-box">
                      <Image
                        src={cert.imageUrl}
                        alt={cert.title}
                        fill
                        sizes="(max-width: 640px) 340px, 520px"
                        className="cert-preview-img"
                        priority={index === 0}
                      />
                      <div className="cert-preview-overlay" />
                    </div>

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

                    {/* View Certificate PDF Button */}
                    <div className="cert-actions">
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cert-view"
                        onClick={(e) => {
                          if (!isCenter) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <FaFilePdf />
                        <span>View Certificate PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Circular Navigation Controls (Matching Reference Image) */}
          <div className="cert-3d-controls">
            <button
              type="button"
              className="cert-3d-circle-btn"
              onClick={prevSlide}
              aria-label="Previous Certificate"
            >
              <FaArrowLeft />
            </button>
            <button
              type="button"
              className="cert-3d-circle-btn"
              onClick={nextSlide}
              aria-label="Next Certificate"
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="cert-dots-container">
            {certificates.map((cert, index) => (
              <button
                key={cert.id}
                type="button"
                className={`cert-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to certificate ${index + 1}: ${cert.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificate

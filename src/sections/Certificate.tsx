'use client'

import { useEffect, useRef, useState } from 'react'
import AnimatedText from '@/components/AnimatedText'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import { FaFilePdf, FaAward } from 'react-icons/fa'
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

    const cards = sectionRef.current.querySelectorAll('.cert-card')
    const badges = sectionRef.current.querySelectorAll('.cert-badge')
    const buttons = sectionRef.current.querySelectorAll('.btn-cert-view')

    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
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

  // Extensible list — add more certificates / trainings here in the future
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
      className="bg-transparent text-white min-h-screen py-16 lg:py-24 flex flex-col justify-center items-center border-0 outline-none"
      style={{
        paddingTop: '120px',
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

        {/* Certificates Grid — 1 card = centered hero, 2+ cards = 2-column grid */}
        <div className="cert-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="cert-card">
              {/* Top Header Row (Issued Date & Validity Badge) */}
              <div className="cert-header">
                <div className="cert-badge cert-date">
                  <span>📅</span>
                  <span>Issued: {cert.issuedDate}</span>
                </div>

                <div className="cert-badge cert-validity">
                  <span>⏳</span>
                  <span>Valid until {cert.expiryDate}</span>
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

              {/* View Certificate Button */}
              <div className="cert-actions">
                <a
                  href={cert.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cert-view"
                >
                  <FaFilePdf />
                  <span>Certificate</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificate

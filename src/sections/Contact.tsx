'use client'

import { useRef, useState, useEffect } from 'react'
import AnimatedText from '@/components/AnimatedText'
import {
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaGithub,
  FaGoogleDrive,
  FaDiscord,
  FaEnvelope,
} from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import Footer from '@/components/Footer'
import '@/styles/contactCard.css'

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [copied, setCopied] = useState(false)
  const [screenWidth, setScreenWidth] = useState(0)
  const emailAddress = 'stevenimmanuelcgirsang@gmail.com'

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

  // GSAP High-Tech Staggered Entrance Animations when inView
  useEffect(() => {
    if (!sectionRef.current || !inView) return

    const card = sectionRef.current.querySelector('.contact-card')
    const subtitle = sectionRef.current.querySelector('.contact-subtitle')
    const emailBar = sectionRef.current.querySelector('.email-copy-bar')
    const socialTitle = sectionRef.current.querySelector('.social-section-title')
    const socialIcons = sectionRef.current.querySelectorAll('.social-icon-circle')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (card) {
      tl.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'back.out(1.2)' }
      )
    }

    if (subtitle) {
      tl.fromTo(
        subtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.5'
      )
    }

    if (emailBar) {
      tl.fromTo(
        emailBar,
        { opacity: 0, scale: 0.9, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.4)' },
        '-=0.3'
      )
    }

    if (socialTitle && socialIcons.length > 0) {
      tl.fromTo(
        socialTitle,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.2'
      ).fromTo(
        socialIcons,
        { opacity: 0, scale: 0.6, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'back.out(1.5)',
        },
        '-=0.2'
      )
    }
  }, [inView])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
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

  return (
    <section
      ref={(el) => {
        sectionRef.current = el
        inViewRef(el)
      }}
      id="contact"
      className="bg-transparent text-white min-h-screen flex flex-col justify-between items-center border-0 outline-none"
      style={{
        paddingTop: '40px',
        paddingBottom: '0px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      <div />

      <div className="contact-container my-auto">
        {/* Main Glassmorphic Hero Contact Card */}
        <div className="contact-card">
          {/* Heading */}
          <AnimatedText
            text="Contact_"
            className="text-center font-bold gsap-fade-up"
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: getTitleSize(),
              marginBottom: '16px',
              color: '#00b4d8',
              textShadow: '0 0 16px rgba(0, 180, 216, 0.8), 0 0 35px rgba(0, 136, 255, 0.5)',
            }}
            delayStep={0.05}
            triggerOnce={false}
          />

          {/* Subtitle Paragraph */}
          <p className="contact-subtitle">
            Whether you have a data science project, machine learning challenge, business intelligence inquiry, or just want to say hi — my inbox is always open!
          </p>

          {/* Compact Copy Email Bar */}
          <div className="email-copy-bar">
            <div className="email-text-group">
              <span className="email-icon">
                <FaEnvelope />
              </span>
              <span className="email-address">{emailAddress}</span>
            </div>

            <button
              onClick={handleCopyEmail}
              className={`btn-copy-email ${copied ? 'copied' : ''}`}
            >
              <span>{copied ? '✓' : '📄'}</span>
              <span>{copied ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>

          {/* Social Media Channels Section */}
          <div className="social-channels-container">
            <div className="social-section-title">
              CONNECT VIA SOCIAL CHANNELS
            </div>
            <div className="social-icons-row">
              <a
                href="https://www.linkedin.com/in/stevenimmanuelcgirsang"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-circle"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://github.com/StevChrist"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-circle"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.instagram.com/_stev.chris/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-circle"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.tiktok.com/@stev.chris"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-circle"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>

              <a
                href="https://x.com/_Stevchris"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-circle"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>

              <a
                href="https://drive.google.com/drive/u/0/my-drive"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-circle"
                aria-label="Google Drive"
              >
                <FaGoogleDrive />
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-circle"
                aria-label="Discord"
              >
                <FaDiscord />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lifted Footer embedded at the bottom of the 100vh page */}
      <div className="w-full">
        <Footer />
      </div>
    </section>
  )
}

export default Contact

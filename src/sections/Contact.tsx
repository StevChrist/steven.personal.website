'use client'

import { useRef, useState, useEffect } from 'react'
import {
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaGithub,
  FaGoogleDrive,
  FaDiscord,
} from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import '@/styles/contactCard.css'

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [copied, setCopied] = useState(false)
  const emailAddress = 'stevenimmanuelcgirsang@gmail.com'

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  })

  // GSAP High-Tech Staggered Entrance Animations when inView
  useEffect(() => {
    if (!sectionRef.current || !inView) return

    const card = sectionRef.current.querySelector('.contact-card')
    const heading = sectionRef.current.querySelector('.contact-heading')
    const subtitle = sectionRef.current.querySelector('.contact-subtitle')
    const emailBar = sectionRef.current.querySelector('.email-copy-bar')
    const socialTitle = sectionRef.current.querySelector('.social-section-title')
    const socialIcons = sectionRef.current.querySelectorAll('.social-icon-circle')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 1. Card pop & scale in
    if (card) {
      tl.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: 'back.out(1.2)' }
      )
    }

    // 2. Heading & Subtitle slide down
    if (heading && subtitle) {
      tl.fromTo(
        [heading, subtitle],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        '-=0.5'
      )
    }

    // 3. Email Bar pulse in
    if (emailBar) {
      tl.fromTo(
        emailBar,
        { opacity: 0, scale: 0.85, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.5)' },
        '-=0.3'
      )
    }

    // 4. Social Title & Icons wave pop-in
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
          duration: 0.55,
          stagger: 0.06,
          ease: 'back.out(1.5)',
        },
        '-=0.3'
      )
    }
  }, [inView])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section
      ref={(el) => {
        sectionRef.current = el
        inViewRef(el)
      }}
      id="contact"
      className="bg-transparent text-white min-h-screen py-16 lg:py-24 flex flex-col justify-center items-center overflow-x-hidden"
    >
      <div className="contact-container">
        {/* Main Glassmorphic Hero Contact Card */}
        <div className="contact-card">
          {/* Heading */}
          <h2 className="contact-heading">Contact_</h2>

          {/* Subtitle Paragraph */}
          <p className="contact-subtitle">
            Whether you have a data science project, machine learning challenge, business intelligence inquiry, or just want to say hi — my inbox is always open!
          </p>

          {/* Compact Copy Email Bar */}
          <div className="email-copy-bar">
            <div className="email-text-group">
              <span className="email-icon">✉</span>
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

          {/* Social Channels Divider */}
          <div className="social-section-title">
            CONNECT VIA SOCIAL CHANNELS
          </div>

          {/* 7 Circular Social Icons Row */}
          <div className="social-icons-row">
            <a
              href="https://www.linkedin.com/in/stevenchristiano"
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
              href="https://drive.google.com/drive/folders/17HalLkOAlIIFtseBj3yCCh20KLkB-rdW?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-circle"
              aria-label="Google Drive"
            >
              <FaGoogleDrive />
            </a>

            <a
              href="https://discord.gg/znVHgPk5Pw"
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
    </section>
  )
}

export default Contact

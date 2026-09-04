'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import '@/styles/navbar.css'

interface NavLink {
  id: string
  label: string
  targetId: string
  sectionIds: string[]
}

const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', targetId: 'home', sectionIds: ['home'] },
  { id: 'about', label: 'About', targetId: 'about', sectionIds: ['about'] },
  { id: 'education', label: 'Education', targetId: 'education', sectionIds: ['education'] },
  { id: 'certificates', label: 'Certificate', targetId: 'certificates', sectionIds: ['certificates', 'certificate'] },
  { id: 'experience', label: 'Experience', targetId: 'experience', sectionIds: ['experience'] },
  { id: 'skills', label: 'Skills', targetId: 'skills', sectionIds: ['skills'] },
  { id: 'projects', label: 'Project', targetId: 'projects', sectionIds: ['projects'] },
  { id: 'contact', label: 'Contact', targetId: 'contact', sectionIds: ['contact'] },
]

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLElement | null>(null)
  const isClickScrolling = useRef(false)
  const clickTimeout = useRef<NodeJS.Timeout | null>(null)

  // Clear click scroll lock on manual interaction or when scroll completes
  useEffect(() => {
    const cancelClickScroll = () => {
      isClickScrolling.current = false
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current)
        clickTimeout.current = null
      }
    }

    window.addEventListener('wheel', cancelClickScroll, { passive: true })
    window.addEventListener('touchmove', cancelClickScroll, { passive: true })
    window.addEventListener('scrollend', cancelClickScroll, { passive: true })

    return () => {
      window.removeEventListener('wheel', cancelClickScroll)
      window.removeEventListener('touchmove', cancelClickScroll)
      window.removeEventListener('scrollend', cancelClickScroll)
    }
  }, [])

  // ScrollSpy: identify which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)

      if (isClickScrolling.current) return

      // If near top of page, default to home
      if (scrollY < 120) {
        setActiveTab('home')
        return
      }

      // If at bottom of page, activate last tab (contact)
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveTab('contact')
        return
      }

      // Trigger line at 35% of viewport height
      const triggerY = window.innerHeight * 0.35

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i]
        const el = document.getElementById(link.targetId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= triggerY && rect.bottom > 100) {
            setActiveTab(link.id)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-center active button in scrollable container on mobile
  useEffect(() => {
    if (!navRef.current) return
    const activeBtn = navRef.current.querySelector('.navbar-link-item.is-active') as HTMLElement | null
    if (activeBtn) {
      const container = navRef.current
      const scrollLeft = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeTab])

  const handleNavClick = (link: NavLink) => {
    setActiveTab(link.id)
    isClickScrolling.current = true
    if (clickTimeout.current) clearTimeout(clickTimeout.current)

    if (link.id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      clickTimeout.current = setTimeout(() => {
        isClickScrolling.current = false
      }, 700)
      return
    }

    const targetEl = document.getElementById(link.targetId)
    if (targetEl) {
      // Find the heading / title element inside the section to guarantee exact landing below navbar
      const titleEl = targetEl.querySelector<HTMLElement>(
        '.animated-text, [class*="title"], h1, h2, h3, [style*="Pacifico"]'
      )

      let scrollDestination: number
      if (titleEl) {
        const titleRect = titleEl.getBoundingClientRect()
        // Align title with 85px from top (leaves 21px clean gap under 64px fixed navbar bottom)
        scrollDestination = titleRect.top + window.scrollY - 85
      } else {
        const targetRect = targetEl.getBoundingClientRect()
        scrollDestination = targetRect.top + window.scrollY - 75
      }

      window.scrollTo({
        top: Math.max(0, Math.round(scrollDestination)),
        behavior: 'smooth',
      })
    }

    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false
    }, 700)
  }

  return (
    <header className="navbar-fixed-container">
      <nav
        ref={navRef}
        className={`navbar-pill-track ${isScrolled ? 'is-scrolled' : ''}`}
        aria-label="Main Navigation"
      >
        {NAV_LINKS.map((link) => {
          const isActive = activeTab === link.id

          return (
            <button
              key={link.id}
              onClick={() => handleNavClick(link)}
              className={`navbar-link-item ${isActive ? 'is-active' : ''}`}
              type="button"
            >
              {/* Ultra-smooth active gliding indicator */}
              {isActive && (
                <motion.span
                  layoutId="activeNavPill"
                  className="navbar-active-pill"
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 24,
                    mass: 0.75,
                  }}
                />
              )}
              <span className="navbar-link-label">{link.label}</span>
            </button>
          )
        })}
      </nav>
    </header>
  )
}


'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
import dynamic from 'next/dynamic'
import TypedText from '@/components/TypedText'
import { useCountUp } from '@/hooks/useCountUp'
import { FaFolderOpen, FaEnvelope, FaArrowRight, FaPython, FaBrain, FaCode, FaChartBar } from 'react-icons/fa'
import '@/styles/mainHero.css'

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
  ssr: false,
})

interface StatItem {
  value: number
  decimals: number
  suffix: string
  label: string
  sub: string
  sectionId: string
}

const HERO_STATS: StatItem[] = [
  { value: 3.67, decimals: 2, suffix: '', label: 'GPA', sub: 'Telkom University', sectionId: 'education' },
  { value: 8, decimals: 0, suffix: '+', label: 'Projects', sub: 'Built & shipped', sectionId: 'projects' },
  { value: 1, decimals: 0, suffix: '', label: 'Internship', sub: 'Company & Startup', sectionId: 'experience' },
  { value: 1, decimals: 0, suffix: '', label: 'Certification', sub: 'Telkom University', sectionId: 'certificates' },
]

function HeroStatCard({
  item,
  start,
  delay,
  onClick,
  isGlitching,
}: {
  item: StatItem
  start: boolean
  delay: number
  onClick: () => void
  isGlitching?: boolean
}) {
  const animatedValue = useCountUp(item.value, start, 1600, item.decimals, delay)
  const displayValue =
    item.decimals > 0
      ? animatedValue.toFixed(item.decimals)
      : Math.round(animatedValue)

  return (
    <div
      className={`hero-stat-card ${start ? 'is-visible' : ''} ${isGlitching ? 'glitch-error-subtle-card' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      title={`Navigate to ${item.label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <div className="hero-stat-number">
        <span>{displayValue}</span>
        {item.suffix && <span className="hero-stat-suffix">{item.suffix}</span>}
      </div>
      <p className="hero-stat-label">{item.label}</p>
      <p className="hero-stat-sub" title={item.sub}>
        {item.sub}
      </p>
    </div>
  )
}

const HERO_TYPED_STRINGS = [
  'I am a Data Scientist 👨‍💻',
  'I build AI-Powered Applications 🤖',
  'I am a Data Engineer ⚙️',
  'I develop Machine Learning Models 🧠',
  'I build End-to-End Solutions 🚀',
  'I transform Data into Insights 📊',
  'I write Python Code 🐍',
  'I solve Real-World Problems 💡',
  'I am Always Learning 📚',
  'I love Listening to Music 🎧',
]

export default function Main() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  const [isHeadlineGlitching, setIsHeadlineGlitching] = useState(false)
  const glitchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const triggerHeadlineGlitch = useCallback(() => {
    setIsHeadlineGlitching(true)
    if (glitchTimeoutRef.current) clearTimeout(glitchTimeoutRef.current)
    glitchTimeoutRef.current = setTimeout(() => {
      setIsHeadlineGlitching(false)
    }, 450)
  }, [])

  useScrollAnimations(sectionRef)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    setIsReady(true)

    window.addEventListener('resize', handleResize)

    const timer = window.setTimeout(() => {
      setIsLoading(false)
    }, 2600)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.clearTimeout(timer)
    }
  }, [])

  const getModelSize = () => {
    if (screenWidth >= 2560) return 520
    if (screenWidth >= 1920) return 460
    if (screenWidth >= 1536) return 410
    if (screenWidth >= 1280) return 370
    if (screenWidth >= 1024) return 330
    if (screenWidth >= 768) return 290
    if (screenWidth >= 640) return 250
    return 210
  }

  const getLogoWidth = () => {
    if (screenWidth >= 1280) return 48
    if (screenWidth >= 768) return 42
    return 36
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Site Preloader */}
      <div className={`site-loader ${!isLoading ? 'site-loader-hidden' : ''}`}>
        <div className="site-loader-inner">
          <Image
            src="/image/Logo PEN White.png"
            alt="Loading Logo"
            width={68}
            height={34}
            priority
            className="site-loader-logo"
          />
          <div className="site-loader-bar">
            <span className="site-loader-bar-fill" />
          </div>
          <p className="site-loader-text">Loading experience...</p>
        </div>
      </div>

      <section
        id="home"
        ref={sectionRef}
        className={`main-hero-section relative min-h-screen text-white overflow-hidden flex flex-col justify-center ${isLoading || !isReady ? 'hero-content-hidden' : 'hero-content-visible'
          }`}
        itemScope
        itemType="https://schema.org/Person"
      >
        <meta itemProp="url" content="https://stevchrist.site" />
        <meta itemProp="jobTitle" content="Data Scientist" />
        <meta itemProp="alumniOf" content="Telkom University" />

        {/* Ambient Canvas Background */}
        <div className="hero-tech-grid-bg" />
        <div className="hero-crt-overlay" />
        <div className="hero-ambient-orb-1" />
        <div className="hero-ambient-orb-2" />

        {/* Fixed Top Left Logo */}
        <div className="hero-logo-fixed select-none">
          <Image
            src="/image/Logo PEN White.png"
            alt="Steven Logo"
            width={getLogoWidth()}
            height={20}
            priority
            className="object-contain"
          />
        </div>

        {/* Modern 2-Column Split Hero Layout */}
        <div className="hero-split-container w-full max-w-[1280px] mx-auto px-6 md:px-12 py-10 my-auto relative z-20">

          {/* Left Column: Equalized Spacing with Single Line Name */}
          <div className="hero-split-left flex flex-col items-center md:items-start text-center md:text-left">

            <p
              onClick={triggerHeadlineGlitch}
              className={`hero-greeting mb-1 cursor-pointer ${isHeadlineGlitching ? 'glitch-error-active' : ''}`}
              title="Click to trigger glitch"
            >
              Hi, I am
            </p>

            <h1
              onClick={triggerHeadlineGlitch}
              className={`hero-name whitespace-nowrap mb-1 cursor-pointer ${isHeadlineGlitching ? 'glitch-error-active' : ''}`}
              title="Click to trigger glitch"
              itemProp="name"
            >
              Steven Immanuel C. Girsang
            </h1>

            {/* Typewriter Text (Tight Vertical Spacing) */}
            <div className={`hero-typed-text mb-4 ${isHeadlineGlitching ? 'glitch-error-active' : ''}`}>
              <TypedText
                onStringTyped={triggerHeadlineGlitch}
                strings={HERO_TYPED_STRINGS}
              />
            </div>

            {/* Action CTA Buttons (With Subtle Glitch Error Effect) */}
            <div className="hero-buttons-wrapper">
              <button
                onClick={() => scrollToSection('projects')}
                className={`btn-split-project group ${isHeadlineGlitching ? 'glitch-error-subtle-btn' : ''}`}
              >
                <FaFolderOpen className="text-base" />
                <span>Project</span>
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className={`btn-split-contact ${isHeadlineGlitching ? 'glitch-error-subtle-btn' : ''}`}
              >
                <FaEnvelope className="text-base" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Stat Cards with Synchronized Glitch Error Effect */}
            <div className="hero-stats-grid">
              {HERO_STATS.map((item, index) => (
                <HeroStatCard
                  key={item.label}
                  item={item}
                  start={!isLoading}
                  delay={index * 120}
                  isGlitching={isHeadlineGlitching}
                  onClick={() => scrollToSection(item.sectionId)}
                />
              ))}
            </div>

          </div>

          {/* Right Column: 3D Model Showcase Deck (Center Right) */}
          <div className="hero-split-right">

            <div className="hero-3d-showcase-container">
              {/* Circular Orbit Ring Line */}
              <div className="hero-orbit-ring-ref" />

              {/* Stationary Purple Pedestal Circle */}
              <div className="hero-pedestal-purple" />

              {/* 4 Orbit Glass Pills */}
              <div className="ref-orbit-pill pill-top-left">
                <FaPython className="text-[#84d4b9] text-xs" />
                <span>Python</span>
              </div>

              <div className="ref-orbit-pill pill-top-right">
                <FaBrain className="text-[#64b59b] text-xs" />
                <span>Machine Learning & Deep Learning</span>
              </div>

              <div className="ref-orbit-pill pill-bottom-left">
                <FaCode className="text-[#408A71] text-xs" />
                <span>AI & LLM</span>
              </div>

              <div className="ref-orbit-pill pill-bottom-right">
                <FaChartBar className="text-[#84d4b9] text-xs" />
                <span>Data Analysis & Visualization</span>
              </div>

              {/* 3D Model Avatar in Center */}
              <div
                className={`model-aura-container relative z-20 ${isHeadlineGlitching ? 'glitch-error-active-model' : ''}`}
                style={{
                  width: `${getModelSize()}px`,
                  height: `${getModelSize()}px`,
                }}
              >
                <div className="w-full h-full relative z-10">
                  <ModelViewer isGlitching={isHeadlineGlitching} />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}
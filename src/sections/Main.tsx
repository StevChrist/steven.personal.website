'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
import TypedText from '@/components/TypedText'
import ModelViewer from '@/components/ModelViewer'
import { FaFolderOpen, FaEnvelope, FaArrowRight, FaPython, FaBrain, FaCode, FaChartBar } from 'react-icons/fa'
import '@/styles/mainHero.css'

export default function Main() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

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
        className={`main-hero-section relative min-h-screen text-white overflow-hidden flex flex-col justify-center ${
          isLoading || !isReady ? 'hero-content-hidden' : 'hero-content-visible'
        }`}
        itemScope
        itemType="https://schema.org/Person"
      >
        <h1 className="sr-only" itemProp="name">
          Steven Immanuel C. Girsang - Data Scientist & AI Engineer Portfolio
        </h1>
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
            
            <p className="hero-greeting mb-1">Hi, I am</p>

            <h2 className="hero-name whitespace-nowrap mb-1">Steven Immanuel C. Girsang</h2>

            {/* Typewriter Text (Tight Vertical Spacing) */}
            <div className="hero-typed-text mb-4">
              <TypedText
                strings={[
                  'I am a Data Scientist',
                  'I am a Graphic Designer',
                  'I am a Video Editor and Animation',
                  'I am a sleep lover',
                  'I am a music listener',
                  'I like to code',
                ]}
              />
            </div>

            {/* Action CTA Buttons (With Guaranteed 24px Gap) */}
            <div className="hero-buttons-wrapper">
              <button
                onClick={() => scrollToSection('projects')}
                className="btn-split-project group"
              >
                <FaFolderOpen className="text-base" />
                <span>Project</span>
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="btn-split-contact"
              >
                <FaEnvelope className="text-base" />
                <span>Contact Me</span>
              </button>
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
                className="model-aura-container relative z-20"
                style={{
                  width: `${getModelSize()}px`,
                  height: `${getModelSize()}px`,
                }}
              >
                <div className="w-full h-full relative z-10">
                  <ModelViewer />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  )
}
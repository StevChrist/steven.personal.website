'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
import TypedText from '@/components/TypedText'
import ModelViewer from '@/components/ModelViewer'
import CodeRain from '@/components/CodeRain'
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
    if (screenWidth >= 1536) return 420
    if (screenWidth >= 1280) return 380
    if (screenWidth >= 1024) return 340
    if (screenWidth >= 768) return 300
    if (screenWidth >= 640) return 260
    return 200
  }

  const getLogoWidth = () => {
    if (screenWidth >= 1280) return 48
    if (screenWidth >= 768) return 42
    return 36
  }

  return (
    <>
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
        className={`main-hero-section relative min-h-screen text-white overflow-hidden ${isLoading || !isReady ? 'hero-content-hidden' : 'hero-content-visible'
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

        <div className="hero-tech-grid-bg" />
        <div className="hero-crt-overlay" />
        <CodeRain />
        <div className="hero-ambient-orb-1" />
        <div className="hero-ambient-orb-2" />

        <div className="hero-particles-container">
          <div className="particle-dot" style={{ left: '15%', opacity: 0.6, animationDuration: '14s' }} />
          <div className="particle-dot" style={{ left: '28%', opacity: 0.4, animationDuration: '18s', animationDelay: '3s' }} />
          <div className="particle-dot" style={{ left: '42%', opacity: 0.7, animationDuration: '12s', animationDelay: '1s' }} />
          <div className="particle-dot" style={{ left: '65%', opacity: 0.5, animationDuration: '16s', animationDelay: '5s' }} />
          <div className="particle-dot" style={{ left: '78%', opacity: 0.65, animationDuration: '13s', animationDelay: '2s' }} />
          <div className="particle-dot" style={{ left: '88%', opacity: 0.35, animationDuration: '20s', animationDelay: '4s' }} />
        </div>

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

        <div className="container max-w-[1140px] mx-auto px-4 flex flex-col items-center justify-center text-center my-auto pt-12 pb-4">
          <div
            className="model-aura-container gsap-fade-up"
            style={{
              width: `${getModelSize()}px`,
              height: `${getModelSize()}px`,
            }}
          >
            <div className="w-full h-full relative z-10">
              <ModelViewer />
            </div>
          </div>

          <div className="gsap-fade-up flex flex-col items-center justify-center mb-3">
            <p className="hero-greeting">Hi, I am</p>
            <h2 className="hero-name">Steven Immanuel C. Girsang</h2>
          </div>

          <div className="hero-typed-text gsap-fade-up">
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
        </div>
      </section>
    </>
  )
}
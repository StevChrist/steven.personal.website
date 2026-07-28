'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import '@/styles/aboutOutline.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const titleEl = sectionRef.current?.querySelector('.about-title-wrapper')
      const profileCard = sectionRef.current?.querySelector('.profile-card')
      const passionCard = sectionRef.current?.querySelector('.passion-card')
      const interestsCard = sectionRef.current?.querySelector('.interests-card')

      if (!titleEl || !profileCard || !passionCard || !interestsCard) return

      // Explicit initial hidden state for cards
      gsap.set([profileCard, passionCard, interestsCard], {
        opacity: 0,
        y: 40,
      })

      // Explicit initial hidden state for title
      gsap.set(titleEl, {
        opacity: 0,
        y: 30,
      })

      // Pinned ScrollTrigger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2200',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,
        },
      })

      // Entry buffer for smooth locking from top
      tl.to({}, { duration: 0.4 })

      // Step 1: Scroll reveals Title "About me_"
      .to(titleEl, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      })
      // Step 2: Scroll reveals Profile Image Card
      .to(profileCard, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      })
      // Step 3: Scroll reveals Description (Background & Passion Card)
      .to(passionCard, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      })
      // Step 4: Scroll reveals Interest (Interests & Fun Fact Card)
      .to(interestsCard, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
      })
      // Exit buffer for smooth locking when scrolling up from bottom section
      .to({}, { duration: 0.8 })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  const getTitleSize = () => {
    if (screenWidth >= 2560) return '80px'
    if (screenWidth >= 1920) return '75px'
    if (screenWidth >= 1536) return '70px'
    if (screenWidth >= 1280) return '65px'
    if (screenWidth >= 1024) return '58px'
    if (screenWidth >= 800) return '48px'
    if (screenWidth >= 768) return '45px'
    if (screenWidth >= 640) return '40px'
    if (screenWidth >= 414) return '34px'
    return '30px'
  }

  // Tighter bottom margin to reduce vertical gap below title
  const getTitleMargin = () => {
    if (screenWidth >= 2560) return '30px'
    if (screenWidth >= 1920) return '25px'
    if (screenWidth >= 1536) return '22px'
    if (screenWidth >= 1280) return '20px'
    if (screenWidth >= 1024) return '18px'
    if (screenWidth >= 768) return '16px'
    if (screenWidth >= 640) return '14px'
    return '12px'
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
      ref={sectionRef}
      id="about"
      className="bg-transparent text-white h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        paddingLeft: getSectionPadding(),
        paddingRight: getSectionPadding(),
      }}
    >
      <div className="about-bento-container">
        {/* Title Container (Step 1 in Pin Timeline) */}
        <div className="about-title-wrapper flex justify-center w-full">
          <AnimatedText
            text="About me_"
            className="text-center font-bold"
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: getTitleSize(),
              marginBottom: getTitleMargin(),
            }}
            delayStep={0.05}
            triggerOnce={false}
          />
        </div>

        {/* Bento Grid Container */}
        <div className="about-bento-grid">
          
          {/* CARD 1: Profile Card (Gambar - Step 2) */}
          <div className="bento-card profile-card">
            <div className="profile-image-container">
              <div className="profile-image-wrapper">
                <Image
                  src="/image/about-me.png"
                  alt="Steven Immanuel C. Girsang"
                  fill
                  sizes="(max-width: 1024px) 100vw, 350px"
                  priority
                />
                {/* Vignette Overlay */}
                <div className="profile-vignette" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            
            {/* CARD 2: Background & Passion (Description - Step 3) */}
            <div className="bento-card passion-card">
              <div>
                {/* Badge */}
                <div className="badge-pill">
                  <span>🚀</span>
                  <span>Background & Passion</span>
                </div>

                {/* Text */}
                <p className="passion-text-p1">
                  Hello! I am{' '}
                  <span className="passion-text-bold-white">
                    Steven Immanuel C. Girsang
                  </span>
                  , a fresh graduate in Data Science from{' '}
                  <span className="passion-text-bold-cyan">
                    Telkom University, Bandung
                  </span>
                  .
                </p>
                <p className="passion-text-p2">
                  I am deeply passionate about how data can uncover hidden patterns, power machine learning models, and solve real-world industry challenges. During my academic journey and organization roles, I developed strong capabilities in ML algorithms, Data Warehousing, Business Intelligence dashboards, and full-stack web applications.
                </p>
              </div>

              {/* Bottom Action Row */}
              <div className="passion-bottom-bar">
                <span className="ready-text">
                  Ready for full-time Data Science & Analytics roles
                </span>
                <button
                  onClick={() => window.open('/cv/steven-cv.pdf', '_blank')}
                  className="btn-cv"
                >
                  <svg className="btn-cv-icon" viewBox="0 0 24 24">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                  <span>VIEW FULL CV</span>
                </button>
              </div>
            </div>

            {/* CARD 3: Interests & Fun Fact (Interest - Step 4) */}
            <div className="bento-card interests-card">
              <div>
                <h3 className="card-section-title">
                  <span style={{ fontSize: '1rem' }}>♾️</span>
                  <span>INTERESTS & FUN FACT</span>
                </h3>
                <p className="interests-desc">
                  Outside tech, I enjoy gaming, listening to music, watching movies, photography, and video editing.
                </p>
              </div>

              <div>
                <div className="fun-fact-divider"></div>
                <p className="fun-fact-text">
                  <span style={{ fontStyle: 'normal', marginRight: '6px' }}>💡</span>
                  <strong className="fun-fact-title">Fun fact:</strong> I can sleep over 13 hours & love deep focus music playlists!
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default About

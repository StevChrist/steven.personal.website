'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import GithubContributions from '@/components/GithubContributions'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import '@/styles/aboutOutline.css'

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  // Trigger animation when ~half of Main (Hero) section scrolls away (threshold: 0.35)
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.35,
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // High-Tech GSAP Entrance Animation (Triggers when half of Main is scrolled away)
  useEffect(() => {
    if (!sectionRef.current || !inView) return

    const profileCard = sectionRef.current.querySelector('.profile-card')
    const passionCard = sectionRef.current.querySelector('.passion-card')
    const githubCard = sectionRef.current.querySelector('.github-card')
    const interestsCard = sectionRef.current.querySelector('.interests-card')

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (profileCard) {
      tl.fromTo(
        profileCard,
        { opacity: 0, scale: 0.9, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }
      )
    }

    if (passionCard) {
      tl.fromTo(
        passionCard,
        { opacity: 0, scale: 0.9, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.6'
      )
    }

    if (githubCard) {
      tl.fromTo(
        githubCard,
        { opacity: 0, scale: 0.9, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.6'
      )
    }

    if (interestsCard) {
      tl.fromTo(
        interestsCard,
        { opacity: 0, scale: 0.9, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.6'
      )
    }
  }, [inView])

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
    if (screenWidth >= 2560) return '30px'
    if (screenWidth >= 1920) return '25px'
    if (screenWidth >= 1536) return '22px'
    if (screenWidth >= 1280) return '20px'
    if (screenWidth >= 1024) return '18px'
    if (screenWidth >= 768) return '16px'
    if (screenWidth >= 640) return '14px'
    return '12px'
  }

  return (
    <section
      ref={(el) => {
        sectionRef.current = el
        inViewRef(el)
      }}
      id="about"
      className="bg-transparent text-white min-h-screen py-20 lg:py-28 w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        paddingTop: '120px',
        paddingBottom: '60px',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      <div className="about-bento-container w-full max-w-[1140px] mx-auto flex flex-col items-center relative">
        {/* Title Container with Cyan Glow */}
        <div className="about-title-wrapper flex justify-center items-center w-full text-center">
          <AnimatedText
            text="About me_"
            className="text-center font-bold gsap-fade-up"
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: getTitleSize(),
              marginBottom: getTitleMargin(),
              color: '#00b4d8',
              textShadow: '0 0 16px rgba(0, 180, 216, 0.8), 0 0 35px rgba(0, 136, 255, 0.5)',
            }}
            delayStep={0.05}
            triggerOnce={false}
          />
        </div>

        {/* Bento Grid Container */}
        <div className="about-bento-grid w-full">
          {/* CARD 1: Profile Card */}
          <div className="bento-card profile-card">
            <div className="profile-image-container">
              <div className="profile-image-wrapper">
                <Image
                  src="/image/about-me.png"
                  alt="Steven Immanuel C. Girsang"
                  fill
                  sizes="(max-width: 1024px) 100vw, 360px"
                  priority
                />
                <div className="profile-vignette" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            {/* CARD 2: Background & Passion */}
            <div className="bento-card passion-card">
              <div>
                <div className="badge-pill">
                  <span>🚀</span>
                  <span>Background & Passion</span>
                </div>

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

            {/* BOTTOM ROW: GitHub Contributions (Left) & Interests (Right) */}
            <div className="about-bottom-row">
              {/* CARD 3: GitHub Contributions */}
              <GithubContributions username="StevChrist" />

              {/* CARD 4: Interests & Fun Fact */}
              <div className="bento-card interests-card">
                <div>
                  <h3 className="card-section-title">
                    <span style={{ fontSize: '1rem', display: 'inline-flex', alignItems: 'center', lineHeight: 1 }}>♾️</span>
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
      </div>
    </section>
  )
}

export default About

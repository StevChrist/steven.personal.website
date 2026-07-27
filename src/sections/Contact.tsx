'use client'

import { useRef, useState, useEffect } from 'react'
import AnimatedText from '@/components/AnimatedText'
import { FaLinkedin, FaInstagram, FaTwitter, FaTiktok, FaGithub, FaGoogleDrive, FaDiscord } from 'react-icons/fa'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Contact = () => {
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

  // GSAP Scroll Animations
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.gsap-fade-up')

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              // markers: true, // Uncomment untuk debugging
            },
          }
        )
      })

      // Force refresh after setup
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  // Function untuk ukuran judul berdasarkan device
  const getTitleSize = () => {
    if (screenWidth >= 2560) return '80px'
    if (screenWidth >= 1920) return '75px'
    if (screenWidth >= 1536) return '70px'
    if (screenWidth >= 1280) return '70px'
    if (screenWidth >= 1024) return '65px'
    if (screenWidth >= 800) return '50px'
    if (screenWidth >= 768) return '55px'
    if (screenWidth >= 640) return '45px'
    if (screenWidth >= 568) return '32px'
    return '28px'
  }

  const getTitleMargin = () => {
    if (screenWidth >= 2560) return '60px'
    if (screenWidth >= 1920) return '55px'
    if (screenWidth >= 1536) return '50px'
    if (screenWidth >= 1280) return '50px'
    if (screenWidth >= 1024) return '45px'
    if (screenWidth >= 800) return '30px'
    if (screenWidth >= 768) return '35px'
    if (screenWidth >= 640) return '25px'
    if (screenWidth >= 568) return '18px'
    return '15px'
  }

  const getTextSize = () => {
    if (screenWidth >= 2560) return '26px'
    if (screenWidth >= 1920) return '24px'
    if (screenWidth >= 1536) return '22px'
    if (screenWidth >= 1280) return '20px'
    if (screenWidth >= 1024) return '18px'
    if (screenWidth >= 800) return '16px'
    if (screenWidth >= 768) return '17px'
    if (screenWidth >= 640) return '14px'
    if (screenWidth >= 568) return '12px'
    return '11px'
  }

  const getTextMargin = () => {
    if (screenWidth >= 2560) return '50px'
    if (screenWidth >= 1920) return '45px'
    if (screenWidth >= 1536) return '40px'
    if (screenWidth >= 1280) return '40px'
    if (screenWidth >= 1024) return '35px'
    if (screenWidth >= 800) return '28px'
    if (screenWidth >= 768) return '32px'
    if (screenWidth >= 640) return '22px'
    if (screenWidth >= 568) return '20px'
    return '18px'
  }

  const getIconSize = () => {
    if (screenWidth >= 2560) return '36px'
    if (screenWidth >= 1920) return '34px'
    if (screenWidth >= 1536) return '32px'
    if (screenWidth >= 1280) return '30px'
    if (screenWidth >= 1024) return '28px'
    if (screenWidth >= 800) return '24px'
    if (screenWidth >= 768) return '26px'
    if (screenWidth >= 640) return '22px'
    if (screenWidth >= 568) return '20px'
    return '18px'
  }

  const getIconGap = () => {
    if (screenWidth >= 2560) return '30px'
    if (screenWidth >= 1920) return '28px'
    if (screenWidth >= 1536) return '25px'
    if (screenWidth >= 1280) return '20px'
    if (screenWidth >= 1024) return '18px'
    if (screenWidth >= 800) return '16px'
    if (screenWidth >= 768) return '17px'
    if (screenWidth >= 640) return '15px'
    if (screenWidth >= 568) return '12px'
    return '10px'
  }

  const getSectionPadding = () => {
    if (screenWidth >= 2560) return '60px'
    if (screenWidth >= 1920) return '55px'
    if (screenWidth >= 1536) return '50px'
    if (screenWidth >= 1280) return '50px'
    if (screenWidth >= 1024) return '45px'
    if (screenWidth >= 800) return '30px'
    if (screenWidth >= 768) return '35px'
    if (screenWidth >= 640) return '25px'
    if (screenWidth >= 568) return '15px'
    return '12px'
  }

  const getContentMargin = () => {
    if (screenWidth >= 2560) return '70px'
    if (screenWidth >= 1920) return '65px'
    if (screenWidth >= 1536) return '60px'
    if (screenWidth >= 1280) return '70px'
    if (screenWidth >= 1024) return '55px'
    if (screenWidth >= 800) return '40px'
    if (screenWidth >= 768) return '45px'
    if (screenWidth >= 640) return '30px'
    if (screenWidth >= 568) return '20px'
    return '15px'
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-black text-white h-screen"
      style={{
        padding: `0 ${getSectionPadding()}`
      }}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <AnimatedText
          text="Contact_"
          className="text-center font-bold gsap-fade-up"
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: getTitleSize(),
            marginBottom: getTitleMargin()
          }}
          delayStep={0.05}
          triggerOnce={false}
        />

        {/* Text Paragraph with Scroll Animation */}
        <p
          className="text-center max-w-[900px] gsap-fade-up"
          style={{
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 300,
            lineHeight: '1.5',
            fontSize: getTextSize(),
            marginBottom: getTextMargin(),
            marginLeft: getContentMargin(),
            marginRight: getContentMargin()
          }}
        >
          You can contact me if you want to get to know me
          <br />or if you want to see more of my projects,
          <br />you can see my social media or my drive below.
        </p>

        {/* Social media icons with Scroll Animation */}
        <div
          className="flex justify-center items-center gsap-fade-up"
          style={{
            gap: getIconGap(),
            flexWrap: 'wrap'
          }}
        >
          <a href="https://www.linkedin.com/in/stevenchristiano" target="_blank" rel="noopener noreferrer">
            <FaLinkedin
              className="text-white hover:text-blue-700 transition-all duration-200"
              style={{ fontSize: getIconSize() }}
            />
          </a>
          <a href="https://www.instagram.com/_stev.chris/" target="_blank" rel="noopener noreferrer">
            <FaInstagram
              className="text-white hover:text-pink-500 transition-all duration-200"
              style={{ fontSize: getIconSize() }}
            />
          </a>
          <a href="https://www.tiktok.com/@stev.chris" target="_blank" rel="noopener noreferrer">
            <FaTiktok
              className="text-white hover:text-black transition-all duration-200"
              style={{ fontSize: getIconSize() }}
            />
          </a>
          <a href="https://x.com/_Stevchris" target="_blank" rel="noopener noreferrer">
            <FaTwitter
              className="text-white hover:text-blue-500 transition-all duration-200"
              style={{ fontSize: getIconSize() }}
            />
          </a>
          <a href="https://github.com/StevChrist" target="_blank" rel="noopener noreferrer">
            <FaGithub
              className="text-white hover:text-gray-500 transition-all duration-200"
              style={{ fontSize: getIconSize() }}
            />
          </a>
          <a href="https://drive.google.com/drive/folders/17HalLkOAlIIFtseBj3yCCh20KLkB-rdW?usp=sharing" target="_blank" rel="noopener noreferrer">
            <FaGoogleDrive
              className="text-white hover:text-green-400 transition-all duration-200"
              style={{ fontSize: getIconSize() }}
            />
          </a>
          <a href="https://discord.gg/znVHgPk5Pw" target="_blank" rel="noopener noreferrer">
            <FaDiscord
              className="text-white hover:text-[#5865F2] transition-all duration-200"
              style={{ fontSize: getIconSize() }}
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact

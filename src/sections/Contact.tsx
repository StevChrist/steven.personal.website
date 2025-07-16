'use client'

import { useRef, useState, useEffect } from 'react'
import AnimatedText from '@/components/AnimatedText'
import { FaLinkedin, FaInstagram, FaTwitter, FaTiktok, FaGithub, FaGoogleDrive } from 'react-icons/fa'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  // Apply scroll animations (excluding the title)
  useScrollAnimations(sectionRef)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Function untuk ukuran judul berdasarkan device
  const getTitleSize = () => {
    if (screenWidth >= 2560) return '80px'      // 4xl
    if (screenWidth >= 1920) return '75px'      // 3xl
    if (screenWidth >= 1536) return '70px'      // 2xl
    if (screenWidth >= 1280) return '70px'      // xl (Desktop)
    if (screenWidth >= 1024) return '65px'      // lg
    if (screenWidth >= 800) return '50px'       // md (Nexus 7)
    if (screenWidth >= 768) return '55px'       // md (iPad mini)
    if (screenWidth >= 640) return '45px'       // sm (large mobile)
    if (screenWidth >= 568) return '32px'       // iPhone 5/5s
    return '28px'                               // xs (very small mobile)
  }

  // Function untuk margin bottom judul
  const getTitleMargin = () => {
    if (screenWidth >= 2560) return '60px'      // 4xl
    if (screenWidth >= 1920) return '55px'      // 3xl
    if (screenWidth >= 1536) return '50px'      // 2xl
    if (screenWidth >= 1280) return '50px'      // xl (Desktop)
    if (screenWidth >= 1024) return '45px'      // lg
    if (screenWidth >= 800) return '30px'       // md (Nexus 7)
    if (screenWidth >= 768) return '35px'       // md (iPad mini)
    if (screenWidth >= 640) return '25px'       // sm (large mobile)
    if (screenWidth >= 568) return '18px'       // iPhone 5/5s
    return '15px'                               // xs (very small mobile)
  }

  // Function untuk ukuran text berdasarkan device
  const getTextSize = () => {
    if (screenWidth >= 2560) return '26px'      // 4xl
    if (screenWidth >= 1920) return '24px'      // 3xl
    if (screenWidth >= 1536) return '22px'      // 2xl
    if (screenWidth >= 1280) return '20px'      // xl (Desktop)
    if (screenWidth >= 1024) return '18px'      // lg
    if (screenWidth >= 800) return '16px'       // md (Nexus 7)
    if (screenWidth >= 768) return '17px'       // md (iPad mini)
    if (screenWidth >= 640) return '14px'       // sm (large mobile)
    if (screenWidth >= 568) return '12px'       // iPhone 5/5s
    return '11px'                               // xs (very small mobile)
  }

  // Function untuk margin bottom text
  const getTextMargin = () => {
    if (screenWidth >= 2560) return '50px'      // 4xl
    if (screenWidth >= 1920) return '45px'      // 3xl
    if (screenWidth >= 1536) return '40px'      // 2xl
    if (screenWidth >= 1280) return '40px'      // xl (Desktop)
    if (screenWidth >= 1024) return '35px'      // lg
    if (screenWidth >= 800) return '28px'       // md (Nexus 7)
    if (screenWidth >= 768) return '32px'       // md (iPad mini)
    if (screenWidth >= 640) return '22px'       // sm (large mobile)
    if (screenWidth >= 568) return '20px'       // iPhone 5/5s
    return '18px'                               // xs (very small mobile)
  }

  // Function untuk ukuran icon berdasarkan device
  const getIconSize = () => {
    if (screenWidth >= 2560) return '36px'      // 4xl
    if (screenWidth >= 1920) return '34px'      // 3xl
    if (screenWidth >= 1536) return '32px'      // 2xl
    if (screenWidth >= 1280) return '30px'      // xl (Desktop)
    if (screenWidth >= 1024) return '28px'      // lg
    if (screenWidth >= 800) return '24px'       // md (Nexus 7)
    if (screenWidth >= 768) return '26px'       // md (iPad mini)
    if (screenWidth >= 640) return '22px'       // sm (large mobile)
    if (screenWidth >= 568) return '20px'       // iPhone 5/5s
    return '18px'                               // xs (very small mobile)
  }

  // Function untuk gap antar icon
  const getIconGap = () => {
    if (screenWidth >= 2560) return '30px'      // 4xl
    if (screenWidth >= 1920) return '28px'      // 3xl
    if (screenWidth >= 1536) return '25px'      // 2xl
    if (screenWidth >= 1280) return '20px'      // xl (Desktop)
    if (screenWidth >= 1024) return '18px'      // lg
    if (screenWidth >= 800) return '16px'       // md (Nexus 7)
    if (screenWidth >= 768) return '17px'       // md (iPad mini)
    if (screenWidth >= 640) return '15px'       // sm (large mobile)
    if (screenWidth >= 568) return '12px'       // iPhone 5/5s
    return '10px'                               // xs (very small mobile)
  }

  // Function untuk padding section
  const getSectionPadding = () => {
    if (screenWidth >= 2560) return '60px'      // 4xl
    if (screenWidth >= 1920) return '55px'      // 3xl
    if (screenWidth >= 1536) return '50px'      // 2xl
    if (screenWidth >= 1280) return '50px'      // xl (Desktop)
    if (screenWidth >= 1024) return '45px'      // lg
    if (screenWidth >= 800) return '30px'       // md (Nexus 7)
    if (screenWidth >= 768) return '35px'       // md (iPad mini)
    if (screenWidth >= 640) return '25px'       // sm (large mobile)
    if (screenWidth >= 568) return '15px'       // iPhone 5/5s
    return '12px'                               // xs (very small mobile)
  }

  // Function untuk margin text content (batas kiri-kanan)
  const getContentMargin = () => {
    if (screenWidth >= 2560) return '70px'      // 4xl
    if (screenWidth >= 1920) return '65px'      // 3xl
    if (screenWidth >= 1536) return '60px'      // 2xl
    if (screenWidth >= 1280) return '70px'      // xl (Desktop)
    if (screenWidth >= 1024) return '55px'      // lg
    if (screenWidth >= 800) return '40px'       // md (Nexus 7)
    if (screenWidth >= 768) return '45px'       // md (iPad mini)
    if (screenWidth >= 640) return '30px'       // sm (large mobile)
    if (screenWidth >= 568) return '20px'       // iPhone 5/5s
    return '15px'                               // xs (very small mobile)
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
        </div>
      </div>
    </section>
  )
}

export default Contact

'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
import '@/styles/aboutOutline.css'

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  // Call the useScrollAnimations hook to apply scroll animations
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
    if (screenWidth >= 568) return '32px'       // iPhone 5/5s (320x568)
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

  // Function untuk ukuran gambar berdasarkan device
  const getImageSize = () => {
    if (screenWidth >= 2560) return { width: '280px', height: '440px' }  // 4xl
    if (screenWidth >= 1920) return { width: '260px', height: '410px' }  // 3xl
    if (screenWidth >= 1536) return { width: '242px', height: '378px' }  // 2xl
    if (screenWidth >= 1280) return { width: '242px', height: '378px' }  // xl (Desktop)
    if (screenWidth >= 1024) return { width: '220px', height: '344px' }  // lg
    if (screenWidth >= 800) return { width: '180px', height: '280px' }   // md (Nexus 7)
    if (screenWidth >= 768) return { width: '200px', height: '312px' }   // md (iPad mini)
    if (screenWidth >= 640) return { width: '160px', height: '250px' }   // sm (large mobile)
    if (screenWidth >= 568) return { width: '130px', height: '204px' }   // iPhone 5/5s
    return { width: '120px', height: '188px' }                          // xs (very small mobile)
  }

  // Function untuk margin bottom gambar
  const getImageMargin = () => {
    if (screenWidth >= 2560) return '50px'      // 4xl
    if (screenWidth >= 1920) return '45px'      // 3xl
    if (screenWidth >= 1536) return '40px'      // 2xl
    if (screenWidth >= 1280) return '40px'      // xl (Desktop)
    if (screenWidth >= 1024) return '35px'      // lg
    if (screenWidth >= 800) return '28px'       // md (Nexus 7)
    if (screenWidth >= 768) return '32px'       // md (iPad mini)
    if (screenWidth >= 640) return '22px'       // sm (large mobile)
    if (screenWidth >= 568) return '25px'       // iPhone 5/5s
    return '22px'                               // xs
  }

  // Function untuk ukuran text berdasarkan device
  const getTextSize = () => {
    if (screenWidth >= 2560) return '22px'      // 4xl
    if (screenWidth >= 1920) return '21px'      // 3xl
    if (screenWidth >= 1536) return '20px'      // 2xl
    if (screenWidth >= 1280) return '20px'      // xl (Desktop)
    if (screenWidth >= 1024) return '18px'      // lg
    if (screenWidth >= 800) return '16px'       // md (Nexus 7)
    if (screenWidth >= 768) return '17px'       // md (iPad mini)
    if (screenWidth >= 640) return '14px'       // sm (large mobile)
    if (screenWidth >= 568) return '11px'       // iPhone 5/5s
    return '10px'                               // xs (very small mobile)
  }

  // Function untuk ukuran button berdasarkan device
  const getButtonSize = () => {
    if (screenWidth >= 2560) return { fontSize: '20px', padding: '12px 24px' }  // 4xl
    if (screenWidth >= 1920) return { fontSize: '19px', padding: '11px 22px' }  // 3xl
    if (screenWidth >= 1536) return { fontSize: '18px', padding: '10px 20px' }  // 2xl
    if (screenWidth >= 1280) return { fontSize: '18px', padding: '10px 20px' }  // xl (Desktop)
    if (screenWidth >= 1024) return { fontSize: '16px', padding: '9px 18px' }   // lg
    if (screenWidth >= 800) return { fontSize: '14px', padding: '8px 16px' }    // md (Nexus 7)
    if (screenWidth >= 768) return { fontSize: '15px', padding: '8px 16px' }    // md (iPad mini)
    if (screenWidth >= 640) return { fontSize: '13px', padding: '7px 14px' }    // sm (large mobile)
    if (screenWidth >= 568) return { fontSize: '11px', padding: '5px 10px' }    // iPhone 5/5s
    return { fontSize: '10px', padding: '4px 8px' }                            // xs (very small mobile)
  }

  // Function untuk margin top button
  const getButtonMargin = () => {
    if (screenWidth >= 2560) return '35px'      // 4xl
    if (screenWidth >= 1920) return '32px'      // 3xl
    if (screenWidth >= 1536) return '30px'      // 2xl
    if (screenWidth >= 1280) return '30px'      // xl (Desktop)
    if (screenWidth >= 1024) return '25px'      // lg
    if (screenWidth >= 800) return '20px'       // md (Nexus 7)
    if (screenWidth >= 768) return '22px'       // md (iPad mini)
    if (screenWidth >= 640) return '18px'       // sm (large mobile)
    if (screenWidth >= 568) return '15px'       // iPhone 5/5s
    return '12px'                               // xs (very small mobile)
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

  // Function untuk margin text (batas kiri-kanan) - DITAMBAHKAN
  const getTextMargin = () => {
    if (screenWidth >= 2560) return '70px'      // 4xl (seperti contoh Anda)
    if (screenWidth >= 1920) return '65px'      // 3xl
    if (screenWidth >= 1536) return '60px'      // 2xl
    if (screenWidth >= 1280) return '70px'      // xl (Desktop) - seperti contoh Anda
    if (screenWidth >= 1024) return '55px'      // lg
    if (screenWidth >= 800) return '40px'       // md (Nexus 7)
    if (screenWidth >= 768) return '45px'       // md (iPad mini)
    if (screenWidth >= 640) return '30px'       // sm (large mobile)
    if (screenWidth >= 568) return '20px'       // iPhone 5/5s
    return '15px'                               // xs (very small mobile)
  }

  // Function untuk menentukan layout
  const isMobileLayout = () => {
    return screenWidth < 1024 // Layout vertikal untuk tablet dan mobile
  }

  const imageSize = getImageSize()
  const buttonSize = getButtonSize()

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-black text-white h-screen"
      style={{
        padding: `0 ${getSectionPadding()}`
      }}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <AnimatedText
          text="About me_"
          className="text-center font-bold gsap-fade-up"
          style={{ 
            fontFamily: "'Pacifico', cursive", 
            fontSize: getTitleSize(),
            marginBottom: getTitleMargin()
          }}
          delayStep={0.05}
          triggerOnce={false}
        />

        <div className={`flex items-center justify-center ${isMobileLayout() ? 'flex-col' : 'flex-row gap-[100px]'} max-w-[1200px]`}>
          {/* Image container with outline animation */}
          <div 
            className="relative flex-shrink-0 gsap-fade-up gambar-outline"
            style={{
              width: imageSize.width,
              height: imageSize.height,
              marginBottom: isMobileLayout() ? getImageMargin() : '0'
            }}
          >
            <div className="relative w-full h-full rounded-[20px] z-10 overflow-hidden">
              <Image
                src="/image/about-me.png"
                alt="Steven Immanuel C. Girsang - Data Scientist, fresh graduate from Telkom University Bandung"
                width={parseInt(imageSize.width)}
                height={parseInt(imageSize.height)}
                className="rounded-[20px] w-full h-full"
              />
            </div>
          </div>

          {/* Description - DITAMBAHKAN MARGIN KIRI-KANAN */}
          <div 
            className={`flex flex-col ${isMobileLayout() ? 'items-center text-center' : 'items-start'} justify-center max-w-[800px] gsap-fade-up`}
            style={{
              marginLeft: isMobileLayout() ? getTextMargin() : '0',
              marginRight: isMobileLayout() ? getTextMargin() : '0'
            }}
          >
            <p
              style={{ 
                fontFamily: "'Roboto'", 
                lineHeight: '1.5',
                fontSize: getTextSize(),
                marginBottom: '0',
                marginTop: '0'
              }}
            >
              Hello, My name is Steven Immanuel C. Girsang, <br />
              I am a fresh graduate Data Science from Telkom University, Bandung.
              I am passionate about technology and fascinated by how data can uncover insights and solve real-world problems. This interest led me to pursue data science, focusing on areas like machine learning and data analysis.
              I have been involved in student organizations, where I developed leadership, teamwork, and communication skills.
              <br />
              Outside of academics, I enjoy gaming, listening to music, watching movies, reading manga, playing music, photography, and video editing/design.
              <br />
              <br />
              💡<strong> Fun fact:</strong> I can sleep for over 13 hours and I am afraid of heights.
            </p>

            {/* Button to open CV in a new tab */}
            <button
              style={{
                fontFamily: "'Protest Riot', cursive",
                background: '#115099',
                color: 'white',
                borderRadius: '30px',
                border: 'none',
                cursor: 'pointer',
                fontSize: buttonSize.fontSize,
                padding: buttonSize.padding,
                marginTop: getButtonMargin()
              }}
              className="gsap-fade-up"
              onClick={() => window.open('cv/steven-cv.pdf', '_blank')}
            >
              View CV
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

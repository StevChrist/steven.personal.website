'use client'

import { useRef, useState, useEffect } from 'react'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
// import ShootingStars from '@/components/ShootingStars'
import TypedText from '@/components/TypedText'
import ModelViewer from '@/components/ModelViewer'

export default function Main() {
  const sectionRef = useRef(null)
  const [screenWidth, setScreenWidth] = useState(0)

  // Hook untuk scroll animation dan Lenis
  useScrollAnimations(sectionRef)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Function untuk ukuran logo (px)
  const getLogoSize = () => {
    if (screenWidth >= 2560) return '28px'      // 4xl
    if (screenWidth >= 1920) return '28px'      // 3xl
    if (screenWidth >= 1536) return '22px'      // 2xl
    if (screenWidth >= 1280) return '22px'      // xl
    if (screenWidth >= 1024) return '22px'      // lg
    if (screenWidth >= 768) return '20px'       // md (small tablet)
    if (screenWidth >= 640) return '18px'       // sm
    return '18px'                               // xs
  }

  // Function untuk posisi logo (px)
  const getLogoPosition = () => {
    if (screenWidth >= 2560) {
      return { top: '40px', left: '60px' }      // 4xl
    } else if (screenWidth >= 1920) {
      return { top: '35px', left: '55px' }      // 3xl
    } else if (screenWidth >= 1536) {
      return { top: '30px', left: '50px' }      // 2xl
    } else if (screenWidth >= 1280) {
      return { top: '30px', left: '50px' }      // xl (Desktop)
    } else if (screenWidth >= 1024) {
      return { top: '25px', left: '40px' }      // lg
    } else if (screenWidth >= 768) {
      return { top: '22px', left: '35px' }      // md (small tablet)
    } else if (screenWidth >= 640) {
      return { top: '18px', left: '25px' }      // sm
    } else {
      return { top: '16px', left: '20px' }      // xs
    }
  }

  // Function untuk ukuran model (px) - DIPERBAIKI UNTUK NEXUS 7
  const getModelSize = () => {
    if (screenWidth >= 2560) return '800px'    // 4xl
    if (screenWidth >= 2560) return '550px'    // 4xl
    if (screenWidth >= 1920) return '500px'    // 3xl
    if (screenWidth >= 1536) return '430px'    // 2xl
    if (screenWidth >= 1280) return '350px'    // xl (Desktop)
    if (screenWidth >= 1024) return '350px'    // lg
    if (screenWidth >= 800) return '400px'     // md (Nexus 7 specific - 800px width)
    if (screenWidth >= 768) return '380px'     // md (iPad mini)
    if (screenWidth >= 640) return '320px'     // sm (large mobile)
    return '220px'                             // xs (small mobile)
  }

  // Function untuk margin bottom model (px) - DIPERBAIKI UNTUK NEXUS 7
  const getModelMarginBottom = () => {
    if (screenWidth >= 2560) return '32px'     // 4xl
    if (screenWidth >= 1920) return '28px'     // 3xl
    if (screenWidth >= 1536) return '24px'     // 2xl
    if (screenWidth >= 1280) return '24px'     // xl (Desktop)
    if (screenWidth >= 1024) return '20px'     // lg
    if (screenWidth >= 800) return '16px'      // md (Nexus 7 specific)
    if (screenWidth >= 768) return '20px'      // md (iPad mini)
    if (screenWidth >= 640) return '6px'       // sm
    return '2px'                               // xs
  }

  // Function untuk ukuran text "Hi, I'm Steven" (px) - DIPERBAIKI UNTUK NEXUS 7
  const getGreetingSize = () => {
    if (screenWidth >= 2560) return '40px'     // 4xl
    if (screenWidth >= 1920) return '38px'     // 3xl
    if (screenWidth >= 1536) return '35px'     // 2xl
    if (screenWidth >= 1280) return '35px'     // xl (Desktop)
    if (screenWidth >= 1024) return '30px'     // lg
    if (screenWidth >= 800) return '26px'      // md (Nexus 7 specific)
    if (screenWidth >= 768) return '28px'      // md (iPad mini)
    if (screenWidth >= 640) return '22px'      // sm
    return '18px'                              // xs
  }

  // Function untuk margin bottom greeting (px) - DIPERBAIKI UNTUK NEXUS 7
  const getGreetingMarginBottom = () => {
    if (screenWidth >= 2560) return '16px'     // 4xl
    if (screenWidth >= 1920) return '14px'     // 3xl
    if (screenWidth >= 1536) return '12px'     // 2xl
    if (screenWidth >= 1280) return '12px'     // xl (Desktop)
    if (screenWidth >= 1024) return '10px'     // lg
    if (screenWidth >= 800) return '8px'       // md (Nexus 7 specific)
    if (screenWidth >= 768) return '10px'      // md (iPad mini)
    if (screenWidth >= 640) return '4px'       // sm
    return '1px'                               // xs
  }

  // Function untuk ukuran TypedText (px) - DIPERBAIKI UNTUK NEXUS 7
  const getTypedTextSize = () => {
    if (screenWidth >= 2560) return '65px'     // 4xl
    if (screenWidth >= 1920) return '62px'     // 3xl
    if (screenWidth >= 1536) return '60px'     // 2xl
    if (screenWidth >= 1280) return '60px'     // xl (Desktop)
    if (screenWidth >= 1024) return '50px'     // lg
    if (screenWidth >= 800) return '32px'      // md (Nexus 7 specific)
    if (screenWidth >= 768) return '38px'      // md (iPad mini)
    if (screenWidth >= 640) return '28px'      // sm
    return '24px'                              // xs
  }

  // Function untuk max width TypedText (px) - DIPERBAIKI UNTUK NEXUS 7
  const getTypedTextMaxWidth = () => {
    if (screenWidth >= 2560) return '80%'      // 4xl
    if (screenWidth >= 1920) return '75%'      // 3xl
    if (screenWidth >= 1536) return '70%'      // 2xl
    if (screenWidth >= 1280) return '65%'      // xl (Desktop)
    if (screenWidth >= 1024) return '60%'      // lg
    if (screenWidth >= 800) return '75%'       // md (Nexus 7 specific)
    if (screenWidth >= 768) return '70%'       // md (iPad mini)
    if (screenWidth >= 640) return '90%'       // sm
    return '85%'                               // xs
  }

  // Function untuk padding container
  const getContainerPadding = () => {
    if (screenWidth >= 768) return '0'         // md ke atas
    if (screenWidth >= 640) return '0 20px'    // sm
    return '0 16px'                            // xs
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      {/* <ShootingStars /> */}

      {/* 1. Logo Steven. di kiri atas */}
      <div
        className="absolute select-none cursor-default z-30 gsap-fade-up"
        style={{
          fontSize: getLogoSize(),
          ...getLogoPosition(),
          fontWeight: 'bold'
        }}
      >
        Steven.
      </div>

      {/* Container utama untuk konten tengah */}
      <div 
        className="absolute z-10 flex flex-col items-center justify-center"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          padding: getContainerPadding()
        }}
      >
        
        {/* 2. Model Viewer - DIPERBAIKI UNTUK NEXUS 7 */}
        <div 
          className="overflow-hidden gsap-fade-up model-viewer-container"
          style={{
            width: getModelSize(),
            height: getModelSize(),
            marginBottom: getModelMarginBottom()
          }}
        >
          <ModelViewer />
        </div>

        {/* 3. Text "Hi, I'm Steven" - DIPERBAIKI UNTUK NEXUS 7 */}
        <p
          style={{
            fontSize: getGreetingSize(),
            marginBottom: getGreetingMarginBottom(),
            textAlign: 'center'
          }}
        >
          Hi, I am Steven
        </p>

        {/* 4. TypedText - DIPERBAIKI UNTUK NEXUS 7 */}
        <div 
          className="font-bold text-white gsap-fade-up typed-text-trigger"
          style={{
            fontSize: getTypedTextSize(),
            textAlign: 'center',
            minHeight: '80px',
            maxWidth: getTypedTextMaxWidth(),
            lineHeight: '1.2'
          }}
        >
          <TypedText
            strings={[
              'I am a Data Science Student',
              'I am a Graphic Designer',
              'I am a Video Editor and Animation',
              'I am a sleep lover'
            ]}
          />
        </div>
      </div>

      {/* Debug info
      <p style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        fontSize: '12px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '6px',
        borderRadius: '4px'
      }}>
        Screen: {screenWidth}px<br/>
        Model: {getModelSize()}<br/>
        Greeting: {getGreetingSize()}<br/>
        TypedText: {getTypedTextSize()}
      </p> */}
      
    </section>
  )
}

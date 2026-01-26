'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
import TypedText from '@/components/TypedText'
import ModelViewer from '@/components/ModelViewer'

export default function Main() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  useScrollAnimations(sectionRef)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ===== LOGO SIZE =====
  const getLogoSize = () => {
    if (screenWidth >= 2560) return 28
    if (screenWidth >= 1920) return 24
    if (screenWidth >= 1536) return 20
    if (screenWidth >= 1280) return 18
    if (screenWidth >= 1024) return 16
    if (screenWidth >= 768) return 14
    if (screenWidth >= 640) return 10
    return 8  
  }

  // ===== LOGO POSITION =====
  const getLogoPosition = () => {
    if (screenWidth >= 2560) return { top: '40px', left: '60px' }
    if (screenWidth >= 1920) return { top: '35px', left: '55px' }
    if (screenWidth >= 1536) return { top: '30px', left: '50px' }
    if (screenWidth >= 1280) return { top: '30px', left: '50px' }
    if (screenWidth >= 1024) return { top: '25px', left: '40px' }
    if (screenWidth >= 768) return { top: '22px', left: '35px' }
    if (screenWidth >= 640) return { top: '18px', left: '25px' }
    return { top: '16px', left: '20px' }
  }

  // ===== MODEL SIZE =====
  const getModelSize = () => {
    if (screenWidth >= 2560) return '800px'
    if (screenWidth >= 1920) return '500px'
    if (screenWidth >= 1536) return '430px'
    if (screenWidth >= 1280) return '350px'
    if (screenWidth >= 1024) return '350px'
    if (screenWidth >= 800) return '400px'
    if (screenWidth >= 768) return '380px'
    if (screenWidth >= 640) return '320px'
    return '220px'
  }

  const getModelMarginBottom = () => {
    if (screenWidth >= 2560) return '32px'
    if (screenWidth >= 1920) return '28px'
    if (screenWidth >= 1536) return '24px'
    if (screenWidth >= 1280) return '24px'
    if (screenWidth >= 1024) return '20px'
    if (screenWidth >= 800) return '16px'
    if (screenWidth >= 768) return '20px'
    if (screenWidth >= 640) return '6px'
    return '2px'
  }

  const getGreetingSize = () => {
    if (screenWidth >= 2560) return '40px'
    if (screenWidth >= 1920) return '38px'
    if (screenWidth >= 1536) return '35px'
    if (screenWidth >= 1280) return '35px'
    if (screenWidth >= 1024) return '30px'
    if (screenWidth >= 800) return '26px'
    if (screenWidth >= 768) return '28px'
    if (screenWidth >= 640) return '22px'
    return '18px'
  }

  const getGreetingMarginBottom = () => {
    if (screenWidth >= 2560) return '16px'
    if (screenWidth >= 1920) return '14px'
    if (screenWidth >= 1536) return '12px'
    if (screenWidth >= 1280) return '12px'
    if (screenWidth >= 1024) return '10px'
    if (screenWidth >= 800) return '8px'
    if (screenWidth >= 768) return '10px'
    if (screenWidth >= 640) return '4px'
    return '1px'
  }

  const getTypedTextSize = () => {
    if (screenWidth >= 2560) return '65px'
    if (screenWidth >= 1920) return '62px'
    if (screenWidth >= 1536) return '60px'
    if (screenWidth >= 1280) return '60px'
    if (screenWidth >= 1024) return '50px'
    if (screenWidth >= 800) return '32px'
    if (screenWidth >= 768) return '38px'
    if (screenWidth >= 640) return '28px'
    return '24px'
  }

  const getTypedTextMaxWidth = () => {
    if (screenWidth >= 2560) return '80%'
    if (screenWidth >= 1920) return '75%'
    if (screenWidth >= 1536) return '70%'
    if (screenWidth >= 1280) return '65%'
    if (screenWidth >= 1024) return '60%'
    if (screenWidth >= 800) return '75%'
    if (screenWidth >= 768) return '70%'
    if (screenWidth >= 640) return '90%'
    return '85%'
  }

  const getContainerPadding = () => {
    if (screenWidth >= 768) return '0'
    if (screenWidth >= 640) return '0 20px'
    return '0 16px'
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      {/* ===== LOGO IMAGE ===== */}
      <div
        className="absolute z-30 select-none gsap-fade-up"
        style={{
          ...getLogoPosition()
        }}
      >
        <Image
          src="/image/Logo PEN White.png"
          alt="Steven Logo"
          width={getLogoSize() * 2.5}
          height={getLogoSize()}
          priority
        />
      </div>

      {/* ===== MAIN CONTENT ===== */}
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
        <div
          className="overflow-hidden gsap-fade-up"
          style={{
            width: getModelSize(),
            height: getModelSize(),
            marginBottom: getModelMarginBottom()
          }}
        >
          <ModelViewer />
        </div>

        <p
          className="gsap-fade-up"
          style={{
            fontSize: getGreetingSize(),
            marginBottom: getGreetingMarginBottom(),
            textAlign: 'center'
          }}
        >
          Hi, I am Steven
        </p>

        {/* TYPED TEXT - TANPA gsap-fade-up */}
        <div
          className="font-bold text-white"
          style={{
            fontSize: getTypedTextSize(),
            textAlign: 'center',
            minHeight: '80px',
            maxWidth: getTypedTextMaxWidth(),
            lineHeight: '1.2',
            opacity: 1, // Selalu visible
            transform: 'none' // Tidak ada transform
          }}
        >
          <TypedText
            strings={[
              'I am a Data Scientist',
              'I am a Graphic Designer',
              'I am a Video Editor and Animation',
              'I am a sleep lover',
              'I am a music listener',
              'I like to code'
            ]}
          />
        </div>
      </div>
    </section>
  )
}

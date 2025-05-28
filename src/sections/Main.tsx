'use client'

import { useRef } from 'react'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
import ShootingStars from '@/components/ShootingStars'
import TypedText from '@/components/TypedText'
import ModelViewer from '@/components/ModelViewer'

export default function Main() {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Hook untuk scroll animation dan Lenis
  useScrollAnimations(sectionRef)

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <ShootingStars />

      <div
        className="absolute top-[30px] left-[50px] text-white text-3xl font-bold select-none cursor-default z-50 gsap-fade-up"
        style={{ fontSize: '25px', opacity: 0 }} // Set initial opacity to 0
      >
        Steven.
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen"
        style={{ marginBottom: '15px' }}
      >
        <div className="overflow-hidden w-[350px] h-[350px] gsap-fade-up model-viewer-container">
          <ModelViewer />
        </div>

        <p
          className="font-semibold select-none text-white gsap-fade-up"
          style={{
            fontSize: '35px',
            marginBlockStart: 0,
            marginBlockEnd: 0,
            opacity: 0, // Set initial opacity to 0
          }}
        >
          Hi, I’m Steven
        </p>

        <div className="font-bold text-white min-h-[3rem] text-[60px] gsap-fade-up typed-text-trigger">
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
    </section>
  )
}

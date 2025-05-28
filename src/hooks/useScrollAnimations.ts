'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations(sectionRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!sectionRef.current) return

    const lenis = new Lenis({
      lerp: 0.1,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.gsap-fade-up')

      gsap.fromTo(
        elements,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%', // Trigger when 50% of the element is visible
            end: 'bottom 20%', // Stop trigger when the element goes out of 20% visible
            toggleActions: 'restart none restart none', // Ensure the animation restarts each time the section enters the viewport
            // markers: true, // Uncomment this for debugging trigger position
          },
        }
      )
    }, sectionRef)

    return () => {
      ctx.revert()
      lenis.destroy()
    }
  }, [sectionRef])
}

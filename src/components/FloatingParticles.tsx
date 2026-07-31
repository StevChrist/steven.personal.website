'use client'

import { useEffect, useState } from 'react'

type Particle = {
  id: number
  left: string
  size: number
  duration: string
  delay: string
  opacity: number
  glowColor: string
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate 22 elegant, subtle floating particles
    const generated: Particle[] = Array.from({ length: 22 }, (_, i) => {
      const leftVal = (Math.random() * 96 + 2).toFixed(1) // 2% to 98%
      const sizeVal = (Math.random() * 2 + 2).toFixed(1) // 2px to 4px
      const durationVal = (Math.random() * 8 + 12).toFixed(1) // 12s to 20s
      const delayVal = (-Math.random() * 18).toFixed(1) // Negative delay so particles are mid-flight instantly!
      const opacityVal = (Math.random() * 0.3 + 0.25).toFixed(2) // 0.25 to 0.55 (subtle opacity)
      const isBright = i % 2 === 0

      return {
        id: i,
        left: `${leftVal}%`,
        size: parseFloat(sizeVal),
        duration: `${durationVal}s`,
        delay: `${delayVal}s`,
        opacity: parseFloat(opacityVal),
        glowColor: isBright ? '#84d4b9' : '#408A71',
      }
    })

    setParticles(generated)
  }, [])

  return (
    <div className="global-particles-layer">
      {particles.map((p) => (
        <div
          key={p.id}
          className="global-particle-dot"
          style={{
            left: p.left,
            top: 0,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.glowColor,
            boxShadow: `0 0 8px ${p.glowColor}, 0 0 16px ${p.glowColor}`,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

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
    // Generate 42 randomized particles that spawn from bottom and float up
    const generated: Particle[] = Array.from({ length: 42 }, (_, i) => {
      const leftVal = (Math.random() * 96 + 2).toFixed(1) // 2% to 98%
      const sizeVal = Math.random() * 3 + 2.5 // 2.5px to 5.5px
      const durationVal = (Math.random() * 10 + 12).toFixed(1) // 12s to 22s
      const delayVal = (-Math.random() * 16).toFixed(1) // Negative delay so particles are already mid-flight!
      const opacityVal = Math.random() * 0.45 + 0.45 // 0.45 to 0.9
      const isBright = i % 2 === 0

      return {
        id: i,
        left: `${leftVal}%`,
        size: sizeVal,
        duration: `${durationVal}s`,
        delay: `${delayVal}s`,
        opacity: opacityVal,
        glowColor: isBright ? '#84d4b9' : '#408A71',
      }
    })

    setParticles(generated)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            bottom: 0,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.glowColor,
            boxShadow: `0 0 12px ${p.glowColor}, 0 0 22px ${p.glowColor}`,
            opacity: p.opacity,
            animation: `floatingRiseContinuous ${p.duration} infinite linear`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

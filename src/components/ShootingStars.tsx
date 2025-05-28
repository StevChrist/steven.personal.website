// ShootingStars.tsx
// dipakai di Main.tsx
import React from 'react'
import '@/styles/shootingStar.css'

const starCount = 60

function generateStars() {
  const stars = []
  for (let i = 0; i < starCount; i++) {
    const tailLength = (Math.random() * (7.5 - 5) + 5).toFixed(2) + 'em'
    const topOffset = (Math.random() * 100).toFixed(2) + 'vh'
    const fallDuration = (Math.random() * (12 - 6) + 6).toFixed(2) + 's'
    const fallDelay = (Math.random() * 10).toFixed(2) + 's'

    const style = {
      '--star-tail-length': tailLength,
      '--top-offset': topOffset,
      '--fall-duration': fallDuration,
      '--fall-delay': fallDelay,
    } as React.CSSProperties

    stars.push(<div key={i} className="star" style={style} />)
  }
  return stars
}

export default function ShootingStars() {
  return (
    <div className="stars absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {generateStars()}
    </div>
  )
}
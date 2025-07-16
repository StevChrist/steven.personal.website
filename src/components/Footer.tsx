'use client'

import { useState, useEffect } from 'react'

const Footer = () => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Function untuk ukuran text berdasarkan device
  const getTextSize = () => {
    if (screenWidth >= 2560) return '18px'      // 4xl
    if (screenWidth >= 1920) return '17px'      // 3xl
    if (screenWidth >= 1536) return '16px'      // 2xl
    if (screenWidth >= 1280) return '15px'      // xl (Desktop)
    if (screenWidth >= 1024) return '14px'      // lg
    if (screenWidth >= 800) return '13px'       // md (Nexus 7)
    if (screenWidth >= 768) return '13px'       // md (iPad mini)
    if (screenWidth >= 640) return '12px'       // sm (large mobile)
    if (screenWidth >= 568) return '11px'       // iPhone 5/5s
    return '10px'                               // xs (very small mobile)
  }

  // Function untuk padding berdasarkan device
  const getPadding = () => {
    if (screenWidth >= 2560) return '30px'      // 4xl
    if (screenWidth >= 1920) return '25px'      // 3xl
    if (screenWidth >= 1536) return '20px'      // 2xl
    if (screenWidth >= 1280) return '20px'      // xl (Desktop)
    if (screenWidth >= 1024) return '18px'      // lg
    if (screenWidth >= 800) return '16px'       // md (Nexus 7)
    if (screenWidth >= 768) return '16px'       // md (iPad mini)
    if (screenWidth >= 640) return '15px'       // sm (large mobile)
    if (screenWidth >= 568) return '12px'       // iPhone 5/5s
    return '10px'                               // xs (very small mobile)
  }

  return (
    <footer 
      className="bg-black text-white text-center"
      style={{
        padding: getPadding(),
        fontSize: getTextSize()
      }}
    >
      <p style={{ fontFamily: "'Roboto', sans-serif" }}>
        Copyright © 2025 by Steven | All Rights Reserved
      </p>
    </footer>
  )
}

export default Footer

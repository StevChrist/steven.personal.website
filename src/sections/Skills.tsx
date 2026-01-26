'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import AnimatedText from '@/components/AnimatedText'
import gsap from 'gsap'

const Skills = () => {
  const [screenWidth, setScreenWidth] = useState(0)

  // Hook for detecting the section visibility in viewport
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger multiple times
    threshold: 0.2,    // Trigger when 20% of the element is in view
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Animasi untuk counter skill
  const animateCounter = (element: HTMLElement, endValue: number) => {
    // Tween nilai numerik terpisah, bukan innerText
    const obj = { val: 0 }
    gsap.to(obj, {
      val: endValue,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        element.textContent = `${Math.round(obj.val)}%`
      },
    })
  }

  // Store refs for each counter
  const counterRefs = useRef<(HTMLElement | null)[]>([])

  // Function to set ref dynamically
  const setCounterRef = (index: number) => (el: HTMLElement | null) => {
    counterRefs.current[index] = el
  }

  // When section comes into view, trigger the counter animations
  useEffect(() => {
    if (!inView) return

    // susun urutan target persentase sesuai DOM yg tampil
    const targetPercents = [...column1Skills, ...column2Skills].map(s => s.percent)

    // pastikan panjang refs sama
    counterRefs.current.length = targetPercents.length

    counterRefs.current.forEach((el, i) => {
      if (el) animateCounter(el, targetPercents[i])
    })
  }, [inView])

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

  // Function untuk ukuran skill title
  const getSkillTitleSize = () => {
    if (screenWidth >= 2560) return '16px'      // 4xl
    if (screenWidth >= 1920) return '15px'      // 3xl
    if (screenWidth >= 1536) return '14px'      // 2xl
    if (screenWidth >= 1280) return '13px'      // xl (Desktop)
    if (screenWidth >= 1024) return '12px'      // lg
    if (screenWidth >= 800) return '11px'       // md (Nexus 7)
    if (screenWidth >= 768) return '11px'       // md (iPad mini)
    if (screenWidth >= 640) return '10px'       // sm (large mobile)
    if (screenWidth >= 568) return '9px'        // iPhone 5/5s
    return '8px'                                // xs (very small mobile)
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
    if (screenWidth >= 1280) return '70px'      // xl (Desktop) - sesuai About
    if (screenWidth >= 1024) return '55px'      // lg
    if (screenWidth >= 800) return '40px'       // md (Nexus 7)
    if (screenWidth >= 768) return '45px'       // md (iPad mini)
    if (screenWidth >= 640) return '30px'       // sm (large mobile)
    if (screenWidth >= 568) return '20px'       // iPhone 5/5s
    return '15px'                               // xs (very small mobile)
  }

  // Function untuk gap antar kolom
  const getColumnGap = () => {
    if (screenWidth >= 2560) return '120px'     // 4xl
    if (screenWidth >= 1920) return '110px'     // 3xl
    if (screenWidth >= 1536) return '100px'     // 2xl
    if (screenWidth >= 1280) return '100px'     // xl (Desktop)
    if (screenWidth >= 1024) return '80px'      // lg
    return '60px'                               // md (tidak akan digunakan karena 1 kolom)
  }

  // Function untuk menentukan layout - DITAMBAHKAN
  const isDesktopLayout = () => {
    return screenWidth >= 1024 // Layout 2 kolom untuk desktop dan laptop
  }

  // Split skills untuk 2 kolom
  const column1Skills = [
    { title: 'HTML', percent: 65 },
    { title: 'CSS', percent: 65 },
    { title: 'JavaScript', percent: 20 },
    { title: 'Python', percent: 70 },
    { title: 'GoLanguage', percent: 50 },
    { title: 'SQL', percent: 70 },
  ]

  const column2Skills = [
    { title: 'Data Science / Data Analysis / Machine Learning', percent: 78 },
    { title: 'Data Visualization', percent: 82 },
    { title: 'Figma', percent: 82 },
    { title: 'Adobe Photoshop & Adobe Illustrator', percent: 70 },
    { title: 'Adobe After Effect & Premier Pro', percent: 85 },
    { title: 'Photography & Videography', percent: 80 },
  ]

  // All skills dalam 1 array untuk single column
  const allSkills = [...column1Skills, ...column2Skills]

  return (
    <section
      ref={ref}
      id="skills"
      className="skills min-h-[100vh] bg-black text-white"
      style={{
        padding: `40px ${getSectionPadding()} 0`
      }}
    >
      <div className="flex flex-col items-center">
        <AnimatedText
          text="Skills_"
          className="text-center font-bold gsap-fade-up"
          style={{ 
            fontFamily: "'Pacifico', cursive", 
            fontSize: getTitleSize()
          }}
          delayStep={0.05}
          triggerOnce={false}
        />

        {/* Conditional Layout: 2 kolom untuk desktop, 1 kolom untuk mobile */}
        {isDesktopLayout() ? (
          // Desktop Layout - 2 Kolom
          <div 
            className="skills-row grid grid-cols-2 w-full max-w-[1200px] gsap-fade-up"
            style={{
              gap: getColumnGap()
            }}
          >
            {/* Column 1 */}
            <div className="skills-column">
              <div className="skills-content">
                {column1Skills.map((skill, index) => (
                  <div key={index} className="progress py-[0.25rem] relative">
                    <h3 
                      className="font-regular flex justify-between" 
                      style={{ 
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: getSkillTitleSize()
                      }}
                    >
                      {skill.title}
                    </h3>
                    <div className="bar h-[0.8rem] rounded-[3rem] border-[0.15rem] border-main-color p-[0.2rem] mt-[0.25rem] relative">
                      <span
                        className={`block h-full rounded-[0.3rem] bg-[#115099] transition-all duration-1000 ${inView ? 'w-full' : 'w-0'}`} 
                        style={{ width: `${inView ? skill.percent : 0}%` }}
                      />
                      <div
                        ref={setCounterRef(index)} 
                        className="counter text-white font-bold absolute right-[0px] top-[-30px]"
                        style={{ 
                          textAlign: 'right', 
                          fontSize: getSkillTitleSize(), 
                          fontFamily: "'Roboto', sans-serif" 
                        }}
                      >
                        0
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div className="skills-column">
              <div className="skills-content">
                {column2Skills.map((skill, index) => (
                  <div key={index} className="progress py-[0.25rem] relative">
                    <h3 
                      className="font-regular flex justify-between" 
                      style={{ 
                        fontFamily: "'Roboto', sans-serif",
                        fontSize: getSkillTitleSize()
                      }}
                    >
                      {skill.title}
                    </h3>
                    <div className="bar h-[0.8rem] rounded-[3rem] border-[0.15rem] border-main-color p-[0.2rem] mt-[0.25rem] relative">
                      <span
                        className={`block h-full rounded-[0.3rem] bg-[#115099] transition-all duration-1000 ${inView ? 'w-full' : 'w-0'}`} 
                        style={{ width: `${inView ? skill.percent : 0}%` }}
                      />
                      <div
                        ref={setCounterRef(index + 6)} // Adjust index untuk kolom 2
                        className="counter text-white font-bold absolute right-[0px] top-[-30px]"
                        style={{ 
                          textAlign: 'right', 
                          fontSize: getSkillTitleSize(), 
                          fontFamily: "'Roboto', sans-serif" 
                        }}
                      >
                        0
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Mobile Layout - 1 Kolom
          <div 
            className="skills-content w-full gsap-fade-up"
            style={{
              marginLeft: getContentMargin(),
              marginRight: getContentMargin(),
              maxWidth: '900px'
            }}
          >
            {allSkills.map((skill, index) => (
              <div key={index} className="progress py-[0.25rem] relative">
                <h3 
                  className="font-regular flex justify-between" 
                  style={{ 
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: getSkillTitleSize()
                  }}
                >
                  {skill.title}
                </h3>
                <div className="bar h-[0.8rem] rounded-[3rem] border-[0.15rem] border-main-color p-[0.2rem] mt-[0.25rem] relative">
                  <span
                    className={`block h-full rounded-[0.3rem] bg-[#115099] transition-all duration-1000 ${inView ? 'w-full' : 'w-0'}`} 
                    style={{ width: `${inView ? skill.percent : 0}%` }}
                  />
                  <div
                    ref={setCounterRef(index)} 
                    className="counter text-white font-bold absolute right-[0px] top-[-30px]"
                    style={{ 
                      textAlign: 'right', 
                      fontSize: getSkillTitleSize(), 
                      fontFamily: "'Roboto', sans-serif" 
                    }}
                  >
                    0
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Skills

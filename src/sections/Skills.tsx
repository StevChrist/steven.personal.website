'use client'

import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import AnimatedText from '@/components/AnimatedText'
import gsap from 'gsap'

const Skills = () => {
  // Hook for detecting the section visibility in viewport
  const { ref, inView } = useInView({
    triggerOnce: false, // Trigger multiple times
    threshold: 0.2,    // Trigger when 20% of the element is in view
  })

  // Animasi untuk counter skill
  const animateCounter = (element: HTMLElement, endValue: number) => {
    gsap.fromTo(
      element,
      { innerText: '0' }, // Mulai dari 0
      {
        innerText: endValue,
        duration: 2, // Durasi animasi
        ease: 'power2.out', // Ease out untuk animasi yang lebih halus
        snap: { innerText: 1 }, // Pastikan nilai angka tidak terputus
        // Menambahkan callback untuk memastikan angka berhenti pada nilai akhir
        onUpdate: () => {
          element.innerText = Math.ceil(Number(element.innerText)).toString() + '%'
        },
      }
    )
  }

  // Store refs for each counter
  const counterRefs = useRef<(HTMLElement | null)[]>([])

  // Function to set ref dynamically
  const setCounterRef = (index: number) => (el: HTMLElement | null) => {
    counterRefs.current[index] = el
  }

  // When section comes into view, trigger the counter animations
  useEffect(() => {
    if (inView) {
      counterRefs.current.forEach((counter, index) => {
        if (counter) {
          const skillPercent = [70, 70, 40, 70, 60, 60, 75, 82, 82, 70, 85, 80][index]
          animateCounter(counter, skillPercent)
        }
      })
    }
  }, [inView])

  return (
    <section
      ref={ref}
      id="skills"
      className="skills min-h-[100vh] px-[20px] pt-[40px] pb-0 bg-black text-white"
    >
      <div className="flex flex-col items-center">
        <AnimatedText
          text="Skills_"
          className="text-center font-bold mb-[20px]"
          style={{ fontFamily: "'Pacifico', cursive", fontSize: '70px' }}
          delayStep={0.05}
          triggerOnce={false}
        />

        <p className="text-center mb-[16px] max-w-[900px] font-light" style={{ fontFamily: "'Roboto'" }}>
          Far far away, behind the lines of perfect code, beyond the lands of Syntax and Semicolon, lies the elusive 100% mastery.
        </p>

        {/* Grid for two columns */}
        <div className="skills-row grid grid-cols-2 gap-[100px] w-full max-w-[1200px]">
          {/* Column 1 */}
          <div className="skills-column">
            <div className="skills-content">
              {[ 
                { title: 'HTML', percent: 70 },
                { title: 'CSS', percent: 70 },
                { title: 'JavaScript', percent: 40 },
                { title: 'Python', percent: 70 },
                { title: 'GoLanguage', percent: 60 },
                { title: 'SQL', percent: 60 },
              ].map((skill, index) => (
                <div key={index} className="progress py-[0.25rem] relative">
                  <h3 className="text-[13px] font-regular flex justify-between" style={{ fontFamily: "'Roboto', sans-serif" }}>
                    {skill.title}
                  </h3>
                  <div className="bar h-[0.8rem] rounded-[3rem] border-[0.15rem] border-main-color p-[0.2rem] mt-[0.25rem] relative">
                    <span
                      className={`block h-full rounded-[0.3rem] bg-[#115099] transition-all duration-1000 ${inView ? 'w-full' : 'w-0'}`} 
                      style={{ width: `${inView ? skill.percent : 0}%` }} // Animate width when in view
                    />
                    {/* Counter for the percentage */}
                    <div
                      ref={setCounterRef(index)} 
                      className="counter text-white font-bold text-xl absolute right-[0px] top-[-30px]" // Positioning above the bar and aligned right
                      style={{ textAlign: 'right', fontSize: '13px', fontFamily: "'Roboto', sans-serif" }} // Ensure alignment with the right edge and matching title font size
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
              {[ 
                { title: 'Data Science / Data Analysis / Machine Learning', percent: 75 },
                { title: 'Data Visualization', percent: 82 },
                { title: 'Figma', percent: 82 },
                { title: 'Adobe Photoshop & Adobe Illustrator', percent: 70 },
                { title: 'Adobe After Effect & Premier Pro', percent: 85 },
                { title: 'Photography & Videography', percent: 80 },
              ].map((skill, index) => (
                <div key={index} className="progress py-[0.25rem] relative">
                  <h3 className="text-[13px] font-regular flex justify-between" style={{ fontFamily: "'Roboto', sans-serif" }}>
                    {skill.title}
                  </h3>
                  <div className="bar h-[0.8rem] rounded-[3rem] border-[0.15rem] border-main-color p-[0.2rem] mt-[0.25rem] relative">
                    <span
                      className={`block h-full rounded-[0.3rem] bg-[#115099] transition-all duration-1000 ${inView ? 'w-full' : 'w-0'}`} 
                      style={{ width: `${inView ? skill.percent : 0}%` }} // Animate width when in view
                    />
                    {/* Counter for the percentage */}
                    <div
                      ref={setCounterRef(index + 6)} // Adjust index for column 2
                      className="counter text-white font-bold text-xl absolute right-[0px] top-[-30px]" // Positioning above the bar and aligned right
                      style={{ textAlign: 'right', fontSize: '13px', fontFamily: "'Roboto', sans-serif" }} // Ensure alignment with the right edge and matching title font size
                    >
                      0
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

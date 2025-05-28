'use client'

import { useRef } from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import { useScrollAnimations } from '@/hooks/useScrollAnimations' // Import the useScrollAnimations hook
import '@/styles/aboutOutline.css' // Ensure this CSS file is properly applied

const About = () => {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Call the useScrollAnimations hook to apply scroll animations
  useScrollAnimations(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-black text-white h-screen px-[50px]"
    >
      <div className="flex flex-col justify-center items-center h-full">
        <AnimatedText
          text="About me_"
          className="text-center font-bold mb-[40px] gsap-fade-up" // Apply gsap-fade-up for animation
          style={{ fontFamily: "'Pacifico', cursive", fontSize: '70px' }}
          delayStep={0.05}
          triggerOnce={false} // Prevent it from triggering only once
        />

        <div className="flex items-center justify-center gap-[100px] max-w-[1200px]">
          {/* Image container with outline animation */}
          <div className="relative flex-shrink-0 w-[242px] h-[378px] gsap-fade-up gambar-outline">
            <div className="relative w-full h-full rounded-[20px] z-10 overflow-hidden">
              <Image
                src="/image/about-me.png"
                alt="About Me"
                width={242}
                height={378}
                className="rounded-[20px] w-full h-full"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col items-start justify-center max-w-[800px] gsap-fade-up">
            <p
              className="text-[20px] font-light mb-0 mt-0"
              style={{ fontFamily: "'Roboto'", lineHeight: '1.5' }}
            >
              Hello, My name is Steven Immanuel C. Girsang, <br />
              I am a Data Science undergraduate student at Telkom University, Bandung.
              I am passionate about technology and fascinated by how data can uncover insights and solve real-world problems. This interest led me to pursue data science, focusing on areas like machine learning and data analysis.
              I have been involved in student organizations, where I developed leadership, teamwork, and communication skills.
              <br />
              Outside of academics, I enjoy gaming, listening to music, watching movies, reading manga, playing music, photography, and video editing/design.
              <br />
              <br />
              💡<strong> Fun fact:</strong> I can sleep for over 13 hours and I am afraid of heights.
            </p>

            {/* Button to open CV in a new tab */}
            <button
              style={{
                fontFamily: "'Protest Riot', cursive",
                background: '#115099',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '30px',
                fontSize: '18px',
                marginTop: '20px',
                border: 'none',
                cursor: 'pointer',
              }}
              className="gsap-fade-up" // Apply gsap-fade-up for button animation
              onClick={() => window.open('cv/steven-cv.pdf', '_blank')}
            >
              View CV
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

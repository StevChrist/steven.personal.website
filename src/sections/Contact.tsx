'use client'

import { useRef } from 'react'
import AnimatedText from '@/components/AnimatedText'
import { FaLinkedin, FaInstagram, FaTwitter, FaTiktok, FaGithub, FaGoogleDrive } from 'react-icons/fa'
import { useScrollAnimations } from '@/hooks/useScrollAnimations' // Import the custom hook

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null)

  // Apply scroll animations (excluding the title)
  useScrollAnimations(sectionRef)

  return (
    <section ref={sectionRef} id="contact" className="bg-black text-white h-screen px-[50px]">
      <div className="flex flex-col justify-center items-center h-full">
        <AnimatedText
          text="Contact_"
          className="text-center font-bold mb-[40px]" // Title without animation
          style={{ fontFamily: "'Pacifico', cursive", fontSize: '70px' }}
          delayStep={0.05}
          triggerOnce={false}
        />

        {/* Text Paragraph with Scroll Animation */}
        <p
          className="text-center max-w-[900px] text-[20px] gsap-fade-up"
          style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 300, lineHeight: '1.5' }}
        >
          You can contact me if you want to get to know me 
          <br />or if you want to see more of my projects,
          <br />you can see my social media or my drive below.
        </p>

        {/* Social media icons with Scroll Animation */}
        <div className="flex justify-center gap-[20px] text-[30px] mt-[40px] gsap-fade-up">
          <a href="https://www.linkedin.com/in/stevenchristiano" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white hover:text-blue-700 transition-all duration-200" />
          </a>
          <a href="https://www.instagram.com/_stev.chris/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-white hover:text-pink-500 transition-all duration-200" />
          </a>
          <a href="https://www.tiktok.com/@stev.chris" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="text-white hover:text-black transition-all duration-200" />
          </a>
          <a href="https://x.com/_Stevchris" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-white hover:text-blue-500 transition-all duration-200" />
          </a>
          <a href="https://github.com/StevChrist" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white hover:text-gray-500 transition-all duration-200" />
          </a>
          <a href="https://drive.google.com/drive/folders/17HalLkOAlIIFtseBj3yCCh20KLkB-rdW?usp=sharing" target="_blank" rel="noopener noreferrer">
            <FaGoogleDrive className="text-white hover:text-green-400 transition-all duration-200" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact

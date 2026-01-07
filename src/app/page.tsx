'use client'

import Main from '@/sections/Main'
import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Skills from '@/sections/Skills'
import Project from '@/sections/Project'
import Contact from '@/sections/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main 
      style={{
        backgroundImage: `url("/image/background.png")`,
        backgroundSize: 'cover',         // Ensures the image covers the screen without distortion
        backgroundPosition: 'center',    // Centers the background image
        backgroundRepeat: 'no-repeat',   // Prevents the background from repeating
        backgroundAttachment: 'fixed',   // Keeps the background fixed when scrolling (no zoom effect)
        margin: 0,
        minHeight: '100vh'               // Ensures the background covers the entire viewport height
      }}
    >
      <Main />
      <About />
      <Experience />
      <Skills />
      <Project />
      <Contact />
      <Footer />
    </main>
  )
}

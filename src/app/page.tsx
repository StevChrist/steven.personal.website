'use client'

import Main from '@/sections/Main'
import About from '@/sections/About'
import Skills from '@/sections/Skills'
import Project from '@/sections/Project'
import Contact from '@/sections/Contact'

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
      <Skills />
      <Project />
      <Contact />
      {/* Footer */}
      <footer className="bg-black text-white py-6">
        <div className="flex justify-center items-center max-w-screen-xl mx-auto">
          <p className="text-sm">
            Copyright © 2025 by Steven | All Rights Reserved
          </p>
        </div>
      </footer>
    </main>
  )
}

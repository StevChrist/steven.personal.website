import Main from '@/sections/Main'
import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Skills from '@/sections/Skills'
import Project from '@/sections/Project'
import Contact from '@/sections/Contact'
import Education from '@/sections/Education'
import FloatingParticles from '@/components/FloatingParticles'

export default function Home() {
  return (
    <main className="bg-tech-canvas min-h-screen text-white relative">
      {/* Global continuous particle background - spans entire page height */}
      <FloatingParticles />
      <Main />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Project />
      <Contact />
    </main>
  )
}

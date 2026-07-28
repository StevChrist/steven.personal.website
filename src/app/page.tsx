import Main from '@/sections/Main'
import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Skills from '@/sections/Skills'
import Project from '@/sections/Project'
import Contact from '@/sections/Contact'
import Footer from '@/components/Footer'
import Education from '@/sections/Education'

export default function Home() {
  return (
    <main className="bg-tech-canvas min-h-screen text-white">
      <Main />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Project />
      <Contact />
      <Footer />
    </main>
  )
}

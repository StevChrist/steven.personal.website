'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import AnimatedText from '@/components/AnimatedText'
import gsap from 'gsap'
import '@/styles/skillsSection.css'

type CategoryId = 'ds_de' | 'web' | 'media' | 'ai' | 'soft'

type SkillItem = {
  name: string
  icon: string
  percent: number
  category: 'ds_de' | 'web' | 'media' | 'ai' | 'soft'
}

const Skills = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const tabsRef = useRef<HTMLDivElement | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)
  const [screenWidth, setScreenWidth] = useState(0)

  const [activeTab, setActiveTab] = useState<CategoryId>('ds_de')

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  })

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const skillsData: SkillItem[] = [
    // Category 1: Data Science, AI & BI
    { name: 'Python', icon: '🐍', percent: 88, category: 'ds_de' },
    { name: 'SQL & Query Optimization', icon: '🛢️', percent: 87, category: 'ds_de' },
    { name: 'PostgreSQL', icon: '🐘', percent: 87, category: 'ds_de' },
    { name: 'Microsoft Excel', icon: '📈', percent: 75, category: 'ds_de' },
    { name: 'Data Analysis & Visualization', icon: '📊', percent: 89, category: 'ds_de' },
    { name: 'Power BI & Dashboarding', icon: '⚡', percent: 85, category: 'ds_de' },
    { name: 'ETL / Data Processing Pipelines', icon: '🔄', percent: 84, category: 'ds_de' },
    { name: 'Data Warehousing', icon: '🏬', percent: 83, category: 'ds_de' },
    { name: 'Data Modeling', icon: '🧩', percent: 82, category: 'ds_de' },
    { name: 'Statistical Analysis', icon: '📐', percent: 80, category: 'ds_de' },
    { name: 'Machine Learning & Deep Learning', icon: '🤖', percent: 87, category: 'ds_de' },
    { name: 'Dashboard Development', icon: '🖥️', percent: 85, category: 'ds_de' },

    // Category 2: Web & UI/UX
    { name: 'HTML/CSS', icon: '🌐', percent: 85, category: 'web' },
    { name: 'JavaScript & TypeScript', icon: '⚡', percent: 70, category: 'web' },
    { name: 'React.js & Next.js', icon: '⚛️', percent: 60, category: 'web' },
    { name: 'Tailwind CSS', icon: '🎨', percent: 68, category: 'web' },
    { name: 'UI/UX Design & Prototyping (Figma)', icon: '📐', percent: 90, category: 'web' },
    { name: 'Version Control (Git / GitHub)', icon: '🌿', percent: 85, category: 'web' },

    // Category 3: Editing & Graphic Design
    { name: 'Adobe Premiere Pro', icon: '🎬', percent: 85, category: 'media' },
    { name: 'Adobe After Effects', icon: '✨', percent: 88, category: 'media' },
    { name: 'Adobe Photoshop', icon: '🖌️', percent: 85, category: 'media' },
    { name: 'Adobe Illustrator', icon: '✒️', percent: 75, category: 'media' },
    { name: 'CapCut Video Editing', icon: '✂️', percent: 90, category: 'media' },

    // Category 4: AI & LLM
    { name: 'OpenAI API', icon: '🧠', percent: 87, category: 'ai' },
    { name: 'LLM Integration', icon: '🔗', percent: 86, category: 'ai' },
    { name: 'Prompt Engineering', icon: '✏️', percent: 84, category: 'ai' },
    { name: 'Vector Database (FAISS)', icon: '🗂️', percent: 85, category: 'ai' },
    { name: 'Semantic Search', icon: '🔍', percent: 84, category: 'ai' },
    { name: 'RAG (Retrieval-Augmented Generation)', icon: '📚', percent: 82, category: 'ai' },
    { name: 'NLP', icon: '💬', percent: 81, category: 'ai' },
    { name: 'Transformer Models', icon: '🧬', percent: 86, category: 'ai' },
    { name: 'Deep Learning', icon: '🕸️', percent: 84, category: 'ai' },
    { name: 'FastAPI', icon: '🚀', percent: 85, category: 'ai' },
    { name: 'AI Application Development', icon: '🛠️', percent: 86, category: 'ai' },
    { name: 'Model Deployment', icon: '📦', percent: 80, category: 'ai' },

    // Category 5: Soft Skills
    { name: 'Analytical Thinking', icon: '💡', percent: 90, category: 'soft' },
    { name: 'Problem Solving', icon: '🧩', percent: 93, category: 'soft' },
    { name: 'Attention to Detail', icon: '🔎', percent: 94, category: 'soft' },
    { name: 'Adaptability', icon: '🔄', percent: 91, category: 'soft' },
    { name: 'Teamwork', icon: '🤝', percent: 88, category: 'soft' },
    { name: 'Communication', icon: '🗣️', percent: 84, category: 'soft' },
    { name: 'Time Management', icon: '⏳', percent: 80, category: 'soft' },
    { name: 'Critical Thinking', icon: '🧠', percent: 92, category: 'soft' },
    { name: 'Decision Making', icon: '⚖️', percent: 84, category: 'soft' },
    { name: 'Leadership', icon: '👥', percent: 82, category: 'soft' },
  ]

  const filteredSkills = skillsData.filter((skill) => skill.category === activeTab)

  // 1. GSAP Staggered Entrance Animation for Category Filter Tabs
  useEffect(() => {
    if (!tabsRef.current || !inView) return

    const tabs = tabsRef.current.querySelectorAll('.filter-tab')
    if (tabs.length === 0) return

    gsap.fromTo(
      tabs,
      { opacity: 0, y: 25, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.4)',
      }
    )
  }, [inView])

  // 2. GSAP Staggered Pop-in Animation for Skill Cards when inView or activeTab changes
  useEffect(() => {
    if (!gridRef.current || !inView) return

    const cards = gridRef.current.querySelectorAll('.skill-card')
    if (cards.length === 0) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 35, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        stagger: 0.07,
        ease: 'back.out(1.3)',
      }
    )
  }, [activeTab, inView])

  const getTitleSize = () => {
    if (screenWidth >= 2560) return '80px'
    if (screenWidth >= 1920) return '75px'
    if (screenWidth >= 1536) return '70px'
    if (screenWidth >= 1280) return '65px'
    if (screenWidth >= 1024) return '58px'
    if (screenWidth >= 800) return '48px'
    if (screenWidth >= 768) return '45px'
    if (screenWidth >= 640) return '40px'
    if (screenWidth >= 414) return '34px'
    return '30px'
  }

  const getTitleMargin = () => {
    if (screenWidth >= 2560) return '60px'
    if (screenWidth >= 1920) return '55px'
    if (screenWidth >= 1536) return '50px'
    if (screenWidth >= 1280) return '35px'
    if (screenWidth >= 1024) return '28px'
    if (screenWidth >= 768) return '22px'
    return '16px'
  }

  const getSectionPadding = () => {
    if (screenWidth >= 1536) return '60px'
    if (screenWidth >= 1280) return '40px'
    if (screenWidth >= 1024) return '30px'
    if (screenWidth >= 768) return '24px'
    return '16px'
  }

  return (
    <section
      ref={(el) => {
        sectionRef.current = el
        inViewRef(el)
      }}
      id="skills"
      className="bg-transparent text-white min-h-screen py-20 lg:py-28 flex flex-col justify-center items-center overflow-x-hidden"
      style={{
        paddingTop: '130px',
        paddingBottom: '80px',
        paddingLeft: getSectionPadding(),
        paddingRight: getSectionPadding(),
      }}
    >
      <div className="skills-container flex flex-col items-center">
        {/* Title */}
        <AnimatedText
          text="Skills_"
          className="text-center font-bold gsap-fade-up"
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: getTitleSize(),
            marginBottom: getTitleMargin(),
          }}
          delayStep={0.05}
          triggerOnce={false}
        />

        {/* 5 Category Filter Tabs with Staggered Scroll Animation */}
        <div ref={tabsRef} className="skills-filter-bar">
          <button
            onClick={() => setActiveTab('ds_de')}
            className={`filter-tab ${activeTab === 'ds_de' ? 'active' : 'inactive'}`}
          >
            <span>📊</span>
            <span>Data & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('web')}
            className={`filter-tab ${activeTab === 'web' ? 'active' : 'inactive'}`}
          >
            <span>💻</span>
            <span>Web & UI/UX</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`filter-tab ${activeTab === 'media' ? 'active' : 'inactive'}`}
          >
            <span>🎨</span>
            <span>Editing & Graphic Design</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`filter-tab ${activeTab === 'ai' ? 'active' : 'inactive'}`}
          >
            <span>🧠</span>
            <span>AI & LLM</span>
          </button>

          <button
            onClick={() => setActiveTab('soft')}
            className={`filter-tab ${activeTab === 'soft' ? 'active' : 'inactive'}`}
          >
            <span>🤝</span>
            <span>Soft Skills</span>
          </button>
        </div>

        {/* Skills Cards Grid with Staggered GSAP Animations */}
        <div ref={gridRef} className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div key={`${skill.name}-${index}`} className="skill-card">
              <div className="skill-info">
                <div className="skill-name-wrapper">
                  <span className="skill-icon">{skill.icon}</span>
                  <h4 className="skill-name">{skill.name}</h4>
                </div>
                <span className="skill-percent">{skill.percent}%</span>
              </div>

              {/* Progress Bar Track */}
              <div className="skill-bar-track">
                <div
                  className="skill-bar-fill"
                  style={{
                    width: inView ? `${skill.percent}%` : '0%',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
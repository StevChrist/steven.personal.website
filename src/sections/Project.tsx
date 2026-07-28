'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import '@/styles/projectCard.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type FilterTab = {
  id: string
  label: string
  icon: string
}

const Project = () => {
  const [activeTab, setActiveTab] = useState<string>('code')
  const [screenWidth, setScreenWidth] = useState(0)
  const sectionRef = useRef<HTMLElement | null>(null)
  const gridRef = useRef<HTMLDivElement | null>(null)

  const { ref: inViewRef } = useInView({
    triggerOnce: false,
    threshold: 0.05,
  })

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filterTabs: FilterTab[] = [
    { id: 'code', label: 'Data Science & Code', icon: '💻' },
    { id: 'design', label: 'UI/UX & Graphic Design', icon: '🎨' },
  ]

  // GSAP ScrollTrigger per Card Animation (Fade-in & Fade-out dynamically on scroll)
  useEffect(() => {
    if (!gridRef.current) return

    const timer = setTimeout(() => {
      if (!gridRef.current) return

      const ctx = gsap.context(() => {
        const cards = gridRef.current?.querySelectorAll('.proj-card-anim')
        if (!cards || cards.length === 0) return

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 70,
              scale: 0.93,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                end: 'bottom 12%',
                toggleActions: 'play reverse play reverse',
              },
            }
          )
        })

        ScrollTrigger.refresh()
      }, gridRef)

      return () => ctx.revert()
    }, 100)

    return () => clearTimeout(timer)
  }, [activeTab])

  const designImages = [
    '/image/Design/1.png',
    '/image/Design/2.png',
    '/image/Design/3.png',
    '/image/Design/4.png',
    '/image/Design/5.png',
    '/image/Design/6.png',
    '/image/Design/7.jpg',
    '/image/Design/8.png',
    '/image/Design/9.png',
    '/image/Photo/1.jpg',
  ]

  const codeProjects = [
    {
      id: 'tbh',
      category: 'code',
      title: 'TBH-Pricing',
      description:
        'TBH Inventory Price Tracker helps Task Bar Hero players monitor, value, and track their in-game item portfolios against the Steam Community Market with real-time price updates in IDR & USD and custom threshold notifications.',
      link: 'https://github.com/StevChrist/tbh-pricing',
      siteLink: 'https://tbh-price.stevchrist.site/',
      previewImage: '/web_preview/TBH-Price.png',
      tags: ['Real-Time Tracker', 'Steam API', 'Portfolio Analytics', 'Full-Stack'],
      isNew: true,
    },
    {
      id: 'peninemate',
      category: 'code',
      title: 'PenineMate',
      description:
        'PenineMate is an academic AI-powered movie assistant developed for portfolio purposes. The application uses the TMDb API to retrieve movie metadata, cast information, and popularity data to support Q&A and semantic-based recommendation features.',
      link: 'https://github.com/StevChrist/peninemate',
      siteLink: 'https://peninemate.stevchrist.site',
      previewImage: '/web_preview/peninemate.png',
      tags: ['AI Assistant', 'Semantic Search', 'TMDb API', 'Next.js', 'NLP'],
    },
    {
      id: 'dwbi',
      category: 'code',
      title: 'Data Warehouse & Business Intelligence',
      description:
        'This project focuses on designing and implementing an enterprise Data Warehouse (DW) and Business Intelligence (BI) system to support monitoring, evaluation, and decision-making for Kerja Praktik (KP) activities at the faculty level.',
      link: 'https://github.com/StevChrist/dw_bi',
      siteLink:
        'https://app.powerbi.com/view?r=eyJrIjoiYjgxODQxNWYtYzRkNi00YWFjLWI1NzktMGMxNzgyOWRiMDgwIiwidCI6IjkwYWZmZTBmLWMyYTMtNDEwOC1iYjk4LTZjZWI0ZTk0ZWYxNSIsImMiOjEwfQ%3D%3D',
      previewImage: '/web_preview/Dw_Bi_1.png',
      tags: ['Power BI', 'Data Warehouse', 'ETL', 'Business Intelligence', 'Analytics'],
    },
    {
      id: 'sentiment',
      category: 'code',
      title: 'Social Sentiment',
      description:
        'SocialSentiment is an AI-powered web application that analyzes the sentiment of YouTube video comments in real time. By simply pasting a YouTube video URL, the platform automatically fetches public comments and classifies each one as Positive, Neutral, or Negative.',
      link: 'https://github.com/StevChrist/social-sentiment',
      siteLink: 'https://social-sentiment.stevchrist.site/',
      previewImage: '/web_preview/social_sentiment.png',
      tags: ['AI / NLP', 'Sentiment Analysis', 'Python', 'Real-Time Scraping', 'Web App'],
    },
    {
      id: 'lumenalyze',
      category: 'code',
      title: 'LumenAlyze',
      description:
        'Provides a complete workflow for data analysis, from CSV file upload and preprocessing (handling missing values, normalization, outlier removal) to three core ML tasks: prediction (Random Forest & MLP), anomaly detection (Isolation Forest), and segmentation (K-Means).',
      link: 'https://github.com/StevChrist/LumenAlyze',
      siteLink: 'https://lumenalyze.vercel.app/',
      previewImage: '/web_preview/Lumenalyze.png',
      tags: ['Machine Learning', 'Random Forest', 'K-Means', 'Anomaly Detection', 'AutoML'],
    },
    {
      id: 'water',
      category: 'code',
      title: 'Project Capstone Water Potability',
      description:
        'This project aims to develop a machine learning-based system that is able to predict the level of potable water quality based on various physical and chemical quality parameters.',
      link: 'https://github.com/StevChrist/water-potability-prediction',
      siteLink: 'https://water-potability-capstone.streamlit.app/',
      previewImage: '/web_preview/aqua_check.png',
      tags: ['Machine Learning', 'Classification', 'Streamlit', 'Python', 'Data Science'],
    },
    {
      id: 'clstm',
      category: 'code',
      title: 'Sentiment Analysis with C-LSTM models',
      description:
        'This project implements sentiment analysis using a Convolutional Long Short-Term Memory (C-LSTM) architecture on text data. It covers preprocessing, C-LSTM model building, training, and prediction.',
      link: 'https://github.com/StevChrist/Sentiment-Analyst-C-LSTM',
      siteLink: 'https://sentimentanalyst-c-lstm.streamlit.app/',
      previewImage: '/web_preview/sentiment_C-LSTM.png',
      tags: ['Deep Learning', 'C-LSTM', 'NLP', 'Neural Networks', 'Python'],
    },
  ]

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
    if (screenWidth >= 2560) return '50px'
    if (screenWidth >= 1920) return '45px'
    if (screenWidth >= 1536) return '40px'
    if (screenWidth >= 1280) return '30px'
    if (screenWidth >= 1024) return '24px'
    if (screenWidth >= 768) return '18px'
    return '14px'
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
      id="projects"
      className="bg-transparent text-white min-h-screen py-16 lg:py-24 flex flex-col justify-center items-center overflow-x-hidden"
      style={{
        paddingTop: '125px', // Spacing gap between Experience and Project
        paddingBottom: '60px',
        paddingLeft: getSectionPadding(),
        paddingRight: getSectionPadding(),
      }}
    >
      <div className="project-container flex flex-col items-center">
        {/* Title */}
        <AnimatedText
          text="Project_"
          className="text-center font-bold gsap-fade-up"
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: getTitleSize(),
            marginBottom: getTitleMargin(),
          }}
          delayStep={0.05}
          triggerOnce={false}
        />

        {/* Filter Tab Buttons */}
        <div className="project-filter-bar gsap-fade-up">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`project-tab ${activeTab === tab.id ? 'active' : 'inactive'}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid Container with Dynamic GSAP ScrollTrigger per Card */}
        <div ref={gridRef} className="w-full">
          <AnimatePresence mode="wait">
            {activeTab === 'code' && (
              <motion.div
                key="code-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="proj-grid">
                  {codeProjects.map((project) => (
                    <div key={project.id} className="proj-card proj-card-anim">
                      {/* Image Preview Area */}
                      <div className="proj-img-wrapper">
                        <Image
                          src={project.previewImage}
                          alt={`${project.title} Preview`}
                          width={700}
                          height={140}
                        />
                        <div className="proj-img-overlay" />

                        {project.isNew && (
                          <div className="proj-badge-new">✦ NEW PROJECT</div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="proj-content">
                        <div>
                          <h3 className="proj-title">{project.title}</h3>
                          <p className="proj-desc">{project.description}</p>

                          {/* Tech Tags */}
                          <div className="proj-tags-row">
                            {project.tags.map((tag, idx) => (
                              <span key={idx} className="proj-tag-pill">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Divider & Action Buttons */}
                        <div>
                          <div className="proj-divider" />
                          <div className="proj-actions">
                            {project.link !== '#' && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-proj-code"
                              >
                                <FaGithub />
                                <span>See Code</span>
                              </a>
                            )}
                            {project.siteLink !== '#' && (
                              <a
                                href={project.siteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-proj-site"
                              >
                                <FaExternalLinkAlt />
                                <span>Visit Site</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'design' && (
              <motion.div
                key="design-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <div className="design-gallery-grid max-w-[1000px] mx-auto">
                  {designImages.map((src, i) => (
                    <div key={i} className="design-card proj-card-anim">
                      <Image
                        src={src}
                        alt={`Design Project ${i + 1}`}
                        width={240}
                        height={300}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Project
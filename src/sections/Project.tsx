'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'
import '@/styles/projectCard.css'

type FilterTab = {
  id: string
  label: string
  icon: string
}

type CodeProject = {
  id: string
  category: string
  title: string
  description: string
  link: string
  siteLink: string
  previewImage: string
  tags: string[]
  isNew?: boolean
  isOngoing?: boolean
  isComingSoon?: boolean
}

type UiUxProject = {
  id: string
  title: string
  description: string
  images: string[]
  tags: string[]
  isNew?: boolean
}

// Full-Screen Enlarged Lightbox Modal Component for Web Design & UI/UX
const UiUxModal = ({
  project,
  onClose,
}: {
  project: UiUxProject
  onClose: () => void
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="uiux-modal-overlay"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="uiux-modal-card"
        >
          {/* Top Right "X" Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Design Preview"
            className="uiux-modal-close-btn"
          >
            <FaTimes />
          </button>

          {/* Large Image Slider Container */}
          <div className="uiux-modal-image-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImgIndex}
                initial={{ opacity: 0.4, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.4, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full relative flex items-center justify-center"
              >
                <Image
                  src={project.images[activeImgIndex]}
                  alt={`${project.title} Large Preview ${activeImgIndex + 1}`}
                  width={1200}
                  height={750}
                  quality={95}
                  priority
                  className="uiux-modal-img"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next / Prev Navigation Buttons in Enlarged View */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous Design Image"
                  className="slider-arrow modal-arrow-left"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next Design Image"
                  className="slider-arrow modal-arrow-right"
                >
                  <FaChevronRight />
                </button>

                {/* Dots Indicator Bar */}
                <div className="slider-dots-container modal-dots">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveImgIndex(idx)
                      }}
                      className={`slider-dot ${idx === activeImgIndex ? 'active' : ''}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Modal Content Footer (Title, Description, Tags) */}
          <div className="uiux-modal-content">
            <h3 className="uiux-modal-title">{project.title}</h3>
            <p className="uiux-modal-desc">{project.description}</p>
            <div className="proj-tags-row mt-2 mb-0">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="proj-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Interactive Image Slider Card Component for Web Design & UI/UX
const UiUxCard = ({
  project,
  index,
  onOpenModal,
}: {
  project: UiUxProject
  index: number
  onOpenModal: () => void
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev + 1) % project.images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.045, y: -6 }}
      viewport={{ amount: 0.1, once: false }}
      transition={{
        duration: 0.55,
        delay: (index % 2) * 0.08,
        ease: 'easeOut',
      }}
      onClick={onOpenModal}
      className="proj-card uiux-card"
    >
      {/* Interactive Image Slider Area */}
      <div className="proj-uiux-slider-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImgIndex}
            initial={{ opacity: 0.3, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.3, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full relative flex items-center justify-center"
          >
            <Image
              src={project.images[activeImgIndex]}
              alt={`${project.title} Preview ${activeImgIndex + 1}`}
              width={700}
              height={280}
              quality={90}
              priority={index === 0}
              className="uiux-slider-img"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={nextImage}
              aria-label="Previous Design Image"
              className="slider-arrow arrow-left"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next Design Image"
              className="slider-arrow arrow-right"
            >
              <FaChevronRight />
            </button>

            {/* Slider Indicator Dots */}
            <div className="slider-dots-container">
              {project.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveImgIndex(idx)
                  }}
                  className={`slider-dot ${idx === activeImgIndex ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Content Area (Title, Description, Tags - NO BUTTONS) */}
      <div className="proj-content uiux-content">
        <div>
          <h3 className="proj-title">{project.title}</h3>
          <div className="proj-desc-container">
            <p className="proj-desc">{project.description}</p>
          </div>
        </div>

        {/* Tech Tags Row */}
        <div className="proj-tags-row mt-auto">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="proj-tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Project = () => {
  const [activeTab, setActiveTab] = useState<string>('code')
  const [screenWidth, setScreenWidth] = useState(0)
  const [selectedUiUxProject, setSelectedUiUxProject] = useState<UiUxProject | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  const { ref: inViewRef } = useInView({
    triggerOnce: false,
    threshold: 0.35,
  })

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filterTabs: FilterTab[] = [
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'uiux', label: 'Web Design & UI/UX', icon: '📐' },
    { id: 'art', label: 'Art & Graphic Design', icon: '🎨' },
  ]

  const row1Images = [
    '/image/Design/1.png',
    '/image/Design/2.png',
    '/image/Design/3.png',
    '/image/Design/4.png',
    '/image/Design/5.png',
  ]

  const row2Images = [
    '/image/Design/6.png',
    '/image/Design/7.jpg',
    '/image/Design/8.png',
    '/image/Design/9.png',
    '/image/Photo/1.jpg',
  ]

  const codeProjects: CodeProject[] = [
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
    {
      id: 'isp',
      category: 'code',
      title: 'Indonesia ISP Analytics Dashboard',
      description:
        'An enterprise data pipeline and interactive analytics dashboard monitoring ISP market share, network latency, and regional broadband performance across Indonesia.',
      link: 'https://github.com/StevChrist/Indonesia-ISP-Analytics-Dashboard',
      siteLink: '#',
      previewImage: '',
      tags: ['Python', 'Playwright', 'Data Pipeline', 'Analytics'],
      isOngoing: true,
    },
  ]

  const uiuxProjects: UiUxProject[] = [
    {
      id: 'uiux-penine',
      title: 'PenineMate AI Platform Interface Design',
      description:
        'User-centric web interface design featuring glassmorphism cards, seamless navigation, interactive chatbot, and semantic recommendation components.',
      images: [
        '/web_design/Peninemate/main page.png',
        '/web_design/Peninemate/about.png',
        '/web_design/Peninemate/chatbot.png',
        '/web_design/Peninemate/Recommendation.png',
        '/web_design/Peninemate/result_recommendation.png',
      ],
      tags: ['UI/UX', 'Figma', 'Web Design', 'Prototyping'],
      isNew: true,
    },
    // {
    //   id: 'uiux-dwbi',
    //   title: 'Enterprise Analytics Dashboard UI/UX Design',
    //   description:
    //     'A sleek, high-tech dark mode dashboard design focusing on data visualization, telemetry monitoring, and interactive BI reporting layout.',
    //   images: [
    //     '/web_preview/Dw_Bi_1.png',
    //     '/web_preview/Lumenalyze.png',
    //     '/web_preview/TBH-Price.png',
    //   ],
    //   tags: ['Figma', 'UI/UX Design', 'Dashboard', 'Dark Mode'],
    // },
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
      className="bg-transparent text-white min-h-screen py-16 lg:py-24 flex flex-col justify-center items-center border-0 outline-none"
      style={{
        paddingTop: '120px',
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
            color: '#00b4d8',
            textShadow: '0 0 16px rgba(0, 180, 216, 0.8), 0 0 35px rgba(0, 136, 255, 0.5)',
          }}
          delayStep={0.05}
          triggerOnce={false}
        />

        {/* 3 Filter Tab Buttons */}
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

        {/* Projects Grid / Marquee Container */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {/* TAB 1: CODE */}
            {activeTab === 'code' && (
              <motion.div
                key="code-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="proj-grid">
                  {codeProjects.slice(0, 10).map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.045, y: -6 }}
                      viewport={{ amount: 0.1, once: false }}
                      transition={{
                        duration: 0.55,
                        delay: (index % 2) * 0.08,
                        ease: 'easeOut',
                      }}
                      className="proj-card"
                    >
                      {/* Image Preview Area */}
                      <div className="proj-img-wrapper">
                        {project.isOngoing || project.isComingSoon || !project.previewImage ? (
                          <div className="proj-coming-soon-banner">
                            <span className="coming-soon-icon">⏳</span>
                            <span className="coming-soon-text">COMING SOON</span>
                            <span className="coming-soon-sub">Development in Progress</span>
                          </div>
                        ) : (
                          <>
                            <Image
                              src={project.previewImage}
                              alt={`${project.title} Preview`}
                              width={700}
                              height={140}
                            />
                            <div className="proj-img-overlay" />
                          </>
                        )}

                        {/* Top-Right Badge */}
                        {project.isOngoing || project.isComingSoon ? (
                          <div className="proj-badge-ongoing">⚙️ ON GOING</div>
                        ) : project.isNew ? (
                          <div className="proj-badge-new">✦ NEW PROJECT</div>
                        ) : null}
                      </div>

                      {/* Content Area */}
                      <div className="proj-content">
                        <div>
                          <h3 className="proj-title">{project.title}</h3>
                          <div className="proj-desc-container">
                            <p className="proj-desc">{project.description}</p>
                          </div>
                        </div>

                        {/* Bottom Group (Tags + Divider + Buttons) */}
                        <div className="proj-bottom-group">
                          {/* Tech Tags */}
                          <div className="proj-tags-row">
                            {project.tags.map((tag, idx) => (
                              <span key={idx} className="proj-tag-pill">
                                {tag}
                              </span>
                            ))}
                          </div>

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
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 2: WEB DESIGN & UI/UX */}
            {activeTab === 'uiux' && (
              <motion.div
                key="uiux-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="proj-grid">
                  {uiuxProjects.map((project, index) => (
                    <UiUxCard
                      key={project.id}
                      project={project}
                      index={index}
                      onOpenModal={() => setSelectedUiUxProject(project)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 3: ART & GRAPHIC DESIGN (Ultra-Fast 60FPS Preloaded Infinite Marquee Carousel) */}
            {activeTab === 'art' && (
              <motion.div
                key="art-marquee"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="art-marquee-wrapper">
                  {/* ROW 1: Right to Left (Scrolls Left) */}
                  <div className="art-marquee-row marquee-left">
                    <div className="art-marquee-track">
                      {[...row1Images, ...row1Images, ...row1Images].map((src, i) => (
                        <div key={`r1-${i}`} className="art-card-item">
                          <Image
                            src={src}
                            alt={`Art Design ${i + 1}`}
                            width={240}
                            height={300}
                            quality={85}
                            priority={i < 10}
                            className="h-[300px] w-auto object-contain rounded-2xl"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ROW 2: Left to Right (Scrolls Right) */}
                  <div className="art-marquee-row marquee-right">
                    <div className="art-marquee-track">
                      {[...row2Images, ...row2Images, ...row2Images].map((src, i) => (
                        <div key={`r2-${i}`} className="art-card-item">
                          <Image
                            src={src}
                            alt={`Art Design ${i + 1}`}
                            width={240}
                            height={300}
                            quality={85}
                            priority={i < 10}
                            className="h-[300px] w-auto object-contain rounded-2xl"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full-Screen Web Design & UI/UX Lightbox Modal */}
      {selectedUiUxProject && (
        <UiUxModal
          project={selectedUiUxProject}
          onClose={() => setSelectedUiUxProject(null)}
        />
      )}
    </section>
  )
}

export default Project
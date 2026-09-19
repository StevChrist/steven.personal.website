'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaTimes, FaSearch, FaLayerGroup } from 'react-icons/fa'
import '@/styles/projectCard.css'

type TableProject = {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  previewImage?: string
  link?: string
  siteLink?: string
}

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

type LightboxProject = {
  id: string
  title: string
  description: string
  images: string[]
  tags: string[]
  isNew?: boolean
}

type UiUxProject = LightboxProject

type DashboardProject = {
  id: string
  title: string
  description: string
  images: string[]
  tags: string[]
  downloadLink?: string
  siteLink?: string
  codeLink?: string
  isNew?: boolean
}

// Full-Screen Enlarged Lightbox Modal Component for Web Design & UI/UX and Dashboards
const UiUxModal = ({
  project,
  onClose,
}: {
  project: LightboxProject
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
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  quality={95}
                  priority
                  className="uiux-modal-img object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next / Prev Navigation Buttons in Enlarged View */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous Design Image"
                  className="slider-arrow arrow-left modal-arrow-left"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next Design Image"
                  className="slider-arrow arrow-right modal-arrow-right"
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

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
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
              onClick={prevImage}
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

// Interactive Dashboard Card Component combining Slider, Badges, Tags, and Action Buttons
const DashboardCard = ({
  project,
  index,
  onOpenModal,
}: {
  project: DashboardProject
  index: number
  onOpenModal: () => void
}) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImgIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
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
      className="proj-card"
    >
      {/* Interactive Image Slider Area */}
      <div
        className="proj-uiux-slider-wrapper"
        onClick={onOpenModal}
        style={{ cursor: 'pointer' }}
      >
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

        {/* Top-Right Badge */}
        {project.isNew && (
          <div className="proj-badge-new">✦ POWER BI</div>
        )}

        {/* Navigation Arrows */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous Dashboard Page"
              className="slider-arrow arrow-left"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next Dashboard Page"
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
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Content Area */}
      <div className="proj-content">
        <div>
          <h3
            className="proj-title cursor-pointer"
            onClick={onOpenModal}
          >
            {project.title}
          </h3>
          <div className="proj-desc-container">
            <p className="proj-desc">{project.description}</p>
          </div>
        </div>

        {/* Bottom Group (Tags + Divider + Buttons) */}
        <div className="proj-bottom-group">
          {/* Tech Tags Row */}
          <div className="proj-tags-row">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="proj-tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="proj-divider" />

          {/* Action Buttons */}
          <div className="proj-actions">
            {project.codeLink && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-proj-code"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub />
                <span>See Code</span>
              </a>
            )}
            {project.siteLink !== undefined && (
              <a
                href={project.siteLink || '#'}
                target={project.siteLink ? "_blank" : undefined}
                rel={project.siteLink ? "noopener noreferrer" : undefined}
                className={`btn-proj-site ${!project.siteLink ? 'opacity-70 cursor-pointer' : ''}`}
                title={project.siteLink ? "Open Live Report" : "Live Report URL coming soon"}
                onClick={(e) => {
                  e.stopPropagation()
                  if (!project.siteLink) {
                    e.preventDefault()
                  }
                }}
              >
                <FaExternalLinkAlt />
                <span>Live Report</span>
              </a>
            )}
            <button
              type="button"
              onClick={onOpenModal}
              className="btn-proj-site"
              title="Enlarge Visuals"
            >
              <FaExternalLinkAlt />
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Project = () => {
  const [activeTab, setActiveTab] = useState<string>('code')
  const [screenWidth, setScreenWidth] = useState(0)
  const [selectedLightboxProject, setSelectedLightboxProject] = useState<LightboxProject | null>(null)
  const [isTableModalOpen, setIsTableModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const sectionRef = useRef<HTMLElement | null>(null)

  const { ref: inViewRef } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedLightboxProject(null)
        setIsTableModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filterTabs: FilterTab[] = [
    { id: 'code', label: 'Code', icon: '💻' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'uiux', label: 'Web Design & UI/UX', icon: '📐' },
    { id: 'art', label: 'Art & Graphic Design', icon: '🎨' },
  ]

  const row1Images = [
    '/image/Design/1.webp',
    '/image/Design/2.webp',
    '/image/Design/3.webp',
    '/image/Design/4.webp',
    '/image/Design/5.webp',
  ]

  const row2Images = [
    '/image/Design/6.webp',
    '/image/Design/7.webp',
    '/image/Design/8.webp',
    '/image/Design/9.webp',
    '/image/Photo/1.webp',
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
      siteLink: 'https://github.com/StevChrist/Indonesia-ISP-Analytics-Dashboard',
      previewImage: '',
      tags: ['Python', 'Playwright', 'Data Pipeline', 'Analytics'],
      isOngoing: true,
    },
  ]

  const dashboardProjects: DashboardProject[] = [
    {
      id: 'global-superstore',
      title: 'Global Executive Sales & Profitability Dashboard',
      description:
        'Executive-level interactive Business Intelligence dashboard in Microsoft Power BI analyzing 51,290 transactions across 147 countries ($12.64M Sales, $1.47M Profit). Features Star Schema modeling, advanced DAX time intelligence (YoY, SPLY), profit margin diagnostics, discount erosion analysis, and geospatial logistics analytics.',
      images: [
        '/dashboard/global_superstore/Page_1_Executive_Overview.png',
        '/dashboard/global_superstore/Page_2_Product_Profitability.png',
        '/dashboard/global_superstore/Page_3_Customer_Logistics.png',
      ],
      codeLink: 'https://github.com/StevChrist/Global-Superstore-Sales-Dashboard',
      siteLink: '',
      tags: ['Power BI', 'DAX', 'Star Schema', 'Executive KPI', 'Sales Analytics', 'Logistics'],
      isNew: true,
    },
    {
      id: 'dwbi-dash',
      title: 'Data Warehouse & Business Intelligence (Kerja Praktik)',
      description:
        'Interactive enterprise Data Warehouse and Business Intelligence dashboard supporting monitoring, evaluation, and executive decision-making for university faculty internships (Kerja Praktik).',
      images: [
        '/web_preview/Dw_Bi_1.png',
      ],
      siteLink:
        'https://app.powerbi.com/view?r=eyJrIjoiYjgxODQxNWYtYzRkNi00YWFjLWI1NzktMGMxNzgyOWRiMDgwIiwidCI6IjkwYWZmZTBmLWMyYTMtNDEwOC1iYjk4LTZjZWI0ZTk0ZWYxNSIsImMiOjEwfQ%3D%3D',
      codeLink: 'https://github.com/StevChrist/dw_bi',
      tags: ['Power BI', 'Data Warehouse', 'ETL', 'Business Intelligence', 'Analytics'],
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
  ]

  const tableProjects: TableProject[] = [
    {
      id: 'fsb',
      title: 'FSB — Fragen Sie Bot (German Cuisine Assistant)',
      description:
        'AI-powered culinary assistant answering questions about traditional German cuisine with real-time NLP and curated recipe recommendations.',
      category: 'Full-Stack',
      tags: ['Next.js', 'AI Assistant', 'NLP', 'Tailwind CSS', 'Vercel'],
      link: 'https://github.com/StevChrist/FSB',
      siteLink: 'https://fsb-515p.vercel.app/',
    },
    {
      id: 'flixzy',
      title: 'Flixzy — Movie Streaming & Discovery Platform',
      description:
        'Interactive movie streaming catalog and trailer recommendation web platform powered by the TMDb API with responsive UI.',
      category: 'Web App',
      tags: ['React', 'TMDb API', 'Streaming UI', 'CSS Modules', 'Vercel'],
      link: 'https://github.com/StevChrist/flixzy',
      siteLink: 'https://flixzy.vercel.app',
    },
    {
      id: 'anomaly-transformer',
      title: 'Anomaly Detection Using Transformer on Oil & Gas Telemetry',
      description:
        'Undergraduate thesis implementing a Transformer-based temporal anomaly detection architecture on industrial multi-sensor telemetry time series.',
      category: 'AI / Machine Learning',
      tags: ['Deep Learning', 'Transformers', 'PyTorch', 'Time Series', 'Industrial IoT'],
      link: 'https://github.com/StevChrist/Anomaly-Detection-Using-Transformer-Method-on-Oil-and-Gas-Operational-Data',
    },
    {
      id: 'penbot',
      title: 'PenBot — 24/7 Discord Radio & Utility Bot',
      description:
        'High-performance Discord bot featuring 24/7 Indonesian radio streaming, voice channel audio management, moderation, and utility commands.',
      category: 'Bot & Automation',
      tags: ['Discord.js', 'TypeScript', 'Node.js', 'Audio Streaming', 'Automation'],
      previewImage: '/web_preview/penbot.jpg',
      link: 'https://github.com/StevChrist/PenBot',
    },
    {
      id: 'food-order',
      title: 'Food Order — Restaurant & Delivery System',
      description:
        'Full-stack food ordering platform with real-time shopping cart state, menu catalog management, and responsive order checkout flow.',
      category: 'Full-Stack',
      tags: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
      link: 'https://github.com/StevChrist/Food-Order',
    },
    {
      id: 'penforge-agent',
      title: 'PenForge — Autonomous Agent Engineering Framework',
      description:
        'Autonomous software engineering multi-agent framework orchestrating LLM agents with specialized tool calling and sandboxed code execution.',
      category: 'AI / Machine Learning',
      tags: ['Autonomous Agents', 'LLM', 'Multi-Agent', 'TypeScript', 'Docker'],
    },
    {
      id: 'craftrelay',
      title: 'CraftRelay — High-Throughput Messaging Relay',
      description:
        'High-performance relay and distributed messaging infrastructure with real-time observability and web status dashboard.',
      category: 'DevOps / Tools',
      tags: ['Go', 'Distributed Systems', 'Relay Engine', 'Networking'],
      link: 'https://github.com/StevChrist/craftrelay',
    },
    {
      id: 'instasentiment',
      title: 'InstaSentiment — Social Media NLP Analysis',
      description:
        'Multilingual sentiment analysis system fine-tuned on mBERT (Multilingual BERT) achieving 0.91 accuracy on social media comments.',
      category: 'AI / Machine Learning',
      tags: ['mBERT', 'NLP', 'Transformers', 'Python', 'Analytics'],
    },
    {
      id: 'nexushub',
      title: 'NexusHub — 9-Router AI Gateway & Reverse Proxy',
      description:
        'Enterprise multi-model LLM router and reverse proxy providing unified API routing, load balancing, and failover across 9+ AI providers.',
      category: 'Full-Stack',
      tags: ['AI Gateway', 'Reverse Proxy', 'Full-Stack', 'Next.js'],
    },
    {
      id: 'maintenance-page',
      title: 'Sleek Maintenance & Service Standby Portal',
      description:
        'Glassmorphic real-time system status and maintenance notification portal for production service downtime and incident alerts.',
      category: 'Web App',
      tags: ['Next.js', 'Tailwind CSS', 'Vercel', 'DevOps'],
      link: 'https://github.com/StevChrist/maintenance-page',
      siteLink: 'https://maintenance-page-two-gamma.vercel.app',
    },
  ]

  const filteredTableProjects = tableProjects.filter((p) => {
    if (!searchTerm.trim()) return true
    const term = searchTerm.toLowerCase()
    return (
      p.title.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.tags.some((t) => t.toLowerCase().includes(term))
    )
  })

  const getTitleSize = () => {
    if (screenWidth >= 2560) return '110px'
    if (screenWidth >= 1920) return '90px'
    if (screenWidth >= 1536) return '76px'
    if (screenWidth >= 1280) return '68px'
    if (screenWidth >= 1024) return '60px'
    if (screenWidth >= 768) return '52px'
    if (screenWidth >= 425) return '42px'
    if (screenWidth >= 375) return '38px'
    return '34px'
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
      className="bg-transparent text-white min-h-screen w-full flex flex-col justify-start items-center border-0 outline-none"
      style={{
        paddingTop: '90px',
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
            color: '#64b59b',
            textShadow: '0 0 20px rgba(64, 138, 113, 0.8), 0 0 40px rgba(100, 181, 155, 0.5)',
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

            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="proj-grid">
                  {dashboardProjects.map((project, index) => (
                    <DashboardCard
                      key={project.id}
                      project={project}
                      index={index}
                      onOpenModal={() => setSelectedLightboxProject(project)}
                    />
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
                      onOpenModal={() => setSelectedLightboxProject(project)}
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

        {/* GitHub Callout Banner */}
        <div className="project-github-callout">
          <div className="project-github-callout-text">
            <h3 className="project-github-callout-title">
              Want to see other projects?
            </h3>
            <p className="project-github-callout-desc">
              Explore the complete archive of builds, experiments, and open-source repositories.
            </p>
          </div>
          <div className="project-callout-actions">
            <button
              type="button"
              onClick={() => setIsTableModalOpen(true)}
              className="project-seemore-btn"
              title="View all projects in table format"
            >
              <FaLayerGroup className="project-seemore-btn-icon" />
              <span>See More</span>
            </button>
            <a
              href="https://github.com/StevChrist"
              target="_blank"
              rel="noopener noreferrer"
              className="project-github-btn"
              title="Visit Steven's GitHub Profile"
            >
              <span>Visit GitHub</span>
              <FaExternalLinkAlt className="project-github-btn-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Full-Screen Web Design & UI/UX / Dashboard Lightbox Modal */}
      {selectedLightboxProject && (
        <UiUxModal
          project={selectedLightboxProject}
          onClose={() => setSelectedLightboxProject(null)}
        />
      )}

      {/* Pop-up Table Modal for All Other Projects */}
      <AnimatePresence>
        {isTableModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsTableModalOpen(false)}
            className="proj-table-modal-overlay"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="proj-table-modal-card"
            >
              {/* Modal Header */}
              <div className="proj-table-modal-header">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="proj-badge-new text-xs">✦ PROJECT ARCHIVE</span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      ({tableProjects.length} Projects)
                    </span>
                  </div>
                  <h2 className="proj-table-modal-title">All Other Projects</h2>
                  <p className="proj-table-modal-subtitle">
                    Complete list of additional repositories, tools, experiments, and production builds.
                  </p>
                </div>
                <button
                  onClick={() => setIsTableModalOpen(false)}
                  aria-label="Close Project List"
                  className="uiux-modal-close-btn"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Search Bar */}
              <div className="proj-table-search-bar">
                <div className="relative flex-1">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm" />
                  <input
                    type="text"
                    placeholder="Search projects by title, tech stack, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="proj-table-search-input"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Table Container */}
              <div className="proj-table-scroll-container">
                <table className="proj-table">
                  <thead>
                    <tr>
                      <th className="th-project">Project</th>
                      <th className="th-tech">Tech Stack / Features</th>
                      <th className="th-actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTableProjects.length > 0 ? (
                      filteredTableProjects.map((project) => (
                        <tr key={project.id} className="proj-table-row">
                          {/* Column 1: Image + Title + Description */}
                          <td className="td-project">
                            <div className="proj-table-project-cell">
                              <div className="proj-table-thumb-wrapper">
                                {project.previewImage ? (
                                  <Image
                                    src={project.previewImage}
                                    alt={project.title}
                                    width={84}
                                    height={52}
                                    className="proj-table-thumb-img"
                                  />
                                ) : (
                                  <div className="proj-table-thumb-fallback">
                                    <FaLayerGroup className="text-emerald-400 text-lg opacity-80" />
                                  </div>
                                )}
                              </div>
                              <div className="proj-table-info">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="proj-table-project-title">
                                    {project.title}
                                  </span>
                                  {project.category && (
                                    <span className="proj-table-category-badge">
                                      {project.category}
                                    </span>
                                  )}
                                </div>
                                <p className="proj-table-project-desc">
                                  {project.description}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Column 2: Tech Stack / Features */}
                          <td className="td-tech">
                            <div className="proj-table-tags">
                              {project.tags.map((t, idx) => (
                                <span key={idx} className="proj-table-tag-pill">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* Column 3: Actions (See Code & Visit Site) */}
                          <td className="td-actions">
                            <div className="proj-table-actions-cell">
                              {project.link ? (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-table-code"
                                  title="View source code on GitHub"
                                >
                                  <FaGithub />
                                  <span>See Code</span>
                                </a>
                              ) : (
                                <span
                                  className="btn-table-disabled"
                                  title="Repository is private or academic"
                                >
                                  <FaGithub />
                                  <span>Internal</span>
                                </span>
                              )}

                              {project.siteLink ? (
                                <a
                                  href={project.siteLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-table-site"
                                  title="Visit live deployment"
                                >
                                  <FaExternalLinkAlt />
                                  <span>Visit Site</span>
                                </a>
                              ) : (
                                <span
                                  className="btn-table-disabled opacity-50"
                                  title="No public live deployment"
                                >
                                  <FaExternalLinkAlt />
                                  <span>Visit Site</span>
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center py-12 text-white/50 text-sm">
                          No projects found matching &ldquo;{searchTerm}&rdquo;
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Modal Footer */}
              <div className="proj-table-modal-footer">
                <span className="text-xs text-white/50">
                  Showing {filteredTableProjects.length} of {tableProjects.length} projects
                </span>
                <button
                  onClick={() => setIsTableModalOpen(false)}
                  className="proj-table-footer-close"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Project
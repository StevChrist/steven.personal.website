'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const categories = ['Code', 'Design']

const Project = () => {
    const [activeCategory, setActiveCategory] = useState('Code')
    const [screenWidth, setScreenWidth] = useState(0)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Setup GSAP animations - RE-INITIALIZE saat category berubah
    useEffect(() => {
        if (!sectionRef.current) return

        // Kill ONLY ScrollTrigger instances with our unique data attribute
        const triggers = ScrollTrigger.getAll()
        triggers.forEach(trigger => {
            // Only kill triggers that belong to this component
            if (trigger.vars.id && trigger.vars.id.startsWith('project-card-')) {
                trigger.kill(true)
            }
        })

        // Delay untuk AnimatePresence
        const timer = setTimeout(() => {
            if (!sectionRef.current) return

            // Query ONLY elements with unique class inside this section
            const elements = sectionRef.current.querySelectorAll<HTMLElement>('.project-card-animate')

            elements.forEach((element, index) => {
                // Set initial state
                gsap.set(element, {
                    opacity: 0,
                    y: 80,
                    scale: 0.95
                })

                // Create animation with unique ID
                gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        id: `project-card-${index}`, // Unique ID untuk setiap trigger
                        trigger: element,
                        start: 'top 90%',
                        end: 'top 10%',
                        toggleActions: 'play none none reverse',
                        scrub: 0.5,
                        // markers: true, // Uncomment untuk debugging
                    },
                })
            })

            // Refresh hanya setelah semua animation di-setup
            ScrollTrigger.refresh()
        }, 350)

        return () => {
            clearTimeout(timer)
        }
    }, [activeCategory])

    // Function untuk ukuran judul berdasarkan device
    const getTitleSize = () => {
        if (screenWidth >= 2560) return '80px'
        if (screenWidth >= 1920) return '75px'
        if (screenWidth >= 1536) return '70px'
        if (screenWidth >= 1280) return '70px'
        if (screenWidth >= 1024) return '65px'
        if (screenWidth >= 800) return '50px'
        if (screenWidth >= 768) return '55px'
        if (screenWidth >= 640) return '45px'
        if (screenWidth >= 568) return '32px'
        return '28px'
    }

    const getTitleMargin = () => {
        if (screenWidth >= 2560) return '60px'
        if (screenWidth >= 1920) return '55px'
        if (screenWidth >= 1536) return '50px'
        if (screenWidth >= 1280) return '50px'
        if (screenWidth >= 1024) return '45px'
        if (screenWidth >= 800) return '30px'
        if (screenWidth >= 768) return '35px'
        if (screenWidth >= 640) return '25px'
        if (screenWidth >= 568) return '18px'
        return '15px'
    }

    const getCategorySize = () => {
        if (screenWidth >= 2560) return '24px'
        if (screenWidth >= 1920) return '22px'
        if (screenWidth >= 1536) return '20px'
        if (screenWidth >= 1280) return '20px'
        if (screenWidth >= 1024) return '18px'
        if (screenWidth >= 800) return '16px'
        if (screenWidth >= 768) return '17px'
        if (screenWidth >= 640) return '14px'
        if (screenWidth >= 568) return '12px'
        return '10px'
    }

    const getCategoryGap = () => {
        if (screenWidth >= 2560) return '60px'
        if (screenWidth >= 1920) return '55px'
        if (screenWidth >= 1536) return '50px'
        if (screenWidth >= 1280) return '50px'
        if (screenWidth >= 1024) return '40px'
        if (screenWidth >= 800) return '30px'
        if (screenWidth >= 768) return '35px'
        if (screenWidth >= 640) return '25px'
        if (screenWidth >= 568) return '20px'
        return '15px'
    }

    const getSectionPadding = () => {
        if (screenWidth >= 2560) return '60px'
        if (screenWidth >= 1920) return '55px'
        if (screenWidth >= 1536) return '50px'
        if (screenWidth >= 1280) return '50px'
        if (screenWidth >= 1024) return '45px'
        if (screenWidth >= 800) return '30px'
        if (screenWidth >= 768) return '35px'
        if (screenWidth >= 640) return '25px'
        if (screenWidth >= 568) return '15px'
        return '12px'
    }

    const getContentMargin = () => {
        if (screenWidth >= 2560) return '70px'
        if (screenWidth >= 1920) return '65px'
        if (screenWidth >= 1536) return '60px'
        if (screenWidth >= 1280) return '70px'
        if (screenWidth >= 1024) return '55px'
        if (screenWidth >= 800) return '40px'
        if (screenWidth >= 768) return '45px'
        if (screenWidth >= 640) return '30px'
        if (screenWidth >= 568) return '20px'
        return '15px'
    }

    const getImageLimit = () => {
        if (screenWidth >= 2560) return 12
        if (screenWidth >= 1920) return 12
        if (screenWidth >= 1536) return 12
        if (screenWidth >= 1280) return 12
        if (screenWidth >= 1024) return 10
        if (screenWidth >= 800) return 8
        if (screenWidth >= 768) return 8
        if (screenWidth >= 640) return 6
        return 6
    }

    const getGridLayout = () => {
        if (screenWidth >= 2560) return 6
        if (screenWidth >= 1920) return 6
        if (screenWidth >= 1536) return 6
        if (screenWidth >= 1280) return 6
        if (screenWidth >= 1024) return 5
        if (screenWidth >= 800) return 4
        if (screenWidth >= 768) return 4
        if (screenWidth >= 640) return 3
        return 2
    }

    const getImageSize = () => {
        if (screenWidth >= 2560) return { width: '200px', height: '250px' }
        if (screenWidth >= 1920) return { width: '190px', height: '237px' }
        if (screenWidth >= 1536) return { width: '180px', height: '225px' }
        if (screenWidth >= 1280) return { width: '170px', height: '212px' }
        if (screenWidth >= 1024) return { width: '160px', height: '200px' }
        if (screenWidth >= 800) return { width: '140px', height: '175px' }
        if (screenWidth >= 768) return { width: '150px', height: '187px' }
        if (screenWidth >= 640) return { width: '140px', height: '175px' }
        if (screenWidth >= 568) return { width: '120px', height: '150px' }
        return { width: '110px', height: '137px' }
    }

    const getImageGap = () => {
        if (screenWidth >= 2560) return '25px'
        if (screenWidth >= 1920) return '22px'
        if (screenWidth >= 1536) return '20px'
        if (screenWidth >= 1280) return '18px'
        if (screenWidth >= 1024) return '25px'
        if (screenWidth >= 800) return '20px'
        if (screenWidth >= 768) return '22px'
        if (screenWidth >= 640) return '20px'
        if (screenWidth >= 568) return '15px'
        return '12px'
    }

    const isMobileLayout = () => {
        return screenWidth < 1024
    }

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
        '/image/Photo/1.jpg'
    ]

    const codeProjects = [
        {
            title: 'TBH-Pricing',
            description: 'TBH Inventory Price Tracker helps Task Bar Hero players monitor, value, and track their in-game item portfolios against the Steam Community Market with real-time price updates in IDR & USD and custom threshold notifications.',
            link: 'https://github.com/StevChrist/tbh-pricing',
            siteLink: 'https://tbh-price.stevchrist.site/',
            previewImage: '/web_preview/TBH-Price.png',
            tags: ['Real-Time Tracker', 'Steam API', 'Portfolio Analytics', 'Full-Stack'],
            isNew: true
        },
        {
            title: 'PenineMate',
            description: 'PenineMate is an academic AI-powered movie assistant developed for portfolio purposes. The application uses the TMDb API to retrieve movie metadata, cast information, and popularity data to support Q&A and semantic-based recommendation features.',
            link: 'https://github.com/StevChrist/peninemate',
            siteLink: 'https://peninemate.stevchrist.site',
            previewImage: '/web_preview/peninemate.png',
            tags: ['AI Assistant', 'Semantic Search', 'TMDb API', 'Next.js', 'NLP']
        },
        {
            title: 'Data Warehouse and Business Intelligence',
            description: 'This project focuses on designing and implementing an enterprise Data Warehouse (DW) and Business Intelligence (BI) system to support monitoring, evaluation, and decision-making for Kerja Praktik (KP) activities at the faculty level.',
            link: 'https://github.com/StevChrist/dw_bi',
            siteLink: 'https://app.powerbi.com/view?r=eyJrIjoiYjgxODQxNWYtYzRkNi00YWFjLWI1NzktMGMxNzgyOWRiMDgwIiwidCI6IjkwYWZmZTBmLWMyYTMtNDEwOC1iYjk4LTZjZWI0ZTk0ZWYxNSIsImMiOjEwfQ%3D%3D',
            previewImage: '/web_preview/Dw_Bi_1.png',
            tags: ['Power BI', 'Data Warehouse', 'ETL', 'Business Intelligence', 'Analytics']
        },
        {
            title: 'Social Sentiment',
            description: 'SocialSentiment is an AI-powered web application that analyzes the sentiment of YouTube video comments in real time. By simply pasting a YouTube video URL, the platform automatically fetches public comments and classifies each one as Positive, Neutral, or Negative.',
            link: 'https://github.com/StevChrist/social-sentiment',
            siteLink: 'https://social-sentiment.stevchrist.site/',
            previewImage: '/web_preview/social_sentiment.png',
            tags: ['AI / NLP', 'Sentiment Analysis', 'Python', 'Real-Time Scraping', 'Web App']
        },
        {
            title: 'LumenAlyze',
            description: 'Provides a complete workflow for data analysis, from CSV file upload and preprocessing (handling missing values, normalization, outlier removal) to three core ML tasks: prediction (Random Forest & MLP), anomaly detection (Isolation Forest), and segmentation (K-Means).',
            link: 'https://github.com/StevChrist/LumenAlyze',
            siteLink: 'https://lumenalyze.vercel.app/',
            previewImage: '/web_preview/Lumenalyze.png',
            tags: ['Machine Learning', 'Random Forest', 'K-Means', 'Anomaly Detection', 'AutoML']
        },
        {
            title: 'Project Capstone Water Potability',
            description: 'This project aims to develop a machine learning-based system that is able to predict the level of potable water quality based on various physical and chemical quality parameters.',
            link: 'https://github.com/StevChrist/water-potability-prediction',
            siteLink: 'https://water-potability-capstone.streamlit.app/',
            previewImage: '/web_preview/aqua_check.png',
            tags: ['Machine Learning', 'Classification', 'Streamlit', 'Python', 'Data Science']
        },
        {
            title: 'Sentiment Analysis with C-LSTM models',
            description: 'This project implements sentiment analysis using a Convolutional Long Short-Term Memory (C-LSTM) architecture on text data. It covers preprocessing, C-LSTM model building, training, and prediction.',
            link: 'https://github.com/StevChrist/Sentiment-Analyst-C-LSTM',
            siteLink: 'https://sentimentanalyst-c-lstm.streamlit.app/',
            previewImage: '/web_preview/sentiment_C-LSTM.png',
            tags: ['Deep Learning', 'C-LSTM', 'NLP', 'Neural Networks', 'Python']
        },
        {
            title: 'Coming Soon',
            description: 'Innovative new Data Science and AI projects currently in development.',
            link: '#',
            siteLink: '#',
            previewImage: '/image/background.png',
            tags: ['In Progress']
        },
    ]

    const imageSize = getImageSize()
    const imageLimit = getImageLimit()
    const gridCols = getGridLayout()

    const renderProjects = () => {
        switch (activeCategory) {
            case 'Design':
                return (
                    <motion.div
                        key="design"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            marginLeft: isMobileLayout() ? getContentMargin() : '0',
                            marginRight: isMobileLayout() ? getContentMargin() : '0'
                        }}
                    >
                        <div
                            className="grid justify-center"
                            style={{
                                gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                                gap: getImageGap(),
                                maxWidth: isMobileLayout() ? '100%' : '1200px',
                                margin: '0 auto'
                            }}
                        >
                            {designImages.slice(0, imageLimit).map((src, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-800 rounded-[12px] overflow-hidden project-card-animate transition-all duration-300 hover:scale-105 border border-transparent hover:border-blue-500 hover:shadow-[0_0_22px_rgba(59,130,246,0.6)] cursor-pointer"
                                    style={{
                                        width: imageSize.width,
                                        height: imageSize.height
                                    }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Design Project ${i + 1}`}
                                        width={parseInt(imageSize.width)}
                                        height={parseInt(imageSize.height)}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )
            case 'Code':
                return (
                    <motion.div
                        key="code"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ width: '100%' }}
                    >
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: isMobileLayout() ? '1fr' : 'repeat(2, 1fr)',
                                gap: '28px',
                                paddingTop: '40px',
                                maxWidth: '1200px',
                                margin: '0 auto',
                            }}
                        >
                            {codeProjects.map((project, index) => (
                                <div
                                    key={index}
                                    className="project-card-animate"
                                    style={{
                                        background: 'linear-gradient(160deg, rgba(22, 26, 38, 0.98) 0%, rgba(13, 16, 26, 0.99) 100%)',
                                        borderRadius: '18px',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        position: 'relative',
                                        transition: 'box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease',
                                        cursor: 'default',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(37,99,235,0.2), 0 4px 20px rgba(0,0,0,0.45)'
                                            ; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(96,165,250,0.25)'
                                            ; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.45)'
                                            ; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
                                            ; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                                    }}
                                >
                                    {/* ── Image Section (Short & Compact Vertical Height) ── */}
                                    <div
                                        style={{
                                            position: 'relative',
                                            borderRadius: '18px 18px 0 0',
                                            overflow: 'hidden',
                                            height: '140px',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <Image
                                            src={project.previewImage}
                                            alt={`${project.title} Preview`}
                                            width={700}
                                            height={140}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                filter: project.title === 'Coming Soon'
                                                    ? 'blur(3px) grayscale(60%) brightness(0.6)'
                                                    : 'brightness(0.85)',
                                            }}
                                        />
                                        {/* Gradient overlay */}
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,16,26,0.75) 100%)',
                                        }} />

                                        {/* NEW PROJECT badge — top-right of image */}
                                        {project.isNew && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                background: 'linear-gradient(135deg, #1d4ed8, #6366f1)',
                                                color: 'white',
                                                padding: '4px 12px',
                                                borderRadius: '999px',
                                                fontSize: '9.5px',
                                                fontWeight: 800,
                                                letterSpacing: '0.12em',
                                                textTransform: 'uppercase',
                                                boxShadow: '0 2px 12px rgba(37,99,235,0.6)',
                                                border: '1px solid rgba(255,255,255,0.25)',
                                            }}>
                                                ✦ NEW PROJECT
                                            </div>
                                        )}

                                        {/* Coming Soon text overlay */}
                                        {project.title === 'Coming Soon' && (
                                            <div style={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                <span style={{
                                                    color: 'rgba(255,255,255,0.5)',
                                                    fontSize: '20px',
                                                    fontWeight: 700,
                                                    letterSpacing: '0.05em',
                                                    fontFamily: "'Pacifico', cursive",
                                                }}>Coming Soon</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* ── Content Section (Vertically Shortened & Tight) ── */}
                                    <div
                                        style={{
                                            padding: '16px 20px 14px 20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 1,
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        {/* Top Text Area with compact minHeight to keep dividers perfectly aligned */}
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            minHeight: '145px',
                                            justifyContent: 'space-between',
                                        }}>
                                            {/* Title & Description */}
                                            <div>
                                                <h3 style={{
                                                    fontSize: '16px',
                                                    fontWeight: 700,
                                                    color: '#f1f5f9',
                                                    textAlign: 'center',
                                                    marginBottom: '8px',
                                                    letterSpacing: '0.01em',
                                                    lineHeight: '1.3',
                                                }}>
                                                    {project.title}
                                                </h3>

                                                <p style={{
                                                    fontSize: '12.5px',
                                                    color: '#94a3b8',
                                                    lineHeight: '1.65',
                                                    textAlign: 'center',
                                                    margin: '0',
                                                    padding: '0',
                                                }}>
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Tech Stack Tags */}
                                            {project.tags && project.tags.length > 0 && (
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '6px',
                                                    justifyContent: 'center',
                                                    marginTop: '10px',
                                                    marginBottom: '8px',
                                                }}>
                                                    {project.tags.map((tag, idx) => (
                                                        <span key={idx} style={{
                                                            fontSize: '10.5px',
                                                            padding: '2.5px 10px',
                                                            borderRadius: '999px',
                                                            background: 'rgba(30, 58, 138, 0.4)',
                                                            border: '1px solid rgba(96, 165, 250, 0.25)',
                                                            color: '#93c5fd',
                                                            fontWeight: 500,
                                                            letterSpacing: '0.02em',
                                                            whiteSpace: 'nowrap',
                                                        }}>
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* ── Divider & Actions (Consistently Aligned) ── */}
                                        <div>
                                            <div style={{
                                                height: '1px',
                                                background: 'rgba(255,255,255,0.07)',
                                                marginBottom: '12px',
                                                marginTop: '6px',
                                            }} />

                                            <div style={{
                                                display: 'flex',
                                                gap: '10px',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                {project.link !== '#' && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.05, boxShadow: '0 4px 16px rgba(37,99,235,0.45)' }}
                                                        whileTap={{ scale: 0.96 }}
                                                        transition={{ duration: 0.15 }}
                                                        onClick={() => window.open(project.link, '_blank')}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '7px',
                                                            padding: '7px 16px',
                                                            borderRadius: '999px',
                                                            background: 'rgba(29, 78, 216, 0.85)',
                                                            border: '1px solid rgba(96, 165, 250, 0.35)',
                                                            color: 'white',
                                                            fontSize: '12px',
                                                            fontFamily: "'Protest Riot', cursive",
                                                            fontWeight: 600,
                                                            cursor: 'pointer',
                                                            letterSpacing: '0.02em',
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
                                                        <FaGithub style={{ fontSize: '13px', flexShrink: 0 }} />
                                                        <span>See Code</span>
                                                    </motion.button>
                                                )}
                                                {project.siteLink !== '#' && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.05, background: 'rgba(29,78,216,0.2)' }}
                                                        whileTap={{ scale: 0.96 }}
                                                        transition={{ duration: 0.15 }}
                                                        onClick={() => window.open(project.siteLink, '_blank')}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            gap: '7px',
                                                            padding: '7px 16px',
                                                            borderRadius: '999px',
                                                            background: 'transparent',
                                                            border: '1px solid rgba(96, 165, 250, 0.3)',
                                                            color: '#93c5fd',
                                                            fontSize: '12px',
                                                            fontFamily: "'Protest Riot', cursive",
                                                            fontWeight: 600,
                                                            cursor: 'pointer',
                                                            letterSpacing: '0.02em',
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
                                                        <FaExternalLinkAlt style={{ fontSize: '11px', flexShrink: 0 }} />
                                                        <span>Visit Site</span>
                                                    </motion.button>
                                                )}
                                                {project.link === '#' && project.siteLink === '#' && (
                                                    <span style={{
                                                        color: '#475569',
                                                        fontSize: '12px',
                                                        fontStyle: 'italic',
                                                        letterSpacing: '0.02em',
                                                        padding: '4px 0',
                                                    }}>
                                                        In Development
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )
            default:
                return null
        }
    }

    return (
        <section
            id="projects"
            className="skills min-h-[100vh] bg-black text-white"
            ref={sectionRef}
            style={{
                padding: `40px ${getSectionPadding()} 0`
            }}
        >
            <div className="flex flex-col justify-center items-center">
                <AnimatedText
                    text="Projet_"
                    className="text-center font-bold"
                    style={{
                        fontFamily: "'Pacifico', cursive",
                        fontSize: getTitleSize(),
                        marginBottom: getTitleMargin()
                    }}
                    delayStep={0.05}
                    triggerOnce={false}
                />
            </div>

            {/* Kategori with responsive design */}
            <div
                className="flex justify-center pb-[25px]"
                style={{
                    gap: getCategoryGap()
                }}
            >
                {categories.map((category) => (
                    <motion.span
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`cursor-pointer font-bold transition-all duration-200 ${activeCategory === category ? 'underline text-white' : 'text-gray-400'
                            }`}
                        style={{
                            fontFamily: "'Pacifico', cursive",
                            fontSize: getCategorySize()
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </motion.span>
                ))}
            </div>

            {/* Konten Projek with animation */}
            <div className="flex justify-center mt-6">
                <AnimatePresence mode="wait">
                    {renderProjects()}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Project
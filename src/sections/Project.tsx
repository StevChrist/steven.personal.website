'use client'

import {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = ['Code', 'Design']

const Project = () => {
    const [activeCategory, setActiveCategory] = useState('Code')
    const [screenWidth, setScreenWidth] = useState(0)
    const sectionRef = useRef<HTMLDivElement>(null)
    const scrollTriggersRef = useRef<ScrollTrigger[]>([]) // Track ScrollTriggers

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Setup GSAP animations with proper cleanup
    useEffect(() => {
        if (!sectionRef.current) return

        // AGGRESSIVE CLEANUP: Kill ALL previous ScrollTriggers from this component
        scrollTriggersRef.current.forEach(trigger => {
            if (trigger) trigger.kill(true)
        })
        scrollTriggersRef.current = []

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
                    scale: 0.95,
                    clearProps: 'all' // Clear previous props
                })

                // Create animation
                const tween = gsap.to(element, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        id: `project-card-${activeCategory}-${index}`, // Include category in ID
                        trigger: element,
                        start: 'top 90%',
                        end: 'top 10%',
                        toggleActions: 'play none none reverse',
                        scrub: 0.5,
                        invalidateOnRefresh: true, // Recalculate on refresh
                        // markers: true,
                    },
                })

                // Store ScrollTrigger reference
                if (tween.scrollTrigger) {
                    scrollTriggersRef.current.push(tween.scrollTrigger)
                }
            })

            // Refresh after setup
            ScrollTrigger.refresh()
        }, 350)

        // Cleanup function
        return () => {
            clearTimeout(timer)
            // Kill all ScrollTriggers created by this effect
            scrollTriggersRef.current.forEach(trigger => {
                if (trigger) trigger.kill(true)
            })
            scrollTriggersRef.current = []
        }
    }, [activeCategory])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Kill ALL ScrollTriggers when component unmounts
            scrollTriggersRef.current.forEach(trigger => {
                if (trigger) trigger.kill(true)
            })
            scrollTriggersRef.current = []
        }
    }, [])

    // ... (rest of your helper functions - getTitleSize, etc.)
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
            title: 'PenineMate', 
            description: 'PenineMate is a non-commercial academic AI-powered movie assistant developed for educational and portfolio purposes. The application uses the TMDb API to retrieve movie metadata, cast information, and popularity data to support movie Q&A and semantic-based recommendation features.',
            link: 'https://github.com/StevChrist/flixzy',
            siteLink: 'https://peninemate.stevchrist.site',
            previewImage: '/web_preview/peninemate.png'
        },
        { 
            title: 'Data Warehouse and Business Intelligence', 
            description: 'This project focuses on designing and implementing a Data Warehouse (DW) and Business Intelligence (BI) system to support monitoring, evaluation, and decision-making for Kerja Praktik (KP) activities at the faculty level.',
            link: 'https://github.com/StevChrist/dw_bi',
            siteLink: 'https://app.powerbi.com/view?r=eyJrIjoiYjgxODQxNWYtYzRkNi00YWFjLWI1NzktMGMxNzgyOWRiMDgwIiwidCI6IjkwYWZmZTBmLWMyYTMtNDEwOC1iYjk4LTZjZWI0ZTk0ZWYxNSIsImMiOjEwfQ%3D%3D',
            previewImage: '/web_preview/Dw_Bi_1.png'
        },
        { 
            title: 'Social Sentiment', 
            description: 'This project is ongoing.',
            link: 'https://github.com/StevChrist/social-sentiment',
            siteLink: '#',
            previewImage: '/web_preview/social_sentiment.png'
        },
        { 
            title: 'Project Capstone Water Potability', 
            description: 'This project aims to develop a machine learning-based system that is able to predict the level of potable water quality based on various physical and chemical quality parameters.',
            link: 'https://github.com/StevChrist/water-potability-prediction',
            siteLink: 'https://water-potability-capstone.streamlit.app/',
            previewImage: '/web_preview/aqua_check.png'
        },
        { 
            title: 'Sentiment Analysis with C-LSTM models', 
            description: 'This project implements sentiment analysis using a Convolutional Long Short-Term Memory (C-LSTM) architecture on text data. It covers the entire pipeline, from preprocessing and model building to training and evaluation, and then prediction.',
            link: 'https://github.com/StevChrist/Sentiment-Analyst-C-LSTM',
            siteLink: 'https://sentimentanalyst-c-lstm.streamlit.app/',
            previewImage: '/web_preview/sentiment_C-LSTM.png'
        },
        { 
            title: 'LumenAlyze', 
            description: 'It provides a complete workflow for data analysis, from CSV file upload and preprocessing (handling missing values, normalization, outlier removal) to three core machine learning tasks: prediction (Random Forest and MLP), anomaly detection (Isolation Forest), and segmentation (K-Means clustering).',
            link: 'https://github.com/StevChrist/LumenAlyze',
            siteLink: 'https://lumenalyze.vercel.app/',
            previewImage: '/web_preview/Lumenalyze.png'
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
                                    className="bg-gray-600 rounded-[10px] overflow-hidden project-card-animate"
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
                                        className="w-full h-full object-cover"
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
                        style={{
                            marginLeft: getContentMargin(),
                            marginRight: getContentMargin()
                        }}
                    >
                        <div 
                            className="grid mx-auto"
                            style={{
                                gridTemplateColumns: isMobileLayout() ? '1fr' : 'repeat(2, 1fr)',
                                rowGap: '60px',
                                columnGap: '40px',
                                paddingTop: '60px',
                                maxWidth: '1200px'
                            }}
                        >
                            {codeProjects.map((project, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col shadow-lg project-card-animate"
                                    style={{ 
                                        backgroundColor: 'rgba(51, 51, 51, 0.5)', 
                                        borderRadius: '30px', 
                                        border: 'none', 
                                        width: '100%',
                                        position: 'relative',
                                        overflow: 'visible',
                                        zIndex: 2
                                    }}
                                >
                                    <div 
                                        style={{
                                            position: 'absolute',
                                            top: '-30px',
                                            left: '0',
                                            right: '0',
                                            width: '100%',
                                            height: '140px',
                                            borderRadius: '30px 30px 0 0',
                                            overflow: 'hidden',
                                            zIndex: -1
                                        }}
                                    >
                                        <Image
                                            src={project.previewImage}
                                            alt={`${project.title} Preview`}
                                            width={700}
                                            height={140}
                                            className="w-full h-full object-cover"
                                            style={{
                                                filter: 'blur(1.5px)'
                                            }}
                                        />
                                    </div>

                                    <div 
                                        className="bg-gray-600 rounded-lg w-[100%] flex flex-col"
                                        style={{ 
                                            marginTop: '100px',
                                            padding: '20px 16px 16px 16px',
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <div>
                                            <h3 className="text-[16px] font-bold text-white text-center mb-[8px]">
                                                {project.title}
                                            </h3>
                                            <p className="text-[14px] text-white leading-relaxed" style={{textAlign: 'center', padding: '0 20px'}}>
                                                {project.description}
                                            </p>
                                        </div>

                                        <div 
                                            className="flex"
                                            style={{
                                                gap: '12px',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: '16px',
                                                paddingBottom: '4px'
                                            }}
                                        >
                                            <button
                                                style={{
                                                    fontFamily: "'Protest Riot', cursive",
                                                    background: '#115099',
                                                    color: 'white',
                                                    padding: '6px 14px',
                                                    borderRadius: '30px',
                                                    fontSize: '12px',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => window.open(project.link, '_blank')}
                                            >
                                                See More
                                            </button>
                                            <button
                                                style={{
                                                    fontFamily: "'Protest Riot', cursive",
                                                    background: '#115099',
                                                    color: 'white',
                                                    padding: '6px 14px',
                                                    borderRadius: '30px',
                                                    fontSize: '12px',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => window.open(project.siteLink, '_blank')}
                                            >
                                                Visit Site
                                            </button>
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
                        className={`cursor-pointer font-bold transition-all duration-200 ${
                            activeCategory === category ? 'underline text-white' : 'text-gray-400'
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

            <div className="flex justify-center mt-6">
                <AnimatePresence mode="wait">
                    {renderProjects()}
                </AnimatePresence>
            </div>
        </section>
    )
}

export default Project

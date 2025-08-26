'use client'

import {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import AnimatedText from '@/components/AnimatedText'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

const categories = ['Design', 'Code', 'Photo', 'Video']

const Project = () => {
    const [activeCategory, setActiveCategory] = useState('Design')
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

    // Initialize GSAP scroll animations
    useEffect(() => {
        if (!sectionRef.current) return

        const lenis = new Lenis({
            lerp: 0.1,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        lenis.on('scroll', ScrollTrigger.update)

        const ctx = gsap.context(() => {
            const elements = gsap.utils.toArray<HTMLElement>('.gsap-fade-up')

            gsap.fromTo(
                elements,
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 95%',
                        end: 'bottom 60%',
                        toggleActions: 'restart none restart none',
                        //markers: true,
                    },
                }
            )
        }, sectionRef)

        return () => {
            ctx.revert()
            lenis.destroy()
        }
    }, [])

    // Function untuk ukuran judul berdasarkan device
    const getTitleSize = () => {
        if (screenWidth >= 2560) return '80px'      // 4xl
        if (screenWidth >= 1920) return '75px'      // 3xl
        if (screenWidth >= 1536) return '70px'      // 2xl
        if (screenWidth >= 1280) return '70px'      // xl (Desktop)
        if (screenWidth >= 1024) return '65px'      // lg
        if (screenWidth >= 800) return '50px'       // md (Nexus 7)
        if (screenWidth >= 768) return '55px'       // md (iPad mini)
        if (screenWidth >= 640) return '45px'       // sm (large mobile)
        if (screenWidth >= 568) return '32px'       // iPhone 5/5s
        return '28px'                               // xs (very small mobile)
    }

    // Function untuk margin bottom judul
    const getTitleMargin = () => {
        if (screenWidth >= 2560) return '60px'      // 4xl
        if (screenWidth >= 1920) return '55px'      // 3xl
        if (screenWidth >= 1536) return '50px'      // 2xl
        if (screenWidth >= 1280) return '50px'      // xl (Desktop)
        if (screenWidth >= 1024) return '45px'      // lg
        if (screenWidth >= 800) return '30px'       // md (Nexus 7)
        if (screenWidth >= 768) return '35px'       // md (iPad mini)
        if (screenWidth >= 640) return '25px'       // sm (large mobile)
        if (screenWidth >= 568) return '18px'       // iPhone 5/5s
        return '15px'                               // xs (very small mobile)
    }

    // Function untuk ukuran category text
    const getCategorySize = () => {
        if (screenWidth >= 2560) return '24px'      // 4xl
        if (screenWidth >= 1920) return '22px'      // 3xl
        if (screenWidth >= 1536) return '20px'      // 2xl
        if (screenWidth >= 1280) return '20px'      // xl (Desktop)
        if (screenWidth >= 1024) return '18px'      // lg
        if (screenWidth >= 800) return '16px'       // md (Nexus 7)
        if (screenWidth >= 768) return '17px'       // md (iPad mini)
        if (screenWidth >= 640) return '14px'       // sm (large mobile)
        if (screenWidth >= 568) return '12px'       // iPhone 5/5s
        return '10px'                               // xs (very small mobile)
    }

    // Function untuk gap antar category
    const getCategoryGap = () => {
        if (screenWidth >= 2560) return '60px'      // 4xl
        if (screenWidth >= 1920) return '55px'      // 3xl
        if (screenWidth >= 1536) return '50px'      // 2xl
        if (screenWidth >= 1280) return '50px'      // xl (Desktop)
        if (screenWidth >= 1024) return '40px'      // lg
        if (screenWidth >= 800) return '30px'       // md (Nexus 7)
        if (screenWidth >= 768) return '35px'       // md (iPad mini)
        if (screenWidth >= 640) return '25px'       // sm (large mobile)
        if (screenWidth >= 568) return '20px'       // iPhone 5/5s
        return '15px'                               // xs (very small mobile)
    }

    // Function untuk padding section
    const getSectionPadding = () => {
        if (screenWidth >= 2560) return '60px'      // 4xl
        if (screenWidth >= 1920) return '55px'      // 3xl
        if (screenWidth >= 1536) return '50px'      // 2xl
        if (screenWidth >= 1280) return '50px'      // xl (Desktop)
        if (screenWidth >= 1024) return '45px'      // lg
        if (screenWidth >= 800) return '30px'       // md (Nexus 7)
        if (screenWidth >= 768) return '35px'       // md (iPad mini)
        if (screenWidth >= 640) return '25px'       // sm (large mobile)
        if (screenWidth >= 568) return '15px'       // iPhone 5/5s
        return '12px'                               // xs (very small mobile)
    }

    // Function untuk margin content (batas kiri-kanan)
    const getContentMargin = () => {
        if (screenWidth >= 2560) return '70px'      // 4xl
        if (screenWidth >= 1920) return '65px'      // 3xl
        if (screenWidth >= 1536) return '60px'      // 2xl
        if (screenWidth >= 1280) return '70px'      // xl (Desktop)
        if (screenWidth >= 1024) return '55px'      // lg
        if (screenWidth >= 800) return '40px'       // md (Nexus 7)
        if (screenWidth >= 768) return '45px'       // md (iPad mini)
        if (screenWidth >= 640) return '30px'       // sm (large mobile)
        if (screenWidth >= 568) return '20px'       // iPhone 5/5s
        return '15px'                               // xs (very small mobile)
    }

    // Function untuk menentukan jumlah gambar berdasarkan device
    const getImageLimit = () => {
        if (screenWidth >= 2560) return 12          // 4xl - 6 per row, 2 rows
        if (screenWidth >= 1920) return 12          // 3xl - 6 per row, 2 rows  
        if (screenWidth >= 1536) return 12          // 2xl - 6 per row, 2 rows
        if (screenWidth >= 1280) return 12          // xl (Desktop) - 6 per row, 2 rows
        if (screenWidth >= 1024) return 10          // lg (Laptop) - 5 per row, 2 rows
        if (screenWidth >= 800) return 8            // md (Nexus 7) - 4 per row, 2 rows
        if (screenWidth >= 768) return 8            // md (iPad mini) - 4 per row, 2 rows
        if (screenWidth >= 640) return 6            // sm - 3 per row, 2 rows
        return 6                                     // xs - 2 per row, 3 rows
    }

    // Function untuk menentukan layout grid
    const getGridLayout = () => {
        if (screenWidth >= 2560) return 6           // 4xl - 6 per row
        if (screenWidth >= 1920) return 6           // 3xl - 6 per row
        if (screenWidth >= 1536) return 6           // 2xl - 6 per row
        if (screenWidth >= 1280) return 6           // xl (Desktop) - 6 per row
        if (screenWidth >= 1024) return 5           // lg (Laptop) - 5 per row
        if (screenWidth >= 800) return 4            // md (Nexus 7) - 4 per row
        if (screenWidth >= 768) return 4            // md (iPad mini) - 4 per row
        if (screenWidth >= 640) return 3            // sm - 3 per row
        return 2                                     // xs - 2 per row
    }

    // Function untuk ukuran gambar - DIPERBAIKI UNTUK DESKTOP
    const getImageSize = () => {
        if (screenWidth >= 2560) return { width: '200px', height: '250px' }    // 4xl (diperbesar)
        if (screenWidth >= 1920) return { width: '190px', height: '237px' }    // 3xl (diperbesar)
        if (screenWidth >= 1536) return { width: '180px', height: '225px' }    // 2xl (diperbesar)
        if (screenWidth >= 1280) return { width: '170px', height: '212px' }    // xl (Desktop) - diperbesar
        if (screenWidth >= 1024) return { width: '160px', height: '200px' }    // lg (Laptop)
        if (screenWidth >= 800) return { width: '140px', height: '175px' }     // md (Nexus 7)
        if (screenWidth >= 768) return { width: '150px', height: '187px' }     // md (iPad mini)
        if (screenWidth >= 640) return { width: '140px', height: '175px' }     // sm (large mobile)
        if (screenWidth >= 568) return { width: '120px', height: '150px' }     // iPhone 5/5s
        return { width: '110px', height: '137px' }                             // xs (very small mobile)
    }

    // Function untuk gap antar gambar - DISESUAIKAN UNTUK DESKTOP
    const getImageGap = () => {
        if (screenWidth >= 2560) return '25px'      // 4xl (dikurangi sedikit)
        if (screenWidth >= 1920) return '22px'      // 3xl (dikurangi sedikit)
        if (screenWidth >= 1536) return '20px'      // 2xl
        if (screenWidth >= 1280) return '18px'      // xl (Desktop) - dikurangi untuk memberi ruang gambar lebih besar
        if (screenWidth >= 1024) return '25px'      // lg (Laptop)
        if (screenWidth >= 800) return '20px'       // md (Nexus 7)
        if (screenWidth >= 768) return '22px'       // md (iPad mini)
        if (screenWidth >= 640) return '20px'       // sm (large mobile)
        if (screenWidth >= 568) return '15px'       // iPhone 5/5s
        return '12px'                               // xs (very small mobile)
    }

    // Function untuk menentukan apakah layout mobile
    const isMobileLayout = () => {
        return screenWidth < 1024  // Layout mobile untuk tablet dan mobile (< 1024px)
    }

    // Assets arrays
    // UNTUK MENAMBAHKAN GAMBAR DESIGN: Tambahkan path gambar ke array designImages
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
        // '/image/Design/10.png',
    ]

    // UNTUK MENAMBAHKAN GAMBAR PHOTO: Tambahkan path gambar ke array photoImages
    const photoImages = [
        '/image/Photo/1.jpg'
        // TAMBAHKAN GAMBAR PHOTO BARU DI SINI:
        // '/image/Photo/2.jpg',
        // '/image/Photo/3.jpg',
    ]

    // UNTUK MENAMBAHKAN VIDEO LANDSCAPE: Tambahkan path video ke array videoLandscape
    const videoLandscape = [
        '/image/Video/Landscape/land 1.mp4', 
        '/image/Video/Landscape/land 2.mp4', 
        '/image/Video/Landscape/land 3.mp4', 
        '/image/Video/Landscape/land 4.mp4'
        // TAMBAHKAN VIDEO LANDSCAPE BARU DI SINI:
        // '/image/Video/Landscape/land 5.mp4',
    ]

    // UNTUK MENAMBAHKAN VIDEO PORTRAIT: Tambahkan path video ke array videoPotrait
    const videoPotrait = [
        'image/Video/Potrait/pot 1.mp4'
        // TAMBAHKAN VIDEO PORTRAIT BARU DI SINI:
        // 'image/Video/Potrait/pot 2.mp4',
    ]

    // UNTUK MENAMBAHKAN PROJECT CODE: Tambahkan object baru ke array codeProjects
    const codeProjects = [
        { 
            title: 'Project Capstone Water Potability', 
            description: 'This project aims to develop a machine learning-based system that is able to predict the level of potable water quality based on various physical and chemical quality parameters.',
            link: 'https://github.com/StevChrist/water-potability-prediction' 
        },
        { 
            title: 'Project Building Website with NoSQL Database', 
            description: 'Flixzy is a project aimed at building a modern movie streaming platform prototype with advanced search and recommendation capabilities. It leverages a multimodal database system, combining document and vector databases, to provide a rich user experience.',
            link: 'https://github.com/StevChrist/flixzy' 
        },
        { 
            title: 'Project Building Workflow for data analysis from CSV', 
            description: 'It provides a complete workflow for data analysis, from CSV file upload and preprocessing (handling missing values, normalization, outlier removal) to three core machine learning tasks: prediction (Random Forest and MLP), anomaly detection (Isolation Forest), and segmentation (K-Means clustering).',
            link: 'https://github.com/StevChrist/LumenAlyze'    
        },
        { 
            title: 'Sentiment Analysis with C-LSTM models', 
            description: 'This project implements sentiment analysis using a Convolutional Long Short-Term Memory (C-LSTM) architecture on text data. It covers the entire pipeline, from preprocessing and model building to training and evaluation, and then prediction.',
            link: 'https://github.com/StevChrist/Sentiment-Analyst-C-LSTM'    
        }

    ]

    // State untuk mengatur apakah video diperbesar atau tidak
    const [isVideoFullscreen] = useState(false)

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
                        className="gsap-fade-up"
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
                                    className="bg-gray-600 rounded-[10px] overflow-hidden"
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
                        className="gsap-fade-up"
                        style={{
                            marginLeft: getContentMargin(),
                            marginRight: getContentMargin()
                        }}
                    >
                        <div 
                            className="grid gap-[40px] mx-auto max-w-6xl"
                            style={{
                                gridTemplateColumns: isMobileLayout() ? '1fr' : 'repeat(2, 1fr)'
                            }}
                        >
                            {codeProjects.map((project, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center shadow-lg"
                                    style={{ 
                                        backgroundColor: 'rgba(51, 51, 51, 0.5)', 
                                        borderRadius: '30px', 
                                        border: 'none', 
                                        width: '100%' 
                                    }}
                                >
                                    <div className="bg-gray-600 p-[16px] rounded-lg w-[100%] flex flex-col items-center">
                                        <h3 className="text-[16px] font-bold text-white text-center mb-[0px]">{project.title}</h3>
                                        <p className="text-[14px] text-white text-center mb-[25px] px-[20px]"> 
                                            {project.description}
                                        </p>
                                        <button
                                            className="text-center mt-4"
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
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )
            case 'Photo':
                return (
                    <motion.div
                        key="photo"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="gsap-fade-up"
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
                            {photoImages.slice(0, imageLimit).map((src, i) => (
                                <div 
                                    key={i} 
                                    className="bg-gray-600 rounded-[10px] overflow-hidden"
                                    style={{
                                        width: imageSize.width,
                                        height: imageSize.height
                                    }}
                                >
                                    <Image
                                        src={src}
                                        alt={`Photo Project ${i + 1}`}
                                        width={parseInt(imageSize.width)}
                                        height={parseInt(imageSize.height)}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )
            case 'Video':
                return (
                    <motion.div
                        key="video"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="gsap-fade-up"
                        style={{
                            marginLeft: getContentMargin(),
                            marginRight: getContentMargin()
                        }}
                    >
                        {/* Landscape Videos */}
                        <div 
                            className="grid justify-center mb-[30px]"
                            style={{
                                gridTemplateColumns: isMobileLayout() ? '1fr' : 'repeat(2, 1fr)',
                                gap: getImageGap(),
                                maxWidth: '1200px',
                                margin: '0 auto'
                            }}
                        >
                            {videoLandscape.slice(0, isMobileLayout() ? 2 : 4).map((src, i) => (
                                <div 
                                    key={i} 
                                    className="bg-gray-600 rounded-[10px] overflow-hidden"
                                    style={{
                                        width: isMobileLayout() ? '100%' : '300px',
                                        height: isMobileLayout() ? '200px' : '169px'
                                    }}
                                >
                                    <video
                                        width="100%"
                                        height="100%"
                                        autoPlay
                                        loop
                                        muted
                                    >
                                        <source src={src} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            ))}
                        </div>
                        
                        {/* Portrait Videos */}
                        <div 
                            className="grid justify-center"
                            style={{
                                gridTemplateColumns: isMobileLayout() ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                                gap: getImageGap(),
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}
                        >
                            {videoPotrait.slice(0, isMobileLayout() ? 2 : 6).map((src, i) => (
                                <div
                                    key={i}
                                    className={`bg-gray-600 rounded-[10px] overflow-hidden ${
                                        isVideoFullscreen ? 'w-[80%] h-[80%]' : ''
                                    }`}
                                    style={{
                                        width: isMobileLayout() ? '150px' : '200px',
                                        height: isMobileLayout() ? '267px' : '350px'
                                    }}
                                >
                                    <video
                                        width="100%"
                                        height="100%"
                                        autoPlay
                                        loop
                                        muted
                                    >
                                        <source src={src} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
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
                    className="text-center font-bold gsap-fade-up"
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
                        className={`gsap-fade-up cursor-pointer font-bold transition-all duration-200 ${
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

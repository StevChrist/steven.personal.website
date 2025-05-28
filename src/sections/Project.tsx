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
    const sectionRef = useRef<HTMLDivElement>(null)

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

    // batas foto sampai 12
    const designImages = ['/image/Design/1.png', '/image/Design/2.png', '/image/Design/3.png','/image/Design/4.png','/image/Design/5.png','/image/Design/6.png','/image/Design/7.jpg'
        , '/image/Design/8.png'
    ]

    // batas foto sampai 12
    const photoImages = ['/image/Photo/1.jpg']

    // batas video landscape (16:9)  4
    const videoLandscape = ['/image/Video/Landscape/land 1.mp4', '/image/Video/Landscape/land 2.mp4', '/image/Video/Landscape/land 3.mp4', '/image/Video/Landscape/land 4.mp4'] 

    // batas video portrait (9:16) 6
    const videoPotrait = ['image/Video/Potrait/pot 1.mp4']

    // List of code projects with titles and links
    const codeProjects = [
    { 
      title: 'Project Capstone Water Potability', 
      description: 'This project aims to develop a machine learning-based system that is able to predict the level of potable water quality based on various physical and chemical quality parameters.',
      link: 'https://github.com/StevChrist/water-potability' 
    },
    { 
      title: 'Project Building Website with NoSQL Database', 
      description: 'Flixzy is a project aimed at building a modern movie streaming platform prototype with advanced search and recommendation capabilities. It leverages a multimodal database system, combining document and vector databases, to provide a rich user experience.',
      link: 'https://github.com/StevChrist/flixzy' 
    },
  ]

    // State untuk mengatur apakah video diperbesar atau tidak
    const [isVideoFullscreen] = useState(false)

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
                    >
                        {/* Baris pertama dengan 6 gambar */}
                        <div className="flex justify-center gap-[40px] text-[14px]">
                            {designImages.slice(0, 6).map((src, i) => (
                                <div key={i} className="w-[200px] h-[250px] bg-gray-600 rounded-[10px] overflow-hidden">
                                    <Image
                                        src={src}
                                        alt={`Design Project ${i + 1}`}
                                        width={200}
                                        height={250}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Baris kedua dengan 6 gambar */}
                        <div className="flex justify-center gap-[40px] text-[14px] mt-[30px]">
                            {designImages.slice(6).map((src, i) => (
                                <div key={i + 6} className="w-[200px] h-[250px] bg-gray-600 rounded-[10px] overflow-hidden">
                                    <Image
                                        src={src}
                                        alt={`Design Project ${i + 7}`}
                                        width={200}
                                        height={250}
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
                        className="grid grid-cols-2 gap-[40px] mx-auto max-w-6xl px-[40px]"
                    >
                        {codeProjects.map((project, index) => (
                            <div
                            key={index}
                            className="flex flex-col items-center shadow-lg"
                            style={{ backgroundColor: 'rgba(51, 51, 51, 0.5)', borderRadius: '30px', border: 'none', width: '100%' }}
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
                    >
                        {/* Baris pertama dengan 6 gambar untuk Photo */}
                        <div className="flex justify-center gap-[40px] text-[14px]">
                            {photoImages.slice(0, 6).map((src, i) => (
                                <div key={i} className="w-[200px] h-[250px] bg-gray-600 rounded-[10px] overflow-hidden">
                                    <Image
                                        src={src}
                                        alt={`Photo Project ${i + 1}`}
                                        width={200}
                                        height={250}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Baris kedua dengan 6 gambar untuk Photo */}
                        <div className="flex justify-center gap-[40px] text-[14px] mt-[30px]">
                            {photoImages.slice(6).map((src, i) => (
                                <div key={i + 6} className="w-[200px] h-[250px] bg-gray-600 rounded-[10px] overflow-hidden">
                                    <Image
                                        src={src}
                                        alt={`Photo Project ${i + 7}`}
                                        width={200}
                                        height={250}
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
                    >
                        {/* Baris pertama dengan 16:9 (Landscape) video */}
                        <div className="flex justify-center gap-[68px] text-[14px]">
                            {videoLandscape.map((src, i) => (
                                <div key={i} className="w-[300px] h-[169px] bg-gray-600 rounded-[10px] overflow-hidden">
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
                        {/* Baris kedua dengan 9:16 (Portrait) video */}
                        <div className="flex justify-center gap-[40px] text-[14px] mt-[30px]">
                            {videoPotrait.map((src, i) => (
                                <div
                                    key={i}
                                    className={`w-[200px] h-[350px] bg-gray-600 rounded-[10px] overflow-hidden ${
                                        isVideoFullscreen ? 'w-[80%] h-[80%]' : ''
                                    }`}
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
                return (
                    <motion.div
                        key="default"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="h-[50px] bg-gray-600 rounded-[10px]"
                        ></div>
                        ))}
                    </motion.div>
                )
        }
    }

    return (
        <section id="projects" className="skills min-h-[100vh] px-[20px] pb-0 bg-black text-white" ref={sectionRef}>
            <div className="flex flex-col justify-center items-center h-full">
                    <AnimatedText
                        text="Projet_"
                        className="text-center font-bold mb-[40px]"
                        style={{ fontFamily: "'Pacifico', cursive", fontSize: '70px', marginBottom: '25px', marginTop: '30px' } }
                        delayStep={0.05}
                        triggerOnce={false}
                    />
            </div>

            {/* Kategori with GSAP scroll animation */}
            <div className="flex justify-center gap-[50px] pb-[25px]">
                {categories.map((category) => (
                    <motion.span
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`gsap-fade-up cursor-pointer font-bold text-[20px] transition-all duration-200 ${
                        activeCategory === category ? 'underline text-white' : 'text-gray-400'
                        }`}
                        style={{ fontFamily: "'Pacifico', cursive" }}
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
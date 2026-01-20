"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- DATA: RESUME CONTENT ---

const education = {
  university: "Iowa State University",
  degree: "Bachelor of Science: Computer Science",
  date: "May 2024",
  gpa: "3.71 / 4.0",
  honors: ["Magna Cum Laude", "Dean's List (7/8 Semesters)"],
  logo: "/images/iowa.png"
};

const experience = [
  {
    company: "Joy Crafts",
    role: "Technical Co-Founder",
    date: "01/2025 - Current",
    location: "Nashik, India",
    logo: "/images/joycrafts.png",
    team: "Founder", 
    reportedTo: { name: "Vijay Tiwari (Founder)", linkedin: "https://www.linkedin.com/in/vijay-tiwari-85019b19/" }, 
    bullets: [
      "Developed AI-driven workflows to automate transformation of raw photography into commercial assets.",
      "Implemented prompt engineering to standardize visual templates, solving scalability issues.",
      "Integrated technical solutions with business operations, managing manufacturing & inventory."
    ]
  },
  {
    company: "Buildertrend",
    role: "Software Development Intern",
    date: "05/2024 - 08/2024",
    location: "Omaha, USA",
    logo: "/images/buildertrend.png",
    team: "Architecture",
    reportedTo: { name: "Charlie Koster (Sr. Architect)", linkedin: "https://www.linkedin.com/in/charlie-koster/" },
    bullets: [
      "Collaborated with architects to integrate OpenAI's API into .NET/React applications.",
      "Enhanced service stability and consistency to decrease platform volatility."
    ]
  },
  {
    company: "National Informations Solutions Cooperative",
    role: "Software Developer",
    date: "08/2023 - 12/2023",
    location: "Ames, USA",
    logo: "/images/nisc.png",
    team: "Cloud Provisioning",
    reportedTo: { name: "Joseph Michalka (Eng. Manager)", linkedin: "https://www.linkedin.com/in/joseph-michalka-0a093325/" },
    bullets: [
      "Built CSV import/export features for Excel integration.",
      "Introduced real-time status displays for broadband agents to prevent conflict.",
      "Developed audit functions to process data batches efficiently."
    ]
  },
  {
    company: "National Informations Solutions Cooperative",
    role: "Software Development Intern",
    date: "05/2023 - 08/2023",
    location: "Cedar Rapids, USA",
    logo: "/images/nisc.png",
    team: "Cloud Provisioning",
    reportedTo: { name: "Joseph Michalka (Eng. Manager)", linkedin: "https://www.linkedin.com/in/joseph-michalka-0a093325/" },
    bullets: [
      "Refactored microservices using MapStruct for Java bean conversion.",
      "Developed logging features for traceability in broadband configurations."
    ]
  },
  {
    company: "Iowa State University",
    role: "Technical Assistant",
    date: "12/2022 - 05/2023",
    location: "Ames, USA",
    logo: "/images/iowa.png", 
    team: "Solution Center",
    reportedTo: { name: "Brent Black (Sr. Manager)", linkedin: "https://www.linkedin.com/in/brent-black-63a05b190/" }, 
    bullets: [
      "Diagnosed software, access, and network issues for ~35,000 students and faculty.",
      "Assisted users with software installation and configuration using remote access tools.",
      "Supported and scoped for over fifty different software and hardware technologies."
    ]
  }
];

const skills = [
  // --- Languages ---
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  
  // --- Frameworks & Libraries ---
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Spring", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: ".NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },

  // --- Data & Tools ---
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
  { name: "Jira", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
  { name: "Excel", icon: "https://img.icons8.com/color/96/microsoft-excel-2019--v1.png" },

  // --- Concepts / Abstract (Using Custom SVGs) ---
  { 
    name: "Microservices", 
    svg: <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
  },
  { 
    name: "REST API", 
    svg: <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
  },
  { 
    name: "Agile", 
    svg: <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
  },
  { 
    name: "AI Agents", 
    svg: <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
  }
];

const companies = [
  { 
    name: "Sierra Vista", 
    role: "Founder & Operations",
    description: "A premium resort & restaurant experience in Nashik.",
    gradient: "from-gray-100 to-gray-300",
    logo: "/images/sierravista.png", // Make sure this file exists in public/images
    link: "https://sierravista.in",   // Your Website
    type: "Resort & Dining"
  },
  { 
    name: "Joy Crafts", 
    role: "Founder",
    description: "Handcrafted wrought iron decor for the modern home.",
    gradient: "from-gray-200 to-gray-400",
    logo: "/images/joycrafts.png",   // Make sure this file exists in public/images
    link: "https://www.amazon.in/s?i=merchant-items&me=A2ZHKH8C0LYGOO&marketplaceID=A21TJRUUN4KGV&qid=1768892213&xpid=kE6O--JVkZ-CV&ref=sr_pg_1", // Amazon Store Link
    type: "E-Commerce Brand"
  }
];

// --- COMPONENTS ---
const Section = React.forwardRef(({ children, className }, ref) => (
  <section 
    ref={ref} 
    className={`py-20 md:py-32 px-6 md:px-20 ${className}`}
  >
    {children}
  </section>
));

Section.displayName = "Section";

const SectionTitle = ({ children }) => (
  <h2 className="text-sm font-bold text-gray-400 tracking-[0.3em] mb-16 uppercase border-b border-gray-100 pb-4 inline-block">
    {children}
  </h2>
);

// --- SOUND CONTROLLER COMPONENT ---
const SoundController = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const toggleSound = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop src="/audio/ambient.mp3" />
      
      <button 
        onClick={toggleSound}
        className="group relative flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        {/* Animated Sound Wave Visualizer */}
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-4">
            <motion.div 
              animate={{ height: [4, 12, 4] }} 
              transition={{ repeat: Infinity, duration: 0.8 }} 
              className="w-1 bg-gray-800 rounded-full" 
            />
            <motion.div 
              animate={{ height: [6, 16, 6] }} 
              transition={{ repeat: Infinity, duration: 0.6 }} 
              className="w-1 bg-gray-800 rounded-full" 
            />
            <motion.div 
              animate={{ height: [4, 10, 4] }} 
              transition={{ repeat: Infinity, duration: 0.9 }} 
              className="w-1 bg-gray-800 rounded-full" 
            />
          </div>
        ) : (
          // Muted Icon
          <svg className="w-5 h-5 text-gray-500 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        )}
      </button>
    </div>
  );
};

// --- CUSTOM CURSOR COMPONENT ---
const CustomCursor = () => {
  const cursorRef = useRef(null);
  
  React.useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="fixed w-6 h-6 border border-gray-400 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[100] transition-transform duration-75 ease-out mix-blend-difference"
    />
  );
};

// --- MARQUEE COMPONENT ---
const Marquee = () => {
  return (
    <div className="relative flex overflow-hidden py-10 bg-white border-t border-b border-gray-100">
      <div className="flex whitespace-nowrap">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 items-center"
        >
          {/* Content Block 1 */}
          {/* CHANGED: 'text-4xl' for mobile, 'md:text-8xl' for desktop */}
          <span className="text-4xl md:text-8xl font-bold text-gray-300 px-4">
            FULL STACK FOUNDER
          </span>
          <span className="text-xl md:text-3xl text-gray-300">✦</span>
          <span className="text-4xl md:text-8xl font-bold text-gray-300 px-4">
            BUILDING IN PUBLIC
          </span>
          <span className="text-xl md:text-3xl text-gray-300">✦</span>
          <span className="text-4xl md:text-8xl font-bold text-gray-300 px-4">
            AI ENGINEER
          </span>
          <span className="text-xl md:text-3xl text-gray-300">✦</span>
          <span className="text-4xl md:text-8xl font-bold text-gray-300 px-4">
            OPEN FOR WORK
          </span>
          <span className="text-xl md:text-3xl text-gray-300">✦</span>

          {/* Content Block 2 (Duplicate for loop) */}
          <span className="text-4xl md:text-8xl font-bold text-gray-300 px-4">
            FULL STACK FOUNDER
          </span>
          <span className="text-xl md:text-3xl text-gray-300">✦</span>
          <span className="text-4xl md:text-8xl font-bold text-gray-300 px-4">
            BUILDING IN PUBLIC
          </span>
          <span className="text-xl md:text-3xl text-gray-300">✦</span>
          <span className="text-4xl md:text-8xl font-bold text-gray-300 px-4">
            AI ENGINEER
          </span>
          <span className="text-xl md:text-3xl text-gray-300">✦</span>
          <span className="text-4xl md:text-8xl font-bold text-gray-300 px-4">
            OPEN FOR WORK
          </span>
          <span className="text-xl md:text-3xl text-gray-300">✦</span>
        </motion.div>
      </div>
      
      {/* Left/Right Fade Gradients for smoothness */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
    </div>
  );
};

export default function Portfolio() {
  // --- SCROLL LOGIC ---
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const heroRef = useRef(null);
  const educationRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  const venturesRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="bg-white text-gray-800 font-sans selection:bg-gray-200">

      {/* --- FIXED ELEMENTS --- */}
      <SoundController />
      <CustomCursor />

      {/* --- HERO SECTION --- */}
      {/* CHANGED: 'pb-24' (mobile) -> 'md:pb-56' (desktop) for better spacing */}
      <div ref={heroRef} className="h-screen flex flex-col justify-end pb-24 md:pb-56 px-6 md:px-20 relative overflow-hidden">
        
        {/* Animated Content Wrapper */}
        <motion.div style={{ opacity, scale }} className="z-10 relative" ref={targetRef}>
          
          {/* Subtitle */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-4 flex items-center space-x-4"
          >
          </motion.div>

          {/* Main Name */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            // CHANGED: 'text-5xl' for mobile, 'md:text-9xl' for desktop to prevent overflow
            className="text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter leading-none"
          >
            <span className="inline-block px-2 py-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-500 to-gray-900">
              JAY
            </span>
            <br />
            <span className="inline-block px-2 py-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-500 to-gray-900">
              TIWARI
            </span>
          </motion.h1>

        </motion.div>
        
        {/* Background Gradient Blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-gray-100 to-gray-50 rounded-full blur-3xl opacity-60 -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      </div>

      {/* --- EDUCATION --- */}
{/* --- EDUCATION --- */}
<Section ref={educationRef} className="bg-gray-50/50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Education</SectionTitle>
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="flex items-start gap-4 md:gap-6">
              {/* University Logo */}
              <div className="h-14 w-14 md:h-16 md:w-16 bg-white rounded-lg p-2 border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                  <img 
                    src={education.logo} 
                    alt="University Logo" 
                    className="w-full h-auto object-contain" 
                  />
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-light text-gray-800">{education.university}</h3>
                <p className="text-lg md:text-xl text-gray-500 mt-1 md:mt-2">{education.degree}</p>
              </div>
            </div>
            
            {/* Date, GPA & Honors - Left align on mobile, Right on Desktop */}
            <div className="mt-6 md:mt-0 w-full md:w-auto text-left md:text-right pl-[4.5rem] md:pl-0">
              <span className="block text-xl md:text-2xl font-bold text-gray-400">{education.date}</span>
              <span className="block text-gray-500 mt-1">GPA: {education.gpa}</span>
              <div className="mt-3 flex flex-wrap justify-start md:justify-end gap-2">
                {education.honors.map((honor, i) => (
                  <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-600 uppercase tracking-wide">
                    {honor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* --- EXPERIENCE --- */}
  {/* --- EXPERIENCE (TIMELINE) --- */}
  <Section ref={experienceRef}>
        <SectionTitle>Professional Experience</SectionTitle>
        
        {/* Timeline Container */}
        <div className="space-y-16 border-l border-gray-200 ml-3 pl-6 md:pl-16 relative">
          {experience.map((job, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[33px] md:-left-[75px] top-2 h-4 w-4 rounded-full border-2 border-white bg-gray-300 ring-4 ring-gray-50"></div>
              
              {/* 1. Header: Logo + Role + Company */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2 md:gap-0">
                <div className="flex items-start gap-4">
                  {/* Logo */}
                  <div className="h-10 w-10 bg-white border border-gray-100 rounded flex items-center justify-center shrink-0 p-1 mt-1">
                      <img 
                        src={job.logo} 
                        alt={job.company} 
                        className="h-full w-auto object-contain" 
                      />
                  </div>
                  <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight">{job.role}</h3>
                      <div className="text-base md:text-lg text-gray-500 font-light mt-1">{job.company} • {job.location}</div>
                      
                      {/* Mobile Date (Shows here only on small screens) */}
                      <span className="block md:hidden text-sm text-gray-400 font-mono mt-2">{job.date}</span>
                  </div>
                </div>
                {/* Desktop Date (Hidden on Mobile) */}
                <span className="hidden md:block text-sm text-gray-400 font-mono mt-2 md:mt-0">{job.date}</span>
              </div>

              {/* 2. Team & Reported To (Full Width on Mobile) */}
              <div className="mb-6 flex flex-wrap items-center gap-3 pl-14 md:pl-14">
                 <span className="px-3 py-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-500 uppercase tracking-widest font-medium">
                    {job.team}
                 </span>
                 
                 <div className="hidden md:block text-gray-300 text-xs">•</div>
                 
                 <div className="w-full md:w-auto text-sm text-gray-400 flex items-center gap-2 mt-2 md:mt-0">
                    <span>Reported to:</span>
                    <span className="text-gray-600 font-medium">{job.reportedTo.name}</span>
                    <a 
                      href={job.reportedTo.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#0077b5]"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                 </div>
              </div>
              
              {/* 3. Bullets (Full width on mobile, Indented on Desktop) */}
              <ul className="space-y-3 ml-0 md:ml-14">
                {job.bullets.map((bullet, bIndex) => (
                  <li key={bIndex} className="text-gray-600 leading-relaxed text-sm md:text-base pl-4 border-l-2 border-gray-100">
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          
           {/* Resume Button */}
           <div className="mt-20 ml-0 md:ml-16 relative">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-300 group w-full md:w-auto justify-center"
              >
                <span>DOWNLOAD FULL RESUME</span>
                <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              </a>
           </div>

        </div>
      </Section>
      {/* --- SKILLS & PROJECTS --- */}
      <Section ref={skillsRef} className="bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          
          {/* Skills Column */}
          <div>
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 group cursor-default"
                >
                  <div className="h-8 w-8 mb-3 flex items-center justify-center">
                    {skill.icon ? (
                      <img src={skill.icon} alt={skill.name} className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <div className="group-hover:scale-110 transition-transform duration-300">{skill.svg}</div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Projects Column */}
          <div>
            <SectionTitle>Selected Code</SectionTitle>
            
            {/* GitHub Card */}
            <motion.a 
              href="https://github.com/jaytwri"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group block w-full bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                 <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 group-hover:bg-black group-hover:border-black transition-colors duration-300">
                    <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                 </div>
                 <svg className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">github.com/jaytwri</h3>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider group-hover:text-black transition-colors">
                View All Repositories
              </p>
            </motion.a>

            <p className="text-gray-500 font-light leading-relaxed">
              Most of my engineering work is open source. Explore my repositories to see how I architect scalable applications, manage state, and implement AI agents.
            </p>
          </div>
        </div>
      </Section>

      {/* --- VENTURES (BUSINESS) --- */}
      <Section ref={venturesRef}>
        <SectionTitle>Entrepreneurial Ventures</SectionTitle>
        <div className="space-y-12">
          {companies.map((company, index) => (
            <motion.a 
              href={company.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group block border-t border-gray-200 pt-8 hover:border-gray-400 transition-colors duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                
                {/* LEFT: Identity */}
                <div className="flex items-start gap-6">
                  <span className="text-gray-300 font-light text-xl mt-1">0{index + 1}</span>
                  <div className="h-16 w-16 bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300 overflow-hidden">
                      {company.logo ? (
                        <img 
                          src={company.logo} 
                          alt={company.name} 
                          className={`h-full w-full transition-transform duration-300 ${
                            company.name === 'Sierra Vista' 
                              ? 'object-cover scale-139'
                              : 'object-contain'
                          }`}
                        />
                      ) : (
                        <span className="font-bold text-gray-300 text-xl">{company.name[0]}</span>
                      )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-600 transition-colors flex items-center gap-2">
                      {company.name}
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </h3>
                    <p className="text-sm font-medium text-gray-500 mt-1">{company.role}</p>
                    <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 border border-gray-200 px-2 py-0.5 rounded">
                      {company.type}
                    </span>
                  </div>
                </div>

                {/* RIGHT: Description */}
                <div className="md:w-1/2 md:text-right flex flex-col md:items-end justify-between h-full">
                   <p className="text-gray-500 font-light text-sm leading-relaxed max-w-md">
                      {company.description}
                   </p>
                   <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-black transition-colors duration-300">
                      <span>VISIT {company.type === 'E-Commerce Brand' ? 'STORE' : 'WEBSITE'}</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                   </div>
                </div>

              </div>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* --- MARQUEE --- */}
      <Marquee />

      {/* --- FOOTER --- */}
      <footer ref={contactRef} className="bg-gradient-to-br from-gray-600 to-gray-900 text-white border-t border-gray-500 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-white font-bold mb-12 tracking-tight">LET'S BUILD TOGETHER</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="tel:+917796696693" className="flex items-center gap-3 px-6 py-3 border border-gray-400 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span className="text-sm tracking-wider">+91 77966 96693</span>
              </a>
              <a href="mailto:jaytiwari99@gmail.com" className="flex items-center gap-3 px-6 py-3 border border-gray-400 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span className="text-sm tracking-wider">EMAIL</span>
              </a>
              <a href="https://www.linkedin.com/in/jay-tiwari-14a64816b/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 border border-gray-400 rounded-full hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300 group">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span className="text-sm tracking-wider">LINKEDIN</span>
              </a>
              <a href="https://github.com/jaytwri" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 border border-gray-400 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 group">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span className="text-sm tracking-wider">GITHUB</span>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-500 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-[0.2em] text-gray-300 uppercase">
            <div className="mb-4 md:mb-0">© {new Date().getFullYear()} Jay Tiwari</div>
            <div className="flex gap-6">
              <span>Nashik, IN</span>
              <span className="hidden md:inline text-gray-400">|</span>
              <span className="hidden md:inline">Local Time: {new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: false, timeZone: 'Asia/Kolkata'})}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
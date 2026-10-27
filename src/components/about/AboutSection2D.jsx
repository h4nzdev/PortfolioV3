import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo, technicalSkills } from '../../data/portfolioData';
import { Icon } from '@iconify/react';
import meImg from '../../assets/me.png';

export default function AboutSection2D() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const photoParallax = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  const principles = [
    {
      num: '01',
      title: 'Architectural Rigor',
      desc: 'Writing maintainable, modular software using separation of concerns, robust state machines, and clean APIs.',
    },
    {
      num: '02',
      title: 'Tangible Utility',
      desc: 'Building applications that solve quantifiable operational problems—from real-time attendance ERPs to multi-tenant clinic platforms.',
    },
    {
      num: '03',
      title: 'Tactile Ergonomics',
      desc: 'Pairing high-performance engineering with intentional micro-interactions, responsive typography, and sub-100ms UI responses.',
    },
  ];

  // Divide skills into two curated rows for smooth dual-direction infinite marquee
  const row1Skills = [
    ...technicalSkills.categories[0].skills, // Frontend & Mobile
    ...technicalSkills.categories[2].skills, // Database & BaaS
  ];

  const row2Skills = [
    ...technicalSkills.categories[1].skills, // Backend Engineering
    ...technicalSkills.categories[3].skills, // Tools, AI & Cloud
  ];

  // Repeat 4x per unit so that 50% of the track (>5,000px) exceeds any ultrawide/4K monitor,
  // guaranteeing a 100% continuous, seamless, gapless infinite loop.
  const row1Unit = [...row1Skills, ...row1Skills, ...row1Skills, ...row1Skills];
  const row2Unit = [...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills];

  // Full track: exactly two identical halves (0% to -50% translation is mathematically seamless)
  const row1Track = [...row1Unit, ...row1Unit];
  const row2Track = [...row2Unit, ...row2Unit];

  return (
    <section ref={sectionRef} id="about" className="relative w-full py-28 sm:py-36 bg-[#F8F7F2] border-t border-[#C8B99A]/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8B99A]/40 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
              <span className="text-xs font-mono font-medium text-[#292824] uppercase tracking-wider">
                02 // Editorial Dossier
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#171715] font-['Space_Grotesk']">
              About & Engineering Background
            </h2>
          </div>

          <p className="text-sm font-mono text-[#85847E] max-w-md">
            Conventional website section with standard document scrolling. Clean editorial typography and real student-engineer background.
          </p>
        </div>

        {/* Bio & Portrait Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Portrait & Stats Cards with Parallax */}
          <motion.div style={{ y: photoParallax }} className="lg:col-span-5 space-y-8">
            {/* Real Portrait Frame */}
            <div className="relative rounded-3xl overflow-hidden bg-[#E5DCCB]/50 border border-[#C8B99A]/70 shadow-lg p-3 group">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#171715]">
                <img
                  src={meImg}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171715]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#C8B99A]">
                    {personalInfo.shortName}
                  </div>
                  <div className="text-sm font-semibold font-['Space_Grotesk']">
                    {personalInfo.role}
                  </div>
                  <div className="text-xs text-[#E5DCCB]/80 font-mono mt-0.5">
                    {personalInfo.institution} • {personalInfo.location}
                  </div>
                </div>
              </div>

              {/* Status pill */}
              <div className="mt-3 px-3 py-2 rounded-xl bg-white/70 border border-[#C8B99A]/40 flex items-center justify-between text-xs font-mono text-[#292824]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Full-Stack Roles</span>
                </span>
                <span className="text-[#85847E]">Cebu, PH</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {personalInfo.stats.map((st, idx) => (
                <div
                  key={idx}
                  className="editorial-card p-5 rounded-2xl text-left"
                >
                  <div className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#171715]">
                    {st.value}
                  </div>
                  <div className="text-xs font-mono text-[#85847E] uppercase tracking-wider mt-1">
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Narrative Biography & Philosophy */}
          <div className="lg:col-span-7 space-y-10">
            {/* Bio Narrative */}
            <div className="space-y-5 text-base sm:text-lg text-[#292824] leading-relaxed font-sans">
              <p className="font-semibold text-xl sm:text-2xl text-[#171715] font-['Space_Grotesk']">
                "Driven by a passion for creating scalable, impactful software architectures and data-driven systems."
              </p>
              <p>
                I am a senior Information Technology student at the{' '}
                <strong className="text-[#171715] font-semibold">
                  University of Southern Philippines Foundation
                </strong>
                . My academic and professional journey centers around full-stack web engineering, artificial intelligence integration, and cloud-native systems.
              </p>
              <p className="text-[#66635B]">
                Rather than staying solely in conceptual code, I focus on engineering tangible platforms that solve operational bottlenecks. My portfolio includes multi-tenant healthcare software like{' '}
                <span className="text-[#171715] font-medium">KlinikaHub</span> and{' '}
                <span className="text-[#171715] font-medium">Medora</span>, enterprise workforce ERPs like{' '}
                <span className="text-[#171715] font-medium">Realynk</span>, IoT waste-management systems like{' '}
                <span className="text-[#171715] font-medium">G-TRASH</span>, and AI speech tutors like{' '}
                <span className="text-[#171715] font-medium">Langor AI</span>.
              </p>
            </div>

            {/* Development Philosophy / Core Pillars */}
            <div className="space-y-4 pt-4 border-t border-[#C8B99A]/40">
              <div className="text-xs font-mono uppercase tracking-widest text-[#85847E]">
                Development Philosophy
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {principles.map((pr) => (
                  <div
                    key={pr.num}
                    className="p-5 rounded-2xl bg-white/70 border border-[#C8B99A]/50 hover:border-[#171715]/40 transition-colors"
                  >
                    <div className="text-xs font-mono font-bold text-[#C8B99A] mb-2">
                      {pr.num}
                    </div>
                    <div className="text-base font-bold font-['Space_Grotesk'] text-[#171715] mb-1.5">
                      {pr.title}
                    </div>
                    <p className="text-xs text-[#66635B] leading-relaxed">
                      {pr.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Technical Skills Header (Inside max-w-7xl) */}
        <div className="pt-10 border-t border-[#C8B99A]/40">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#85847E] mb-1">
                Technology Arsenal
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#171715]">
                Core Technologies & Tools
              </h3>
            </div>

            <span className="text-xs font-mono text-[#85847E]">
              Hover to pause • 30+ production tools & frameworks
            </span>
          </div>
        </div>

      </div>

      {/* FULL-WIDTH EDGE-TO-EDGE CONTINUOUS AUTO-SCROLLING RIBBON */}
      <div className="relative w-full overflow-hidden py-6 my-8 border-y border-[#C8B99A]/40 bg-white/70 backdrop-blur-md shadow-xs space-y-4">
        
        {/* Row 1: Flowing Left */}
        <div className="flex w-full overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-4 pr-4">
            {row1Track.map((skill, idx) => (
              <div
                key={`r1-${idx}`}
                className="group/tile relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#C8B99A]/50 shadow-xs hover:border-[#171715] hover:shadow-md flex items-center justify-center p-3.5 transition-all duration-300 hover:scale-105"
                title={skill.name}
              >
                <Icon
                  icon={skill.icon}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform group-hover/tile:scale-110"
                />

                {/* Subtle Hover Tooltip */}
                <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tile:opacity-100 transition-opacity bg-[#171715] text-[#F8F7F2] text-[10px] font-mono px-2 py-0.5 rounded-md whitespace-nowrap shadow-md z-20">
                  {skill.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Flowing Right (Reverse) */}
        <div className="flex w-full overflow-hidden select-none">
          <div className="animate-marquee-reverse flex items-center gap-4 pr-4">
            {row2Track.map((skill, idx) => (
              <div
                key={`r2-${idx}`}
                className="group/tile relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#C8B99A]/50 shadow-xs hover:border-[#171715] hover:shadow-md flex items-center justify-center p-3.5 transition-all duration-300 hover:scale-105"
                title={skill.name}
              >
                <Icon
                  icon={skill.icon}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform group-hover/tile:scale-110"
                />

                {/* Subtle Hover Tooltip */}
                <div className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tile:opacity-100 transition-opacity bg-[#171715] text-[#F8F7F2] text-[10px] font-mono px-2 py-0.5 rounded-md whitespace-nowrap shadow-md z-20">
                  {skill.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left and Right Edge Fade Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#F8F7F2] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#F8F7F2] to-transparent z-10" />

      </div>

      {/* Bottom Toolchain Caption (Inside max-w-7xl) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-xs font-mono text-[#85847E]">
          Continuous engineering toolchain spanning Frontend, Backend, AI integrations, BaaS, and Cloud Deployments.
        </div>
      </div>
    </section>
  );
}

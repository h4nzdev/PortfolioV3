import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalInfo, technicalSkills } from '../../data/portfolioData';
import { Icon } from '@iconify/react';
import meImg from '../../assets/me.png';

export default function AboutSection2D() {
  const [inspectedSkill, setInspectedSkill] = useState(null);
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
      
      {/* Decorative Editorial Arc Lines & 4-Point Sparkle Stars */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] overflow-hidden hidden md:block select-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 480" fill="none" preserveAspectRatio="none">
          {/* Left Flowing Arc */}
          <path
            d="M -20 120 Q 220 220 410 340"
            stroke="#171715"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.3"
          />
          {/* Left 4-Point Star */}
          <g transform="translate(190, 195)">
            <path
              d="M 14 0 Q 14 14 0 14 Q 14 14 14 28 Q 14 14 28 14 Q 14 14 14 0 Z"
              fill="#171715"
            />
          </g>

          {/* Right Flowing Arc */}
          <path
            d="M 1220 120 Q 980 220 790 340"
            stroke="#171715"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.3"
          />
          {/* Right 4-Point Star */}
          <g transform="translate(980, 195)">
            <path
              d="M 14 0 Q 14 14 0 14 Q 14 14 14 28 Q 14 14 28 14 Q 14 14 14 0 Z"
              fill="#171715"
            />
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
        
        {/* Grand Centered Editorial Header per Reference Layout */}
        <div className="text-center max-w-4xl mx-auto space-y-4 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
            <span className="text-xs font-mono font-medium text-[#292824] uppercase tracking-wider">
              02 // Editorial Dossier
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#171715] font-['Space_Grotesk'] leading-[1.08]">
            Inspiration Starting<br />From Engineering
          </h2>

          <p className="text-xs sm:text-sm font-mono text-[#85847E] tracking-widest uppercase">
            Architectural Software Rigor • Scalable Systems • High-Utility Platforms
          </p>
        </div>

        {/* 3-Column Architectural Centerpiece Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: 3 Editorial Narrative Blocks + Footnote */}
          <div className="order-2 lg:order-1 lg:col-span-4 space-y-7 sm:space-y-8">
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#85847E] font-semibold">
                Academic Foundation
              </div>
              <p className="text-sm sm:text-[15px] text-[#4A4842] leading-relaxed font-sans">
                Senior Information Technology student at the{' '}
                <strong className="text-[#171715] font-semibold">
                  University of Southern Philippines Foundation
                </strong>
                , bridging innovative software engineering with scalable real-world architectures.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#85847E] font-semibold">
                Engineering Expertise
              </div>
              <p className="text-sm sm:text-[15px] text-[#4A4842] leading-relaxed font-sans">
                Passionate about building scalable software architectures, integrating AI, and developing high-performance, data-driven applications across modern web, mobile, and cloud environments.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#85847E] font-semibold">
                Quantifiable Utility
              </div>
              <p className="text-sm sm:text-[15px] text-[#4A4842] leading-relaxed font-sans">
                Engineering production platforms that eliminate operational bottlenecks—from multi-tenant healthcare (<span className="text-[#171715] font-medium">KlinikaHub</span>, <span className="text-[#171715] font-medium">Medora</span>) to workforce ERPs (<span className="text-[#171715] font-medium">Realynk</span>) and IoT systems (<span className="text-[#171715] font-medium">G-TRASH</span>).
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2.5 text-xs font-mono text-[#85847E]">
              <div className="w-3.5 h-5 rounded-full border border-[#C8B99A] flex items-start justify-center p-0.5">
                <div className="w-1 h-1.5 bg-[#171715] rounded-full animate-bounce" />
              </div>
              <span>Scroll for engineering toolchain</span>
            </div>
          </div>

          {/* Center Column: Roman Arch Frame with Nested Borders */}
          <motion.div
            style={{ y: photoParallax }}
            className="order-1 lg:order-2 lg:col-span-4 flex flex-col items-center justify-center"
          >
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] p-2.5 sm:p-3 rounded-t-full rounded-b-2xl border border-[#171715]/20 bg-white/50 backdrop-blur-xs shadow-md group">
              {/* Inner Arch Window */}
              <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-t-full rounded-b-xl border border-[#171715]/20 bg-[#171715]">
                <img
                  src={meImg}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                {/* Subtle bottom shadow vignette */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#171715]/85 via-[#171715]/20 to-transparent" />
                
                {/* Arch Bottom Tag */}
                <div className="absolute bottom-3.5 inset-x-3 text-center">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#C8B99A]">
                    {personalInfo.shortName}
                  </div>
                  <div className="text-xs font-semibold text-white font-['Space_Grotesk'] tracking-tight">
                    {personalInfo.role}
                  </div>
                </div>
              </div>

              {/* Caption Under Arch */}
              <div className="mt-3 text-center">
                <p className="text-[11px] font-mono text-[#85847E] tracking-wider uppercase">
                  {personalInfo.institution} • Cebu, PH
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Prominent Metric Numbers per Reference */}
          <div className="order-3 lg:order-3 lg:col-span-4 space-y-7 sm:space-y-8 lg:pl-8">
            <div>
              <div className="text-[11px] font-mono text-[#85847E] uppercase tracking-widest mb-1 font-semibold">
                Year in BSIT
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] text-[#171715] tracking-tight">
                4th
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-[#85847E] uppercase tracking-widest mb-1 font-semibold">
                Core Projects
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] text-[#171715] tracking-tight">
                6
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-[#85847E] uppercase tracking-widest mb-1 font-semibold">
                Production Stacks
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] text-[#171715] tracking-tight">
                30+
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono text-[#85847E] uppercase tracking-widest mb-1 font-semibold">
                Academic Merit
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] text-[#171715] tracking-tight">
                Dean's
              </div>
              <span className="text-xs font-mono text-[#85847E] block mt-1">
                Honors Scholar
              </span>
            </div>
          </div>

        </div>

        {/* Development Philosophy / Core Pillars */}
        <div className="pt-16 border-t border-[#C8B99A]/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#85847E] mb-1">
                Engineering Philosophy
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] text-[#171715]">
                Core Architectural Pillars
              </h3>
            </div>
            <span className="text-xs font-mono text-[#85847E]">
              Guiding principles across every shipped system
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {principles.map((pr) => (
              <div
                key={pr.num}
                className="p-6 rounded-2xl bg-white/70 border border-[#C8B99A]/50 hover:border-[#171715]/40 transition-colors shadow-xs"
              >
                <div className="text-xs font-mono font-bold text-[#C8B99A] mb-2">
                  {pr.num}
                </div>
                <div className="text-lg font-bold font-['Space_Grotesk'] text-[#171715] mb-2">
                  {pr.title}
                </div>
                <p className="text-xs sm:text-sm text-[#66635B] leading-relaxed">
                  {pr.desc}
                </p>
              </div>
            ))}
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

            <span className="text-xs font-mono text-[#85847E] flex items-center gap-2">
              <span>Hover to pause</span>
              <span className="w-1 h-1 rounded-full bg-[#C8B99A]" />
              {inspectedSkill ? (
                <span className="text-[#171715] font-semibold flex items-center gap-1.5 transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Inspecting: <span className="underline decoration-[#C8B99A] underline-offset-2">{inspectedSkill}</span>
                </span>
              ) : (
                <span>30+ production tools & frameworks</span>
              )}
            </span>
          </div>
        </div>

      </div>

      {/* FULL-WIDTH EDGE-TO-EDGE CONTINUOUS AUTO-SCROLLING RIBBON */}
      <div className="relative w-full overflow-hidden py-4 sm:py-6 my-8 border-y border-[#C8B99A]/40 bg-white/70 backdrop-blur-md shadow-xs space-y-2">
        
        {/* Row 1: Flowing Left */}
        <div className="flex w-full overflow-hidden select-none pt-12 pb-3">
          <div className="animate-marquee flex items-center gap-4 pr-4">
            {row1Track.map((skill, idx) => (
              <div
                key={`r1-${idx}`}
                onMouseEnter={() => setInspectedSkill(skill.name)}
                onMouseLeave={() => setInspectedSkill(null)}
                onClick={() => setInspectedSkill(skill.name)}
                className="group relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#C8B99A]/50 shadow-xs hover:border-[#171715] hover:shadow-xl flex items-center justify-center p-3.5 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Icon
                  icon={skill.icon}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                />

                {/* Tactile Floating Tooltip */}
                <div className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 ease-out z-40 whitespace-nowrap">
                  <div className="relative px-2.5 py-1 rounded-lg bg-[#171715] text-[#F8F7F2] text-[11px] font-mono tracking-wide shadow-2xl border border-[#C8B99A]/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99A] shrink-0" />
                    <span className="font-semibold text-white">{skill.name}</span>
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#171715]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Flowing Right (Reverse) */}
        <div className="flex w-full overflow-hidden select-none pt-12 pb-3">
          <div className="animate-marquee-reverse flex items-center gap-4 pr-4">
            {row2Track.map((skill, idx) => (
              <div
                key={`r2-${idx}`}
                onMouseEnter={() => setInspectedSkill(skill.name)}
                onMouseLeave={() => setInspectedSkill(null)}
                onClick={() => setInspectedSkill(skill.name)}
                className="group relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-[#C8B99A]/50 shadow-xs hover:border-[#171715] hover:shadow-xl flex items-center justify-center p-3.5 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <Icon
                  icon={skill.icon}
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                />

                {/* Tactile Floating Tooltip */}
                <div className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200 ease-out z-40 whitespace-nowrap">
                  <div className="relative px-2.5 py-1 rounded-lg bg-[#171715] text-[#F8F7F2] text-[11px] font-mono tracking-wide shadow-2xl border border-[#C8B99A]/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99A] shrink-0" />
                    <span className="font-semibold text-white">{skill.name}</span>
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#171715]" />
                  </div>
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

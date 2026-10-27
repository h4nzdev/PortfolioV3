import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { educationTimeline } from '../../data/portfolioData';
import { GraduationCap, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/sound';

export default function EducationSection2D() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="education"
      onMouseMove={handleMouseMove}
      className="relative w-full py-28 sm:py-36 bg-[#171715] text-[#F8F7F2] border-t border-[#C8B99A]/30 overflow-hidden selection:bg-[#C8B99A] selection:text-[#171715]"
    >
      {/* Giant Faint "EDUCATION" Watermark with Parallax Drift */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0"
      >
        <span className="text-[5rem] sm:text-[9rem] md:text-[12rem] lg:text-[14rem] font-bold font-['Space_Grotesk'] text-white/[0.035] tracking-[0.2em] uppercase leading-none whitespace-nowrap block">
          EDUCATION
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header Block: /EDUCATION + Top Right Badge (Matching Reference) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#C8B99A]/20 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#C8B99A]/30 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99A] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5DCCB]">
                04 // Academic Records
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-['Space_Grotesk'] text-[#F8F7F2] tracking-tight">
              /EDUCATION
            </h2>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="text-xs sm:text-sm font-mono text-[#C8B99A]">
              Senior BSIT Candidate • USPF Cebu
            </span>
            <div className="text-xs font-mono text-[#85847E]">
              Dean's List Standing • 2011 - Present
            </div>
          </div>
        </div>

        {/* Minimal Divided Rows (Directly from Reference Layout) */}
        <div className="relative divide-y divide-[#C8B99A]/20 border-y border-[#C8B99A]/20">
          {educationTimeline.map((item, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  sound.playClick();
                  setHoveredIdx(idx);
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative py-7 sm:py-9 px-4 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 hover:bg-[#292824]/40 cursor-pointer rounded-xl"
              >
                {/* Left Side: Institution & Degree */}
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#C8B99A] opacity-75">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Space_Grotesk'] text-[#F8F7F2] group-hover:text-[#C8B99A] transition-colors leading-tight">
                      {item.institution}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-[#85847E] group-hover:text-[#E5DCCB] transition-colors font-sans pl-7">
                    {item.level}
                    {idx === 0 && (
                      <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#C8B99A]/20 text-[#C8B99A] border border-[#C8B99A]/40">
                        Dean's List
                      </span>
                    )}
                  </p>
                </div>

                {/* Right Side: Date & Status */}
                <div className="flex items-center justify-between md:justify-end gap-6 pl-7 md:pl-0">
                  <span className="text-sm sm:text-base font-mono text-[#85847E] group-hover:text-[#F8F7F2] transition-colors">
                    {item.year}
                  </span>

                  <div className="w-8 h-8 rounded-full bg-white/5 border border-[#C8B99A]/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={15} className="text-[#C8B99A]" />
                  </div>
                </div>

                {/* Left accent bar on hover */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-[#C8B99A] rounded-r-full transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Metadata Summary Row */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#85847E]">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#C8B99A]" />
            <span>Accredited curriculum aligned with modern software engineering</span>
          </span>
          <span>University of Southern Philippines Foundation</span>
        </div>

      </div>

      {/* Floating Hover Card (Directly inspired by Reference Floating Card) */}
      {hoveredIdx !== null && (
        <div
          className="pointer-events-none hidden lg:block absolute z-30 transition-all duration-150 ease-out"
          style={{
            left: `${mousePos.x + 24}px`,
            top: `${mousePos.y - 48}px`,
          }}
        >
          <div className="w-64 p-4 rounded-2xl bg-[#292824]/95 border border-[#C8B99A]/60 shadow-2xl backdrop-blur-xl text-left space-y-2 transform rotate-1">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#C8B99A]">
              <span>Verified Credential</span>
              <GraduationCap size={13} />
            </div>

            <div className="text-sm font-bold font-['Space_Grotesk'] text-[#F8F7F2] leading-snug">
              {educationTimeline[hoveredIdx].institution}
            </div>

            <p className="text-xs text-[#E5DCCB]/80 font-sans leading-relaxed">
              {educationTimeline[hoveredIdx].description}
            </p>

            <div className="pt-2 border-t border-[#C8B99A]/20 flex items-center justify-between text-[10px] font-mono text-[#85847E]">
              <span>Status</span>
              <span className="text-[#C8B99A] font-semibold">
                {educationTimeline[hoveredIdx].status}
              </span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

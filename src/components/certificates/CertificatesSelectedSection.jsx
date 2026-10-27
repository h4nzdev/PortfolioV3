import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { certifications } from '../../data/portfolioData';
import { CheckCircle2, Award, ShieldCheck, Eye, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';

export default function CertificatesSelectedSection({ onOpenCertificateModal }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgTextY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const activeCert = certifications[activeIdx] || certifications[0];

  const handleNext = () => {
    sound.playClick();
    setActiveIdx((prev) => (prev + 1) % certifications.length);
  };

  const handlePrev = () => {
    sound.playClick();
    setActiveIdx((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  // Background watermark text for each certificate (USPF / TESDA / HACKESTATE)
  const bgTexts = {
    0: 'USPF',
    1: 'TESDA',
    2: 'USPF',
    3: 'HACKESTATE',
  };

  const certNarratives = [
    'Conferred with the prestigious Top Innovator Award at the University of Southern Philippines Foundation for pioneering architectural software development, high-impact user experiences, and innovative full-stack engineering solutions.',
    'Officially certified under the Philippine Technical Education and Skills Development Authority (TESDA) National Certificate II in Computer Systems Servicing, validating technical competencies in enterprise hardware configuration, operating systems deployment, and network infrastructure.',
    'Formally recognized presenter and participant at the USPF Annual Research Congress, delivering peer-reviewed engineering findings in software intelligence, scalable platforms, and automation architectures.',
    'Secured 3rd Place among top engineering and technology teams at Hackestate Hackathon for engineering high-performance automated property management and real-time transaction processing systems under intense sprint deadlines.',
  ];

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative w-full py-24 sm:py-32 bg-[#F8F7F2] border-t border-[#C8B99A]/40 overflow-hidden selection:bg-[#C8B99A] selection:text-[#171715]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Top Minimal Pill Bar */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50">
            <ShieldCheck size={13} className="text-[#171715]" />
            <span className="text-xs font-mono font-medium text-[#292824] uppercase tracking-wider">
              05 // Verified Recognition
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#85847E]">
              Credential 0{activeIdx + 1} of 0{certifications.length}
            </span>
          </div>
        </div>

        {/* Main Split Showcase Hero (Full-Scale Image with NO border + Giant Background Text) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Information & Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <div className="text-xs font-mono text-[#C8B99A] uppercase tracking-widest font-semibold flex items-center gap-2">
                <Sparkles size={13} />
                <span>Verified Honor // 0{activeIdx + 1}</span>
              </div>

              {/* Bold Title matching reference "Certificate Confirm" style */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Space_Grotesk'] text-[#171715] tracking-tight leading-[1.05]">
                Certificate Confirm
              </h2>

              <div className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-[#85847E] pt-1">
                {activeCert.title}
              </div>
            </div>

            {/* Narrative Paragraph */}
            <p className="text-sm sm:text-base text-[#66635B] leading-relaxed font-sans max-w-xl">
              {certNarratives[activeIdx]}
            </p>

            {/* Key Metadata Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white border border-[#C8B99A]/40 shadow-xs">
                <span className="text-[10px] font-mono uppercase text-[#85847E] block">Issuer</span>
                <span className="text-sm font-mono font-bold text-[#171715] truncate block">{activeCert.issuer}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#C8B99A]/40 shadow-xs">
                <span className="text-[10px] font-mono uppercase text-[#85847E] block">Year Issued</span>
                <span className="text-sm font-mono font-bold text-[#171715] block">{activeCert.year}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#C8B99A]/40 shadow-xs col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase text-[#85847E] block">Standing</span>
                <span className="text-sm font-mono font-bold text-[#171715] flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Verified</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  if (onOpenCertificateModal) onOpenCertificateModal(activeIdx);
                }}
                className="px-6 py-3 rounded-full text-xs font-mono font-semibold tracking-wider bg-[#171715] text-[#F8F7F2] hover:bg-[#C8B99A] hover:text-[#171715] transition-all shadow-md flex items-center gap-2.5 cursor-pointer"
              >
                <CheckCircle2 size={16} />
                <span>Inspect Credential</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  if (onOpenCertificateModal) onOpenCertificateModal(activeIdx);
                }}
                className="px-6 py-3 rounded-full text-xs font-mono font-medium tracking-wider bg-white hover:bg-[#E5DCCB]/50 border border-[#C8B99A]/80 text-[#171715] transition-all shadow-xs flex items-center gap-2.5 cursor-pointer"
              >
                <Award size={16} className="text-[#C8B99A]" />
                <span>Full Record</span>
              </button>
            </div>

            {/* Pagination Controls: Bullets only + milestone count */}
            <div className="flex items-center justify-between pt-4 border-t border-[#C8B99A]/30">
              
              {/* Bullet Dots Pagination */}
              <div className="flex items-center gap-2.5">
                {certifications.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      sound.playClick();
                      setActiveIdx(idx);
                    }}
                    className={`transition-all duration-300 cursor-pointer ${
                      activeIdx === idx
                        ? 'w-9 h-2.5 rounded-full bg-[#171715]'
                        : 'w-2.5 h-2.5 rounded-full bg-[#C8B99A]/70 hover:bg-[#171715]/60'
                    }`}
                    title={`View Certificate 0${idx + 1}`}
                    aria-label={`View Certificate 0${idx + 1}`}
                  />
                ))}
              </div>

              <div className="text-xs font-mono text-[#85847E]">
                <span>0{activeIdx + 1} / 0{certifications.length}</span>
              </div>

            </div>

          </div>

          {/* Right Column: Full-Scale Image with NO BORDER + Giant Background Watermark Text + Halo */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[480px] sm:min-h-[580px] lg:min-h-[660px] overflow-visible select-none">
            
            {/* Giant Background Watermark Text (USPF / TESDA / HACKESTATE) with Parallax */}
            <motion.div
              style={{ y: bgTextY }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
            >
              <span
                key={`bg-${activeIdx}`}
                className="text-[7.5rem] sm:text-[11.5rem] md:text-[15rem] lg:text-[19rem] font-black font-['Space_Grotesk'] text-[#171715]/[0.05] tracking-tighter uppercase leading-none whitespace-nowrap animate-fadeIn"
              >
                {bgTexts[activeIdx]}
              </span>
            </motion.div>

            {/* Concentric Architectural Halo Backdrop */}
            <div className="absolute w-[380px] sm:w-[500px] lg:w-[600px] aspect-square rounded-full border border-[#C8B99A]/30 bg-gradient-to-tr from-[#C8B99A]/15 via-[#E5DCCB]/25 to-transparent flex items-center justify-center pointer-events-none z-0">
              <div className="w-[82%] aspect-square rounded-full border border-[#C8B99A]/45 bg-radial from-white/70 via-[#E5DCCB]/30 to-transparent shadow-xl flex items-center justify-center">
                <div className="w-[66%] aspect-square rounded-full bg-radial from-white via-[#C8B99A]/20 to-transparent blur-md" />
              </div>
            </div>

            {/* Full Scale Certificate Image - ZERO BORDER, CONSISTENT FIXED SIZE */}
            <div
              key={`img-${activeIdx}`}
              onClick={() => {
                sound.playClick();
                if (onOpenCertificateModal) onOpenCertificateModal(activeIdx);
              }}
              className="relative z-10 flex items-center justify-center cursor-pointer group animate-fadeIn h-[480px] sm:h-[560px] lg:h-[640px] aspect-[451/600]"
              title="Click to inspect high-resolution credential"
            >
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)] group-hover:scale-105 group-hover:drop-shadow-[0_30px_45px_rgba(0,0,0,0.25)] transition-all duration-500 select-none"
              />

              {/* Floating inspect prompt on hover */}
              <div className="absolute bottom-2 right-4 sm:bottom-4 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171715]/90 backdrop-blur-md text-[#F8F7F2] border border-[#C8B99A]/50 text-[11px] font-mono shadow-xl">
                  <Eye size={13} className="text-[#C8B99A]" />
                  <span>Click to inspect</span>
                </div>
              </div>
            </div>

            {/* Floating Side Arrow Controls on the Hero Image */}
            <button
              onClick={handlePrev}
              className="absolute -left-2 sm:left-1 md:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-[#C8B99A]/60 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] transition-all shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95"
              title="Previous Certificate"
              aria-label="Previous Certificate"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="absolute -right-2 sm:right-1 md:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-[#C8B99A]/60 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] transition-all shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95"
              title="Next Certificate"
              aria-label="Next Certificate"
            >
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

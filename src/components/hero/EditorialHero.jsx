import { ArrowRight, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../SocialIcons';
import { personalInfo } from '../../data/portfolioData';
import { sound } from '../../utils/sound';
import resumeDoc from '../../assets/resume/Hanz_Resume.pdf';

export default function EditorialHero({ scrollProgress, onExploreWork, onAboutMe }) {
  // Graceful fadeout as visitor begins scrolling away from the hero desk
  const fadeThreshold = 0.12;
  const opacity = Math.max(0, 1 - scrollProgress / fadeThreshold);
  const translateY = -(scrollProgress / fadeThreshold) * 40;
  const isHidden = scrollProgress > fadeThreshold + 0.02;

  if (isHidden) return null;

  return (
    <section
      className="fixed inset-0 z-30 flex flex-col justify-between px-6 sm:px-12 lg:px-20 pt-24 pb-8 pointer-events-none transition-opacity duration-300"
      style={{
        opacity,
        transform: `translate3d(0, ${translateY}px, 0)`,
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
      }}
    >
      <div className="max-w-4xl my-auto space-y-6">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 border border-[#C8B99A]/60 backdrop-blur-md shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#171715] animate-pulse" />
          <span className="text-[11px] font-mono font-semibold tracking-wider text-[#292824] uppercase">
            Senior BSIT Specialist • Software Architect • Cebu City, PH
          </span>
        </div>

        {/* Main Headline & Subtitle per prompt */}
        <div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#171715] leading-[0.98] font-['Space_Grotesk']">
            Hi, I'm <span className="text-[#A99A7D]">Hanz.</span>
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-[#292824] font-medium mt-3 tracking-tight font-['Space_Grotesk']">
            I'm a developer who turns ideas into working applications.
          </p>
        </div>

        {/* Real Profile Introduction */}
        <p className="text-base sm:text-lg text-[#66635B] leading-relaxed max-w-2xl font-sans">
          Senior Information Technology student at the University of Southern Philippines Foundation. I design and build production-ready systems — from enterprise ERPs and AI productivity tools to multi-tenant cloud platforms and real-time IoT architectures.
        </p>

        {/* Primary and Secondary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => {
              sound.playClick();
              if (onExploreWork) onExploreWork();
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#171715] text-[#F8F7F2] text-sm font-medium hover:bg-[#292824] transition-all shadow-md group"
          >
            <span>Explore My Work</span>
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              if (onAboutMe) onAboutMe();
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/80 border border-[#292824]/40 text-[#171715] text-sm font-medium hover:bg-[#E5DCCB]/50 transition-all shadow-xs"
          >
            <span>About Me</span>
          </button>

          {/* Social Profiles */}
          <div className="flex items-center gap-2 sm:ml-2">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/80 border border-[#C8B99A]/50 text-[#171715] hover:bg-[#E5DCCB]/50 transition-all shadow-xs"
              title="GitHub Profile"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/80 border border-[#C8B99A]/50 text-[#171715] hover:bg-[#E5DCCB]/50 transition-all shadow-xs"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={resumeDoc}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/80 border border-[#C8B99A]/50 text-[#171715] hover:bg-[#E5DCCB]/50 transition-all shadow-xs"
              title="View Resume"
              aria-label="Resume"
            >
              <FileText size={17} />
            </a>
          </div>
        </div>

        {/* Real Metrics Row */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-4 border-t border-[#C8B99A]/40 text-xs font-mono text-[#66635B]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
            <span>4TH YEAR BSIT @ USPF</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99A]" />
            <span>DEAN'S LIST SCHOLAR</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A99A7D]" />
            <span>12+ PRODUCTION PROJECTS</span>
          </div>
        </div>

      </div>

      {/* Small Scroll Indicator at bottom */}
      <div className="flex flex-col items-center gap-2 mx-auto pt-4">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#85847E]">
          Scroll to begin the journey
        </span>
        <div className="w-5 h-8 rounded-full border border-[#C8B99A] flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-[#171715] rounded-full animate-bounce" />
        </div>
      </div>

    </section>
  );
}

import { ArrowDown, FileText, Mail } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../SocialIcons';
import { personalInfo } from '../../data/portfolioData';
import { sound } from '../../utils/sound';
import resumePdf from '../../assets/resume/Hanz_Resume.pdf';

// Real project mockups for Vertical Dual-Direction Background Columns
import realynkImg1 from '../../assets/projects/realynk/realynk1.png';
import realynkImg2 from '../../assets/projects/realynk/realynk2.png';
import realynkImg3 from '../../assets/projects/realynk/realynk3.png';

import palImg1 from '../../assets/projects/pal/pal1.png';
import palImg2 from '../../assets/projects/pal/pal2.png';
import palImg3 from '../../assets/projects/pal/pal3.png';

import langorImg1 from '../../assets/projects/langor/langor1.png';
import langorImg2 from '../../assets/projects/langor/langor2.png';
import langorImg3 from '../../assets/projects/langor/langor3.png';

import gtrashImg1 from '../../assets/projects/gtrash/gtrash1.png';
import gtrashImg2 from '../../assets/projects/gtrash/gtrash2.png';
import gtrashImg3 from '../../assets/projects/gtrash/gtrash3.png';

import klinikaImg1 from '../../assets/projects/klinkahub/k1.jpg';
import klinikaImg2 from '../../assets/projects/klinkahub/k2.jpg';
import klinikaImg3 from '../../assets/projects/klinkahub/k3.jpg';

import medoraImg1 from '../../assets/projects/medora/medora1.png';
import medoraImg2 from '../../assets/projects/medora/medora2.png';
import medoraImg3 from '../../assets/projects/medora/medora3.png';

// 5 Asymmetric Vertical Columns
const col1 = [
  { id: 'realynk', title: 'Realynk ERP', kicker: '01 // Property Management', img: realynkImg1, tag: 'Full-Stack' },
  { id: 'klinika', title: 'KlinikaHub Telehealth', kicker: '04 // Medical Consult', img: klinikaImg2, tag: 'Healthcare' },
  { id: 'medora', title: 'Medora EHR', kicker: '06 // Hospital System', img: medoraImg1, tag: 'Clinical' },
  { id: 'pal', title: 'PAL Flight Weather', kicker: '02 // Radar Console', img: palImg2, tag: 'Aviation' },
];

const col2 = [
  { id: 'pal', title: 'PAL JourneyPad', kicker: '02 // Electronic Flight Bag', img: palImg1, tag: 'Flight Ops' },
  { id: 'langor', title: 'Langor Voice Agent', kicker: '03 // Speech Processing', img: langorImg2, tag: 'AI Interface' },
  { id: 'gtrash', title: 'G-TRASH IoT', kicker: '05 // Smart Waste Sensor', img: gtrashImg1, tag: 'IoT Telemetry' },
  { id: 'realynk', title: 'Realynk Unit Ledger', kicker: '01 // Financial Suite', img: realynkImg2, tag: 'Enterprise' },
];

const col3 = [
  { id: 'langor', title: 'Langor AI', kicker: '03 // Multi-Modal LLM', img: langorImg1, tag: 'Multi-Modal' },
  { id: 'medora', title: 'Medora Patient Vitals', kicker: '06 // EHR Clinical Matrix', img: medoraImg2, tag: 'Medical Cloud' },
  { id: 'klinika', title: 'KlinikaHub Patient', kicker: '04 // Mobile Records', img: klinikaImg1, tag: 'Mobile App' },
  { id: 'pal', title: 'PAL Checklist Sim', kicker: '02 // Aviation Simulator', img: palImg3, tag: 'Avionics' },
];

const col4 = [
  { id: 'klinika', title: 'KlinikaHub Clinic Admin', kicker: '04 // Practice Matrix', img: klinikaImg3, tag: 'SaaS Platform' },
  { id: 'gtrash', title: 'G-TRASH Telemetry Map', kicker: '05 // Fleet Route Ops', img: gtrashImg2, tag: 'Hardware Ops' },
  { id: 'realynk', title: 'Realynk Financials', kicker: '01 // Ledger Analytics', img: realynkImg3, tag: 'Analytics' },
  { id: 'langor', title: 'Langor Context Engine', kicker: '03 // Neural Pipeline', img: langorImg3, tag: 'Deep Learning' },
];

const col5 = [
  { id: 'gtrash', title: 'G-TRASH Solar Bin', kicker: '05 // IoT Hardware Node', img: gtrashImg3, tag: 'Hardware' },
  { id: 'medora', title: 'Medora Pharmacy Hub', kicker: '06 // Rx Dispensing', img: medoraImg3, tag: 'Pharmacy' },
  { id: 'pal', title: 'PAL Dispatcher', kicker: '02 // Airline Network', img: palImg1, tag: 'Avionics' },
  { id: 'realynk', title: 'Realynk Tenant Portal', kicker: '01 // Resident Dashboard', img: realynkImg1, tag: 'Web Portal' },
];

const col1Cards = [...col1, ...col1];
const col2Cards = [...col2, ...col2];
const col3Cards = [...col3, ...col3];
const col4Cards = [...col4, ...col4];
const col5Cards = [...col5, ...col5];

export default function EditorialMosaicHero({ onExploreWork, onAboutMe, onOpenProjectModal }) {

  const renderCard = (proj, idx, colPrefix) => (
    <div
      key={`${colPrefix}-${proj.id}-${idx}`}
      onClick={() => {
        sound.playClick();
        if (onOpenProjectModal) onOpenProjectModal(proj.id);
      }}
      className="group relative w-full h-[220px] sm:h-[280px] lg:h-[340px] aspect-[3/4] shrink-0 rounded-2xl overflow-hidden bg-[#292824] border border-[#C8B99A]/20 cursor-pointer shadow-xl transition-all duration-500 hover:border-[#C8B99A]/60"
    >
      <img
        src={proj.img}
        alt={proj.title}
        className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-75 group-hover:scale-105 group-hover:brightness-95 group-hover:grayscale-0 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#171715]/90 via-[#171715]/25 to-transparent" />
      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono text-[#C8B99A]">
        <span className="bg-[#171715]/85 backdrop-blur-sm px-2 py-0.5 rounded border border-[#C8B99A]/30 font-medium truncate max-w-[85%]">
          {proj.title}
        </span>
        <span className="text-[10px] text-[#E5DCCB]/60 uppercase tracking-wider hidden sm:inline-block">
          {proj.tag}
        </span>
      </div>
    </div>
  );

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#171715] text-[#F8F7F2] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-4 sm:px-6 lg:px-8 selection:bg-[#C8B99A] selection:text-[#171715]"
    >
      {/* Background Vertical Animated Columns Moving in Opposite Directions */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex justify-between gap-3 sm:gap-4 lg:gap-5 px-2 sm:px-4 pointer-events-auto opacity-35 hover:opacity-50 transition-opacity duration-700 select-none">
        
        {/* Column 1: Moves Downwards */}
        <div className="relative h-full flex-1 min-w-0 overflow-hidden flex flex-col">
          <div className="animate-hero-col-down flex flex-col gap-3 sm:gap-4 lg:gap-5" style={{ animationDuration: '48s' }}>
            {col1Cards.map((proj, idx) => renderCard(proj, idx, 'c1'))}
          </div>
        </div>

        {/* Column 2: Moves UPWARDS (Opposite Direction) */}
        <div className="relative h-full flex-1 min-w-0 overflow-hidden flex flex-col">
          <div className="animate-hero-col-up flex flex-col gap-3 sm:gap-4 lg:gap-5" style={{ animationDuration: '42s' }}>
            {col2Cards.map((proj, idx) => renderCard(proj, idx, 'c2'))}
          </div>
        </div>

        {/* Column 3: Moves Downwards (Opposite Direction) */}
        <div className="relative h-full flex-1 min-w-0 overflow-hidden hidden sm:flex flex-col">
          <div className="animate-hero-col-down flex flex-col gap-3 sm:gap-4 lg:gap-5" style={{ animationDuration: '50s' }}>
            {col3Cards.map((proj, idx) => renderCard(proj, idx, 'c3'))}
          </div>
        </div>

        {/* Column 4: Moves UPWARDS (Opposite Direction) */}
        <div className="relative h-full flex-1 min-w-0 overflow-hidden hidden md:flex flex-col">
          <div className="animate-hero-col-up flex flex-col gap-3 sm:gap-4 lg:gap-5" style={{ animationDuration: '44s' }}>
            {col4Cards.map((proj, idx) => renderCard(proj, idx, 'c4'))}
          </div>
        </div>

        {/* Column 5: Moves Downwards (Opposite Direction) */}
        <div className="relative h-full flex-1 min-w-0 overflow-hidden hidden lg:flex flex-col">
          <div className="animate-hero-col-down flex flex-col gap-3 sm:gap-4 lg:gap-5" style={{ animationDuration: '46s' }}>
            {col5Cards.map((proj, idx) => renderCard(proj, idx, 'c5'))}
          </div>
        </div>

      </div>

      {/* Atmospheric Overlays for Warm Architectural Mood & Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#171715] via-[#171715]/70 to-[#171715]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#171715]/45 to-[#171715]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

      {/* Top Editorial Kicker & Status */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-[#C8B99A]/30 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99A] animate-pulse" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5DCCB]">
            Portfolio Dossier • 2025/2026
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#C8B99A]/80">
          <span>BSIT Senior • USPF Cebu</span>
          <span>•</span>
          <span>Full-Stack Architecture</span>
        </div>
      </div>

      {/* Middle/Lower Content Block: Narrative & Primary CTAs */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-auto mb-6 sm:mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        
        {/* Left Column: Narrative Paragraph & Buttons */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-[#C8B99A]">
            01 // Developer & Software Architect
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Space_Grotesk'] text-[#F8F7F2] leading-tight">
            Hi, I'm Hanz.
            <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-[#C8B99A] mt-1">
              Developer building ideas into working applications.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#E5DCCB]/85 leading-relaxed font-sans max-w-xl">
            {personalInfo.bio} Leveraging my IT background at the University of Southern Philippines Foundation to bridge innovative technology with real-world solutions across scalable architectures, AI integrations, and high-performance applications.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                if (onExploreWork) onExploreWork();
                else document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-full text-xs font-mono font-semibold tracking-wider bg-[#F8F7F2] text-[#171715] hover:bg-[#C8B99A] hover:text-[#171715] transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Explore My Work</span>
              <ArrowDown size={14} className="rotate-[-45deg]" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                if (onAboutMe) onAboutMe();
                else document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-full text-xs font-mono font-medium tracking-wider bg-white/10 hover:bg-white/20 border border-[#C8B99A]/40 text-[#F8F7F2] backdrop-blur-md transition-all cursor-pointer"
            >
              About Me
            </button>
          </div>
        </div>

        {/* Right Column: Social Links & Subtle Scroll Down Badge */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 border border-[#C8B99A]/30 text-[#F8F7F2] hover:bg-[#C8B99A] hover:text-[#171715] transition-all"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 border border-[#C8B99A]/30 text-[#F8F7F2] hover:bg-[#C8B99A] hover:text-[#171715] transition-all"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 rounded-full bg-white/10 border border-[#C8B99A]/30 text-[#F8F7F2] hover:bg-[#C8B99A] hover:text-[#171715] transition-all"
              title="Direct Email"
              aria-label="Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 border border-[#C8B99A]/30 text-xs font-mono text-[#F8F7F2] hover:bg-[#C8B99A] hover:text-[#171715] transition-all"
              title="View Resume PDF"
            >
              <FileText size={13} />
              <span>Resume PDF</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#C8B99A]/80 pt-2">
            <span>Scroll down to continue</span>
            <ArrowDown size={14} className="animate-bounce" />
          </div>
        </div>

      </div>

      {/* Massive Editorial Display Headline Across the Bottom (Matching Reference Layout) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 border-t border-[#C8B99A]/25">
        <h1 className="w-full text-center sm:text-left text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold font-['Space_Grotesk'] tracking-tighter uppercase leading-[0.82] text-white/95 select-none transition-colors">
          BUILDING IDEAS
        </h1>
      </div>

    </section>
  );
}

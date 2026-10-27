import { useState, useMemo } from 'react';
import { featuredProjects } from '../../data/portfolioData';
import { ArrowUpRight, Sparkles, Eye, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { sound } from '../../utils/sound';
import GridMotion from './GridMotion';

export default function ProjectsBentoShowcase({ onOpenProjectModal }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Filter pills
  const filters = [
    { id: 'All', label: 'All Systems (6)' },
    { id: 'ERP', label: 'Enterprise ERP' },
    { id: 'AI', label: 'AI & Co-Pilot' },
    { id: 'IoT', label: 'IoT & Hardware' },
    { id: 'Healthcare', label: 'Healthcare SaaS' },
  ];

  // Specific project references from dataset
  const realynkProj = featuredProjects.find((p) => p.id === 'realynk') || featuredProjects[0];
  const palProj = featuredProjects.find((p) => p.id === 'pal-journeypad') || featuredProjects[1];
  const langorProj = featuredProjects.find((p) => p.id === 'langor-ai') || featuredProjects[2];
  const gtrashProj = featuredProjects.find((p) => p.id === 'gtrash') || featuredProjects[3];
  const klinikaProj = featuredProjects.find((p) => p.id === 'klinikahub') || featuredProjects[4];
  const medoraProj = featuredProjects.find((p) => p.id === 'medora') || featuredProjects[5];

  // Prepare items for GridMotion (Real project screenshots + typographic badges)
  const gridMotionItems = useMemo(() => {
    const list = [];

    featuredProjects.forEach((proj) => {
      // Add project mockup images
      if (proj.images && proj.images.length > 0) {
        list.push(proj.images[0]);
        if (proj.images[1]) list.push(proj.images[1]);
        if (proj.images[2]) list.push(proj.images[2]);
      } else if (proj.image) {
        list.push(proj.image);
      }

      // Add custom typographic system badge
      list.push(
        <div
          key={`badge-${proj.id}`}
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            if (onOpenProjectModal) onOpenProjectModal(proj.id);
          }}
          className="w-full h-full p-4 flex flex-col justify-between bg-[#F8F7F2] hover:bg-[#E5DCCB]/60 transition-colors text-left cursor-pointer select-none"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C8B99A]">
              {proj.category.split('&')[0].trim()}
            </span>
            <ArrowUpRight size={14} className="text-[#171715]" />
          </div>
          <div>
            <span className="block font-['Space_Grotesk'] font-bold text-sm sm:text-base text-[#171715] leading-tight">
              {proj.title.split('–')[0].trim()}
            </span>
            <span className="text-[10px] font-mono text-[#85847E] mt-0.5 block">
              {proj.role}
            </span>
          </div>
        </div>
      );
    });

    return list;
  }, [onOpenProjectModal]);

  return (
    <section
      id="projects"
      className="relative w-full py-28 sm:py-36 bg-[#F8F7F2] text-[#171715] border-t border-[#C8B99A]/40 overflow-hidden selection:bg-[#C8B99A] selection:text-[#171715]"
    >
      {/* Giant Faint "SYSTEMS" Watermark in Light Warm Palette */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <span className="text-[5rem] sm:text-[9rem] md:text-[12rem] lg:text-[14rem] font-bold font-['Space_Grotesk'] text-[#171715]/[0.035] tracking-[0.2em] uppercase leading-none whitespace-nowrap block">
          SYSTEMS
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header Block: /SELECTED WORK & Systems Dossier */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#C8B99A]/30 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
              <span className="text-xs font-mono font-medium text-[#292824] uppercase tracking-wider">
                03 // Engineering Portfolio & Motion Wall
              </span>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-['Cormorant_Garamond'] italic font-normal text-3xl sm:text-4xl text-[#85847E]">
                the
              </span>
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#171715] leading-none">
                WORK
              </h2>
              <span className="px-3 py-1 rounded-full border border-[#C8B99A]/50 text-xs sm:text-sm font-['Cormorant_Garamond'] italic text-[#292824] bg-white/80 shadow-xs">
                (I stand)
              </span>
              <h2 className="font-['Playfair_Display'] text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#171715] leading-none">
                BEHIND
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-mono text-[#66635B] max-w-xl">
              An asymmetric bento portfolio featuring production-grade ERPs, AI co-pilots, IoT smart waste hardware, and multi-tenant clinical SaaS.
            </p>
          </div>

          {/* Filter Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedFilter(filter.id);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedFilter === filter.id
                    ? 'bg-[#171715] text-[#F8F7F2] font-semibold shadow-xs'
                    : 'bg-white/80 hover:bg-[#E5DCCB]/60 text-[#292824] border border-[#C8B99A]/40'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* ----------------- ASYMMETRIC MODULAR BENTO GRID ----------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* BENTO CARD 1: React Bits <GridMotion /> Live Motion Wall (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#C8B99A]/50 p-4 sm:p-6 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 relative overflow-hidden group min-h-[460px]">
            
            {/* Top Bar on Motion Card */}
            <div className="flex items-center justify-between pb-3 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-[#292824]">
                  Motion Grid // Live Interface Wall
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono bg-[#E5DCCB]/60 border border-[#C8B99A]/40 text-[#292824]">
                <Sparkles size={11} className="text-[#171715]" />
                <span>Move Cursor to Spotlight</span>
              </div>
            </div>

            {/* GridMotion Component Viewport */}
            <div className="relative w-full h-[360px] sm:h-[390px] rounded-2xl overflow-hidden bg-[#F8F7F2] border border-[#C8B99A]/30">
              <GridMotion
                items={gridMotionItems}
                rows={3}
                aspectRatio={1.42}
                gap={14}
                radius={14}
                angle={-10}
                tilt={0}
                speed={20}
                direction="alternate"
                parallax={0.45}
                spotlight={0.65}
                dim={0.2}
                fade={0.35}
                grayscale={false}
                theme="light"
                tileColor="#FFFFFF"
                textColor="#171715"
              />

              {/* Bottom Subtle Guidance Pill */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono text-[#171715] font-semibold border border-[#C8B99A]/50 shadow-xs">
                  Drifting Project Archives
                </span>
                <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-[#F8F7F2] shadow-xs">
                  6 Systems Online
                </span>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="pt-3 flex items-center justify-between text-xs font-mono text-[#85847E]">
              <span>Interactive React Bits Motion Wall</span>
              <span className="text-[#171715] font-semibold">Parallax & Spotlight Enabled</span>
            </div>

          </div>

          {/* BENTO CARD 2: Flagship Enterprise ERP — Realynk (lg:col-span-5) */}
          <div
            onClick={() => {
              sound.playClick();
              if (onOpenProjectModal) onOpenProjectModal(realynkProj.id);
            }}
            className="lg:col-span-5 bg-white rounded-3xl border border-[#C8B99A]/50 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#171715]/40 transition-all duration-300 group cursor-pointer relative"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between pb-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-[#E5DCCB]/60 text-[#171715] border border-[#C8B99A]/40">
                Flagship PWA ERP
              </span>
              <div className="w-9 h-9 rounded-full bg-[#F8F7F2] text-[#171715] border border-[#C8B99A]/40 flex items-center justify-center group-hover:bg-[#171715] group-hover:text-white transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>

            {/* Preview Image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#292824]/5 border border-[#C8B99A]/30 my-2">
              <img
                src={realynkProj.images?.[0] || realynkProj.image}
                alt={realynkProj.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
              
              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/90 backdrop-blur-md text-[#171715] font-semibold border border-[#C8B99A]/40">
                  Role: Full Stack Developer
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="pt-3 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#171715] leading-snug">
                {realynkProj.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#66635B] leading-relaxed line-clamp-2">
                {realynkProj.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {realynkProj.techStack?.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#F8F7F2] text-[#292824] border border-[#C8B99A]/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metric Banner */}
              <div className="mt-3 pt-3 border-t border-[#C8B99A]/20 flex items-center justify-between text-xs font-mono text-[#292824]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-[#C8B99A]" />
                  <span>HTML5 Geolocation Punching</span>
                </span>
                <span className="font-semibold text-[#171715]">Role: Admin + PWA</span>
              </div>
            </div>
          </div>

          {/* BENTO CARD 3: AI Co-Pilot — PAL (JourneyPad) (lg:col-span-4) */}
          <div
            onClick={() => {
              sound.playClick();
              if (onOpenProjectModal) onOpenProjectModal(palProj.id);
            }}
            className="md:col-span-1 lg:col-span-4 bg-white rounded-3xl border border-[#C8B99A]/50 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#171715]/40 transition-all duration-300 group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between pb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-[#E5DCCB]/60 text-[#171715] border border-[#C8B99A]/40">
                  AI & Co-Pilot
                </span>
                <div className="w-8 h-8 rounded-full bg-[#F8F7F2] text-[#171715] border border-[#C8B99A]/40 flex items-center justify-center group-hover:bg-[#171715] group-hover:text-white transition-colors">
                  <Eye size={14} />
                </div>
              </div>

              {/* Image Preview */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#292824]/5 border border-[#C8B99A]/30 my-2">
                <img
                  src={palProj.images?.[0] || palProj.image}
                  alt={palProj.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-[#171715] pt-2">
                {palProj.title}
              </h3>
              <p className="text-xs font-sans text-[#66635B] pt-1 line-clamp-2">
                Collaborative project planning with Groq Llama 3.1 AI co-pilot, nested task trees, and real-time team chat.
              </p>
            </div>

            <div className="pt-4 border-t border-[#C8B99A]/20 mt-3 flex flex-wrap gap-1.5">
              {['Groq API', 'React 19', 'Supabase Realtime'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F8F7F2] text-[#292824] border border-[#C8B99A]/30">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* BENTO CARD 4: AI Translation Engine — Langor AI (lg:col-span-4) */}
          <div
            onClick={() => {
              sound.playClick();
              if (onOpenProjectModal) onOpenProjectModal(langorProj.id);
            }}
            className="md:col-span-1 lg:col-span-4 bg-white rounded-3xl border border-[#C8B99A]/50 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#171715]/40 transition-all duration-300 group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between pb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-[#E5DCCB]/60 text-[#171715] border border-[#C8B99A]/40">
                  AI / NLP Engine
                </span>
                <div className="w-8 h-8 rounded-full bg-[#F8F7F2] text-[#171715] border border-[#C8B99A]/40 flex items-center justify-center group-hover:bg-[#171715] group-hover:text-white transition-colors">
                  <Eye size={14} />
                </div>
              </div>

              {/* Image Preview */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#292824]/5 border border-[#C8B99A]/30 my-2">
                <img
                  src={langorProj.images?.[0] || langorProj.image}
                  alt={langorProj.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-[#171715] pt-2">
                {langorProj.title}
              </h3>
              <p className="text-xs font-sans text-[#66635B] pt-1 line-clamp-2">
                English-Bisaya dialect translation platform with audio pronunciation synthesis and contextual phrasebooks.
              </p>
            </div>

            <div className="pt-4 border-t border-[#C8B99A]/20 mt-3 flex flex-wrap gap-1.5">
              {['Next.js', 'Gemini API', 'Audio Speech API'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F8F7F2] text-[#292824] border border-[#C8B99A]/30">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* BENTO CARD 5: IoT Hardware & Smart Waste — G-TRASH (lg:col-span-4) */}
          <div
            onClick={() => {
              sound.playClick();
              if (onOpenProjectModal) onOpenProjectModal(gtrashProj.id);
            }}
            className="md:col-span-2 lg:col-span-4 bg-white rounded-3xl border border-[#C8B99A]/50 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-[#171715]/40 transition-all duration-300 group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between pb-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-[#E5DCCB]/60 text-[#171715] border border-[#C8B99A]/40">
                  IoT & Hardware
                </span>
                <div className="w-8 h-8 rounded-full bg-[#F8F7F2] text-[#171715] border border-[#C8B99A]/40 flex items-center justify-center group-hover:bg-[#171715] group-hover:text-white transition-colors">
                  <Cpu size={14} />
                </div>
              </div>

              {/* Image Preview */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#292824]/5 border border-[#C8B99A]/30 my-2">
                <img
                  src={gtrashProj.images?.[0] || gtrashProj.image}
                  alt={gtrashProj.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-[#171715] pt-2">
                {gtrashProj.title}
              </h3>
              <p className="text-xs font-sans text-[#66635B] pt-1 line-clamp-2">
                Automated waste sorting system leveraging ESP32 microcontrollers, ultrasonic fill sensors, and gamified reward tokens.
              </p>
            </div>

            <div className="pt-4 border-t border-[#C8B99A]/20 mt-3 flex flex-wrap gap-1.5">
              {['ESP32 IoT', 'C++ / Arduino', 'Gamification'].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F8F7F2] text-[#292824] border border-[#C8B99A]/30">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* BENTO CARD 6: Panoramic Healthcare Suite (KlinikaHub & Medora) (col-span-12) */}
          <div className="lg:col-span-12 bg-white rounded-3xl border border-[#C8B99A]/50 p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between pb-6 border-b border-[#C8B99A]/20">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2">
                  <Activity size={14} className="text-[#171715]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171715]">
                    Multi-Tenant Healthcare Architecture
                  </span>
                </div>
                <p className="text-xs font-mono text-[#66635B]">
                  Isolated tenant subdomains, HIPAA-aligned records, and automated clinic management.
                </p>
              </div>

              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-mono bg-[#E5DCCB]/60 text-[#292824] border border-[#C8B99A]/40">
                SaaS Workspaces
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6">
              
              {/* Left Sub-card: KlinikaHub */}
              <div
                onClick={() => {
                  sound.playClick();
                  if (onOpenProjectModal) onOpenProjectModal(klinikaProj.id);
                }}
                className="group p-5 rounded-2xl bg-[#F8F7F2]/80 hover:bg-[#E5DCCB]/30 border border-[#C8B99A]/40 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white text-[#171715] font-semibold border border-[#C8B99A]/40">
                      KlinikaHub • Multi-Tenant
                    </span>
                    <ArrowUpRight size={14} className="text-[#85847E] group-hover:text-[#171715] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-white border border-[#C8B99A]/30 my-3">
                    <img
                      src={klinikaProj.images?.[0] || klinikaProj.image}
                      alt={klinikaProj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <h4 className="font-['Space_Grotesk'] font-bold text-base sm:text-lg text-[#171715]">
                    {klinikaProj.title}
                  </h4>
                  <p className="text-xs font-sans text-[#66635B] pt-1 line-clamp-2">
                    Subdomain-isolated tenant management with electronic health records (EHR), online patient scheduling, and telehealth.
                  </p>
                </div>

                <div className="pt-3 flex flex-wrap gap-1">
                  {['Next.js 14', 'PostgreSQL', 'Telehealth', 'Stripe'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-[#292824] border border-[#C8B99A]/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Sub-card: Medora */}
              <div
                onClick={() => {
                  sound.playClick();
                  if (onOpenProjectModal) onOpenProjectModal(medoraProj.id);
                }}
                className="group p-5 rounded-2xl bg-[#F8F7F2]/80 hover:bg-[#E5DCCB]/30 border border-[#C8B99A]/40 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white text-[#171715] font-semibold border border-[#C8B99A]/40">
                      Medora • Practice Management
                    </span>
                    <ArrowUpRight size={14} className="text-[#85847E] group-hover:text-[#171715] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-white border border-[#C8B99A]/30 my-3">
                    <img
                      src={medoraProj.images?.[0] || medoraProj.image}
                      alt={medoraProj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <h4 className="font-['Space_Grotesk'] font-bold text-base sm:text-lg text-[#171715]">
                    {medoraProj.title}
                  </h4>
                  <p className="text-xs font-sans text-[#66635B] pt-1 line-clamp-2">
                    Centralized practice operations with patient intake, billing POS, automated invoicing, and Google OAuth credentials.
                  </p>
                </div>

                <div className="pt-3 flex flex-wrap gap-1">
                  {['CodeIgniter 3', 'MySQL', 'Google OAuth', 'POS Invoicing'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-[#292824] border border-[#C8B99A]/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

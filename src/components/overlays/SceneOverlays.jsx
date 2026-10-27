import { useState } from 'react';
import { ExternalLink, Layers, ArrowUpRight, Award, RotateCcw, Maximize2, GraduationCap, Send, Mail, Sparkles } from 'lucide-react';
import { Icon } from '@iconify/react';
import { featuredProjects, personalInfo, technicalSkills, certifications, educationTimeline } from '../../data/portfolioData';
import { sound } from '../../utils/sound';

const getTechIcon = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('react') || t.includes('zustand')) return "logos:react";
  if (t.includes('next.js')) return "logos:nextjs-icon";
  if (t.includes('vite')) return "logos:vitejs";
  if (t.includes('tailwind')) return "logos:tailwindcss-icon";
  if (t.includes('supabase')) return "logos:supabase-icon";
  if (t.includes('leaflet')) return "logos:leaflet";
  if (t.includes('node.js')) return "logos:nodejs-icon";
  if (t.includes('mongodb')) return "logos:mongodb-icon";
  if (t.includes('socket.io')) return "logos:socket-io";
  if (t.includes('php')) return "logos:php";
  if (t.includes('codeigniter')) return "logos:codeigniter-icon";
  if (t.includes('mysql')) return "logos:mysql";
  if (t.includes('google')) return "logos:google-icon";
  if (t.includes('webrtc')) return "logos:webrtc";
  if (t.includes('groq') || t.includes('elevenlabs')) return "logos:openai-icon";
  if (t.includes('iot') || t.includes('esp32')) return "logos:arduino";
  return "logos:javascript";
};

export default function SceneOverlays({
  scrollProgress,
  activeScene,
  activeProjectId,
  onChangeProject,
  onOpenProject,
  onOpenCertificate,
  onOpenContact,
  onRestartJourney,
}) {
  const [activeSkillCategory, setActiveSkillCategory] = useState(0);

  // Determine current project
  const currentProject = featuredProjects.find((p) => p.id === activeProjectId) || featuredProjects[0];
  const currentProjectIndex = featuredProjects.findIndex((p) => p.id === currentProject.id);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-8 lg:p-12">

      {/* Top spacer for header */}
      <div className="h-14" />

      {/* ======================================================== */}
      {/* SCENE 01 — HERO / THE WORKSPACE (When scrolled past hero) */}
      {/* ======================================================== */}
      {activeScene === 1 && scrollProgress >= 0.08 && (
        <div className="max-w-2xl my-auto transition-all duration-700 pointer-events-auto animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full editorial-pill mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171715] animate-pulse" />
            <span>SCENE 01 // THE WORKSPACE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#171715] leading-[1.05] mb-3 font-['Space_Grotesk']">
            THE CRAFT BEGINS HERE.
          </h2>

          <p className="text-base sm:text-lg text-[#292824] leading-relaxed mb-4 max-w-xl">
            At the desk is where complex problems become tangible systems. Every keystroke is dedicated to clarity, resilience, and real-world utility.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#66635B]">
            <div className="px-3 py-1.5 rounded-full bg-white/85 border border-[#C8B99A]/50 backdrop-blur-md">
              <span className="text-[#171715] font-bold">FOCUS:</span> Scalable Architectures & Full-Stack Systems
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/85 border border-[#C8B99A]/50 backdrop-blur-md">
              <span className="text-[#171715] font-bold">STATUS:</span> Coding & Shipping
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCENE 02 — ABOUT: THE PERSON BEHIND THE CODE */}
      {/* ======================================================== */}
      {activeScene === 2 && (
        <div className="max-w-3xl my-auto transition-all duration-700 pointer-events-auto animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full editorial-pill mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
            <span>SCENE 02 // THE PERSON BEHIND THE CODE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#171715] tracking-tight leading-tight mb-2 font-['Space_Grotesk']">
            CURIOUS. DISCIPLINED. INTENTIONAL.
          </h2>

          <p className="text-sm sm:text-base text-[#292824] leading-relaxed mb-4 max-w-2xl">
            {personalInfo.longBio}
          </p>

          {/* Philosophy Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
            <div className="p-3 rounded-xl bg-white/85 border border-[#C8B99A]/50 backdrop-blur-md shadow-xs">
              <div className="text-xs font-mono font-bold text-[#171715] uppercase mb-1">01. Architecture First</div>
              <p className="text-[11px] text-[#66635B] leading-normal">
                Strict separation of concerns, normalized state trees, and scalable cloud datastores.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/85 border border-[#C8B99A]/50 backdrop-blur-md shadow-xs">
              <div className="text-xs font-mono font-bold text-[#171715] uppercase mb-1">02. Real-World Value</div>
              <p className="text-[11px] text-[#66635B] leading-normal">
                Building tools that solve tangible challenges — time tracking, waste logistics, and clinic workflows.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/85 border border-[#C8B99A]/50 backdrop-blur-md shadow-xs">
              <div className="text-xs font-mono font-bold text-[#171715] uppercase mb-1">03. Continuous Evolution</div>
              <p className="text-[11px] text-[#66635B] leading-normal">
                Exploring cutting-edge AI pipelines (Groq, ElevenLabs, Gemini) alongside rock-solid fundamentals.
              </p>
            </div>
          </div>

          {/* Interactive Technical Stack Tabs */}
          <div className="p-4 rounded-2xl bg-white/90 border border-[#C8B99A]/60 backdrop-blur-md shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171715]">
                Core Architectural Capabilities
              </span>
              <div className="flex flex-wrap gap-1">
                {technicalSkills.categories.map((cat, idx) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      sound.playClick();
                      setActiveSkillCategory(idx);
                    }}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all ${
                      activeSkillCategory === idx
                        ? 'bg-[#171715] text-[#F8F7F2]'
                        : 'bg-[#E5DCCB]/50 text-[#292824] hover:bg-[#E5DCCB]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {technicalSkills.categories[activeSkillCategory]?.skills.slice(0, 6).map((skill) => (
                <div
                  key={skill.name}
                  className="p-2 rounded-lg bg-[#F8F7F2] border border-[#E5DCCB] flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon icon={skill.icon || getTechIcon(skill.name)} className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium text-[#171715] truncate">{skill.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#85847E] shrink-0">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCENE 03 — PROJECTS: THE ARCHITECTURE OF MY WORK */}
      {/* ======================================================== */}
      {activeScene === 3 && (
        <div className="max-w-2xl mt-auto mb-2 transition-all duration-700 pointer-events-auto animate-fadeIn">
          
          {/* Floor / Project Selector Bar */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 border border-[#C8B99A]/60 backdrop-blur-md shadow-sm mb-3 w-fit max-w-full overflow-x-auto">
            <span className="text-[10px] font-mono font-bold text-[#85847E] px-2 uppercase shrink-0">
              BUILDING FLOORS:
            </span>
            {featuredProjects.slice(0, 5).map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  sound.playClick();
                  if (onChangeProject) onChangeProject(p.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all shrink-0 ${
                  currentProject.id === p.id
                    ? 'bg-[#171715] text-[#F8F7F2] shadow-xs'
                    : 'text-[#292824] hover:bg-[#E5DCCB]/60'
                }`}
              >
                F0{idx + 1} // {p.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Active Project Card */}
          <div className="p-5 sm:p-6 rounded-2xl editorial-card flex flex-col sm:flex-row gap-5 items-center">
            
            {/* Screenshot Thumbnail with zoom hint */}
            {currentProject.images && currentProject.images[0] && (
              <div
                onClick={() => {
                  sound.playClick();
                  if (onOpenProject) onOpenProject(currentProject.id);
                }}
                className="w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-[#292824] border border-[#C8B99A]/50 shrink-0 cursor-pointer group relative shadow-inner"
              >
                <img
                  src={currentProject.images[0]}
                  alt={currentProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 size={16} className="text-white" />
                </div>
              </div>
            )}

            <div className="flex-1 w-full min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#E5DCCB] text-[#292824]">
                  LEVEL 0{currentProjectIndex + 1} // {currentProject.category}
                </span>
                <span className="text-xs font-mono text-[#85847E]">
                  {currentProject.completed || 'Active'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#171715] tracking-tight mb-1 font-['Space_Grotesk'] truncate">
                {currentProject.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#292824] leading-relaxed mb-3 line-clamp-2">
                {currentProject.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {currentProject.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#E5DCCB]/60 border border-[#C8B99A]/40 text-[#292824]"
                  >
                    <Icon icon={getTechIcon(tech)} className="w-3 h-3" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onOpenProject) onOpenProject(currentProject.id);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#171715] text-[#F8F7F2] text-xs font-medium hover:bg-[#292824] transition-all shadow-xs"
                >
                  <Layers size={13} />
                  <span>Case Study</span>
                </button>

                {currentProject.liveUrl && currentProject.liveUrl !== '#' && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#292824]/40 text-xs font-medium text-[#171715] hover:bg-[#E5DCCB]/50 transition-all shadow-xs"
                  >
                    <span>Launch Live</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCENE 04 — CERTIFICATES & ACHIEVEMENTS: THE MILESTONE STAGE */}
      {/* ======================================================== */}
      {activeScene === 4 && (
        <div className="max-w-2xl my-auto transition-all duration-700 pointer-events-auto animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full editorial-pill mb-3 shadow-xs">
            <Award size={13} />
            <span>SCENE 04 // THE MILESTONE STAGE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#171715] tracking-tight mb-2 font-['Space_Grotesk']">
            MILESTONES OF GROWTH.
          </h2>

          <p className="text-sm sm:text-base text-[#292824] leading-relaxed mb-5 max-w-xl">
            Verified academic excellence, innovation awards, and technical certifications. Click any milestone to inspect the original credential in full resolution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
            {certifications.map((cert, idx) => (
              <div
                key={cert.title}
                onClick={() => {
                  sound.playClick();
                  if (onOpenCertificate) onOpenCertificate(idx);
                }}
                className="p-3 rounded-xl bg-white/90 border border-[#C8B99A]/50 backdrop-blur-md flex items-center gap-3 shadow-xs hover:border-[#171715] cursor-pointer transition-all group"
              >
                <div className="w-14 h-11 rounded-md overflow-hidden bg-[#292824] border border-[#C8B99A]/40 shrink-0">
                  <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[#171715] leading-tight truncate">
                    {cert.title}
                  </div>
                  <div className="text-[11px] font-mono text-[#85847E]">
                    {cert.issuer} • {cert.year}
                  </div>
                </div>
                <Maximize2 size={13} className="text-[#A99A7D] group-hover:text-[#171715] shrink-0 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCENE 05 — EDUCATION: THE WALK TOWARD THE GATE */}
      {/* ======================================================== */}
      {activeScene === 5 && (
        <div className="max-w-2xl my-auto transition-all duration-700 pointer-events-auto animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full editorial-pill mb-3 shadow-xs">
            <GraduationCap size={13} />
            <span>SCENE 05 // THE WALK TOWARD THE GATE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#171715] tracking-tight mb-2 font-['Space_Grotesk']">
            THE PATH OF EDUCATION.
          </h2>

          <p className="text-sm sm:text-base text-[#292824] leading-relaxed mb-5 max-w-xl">
            A journey rooted in discipline and curiosity. As the developer character walks toward the university portal, each chapter marks a foundational milestone.
          </p>

          <div className="space-y-3 max-w-xl">
            {educationTimeline.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/90 border border-[#C8B99A]/50 backdrop-blur-md shadow-xs flex items-start gap-3.5"
              >
                <div className="p-2 rounded-lg bg-[#E5DCCB] text-[#171715] shrink-0 mt-0.5">
                  <GraduationCap size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#171715]">{item.year}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E5DCCB]/60 text-[#292824]">
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171715] font-['Space_Grotesk'] mt-0.5">
                    {item.level}
                  </h4>
                  <div className="text-xs text-[#85847E] font-medium mt-0.5">
                    {item.institution}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Academic Philosophy Quote */}
          <div className="mt-4 p-3.5 rounded-xl bg-[#E5DCCB]/40 border border-[#C8B99A]/50 backdrop-blur-sm max-w-xl">
            <p className="text-xs italic text-[#292824] leading-relaxed">
              "Education is not merely the consumption of technical syntax, but the discipline of structuring complex IT systems to elevate real-world human experiences."
            </p>
            <span className="text-[10px] font-mono text-[#85847E] uppercase block mt-1.5 font-bold">
              — Hanz Christian Angelo G. Magbal
            </span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCENE 06 — LET'S TALK: A CONVERSATION WITH A CLIENT */}
      {/* ======================================================== */}
      {activeScene === 6 && (
        <div className="max-w-3xl my-auto mx-auto text-center transition-all duration-700 pointer-events-auto animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full editorial-pill mb-4 shadow-xs">
            <Sparkles size={13} />
            <span>SCENE 06 // RESOLUTION & COLLABORATION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#171715] tracking-tight mb-3 font-['Space_Grotesk']">
            Have an idea? Let's build something meaningful.
          </h2>

          <p className="text-base sm:text-xl text-[#292824] font-medium leading-relaxed mb-8 max-w-xl mx-auto">
            Whether it's an enterprise ERP, an intelligent AI co-pilot, or a full-scale cloud platform — let's turn concepts into production systems.
          </p>

          {/* Direct Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={() => {
                sound.playClick();
                if (onOpenContact) onOpenContact();
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#171715] text-[#F8F7F2] text-sm font-medium hover:bg-[#292824] transition-all shadow-md"
            >
              <Send size={15} />
              <span>Discuss a Project</span>
            </button>

            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 border border-[#292824]/40 text-[#171715] text-sm font-medium hover:bg-[#E5DCCB]/50 transition-all shadow-xs"
            >
              <Mail size={15} />
              <span>{personalInfo.email}</span>
            </a>

            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full bg-white/90 border border-[#C8B99A]/60 text-[#171715] text-xs font-mono hover:bg-[#E5DCCB]/50 transition-all shadow-xs"
            >
              <span>GitHub</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full bg-white/90 border border-[#C8B99A]/60 text-[#171715] text-xs font-mono hover:bg-[#E5DCCB]/50 transition-all shadow-xs"
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Replay the journey button */}
          <div className="pt-4 border-t border-[#C8B99A]/40 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto">
            <span className="text-xs font-mono text-[#85847E]">
              © {new Date().getFullYear()} Hanz Magbal • Cebu City, Philippines
            </span>

            <button
              onClick={() => {
                sound.playClick();
                if (onRestartJourney) onRestartJourney();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#171715] hover:text-[#85847E] transition-colors"
            >
              <RotateCcw size={13} />
              <span>Return to Top</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Scene Progress Bar at very bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-[#E5DCCB]/50 z-30">
        <div
          className="h-full bg-[#171715] transition-all duration-150"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
        />
      </div>

    </div>
  );
}

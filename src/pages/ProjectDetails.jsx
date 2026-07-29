import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { featuredProjects } from '../data/portfolioData';
import { ArrowLeft, ExternalLink, CheckCircle2, Layout, Layers, Lightbulb, Zap, Rocket } from 'lucide-react';
import { GithubIcon as Github } from '../components/SocialIcons';
import { Icon } from '@iconify/react';

// Reuse the getTechIcon function from Projects.jsx
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
  if (t.includes('codeigniter')) return "logos:codeigniter";
  if (t.includes('mysql')) return "logos:mysql";
  if (t.includes('google')) return "logos:google-icon";
  if (t.includes('webrtc')) return "logos:webrtc";
  if (t.includes('groq') || t.includes('elevenlabs')) return "logos:openai-icon";
  if (t.includes('iot') || t.includes('esp32')) return "logos:arduino";
  return "logos:javascript";
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    const foundProject = featuredProjects.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!project) return null;

  const images = project.images || [project.image].filter(Boolean);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[85rem] mx-auto space-y-12">
        
        {/* Navigation & Header */}
        <div className="space-y-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#8892b0] hover:text-[#64ffda] transition-colors font-mono text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            RETURN_TO_ARCHIVES
          </button>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded mb-4 bg-[#004aad]/20 border border-[#004aad]/50 text-[#64ffda] text-[10px] font-bold uppercase tracking-widest font-mono">
              <Layers className="w-3 h-3" />
              <span>{project.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#e6f1ff] font-outfit leading-tight mb-4 tracking-tight">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#8892b0] font-light max-w-3xl">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Hero Gallery */}
        <div className="cyber-panel p-4 md:p-6 rounded-2xl flex flex-col gap-4">
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden bg-[#020c1b] border border-[#004aad]/40">
            <img 
              src={images[activeImageIndex]} 
              alt={`${project.title} view`} 
              className="w-full h-full object-contain"
            />
          </div>
          
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-32 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[#64ffda] scale-105' : 'border-[#004aad]/40 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Details (Left) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-[#e6f1ff] font-outfit flex items-center gap-2">
                <Layout className="w-5 h-5 text-[#64ffda]" /> Overview
              </h3>
              <p className="text-[#8892b0] leading-relaxed font-mono text-sm md:text-base">
                {project.description}
              </p>
            </section>

            {project.details && (
              <>
                <section className="space-y-4 p-6 rounded-2xl bg-[#004aad]/5 border border-[#004aad]/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
                  <h3 className="text-2xl font-bold text-[#e6f1ff] font-outfit flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-red-400" /> The Problem
                  </h3>
                  <p className="text-[#8892b0] leading-relaxed font-mono text-sm md:text-base">
                    {project.details.problem}
                  </p>
                </section>

                <section className="space-y-4 p-6 rounded-2xl bg-[#004aad]/5 border border-[#004aad]/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#64ffda]/50"></div>
                  <h3 className="text-2xl font-bold text-[#e6f1ff] font-outfit flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#64ffda]" /> The Solution
                  </h3>
                  <p className="text-[#8892b0] leading-relaxed font-mono text-sm md:text-base">
                    {project.details.solution}
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#e6f1ff] font-outfit flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-[#64ffda]" /> Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.details.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#020c1b] border border-[#004aad]/30 font-mono text-sm text-[#8892b0]">
                        <CheckCircle2 className="w-4 h-4 text-[#64ffda] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-8">
            {/* Tech Stack */}
            <div className="cyber-panel p-6 rounded-2xl">
              <h4 className="text-sm font-bold text-[#e6f1ff] uppercase tracking-widest font-mono mb-4 border-b border-[#004aad]/30 pb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-2 bg-[#020c1b]/80 rounded border border-[#004aad]/30 font-mono text-xs text-[#64ffda]">
                    <Icon icon={getTechIcon(tech)} className="w-4 h-4" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta Info */}
            <div className="cyber-panel p-6 rounded-2xl space-y-4 font-mono">
              <h4 className="text-sm font-bold text-[#e6f1ff] uppercase tracking-widest mb-4 border-b border-[#004aad]/30 pb-2">
                Project Specs
              </h4>
              <div className="flex justify-between items-center">
                <span className="text-[#8892b0] text-xs uppercase tracking-wider">Role</span>
                <span className="text-[#e6f1ff] text-sm font-bold">{project.role || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8892b0] text-xs uppercase tracking-wider">Duration</span>
                <span className="text-[#e6f1ff] text-sm font-bold">{project.duration || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8892b0] text-xs uppercase tracking-wider">Status</span>
                <span className="text-[#64ffda] text-sm font-bold">{project.completed || 'TBD'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8892b0] text-xs uppercase tracking-wider">Team Size</span>
                <span className="text-[#e6f1ff] text-sm font-bold">{project.teamSize || 'N/A'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-4 rounded-xl cyber-button bg-[#004aad]/20 flex items-center justify-center gap-2 font-bold font-mono uppercase tracking-wider text-sm hover:scale-[1.02]"
                >
                  <ExternalLink className="w-4 h-4" /> Execute Live
                </a>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-4 rounded-xl cyber-button flex items-center justify-center gap-2 font-bold font-mono uppercase tracking-wider text-sm hover:scale-[1.02]"
                >
                  <Github className="w-4 h-4" /> Source Code
                </a>
              )}
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProjectDetails;

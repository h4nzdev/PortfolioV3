import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { featuredProjects } from '../data/portfolioData';
import { ArrowLeft, ExternalLink, CheckCircle2, Layout, Layers, Lightbulb, Zap, Rocket } from 'lucide-react';
import { GithubIcon as Github } from '../components/SocialIcons';
import { Icon } from '@iconify/react';

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
  const project = featuredProjects.find((p) => p.id === id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) {
      navigate('/');
    }
  }, [project, navigate]);

  if (!project) return null;

  const images = project.images || [project.image].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#151515] pt-24 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-[#C8B99A] selection:text-[#151515]">
      <div className="max-w-[85rem] mx-auto space-y-10">
        
        {/* Navigation & Header */}
        <div className="space-y-5">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#66635B] hover:text-[#151515] transition-colors font-mono text-xs uppercase tracking-wider group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Return to 3D World Journey
          </button>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full editorial-pill mb-3">
              <Layers className="w-3 h-3" />
              <span>{project.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#151515] font-['Space_Grotesk'] leading-tight mb-3 tracking-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-[#292824] font-medium max-w-3xl">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Hero Gallery */}
        <div className="p-4 md:p-6 rounded-2xl bg-white border border-[#C8B99A]/50 shadow-sm flex flex-col gap-4">
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden bg-[#292824] border border-[#C8B99A]/40 flex items-center justify-center">
            <img 
              src={images[activeImageIndex]} 
              alt={`${project.title} view`} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
          
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-28 md:w-36 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[#151515] scale-102 shadow-sm' : 'border-[#C8B99A]/40 opacity-70 hover:opacity-100'
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
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-[#151515] font-['Space_Grotesk'] flex items-center gap-2">
                <Layout className="w-4 h-4 text-[#A99A7D]" /> Architectural Overview
              </h3>
              <p className="text-[#292824] leading-relaxed text-sm md:text-base">
                {project.description}
              </p>
            </section>

            {project.details && (
              <>
                <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#C8B99A]/40 relative overflow-hidden shadow-xs">
                  <h3 className="text-xl font-bold text-[#151515] font-['Space_Grotesk'] flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-[#A99A7D]" /> The Problem
                  </h3>
                  <p className="text-[#292824] leading-relaxed text-sm md:text-base">
                    {project.details.problem}
                  </p>
                </section>

                <section className="space-y-3 p-6 rounded-2xl bg-white border border-[#C8B99A]/40 relative overflow-hidden shadow-xs">
                  <h3 className="text-xl font-bold text-[#151515] font-['Space_Grotesk'] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#A99A7D]" /> The Engineering Solution
                  </h3>
                  <p className="text-[#292824] leading-relaxed text-sm md:text-base">
                    {project.details.solution}
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xl font-bold text-[#151515] font-['Space_Grotesk'] flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-[#A99A7D]" /> Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.details.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#C8B99A]/40 text-xs sm:text-sm text-[#292824]">
                        <CheckCircle2 className="w-4 h-4 text-[#A99A7D] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="p-6 rounded-2xl bg-white border border-[#C8B99A]/40 shadow-xs">
              <h4 className="text-xs font-bold text-[#151515] uppercase tracking-wider font-mono mb-4 border-b border-[#C8B99A]/30 pb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F8F7F2] rounded-lg border border-[#C8B99A]/50 font-mono text-xs text-[#151515]">
                    <Icon icon={getTechIcon(tech)} className="w-3.5 h-3.5" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta Info */}
            <div className="p-6 rounded-2xl bg-white border border-[#C8B99A]/40 space-y-3 font-mono text-xs shadow-xs">
              <h4 className="text-xs font-bold text-[#151515] uppercase tracking-wider mb-3 border-b border-[#C8B99A]/30 pb-2">
                Project Specs
              </h4>
              <div className="flex justify-between items-center">
                <span className="text-[#66635B] uppercase">Role</span>
                <span className="text-[#151515] font-bold">{project.role || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#66635B] uppercase">Duration</span>
                <span className="text-[#151515] font-bold">{project.duration || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#66635B] uppercase">Status</span>
                <span className="text-[#151515] font-bold">{project.completed || 'TBD'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#66635B] uppercase">Team Size</span>
                <span className="text-[#151515] font-bold">{project.teamSize || 'N/A'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-3 rounded-full editorial-btn flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  <ExternalLink className="w-4 h-4" /> Launch Production App
                </a>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-3 rounded-full editorial-btn-outline flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  <Github className="w-4 h-4" /> View Source Code
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

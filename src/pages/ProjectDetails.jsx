import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { featuredProjects } from '../data/portfolioData';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  Layout, 
  Lightbulb, 
  Zap, 
  Rocket, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { GithubIcon as Github } from '../components/SocialIcons';
import { Icon } from '@iconify/react';
import SEO from '../components/common/SEO';

const getTechIcon = (tech) => {
  const t = tech.toLowerCase();
  if (t.includes('react 19') || t.includes('react')) return "logos:react";
  if (t.includes('next.js')) return "logos:nextjs-icon";
  if (t.includes('vite')) return "logos:vitejs";
  if (t.includes('tailwind')) return "logos:tailwindcss-icon";
  if (t.includes('supabase')) return "logos:supabase-icon";
  if (t.includes('leaflet')) return "logos:leaflet";
  if (t.includes('node.js') || t.includes('node')) return "logos:nodejs-icon";
  if (t.includes('mongodb')) return "logos:mongodb-icon";
  if (t.includes('socket.io')) return "logos:socket-io";
  if (t.includes('php')) return "logos:php";
  if (t.includes('codeigniter')) return "logos:codeigniter-icon";
  if (t.includes('mysql')) return "logos:mysql";
  if (t.includes('google')) return "logos:google-icon";
  if (t.includes('webrtc')) return "logos:webrtc";
  if (t.includes('groq')) return "logos:openai-icon";
  if (t.includes('elevenlabs')) return "mdi:robot-outline";
  if (t.includes('iot') || t.includes('esp32')) return "logos:arduino";
  if (t.includes('zustand')) return "logos:react";
  return "logos:javascript";
};

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const currentIndex = featuredProjects.findIndex((p) => p.id === id);
  const project = featuredProjects[currentIndex] || featuredProjects[0];
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Compute Prev / Next project IDs
  const totalProjects = featuredProjects.length;
  const currentNumber = String(currentIndex >= 0 ? currentIndex + 1 : 1).padStart(2, '0');
  const totalNumber = String(totalProjects).padStart(2, '0');
  
  const prevProject = currentIndex > 0 ? featuredProjects[currentIndex - 1] : featuredProjects[totalProjects - 1];
  const nextProject = currentIndex < totalProjects - 1 ? featuredProjects[currentIndex + 1] : featuredProjects[0];

  const images = project?.images || (project?.image ? [project.image] : []);

  const handleReturn = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Keyboard navigation: Left/Right arrows cycle projects, Esc returns home
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      handleReturn();
    } else if (e.key === 'ArrowRight' && (e.metaKey || e.ctrlKey)) {
      navigate(`/project/${nextProject.id}`);
    } else if (e.key === 'ArrowLeft' && (e.metaKey || e.ctrlKey)) {
      navigate(`/project/${prevProject.id}`);
    }
  }, [handleReturn, navigate, nextProject.id, prevProject.id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id, handleKeyDown]);

  if (!project) return null;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div key={id} className="min-h-screen bg-[#F8F7F2] text-[#171715] pt-12 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-[#C8B99A] selection:text-[#171715]">
      {/* Dynamic SEO Meta */}
      <SEO
        title={`${project.title} — Case Study`}
        description={project.overview || project.description}
        keywords={`${project.title}, ${project.category}, ${project.techStack?.join(', ')}, Hanz Magbal`}
        canonicalUrl={`https://hanzmagbal.com/project/${project.id}`}
        ogImage={images[0] || project.image}
        ogType="article"
        schemaData={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: project.title,
          description: project.overview || project.description,
          author: {
            '@type': 'Person',
            name: 'Hanz Christian Angelo G. Magbal',
            url: 'https://hanzmagbal.com',
          },
          publisher: {
            '@type': 'Person',
            name: 'Hanz Magbal',
          },
          image: images[0] || project.image,
        }}
      />
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Top Control Bar with Stepper & Return Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C8B99A]/40">
          {/* Back button */}
          <button 
            onClick={handleReturn}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#66635B] hover:text-[#171715] transition-colors group cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Portfolio</span>
          </button>

          {/* Stepper Carousel Indicator: ← 04 / 06 → */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/project/${prevProject.id}`)}
              className="p-1.5 rounded-full hover:bg-[#E5DCCB]/60 text-[#171715] transition-colors cursor-pointer"
              title={`Previous: ${prevProject.title}`}
              aria-label="Previous Project"
            >
              <ArrowLeft size={16} />
            </button>

            <span className="font-mono text-xs font-semibold tracking-wider text-[#171715]">
              {currentNumber} / {totalNumber}
            </span>

            <button
              onClick={() => navigate(`/project/${nextProject.id}`)}
              className="p-1.5 rounded-full hover:bg-[#E5DCCB]/60 text-[#171715] transition-colors cursor-pointer"
              title={`Next: ${nextProject.title}`}
              aria-label="Next Project"
            >
              <ArrowRight size={16} />
            </button>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#E5DCCB]/60 border border-[#C8B99A]/50 text-[#171715]">
              {project.category}
            </span>
          </div>

          {/* External Launch Links */}
          <div className="flex items-center gap-3">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#171715] text-[#F8F7F2] text-xs font-mono font-medium hover:bg-[#292824] transition-all shadow-xs"
              >
                <span>Launch Live</span>
                <ExternalLink size={13} />
              </a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#C8B99A]/60 text-[#171715] text-xs font-mono font-medium hover:bg-[#E5DCCB]/50 transition-all shadow-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repo</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCCB]/50 border border-[#C8B99A]/40 text-xs font-mono text-[#66635B] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
            <span>Case Study Dossier • {project.completed || 'Present'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold text-[#171715] font-['Space_Grotesk'] tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-2xl text-[#66635B] font-medium max-w-4xl font-sans leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Interactive Media Showcase Gallery */}
        <div className="p-4 sm:p-6 rounded-3xl bg-white border border-[#C8B99A]/60 shadow-sm flex flex-col gap-4">
          {/* Main Selected Image Stage */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#171715] border border-[#C8B99A]/30 flex items-center justify-center group">
            <img 
              src={images[activeImageIndex]} 
              alt={`${project.title} screenshot ${activeImageIndex + 1}`} 
              className="max-h-full max-w-full object-contain transition-opacity duration-300"
            />

            {/* Image index overlay badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#171715]/80 text-[#F8F7F2] text-xs font-mono backdrop-blur-sm border border-[#C8B99A]/30">
              {String(activeImageIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>

            {/* Left/Right Click Navigators on Stage */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#171715]/70 hover:bg-[#171715] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
                  title="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#171715]/70 hover:bg-[#171715] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
                  title="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail Carousel Bar */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin pt-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-24 sm:w-32 aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx 
                      ? 'border-[#171715] scale-105 shadow-md' 
                      : 'border-[#C8B99A]/40 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Case Study Overview (Left 8 Columns) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Architectural Overview */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#85847E]">
                <Layout className="w-4 h-4 text-[#C8B99A]" />
                <span>01 // Architectural Overview</span>
              </div>
              <p className="text-base sm:text-lg text-[#292824] leading-relaxed font-sans">
                {project.description}
              </p>
            </section>

            {/* Problem & Solution Cards */}
            {project.details && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Problem Statement */}
                <div className="p-6 rounded-2xl bg-white border border-[#C8B99A]/50 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#85847E]">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>The Problem</span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-[#4A4842] leading-relaxed">
                    {project.details.problem}
                  </p>
                </div>

                {/* Engineering Solution */}
                <div className="p-6 rounded-2xl bg-white border border-[#C8B99A]/50 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#85847E]">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span>The Solution</span>
                  </div>
                  <p className="text-sm sm:text-[15px] text-[#4A4842] leading-relaxed">
                    {project.details.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Key Features List */}
            {project.details?.features && (
              <section className="space-y-4 pt-4 border-t border-[#C8B99A]/40">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#85847E]">
                  <Rocket className="w-4 h-4 text-[#C8B99A]" />
                  <span>02 // Key Engineering Features</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {project.details.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl bg-white border border-[#C8B99A]/40 flex items-start gap-3 shadow-xs hover:border-[#171715]/40 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#171715] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#292824] leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Sidebar: Tech Arsenal & Specs (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Tech Stack Tiles */}
            <div className="p-6 rounded-2xl bg-white border border-[#C8B99A]/60 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#C8B99A]/30 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#171715] font-bold">
                  Technologies & Tools
                </span>
                <span className="text-[11px] font-mono text-[#85847E]">
                  {project.techStack?.length || 0} stacks
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#FAF9F5] rounded-xl border border-[#C8B99A]/50 font-mono text-xs text-[#171715]"
                  >
                    <Icon icon={getTechIcon(tech)} className="w-4 h-4 object-contain" />
                    <span className="font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Specifications */}
            <div className="p-6 rounded-2xl bg-white border border-[#C8B99A]/60 shadow-xs space-y-3.5 font-mono text-xs">
              <div className="text-xs font-bold text-[#171715] uppercase tracking-wider border-b border-[#C8B99A]/30 pb-3">
                Project Metadata
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#85847E] uppercase">Role</span>
                <span className="text-[#171715] font-semibold">{project.role || 'Full Stack Developer'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#85847E] uppercase">Duration</span>
                <span className="text-[#171715] font-semibold">{project.duration || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#85847E] uppercase">Status</span>
                <span className="text-[#171715] font-semibold">{project.completed || 'Present'}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#85847E] uppercase">Team Size</span>
                <span className="text-[#171715] font-semibold">{project.teamSize || 'N/A'}</span>
              </div>
            </div>

            {/* Launch Links Card */}
            <div className="space-y-3">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#171715] text-[#F8F7F2] hover:bg-[#292824] transition-all flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider shadow-md group"
                >
                  <span>Launch Production App</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-3.5 px-6 rounded-2xl bg-white border border-[#171715]/40 text-[#171715] hover:bg-[#E5DCCB]/40 transition-all flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider shadow-xs"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Pagination Links between all 6 projects */}
        <div className="pt-16 border-t border-[#C8B99A]/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Previous Project Card */}
          <button
            type="button"
            onClick={() => navigate(`/project/${prevProject.id}`)}
            className="p-5 rounded-2xl bg-white/70 border border-[#C8B99A]/50 hover:border-[#171715] transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#85847E] uppercase tracking-wider mb-1">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
              <span>Previous Case Study</span>
            </div>
            <div className="font-['Space_Grotesk'] font-bold text-lg text-[#171715]">
              {prevProject.title}
            </div>
            <span className="text-xs font-mono text-[#85847E]">{prevProject.category}</span>
          </button>

          {/* Next Project Card */}
          <button
            type="button"
            onClick={() => navigate(`/project/${nextProject.id}`)}
            className="p-5 rounded-2xl bg-white/70 border border-[#C8B99A]/50 hover:border-[#171715] transition-all text-right group cursor-pointer"
          >
            <div className="flex items-center justify-end gap-2 text-[11px] font-mono text-[#85847E] uppercase tracking-wider mb-1">
              <span>Next Case Study</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="font-['Space_Grotesk'] font-bold text-lg text-[#171715]">
              {nextProject.title}
            </div>
            <span className="text-xs font-mono text-[#85847E]">{nextProject.category}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
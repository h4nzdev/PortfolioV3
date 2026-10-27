import { useState, useEffect, useCallback } from 'react';
import { X, ExternalLink, CheckCircle2, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { GithubIcon as Github } from '../SocialIcons';
import { featuredProjects } from '../../data/portfolioData';
import { sound } from '../../utils/sound';

export default function ProjectModal({ projectId, onClose, onSelectProject }) {
  const currentIndex = featuredProjects.findIndex((p) => p.id === projectId);
  const project = featuredProjects[currentIndex] || featuredProjects[0];
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const images = project.images || [];

  const handleNextImage = useCallback(() => {
    sound.playClick();
    if (images.length > 0) {
      setSelectedImageIdx((prev) => (prev + 1) % images.length);
    }
  }, [images.length]);

  const handlePrevImage = useCallback(() => {
    sound.playClick();
    if (images.length > 0) {
      setSelectedImageIdx((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [images.length]);

  const handleNextProject = useCallback(() => {
    sound.playClick();
    const nextIdx = (currentIndex + 1) % featuredProjects.length;
    if (onSelectProject) onSelectProject(featuredProjects[nextIdx].id);
  }, [currentIndex, onSelectProject]);

  const handlePrevProject = useCallback(() => {
    sound.playClick();
    const prevIdx = (currentIndex - 1 + featuredProjects.length) % featuredProjects.length;
    if (onSelectProject) onSelectProject(featuredProjects[prevIdx].id);
  }, [currentIndex, onSelectProject]);

  // Keyboard navigation (Escape to close, Arrows to cycle images or projects)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextImage, handlePrevImage, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/60 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#F8F7F2] rounded-2xl border border-[#C8B99A]/60 shadow-2xl overflow-y-auto flex flex-col">
        
        {/* Sticky Header with Navigation Controls */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-[#F8F7F2]/95 border-b border-[#C8B99A]/50 backdrop-blur-md">
          
          {/* Previous / Next Project Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevProject}
              className="p-1.5 rounded-full hover:bg-[#E5DCCB] text-[#171715] transition-colors"
              title="Previous Project"
              aria-label="Previous Project"
            >
              <ArrowLeft size={16} />
            </button>

            <span className="text-xs font-mono font-bold text-[#171715]">
              0{currentIndex + 1} / 0{featuredProjects.length}
            </span>

            <button
              onClick={handleNextProject}
              className="p-1.5 rounded-full hover:bg-[#E5DCCB] text-[#171715] transition-colors"
              title="Next Project"
              aria-label="Next Project"
            >
              <ArrowRight size={16} />
            </button>

            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#E5DCCB] text-[#292824] ml-2">
              {project.category}
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-[#E5DCCB] text-[#171715] transition-colors"
            title="Close Case Study"
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Premium Editorial Case Study */}
        <div className="p-6 md:p-8 space-y-7">
          
          {/* Title & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#85847E] font-semibold">
                Case Study • {project.completed || 'Active Production'}
              </span>
              <h2 id="modal-project-title" className="text-2xl sm:text-4xl font-bold text-[#171715] tracking-tight font-['Space_Grotesk'] mt-1">
                {project.title}
              </h2>
              {project.tagline && (
                <p className="text-sm sm:text-base text-[#66635B] mt-1.5 font-medium">
                  {project.tagline}
                </p>
              )}
            </div>

            {/* External Action Links */}
            <div className="flex items-center gap-2.5 shrink-0">
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#171715] text-[#F8F7F2] text-xs font-medium hover:bg-[#292824] transition-all shadow-xs"
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#171715]/40 text-xs font-medium text-[#171715] hover:bg-[#E5DCCB]/50 transition-all shadow-xs"
                >
                  <Github size={13} />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Real Screenshots Carousel */}
          {images.length > 0 && (
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-[#292824] aspect-video flex items-center justify-center border border-[#C8B99A]/50 shadow-inner">
                <img
                  src={images[selectedImageIdx]}
                  alt={`${project.title} view ${selectedImageIdx + 1}`}
                  className="max-h-full max-w-full object-contain"
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 p-2 rounded-full bg-[#171715]/75 text-white hover:bg-[#171715] transition-colors backdrop-blur-sm shadow-md"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 p-2 rounded-full bg-[#171715]/75 text-white hover:bg-[#171715] transition-colors backdrop-blur-sm shadow-md"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={20} />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                      <span className="text-[11px] font-mono text-white/90 mr-1">
                        {selectedImageIdx + 1} / {images.length}
                      </span>
                      {images.slice(0, 10).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIdx(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            selectedImageIdx === idx ? 'bg-white w-4' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playClick();
                        setSelectedImageIdx(idx);
                      }}
                      className={`w-16 h-11 rounded-lg overflow-hidden border shrink-0 transition-all ${
                        selectedImageIdx === idx
                          ? 'border-[#171715] ring-2 ring-[#C8B99A]'
                          : 'border-[#C8B99A]/40 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Role & Overview */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#C8B99A]/40 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C8B99A]/30 pb-2.5">
              <div className="text-xs font-mono text-[#292824]">
                <strong className="text-[#171715]">My Role:</strong> {project.role || 'Full Stack Developer'}
              </div>
              <div className="text-xs font-mono text-[#292824]">
                <strong className="text-[#171715]">Status:</strong> {project.completed || 'Active'}
              </div>
            </div>
            <p className="text-sm text-[#292824] leading-relaxed pt-1">
              {project.description}
            </p>
          </div>

          {/* Problem & Solution Case Study */}
          {project.details && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#C8B99A]/40 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#85847E] font-bold block">
                  01 // The Problem
                </span>
                <p className="text-xs sm:text-sm text-[#292824] leading-relaxed">
                  {project.details.problem}
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#C8B99A]/40 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#85847E] font-bold block">
                  02 // The Engineering Solution
                </span>
                <p className="text-xs sm:text-sm text-[#292824] leading-relaxed">
                  {project.details.solution}
                </p>
              </div>
            </div>
          )}

          {/* Core Architectural Features */}
          {project.details?.features && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#171715] font-bold">
                Key Architectural Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.details.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-white/80 border border-[#E5DCCB] text-xs text-[#292824]"
                  >
                    <CheckCircle2 size={15} className="text-[#A99A7D] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Stack */}
          <div className="space-y-2 pt-2 border-t border-[#C8B99A]/40">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#85847E] font-semibold">
              Technologies & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white border border-[#C8B99A]/50 text-[#171715] shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

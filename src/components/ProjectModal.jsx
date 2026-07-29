import { useEffect, useRef } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, AlertCircle, Sparkles } from 'lucide-react';
import { GithubIcon as Github } from './SocialIcons';
import gsap from 'gsap';

const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    // Handle Esc key to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Prevent background scroll while modal is open
    document.body.style.overflow = 'hidden';

    // GSAP Entrance Animation
    if (backdropRef.current && modalRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        modalRef.current,
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#E0E5EC]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl soft-ui rounded-3xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#A0AABF]/20">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-xl soft-inset text-[#667EEA] font-black text-xs font-outfit uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs text-[#718096] font-mono hidden sm:inline font-bold">
              ID: {project.id}
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl soft-ui soft-ui-hover text-[#4A5568] hover:text-[#E53E3E] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Title & Tagline */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2D3748] font-outfit">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#667EEA] font-bold italic">
              "{project.tagline}"
            </p>
          </div>

          {/* Hero Image / Mockup Preview */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden soft-inset p-2">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center rounded-xl opacity-90"
            />
          </div>

          {/* Problem vs Solution Architecture Deep Dive */}
          {project.details && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Problem Card */}
              <div className="p-6 rounded-2xl soft-ui border border-white/40 space-y-3">
                <div className="flex items-center gap-2 text-[#E53E3E] font-black font-outfit text-sm uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Problem Statement</span>
                </div>
                <p className="text-[#4A5568] text-sm leading-relaxed font-medium">
                  {project.details.problem}
                </p>
              </div>

              {/* Solution Card */}
              <div className="p-6 rounded-2xl soft-ui border border-white/40 space-y-3">
                <div className="flex items-center gap-2 text-[#38A169] font-black font-outfit text-sm uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>The Engineered Solution</span>
                </div>
                <p className="text-[#4A5568] text-sm leading-relaxed font-medium">
                  {project.details.solution}
                </p>
              </div>

            </div>
          )}

          {/* Full Description */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-[#2D3748] font-outfit uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#667EEA]" />
              <span>Project Overview</span>
            </h3>
            <p className="text-[#4A5568] text-sm sm:text-base leading-relaxed font-medium">
              {project.description}
            </p>
          </div>

          {/* Key Features List */}
          {project.details?.features && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-[#2D3748] font-outfit uppercase tracking-wider">
                Key Architectural Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.details.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-2xl soft-ui"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#38A169] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#4A5568] font-bold">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Matrix */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base font-black text-[#2D3748] font-outfit uppercase tracking-wider">
              Technologies & Tools Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl soft-inset text-[#718096] font-bold text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-5 border-t border-[#A0AABF]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#A0AABF] font-bold italic">
            Designed & Engineered by Hanz Magbal
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl soft-ui soft-ui-hover text-[#4A5568] hover:text-[#2D3748] font-extrabold text-xs uppercase tracking-wider transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl soft-ui soft-ui-hover text-[#667EEA] hover:text-[#4C51BF] font-extrabold text-xs uppercase tracking-wider transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;

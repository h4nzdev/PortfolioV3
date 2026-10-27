import { useState } from 'react';
import { featuredProjects } from '../../data/portfolioData';
import { ExternalLink, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { GithubIcon as Github } from '../SocialIcons';
import { sound } from '../../utils/sound';

export default function ProjectShowcase2D({ onOpenProjectModal }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [imageIndices, setImageIndices] = useState({});

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Enterprise Web App', label: 'Enterprise & ERP' },
    { id: 'AI & Productivity', label: 'AI Platforms' },
    { id: 'IoT & Mobile', label: 'IoT & CleanTech' },
    { id: 'SaaS & Healthcare', label: 'Healthcare SaaS' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? featuredProjects
      : featuredProjects.filter((p) => p.category.includes(selectedCategory) || selectedCategory.includes(p.category));

  const handleNextImage = (projId, total, e) => {
    e.stopPropagation();
    sound.playClick();
    setImageIndices((prev) => ({
      ...prev,
      [projId]: ((prev[projId] || 0) + 1) % total,
    }));
  };

  const handlePrevImage = (projId, total, e) => {
    e.stopPropagation();
    sound.playClick();
    setImageIndices((prev) => ({
      ...prev,
      [projId]: ((prev[projId] || 0) - 1 + total) % total,
    }));
  };

  return (
    <section id="showcase" className="relative w-full py-28 sm:py-36 bg-[#F8F7F2] border-t border-[#C8B99A]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8B99A]/40 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
              <span className="text-xs font-mono font-medium text-[#292824] uppercase tracking-wider">
                04 // Project Showcase
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#171715] font-['Space_Grotesk']">
              Featured Case Studies & Systems
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-white/80 border border-[#C8B99A]/50 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#171715] text-[#F8F7F2] font-semibold'
                    : 'text-[#66635B] hover:text-[#171715] hover:bg-[#E5DCCB]/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const images = project.images || [];
            const currentImgIdx = imageIndices[project.id] || 0;
            const currentImg = images[currentImgIdx] || images[0];

            return (
              <div
                key={project.id}
                className="editorial-card rounded-2xl overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
              >
                {/* Top Image Preview Carousel */}
                <div className="relative aspect-[16/10] bg-[#171715] overflow-hidden">
                  <img
                    src={currentImg}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Category Pill Over Image */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-[#F8F7F2]/90 backdrop-blur-md text-[#171715] border border-[#C8B99A]/50">
                      {project.category}
                    </span>
                  </div>

                  {/* Image Switcher Controls */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-white text-[11px] font-mono">
                      <button
                        onClick={(e) => handlePrevImage(project.id, images.length, e)}
                        className="hover:text-[#C8B99A] transition-colors"
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <span>
                        0{currentImgIdx + 1} / 0{images.length}
                      </span>
                      <button
                        onClick={(e) => handleNextImage(project.id, images.length, e)}
                        className="hover:text-[#C8B99A] transition-colors"
                        aria-label="Next screenshot"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="text-[11px] font-mono text-[#85847E] uppercase">
                      0{idx + 1} // {project.role || 'Full Stack Engineer'}
                    </div>

                    <h3 className="text-xl font-bold font-['Space_Grotesk'] text-[#171715] group-hover:text-[#292824] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#66635B] leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Badges */}
                  <div className="space-y-4 pt-3 border-t border-[#C8B99A]/30">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#E5DCCB]/50 border border-[#C8B99A]/40 text-[#292824]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => {
                          sound.playClick();
                          if (onOpenProjectModal) onOpenProjectModal(project.id);
                        }}
                        className="editorial-btn px-4 py-2 rounded-full text-xs font-mono flex items-center gap-1.5"
                      >
                        <Eye size={12} />
                        <span>Case Study</span>
                      </button>

                      <div className="flex items-center gap-2">
                        {project.githubUrl && project.githubUrl !== '#' && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/80 border border-[#C8B99A]/50 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] transition-colors"
                            title="GitHub Repository"
                            aria-label="GitHub Repository"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}

                        {project.liveUrl && project.liveUrl !== '#' && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-[#171715] text-[#F8F7F2] hover:bg-[#292824] transition-colors"
                            title="Visit Live Application"
                            aria-label="Visit Live Application"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

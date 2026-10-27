import { useState } from 'react';
import { featuredProjects } from '../../data/portfolioData';
import { ArrowUpRight, ExternalLink, Eye } from 'lucide-react';
import { sound } from '../../utils/sound';

export default function SelectedWorkSection({ onOpenProjectModal }) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    { id: 'All', label: 'All' },
    { id: 'Real Project', label: 'Real Project' },
    { id: 'AI & IoT', label: 'AI & IoT' },
    { id: 'Healthcare', label: 'Healthcare SaaS' },
  ];

  const filteredProjects = featuredProjects.filter((project) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Real Project') return project.featured;
    if (selectedFilter === 'AI & IoT') return project.category.includes('AI') || project.category.includes('IoT');
    if (selectedFilter === 'Healthcare') return project.category.includes('Healthcare') || project.category.includes('SaaS');
    return true;
  });

  return (
    <section id="projects" className="relative w-full py-28 sm:py-36 bg-[#F8F7F2] border-t border-[#C8B99A]/40 overflow-hidden">
      
      {/* Giant Faint "PORTFOLIO" Watermark (From Reference) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <span className="text-[5rem] sm:text-[9rem] md:text-[12rem] lg:text-[14rem] font-bold font-['Space_Grotesk'] text-[#171715]/[0.035] tracking-[0.2em] uppercase leading-none whitespace-nowrap block">
          PORTFOLIO
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Header Block: /SELECTED WORK */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
            <span className="text-xs font-mono font-medium text-[#292824] uppercase tracking-wider">
              03 // Engineering Portfolio
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-['Space_Grotesk'] text-[#171715] tracking-tight">
            /SELECTED WORK
          </h2>
        </div>

        {/* Filter Navigation Row (From Reference Layout) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-[#C8B99A]/30 pb-6">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedFilter(filter.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedFilter === filter.id
                    ? 'bg-[#171715] text-[#F8F7F2] font-semibold shadow-xs'
                    : 'bg-white/80 hover:bg-[#E5DCCB]/60 text-[#292824] border border-[#C8B99A]/40'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Right Action Button (From Reference) */}
          <a
            href="https://github.com/h4nzdev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-medium bg-white border border-[#C8B99A]/60 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] hover:border-[#171715] transition-all shadow-xs self-start sm:self-auto"
          >
            <span>View All Work</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* 2-Column Editorial Selected Work Grid (Directly from Reference Image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const thumbnail = project.images?.[0] || project.image;

            return (
              <div
                key={project.id}
                onClick={() => {
                  sound.playClick();
                  if (onOpenProjectModal) onOpenProjectModal(project.id);
                }}
                className="group relative rounded-3xl bg-white border border-[#C8B99A]/50 p-4 sm:p-5 shadow-xs hover:shadow-xl hover:border-[#171715]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Mockup Preview Container */}
                <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#292824]/5 border border-[#C8B99A]/30">
                  <img
                    src={thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Upper Left Badge (e.g. REAL PROJECT) */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#171715] border border-[#C8B99A]/40 shadow-xs">
                      Real Project
                    </span>
                  </div>

                  {/* Circular Hover Action Button (Arrow Icon from Reference) */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-12 h-12 rounded-full bg-white text-[#171715] shadow-xl flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 border border-[#C8B99A]/40">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>

                {/* Project Metadata Under Mockup */}
                <div className="pt-5 pb-1 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#85847E]">
                      0{idx + 1} // {project.category}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-[#171715] group-hover:text-[#292824] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#66635B] leading-relaxed line-clamp-2">
                      {project.tagline || project.description}
                    </p>
                  </div>

                  {/* Tags and Quick Actions Row */}
                  <div className="pt-3 border-t border-[#C8B99A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    {/* Pills (from Reference anatomy) */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-[#E5DCCB]/40 border border-[#C8B99A]/40 text-[#292824]">
                        {project.category.split('&')[0].trim()}
                      </span>

                      <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-white border border-[#C8B99A]/40 text-[#66635B]">
                        {project.techStack?.[0] || 'React'}
                      </span>

                      {project.techStack?.[1] && (
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-white border border-[#C8B99A]/40 text-[#66635B] hidden sm:inline-block">
                          {project.techStack[1]}
                        </span>
                      )}
                    </div>

                    {/* Quick Links */}
                    <div className="flex items-center gap-2 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-[#171715] text-[#F8F7F2] hover:bg-[#292824] transition-colors"
                          title="Visit Live Application"
                          aria-label="Visit Live Application"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}

                      <button
                        onClick={() => {
                          sound.playClick();
                          if (onOpenProjectModal) onOpenProjectModal(project.id);
                        }}
                        className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#F8F7F2] border border-[#C8B99A]/50 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Eye size={12} />
                        <span>Case Study</span>
                      </button>
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

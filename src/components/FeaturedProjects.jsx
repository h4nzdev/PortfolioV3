import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects } from '../data/portfolioData';
import { ExternalLink, ArrowRight, Sparkles, Eye } from 'lucide-react';
import { GithubIcon as Github } from './SocialIcons';
import gsap from 'gsap';

const FeaturedProjects = ({ onSelectProject }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-white/40">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full soft-ui text-[#2D3748] text-xs font-bold uppercase tracking-widest font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#667EEA]" />
              <span>Showcase Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2D3748] font-outfit tracking-tight">
              FEATURED <span className="primary-text-gradient">PROJECTS</span>
            </h2>
            <p className="text-[#718096] text-sm sm:text-base max-w-xl mt-3 font-medium">
              Explore key software architectures, full-stack web platforms, and AI-powered systems crafted to solve complex real-world challenges.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl soft-ui soft-ui-hover text-[#2D3748] font-extrabold text-xs tracking-wider uppercase transition-all group shrink-0"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-4 h-4 text-[#667EEA] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card soft-ui rounded-3xl overflow-hidden flex flex-col justify-between group soft-ui-hover"
            >
              {/* Card Top: Image & Category */}
              <div>
                <div className="relative h-56 overflow-hidden soft-inset p-2 m-3 rounded-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-xl soft-ui text-[10px] font-black text-[#667EEA] font-outfit tracking-wider shadow-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Quick Preview Overlay Button */}
                  <div className="absolute inset-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-xl">
                    <button
                      onClick={() => onSelectProject && onSelectProject(project)}
                      className="px-5 py-3 rounded-2xl soft-ui text-[#2D3748] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform hover:text-[#667EEA]"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 py-2 space-y-3">
                  <h3 className="text-xl font-bold text-[#2D3748] font-outfit group-hover:text-[#667EEA] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs font-bold text-[#667EEA] italic line-clamp-2">
                    "{project.tagline}"
                  </p>

                  <p className="text-[#4A5568] text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 pt-3">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg soft-inset text-[10px] font-bold font-mono text-[#718096]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-3 py-1 rounded-lg soft-inset text-[10px] font-bold font-mono text-[#667EEA]">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer: Actions */}
              <div className="px-6 py-5 mt-4 flex items-center justify-between gap-3 border-t border-white/40">
                <button
                  onClick={() => onSelectProject && onSelectProject(project)}
                  className="text-xs font-bold uppercase tracking-wider text-[#4A5568] hover:text-[#667EEA] flex items-center gap-1.5 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl soft-ui soft-ui-hover text-[#718096] hover:text-[#2D3748] transition-all"
                      title="View Source Code"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl soft-ui soft-ui-hover text-[#718096] hover:text-[#667EEA] transition-all"
                      title="Live Demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProjects;

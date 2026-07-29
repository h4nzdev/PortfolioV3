import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { featuredProjects } from '../data/portfolioData';
import { ExternalLink, Layers, Briefcase, Clock, Users, CheckCircle2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GithubIcon as Github } from './SocialIcons';
import { Icon } from '@iconify/react';
import CardSwap, { Card } from './CardSwap';

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
  
  const map = {
    "Express": "logos:express",
    "PostgreSQL": "logos:postgresql",
    "Docker": "logos:docker-icon",
    "Python": "logos:python",
    "TensorFlow": "logos:tensorflow",
    "FastAPI": "logos:fastapi-icon",
    "AWS": "logos:aws",
    "LangChain": "logos:python", 
    "Java": "logos:java",
    "Spring Boot": "logos:spring-icon",
    "Kafka": "logos:kafka-icon",
    "MQTT": "devicon:mqtt",
    "Redis": "logos:redis",
    "Kubernetes": "logos:kubernetes",
  };
  return map[tech] || "logos:javascript";
};

const BentoCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const images = project.images || [project.image].filter(Boolean);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-16');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const isFullWidth = index === 0 || index === 5;
  const isTwoThirds = index === 1 || index === 4;
  const isOneThird = index === 2 || index === 3;

  let spanClass = "col-span-1 md:col-span-1 lg:col-span-1";
  if (isFullWidth) spanClass = "col-span-1 md:col-span-2 lg:col-span-3";
  else if (isTwoThirds) spanClass = "col-span-1 md:col-span-1 lg:col-span-2";

  const isRowLayout = isFullWidth;
  const isCompact = isOneThird;

  return (
    <div 
      ref={cardRef} 
      className={`opacity-0 translate-y-16 transition-all duration-700 ease-out cyber-panel p-5 lg:p-7 flex flex-col group ${spanClass} ${isRowLayout ? 'lg:flex-row gap-6 lg:gap-10' : 'gap-5'} rounded-2xl`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
        {/* Image Box */}
        <div className={`relative w-full rounded-xl overflow-hidden bg-[#020c1b] shrink-0 border border-[#004aad]/40 group/carousel ${isRowLayout ? 'lg:w-[45%] h-56 lg:h-auto min-h-[300px]' : (isCompact ? 'h-48' : 'h-64')}`}>
           {images.map((img, idx) => (
             <img 
               key={idx} 
               src={img} 
               onClick={() => navigate(`/project/${project.id}`)}
               className={`absolute inset-0 w-full h-full object-cover mix-blend-screen transition-all duration-700 ease-out cursor-pointer ${currentImage === idx ? 'group-hover:scale-110 opacity-70 group-hover:opacity-100 z-0' : 'opacity-0 z-[-1] scale-100'}`} 
               alt={`${project.title} screenshot ${idx + 1}`} 
             />
           ))}
           <div className="absolute inset-0 bg-[#004aad]/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10 pointer-events-none"></div>
           
           {images.length > 1 && (
             <>
               <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#0a192f]/80 text-[#64ffda] opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-[#004aad]/40 border border-[#004aad]/50 cursor-pointer">
                 <ChevronLeft className="w-4 h-4" />
               </button>
               <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#0a192f]/80 text-[#64ffda] opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20 hover:bg-[#004aad]/40 border border-[#004aad]/50 cursor-pointer">
                 <ChevronRight className="w-4 h-4" />
               </button>
               <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                 {images.map((_, idx) => (
                   <button 
                     key={idx} 
                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImage(idx); }}
                     className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentImage === idx ? 'bg-[#64ffda] w-4' : 'bg-[#e6f1ff]/40 hover:bg-[#e6f1ff]/80 w-1.5'}`}
                   />
                 ))}
               </div>
             </>
           )}

           <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-3 py-1.5 rounded-md bg-[#0a192f]/90 backdrop-blur-sm text-[#64ffda] text-[9px] font-bold font-mono tracking-widest uppercase border border-[#004aad]/50">
                 SYS.0{index + 1} // {project.category}
              </span>
           </div>
        </div>

        {/* Content Box */}
        <div className="flex flex-col flex-1 justify-center z-10">
            
            <div className="mb-4">
               <h3 
                 onClick={() => navigate(`/project/${project.id}`)}
                 className={`${isCompact ? 'text-2xl' : 'text-3xl'} font-black text-[#e6f1ff] font-outfit leading-tight mb-1.5 hover:text-[#64ffda] cursor-pointer transition-colors`}
               >
                 {project.title}
               </h3>
               <p className={`text-[#004aad] ${isCompact ? 'text-[11px]' : 'text-[12px]'} font-bold font-mono uppercase tracking-wider`}>
                 {">"} {project.tagline}
               </p>
            </div>

            <p className={`text-[#8892b0] ${isCompact ? 'text-[13px]' : 'text-[14px]'} leading-relaxed mb-5 ${isCompact ? 'line-clamp-3' : ''} font-mono`}>
               {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.slice(0, isCompact ? 3 : project.techStack.length).map((tech, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#020c1b]/50 rounded text-[10px] font-bold text-[#64ffda] border border-[#004aad]/30 font-mono">
                   <Icon icon={getTechIcon(tech)} className="w-3.5 h-3.5" />
                   <span>{tech}</span>
                </div>
              ))}
              {isCompact && project.techStack.length > 3 && (
                <div className="flex items-center px-2.5 py-1.5 bg-[#020c1b]/50 rounded text-[10px] font-bold text-[#64ffda] border border-[#004aad]/30 font-mono">
                   +{project.techStack.length - 3}
                </div>
              )}
            </div>

            {/* Details Grid */}
            <div className={`grid grid-cols-2 lg:flex lg:flex-wrap items-center gap-x-4 gap-y-3 py-3 border-y border-[#004aad]/20 font-mono ${isCompact ? 'mb-4 mt-2' : 'mb-6'}`}>
                 
                 <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#004aad]" />
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-[#8892b0] uppercase tracking-widest">Role</span>
                      <span className="text-[11px] font-bold text-[#e6f1ff]">{project.role || 'Dev'}</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#004aad]" />
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-[#8892b0] uppercase tracking-widest">Duration</span>
                      <span className="text-[11px] font-bold text-[#e6f1ff]">{project.duration || 'N/A'}</span>
                    </div>
                 </div>

                 <div className={`flex items-center gap-2 ${isCompact ? 'col-span-2' : ''}`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#64ffda]" />
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-[#8892b0] uppercase tracking-widest">Status</span>
                      <span className="text-[11px] font-bold text-[#e6f1ff]">{project.completed || 'TBD'}</span>
                    </div>
                 </div>

            </div>

            <div className={`mt-auto pt-2 flex items-center gap-3 ${isCompact ? 'flex-col sm:flex-row' : ''}`}>
               {project.githubUrl && (
                 <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`px-5 py-2.5 rounded-lg cyber-button flex items-center justify-center gap-2 font-bold font-mono text-xs ${isCompact ? 'w-full' : ''}`}>
                   <Github className="w-3.5 h-3.5" />
                   <span>SRC_CODE</span>
                 </a>
               )}
               {project.liveUrl && (
                 <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`px-5 py-2.5 rounded-lg cyber-button bg-[#004aad]/20 flex items-center justify-center gap-2 font-bold font-mono text-xs ${isCompact ? 'w-full' : ''}`}>
                   <ExternalLink className="w-3.5 h-3.5" />
                   <span>EXECUTE</span>
                 </a>
               )}
            </div>

        </div>
    </div>
  );
};

const Projects = () => {
  const navigate = useNavigate();
  const swapRef = useRef(null);

  return (
    <section id="projects" className="pt-28 pb-20 relative w-full px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">
        
        {/* Left Side: Text Content */}
        <div className="text-left space-y-6 z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#004aad]/20 border border-[#004aad]/50 text-[#64ffda] text-[10px] font-bold uppercase tracking-widest font-mono">
            <Layers className="w-3 h-3" />
            <span>[ SYSTEM ARCHIVES ]</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-[#e6f1ff] font-outfit tracking-tight leading-tight">
            DEPLOYED <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004aad] to-[#64ffda]">PROTOCOLS</span>
          </h2>
          <p className="text-[#8892b0] text-lg leading-relaxed max-w-md font-mono">
            Accessing classified software architectures, predictive AI models, and full-stack enterprise systems. Just look at them go!
          </p>
          
          <div className="pt-4 flex items-center gap-4">
            <button 
              onClick={() => swapRef.current?.swap()} 
              className="px-6 py-3 rounded-lg cyber-button flex items-center justify-center gap-2 font-bold font-mono text-xs w-max hover:scale-105 transition-transform"
            >
              NEXT PROTOCOL
            </button>
            <span className="text-[#8892b0] text-xs font-mono opacity-60">{"//"} OR CLICK THE CARDS</span>
          </div>
        </div>

        {/* Right Side: CardSwap Stack */}
        <div className="relative w-full h-[500px] lg:h-[600px] z-10 pointer-events-none">
          {/* pointer-events-none on container so we can click through the empty space, auto on the actual swap container */}
          <div className="absolute inset-0 pointer-events-auto">
            <CardSwap
              ref={swapRef}
              cardDistance={45}
              verticalDistance={45}
              delay={5000}
              pauseOnHover={true}
              width={850}
              height={480}
              onCardClick={(idx, isFront) => {
              if (isFront) {
                navigate(`/project/${featuredProjects[idx].id}`);
              } else {
                swapRef.current?.swap();
              }
            }}
            >
              {featuredProjects.map((project, index) => (
                <Card 
                  key={project.id} 
                  className="p-6 flex flex-row gap-8 rounded-2xl overflow-visible bg-[#0a192f] border border-[#004aad]/40 shadow-2xl cursor-pointer group"
                >
                  {/* Floating Top Tab */}
                  <div className="absolute -top-4 left-8 bg-[#0a192f] border border-[#004aad]/50 px-5 py-1.5 rounded-md flex items-center gap-2 shadow-lg z-50">
                    <span className="text-[#64ffda] text-[10px] font-bold font-mono tracking-widest uppercase">
                      SYS.0{index + 1} // {project.category}
                    </span>
                  </div>

                  {/* Left: Image Section */}
                  <div className="relative w-[45%] h-full rounded-xl overflow-hidden bg-white shrink-0 border border-[#004aad]/40 flex items-center justify-center p-4 lg:p-6">
                    <img 
                      src={project.images?.[0] || project.image} 
                      alt={project.title}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>

                  {/* Right: Content Section */}
                  <div className="flex flex-col flex-1 justify-center z-10 py-2 pr-2">
                    <h3 className="text-3xl lg:text-4xl font-black text-[#e6f1ff] font-outfit leading-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[#004aad] text-[11px] font-bold font-mono uppercase tracking-wider mb-4">
                      {">"} {project.tagline}
                    </p>
                    
                    <p className="text-[#8892b0] text-[13px] leading-relaxed mb-6 font-mono line-clamp-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.slice(0, 4).map((tech, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#020c1b]/50 rounded text-[10px] font-bold text-[#64ffda] border border-[#004aad]/30 font-mono">
                           <Icon icon={getTechIcon(tech)} className="w-3 h-3" />
                           <span>{tech}</span>
                        </div>
                      ))}
                      {project.techStack.length > 4 && (
                        <div className="flex items-center px-2.5 py-1.5 bg-[#020c1b]/50 rounded text-[10px] font-bold text-[#64ffda] border border-[#004aad]/30 font-mono">
                           +{project.techStack.length - 4}
                        </div>
                      )}
                    </div>

                    <div className="mt-auto">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/project/${project.id}`);
                        }} 
                        className="px-6 py-2.5 rounded-lg cyber-button flex items-center justify-center gap-2 font-bold font-mono text-xs w-max hover:scale-105 transition-transform"
                      >
                        VIEW ARCHIVE
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;

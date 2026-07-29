import { useEffect, useRef } from 'react';
import { technicalSkills } from '../data/portfolioData';
import { Icon } from '@iconify/react';
import { Layers } from 'lucide-react';
import gsap from 'gsap';

const SkillsMatrix = () => {
  const containerRef = useRef(null);
  
  // Flatten all skills to get a single array of icons
  const allSkills = technicalSkills.categories.flatMap(c => c.skills);
  
  // We duplicate the array to create a seamless scrolling loop
  const marqueeSkills = [...allSkills, ...allSkills];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-heading',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="pt-28 pb-20 relative w-full flex flex-col items-center justify-center">
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#004aad]/20 border border-[#004aad]/50 text-[#64ffda] text-[10px] font-bold uppercase tracking-widest font-mono mb-4">
          <Layers className="w-3 h-3" />
          <span>[ CAPABILITIES ]</span>
        </div>
        <h2 className="skills-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#e6f1ff] tracking-wide font-outfit">
          CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004aad] to-[#64ffda]">TECHNOLOGIES</span>
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center h-32 cyber-panel rounded-2xl border-y border-[#004aad]/40 py-4">
        
        {/* Fading Edges for seamless loop effect matching the cyber-panel bg */}
        <div className="absolute top-0 left-0 w-24 sm:w-48 h-full bg-gradient-to-r from-[#0a192f] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 sm:w-48 h-full bg-gradient-to-l from-[#0a192f] to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex w-max animate-marquee items-center">
          {marqueeSkills.map((skill, idx) => {
            return (
              <div
                key={idx}
                className="flex flex-col gap-2 flex-shrink-0 items-center justify-center w-28 sm:w-36 hover:scale-110 transition-transform duration-300 group"
              >
                <div className="p-3 bg-[#020c1b]/80 rounded-xl border border-[#004aad]/30 group-hover:border-[#64ffda] group-hover:shadow-[0_0_15px_rgba(100,255,218,0.4)] transition-all">
                  <Icon icon={skill.icon} className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="text-[10px] font-mono text-[#8892b0] group-hover:text-[#64ffda] opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default SkillsMatrix;

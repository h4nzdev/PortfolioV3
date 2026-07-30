import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { personalInfo } from '../data/portfolioData';
import gsap from 'gsap';
import backgroundImg from '../assets/background.png';
import personImg from '../assets/person_no_bg.png';

const Hero = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const imageRef = useRef(null);
  const bgTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background large text slide up
      gsap.fromTo(
        bgTextRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out' }
      );

      // Central portrait fade & slide
      gsap.fromTo(
        imageRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' }
      );

      // Left content
      gsap.fromTo(
        leftRef.current.children,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 0.6, ease: 'power2.out' }
      );

      // Right content (Stats card)
      gsap.fromTo(
        rightRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: 'power2.out' }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#020c1b]"
    >
      {/* Background Image with Dark Soft Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImg} 
          alt="Background" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-screen scale-110"
        />
        {/* Dark overlay base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020c1b]/60 via-[#020c1b]/80 to-[#020c1b] backdrop-blur-[2px]" />
      </div>

      {/* Massive Background Text (Bottom Center) */}
      <div className="absolute bottom-10 left-0 w-full text-center z-10 overflow-hidden pointer-events-none flex flex-col items-center justify-end h-full">
        <div ref={bgTextRef} className="relative z-10">
          <h2 
            className="text-[22vw] lg:text-[18rem] font-black uppercase font-outfit leading-none tracking-tighter bg-gradient-to-b from-white/10 via-[#004aad]/20 to-transparent bg-clip-text text-transparent drop-shadow-2xl"
          >
            {personalInfo.name.split(' ')[0]}
          </h2>
          <div className="flex items-center justify-center gap-4 lg:gap-8 mt-[-1rem] lg:mt-[-2.5rem]">
            <div className="w-12 lg:w-24 h-[2px] bg-[#004aad]/50"></div>
            <span className="text-xl lg:text-3xl font-black tracking-[0.8em] text-[#64ffda]/80 ml-[0.8em]">
              MAGBAL
            </span>
            <div className="w-12 lg:w-24 h-[2px] bg-[#004aad]/50"></div>
          </div>
        </div>
      </div>

      {/* Central Portrait Image */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 h-[80vh] lg:h-[88vh] w-full max-w-7xl flex items-end justify-center pointer-events-none">
        <img
          ref={imageRef}
          src={personImg}
          alt={personalInfo.name}
          className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_0_50px_rgba(0,74,173,0.3)]"
        />
      </div>

      {/* Foreground Content Layout */}
      <div className="relative z-30 w-full min-h-screen max-w-[110rem] mx-auto px-6 lg:px-12 pointer-events-none flex flex-col justify-center pt-[12vh] lg:pt-[22vh] pb-[10vh]">
        
        {/* Main Grid for Left/Right Alignment */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full h-auto mt-0 lg:-mt-10">
          
          {/* Left Column (Role, Bio, CTA) */}
          <div ref={leftRef} className="w-full lg:w-5/12 space-y-6 text-center lg:text-left pointer-events-auto flex flex-col items-center lg:items-start z-30 relative">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full cyber-panel text-[#64ffda]">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#64ffda] animate-pulse shadow-[0_0_8px_rgba(100,255,218,0.8)]" />
              <span className="text-xs font-bold uppercase tracking-widest font-mono">
                System Online
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black text-[#e6f1ff] leading-[1.05] font-outfit tracking-tight pb-4">
              IT Systems <br/>
              Architect based <br/>
              in <span className="text-[#004aad] relative inline-block">
                Cebu
                <span className="absolute bottom-1 left-0 w-full h-[4px] bg-[#004aad] rounded-full shadow-[0_0_10px_#004aad]"></span>
              </span>
            </h1>
            
            {/* Bio Paragraph */}
            <p className="text-sm md:text-base text-[#8892b0] font-medium leading-relaxed max-w-[450px] pt-2 font-mono">
              {">"} INITIALIZING PORTFOLIO...<br/>
              {">"} Hi, I'm {personalInfo.name.split(' ')[0]} – a 4th Year BSIT Student passionate about creating seamless digital experiences that connect and convert.
            </p>

            {/* Location / Institution */}
            <div className="flex items-center gap-2.5 text-[#64ffda] font-bold text-sm pt-1 font-mono">
              <Icon icon="lucide:terminal" className="w-5 h-5 flex-shrink-0" />
              <span>{personalInfo.institution}</span>
            </div>

            {/* CTA Buttons & Mobile Socials */}
            <div className="pt-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full relative z-30">
              <a
                href={personalInfo.socials.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#004aad]/50 bg-[#004aad]/10 text-sm font-bold font-mono uppercase tracking-wider text-[#64ffda] hover:bg-[#004aad]/30 transition-all group shadow-[0_0_15px_rgba(0,74,173,0.3)] hover:shadow-[0_0_25px_rgba(100,255,218,0.2)]"
              >
                <Icon icon="lucide:eye" className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span>View Resume</span>
              </a>

              {/* Inline Socials for Mobile Only */}
              <div className="flex lg:hidden cyber-panel rounded-full p-2 items-center gap-3">
                <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#0a192f] border border-[#004aad]/50 flex items-center justify-center text-[#64ffda] hover:bg-[#004aad]/20 transition-all shadow-sm">
                  <Icon icon="mdi:linkedin" className="w-5 h-5" />
                </a>
                <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#0a192f] border border-[#004aad]/50 flex items-center justify-center text-[#64ffda] hover:bg-[#004aad]/20 transition-all shadow-sm">
                  <Icon icon="mdi:github" className="w-5 h-5" />
                </a>
                <a href={personalInfo.socials.email} className="w-10 h-10 rounded-full bg-[#0a192f] border border-[#004aad]/50 flex items-center justify-center text-[#64ffda] hover:bg-[#004aad]/20 transition-all shadow-sm">
                  <Icon icon="lucide:mail" className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column (Stats Card) */}
          <div ref={rightRef} className="hidden lg:flex w-full lg:w-4/12 justify-end pointer-events-auto z-30 relative mt-12 lg:mt-0">
            
            <div className="cyber-panel rounded-3xl p-7 w-full max-w-[420px] space-y-7">
              
              {/* Stat 1 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-[#004aad]/20 rounded-xl text-[#64ffda] border border-[#004aad]/30">
                    <Icon icon="lucide:calendar" className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-[#8892b0] font-mono">Years Exp</span>
                </div>
                <span className="text-xl font-black text-[#e6f1ff] font-outfit text-shadow-glow">2+</span>
              </div>
              
              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#004aad]/50 to-transparent"></div>
              
              {/* Stat 2 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-[#004aad]/20 rounded-xl text-[#64ffda] border border-[#004aad]/30">
                    <Icon icon="lucide:code-2" className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-[#8892b0] font-mono">Projects</span>
                </div>
                <span className="text-xl font-black text-[#e6f1ff] font-outfit text-shadow-glow">15+</span>
              </div>
              
              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#004aad]/50 to-transparent"></div>
              
              {/* Stat 3 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-[#004aad]/20 rounded-xl text-[#64ffda] border border-[#004aad]/30">
                    <Icon icon="lucide:layers" className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-[#8892b0] font-mono">Clients</span>
                </div>
                <span className="text-xl font-black text-[#e6f1ff] font-outfit text-shadow-glow">10+</span>
              </div>

            </div>
          </div>

        </div>

        {/* Absolute Bottom Elements (Socials) - Hidden on mobile as they are inline */}
        <div className="absolute bottom-10 left-6 right-6 lg:left-12 lg:right-12 hidden lg:flex items-end justify-between pointer-events-none z-30">
          
          {/* Socials Pill */}
          <div className="pointer-events-auto cyber-panel rounded-full p-2 flex items-center gap-3">
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#0a192f] border border-[#004aad]/50 flex items-center justify-center text-[#64ffda] hover:bg-[#004aad]/20 hover:scale-110 transition-all shadow-sm">
              <Icon icon="mdi:linkedin" className="w-5 h-5" />
            </a>
            <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#0a192f] border border-[#004aad]/50 flex items-center justify-center text-[#64ffda] hover:bg-[#004aad]/20 hover:scale-110 transition-all shadow-sm">
              <Icon icon="mdi:github" className="w-5 h-5" />
            </a>
            <a href={personalInfo.socials.email} className="w-10 h-10 rounded-full bg-[#0a192f] border border-[#004aad]/50 flex items-center justify-center text-[#64ffda] hover:bg-[#004aad]/20 hover:scale-110 transition-all shadow-sm">
              <Icon icon="lucide:mail" className="w-5 h-5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;

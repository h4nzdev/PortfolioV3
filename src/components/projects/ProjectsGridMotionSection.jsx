import { useMemo } from 'react';
import { featuredProjects } from '../../data/portfolioData';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { sound } from '../../utils/sound';
import GridMotion from './GridMotion';

export default function ProjectsGridMotionSection({ onOpenProjectModal }) {
  // Construct rich items for GridMotion: real project screenshots + interactive system cards
  const gridItems = useMemo(() => {
    const items = [];

    featuredProjects.forEach((proj) => {
      // 1. Add interactive screenshots
      if (proj.images && proj.images.length > 0) {
        proj.images.slice(0, 3).forEach((imgSrc, idx) => {
          items.push({
            src: imgSrc,
            alt: `${proj.title} Preview ${idx + 1}`,
            onClick: () => {
              sound.playClick();
              if (onOpenProjectModal) onOpenProjectModal(proj.id);
            },
          });
        });
      } else if (proj.image) {
        items.push({
          src: proj.image,
          alt: proj.title,
          onClick: () => {
            sound.playClick();
            if (onOpenProjectModal) onOpenProjectModal(proj.id);
          },
        });
      }

      // 2. Add an interactive typographic system tile
      items.push(
        <div
          key={`tile-${proj.id}`}
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            if (onOpenProjectModal) onOpenProjectModal(proj.id);
          }}
          className="w-full h-full p-4 sm:p-5 flex flex-col justify-between bg-white hover:bg-[#E5DCCB]/40 transition-colors text-left cursor-pointer border border-[#C8B99A]/40 rounded-xl select-none group"
        >
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-[#E5DCCB]/60 text-[#171715] border border-[#C8B99A]/30">
              {proj.category.split('&')[0].trim()}
            </span>
            <div className="w-6 h-6 rounded-full bg-[#F8F7F2] flex items-center justify-center text-[#171715] group-hover:bg-[#171715] group-hover:text-white transition-colors">
              <ArrowUpRight size={12} />
            </div>
          </div>

          <div>
            <span className="block font-['Space_Grotesk'] font-bold text-xs sm:text-sm text-[#171715] leading-snug group-hover:text-[#292824]">
              {proj.title.split('–')[0].trim()}
            </span>
            <span className="text-[10px] font-mono text-[#85847E] mt-0.5 block truncate">
              {proj.role} • {proj.completed}
            </span>
          </div>
        </div>
      );
    });

    return items;
  }, [onOpenProjectModal]);

  return (
    <section
      id="projects"
      className="relative w-full py-24 sm:py-32 bg-[#F8F7F2] text-[#171715] border-t border-[#C8B99A]/40 overflow-hidden selection:bg-[#C8B99A] selection:text-[#171715]"
    >
      {/* Giant Faint "SYSTEMS" Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <span className="text-[5rem] sm:text-[9rem] md:text-[12rem] lg:text-[14rem] font-bold font-['Space_Grotesk'] text-[#171715]/[0.035] tracking-[0.2em] uppercase leading-none whitespace-nowrap block">
          SYSTEMS
        </span>
      </div>

      <div className="relative z-10 w-full space-y-10 sm:space-y-12">
        
        {/* Editorial Header Block (Centered inside max-w-7xl) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8B99A]/30 pb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50">
                <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
                <span className="text-xs font-mono font-medium text-[#292824] uppercase tracking-wider">
                  03 // Interactive Systems Wall
                </span>
              </div>

              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-['Cormorant_Garamond'] italic font-normal text-3xl sm:text-4xl text-[#85847E]">
                  the
                </span>
                <h2 className="font-['Playfair_Display'] text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#171715] leading-none">
                  WORK
                </h2>
                <span className="px-3 py-1 rounded-full border border-[#C8B99A]/50 text-xs sm:text-sm font-['Cormorant_Garamond'] italic text-[#292824] bg-white/80 shadow-xs">
                  (I stand)
                </span>
                <h2 className="font-['Playfair_Display'] text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#171715] leading-none">
                  BEHIND
                </h2>
              </div>

              <p className="text-xs sm:text-sm font-mono text-[#66635B] max-w-xl">
                An expansive full-width motion canvas showcasing production ERPs, AI co-pilots, IoT systems, and healthcare platforms. Move your pointer to spotlight, click any tile to view full details.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#85847E] self-start md:self-end">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#C8B99A]/50 text-[#171715] font-semibold shadow-xs">
                <Sparkles size={12} className="text-[#C8B99A]" />
                <span>Full-Width Parallax & Spotlight</span>
              </span>
            </div>
          </div>
        </div>

        {/* FULL-WIDTH EDGE-TO-EDGE <GridMotion /> Canvas Wall */}
        <div className="relative w-full border-y border-[#C8B99A]/40 bg-white shadow-md overflow-hidden">
          
          {/* Top Status Strip */}
          <div className="absolute top-4 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-center justify-between pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C8B99A]/50 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171715]">
                Live Full-Width Motion Wall
              </span>
            </div>

            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-mono text-[#F8F7F2] shadow-xs">
              Hover to Spotlight • Click Tile to Inspect
            </span>
          </div>

          {/* GridMotion Viewport (Edge-to-Edge 100% Width) */}
          <div className="relative w-full h-[580px] sm:h-[660px] lg:h-[740px]">
            <GridMotion
              items={gridItems}
              rows={4}
              aspectRatio={1.33}
              gap={16}
              radius={14}
              angle={-12}
              tilt={0}
              speed={24}
              direction="alternate"
              parallax={0.5}
              spotlight={0.6}
              dim={0.28}
              fade={0.35}
              grayscale={false}
              theme="light"
              tileColor="#FFFFFF"
              textColor="#171715"
            />
          </div>

          {/* Bottom Guidance Strip (Full Width) */}
          <div className="px-6 sm:px-12 py-3 bg-[#FAF9F5] border-t border-[#C8B99A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#85847E]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
              <span>React Bits GridMotion • Full Viewport Edge-to-Edge</span>
            </div>
            <div className="flex items-center gap-4 text-[#171715]">
              <span>6 Production Systems</span>
              <span>•</span>
              <span>100% Real Assets</span>
            </div>
          </div>

        </div>

        {/* Project Quick-Inspection Drawer Bar (Centered inside max-w-7xl) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#85847E]">
            <span className="uppercase tracking-wider font-semibold text-[#171715]">
              Direct Project Inspection:
            </span>
            <span>Click any system below to launch case study modal</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredProjects.map((p, idx) => {
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    sound.playClick();
                    if (onOpenProjectModal) onOpenProjectModal(p.id);
                  }}
                  className="group px-4 py-3 rounded-2xl bg-white hover:bg-[#171715] hover:text-[#F8F7F2] border border-[#C8B99A]/50 hover:border-[#171715] shadow-xs transition-all duration-300 text-left flex flex-col justify-between cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#85847E] group-hover:text-[#C8B99A]">
                    <span>0{idx + 1}</span>
                    <ArrowUpRight size={13} className="text-[#171715] group-hover:text-white transition-colors" />
                  </div>
                  <div className="pt-2">
                    <span className="block font-['Space_Grotesk'] font-bold text-xs sm:text-sm text-[#171715] group-hover:text-[#F8F7F2] truncate">
                      {p.title.split('–')[0].trim()}
                    </span>
                    <span className="text-[10px] font-mono text-[#85847E] group-hover:text-[#C8B99A]/80 truncate block">
                      {p.category.split('&')[0].trim()}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

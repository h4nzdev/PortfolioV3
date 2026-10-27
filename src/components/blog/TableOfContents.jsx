import { useState, useEffect } from 'react';
import { ListFilter } from 'lucide-react';
import { sound } from '../../utils/sound';

export default function TableOfContents({ toc = [] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!toc.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToSection = (id) => {
    sound.playClick();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90; // offset for fixed header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!toc.length) return null;

  return (
    <nav className="p-5 rounded-2xl bg-white/70 border border-[#C8B99A]/40 backdrop-blur-md shadow-xs">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#C8B99A]/30 text-xs font-mono font-bold tracking-wider uppercase text-[#171715]">
        <ListFilter size={14} className="text-[#85847E]" />
        <span>Outline / Table of Contents</span>
      </div>

      <ul className="space-y-2 text-xs sm:text-sm font-sans">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`text-left transition-all block w-full py-1 cursor-pointer leading-snug rounded-sm ${
                  isActive
                    ? 'text-[#171715] font-semibold pl-2 border-l-2 border-[#171715]'
                    : 'text-[#66635B] hover:text-[#171715] hover:pl-1'
                }`}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

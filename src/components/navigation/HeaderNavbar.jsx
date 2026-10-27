import { useState, useEffect } from 'react';
import { Volume2, VolumeX, FileText, Send, Menu, X, ArrowUpRight } from 'lucide-react';
import { sound } from '../../utils/sound';
import resumePdf from '../../assets/resume/Hanz_Resume.pdf';

const NAV_ITEMS = [
  { id: 'hero', number: '01', label: 'Overview' },
  { id: 'about', number: '02', label: 'About & Stack' },
  { id: 'projects', number: '03', label: 'Work' },
  { id: 'education', number: '04', label: 'Education' },
  { id: 'achievements', number: '05', label: 'Awards' },
  { id: 'contact-3d', number: '06', label: 'Studio' },
  { id: 'contact', number: '07', label: 'Contact' },
];

export default function HeaderNavbar({ activeSection, onNavigate }) {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleNavClick = (sectionId) => {
    sound.playClick();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-none px-4 sm:px-6 lg:px-8 py-3.5 ${
        scrolled ? 'py-2.5' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Monogram */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => handleNavClick('hero')}
            className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white border border-[#C8B99A]/50 backdrop-blur-md shadow-xs transition-all text-left cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#171715] animate-pulse" />
            <span className="text-sm font-bold tracking-tight text-[#171715] font-['Space_Grotesk']">
              h4nz<span className="text-[#C8B99A]">.dev</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#85847E] pl-1 border-l border-[#C8B99A]/50">
              Hanz Magbal
            </span>
          </button>
        </div>

        {/* Center Desktop Navigation Pill */}
        <nav className="pointer-events-auto hidden lg:flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-white/85 border border-[#C8B99A]/50 backdrop-blur-md shadow-xs">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#171715] text-[#F8F7F2] font-semibold shadow-xs'
                    : 'text-[#66635B] hover:text-[#171715] hover:bg-[#E5DCCB]/40'
                }`}
              >
                <span className={isActive ? 'text-[#C8B99A]' : 'text-[#85847E]'}>{item.number}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Actions */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-full bg-white/85 border border-[#C8B99A]/50 text-[#292824] hover:bg-[#E5DCCB]/40 transition-all backdrop-blur-md shadow-xs cursor-pointer"
            title={isMuted ? 'Enable tactile sound effects' : 'Mute sound effects'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#171715]" />}
          </button>

          {/* Resume PDF */}
          <a
            href={resumePdf}
            download="Hanz_Resume.pdf"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 border border-[#C8B99A]/50 text-xs font-mono font-medium text-[#292824] hover:bg-[#E5DCCB]/40 transition-all backdrop-blur-md shadow-xs"
            title="Download Hanz's Resume PDF"
          >
            <FileText size={13} />
            <span>CV</span>
          </a>

          {/* Quick Contact CTA */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#171715] text-[#F8F7F2] text-xs font-mono font-medium hover:bg-[#292824] transition-all shadow-xs cursor-pointer"
          >
            <Send size={12} />
            <span>Let's Build</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-full bg-white/85 border border-[#C8B99A]/50 text-[#171715] hover:bg-[#E5DCCB]/40 transition-all backdrop-blur-md cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden mt-2 mx-auto max-w-md bg-[#F8F7F2] rounded-2xl border border-[#C8B99A]/60 shadow-xl p-4 backdrop-blur-xl animate-fadeIn">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#85847E] mb-2 px-2">
            Navigation Index
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-xl text-left text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#171715] text-[#F8F7F2] font-semibold'
                    : 'bg-white/60 hover:bg-[#E5DCCB]/60 text-[#292824]'
                }`}
              >
                <span>
                  <span className="text-[#85847E] mr-1.5">{item.number}</span>
                  {item.label}
                </span>
                <ArrowUpRight size={12} className="opacity-50" />
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-[#C8B99A]/40 flex items-center justify-between px-1">
            <a
              href={resumePdf}
              download="Hanz_Resume.pdf"
              className="text-xs font-mono text-[#292824] hover:underline flex items-center gap-1"
            >
              <FileText size={13} />
              <span>Download CV</span>
            </a>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-3 py-1.5 rounded-full bg-[#171715] text-[#F8F7F2] text-xs font-mono cursor-pointer"
            >
              Contact Me
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

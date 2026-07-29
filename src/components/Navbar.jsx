import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download, ChevronRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import logoImg from '../assets/logo.png';

const navItems = [
  { name: 'HOME', id: 'home' },
  { name: 'ABOUT', id: 'about' },
  { name: 'PROJECTS', id: 'projects' },
  { name: 'SKILLS', id: 'skills' },
  { name: 'EDUCATION', id: 'education' },
  { name: 'CONTACT', id: 'contact' }
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const expandScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 20;
      setIsScrolled(scrolled);
      
      if (!scrolled) {
        setIsExpanded(false);
      } else {
        setIsExpanded((prev) => {
          if (prev && Math.abs(currentScrollY - expandScrollY.current) > 50) {
            return false;
          }
          return prev;
        });
      }

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveTab(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id, e) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none mt-4 md:mt-6 px-4">
      <div 
        className={`pointer-events-auto flex items-center justify-between w-full bg-[#0a192f]/90 backdrop-blur-xl border border-[#004aad]/40 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden
          ${isScrolled && !isExpanded 
            ? 'max-w-[220px] px-4 py-2 cursor-pointer' 
            : 'max-w-[95vw] lg:max-w-5xl px-6 py-2.5'
          }`}
        onClick={() => {
          if (isScrolled && !isExpanded) {
            setIsExpanded(true);
            expandScrollY.current = window.scrollY;
          }
        }}
      >
        
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            if (location.pathname !== '/') {
              e.preventDefault();
              navigate('/');
              return;
            }
            if (isScrolled && !isExpanded) {
              e.preventDefault(); // parent div handles expansion
            } else {
              handleNavClick('home', e);
            }
          }}
          className="flex items-center gap-3 group focus:outline-none transition-colors shrink-0"
        >
          <div className="w-8 h-8 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
            <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-outfit font-extrabold text-base tracking-tight text-[#e6f1ff] group-hover:text-[#64ffda] transition-colors">
              {personalInfo.shortName}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#64ffda] -mt-1">
              IT Architect
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links & CTA */}
        <div className={`hidden md:flex items-center overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled && !isExpanded ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-5xl opacity-100'
        }`}>
          <nav className="flex items-center gap-1.5 px-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`px-4 py-2 rounded-lg text-xs font-bold font-mono tracking-wider transition-all relative whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-[#004aad] text-white shadow-lg shadow-[#004aad]/30'
                    : 'text-[#8892b0] hover:text-[#64ffda] hover:bg-[#004aad]/10'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center ml-2 border-l border-[#004aad]/30 pl-4">
            <a
              href={personalInfo.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#004aad]/50 text-xs font-bold font-mono uppercase tracking-wider text-[#64ffda] transition-all group whitespace-nowrap hover:bg-[#004aad]/20"
            >
              <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>RESUME</span>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className={`md:hidden flex-shrink-0 transition-all duration-500 overflow-hidden ${
          isScrolled && !isExpanded ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[100px] opacity-100 ml-auto'
        }`}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl cyber-button text-[#64ffda] focus:outline-none flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="absolute top-[110%] left-4 right-4 md:hidden cyber-panel px-4 pt-4 pb-6 space-y-3 rounded-2xl animate-fadeIn border border-[#004aad]/40 pointer-events-auto bg-[#0a192f]/95 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold font-mono tracking-wider transition-all text-left ${
                  activeTab === item.id
                    ? 'bg-[#004aad] text-white'
                    : 'text-[#8892b0] hover:text-[#64ffda] hover:bg-[#004aad]/10'
                }`}
              >
                <span>{item.name}</span>
                <ChevronRight className={`w-4 h-4 ${activeTab === item.id ? 'text-white' : 'text-[#004aad]'}`} />
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#004aad]/20">
            <a
              href={personalInfo.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#004aad]/50 hover:bg-[#004aad]/20 text-xs font-bold font-mono text-[#64ffda] uppercase tracking-wider group transition-all"
            >
              <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>DOWNLOAD RESUME</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

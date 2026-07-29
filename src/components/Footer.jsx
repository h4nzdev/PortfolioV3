import { Mail, Phone, MapPin, ArrowUp, Heart } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';
import logoImg from '../assets/logo.png';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills Matrix', id: 'skills' },
    { name: 'Education', id: 'education' },
    { name: 'About Architect', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <footer className="pt-16 pb-12 relative border-t border-white/40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-5 lg:col-span-1">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3 group text-left focus:outline-none soft-ui px-4 py-2 rounded-2xl soft-ui-hover"
            >
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-outfit font-extrabold text-lg text-[#2D3748] group-hover:text-[#667EEA] transition-colors">
                {personalInfo.shortName}
              </span>
            </button>
            
            <p className="text-[#4A5568] text-xs sm:text-sm leading-relaxed font-medium pl-2">
              4th Year BSIT Student at USPF. Designing scalable systems, predictive AI models, and intuitive web experiences.
            </p>

            <div className="flex items-center gap-3 pt-2 pl-2">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-xl soft-ui soft-ui-hover text-[#718096] hover:text-[#4A5568] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-xl soft-ui soft-ui-hover text-[#718096] hover:text-[#4C51BF] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.email}
                aria-label="Email"
                className="p-3 rounded-xl soft-ui soft-ui-hover text-[#718096] hover:text-[#E53E3E] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-5 lg:pl-10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#A0AABF] font-bold">
              Quick Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                     onClick={() => scrollToSection(link.id)}
                    className="text-[#718096] hover:text-[#667EEA] font-bold text-xs sm:text-sm transition-colors hover:translate-x-1 inline-block transform duration-150 text-left focus:outline-none"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-5 lg:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#A0AABF] font-bold">
              Connect Directly
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#4A5568] font-bold">
              <div className="flex items-center gap-3 p-4 rounded-2xl soft-ui">
                <Mail className="w-4 h-4 text-[#667EEA] shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl soft-ui">
                <Phone className="w-4 h-4 text-[#4C51BF] shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl soft-ui sm:col-span-2">
                <MapPin className="w-4 h-4 text-[#38A169] shrink-0" />
                <span>{personalInfo.location} • {personalInfo.institution}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/40 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-[#A0AABF] font-bold">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>Designed & Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" />
            <span>in Cebu City</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl soft-ui soft-ui-hover text-[#718096] hover:text-[#667EEA] transition-all font-mono text-[11px] uppercase tracking-wider group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

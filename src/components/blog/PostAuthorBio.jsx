import { ExternalLink } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../SocialIcons';
import meImage from '../../assets/me.png';
import { personalInfo } from '../../data/portfolioData';

export default function PostAuthorBio() {
  return (
    <div className="p-6 rounded-2xl bg-white/80 border border-[#C8B99A]/40 backdrop-blur-md shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-4">
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#C8B99A]/60 bg-[#EFECE6] shadow-inner">
          <img
            src={meImage}
            alt={personalInfo.shortName}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
          <h4 className="text-base font-bold font-['Space_Grotesk'] text-[#171715]">
            {personalInfo.shortName}
          </h4>
          <span className="text-xs font-mono text-[#85847E]">
            {personalInfo.role}
          </span>
        </div>

        <p className="text-xs text-[#525049] leading-relaxed mb-3">
          Software engineering student at {personalInfo.institution}. Focused on scalable distributed architectures, biometric integrations, and production-grade web systems.
        </p>

        {/* Links */}
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-[#171715] text-[#F8F7F2] hover:bg-[#33322E] transition-all"
          >
            <Github className="w-3 h-3" />
            <span>@h4nzdev</span>
          </a>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-white border border-[#C8B99A]/50 text-[#171715] hover:bg-[#F2ECE1] transition-all"
          >
            <Linkedin className="w-3 h-3" />
            <span>Connect</span>
            <ExternalLink size={10} className="text-[#85847E]" />
          </a>
        </div>
      </div>
    </div>
  );
}

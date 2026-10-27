import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, ArrowUp, FileText } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../SocialIcons';
import { personalInfo } from '../../data/portfolioData';
import { sound } from '../../utils/sound';
import resumePdf from '../../assets/resume/Hanz_Resume.pdf';

export default function ContactFormAndFooter2D() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    sound.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative w-full pt-28 pb-16 bg-[#F8F7F2] border-t border-[#C8B99A]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Contact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C8B99A]/40 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DCCB]/60 border border-[#C8B99A]/50 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#171715]" />
              <span className="text-xs font-mono font-medium text-[#292824] uppercase tracking-wider">
                08 // Communication Protocol
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#171715] font-['Space_Grotesk']">
              Initiate Direct Collaboration
            </h2>
          </div>

          <p className="text-sm font-mono text-[#85847E] max-w-md">
            Conventional contact portal. Messages route directly to Hanz Magbal for project inquiries and engineering roles.
          </p>
        </div>

        {/* Contact Grid: Form + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info Cards & Verified Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className="editorial-card p-6 rounded-2xl flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#E5DCCB] text-[#171715] group-hover:bg-[#171715] group-hover:text-[#F8F7F2] transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#85847E]">
                    Direct Email
                  </div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm font-bold font-['Space_Grotesk'] text-[#171715] hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  navigator.clipboard.writeText(personalInfo.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-2 rounded-lg hover:bg-[#E5DCCB] text-[#85847E] hover:text-[#171715] transition-colors"
                title="Copy Email"
                aria-label="Copy Email"
              >
                {copied ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="editorial-card p-6 rounded-2xl flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#E5DCCB] text-[#171715] group-hover:bg-[#171715] group-hover:text-[#F8F7F2] transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#85847E]">
                    Phone / Mobile
                  </div>
                  <div className="text-sm font-bold font-['Space_Grotesk'] text-[#171715]">
                    {personalInfo.phone}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  navigator.clipboard.writeText(personalInfo.phone);
                }}
                className="p-2 rounded-lg hover:bg-[#E5DCCB] text-[#85847E] hover:text-[#171715] transition-colors"
                title="Copy Phone"
                aria-label="Copy Phone"
              >
                <Copy size={16} />
              </button>
            </div>

            {/* Location Card */}
            <div className="editorial-card p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#E5DCCB] text-[#171715]">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#85847E]">
                  Base Location
                </div>
                <div className="text-sm font-bold font-['Space_Grotesk'] text-[#171715]">
                  {personalInfo.location}
                </div>
              </div>
            </div>

            {/* Social Links Bar */}
            <div className="p-4 rounded-2xl bg-white/70 border border-[#C8B99A]/50 flex items-center justify-between">
              <span className="text-xs font-mono text-[#85847E] uppercase">
                Verified Socials
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#F8F7F2] border border-[#C8B99A]/40 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#F8F7F2] border border-[#C8B99A]/40 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-[#F8F7F2] border border-[#C8B99A]/40 text-[#171715] hover:bg-[#171715] hover:text-[#F8F7F2] transition-colors"
                  title="View Resume (PDF)"
                >
                  <FileText className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#C8B99A]/60 shadow-lg space-y-6">
            <div>
              <h3 className="text-2xl font-bold font-['Space_Grotesk'] text-[#171715]">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-[#66635B] mt-1">
                Fill out the form below to begin a project discussion or inquire about software roles.
              </p>
            </div>

            {isSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                <span>
                  Thank you! Your message has been prepared. Hanz will reply shortly.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#85847E] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Elena Vance"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border border-[#C8B99A]/60 text-sm text-[#171715] placeholder-[#85847E]/60 focus:outline-none focus:border-[#171715] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#85847E] mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="elena@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border border-[#C8B99A]/60 text-sm text-[#171715] placeholder-[#85847E]/60 focus:outline-none focus:border-[#171715] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#85847E] mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full-Stack Engineering Role / Platform Architecture"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border border-[#C8B99A]/60 text-sm text-[#171715] placeholder-[#85847E]/60 focus:outline-none focus:border-[#171715] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#85847E] mb-1.5">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or engineering inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border border-[#C8B99A]/60 text-sm text-[#171715] placeholder-[#85847E]/60 focus:outline-none focus:border-[#171715] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full editorial-btn py-3.5 rounded-full text-xs font-mono font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Send size={13} />
                <span>{isSubmitting ? 'Transmitting Message...' : 'Transmit Message'}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Conventional Footer Bar */}
        <div className="pt-16 border-t border-[#C8B99A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-base font-bold font-['Space_Grotesk'] text-[#171715]">
              h4nz<span className="text-[#C8B99A]">.dev</span>
              <span className="text-xs font-normal text-[#85847E] ml-2">
                — Hanz Christian Angelo G. Magbal
              </span>
            </div>
            <p className="text-xs text-[#85847E]">
              Designed with architectural minimalism, standard scrolling, and interactive 3D storytelling.
            </p>
          </div>

          {/* Quick Jump Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#66635B]">
            <button onClick={() => scrollToSection('hero')} className="hover:text-[#171715] transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#171715] transition-colors cursor-pointer">
              About
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-[#171715] transition-colors cursor-pointer">
              Selected Work
            </button>
            <button onClick={() => scrollToSection('education')} className="hover:text-[#171715] transition-colors cursor-pointer">
              Education
            </button>
            <button onClick={() => scrollToSection('achievements')} className="hover:text-[#171715] transition-colors cursor-pointer">
              Awards
            </button>
            <button onClick={() => scrollToSection('contact-3d')} className="hover:text-[#171715] transition-colors cursor-pointer">
              Studio
            </button>
            <button onClick={scrollToTop} className="p-2 rounded-full bg-white border border-[#C8B99A]/50 text-[#171715] hover:bg-[#171715] hover:text-white transition-colors cursor-pointer" title="Back to top">
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="text-center text-[11px] font-mono text-[#85847E] pt-2">
          © {new Date().getFullYear()} Hanz Christian Angelo G. Magbal. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

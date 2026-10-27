import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy, FileText, Loader2, AlertCircle, ArrowUpRight, RotateCcw } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../SocialIcons';
import { personalInfo } from '../../data/portfolioData';
import { sound } from '../../utils/sound';
import { sendContactMessage } from '../../utils/contactService';
import resumePdf from '../../assets/resume/Hanz_Resume.pdf';

export default function ContactFormAndFooter2D() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botcheck: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fallbackMailto, setFallbackMailto] = useState(null);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sound.playClick();
    setIsSubmitting(true);
    setSubmitError(null);
    setFallbackMailto(null);

    const result = await sendContactMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      botcheck: formData.botcheck,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', botcheck: '' });
    } else {
      setSubmitError(result.error);
      if (result.fallbackMailto) {
        setFallbackMailto(result.fallbackMailto);
      }
    }
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

            {isSubmitted ? (
              <div className="py-10 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300 shadow-sm">
                  <CheckCircle2 size={30} />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-2xl font-bold font-['Space_Grotesk'] text-[#171715]">
                    Message Transmitted
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C5952] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Your inquiry has been routed to Hanz Magbal (<span className="font-mono text-[#171715] font-semibold">{personalInfo.email}</span>). A direct reply will be sent to your email shortly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIsSubmitted(false);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold bg-[#171715] text-[#F8F7F2] hover:bg-[#33322E] transition-all cursor-pointer shadow-xs mt-2"
                >
                  <RotateCcw size={13} />
                  <span>Send Another Inquiry</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for spam prevention */}
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={Boolean(formData.botcheck)}
                  onChange={(e) => setFormData((prev) => ({ ...prev, botcheck: e.target.checked }))}
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {submitError && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm space-y-3 animate-fadeIn">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold font-['Space_Grotesk'] text-[#171715]">
                          Notice: {submitError}
                        </div>
                        <p className="text-xs text-[#525049] mt-0.5">
                          You can immediately transmit this message via your default email application or copy your message draft below.
                        </p>
                      </div>
                    </div>

                    {fallbackMailto && (
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-200">
                        <a
                          href={fallbackMailto}
                          onClick={() => sound.playClick()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171715] text-[#F8F7F2] text-xs font-mono font-semibold hover:bg-[#33322E] transition-all"
                        >
                          <Mail size={12} />
                          <span>Launch Mail Client</span>
                          <ArrowUpRight size={12} />
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            navigator.clipboard.writeText(
                              `Subject: ${formData.subject}\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
                            );
                            setCopiedDraft(true);
                            setTimeout(() => setCopiedDraft(false), 2000);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-300 text-amber-950 text-xs font-mono font-semibold hover:bg-amber-100 transition-all cursor-pointer"
                        >
                          {copiedDraft ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Copy size={12} />}
                          <span>{copiedDraft ? 'Draft Copied!' : 'Copy Draft'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#85847E] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Elena Vance"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border border-[#C8B99A]/60 text-sm text-[#171715] placeholder-[#85847E]/60 focus:outline-hidden focus:border-[#171715] transition-colors disabled:opacity-60"
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
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="elena@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border border-[#C8B99A]/60 text-sm text-[#171715] placeholder-[#85847E]/60 focus:outline-hidden focus:border-[#171715] transition-colors disabled:opacity-60"
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
                    disabled={isSubmitting}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full-Stack Engineering Role / Platform Architecture"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border border-[#C8B99A]/60 text-sm text-[#171715] placeholder-[#85847E]/60 focus:outline-hidden focus:border-[#171715] transition-colors disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#85847E] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    disabled={isSubmitting}
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline, or engineering inquiry..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border border-[#C8B99A]/60 text-sm text-[#171715] placeholder-[#85847E]/60 focus:outline-hidden focus:border-[#171715] transition-colors resize-none disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full editorial-btn py-3.5 rounded-full text-xs font-mono font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
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

          {/* Brand Logo Monogram */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-3 p-1.5 rounded-2xl hover:bg-white/70 transition-all cursor-pointer"
            title="Return to top"
            aria-label="Return to top"
          >
            <img
              src="/logo.png"
              alt="Hanz Crest Monogram"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
            />
          </button>
        </div>

        {/* Copyright notice */}
        <div className="text-center text-[11px] font-mono text-[#85847E] pt-2">
          © {new Date().getFullYear()} Hanz Christian Angelo G. Magbal. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

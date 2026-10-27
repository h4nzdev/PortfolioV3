import { useState } from 'react';
import { X, Send, Mail, Copy, Check, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../SocialIcons';
import { personalInfo } from '../../data/portfolioData';
import { sound } from '../../utils/sound';

export default function ContactModal({ onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    sound.playClick();
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playClick();
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Hanz,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    // Configured mailto fallback for direct communication
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-contact-title"
    >
      <div className="relative w-full max-w-lg bg-[#F8F7F2] rounded-2xl border border-[#C8B99A]/60 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#E5DCCB] text-[#171715] transition-colors"
          title="Close"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <div className="inline-block px-2.5 py-0.5 rounded-full editorial-pill mb-2">
            <span>START A CONVERSATION</span>
          </div>
          <h3 id="modal-contact-title" className="text-2xl sm:text-3xl font-bold text-[#171715] tracking-tight font-['Space_Grotesk']">
            Have an idea? Let's build something meaningful.
          </h3>
          <p className="text-xs sm:text-sm text-[#66635B] mt-1">
            Looking for a dedicated software developer, an architect for your next platform, or want to discuss an opportunity?
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div className="space-y-2.5 mb-6">
          
          {/* Email */}
          <div className="p-3 rounded-xl bg-white border border-[#C8B99A]/50 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-[#E5DCCB]/60 text-[#171715] shrink-0">
                <Mail size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#85847E]">
                  Email Address
                </div>
                <div className="text-xs sm:text-sm font-mono font-medium text-[#171715] truncate">
                  {personalInfo.email}
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#F8F7F2] hover:bg-[#E5DCCB]/60 border border-[#C8B99A]/40 text-[#292824] transition-colors shrink-0 ml-2"
            >
              {copiedEmail ? (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Phone */}
          <div className="p-3 rounded-xl bg-white border border-[#C8B99A]/50 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-[#E5DCCB]/60 text-[#171715] shrink-0">
                <Phone size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#85847E]">
                  Phone (Direct / Mobile)
                </div>
                <div className="text-xs sm:text-sm font-mono font-medium text-[#171715] truncate">
                  {personalInfo.phone}
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyPhone}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#F8F7F2] hover:bg-[#E5DCCB]/60 border border-[#C8B99A]/40 text-[#292824] transition-colors shrink-0 ml-2"
            >
              {copiedPhone ? (
                <>
                  <Check size={13} className="text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-mono text-[#292824] uppercase mb-1 font-semibold">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Maya Lin"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8B99A]/60 text-xs sm:text-sm text-[#171715] placeholder:text-[#A99A7D] focus:outline-none focus:border-[#171715] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#292824] uppercase mb-1 font-semibold">
              Your Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="maya@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8B99A]/60 text-xs sm:text-sm text-[#171715] placeholder:text-[#A99A7D] focus:outline-none focus:border-[#171715] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#292824] uppercase mb-1 font-semibold">
              Message / Project Concept
            </label>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about what you're creating or the position you're looking to fill..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#C8B99A]/60 text-xs sm:text-sm text-[#171715] placeholder:text-[#A99A7D] focus:outline-none focus:border-[#171715] transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#171715] text-[#F8F7F2] text-xs sm:text-sm font-medium hover:bg-[#292824] transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Send size={14} />
            <span>{submitted ? 'Opening Email Client...' : 'Send Message'}</span>
          </button>
        </form>

        {/* Footer with Location & Socials */}
        <div className="mt-5 pt-4 border-t border-[#C8B99A]/40 flex items-center justify-between text-xs font-mono text-[#85847E]">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-[#A99A7D]" />
            <span>{personalInfo.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#171715] transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight size={11} />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#171715] transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Terminal, Copy } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
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
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setIsSubmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="pt-28 pb-20 relative w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#004aad]/20 border border-[#004aad]/50 text-[#64ffda] text-[10px] font-bold uppercase tracking-widest font-mono">
            <Terminal className="w-3 h-3" />
            <span>[ COMMS LINK ]</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#e6f1ff] font-outfit tracking-tight">
            ESTABLISH <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004aad] to-[#64ffda]">CONNECTION</span>
          </h2>
          <p className="text-[#8892b0] text-[14px] leading-relaxed font-mono max-w-2xl">
            {">"} Open to software architecture consultations, full-stack engineering roles, and system collaborations. Initialize contact protocol below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Col: Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">

            {/* Direct Info Cards */}
            <div className="space-y-4">
              
              {/* Email */}
              <a
                href={personalInfo.socials.email}
                className="p-5 rounded-xl bg-[#020c1b]/40 border border-[#004aad]/30 hover:border-[#64ffda] flex items-center gap-4 group transition-all"
              >
                <div className="p-3 rounded bg-[#004aad]/20 text-[#64ffda] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-[#8892b0] font-mono uppercase font-bold">Email_Address</div>
                  <div className="text-sm font-bold text-[#e6f1ff] group-hover:text-[#64ffda] transition-colors truncate">
                    {personalInfo.email}
                  </div>
                </div>
              </a>

              {/* Phone */}
              <div className="p-5 rounded-xl bg-[#020c1b]/40 border border-[#004aad]/30 flex items-center justify-between group transition-all hover:border-[#64ffda]/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded bg-[#004aad]/20 text-[#64ffda]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#8892b0] font-mono uppercase font-bold">Phone_Protocol</div>
                    <div className="text-sm font-bold text-[#e6f1ff]">
                      {personalInfo.phone}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(personalInfo.phone);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="p-2.5 rounded-lg hover:bg-[#004aad]/20 text-[#8892b0] hover:text-[#64ffda] transition-colors focus:outline-none"
                  title="Copy Phone Number"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5 text-[#64ffda]" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              {/* Location */}
              <div className="p-5 rounded-xl bg-[#020c1b]/40 border border-[#004aad]/30 flex items-center gap-4">
                <div className="p-3 rounded bg-[#004aad]/20 text-[#64ffda]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-[#8892b0] font-mono uppercase font-bold">Location_Coordinates</div>
                  <div className="text-sm font-bold text-[#e6f1ff]">
                    {personalInfo.location}
                  </div>
                </div>
              </div>

            </div>

            {/* Social Networks */}
            <div className="space-y-4 pt-4 border-t border-[#004aad]/30">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#64ffda] font-mono">
                {">"} Network_Nodes:
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#020c1b]/60 border border-[#004aad]/30 text-[#8892b0] hover:text-[#64ffda] hover:border-[#64ffda] transition-all text-xs font-bold font-mono uppercase"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#020c1b]/60 border border-[#004aad]/30 text-[#8892b0] hover:text-[#64ffda] hover:border-[#64ffda] transition-all text-xs font-bold font-mono uppercase"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Col: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="cyber-panel p-8 sm:p-10 rounded-2xl relative overflow-hidden h-full">

              <h3 className="text-xl font-extrabold text-[#e6f1ff] font-outfit mb-6 flex items-center gap-3">
                <div className="p-2 rounded bg-[#004aad]/20 text-[#64ffda] border border-[#004aad]/40">
                  <Send className="w-4 h-4" />
                </div>
                <span>Transmit Signal</span>
              </h3>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#004aad]/20 text-[#64ffda] border border-[#64ffda] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(100,255,218,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#e6f1ff] font-outfit">Transmission Successful</h4>
                  <p className="text-[#8892b0] text-sm max-w-md mx-auto font-mono">
                    {">"} Payload delivered to Hanz. Standby for response.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl cyber-button font-bold text-[10px] uppercase tracking-wider font-mono"
                  >
                    Send Another Packet
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 font-mono">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-[#64ffda] block">
                        {">"} Origin_Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded bg-[#020c1b]/60 border border-[#004aad]/40 text-[#e6f1ff] placeholder-[#8892b0]/50 text-xs focus:outline-none focus:border-[#64ffda] focus:shadow-[0_0_10px_rgba(100,255,218,0.2)] transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-[#64ffda] block">
                        {">"} Return_Address (Email)
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded bg-[#020c1b]/60 border border-[#004aad]/40 text-[#e6f1ff] placeholder-[#8892b0]/50 text-xs focus:outline-none focus:border-[#64ffda] focus:shadow-[0_0_10px_rgba(100,255,218,0.2)] transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-[#64ffda] block">
                      {">"} Packet_Header (Subject)
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g., System Architecture Project"
                      className="w-full px-4 py-3 rounded bg-[#020c1b]/60 border border-[#004aad]/40 text-[#e6f1ff] placeholder-[#8892b0]/50 text-xs focus:outline-none focus:border-[#64ffda] focus:shadow-[0_0_10px_rgba(100,255,218,0.2)] transition-all"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-[#64ffda] block">
                      {">"} Payload_Data (Message)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter data here..."
                      className="w-full px-4 py-3 rounded bg-[#020c1b]/60 border border-[#004aad]/40 text-[#e6f1ff] placeholder-[#8892b0]/50 text-xs focus:outline-none focus:border-[#64ffda] focus:shadow-[0_0_10px_rgba(100,255,218,0.2)] transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded cyber-button font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#020c1b] border-t-transparent rounded-full animate-spin" />
                        <span>UPLOADING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>INITIALIZE TRANSMISSION</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;

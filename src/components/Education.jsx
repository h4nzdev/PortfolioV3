import { useState } from 'react';
import { educationTimeline, certifications } from '../data/portfolioData';
import { GraduationCap, Award, BookOpen, ChevronDown, ChevronUp, Sparkles, CheckCircle2, ShieldCheck, Calendar, Building2, Terminal } from 'lucide-react';

const Education = () => {
  const [expandedYears, setExpandedYears] = useState({ 0: true });

  const toggleYear = (index) => {
    setExpandedYears((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="education" className="pt-28 pb-20 relative w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#004aad]/20 border border-[#004aad]/50 text-[#64ffda] text-[10px] font-bold uppercase tracking-widest font-mono">
            <Terminal className="w-3 h-3" />
            <span>[ TRAINING DATA ]</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#e6f1ff] font-outfit tracking-tight">
            ACADEMIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004aad] to-[#64ffda]">RECORDS</span>
          </h2>
          <p className="text-[#8892b0] text-[14px] leading-relaxed font-mono max-w-2xl">
            {">"} Accessing Bachelor of Science in Information Technology (BSIT) logs from the University of Southern Philippines Foundation...
          </p>
        </div>

        {/* Chronological Timeline Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-[#004aad]/30 pb-4">
            <div className="p-2.5 rounded bg-[#004aad]/20 text-[#64ffda] border border-[#004aad]/40">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#e6f1ff] font-outfit">
              BSIT Architecture
            </h3>
          </div>

          <div className="relative border-l-2 border-[#004aad]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12 font-mono">
            {educationTimeline.map((item, idx) => {
              const isExpanded = !!expandedYears[idx];

              return (
                <div key={idx} className="relative group">
                  {/* Timeline Dot Icon */}
                  <div className="absolute -left-[33px] sm:-left-[49px] top-1.5 w-8 h-8 rounded-full bg-[#0a192f] border border-[#64ffda] flex items-center justify-center shadow-[0_0_10px_rgba(100,255,218,0.3)] group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-3.5 h-3.5 text-[#64ffda]" />
                  </div>

                  {/* Year Card */}
                  <div className="cyber-panel rounded-2xl p-6 sm:p-8 space-y-6">
                    
                    {/* Top Header info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#64ffda] uppercase tracking-wider mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{item.year}</span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-black text-[#e6f1ff] font-outfit">
                          {item.level}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-[#8892b0] font-bold mt-1.5">
                          <Building2 className="w-4 h-4 text-[#004aad]" />
                          <span>{item.institution}</span>
                        </div>
                      </div>

                      {/* Status / GPA Badges */}
                      <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-3">
                        <span className="px-4 py-1.5 rounded-lg bg-[#004aad]/20 border border-[#004aad]/40 text-[#64ffda] font-bold text-xs">
                          STATUS: {item.status}
                        </span>
                        <span className="px-4 py-1.5 rounded-lg bg-[#004aad]/20 border border-[#004aad]/40 text-[#64ffda] font-bold text-xs flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>GPA: {item.gpa}</span>
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#8892b0] text-sm leading-relaxed">
                      {item.description}
                    </p>

                    {/* Expand/Collapse Coursework Button */}
                    {(item.coursework?.length > 0 || item.highlights?.length > 0) && (
                      <button
                        onClick={() => toggleYear(idx)}
                        className="flex items-center justify-between w-full p-4 rounded-xl cyber-button text-xs sm:text-sm font-bold uppercase transition-all"
                      >
                        <span>{isExpanded ? '[- COLLAPSE LOGS]' : '[+ EXPAND LOGS]'}</span>
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    )}

                    {/* Expanded Content: Coursework & Highlights */}
                    {isExpanded && (item.coursework?.length > 0 || item.highlights?.length > 0) && (
                      <div className="pt-5 border-t border-[#004aad]/30 space-y-7 animate-fadeIn">
                        
                        {/* Coursework Tags */}
                        {item.coursework?.length > 0 && (
                          <div className="space-y-3.5">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-[#64ffda]">
                              {">"} RELEVANT_MODULES:
                            </h5>
                            <div className="flex flex-wrap gap-2.5">
                              {item.coursework.map((course, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="px-3 py-1.5 rounded bg-[#020c1b]/60 border border-[#004aad]/30 text-[#8892b0] text-xs font-bold"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Highlights & Achievements */}
                        {item.highlights?.length > 0 && (
                          <div className="space-y-3.5">
                            <h5 className="text-xs font-bold uppercase tracking-wider text-[#64ffda]">
                              {">"} SYSTEM_MILESTONES:
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {item.highlights.map((highlight, hIdx) => (
                                <div
                                  key={hIdx}
                                  className="flex items-start gap-3 p-4 rounded-xl bg-[#020c1b]/40 border border-[#004aad]/20"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-[#64ffda] shrink-0 mt-0.5" />
                                  <span className="text-xs text-[#8892b0] font-bold">
                                    {highlight}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications & Honors Section */}
        <div className="space-y-8 pt-8 border-t border-[#004aad]/30">
          <div className="flex items-center gap-4 pb-4">
            <div className="p-2.5 rounded bg-[#004aad]/20 text-[#64ffda] border border-[#004aad]/40">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#e6f1ff] font-outfit">
              Security & Validation Keys
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden cyber-panel p-2 transition-transform hover:scale-[1.02]"
              >
                {/* Certificate Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#020c1b]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 border border-[#64ffda]/30">
                    <span className="px-2 py-1 rounded bg-[#004aad]/40 text-[#64ffda] text-[10px] font-bold uppercase font-mono w-max mb-3 border border-[#004aad]">
                      [ {cert.badge} ]
                    </span>
                    <h4 className="font-bold text-lg text-[#e6f1ff] font-outfit leading-snug">
                      {cert.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2 font-mono">
                      <div className="flex items-center gap-2 text-xs text-[#8892b0] font-bold">
                        <ShieldCheck className="w-4 h-4 text-[#64ffda]" />
                        <span>{cert.issuer}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#004aad]">{cert.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Academic Philosophy Quote Card */}
        <div className="p-8 sm:p-12 rounded-[2rem] cyber-panel relative overflow-hidden text-center space-y-6">
          <div className="relative z-10">
            <Sparkles className="w-8 h-8 text-[#64ffda] mx-auto animate-pulse mb-6" />
            <blockquote className="text-xl sm:text-2xl font-bold text-[#e6f1ff] font-outfit max-w-4xl mx-auto leading-relaxed">
              "Education is not merely the consumption of technical syntax, but the discipline of structuring complex IT systems to elevate real-world human experiences."
            </blockquote>
            <p className="text-sm font-mono uppercase tracking-widest text-[#64ffda] font-black mt-6">
              — Hanz Christian Angelo G. Magbal
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;

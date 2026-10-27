import { useEffect, useCallback } from 'react';
import { X, Award, ExternalLink, Calendar, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { certifications } from '../../data/portfolioData';
import { sound } from '../../utils/sound';

export default function CertificateModal({ certificateIdx, onClose, onSelectCertificate }) {
  const cert = certifications[certificateIdx] || null;

  const handleNext = useCallback(() => {
    sound.playClick();
    const nextIdx = (certificateIdx + 1) % certifications.length;
    if (onSelectCertificate) onSelectCertificate(nextIdx);
  }, [certificateIdx, onSelectCertificate]);

  const handlePrev = useCallback(() => {
    sound.playClick();
    const prevIdx = (certificateIdx - 1 + certifications.length) % certifications.length;
    if (onSelectCertificate) onSelectCertificate(prevIdx);
  }, [certificateIdx, onSelectCertificate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose]);

  if (certificateIdx === null || certificateIdx === undefined || !cert) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cert-title"
    >
      <div className="relative w-full max-w-3xl bg-[#F8F7F2] rounded-2xl border border-[#C8B99A]/60 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-[#F8F7F2]/95 border-b border-[#C8B99A]/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#E5DCCB] text-[#171715]">
              <Award size={18} />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#85847E] block">
                Verified Credential // {cert.badge || 'Certificate'} • 0{certificateIdx + 1} of 0{certifications.length}
              </span>
              <h3 id="modal-cert-title" className="text-base sm:text-lg font-bold text-[#171715] font-['Space_Grotesk'] leading-tight">
                {cert.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-full hover:bg-[#E5DCCB] text-[#171715] transition-colors"
              title="Previous Milestone"
              aria-label="Previous Milestone"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-full hover:bg-[#E5DCCB] text-[#171715] transition-colors"
              title="Next Milestone"
              aria-label="Next Milestone"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-full hover:bg-[#E5DCCB] text-[#171715] transition-colors ml-2"
              title="Close"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Certificate Image Frame */}
        <div className="p-6 bg-[#292824] flex items-center justify-center overflow-auto flex-1 relative group">
          <img
            src={cert.image}
            alt={cert.title}
            className="max-h-[62vh] max-w-full object-contain rounded-lg shadow-xl border border-[#C8B99A]/40"
          />
        </div>

        {/* Footer Details */}
        <div className="px-6 py-4 bg-white border-t border-[#C8B99A]/40 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#292824]">
              <Building2 size={14} className="text-[#A99A7D]" />
              <span>Issuer: <strong className="text-[#171715]">{cert.issuer}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#292824]">
              <Calendar size={14} className="text-[#A99A7D]" />
              <span>Year: <strong className="text-[#171715]">{cert.year}</strong></span>
            </div>
          </div>

          <a
            href={cert.image}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#171715] text-[#F8F7F2] text-xs font-mono font-medium hover:bg-[#292824] transition-all shadow-xs"
          >
            <span>Open High-Res Original</span>
            <ExternalLink size={12} />
          </a>
        </div>

      </div>
    </div>
  );
}

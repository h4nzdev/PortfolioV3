import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { sound } from '../../utils/sound';

/**
 * Architectural "Back to Top" Floating Action Button
 * Features a dynamic circular scroll progress ring, tactile hover states,
 * sound feedback, and smooth spring physics.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Circular progress calculations for r = 20 (viewBox 0 0 48 48)
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [circumference, 0]
  );

  useEffect(() => {
    const handleScroll = () => {
      // Reveal button once scrolled past the initial hero view (380px)
      if (window.scrollY > 380) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    sound.playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
        >
          <button
            onClick={handleScrollToTop}
            aria-label="Back to top"
            className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#171715]/90 hover:bg-[#262522] backdrop-blur-md text-[#F8F7F2] shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8B99A] active:scale-95 cursor-pointer"
          >
            {/* Circular Scroll Progress Track */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 48 48"
            >
              {/* Subtle background track */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[#C8B99A]/20"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Animated active progress ring */}
              <motion.circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-[#C8B99A]"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
              />
            </svg>

            {/* Architectural Arrow Icon with upward hover drift */}
            <ArrowUp
              size={19}
              className="relative z-10 text-[#F8F7F2] group-hover:text-[#C8B99A] group-hover:-translate-y-1 transition-all duration-300 ease-out"
            />

            {/* Hover Tooltip Pill */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-[#171715]/95 backdrop-blur-md text-[#F8F7F2] text-[10px] font-mono tracking-widest uppercase border border-[#C8B99A]/40 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap shadow-xl flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99A]" />
              <span>Back to Top</span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

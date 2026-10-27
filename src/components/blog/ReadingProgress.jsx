import { useState, useEffect } from 'react';

export default function ReadingProgress({ targetRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = targetRef?.current;
      if (!element) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight <= 0) return;
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
        return;
      }

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const scrollDistance = window.scrollY - elementTop;
      const totalScrollable = elementHeight - viewportHeight;

      if (totalScrollable <= 0) {
        setProgress(100);
        return;
      }

      const currentProgress = (scrollDistance / totalScrollable) * 100;
      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-[#171715]/5 z-50 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#C8B99A] via-[#A89878] to-[#171715] transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

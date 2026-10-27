import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    // Hide on mobile or touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e) => {
      // Direct small dot
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });

      // Smooth damped outer ring
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power3.out',
      });
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive-hover');

      if (isInteractive) {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.15 });
        gsap.to(follower, {
          scale: 1.4,
          backgroundColor: 'rgba(200, 185, 154, 0.25)',
          borderColor: '#151515',
          duration: 0.25,
          ease: 'power2.out',
        });
      } else {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.15 });
        gsap.to(follower, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(41, 40, 36, 0.35)',
          duration: 0.25,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none z-50">
      {/* Precision charcoal dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#151515] pointer-events-none z-[100]"
      />
      {/* Tactile minimalist outer ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-[#292824]/40 pointer-events-none z-[99] transition-colors"
      />
    </div>
  );
};

export default CustomCursor;

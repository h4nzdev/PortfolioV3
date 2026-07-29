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
      // Fast point follower
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Smooth outer glow follower
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: 'power3.out'
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
        // Lock-on effect
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(follower, {
          scale: 0.8,
          borderColor: 'rgba(100, 255, 218, 1)',
          rotation: 45,
          duration: 0.3,
          ease: 'back.out(2)'
        });
      } else {
        // Default cruising mode
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
        gsap.to(follower, {
          scale: 1,
          borderColor: 'rgba(0, 74, 173, 0.5)', // #004aad
          rotation: 0,
          duration: 0.3
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
      {/* Small dot cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-[#64ffda] pointer-events-none z-[100] shadow-[0_0_8px_#64ffda]"
      />
      {/* Larger targeting reticle */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 border border-[#004aad]/50 pointer-events-none z-[99] flex items-center justify-center transition-colors"
      >
        {/* Crosshair lines */}
        <div className="absolute w-2 h-[1px] bg-[#64ffda] -left-1 opacity-50"></div>
        <div className="absolute w-2 h-[1px] bg-[#64ffda] -right-1 opacity-50"></div>
        <div className="absolute w-[1px] h-2 bg-[#64ffda] -top-1 opacity-50"></div>
        <div className="absolute w-[1px] h-2 bg-[#64ffda] -bottom-1 opacity-50"></div>
      </div>
    </div>
  );
};

export default CustomCursor;

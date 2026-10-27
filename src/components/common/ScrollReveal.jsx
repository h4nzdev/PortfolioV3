import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Global Top Scroll Progress Bar
 * Sleek tactile gold/khaki bar tracking user journey
 */
export function ScrollProgressTopBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C8B99A] via-[#E5DCCB] to-[#C8B99A] z-[99999] origin-left shadow-xs pointer-events-none"
      style={{ scaleX }}
    />
  );
}

/**
 * Section Reveal Animation
 * Smoothly lifts and fades in sections with spring physics as they enter viewport
 */
export function SectionReveal({ children, className = '', delay = 0, yOffset = 36 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax Element Wrapper
 * Moves children along the Y-axis at a customized speed relative to scroll
 */
export function ParallaxWrapper({ children, speed = 1.0, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Calculate vertical parallax offset
  const y = useTransform(scrollYProgress, [0, 1], [-60 * speed, 60 * speed]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Stagger Container for Grids, Lists and Cards
 */
export function StaggerContainer({ children, className = '', staggerDelay = 0.1 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Item within a StaggerContainer
 */
export function StaggerItem({ children, className = '', yOffset = 24 }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

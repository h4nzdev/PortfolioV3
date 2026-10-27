import { useEffect, useRef, useState, useCallback } from 'react';
import './SplashScreen.css';

const T = (x = 0, y = 0, r = 0, s = 1) => `translate(${x}px,${y}px) rotate(${r}deg) scale(${s})`;

export default function SplashScreen({ onRevealSite, onComplete }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return false;
      if (sessionStorage.getItem('portfolio_splash_shown') === 'true') return false;
    }
    return true;
  });
  const [isOut, setIsOut] = useState(false);
  const [tagText, setTagText] = useState('');
  const [tagOpacity, setTagOpacity] = useState(0);

  const splashRef = useRef(null);
  const logoRef = useRef(null);
  const wordRef = useRef(null);
  const tagRef = useRef(null);

  const spineRef = useRef(null);
  const leafRef = useRef(null);
  const tlRef = useRef(null);
  const trRef = useRef(null);
  const blRef = useRef(null);
  const brRef = useRef(null);

  const runIdRef = useRef(0);

  const stopRun = useCallback(() => {
    runIdRef.current += 1;
  }, []);

  const setEl = (el, tf, dur, ease, delay = 0, op = 1) => {
    if (!el) return;
    el.style.transition = `transform ${dur}ms ${ease} ${delay}ms, opacity ${dur}ms ease ${delay}ms`;
    el.style.transform = tf;
    el.style.opacity = op;
  };

  const getParts = useCallback(() => [
    { el: spineRef.current, name: 'Axis', spread: T(0, -200, 0, 0.75), burst: T(0, -2200, 0, 3) },
    { el: leafRef.current, name: 'Leaf', spread: T(0, 620, 0, 1), burst: T(0, 2200, 0, 3) },
    { el: tlRef.current, name: 'Crystal I', spread: T(-420, -115, -12, 1), burst: T(-2200, -1700, -50, 4) },
    { el: trRef.current, name: 'Crystal II', spread: T(420, -115, 12, 1), burst: T(2200, -1700, 50, 4) },
    { el: blRef.current, name: 'Crystal III', spread: T(-420, 125, 12, 1), burst: T(-2200, 1700, 50, 4) },
    { el: brRef.current, name: 'Crystal IV', spread: T(420, 125, -12, 1), burst: T(2200, 1700, -50, 4) },
  ], []);

  const run = useCallback(async () => {
    const currentRunId = ++runIdRef.current;
    const isCancelled = () => runIdRef.current !== currentRunId;

    const parts = getParts();
    const site = document.getElementById('site');
    const word = wordRef.current;
    const logo = logoRef.current;
    const splash = splashRef.current;

    if (!splash || !logo || !word) return;

    if (site) site.classList.remove('in');
    setIsOut(false);
    setVisible(true);
    splash.style.display = 'grid';
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    // Reset all elements
    parts.forEach((p) => {
      if (!p.el) return;
      p.el.style.transition = 'none';
      p.el.style.transform = T();
      p.el.style.opacity = 1;
    });

    word.style.transition = 'none';
    word.style.opacity = 0;
    word.style.transform = 'scale(1)';

    logo.style.opacity = 0;
    setTagOpacity(0);
    setTagText('');

    await new Promise((r) => setTimeout(r, 40));
    if (isCancelled()) return;

    logo.style.opacity = 1;
    word.style.transition = 'opacity 0.4s ease';
    word.style.opacity = 0.95;

    await new Promise((r) => setTimeout(r, 400)); // logo appears whole
    if (isCancelled()) return;

    // 1 · DISASSEMBLE (Fluid outward spread)
    parts.forEach((p, i) => setEl(p.el, p.spread, 850, 'cubic-bezier(.65,0,.2,1)', i * 40));
    await new Promise((r) => setTimeout(r, 850 + 5 * 40 + 60));
    if (isCancelled()) return;

    // 2 · ASSEMBLE (Magnetic reassembly snapping crisply back)
    parts.forEach((p, i) => setEl(p.el, T(), 800, 'cubic-bezier(.5,0,.15,1.15)', i * 35));
    await new Promise((r) => setTimeout(r, 800 + 5 * 35 + 80));
    if (isCancelled()) return;

    // Anticipation squeeze
    parts.forEach((p) => setEl(p.el, T(0, 0, 0, 0.94), 160, 'ease-in'));
    await new Promise((r) => setTimeout(r, 180));
    if (isCancelled()) return;

    // 3 · EXPLODE + CINEMATIC FADE REVEAL
    setIsOut(true);
    if (site) site.classList.add('in');
    if (onRevealSite) onRevealSite();

    word.style.transition = 'opacity 0.6s ease, transform 0.9s cubic-bezier(.7,0,.9,.5)';
    word.style.opacity = 0;
    word.style.transform = 'scale(1.5)';

    parts.forEach((p) => {
      if (!p.el) return;
      p.el.style.transition = 'transform 900ms cubic-bezier(.7,0,.9,.5), opacity 600ms ease 250ms';
      p.el.style.transform = p.burst;
      p.el.style.opacity = 0;
    });

    await new Promise((r) => setTimeout(r, 900));
    if (isCancelled()) return;

    if (splashRef.current) splashRef.current.style.display = 'none';
    setVisible(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio_splash_shown', 'true');
    }
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
    if (onComplete) onComplete();
  }, [getParts, onRevealSite, onComplete]);

  // Fast forward / skip to explosion
  const skip = useCallback(() => {
    runIdRef.current++; // cancel running sequence
    const parts = getParts();
    const site = document.getElementById('site');
    const word = wordRef.current;
    const splash = splashRef.current;

    setIsOut(true);
    setTagOpacity(0);
    if (site) site.classList.add('in');
    if (onRevealSite) onRevealSite();

    if (word) {
      word.style.transition = 'opacity 0.4s ease, transform 0.6s ease';
      word.style.opacity = 0;
      word.style.transform = 'scale(1.5)';
    }

    parts.forEach((p) => {
      if (!p.el) return;
      p.el.style.transition = 'transform 600ms cubic-bezier(.7,0,.9,.5), opacity 450ms ease';
      p.el.style.transform = p.burst;
      p.el.style.opacity = 0;
    });

    setTimeout(() => {
      if (splash) splash.style.display = 'none';
      setVisible(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('portfolio_splash_shown', 'true');
      }
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
      if (onComplete) onComplete();
    }, 600);
  }, [getParts, onRevealSite, onComplete]);

  useEffect(() => {
    // Check if reduced-motion or already viewed in this session
    const hasSeenSplash = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_splash_shown') === 'true';
    const isReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (hasSeenSplash || isReduced) {
      const site = document.getElementById('site');
      if (site) site.classList.add('in');
      if (splashRef.current) splashRef.current.style.display = 'none';
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
      if (onRevealSite) onRevealSite();
      if (onComplete) onComplete();
      return;
    }

    // Run animation on initial mount
    run();

    let isDisposed = false;
    // Keydown listener for 'r' / 'R' to replay, 'Escape' to skip
    const handleKeyDown = (e) => {
      if (isDisposed) return;
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable) {
        return;
      }
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        run();
      } else if (e.key === 'Escape') {
        skip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      isDisposed = true;
      window.removeEventListener('keydown', handleKeyDown);
      stopRun();
    };
  }, [run, skip, stopRun, onRevealSite, onComplete]);

  return (
    <div
      id="splash"
      ref={splashRef}
      className={isOut ? 'out' : ''}
      style={{ display: visible ? 'grid' : 'none' }}
    >
      {/* Skip Pill for quick inspection */}
      <button
        type="button"
        onClick={skip}
        className="splash-skip-pill"
        title="Press ESC or Click to Skip"
      >
        Skip [ESC]
      </button>

      {/* Replay reminder */}
      <div className="splash-replay-hint">
        Press [R] anytime to replay
      </div>

      <svg
        id="logo"
        ref={logoRef}
        viewBox="0 0 1932 1932"
        aria-label="Hanz Dev Logo"
      >
        <defs>
          <path
            id="cr"
            d="M714 268 L766 352 Q772 362 773 375 L785 575 Q786 585 784 595 L748 750 Q745 762 735 762 H693 Q683 762 680 750 L645 595 Q643 585 644 575 L656 375 Q657 362 663 352 L708 270 Q711 266 714 268 Z"
          />
        </defs>

        <g className="splash-part p" id="spine" ref={spineRef}>
          <path d="M941 152 H994 Q1004 152 1004 162 L1038 925 L1033 1090 L1004 1768 Q1004 1777 994 1777 H941 Q931 1777 931 1768 L901 1090 L897 925 L931 162 Q931 152 941 152 Z" />
        </g>

        <g className="splash-part p" id="leaf" ref={leafRef}>
          <path d="M690 800 L765 820 Q785 826 800 840 L897 925 L1038 925 L1135 840 Q1150 826 1170 820 L1245 800 L1222 875 Q1218 888 1208 898 L1135 980 L1240 994 Q1250 996 1250 1006 V1055 Q1250 1064 1240 1066 L1033 1090 L901 1090 L695 1066 Q687 1064 687 1055 V1006 Q687 996 695 994 L800 980 L722 898 Q712 888 708 875 Z" />
        </g>

        <g className="splash-part p" id="tl" ref={tlRef}>
          <use href="#cr" />
        </g>

        <g className="splash-part p" id="tr" ref={trRef}>
          <use href="#cr" transform="matrix(-1 0 0 1 1933 0)" />
        </g>

        <g className="splash-part p" id="bl" ref={blRef}>
          <use href="#cr" transform="matrix(1 0 0 -1 0 1891)" />
        </g>

        <g className="splash-part p" id="br" ref={brRef}>
          <use href="#cr" transform="matrix(-1 0 0 -1 1933 1891)" />
        </g>
      </svg>

      <div
        id="tag"
        ref={tagRef}
        style={{ opacity: tagOpacity }}
      >
        {tagText}
      </div>

      <div id="word" ref={wordRef}>
        Hanz Dev
      </div>
    </div>
  );
}

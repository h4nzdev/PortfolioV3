import { useEffect, useRef, useState, useCallback } from 'react';
import './SplashScreen.css';

const T = (x = 0, y = 0, r = 0, s = 1) => `translate(${x}px,${y}px) rotate(${r}deg) scale(${s})`;

export default function SplashScreen({ onRevealSite, onComplete }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
      return false;
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

    // Reset all elements
    parts.forEach((p) => {
      if (!p.el) return;
      p.el.style.transition = 'none';
      p.el.style.transform = T();
      p.el.style.opacity = 1;
    });

    word.style.transition = 'none';
    word.style.opacity = 0;
    word.style.transform = 'none';
    word.style.letterSpacing = '.5em';

    logo.style.opacity = 0;
    setTagOpacity(0);
    setTagText('');

    await new Promise((r) => setTimeout(r, 60));
    if (isCancelled()) return;

    logo.style.opacity = 1;
    word.style.transition = 'opacity .9s ease .3s';
    word.style.opacity = 0.9;

    await new Promise((r) => setTimeout(r, 900)); // logo appears whole
    if (isCancelled()) return;

    // 1 · DISASSEMBLE
    parts.forEach((p, i) => setEl(p.el, p.spread, 1100, 'cubic-bezier(.65,0,.2,1)', i * 70));
    await new Promise((r) => setTimeout(r, 1100 + 5 * 70 + 250));
    if (isCancelled()) return;

    // 2 · SHOW COMPONENTS (one at a time)
    for (let i = 0; i < parts.length; i++) {
      if (isCancelled()) return;
      setTagText(`0${i + 1} / 06 — ${parts[i].name}`);
      setTagOpacity(0.8);

      parts.forEach((p, j) => {
        const on = i === j;
        setEl(
          p.el,
          on ? p.spread.replace(/scale\(([\d.]+)\)/, (_, s) => `scale(${parseFloat(s) * 1.22})`) : p.spread,
          380,
          'cubic-bezier(.3,.8,.3,1)',
          0,
          on ? 1 : 0.18
        );
      });
      await new Promise((r) => setTimeout(r, 520));
    }
    if (isCancelled()) return;

    setTagOpacity(0);
    parts.forEach((p) => setEl(p.el, p.spread, 250, 'ease', 0, 1));
    await new Promise((r) => setTimeout(r, 350));
    if (isCancelled()) return;

    // 3 · ASSEMBLE
    parts.forEach((p, i) => setEl(p.el, T(), 1000, 'cubic-bezier(.5,0,.15,1.15)', i * 50));
    await new Promise((r) => setTimeout(r, 1000 + 5 * 50 + 350));
    if (isCancelled()) return;

    // Anticipation squeeze
    parts.forEach((p) => setEl(p.el, T(0, 0, 0, 0.94), 220, 'ease-in'));
    await new Promise((r) => setTimeout(r, 240));
    if (isCancelled()) return;

    // 4 · EXPLODE + REVEAL
    setIsOut(true);
    word.style.transition = 'opacity .6s ease, letter-spacing 1.1s cubic-bezier(.7,0,.9,.5), transform 1.1s cubic-bezier(.7,0,.9,.5)';
    word.style.opacity = 0;
    word.style.letterSpacing = '1.4em';
    word.style.transform = 'scale(1.6)';

    parts.forEach((p) => {
      if (!p.el) return;
      p.el.style.transition = 'transform 1100ms cubic-bezier(.7,0,.9,.5), opacity 500ms ease 450ms';
      p.el.style.transform = p.burst;
      p.el.style.opacity = 0;
    });

    await new Promise((r) => setTimeout(r, 450));
    if (isCancelled()) return;

    if (site) site.classList.add('in');
    if (onRevealSite) onRevealSite();

    await new Promise((r) => setTimeout(r, 1100));
    if (isCancelled()) return;

    if (splashRef.current) splashRef.current.style.display = 'none';
    setVisible(false);
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

    if (word) {
      word.style.transition = 'opacity .4s ease, letter-spacing .6s ease, transform .6s ease';
      word.style.opacity = 0;
      word.style.letterSpacing = '1.4em';
      word.style.transform = 'scale(1.6)';
    }

    parts.forEach((p) => {
      if (!p.el) return;
      p.el.style.transition = 'transform 600ms cubic-bezier(.7,0,.9,.5), opacity 300ms ease';
      p.el.style.transform = p.burst;
      p.el.style.opacity = 0;
    });

    if (site) site.classList.add('in');
    if (onRevealSite) onRevealSite();

    setTimeout(() => {
      if (splash) splash.style.display = 'none';
      setVisible(false);
      if (onComplete) onComplete();
    }, 600);
  }, [getParts, onRevealSite, onComplete]);

  useEffect(() => {
    // Respect user's reduced-motion preference
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
      const site = document.getElementById('site');
      if (site) site.classList.add('in');
      if (splashRef.current) splashRef.current.style.display = 'none';
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

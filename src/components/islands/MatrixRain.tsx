import { useEffect, useRef } from 'react';

// Subtle matrix-style char rain — only visible in the dark margins around
// the main content (max-width 1100px). Hidden on small screens.
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 1100px), (prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cv = canvas; // local non-null reference for closures

    const CHARS = '01<>$#!@&|/\\{}[]·◆▪⌬'.split('');
    const FONT_SIZE = 14;

    let columns = 0;
    let drops: number[] = [];
    let raf = 0;

    function resize() {
      cv.width = window.innerWidth * devicePixelRatio;
      cv.height = window.innerHeight * devicePixelRatio;
      cv.style.width = window.innerWidth + 'px';
      cv.style.height = window.innerHeight + 'px';
      ctx?.scale(devicePixelRatio, devicePixelRatio);
      columns = Math.floor(window.innerWidth / FONT_SIZE);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    }
    resize();
    window.addEventListener('resize', resize);

    const MAX_W = 1100;
    function isInMargin(x: number) {
      const margin = (window.innerWidth - MAX_W) / 2;
      if (margin < 60) return false; // skip if not enough margin
      return x < margin - 24 || x > window.innerWidth - margin + 24;
    }

    let lastT = 0;
    let paused = document.hidden;
    document.addEventListener('visibilitychange', () => {
      paused = document.hidden;
    });

    function loop(t: number) {
      // Throttle to ~20fps — slow rain doesn't need 60fps + halves the CPU
      // cost vs 30fps. Also pause when tab hidden.
      if (!paused && t - lastT > 50) {
        lastT = t;
        if (!ctx) return;
        ctx.fillStyle = 'rgba(10, 7, 0, 0.10)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.font = `${FONT_SIZE}px 'IBM Plex Mono', monospace`;
        ctx.textBaseline = 'top';

        for (let i = 0; i < columns; i++) {
          const x = i * FONT_SIZE;
          if (!isInMargin(x)) continue;
          const y = drops[i] * FONT_SIZE;
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillStyle =
            Math.random() < 0.04 ? 'rgba(255, 215, 0, 0.55)' : 'rgba(255, 176, 0, 0.22)';
          ctx.fillText(char, x, y);
          if (y > window.innerHeight && Math.random() > 0.97) drops[i] = 0;
          drops[i] += 0.35 + Math.random() * 0.4;
        }
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.6,
      }}
      aria-hidden="true"
    />
  );
}

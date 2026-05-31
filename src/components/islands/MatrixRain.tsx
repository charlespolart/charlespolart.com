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

    const MAX_W = 1100;
    let columns = 0;
    let drops: number[] = [];
    // Per-column permanent speed multiplier — small variation so columns
    // naturally desynchronize over each cycle, breaking any "wave" pattern.
    let colSpeed: number[] = [];
    let raf = 0;
    // active[i] = true means the column is being rendered + advanced.
    // Margin columns are always active. Non-margin columns are inactive by
    // default, activated by a burst event, then deactivated as each drop
    // falls off the bottom.
    let active: boolean[] = [];
    let activeCenterCount = 0;
    // After the last center drop deactivates, run aggressive cleanup passes
    // on the center area for this many frames to fully erase residue trails.
    let cleanupFrames = 0;

    function isMarginCol(x: number): boolean {
      const margin = (window.innerWidth - MAX_W) / 2;
      if (margin < 60) return false;
      return x < margin - 24 || x > window.innerWidth - margin + 24;
    }

    function resize() {
      cv.width = window.innerWidth * devicePixelRatio;
      cv.height = window.innerHeight * devicePixelRatio;
      cv.style.width = window.innerWidth + 'px';
      cv.style.height = window.innerHeight + 'px';
      ctx?.scale(devicePixelRatio, devicePixelRatio);
      columns = Math.floor(window.innerWidth / FONT_SIZE);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
      colSpeed = Array.from({ length: columns }, () => 0.7 + Math.random() * 0.6);
      active = Array.from({ length: columns }, (_, i) => isMarginCol(i * FONT_SIZE));
      activeCenterCount = 0;
      cleanupFrames = 0;
    }
    resize();
    window.addEventListener('resize', resize);

    let burstUntil = 0;

    const onBurst = () => {
      burstUntil = performance.now() + 10000;
      cleanupFrames = 0; // cancel any pending cleanup
      // Distribute drops just ABOVE the screen at widely staggered heights.
      // Combined with per-column speed variation, this gives :
      //   - rain entering from the TOP (chars appear at the top first)
      //   - a wide entry spread so the screen fills progressively top-down
      //   - permanent desync between columns so no global wave forms
      for (let i = 0; i < columns; i++) {
        if (!isMarginCol(i * FONT_SIZE)) {
          if (!active[i]) {
            active[i] = true;
            activeCenterCount++;
          }
          // Each column reroll its speed too — fresh random rhythm per burst.
          colSpeed[i] = 0.7 + Math.random() * 0.6;
          drops[i] = -Math.random() * 60 - 1;
        } else {
          active[i] = true;
        }
      }
    };
    window.addEventListener('matrix:burst', onBurst as EventListener);

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

        const burstActive = performance.now() < burstUntil;

        // Global fade — slow during burst so chars persist + look dense.
        ctx.fillStyle = burstActive ? 'rgba(10, 7, 0, 0.04)' : 'rgba(10, 7, 0, 0.12)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        ctx.font = `${FONT_SIZE}px 'IBM Plex Mono', monospace`;
        ctx.textBaseline = 'top';

        for (let i = 0; i < columns; i++) {
          if (!active[i]) continue;

          const x = i * FONT_SIZE;
          const inMarginCol = isMarginCol(x);
          // A column spawns new top chars when burst is active OR it's a
          // regular margin column. After burst, non-margin drops just drain
          // off the bottom — no new chars at the top.
          const canSpawn = burstActive || inMarginCol;
          // Lingering burst drops keep the boosted speed so the drain phase
          // doesn't feel sluggish vs the burst itself.
          const colBoost = burstActive || !inMarginCol ? 0.6 : 0;

          const y = drops[i] * FONT_SIZE;
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          // Burst + lingering drops keep matrix-green; regular margin = amber.
          if (burstActive || !inMarginCol) {
            ctx.fillStyle =
              Math.random() < 0.08
                ? 'rgba(200, 255, 200, 1)'    // bright white-green head
                : 'rgba(63, 255, 142, 0.85)'; // matrix green body
          } else {
            ctx.fillStyle =
              Math.random() < 0.04
                ? 'rgba(255, 215, 0, 0.55)'
                : 'rgba(255, 176, 0, 0.22)';
          }
          ctx.fillText(char, x, y);

          // Spawn-at-top only for spawning columns. Respawn at a random
          // small negative offset so subsequent waves don't synchronize.
          if (y > window.innerHeight && Math.random() > 0.97 && canSpawn) {
            drops[i] = Math.random() * -10;
          }
          // Speed = base + per-frame noise + burst boost, then scaled by the
          // column's permanent multiplier so different columns drift apart.
          drops[i] += (0.35 + Math.random() * 0.4 + colBoost) * colSpeed[i];

          // Deactivate non-margin columns once the drop has cleared the
          // bottom — stops them from being rendered until the next burst.
          if (!canSpawn && y > window.innerHeight + FONT_SIZE) {
            active[i] = false;
            activeCenterCount--;
            if (activeCenterCount === 0) cleanupFrames = 40;
          }
        }

        // Aggressive cleanup pass — runs for ~2s after the LAST center drop
        // deactivates, fully erases residue trails left by the global fade
        // (which only approaches zero asymptotically).
        if (cleanupFrames > 0 && !burstActive) {
          cleanupFrames--;
          const margin = (window.innerWidth - MAX_W) / 2;
          if (margin >= 60) {
            ctx.fillStyle = 'rgba(10, 7, 0, 0.45)';
            ctx.fillRect(
              margin - 24,
              0,
              window.innerWidth - 2 * (margin - 24),
              window.innerHeight,
            );
          }
        }
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('matrix:burst', onBurst as EventListener);
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

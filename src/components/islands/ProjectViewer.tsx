import { gsap } from '@/lib/gsap';
import { useEffect, useRef, useState } from 'react';

interface Props {
  locale: 'en' | 'fr';
}

interface OpenData {
  projectId: string;
  title: string;
  photos: string[];
}

type Phase = 'idle' | 'opening' | 'ready' | 'transitioning' | 'closing';

const REDUCED_MOTION = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function filename(path: string): string {
  return path.split('/').filter(Boolean).pop() ?? path;
}

export default function ProjectViewer({ locale }: Props) {
  const [data, setData] = useState<OpenData | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [bootLines, setBootLines] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const triggerRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);

  const t =
    locale === 'fr'
      ? {
          close: 'fermer',
          prev: 'précédent',
          next: 'suivant',
          escClose: 'ESC pour fermer',
          swipe: 'swipe · tap pour fermer',
          missing: '< introuvable >',
        }
      : {
          close: 'close',
          prev: 'prev',
          next: 'next',
          escClose: 'ESC to close',
          swipe: 'swipe · tap to close',
          missing: '< missing >',
        };

  const open = !!data && phase !== 'idle';
  const photos = data?.photos ?? [];
  const total = photos.length;

  function close() {
    if (!data) return;
    if (REDUCED_MOTION()) {
      setPhase('idle');
      setData(null);
      setIndex(0);
      setBootLines(0);
      setImageError({});
      triggerRef.current?.focus();
      triggerRef.current = null;
      return;
    }
    setPhase('closing');
    window.setTimeout(() => {
      setPhase('idle');
      setData(null);
      setIndex(0);
      setBootLines(0);
      setImageError({});
      triggerRef.current?.focus();
      triggerRef.current = null;
    }, 400);
  }

  function transitionTo(nextIdx: number) {
    if (total <= 1) return;
    const wrapped = ((nextIdx % total) + total) % total;
    if (wrapped === index) return;
    if (REDUCED_MOTION()) {
      setIndex(wrapped);
      return;
    }
    setPhase('transitioning');
    // Mid-transition swap so the flash hides the change.
    window.setTimeout(() => setIndex(wrapped), 100);
    window.setTimeout(() => setPhase('ready'), 320);
  }

  function next() {
    transitionTo(index + 1);
  }
  function prev() {
    transitionTo(index - 1);
  }
  function jumpTo(i: number) {
    transitionTo(i);
  }

  // ===== Delegated click to OPEN viewer from any card with screenshots =====
  useEffect(() => {
    const onCardClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const article = target.closest('.proj[data-shots="true"]') as HTMLElement | null;
      if (!article) return;
      if (target.closest('.proj-link')) return; // external link wins
      const raw = article.getAttribute('data-screenshots');
      if (!raw) return;
      let parsed: string[] = [];
      try {
        parsed = JSON.parse(raw);
      } catch {
        return;
      }
      if (!Array.isArray(parsed) || parsed.length === 0) return;
      e.preventDefault();
      triggerRef.current = article;
      setData({
        projectId: article.getAttribute('data-project') ?? '',
        title: article.getAttribute('data-project-title') ?? '',
        photos: parsed,
      });
      setIndex(0);
      setBootLines(0);
      setImageError({});
      setPhase(REDUCED_MOTION() ? 'ready' : 'opening');
    };
    const onCardKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const target = e.target as HTMLElement | null;
      if (!target || !target.matches?.('.proj[data-shots="true"]')) return;
      e.preventDefault();
      // Synthesize a click on the article so the click path runs.
      (target as HTMLElement).click();
    };
    document.addEventListener('click', onCardClick);
    document.addEventListener('keydown', onCardKey);
    return () => {
      document.removeEventListener('click', onCardClick);
      document.removeEventListener('keydown', onCardKey);
    };
  }, []);

  // ===== Boot sequence : reveal lines one by one =====
  useEffect(() => {
    if (phase !== 'opening' || !data) return;
    const timers: number[] = [];
    timers.push(window.setTimeout(() => setBootLines(1), 200));
    timers.push(window.setTimeout(() => setBootLines(2), 400));
    timers.push(window.setTimeout(() => setBootLines(3), 600));
    timers.push(window.setTimeout(() => setPhase('ready'), 1100));
    return () => {
      for (const id of timers) window.clearTimeout(id);
    };
  }, [phase, data]);

  // ===== Keyboard nav when open =====
  // biome-ignore lint/correctness/useExhaustiveDependencies: close/next/prev are re-created every render; their effective state is fully derived from the listed deps (open/phase/index/total) so re-attaching the listener every render would gain nothing.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (phase !== 'ready') return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, phase, index, total]);

  // ===== Body scroll lock while open =====
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // ===== Mark html as `pv-open` so other islands (TerminalEffects, palette,
  // typed-buffer shortcuts, konami…) can bail out and stay out of the way.
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('pv-open');
    return () => document.documentElement.classList.remove('pv-open');
  }, [open]);

  // ===== Caption scramble on photo change =====
  useEffect(() => {
    if (!captionRef.current || !data || phase === 'idle' || phase === 'opening') return;
    if (REDUCED_MOTION()) return;
    const text = imageError[index] ? t.missing : `< ${filename(photos[index])} >`;
    gsap.to(captionRef.current, {
      duration: 0.22,
      ease: 'none',
      scrambleText: {
        text,
        chars: '01<>$#!@&|/\\{}[]',
        revealDelay: 0,
        speed: 1,
        tweenLength: false,
      },
    });
  }, [index, photos, data, phase, imageError, t.missing]);

  // ===== Swipe gestures =====
  function onPointerDown(e: React.PointerEvent) {
    swipeStartX.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent) {
    if (swipeStartX.current == null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) < 50) return; // ignore taps
    if (dx > 0) prev();
    else next();
  }

  if (!open || !data) return null;

  const id = data.projectId;
  const N = total;
  const photo = photos[index];
  const isError = !!imageError[index];

  const overlayClass = [
    'pv-overlay',
    phase === 'opening' && 'is-opening',
    phase === 'ready' && 'is-ready',
    phase === 'transitioning' && 'is-transitioning',
    phase === 'closing' && 'is-closing',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={overlayClass}
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      // biome-ignore lint/a11y/useSemanticElements: native <dialog>'s showModal/inert behavior conflicts with the custom CRT layout and shared scanline/vignette overlays — keep a div with role=dialog.
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
    >
      <div className="pv-top">
        <span className="pv-top-title">&gt; viewer.bin : {id}</span>
        <span className="pv-top-counter">
          [ {String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} ]
        </span>
        <button
          type="button"
          className="pv-close"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          aria-label={t.close}
        >
          [×]
        </button>
      </div>

      {phase === 'opening' && (
        <div className="pv-boot">
          {bootLines >= 1 && (
            <div className="pv-boot-line">
              &gt; loading viewer.bin<span className="pv-boot-dots">...</span>
              <span className="pv-boot-ok">[ OK ]</span>
            </div>
          )}
          {bootLines >= 2 && (
            <div className="pv-boot-line">
              &gt; opening /projects/{id}/<span className="pv-boot-ok">[ OK ]</span>
            </div>
          )}
          {bootLines >= 3 && (
            <div className="pv-boot-line pv-boot-ready">
              &gt; READY — {N} {N === 1 ? 'sector' : 'sectors'} loaded
            </div>
          )}
        </div>
      )}

      {phase !== 'opening' && (
        <>
          <div className="pv-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <span className="pv-corner pv-corner-tl" />
            <span className="pv-corner pv-corner-tr" />
            <span className="pv-corner pv-corner-bl" />
            <span className="pv-corner pv-corner-br" />
            {/* Preload all photos by rendering them ; only the current is visible. */}
            {photos.map((p, i) =>
              isError && i === index ? null : (
                <img
                  key={p}
                  src={p}
                  alt={`${data.title} — ${i + 1}`}
                  className={`pv-photo ${i === index ? 'is-current' : 'is-hidden'}`}
                  onClick={(e) => {
                    if (i === index) {
                      e.stopPropagation();
                      next();
                    }
                  }}
                  onError={() => setImageError((m) => ({ ...m, [i]: true }))}
                  draggable={false}
                />
              )
            )}
            {isError && <div className="pv-nosignal">▓▒░ NO SIGNAL ▓▒░</div>}
            <span className="pv-scanline" aria-hidden="true" />
            <span className="pv-flash" aria-hidden="true" />
          </div>

          <div className="pv-caption" ref={captionRef}>
            {isError ? t.missing : `< ${filename(photo)} >`}
          </div>

          {N > 1 && (
            <div className="pv-thumbs">
              {photos.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  className={`pv-thumb ${i === index ? 'cur' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    jumpTo(i);
                  }}
                  aria-label={`${i + 1} / ${N}`}
                >
                  <img src={p} alt="" draggable={false} />
                </button>
              ))}
            </div>
          )}

          <div className="pv-hints">
            {N > 1 ? (
              <>
                <span>← {t.prev}</span>
                <span>{t.escClose}</span>
                <span>{t.next} →</span>
              </>
            ) : (
              <span>{t.escClose}</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

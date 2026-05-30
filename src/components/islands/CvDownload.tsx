import { useEffect, useRef, useState } from 'react';

interface Props {
  locale: 'en' | 'fr';
}

const BUILD_STEPS_EN = [
  '> resolving deps...',
  '> typechecking profile.ts',
  '> typechecking experience.ts',
  '> typechecking projects.ts',
  '> bundling sections',
  '> minifying',
  '> emitting cv.pdf',
];
const BUILD_STEPS_FR = [
  '> résolution des deps...',
  '> typecheck profile.ts',
  '> typecheck experience.ts',
  '> typecheck projects.ts',
  '> bundling des sections',
  '> minification',
  '> émission cv.pdf',
];

export default function CvDownload({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const downloadedRef = useRef(false);

  const steps = locale === 'fr' ? BUILD_STEPS_FR : BUILD_STEPS_EN;
  const t = locale === 'fr'
    ? { title: 'Build de cv.pdf', readyBtn: 'Télécharger ↓', close: 'fermer', done: '✓ Build terminé en' }
    : { title: 'Building cv.pdf', readyBtn: 'Download ↓',     close: 'close',  done: '✓ Build complete in' };

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setStep(0);
      setPct(0);
      setDone(false);
      downloadedRef.current = false;
    };
    window.addEventListener('cmd:cv-download', onOpen as EventListener);
    return () => window.removeEventListener('cmd:cv-download', onOpen as EventListener);
  }, []);

  useEffect(() => {
    if (!open || done) return;
    const stepDur = 280 + Math.random() * 100;
    const interval = window.setInterval(() => {
      setPct((p) => {
        const next = p + (100 / steps.length / 10);
        if (next >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, stepDur / 10);
    const stepTimer = window.setTimeout(() => {
      if (step < steps.length - 1) {
        setStep((s) => s + 1);
      } else {
        setDone(true);
        // auto trigger download once
        if (!downloadedRef.current) {
          downloadedRef.current = true;
          triggerDownload();
        }
      }
    }, stepDur);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stepTimer);
    };
  }, [open, step, done, steps.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function triggerDownload() {
    const a = document.createElement('a');
    a.href = '/cv.pdf';
    a.download = 'Charles_Polart_CV.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  if (!open) return null;

  const buildTime = (steps.length * 0.3).toFixed(2);

  return (
    <div className="cvd-overlay" onClick={() => setOpen(false)}>
      <div className="cvd-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cvd-head">
          <span className="cvd-dot" />
          <span className="cvd-title">{t.title}</span>
        </div>
        <div className="cvd-body">
          {steps.slice(0, step + 1).map((s, i) => (
            <div key={i} className={'cvd-line' + (i < step || done ? ' done' : '')}>
              {s}
              {(i < step || done) && <span className="cvd-ok"> [ OK ]</span>}
            </div>
          ))}
          <div className="cvd-bar">
            <div className="cvd-bar-fill" style={{ width: pct + '%' }} />
            <span className="cvd-pct">{Math.round(pct)}%</span>
          </div>
        </div>
        {done ? (
          <div className="cvd-done">
            <div className="cvd-line ok">{t.done} {buildTime}s</div>
            <button
              type="button"
              className="cvd-btn"
              onClick={triggerDownload}
            >
              {t.readyBtn}
            </button>
          </div>
        ) : null}
        <div className="cvd-foot"><kbd>esc</kbd> {t.close}</div>
      </div>
    </div>
  );
}

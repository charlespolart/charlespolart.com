import type { BootLine } from '@/data/types';
import { gsap } from '@/lib/gsap';
import { useEffect, useRef } from 'react';

interface Props {
  lines: BootLine[];
}

const OK_HTML =
  '   <span style="color: var(--green); text-shadow: 0 0 6px rgba(63,255,142,0.6);">[ OK ]</span>';

export default function BootSequence({ lines }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = '';

    const tl = gsap.timeline({
      onComplete: () => {
        // Dispatch event so TerminalEffects sets up section animations.
        window.dispatchEvent(new CustomEvent('boot:complete'));
      },
    });

    for (const line of lines) {
      const lineEl = document.createElement('div');
      const klass = line.type === 'plain' || line.type === 'progress' ? '' : ` ${line.type}`;
      lineEl.className = `boot-line${klass}`;
      container.appendChild(lineEl);

      if (line.type === 'progress' && line.label && line.amount && line.unit) {
        const label = line.label;
        const amount = line.amount;
        const unit = line.unit;

        // Populate the line ONLY when the timeline reaches it — otherwise the
        // label would be visible from the start, before the previous lines
        // have finished animating.
        tl.call(
          () => {
            lineEl.innerHTML = `${label}<span class="progress"><span class="progress-fill"></span></span><span class="pct"> 0${unit}</span>`;
          },
          undefined,
          '+=0.04'
        );

        const obj = { v: 0 };
        tl.to(obj, {
          v: 1,
          duration: 0.7,
          ease: 'power1.inOut',
          onUpdate: () => {
            const fill = lineEl.querySelector<HTMLElement>('.progress-fill');
            const pct = lineEl.querySelector<HTMLElement>('.pct');
            if (fill) fill.style.width = `${obj.v * 100}%`;
            if (pct) pct.textContent = ` ${Math.round(obj.v * amount)}${unit}`;
          },
          onComplete: () => {
            lineEl.insertAdjacentHTML('beforeend', OK_HTML);
          },
        });
      } else {
        const text = line.text ?? '';
        const obj = { v: 0 };
        // Typewriter — fast (whole line in ~120ms)
        const duration = Math.max(0.04, Math.min(text.length * 0.004, 0.16));
        tl.to(
          obj,
          {
            v: text.length,
            duration,
            ease: 'none',
            onUpdate: () => {
              lineEl.textContent = text.slice(0, Math.round(obj.v));
            },
            onComplete: () => {
              lineEl.textContent = text;
            },
          },
          '+=0.04'
        );
      }
    }

    return () => {
      tl.kill();
    };
  }, [lines]);

  return <div className="boot" ref={ref} aria-hidden="true" />;
}

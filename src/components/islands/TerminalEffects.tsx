import { useEffect } from 'react';
import { gsap, ScrollTrigger, SplitText } from '@/lib/gsap';

interface Props {
  locale: 'en' | 'fr';
}

const SECTION_IDS = ['whoami', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];

export default function TerminalEffects({ locale }: Props) {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    // ============================================================
    // Hero name scramble — clean, with guaranteed final state
    // ============================================================
    const triggerHeroName = () => {
      const heroName = document.querySelector<HTMLElement>('[data-name]');
      if (!heroName || heroName.dataset.played === '1') return;
      heroName.dataset.played = '1';

      const fullText = heroName.textContent ?? '';

      gsap.fromTo(
        heroName,
        { opacity: 0, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(heroName, {
              duration: 1.2,
              ease: 'none',
              scrambleText: {
                text: fullText,
                chars: '01<>$#!@&|/\\{}[]',
                revealDelay: 0,
                speed: 0.8,
                tweenLength: false,
              },
              onComplete: () => {
                // Guarantee clean final state — ScrambleText sometimes leaves stragglers
                heroName.textContent = fullText;
              },
            });
          },
        }
      );

      // Periodic glitch every ~3s
      const glitchInterval = window.setInterval(() => {
        if (Math.random() < 0.4) {
          heroName.classList.add('glitch');
          window.setTimeout(
            () => heroName.classList.remove('glitch'),
            140 + Math.random() * 180
          );
        }
      }, 3000);
      cleanups.push(() => clearInterval(glitchInterval));

      // Hover re-scramble (debounced via flag)
      const onEnter = () => {
        if (heroName.dataset.scrambling === '1') return;
        heroName.dataset.scrambling = '1';
        heroName.classList.add('glitch');
        gsap.to(heroName, {
          duration: 0.55,
          ease: 'none',
          scrambleText: {
            text: fullText,
            chars: 'upperAndLowerCase',
            speed: 1.2,
            tweenLength: false,
          },
          onComplete: () => {
            heroName.textContent = fullText;
            heroName.classList.remove('glitch');
            delete heroName.dataset.scrambling;
          },
        });
      };
      heroName.addEventListener('mouseenter', onEnter);
      cleanups.push(() => heroName.removeEventListener('mouseenter', onEnter));
    };

    // ============================================================
    // Setup — called once after boot:complete (guarded so it only runs once
    // even if boot:complete and the fallback timer both fire)
    // ============================================================
    let setupDone = false;
    const setup = () => {
      if (setupDone) return;
      setupDone = true;

      const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
        (s): s is HTMLElement => s !== null
      );

      // --- Per-section reveal + title SplitText + prompt typewriter ---
      sections.forEach((section) => {
        const titleEl = section.querySelector<HTMLElement>('.section-head .title');
        const promptEl = section.querySelector<HTMLElement>('.prompt');

        // Pre-set transform offset (CSS handles opacity)
        gsap.set(section, { y: 24 });

        // Pre-split title chars and hide them
        let titleChars: Element[] = [];
        if (titleEl) {
          const split = new SplitText(titleEl, { type: 'chars' });
          titleChars = split.chars;
          gsap.set(titleChars, { opacity: 0, x: -6 });
        }

        // Cache full prompt text and clear
        let promptFull = '';
        if (promptEl) {
          promptFull = promptEl.textContent ?? '';
          promptEl.textContent = '';
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const tl = gsap.timeline();

            tl.to(section, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power3.out',
            });

            if (titleChars.length) {
              tl.to(
                titleChars,
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.35,
                  stagger: 0.025,
                  ease: 'power2.out',
                },
                '-=0.30'
              );
            }

            if (promptEl) {
              const obj = { v: 0 };
              tl.to(
                obj,
                {
                  v: promptFull.length,
                  duration: Math.min(promptFull.length * 0.025, 0.9),
                  ease: 'none',
                  onUpdate: () => {
                    promptEl.textContent = promptFull.slice(0, Math.round(obj.v));
                  },
                  onComplete: () => {
                    promptEl.textContent = promptFull;
                  },
                },
                '-=0.20'
              );
            }

            if (section.id === 'whoami') {
              triggerHeroName();
            }
          },
        });
      });

      // --- Skills pills cascade ---
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const pills = skillsSection.querySelectorAll<HTMLElement>('.skills-list span');
        gsap.set(pills, { opacity: 0, y: 6, scale: 0.85 });
        ScrollTrigger.create({
          trigger: skillsSection,
          start: 'top 70%',
          once: true,
          onEnter: () => {
            gsap.to(pills, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              stagger: 0.015,
              ease: 'back.out(1.7)',
              delay: 0.5,
            });
          },
        });
      }

      // --- Magnetic nav links (gsap.quickTo for hot-path mousemove) ---
      const navLinks = document.querySelectorAll<HTMLElement>('.nav a');
      navLinks.forEach((link) => {
        const qx = gsap.quickTo(link, 'x', { duration: 0.4, ease: 'power3.out' });
        const qy = gsap.quickTo(link, 'y', { duration: 0.4, ease: 'power3.out' });
        const onMove = (e: MouseEvent) => {
          const rect = link.getBoundingClientRect();
          qx((e.clientX - (rect.left + rect.width / 2)) * 0.25);
          qy((e.clientY - (rect.top + rect.height / 2)) * 0.25);
        };
        const onLeave = () => {
          gsap.to(link, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)',
            overwrite: true,
          });
        };
        link.addEventListener('mousemove', onMove);
        link.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          link.removeEventListener('mousemove', onMove);
          link.removeEventListener('mouseleave', onLeave);
        });
      });

      // --- Timeline scribe on experience entries (K) ---
      const expEntries = document.querySelectorAll<HTMLElement>('#experience .exp');
      expEntries.forEach((exp) => {
        const line = exp.querySelector<HTMLElement>('.exp-line');
        if (!line) return;
        gsap.to(line, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: exp,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 0.5,
          },
        });
      });

      // --- Number counters in whoami (C) ---
      const counters = document.querySelectorAll<HTMLElement>('[data-count]');
      counters.forEach((el) => {
        const target = parseInt(el.dataset.count ?? '0', 10);
        if (!Number.isFinite(target)) return;
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.4,
              ease: 'power2.out',
              delay: 0.2,
              onUpdate: () => {
                el.textContent = Math.round(obj.v).toString();
              },
              onComplete: () => {
                el.textContent = target.toString();
              },
            });
          },
        });
      });

      // --- Email decrypt on hover (H) ---
      // Idle state: continuously glitches random chars to signal "hover to decrypt".
      // Pool restricted to ASCII alphanumerics + few common mono-safe symbols
      // — guaranteed same width as the real chars in IBM Plex Mono (no font
      // fallback for missing glyphs, no width jitter).
      const POOL = '0123456789abcdefghijklmnopqrstuvwxyz#$%@!?';
      const KEEP = new Set(['@', '.', ' ', '+', '-', '_']);

      const decryptables = document.querySelectorAll<HTMLElement>('[data-decrypt]');
      decryptables.forEach((el) => {
        const realText = el.dataset.decrypt ?? el.textContent ?? '';
        const len = realText.length;
        // Lock the element width to the real text length in `ch` units (mono
        // font => 1ch per character). Prevents flex re-wrap during transitions.
        el.style.display = 'inline-block';
        el.style.minWidth = len + 'ch';
        el.style.whiteSpace = 'nowrap';

        function fullScramble() {
          let out = '';
          for (let i = 0; i < len; i++) {
            const c = realText[i];
            out += KEEP.has(c) ? c : POOL[(Math.random() * POOL.length) | 0];
          }
          return out;
        }

        // Mutate ~30% of chars (preserves shape but reads as constantly glitching)
        function mutateScramble(current: string) {
          let out = '';
          for (let i = 0; i < len; i++) {
            const c = realText[i];
            if (KEEP.has(c)) { out += c; continue; }
            if (Math.random() < 0.3) {
              out += POOL[(Math.random() * POOL.length) | 0];
            } else {
              out += current[i] ?? POOL[0];
            }
          }
          return out;
        }

        let glitchInterval: number | null = null;

        function startGlitch() {
          if (glitchInterval !== null) return;
          if (el.textContent === realText) el.textContent = fullScramble();
          glitchInterval = window.setInterval(() => {
            el.textContent = mutateScramble(el.textContent ?? fullScramble());
          }, 110 + Math.random() * 60);
        }
        function stopGlitch() {
          if (glitchInterval !== null) {
            clearInterval(glitchInterval);
            glitchInterval = null;
          }
        }

        // Initial state : scrambled + glitching
        el.textContent = fullScramble();
        startGlitch();
        cleanups.push(stopGlitch);

        // Behavior : always glitch when mouse is NOT on the email; reveal
        // the real address when hovered. Any in-flight tween is killed on
        // each transition so we never get stuck mid-animation.
        const onEnter = () => {
          gsap.killTweensOf(el);
          stopGlitch();
          gsap.to(el, {
            duration: 0.6,
            ease: 'none',
            scrambleText: {
              text: realText,
              chars: '01#@!$&%/\\',
              revealDelay: 0,
              speed: 1,
              tweenLength: false,
            },
            onComplete: () => {
              el.textContent = realText;
            },
          });
        };
        const onLeave = () => {
          gsap.killTweensOf(el);
          gsap.to(el, {
            duration: 0.3,
            ease: 'none',
            scrambleText: {
              text: fullScramble(),
              chars: '01#@!$&%/\\',
              revealDelay: 0,
              speed: 1.5,
              tweenLength: false,
            },
            onComplete: () => {
              startGlitch();
            },
          });
        };
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
      });

      // --- Project cards : 3D tilt + cursor glow (gsap.quickTo) ---
      const projects = document.querySelectorAll<HTMLElement>('.proj-block .proj');
      projects.forEach((card) => {
        gsap.set(card, { transformPerspective: 1000 });
        const qrx = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' });
        const qry = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' });
        const qy  = gsap.quickTo(card, 'y',         { duration: 0.4, ease: 'power3.out' });

        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width) * 100;
          const py = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--px', px + '%');
          card.style.setProperty('--py', py + '%');
          qrx(((py - 50) / 50) * -5);
          qry(((px - 50) / 50) * 5);
          qy(-2);
        };
        const onLeave = () => {
          qrx(0);
          qry(0);
          qy(0);
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        });
      });

      // --- Final prompt reveal ---
      const finalEl = document.querySelector<HTMLElement>('.final');
      if (finalEl) {
        ScrollTrigger.create({
          trigger: finalEl,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(finalEl, { opacity: 1, duration: 0.5, ease: 'power2.out' });
          },
        });
      }

      // Refresh ScrollTrigger after layout settles
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    // ============================================================
    // Wait for boot to complete, then run setup. Fallback timer in case
    // boot:complete never fires — but cancel it as soon as boot:complete
    // does fire, otherwise setup would run twice (≈3s + 5s).
    // ============================================================
    const fallbackTimer = window.setTimeout(setup, 5000);
    const onBootComplete = () => {
      clearTimeout(fallbackTimer);
      setup();
    };
    window.addEventListener('boot:complete', onBootComplete, { once: true });
    cleanups.push(() => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('boot:complete', onBootComplete);
    });

    // ============================================================
    // Scroll spy (no GSAP needed)
    // ============================================================
    const navLinksForSpy = document.querySelectorAll<HTMLAnchorElement>('.nav a');
    const sectionsForSpy = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (s): s is HTMLElement => s !== null
    );
    // rAF-throttled scroll spy to avoid spamming layout reads on every scroll.
    let spyScheduled = false;
    let currentActive = '';
    const updateActive = () => {
      const scrollY = window.scrollY + 120;
      let active = sectionsForSpy[0]?.id ?? '';
      for (const s of sectionsForSpy) {
        if (s.offsetTop <= scrollY) active = s.id;
      }
      if (active === currentActive) return;
      currentActive = active;
      navLinksForSpy.forEach((a) =>
        a.classList.toggle('active', a.dataset.id === active)
      );
    };
    const onScrollSpy = () => {
      if (spyScheduled) return;
      spyScheduled = true;
      requestAnimationFrame(() => {
        spyScheduled = false;
        updateActive();
      });
    };
    window.addEventListener('scroll', onScrollSpy, { passive: true });
    updateActive();
    cleanups.push(() => window.removeEventListener('scroll', onScrollSpy));

    // ============================================================
    // Keyboard : nav shortcuts + typed sequences (sudo / hack / help)
    // ============================================================
    let typedBuffer = '';

    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Typed-buffer easter eggs (sudo, help, hack)
      if (e.key.length === 1) {
        typedBuffer = (typedBuffer + e.key).slice(-12).toLowerCase();
        if (typedBuffer.endsWith('hack')) {
          toggleHackerMode();
          typedBuffer = '';
        } else if (typedBuffer.endsWith('sudo')) {
          window.dispatchEvent(new CustomEvent('cmd:sudo'));
          typedBuffer = '';
        } else if (typedBuffer.endsWith('help')) {
          window.dispatchEvent(new CustomEvent('cmd:palette'));
          typedBuffer = '';
        }
      }

      if (e.key.toLowerCase() === 'l') {
        const target = locale === 'en' ? '/fr' : '/';
        window.location.href = target + window.location.hash;
        return;
      }

      if (/^[0-6]$/.test(e.key)) {
        const id = SECTION_IDS[parseInt(e.key, 10)];
        const el = id ? document.getElementById(id) : null;
        if (el) {
          window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('keydown', onKey);
    cleanups.push(() => window.removeEventListener('keydown', onKey));

    // Hacker mode toggle (F)
    function toggleHackerMode() {
      const body = document.body;
      body.classList.toggle('hacker-mode');
      // Auto-disable after 30s
      if (body.classList.contains('hacker-mode')) {
        window.setTimeout(() => body.classList.remove('hacker-mode'), 30000);
      }
    }

    return () => {
      for (const fn of cleanups) fn();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [locale]);

  return null;
}

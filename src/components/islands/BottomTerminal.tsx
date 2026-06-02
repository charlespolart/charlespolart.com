import { useEffect, useRef, useState } from 'react';

interface Props {
  locale: 'en' | 'fr';
}

type HistoryEntry = {
  cmd: string;
  output: string | string[];
  kind?: 'text' | 'error' | 'ok' | 'ascii';
};

const COFFEE = `
   ( (
    ) )
  .____.
  |    |]
   \\__/
`;

const ASCII_LOGO = `
   ____ _   _    _    ____  _     _____ ____
  / ___| | | |  / \\  |  _ \\| |   | ____/ ___|
 | |   | |_| | / _ \\ | |_) | |   |  _| \\___ \\
 | |___|  _  |/ ___ \\|  _ <| |___| |___ ___) |
  \\____|_| |_/_/   \\_\\_| \\_\\_____|_____|____/
  ____   ___  _        _    ____ _____
 |  _ \\ / _ \\| |      / \\  |  _ \\_   _|
 | |_) | | | | |     / _ \\ | |_) || |
 |  __/| |_| | |___ / ___ \\|  _ < | |
 |_|    \\___/|_____/_/   \\_\\_| \\_\\|_|
`;

const JOKES = [
  '"Why do programmers prefer dark mode? Because light attracts bugs."',
  '"There are 10 types of people : those who understand binary, and those who don\'t."',
  '"Why did the developer go broke ? He used up all his cache."',
  '"A SQL query walks into a bar, approaches two tables, and asks : may I join you ?"',
  '"99 little bugs in the code, 99 little bugs. Take one down, patch it around — 117 little bugs in the code."',
  '"!false — it\'s funny because it\'s true."',
  '"Two bytes meet. First says : you look a bit off. Other replies : maybe my parity is bad."',
  '"How many programmers does it take to change a lightbulb ? None. It\'s a hardware problem."',
  '"There\'s no place like 127.0.0.1."',
  '"To understand recursion, you must first understand recursion."',
  '"Real programmers count from 0."',
  '"There are two hard things in CS : cache invalidation, naming things, and off-by-one errors."',
  '"My code doesn\'t work, I have no idea why. My code works, I have no idea why."',
  '"It\'s not a bug, it\'s an undocumented feature."',
  '"git push origin master --force is a love letter to your future self."',
  '"Hardware : the part of a computer you can kick. Software : the part you can only swear at."',
  '"Programmer\'s wife asks him to buy a loaf of bread, and if they have eggs, get a dozen. He came back with 12 loaves."',
];

const KONAMI_HINT = '↑↑↓↓←→←→ba — try it';

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function BottomTerminal({ locale }: Props) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [focused, setFocused] = useState(false);
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputLineRef = useRef<HTMLDivElement>(null);

  const t =
    locale === 'fr'
      ? { notFound: 'commande introuvable', tryHelp: 'tape "help"', click: 'clique pour taper · essaie "help"' }
      : { notFound: 'command not found',    tryHelp: 'try "help"',  click: 'click to type · try "help"' };

  function scrollSection(id: string) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
  }

  function execute(raw: string): HistoryEntry | null {
    const cmd = raw.trim();
    if (!cmd) return null;
    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(' ');
    const c = name.toLowerCase();

    switch (c) {
      case 'help':
      case '?':
        return {
          cmd, kind: 'text',
          output: [
            'navigation : whoami · about · skills · experience · projects · education · contact',
            'actions    : cv · glitch · boom · matrix',
            'unix-ish   : ls · cat <file> · pwd · cd <dir> · echo <…> · date · clear · exit',
            'fun        : coffee · joke · 42 · sandwich · konami · vim · ascii · rm',
          ],
        };

      case 'ls':
        return { cmd, output: 'cv.ts  profile.json  README.md  projects/  stack/  contact/  .secrets' };
      case 'cat': {
        if (!arg) return { cmd, kind: 'error', output: 'cat : usage : cat <file>' };
        if (arg.startsWith('cv')) return { cmd, kind: 'ok', output: '→ try `cv` to download the real one.' };
        if (arg === '.secrets') return { cmd, kind: 'error', output: 'permission denied (nice try)' };
        if (arg === 'README.md') return { cmd, output: '# charlespolart.com — boot terminal CV. built with Astro + React + GSAP.' };
        if (arg === 'profile.json') return { cmd, output: '{ name: "charles", role: "full stack dev", available: true }' };
        return { cmd, kind: 'error', output: `cat : ${arg} : no such file` };
      }
      case 'pwd': return { cmd, output: '/home/charles' };
      case 'cd': return { cmd, output: arg ? `(pretending to cd to ${arg})` : '~' };
      case 'echo': return { cmd, output: arg };
      case 'date': return { cmd, output: new Date().toString() };
      case 'whoami':
      case 'about':
      case 'skills':
      case 'experience':
      case 'projects':
      case 'education':
      case 'contact':
        scrollSection(c);
        return { cmd, kind: 'ok', output: `→ scrolled to ${c}` };

      case 'cv':
      case 'resume':
      case 'download':
        window.dispatchEvent(new CustomEvent('cmd:cv-download'));
        return { cmd, kind: 'ok', output: 'spawning cv.pdf build…' };
      case 'sudo':
        window.dispatchEvent(new CustomEvent('cmd:sudo'));
        return { cmd, output: '[opening sudo prompt]' };
      case 'glitch': {
        // Full-page glitch effect — visible from the terminal area.
        document.body.classList.add('page-glitch');
        setTimeout(() => document.body.classList.remove('page-glitch'), 700);
        const n = document.querySelector<HTMLElement>('[data-name]');
        if (n) {
          n.classList.add('glitch');
          setTimeout(() => n.classList.remove('glitch'), 1200);
        }
        return { cmd, kind: 'ok', output: 'system glitched.' };
      }
      case 'boom':
      case 'explode': {
        // Big spark burst at center of viewport
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        for (let i = 0; i < 40; i++) {
          const el = document.createElement('span');
          el.className = 'spark';
          el.textContent = '*+·01◇◆▪'[Math.floor(Math.random() * 8)];
          el.style.left = cx + 'px';
          el.style.top = cy + 'px';
          document.body.appendChild(el);
          const a = (Math.PI * 2 * i) / 40 + Math.random();
          const d = 150 + Math.random() * 200;
          el.animate(
            [
              { transform: 'translate(-50%,-50%) translate(0,0) scale(1)', opacity: 1 },
              { transform: `translate(-50%,-50%) translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(0.3)`, opacity: 0 },
            ],
            { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(0.2,0.7,0.3,1)' }
          ).onfinish = () => el.remove();
        }
        return { cmd, kind: 'ok', output: '💥' };
      }
      case 'matrix':
        window.dispatchEvent(new CustomEvent('matrix:burst'));
        return { cmd, kind: 'ok', output: 'reality has been compromised. enjoy 10s of full immersion.' };

      case '42':
      case 'meaning':
      case 'meaning-of-life':
        return { cmd, output: 'the answer to life, the universe, and everything.' };

      case 'coffee':
      case 'caffeine':
        return { cmd, kind: 'ascii', output: COFFEE };
      case 'ascii':
      case 'logo':
      case 'banner':
        return { cmd, kind: 'ascii', output: ASCII_LOGO };
      case 'joke':
      case 'lol':
        return { cmd, output: pick(JOKES) };
      case 'sandwich':
        return { cmd, kind: 'error', output: 'what ? make it yourself.' };
      case 'konami':
      case 'k':
        // Blur the input so arrow keys + b/a aren't captured by the bterm
        // (history nav + text input) while the user enters the sequence.
        setTimeout(() => inputRef.current?.blur(), 0);
        return { cmd, output: KONAMI_HINT };

      case 'vim':
        return { cmd, kind: 'error', output: `vim : nope. last person who opened it never came back.` };

      case 'rm':
        if (!arg)
          return { cmd, kind: 'error', output: 'rm : missing operand. (i would have refused anyway.)' };
        if (arg.includes('-rf') && arg.includes('/'))
          return { cmd, kind: 'error', output: 'permission denied (you absolute madman).' };
        return { cmd, kind: 'error', output: `rm : nope, ${arg} stays.` };

      case 'clear':
      case 'cls':
        setHistory([]);
        return null;
      case 'exit':
      case 'quit':
      case 'bye':
        setHistory([{ cmd, kind: 'ok', output: 'bye 👋' }]);
        setTimeout(() => { setHistory([]); inputRef.current?.blur(); }, 1500);
        setInput('');
        return null;

      default:
        return { cmd, kind: 'error', output: `${c} : ${t.notFound}. ${t.tryHelp}.` };
    }
  }

  function submit() {
    if (!input.trim()) return;
    const result = execute(input);
    if (result) setHistory((h) => [...h, result].slice(-30));
    setCmdHistory((h) => [...h, input.trim()].slice(-80));
    setHistIdx(-1);
    setInput('');
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      // 1. scroll the bterm's internal content to its bottom
      const el = containerRef.current;
      if (el) el.scrollTop = el.scrollHeight;
      // 2. scroll the page to its very bottom
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'auto',
      });
    });
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    // Any keystroke (arrows included) keeps the input visible at the bottom.
    scrollToBottom();

    // Ctrl+C — abort the current line (like a real shell). Skip if there's
    // a text selection so the browser copy still works.
    if (e.key === 'c' && e.ctrlKey && !e.metaKey) {
      const sel = window.getSelection();
      if (sel && sel.toString().length > 0) return;
      e.preventDefault();
      setHistory((h) => [...h, { cmd: input + '^C', output: '' }].slice(-30));
      setInput('');
      setHistIdx(-1);
      return;
    }

    // Ctrl+L — clear the screen (preserves the current input line, like bash).
    // preventDefault stops the browser from focusing the address bar.
    if (e.key === 'l' && e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      setHistory([]);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const ni = Math.min(cmdHistory.length - 1, histIdx + 1);
      const next = cmdHistory[cmdHistory.length - 1 - ni];
      setHistIdx(ni);
      setInput(next);
      setCursorPos(next.length);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx <= 0) { setHistIdx(-1); setInput(''); setCursorPos(0); return; }
      const ni = histIdx - 1;
      const next = cmdHistory[cmdHistory.length - 1 - ni];
      setHistIdx(ni);
      setInput(next);
      setCursorPos(next.length);
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  }

  // Skip the very first run — otherwise mounting the (client:load) bterm
  // would yank the page straight to the bottom on every refresh.
  const didInitialScroll = useRef(false);
  useEffect(() => {
    if (!didInitialScroll.current) {
      didInitialScroll.current = true;
      return;
    }
    scrollToBottom();
  }, [history.length, input, histIdx]);

  // Mirror the input's actual caret position (selectionStart) so the visible
  // caret moves with the user's left/right arrow + click navigation.
  useEffect(() => {
    const sync = () => {
      if (document.activeElement === inputRef.current) {
        setCursorPos(inputRef.current?.selectionStart ?? 0);
      }
    };
    document.addEventListener('selectionchange', sync);
    return () => document.removeEventListener('selectionchange', sync);
  }, []);

  // External trigger : `bterm:run` event with detail = command string. Scrolls
  // the bterm into view, focuses it, and executes the command — so the boot
  // line "type help" can be honored from anywhere on the page.
  const executeRef = useRef(execute);
  executeRef.current = execute;
  useEffect(() => {
    const onRun = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const cmd = typeof detail === 'string' ? detail : null;
      if (!cmd) return;
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
        const result = executeRef.current(cmd);
        if (result) setHistory((h) => [...h, result].slice(-30));
        setCmdHistory((h) => [...h, cmd].slice(-80));
        setHistIdx(-1);
      }, 650);
    };
    window.addEventListener('bterm:run', onRun);
    return () => window.removeEventListener('bterm:run', onRun);
  }, []);

  return (
    <div
      className="bterm"
      ref={containerRef}
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
    >
      {history.map((h, i) => (
        <div key={i} className={`bterm-entry bterm-k-${h.kind ?? 'text'}`}>
          <div className="bterm-cmd-line">
            <span className="bterm-prompt-c">charles@cv:~$</span>{' '}
            <span className="bterm-cmd-text">{h.cmd}</span>
          </div>
          {h.kind === 'ascii' ? (
            <pre className="bterm-ascii">{h.output as string}</pre>
          ) : Array.isArray(h.output) ? (
            h.output.map((line, j) => <div key={j} className="bterm-line-out">{line}</div>)
          ) : h.output ? (
            <div className="bterm-line-out">{h.output}</div>
          ) : null}
        </div>
      ))}
      <div className="bterm-input-line" ref={inputLineRef}>
        <span className="bterm-prompt-c">charles@cv:~$</span>{' '}
        <span className="bterm-typed">{input.slice(0, cursorPos)}</span>
        <span className={'bterm-caret' + (focused ? ' on' : '')}>
          {input.slice(cursorPos, cursorPos + 1) || ' '}
        </span>
        <span className="bterm-typed">{input.slice(cursorPos + 1)}</span>
        <input
          ref={inputRef}
          className="bterm-hidden-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="terminal input"
        />
      </div>
      {!focused && history.length === 0 && (
        <div className="bterm-hint">{t.click}</div>
      )}
    </div>
  );
}

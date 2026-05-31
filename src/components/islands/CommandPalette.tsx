import { useEffect, useRef, useState } from 'react';

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
};

interface Props {
  locale: 'en' | 'fr';
}

export default function CommandPalette({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = locale === 'fr'
    ? {
        placeholder: 'tapez une commande…',
        empty: 'Aucune commande trouvée.',
        hint: 'navigation',
        hintActions: 'actions',
        kbdOpen: 'ouvrir',
        kbdSelect: 'sélectionner',
        kbdClose: 'fermer',
      }
    : {
        placeholder: 'type a command…',
        empty: 'No commands found.',
        hint: 'navigation',
        hintActions: 'actions',
        kbdOpen: 'open',
        kbdSelect: 'select',
        kbdClose: 'close',
      };

  const commands: Cmd[] = [
    { id: 'goto-whoami',    label: locale === 'fr' ? 'Aller à whoami'        : 'Go to whoami',     hint: 'nav', run: () => scrollTo('whoami') },
    { id: 'goto-about',     label: locale === 'fr' ? 'Aller à about'         : 'Go to about',      hint: 'nav', run: () => scrollTo('about') },
    { id: 'goto-skills',    label: locale === 'fr' ? 'Aller à skills'        : 'Go to skills',     hint: 'nav', run: () => scrollTo('skills') },
    { id: 'goto-experience',label: locale === 'fr' ? 'Aller à experience'    : 'Go to experience', hint: 'nav', run: () => scrollTo('experience') },
    { id: 'goto-projects',  label: locale === 'fr' ? 'Aller à projects'      : 'Go to projects',   hint: 'nav', run: () => scrollTo('projects') },
    { id: 'goto-education', label: locale === 'fr' ? 'Aller à education'     : 'Go to education',  hint: 'nav', run: () => scrollTo('education') },
    { id: 'goto-contact',   label: locale === 'fr' ? 'Aller à contact'       : 'Go to contact',    hint: 'nav', run: () => scrollTo('contact') },
    { id: 'lang-toggle',    label: locale === 'fr' ? 'Switch to English'     : 'Passer en français', hint: 'lang', run: () => { window.location.href = locale === 'en' ? '/fr' : '/'; } },
    { id: 'cv-download',    label: locale === 'fr' ? 'Télécharger le CV (PDF)' : 'Download CV (PDF)', hint: 'action', run: () => window.dispatchEvent(new CustomEvent('cmd:cv-download')) },
    { id: 'open-github',    label: 'GitHub → github.com/charlespolart',      hint: 'link', run: () => window.open('https://github.com/charlespolart', '_blank') },
    { id: 'open-linkedin',  label: 'LinkedIn',                                hint: 'link', run: () => window.open('https://linkedin.com/in/charles-polart-638182170', '_blank') },
    { id: 'send-mail',      label: locale === 'fr' ? 'Envoyer un mail'       : 'Send email', hint: 'link', run: () => { window.location.href = 'mailto:charles.polart@hotmail.fr'; } },
    { id: 'sudo',           label: 'sudo',                                     hint: 'easter egg', run: () => window.dispatchEvent(new CustomEvent('cmd:sudo')) },
  ];

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
  }

  const filtered = commands.filter((c) =>
    query.trim() === '' || c.label.toLowerCase().includes(query.toLowerCase()) || c.id.includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((i) => Math.min(filtered.length - 1, i + 1)); return; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActive((i) => Math.max(0, i - 1)); return; }
      if (e.key === 'Enter')     { e.preventDefault(); const c = filtered[active]; if (c) { c.run(); setOpen(false); setQuery(''); } return; }
    };
    window.addEventListener('keydown', onKey);
    const onOpen = () => setOpen(true);
    window.addEventListener('cmd:palette', onOpen as EventListener);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('cmd:palette', onOpen as EventListener);
    };
  }, [open, filtered, active]);

  useEffect(() => {
    if (open) {
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      setQuery('');
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="cmd-overlay" onClick={() => setOpen(false)}>
      <div className="cmd-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-row">
          <span className="cmd-prompt">charles@cv:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            placeholder={t.placeholder}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <ul className="cmd-list">
          {filtered.length === 0 && <li className="cmd-empty">{t.empty}</li>}
          {filtered.map((c, i) => (
            <li
              key={c.id}
              className={'cmd-item' + (i === active ? ' active' : '')}
              onMouseEnter={() => setActive(i)}
              onClick={() => { c.run(); setOpen(false); setQuery(''); }}
            >
              <span className="cmd-label">{c.label}</span>
              {c.hint && <span className="cmd-hint">{c.hint}</span>}
            </li>
          ))}
        </ul>
        <div className="cmd-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> {t.hint}</span>
          <span><kbd>↵</kbd> {t.kbdSelect}</span>
          <span><kbd>esc</kbd> {t.kbdClose}</span>
        </div>
      </div>
    </div>
  );
}

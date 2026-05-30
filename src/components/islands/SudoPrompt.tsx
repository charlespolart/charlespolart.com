import { useEffect, useRef, useState } from 'react';

interface Props {
  locale: 'en' | 'fr';
}

type Stage = 'prompt' | 'auth' | 'success';

export default function SudoPrompt({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>('prompt');
  const [pwd, setPwd] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const t = locale === 'fr'
    ? {
        title: '[sudo] mot de passe pour charles :',
        auth: 'Authentification…',
        success: '✓ Privilèges root accordés. Bienvenue.',
        hint: '(rien ne s\'affiche pendant la saisie, c\'est normal)',
        close: 'fermer',
      }
    : {
        title: '[sudo] password for charles:',
        auth: 'Authenticating…',
        success: '✓ Root privileges granted. Welcome.',
        hint: '(nothing shows while typing, that\'s normal)',
        close: 'close',
      };

  useEffect(() => {
    const onOpen = () => {
      setStage('prompt');
      setPwd('');
      setOpen(true);
    };
    window.addEventListener('cmd:sudo', onOpen as EventListener);
    return () => window.removeEventListener('cmd:sudo', onOpen as EventListener);
  }, []);

  useEffect(() => {
    if (open && stage === 'prompt') {
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open, stage]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function submit() {
    setStage('auth');
    setTimeout(() => {
      setStage('success');
      setTimeout(() => setOpen(false), 1800);
    }, 700);
  }

  if (!open) return null;

  return (
    <div className="sudo-overlay" onClick={() => setOpen(false)}>
      <div className="sudo-panel" onClick={(e) => e.stopPropagation()}>
        <div className="sudo-line">{t.title}</div>
        {stage === 'prompt' && (
          <form
            className="sudo-form"
            onSubmit={(e) => { e.preventDefault(); submit(); }}
          >
            <input
              ref={inputRef}
              type="password"
              className="sudo-input"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              autoComplete="off"
            />
            <div className="sudo-cursor"></div>
            <div className="sudo-hint">{t.hint}</div>
          </form>
        )}
        {stage === 'auth' && (
          <div className="sudo-line dim">{t.auth}</div>
        )}
        {stage === 'success' && (
          <div className="sudo-line ok">{t.success}</div>
        )}
        <div className="sudo-foot"><kbd>esc</kbd> {t.close}</div>
      </div>
    </div>
  );
}

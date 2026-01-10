'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type A11yState = {
  textSize: 'normal' | 'large' | 'xlarge';
  underlineLinks: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
};

const DEFAULTS: A11yState = {
  textSize: 'normal',
  underlineLinks: false,
  highContrast: false,
  reduceMotion: false,
};

const KEY = 'a11y';

function applyToDocument(s: A11yState) {
  const d = document.documentElement;
  d.classList.remove('a11y-lgtext', 'a11y-xltext', 'a11y-underline-links', 'a11y-high-contrast', 'a11y-reduce-motion');
  if (s.textSize === 'large') d.classList.add('a11y-lgtext');
  if (s.textSize === 'xlarge') d.classList.add('a11y-xltext');
  if (s.underlineLinks) d.classList.add('a11y-underline-links');
  if (s.highContrast) d.classList.add('a11y-high-contrast');
  if (s.reduceMotion) d.classList.add('a11y-reduce-motion');
}

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<A11yState>(DEFAULTS);
  const [mounted, setMounted] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstControlRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef<HTMLDivElement>(null);

  // Load saved state after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(KEY);
      const parsed = saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
      setState(parsed);
      applyToDocument(parsed);
    } catch {}
  }, []);

  // Save → apply (only after mounted to avoid hydration issues)
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      applyToDocument(state);
    } catch {}
  }, [state, mounted]);

  // Alt+Shift+A opens
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && (e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setOpen(true);
      }
      if (open && e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Focus management: when opening, focus first control; when closing, restore to trigger
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstControlRef.current?.focus(), 0);
      // lock scroll
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      return () => {
        clearTimeout(t);
        document.documentElement.style.overflow = prev;
        triggerRef.current?.focus();
      };
    }
  }, [open]);

  // Focus trap within the panel (Tab loops)
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const root = panelRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusables).filter(el => !el.hasAttribute('disabled'));
      if (list.length === 0) return;

      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  // Helpers
  const setText = (size: A11yState['textSize']) => {
    setState(s => ({ ...s, textSize: size }));
    liveRef.current!.textContent = `Text size set to ${size}`;
  };
  const toggle = (k: keyof A11yState, label: string) => () => {
    setState(s => {
      const next = { ...s, [k]: !s[k] };
      liveRef.current!.textContent = `${label} ${next[k] ? 'on' : 'off'}`;
      return next;
    });
  };
  const reset = () => {
    setState(DEFAULTS);
    liveRef.current!.textContent = 'Accessibility options reset to defaults';
  };

  const textActive = useMemo(() => state.textSize, [state.textSize]);

  return (
    <>
      {/* Floating trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-2xl border bg-white/90 dark:bg-slate-900/90 px-4 py-2 text-sm shadow hover:bg-white dark:hover:bg-slate-800 dark:text-white"
        aria-haspopup="dialog"
        aria-controls="a11y-menu"
        aria-expanded={open}
      >
        Accessibility
      </button>

      {/* Live region for announcements */}
      <div ref={liveRef} className="sr-only" role="status" aria-live="polite" />

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="a11y-title" id="a11y-menu">
          {/* Backdrop */}
          <button className="absolute inset-0 bg-black/30" aria-label="Close menu" onClick={() => setOpen(false)} />
          {/* Panel */}
          <div ref={panelRef} className="absolute bottom-0 right-0 m-4 w-[min(420px,calc(100vw-1rem))] rounded-2xl border bg-white dark:bg-slate-950 shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 id="a11y-title" className="text-sm font-semibold">Accessibility options</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-white"
              >
                Close
              </button>
            </div>

            <div className="p-4 space-y-4 text-sm">
              {/* Text size */}
              <div>
                <div className="font-medium">Text size</div>
                <div className="mt-2 flex gap-2">
                  <button
                    ref={firstControlRef}
                    className={`rounded-xl border px-3 py-1.5 ${textActive === 'normal' ? 'bg-slate-100 dark:bg-slate-800 dark:text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-100'}`}
                    onClick={() => setText('normal')}
                    aria-pressed={textActive === 'normal'}
                  >Normal</button>
                  <button
                    className={`rounded-xl border px-3 py-1.5 ${textActive === 'large' ? 'bg-slate-100 dark:bg-slate-800 dark:text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-100'}`}
                    onClick={() => setText('large')}
                    aria-pressed={textActive === 'large'}
                  >Large</button>
                  <button
                    className={`rounded-xl border px-3 py-1.5 ${textActive === 'xlarge' ? 'bg-slate-100 dark:bg-slate-800 dark:text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-100'}`}
                    onClick={() => setText('xlarge')}
                    aria-pressed={textActive === 'xlarge'}
                  >Extra large</button>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid gap-2">
                <button
                  onClick={toggle('underlineLinks', 'Underline links')}
                  aria-pressed={state.underlineLinks}
                  className={`rounded-xl border px-3 py-1.5 text-left ${state.underlineLinks ? 'bg-slate-100 dark:bg-slate-800 dark:text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-100'}`}
                >Underline links</button>

                <button
                  onClick={toggle('highContrast', 'High contrast')}
                  aria-pressed={state.highContrast}
                  className={`rounded-xl border px-3 py-1.5 text-left ${state.highContrast ? 'bg-slate-100 dark:bg-slate-800 dark:text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-100'}`}
                >High contrast</button>

                <button
                  onClick={toggle('reduceMotion', 'Reduce motion')}
                  aria-pressed={state.reduceMotion}
                  className={`rounded-xl border px-3 py-1.5 text-left ${state.reduceMotion ? 'bg-slate-100 dark:bg-slate-800 dark:text-white' : 'hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-100'}`}
                >Reduce motion</button>
              </div>

              {/* Links & Reset */}
              <div className="flex flex-wrap gap-2 pt-2">
                <a href="/accessibility" className="rounded-xl border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-100">Accessibility statement</a>
                <a href="mailto:jleecloak2011@gmail.com?subject=Accessibility%20feedback%20for%20Shadesblue" className="rounded-xl border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-100">Report an issue</a>
                <button onClick={reset} className="rounded-xl border px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-100">Reset</button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">Tip: Press <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> to open this menu.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

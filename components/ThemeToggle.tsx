'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const next = saved ?? (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next === 'dark');
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
      aria-label="Toggle theme"
    >
      <span className="hidden sm:inline">{/* text on larger screens */}Theme</span>
      <span className="sm:hidden">☼/☾</span>
    </button>
  );
}

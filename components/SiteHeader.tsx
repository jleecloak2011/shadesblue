// components/SiteHeader.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import logo from '@/public/images/logo_2025_W.png';

const NAV = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/what-i-do', label: 'What I Do' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close sheet on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll + focus first link when mobile menu opens
  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      const prev = html.style.overflow;
      html.style.overflow = 'hidden';
      const t = setTimeout(() => firstLinkRef.current?.focus(), 0);
      return () => { html.style.overflow = prev; clearTimeout(t); };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sb-header-dark border-b border-slate-800 text-white">
      {/* Skip link for a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-sky-600 text-white px-3 py-2 rounded"
      >
        Skip to content
      </a>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer" aria-label="Shadesblue home">
          <div className="relative h-16 w-[220px] sm:h-20 sm:w-[280px]">
            <Image src={logo} alt="Shadesblue logo" fill priority className="object-contain" />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={[
                  // larger, clearer text
                  'text-[16px] md:text-[17px] leading-none cursor-pointer',
                  // hover/active visuals
                  active
                    ? 'text-white font-semibold underline underline-offset-4'
                    : 'text-slate-100/90 hover:text-white hover:underline underline-offset-4',
                  // focus ring
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg px-1.5 py-1'
                ].join(' ')}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Optional résumé button (remove if not wanted) */}
          <Link
            href="/resume.pdf"
            className="inline-flex items-center gap-2 h-10 px-3 rounded-xl border border-slate-300/60 text-[15px] text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
            aria-label="Open résumé PDF"
          >
            Résumé <span aria-hidden>↗</span>
          </Link>

          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (full-screen sheet) */}
      {open && (
        <div id="mobile-menu" className="md:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
          {/* backdrop */}
          <button
            className="absolute inset-0 bg-black/40 cursor-pointer"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="absolute inset-x-0 top-0 bg-slate-950 text-white rounded-b-2xl border-b border-slate-800 shadow-xl">
            <div className="px-4 py-3 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 cursor-pointer" aria-label="Shadesblue home">
                <div className="relative h-12 w-[180px]">
                  <Image src={logo} alt="Shadesblue logo" fill className="object-contain" />
                </div>
              </Link>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <nav className="px-4 pb-6 pt-2 flex flex-col gap-1">
              {NAV.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    ref={i === 0 ? firstLinkRef : undefined}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'rounded-xl px-3 py-2 text-[17px] leading-tight transition-colors cursor-pointer',
                      active ? 'bg-slate-800 text-white font-semibold' : 'text-slate-200 hover:bg-slate-800'
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <Link
                href="/resume.pdf"
                className="mt-2 inline-flex items-center gap-2 h-11 px-3 rounded-xl border border-slate-700 text-[16px] hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
              >
                Résumé <span aria-hidden>↗</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

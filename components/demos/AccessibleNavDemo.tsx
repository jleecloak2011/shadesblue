'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function getFocusable(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'
    )
  ).filter(el => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
}

export default function AccessibleNavDemo() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  // open: store last focus, lock scroll, focus first item
  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      lastFocusRef.current = (document.activeElement as HTMLElement) ?? null;
      const prevOverflow = html.style.overflow;
      html.style.overflow = "hidden";
      const t = setTimeout(() => firstLinkRef.current?.focus(), 0);
      return () => {
        html.style.overflow = prevOverflow;
        clearTimeout(t);
      };
    }
  }, [open]);

  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setTimeout(() => toggleRef.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable(panel);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    panel.addEventListener("keydown", handler as any);
    return () => panel.removeEventListener("keydown", handler as any);
  }, [open]);

  // Close and restore focus when leaving
  const close = () => {
    setOpen(false);
    const el = lastFocusRef.current;
    if (el) setTimeout(() => el.focus(), 0);
  };

  return (
    <div className="relative">
      {/* Skip link */}
      <a
        href="#demo-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 rounded-md bg-white px-3 py-1.5 text-sm shadow"
      >
        Skip to main content
      </a>

      <header className="border-b bg-white/80 dark:bg-slate-900/60 backdrop-blur">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">
            <span className="text-brand-blue">Shades</span>blue
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Demo primary">
            <Link href="#" className="hover:text-brand-blue text-sm">Portfolio</Link>
            <Link href="#" className="hover:text-brand-blue text-sm">What I Do</Link>
            <Link href="#" className="hover:text-brand-blue text-sm">Contact</Link>
          </nav>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-controls="demo-mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile sheet */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          id="demo-mobile-menu"
          className="md:hidden fixed inset-0 z-50"
        >
          {/* backdrop */}
          <button className="absolute inset-0 bg-black/30" aria-label="Close menu" onClick={close} />

          {/* panel */}
          <div
            ref={panelRef}
            className="absolute inset-x-0 top-0 rounded-b-2xl border-b bg-white dark:bg-slate-950 shadow-xl"
          >
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="font-semibold">
                <span className="text-brand-blue">Shades</span>blue
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                aria-label="Close menu"
                onClick={close}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <nav className="px-4 pb-6 pt-2 flex flex-col gap-1" aria-label="Demo primary mobile">
              <Link ref={firstLinkRef} href="#" className="rounded-xl px-3 py-2 text-base hover:bg-slate-100 dark:hover:bg-slate-800">
                Portfolio
              </Link>
              <Link href="#" className="rounded-xl px-3 py-2 text-base hover:bg-slate-100 dark:hover:bg-slate-800">
                What I Do
              </Link>
              <Link href="#" className="rounded-xl px-3 py-2 text-base hover:bg-slate-100 dark:hover:bg-slate-800">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Demo body so the skip link has a target */}
      <section className="px-4 py-8">
        <p className="text-sm text-slate-500">
          This is demo content so the skip link has a valid target and Tab order is clear.
        </p>
        <button className="mt-3 rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
          Focus me
        </button>
      </section>
    </div>
  );
}

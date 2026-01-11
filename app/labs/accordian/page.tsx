'use client';
import type { Metadata } from 'next';
import { A11yAccordion } from '@/components/A11yAccordion';

export const metadata: Metadata = {
  title: 'Labs: Accessible Accordion',
  robots: { index: false, follow: false }, // keep it off Google
};

export default function Page() {
  return (
    <section className="container mx-auto px-4 pt-24 md:pt-28 pb-12 max-w-3xl">
      <h1 className="text-3xl font-semibold mb-4">Accessible Accordion (Demo)</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Semantics-first, keyboard/screen-reader friendly. Try Tab, Enter/Space, and zoom.
      </p>

      <div className="space-y-3">
        <A11yAccordion title="What is this?">
          <p>Native <code>button</code>, <code>aria-expanded</code>, <code>aria-controls</code>, and a labelled region.</p>
        </A11yAccordion>

        <A11yAccordion title="Keyboard support">
          <ul className="list-disc pl-5">
            <li>Tab focuses the trigger</li>
            <li>Enter/Space toggles</li>
            <li>Visible focus ring</li>
          </ul>
        </A11yAccordion>
      </div>
    </section>
  );
}

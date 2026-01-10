import Link from 'next/link';

export const metadata = {
  title: 'What I Do · Shadesblue',
  description: 'Front-end, back-end, and mapping/data work with a focus on accessibility and performance.',
};

export default function WhatIDo() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2">What I Do</h1>
      <p className="text-slate-600 dark:text-slate-300 max-w-2xl mb-8">
        I build fast, accessible sites and tools end-to-end—front to back—with clear IA, performance budgets, and clean UX.
      </p>

      {/* Capabilities */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Front-end</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-300 text-sm">
            <li>Next.js + React (App Router)</li>
            <li>Angular (v2+), AngularJS (legacy)</li>
            <li>TypeScript, RxJS (where applicable)</li>
            <li>Tailwind, responsive layouts, dark mode</li>
            <li>Accessible nav, focus management, ARIA</li>
          </ul>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Back-end</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-300 text-sm">
            <li>PHP/MySQL APIs & integrations</li>
            <li>Data modeling, caching, secure auth</li>
            <li>CMS/editor workflows</li>
          </ul>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="text-xl font-semibold">Mapping & Data</h2>
          <ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-300 text-sm">
            <li>Leaflet maps + custom markers</li>
            <li>Search, filters, results UX</li>
            <li>Analytics & event tracking</li>
          </ul>
        </div>
      </div>

      {/* How I work */}
      <h2 className="mt-12 text-2xl font-semibold">How I work</h2>
      <ol className="mt-4 grid gap-4 md:grid-cols-4">
        <li className="rounded-2xl border p-5">
          <h3 className="font-medium">Discover</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Goals, users, constraints, metrics.</p>
        </li>
        <li className="rounded-2xl border p-5">
          <h3 className="font-medium">Design</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">IA, wireframes, components, a11y notes.</p>
        </li>
        <li className="rounded-2xl border p-5">
          <h3 className="font-medium">Build</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">UI, APIs/data, tests, instrumentation.</p>
        </li>
        <li className="rounded-2xl border p-5">
          <h3 className="font-medium">Ship</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Perf/a11y pass, docs, handoff & support.</p>
        </li>
      </ol>

      {/* Accessibility summary */}
      <h2 id="accessibility" className="mt-12 text-2xl font-semibold">Website Accessibility</h2>
      <div className="mt-4 rounded-2xl border p-6">
        <p className="text-slate-600 dark:text-slate-300">
          This site includes an Accessibility Menu with options for larger text, underlined links, high contrast,
          reduced motion, and dark mode. Preferences persist between visits. Open it from the bottom-right button or with{' '}
          <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>.
        </p>
        <ul className="mt-3 list-disc pl-5 text-slate-600 dark:text-slate-300">
          <li><strong>Text size:</strong> Normal, Large, Extra large</li>
          <li><strong>Underline links:</strong> Improve link visibility</li>
          <li><strong>High contrast:</strong> Black/white palette + clear focus</li>
          <li><strong>Reduce motion:</strong> Disables animations/transitions</li>
          <li><strong>Dark mode:</strong> Toggle in the header</li>
        </ul>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          I follow a keyboard-first workflow, test with Lighthouse and axe, and aim for WCAG 2.2 AA.
          Spot something? <a className="underline" href="mailto:jleecloak2011@gmail.com">Email me</a>.
        </p>
      </div>

      {/* CTAs */}
      <div className="mt-12 flex gap-3">
        <Link href="/portfolio" className="rounded-2xl border px-4 py-2">See portfolio</Link>
        <Link href="/contact" className="rounded-2xl bg-brand-blue text-white px-4 py-2">Get in touch</Link>
      </div>
    </section>
  );
}

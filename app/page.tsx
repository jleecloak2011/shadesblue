import Link from 'next/link';
import { Cta } from '@/components/Cta';

export default function Home() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-semibold tracking-tight mb-4">
        Building fast, accessible websites that ship.
      </h1>
      <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
        I’m Jason Martin. I design and build web apps for education and nonprofits—front to back.
        Explore selected projects and how I approach performance, accessibility, and maintainability.
      </p>
      <div className="mt-6 flex gap-3">
    <Cta href="/portfolio">View portfolio</Cta>
    <Cta href="/contact" variant="secondary">Contact</Cta>
  </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow">
          Lighthouse-first builds. Keyboard-friendly. Mobile-ready.
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border">
          Case studies with Problem → What I did → Impact.
        </div>
      </div>
    </section>
  );
}

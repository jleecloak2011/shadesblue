// app/portfolio/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import PortfolioClient from '@/components/PortfolioClient';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Portfolio · Shadesblue',
  description: 'Selected projects and demos by Jason Martin.',
};

export default function PortfolioPage() {
  return (
    <section className="container mx-auto px-4 pt-24 md:pt-28 pb-12">
      <h1 className="text-3xl font-semibold tracking-tight">Portfolio</h1>
      <p className="text-slate-600 dark:text-slate-300 mt-1">
        Selected launches for a large K-12 district—faster pages, accessible UI, and editor-friendly workflows.
      </p>

      {/* Top CTAs */}
      <div className="mt-3 flex flex-wrap gap-3">
        <Link
          href="/resume.pdf"
          className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-slate-300 text-slate-900 dark:text-white dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
          aria-label="Open résumé PDF"
        >
          Résumé <span aria-hidden>↗</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90 cursor-pointer"
          aria-label="Go to contact page"
        >
          Contact
        </Link>
      </div>

      {/* Client-side filtering & grid */}
      <div className="mt-6">
        <PortfolioClient />
      </div>

      {/* Bottom CTAs */}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/resume.pdf"
          className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-slate-300 text-slate-900 dark:text-white dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
          aria-label="Open résumé PDF"
        >
          Résumé <span aria-hidden>↗</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90 cursor-pointer"
          aria-label="Go to contact page"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}

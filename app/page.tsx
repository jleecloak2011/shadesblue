// app/page.tsx
import Link from 'next/link';
import { Cta } from '@/components/Cta';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  const slides = [
    {
      src: '/images/home/afterschool-memphis.webp',
      alt: 'After School Memphis — Explore Schools & Programs interface',
      caption: 'After School Memphis — search + filters + map experience',
      href: 'https://www.scsk12.org/afterschoolmemphis',
    },
    {
      src: '/images/home/we-are-901.webp',
      alt: 'We Are 901 campaign landing page',
      caption: 'Campaign landing page — We Are 901 / Somos 901',
      href: 'https://www.scsk12.org/',
    },
    {
      src: '/images/home/mscs-website.webp',
      alt: 'MSCS district website homepage layout',
      caption: 'MSCS district website — enterprise homepage modules',
      href: 'https://www.scsk12.org/',
    },
  ];

  return (
    <section className="relative z-0 container mx-auto px-4 pt-16 md:pt-20 pb-12">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* Left */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            Senior Front-End Developer & Web Engineer
          </h1>

          <p className="text-slate-600 dark:text-slate-300 max-w-2xl">
            I design, build, and ship fast, accessible web apps—end to end. From discovery and
            content gathering to front-end (React/Next.js, Tailwind), back-end (PHP/MySQL),
            deployment, and editor training, I deliver maintainable sites that work beautifully on
            mobile and meet WCAG 2.2 AA standards.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Cta href="/portfolio">View Portfolio</Cta>
            <Cta href="/contact" variant="secondary">Contact</Cta>
            <Link
              href="/Jason_Martin_Senior_Full_Stack_Developer.pdf"
              className="inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800/60"
              aria-label="Download résumé as PDF"
            >
              Download Résumé
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:justify-self-end">
          <HeroCarousel
            slides={slides}
            className="w-full lg:max-w-2xl"
            autoPlay
            intervalMs={6500}
          />
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Selected work screenshots — click a slide to view the live site.
          </p>
        </div>
      </div>

      {/* Keep your other sections below (feature grid / skills list) if you had them */}
    </section>
  );
}

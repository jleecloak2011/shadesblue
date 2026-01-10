// app/portfolio/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProject, projects } from '@/lib/projects';
import ProCarousel from '@/components/ProCarousel';
import Gallery from '@/components/Gallery';
import { use } from 'react';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

function toSlug(p: unknown): string {
  const slug = (p as any)?.slug;
  return Array.isArray(slug) ? String(slug[0]) : String(slug ?? '');
}
function toSrc(img: unknown): string | undefined {
  if (!img) return undefined;
  return typeof img === 'string' ? img : (img as any)?.src;
}
function toSlides(arr: unknown[], title: string) {
  return (arr ?? [])
    .map(toSrc)
    .filter(Boolean)
    .map((src, i) => ({ src: src as string, alt: `${title} — screenshot ${i + 1}` }));
}

export async function generateMetadata(props: { params: any }): Promise<Metadata> {
  const slug = toSlug(await props.params);
  const project = getProject(slug);
  if (!project) return { title: 'Project not found · Shadesblue' };
  const hero = toSrc((project as any).hero);
  return {
    title: `${project.title} · Shadesblue`,
    description: project.summary,
    openGraph: { images: hero ? [hero] : [] },
  };
}

export default function ProjectPage(props: { params: any }) {
  const slug = toSlug(use(props.params));
  const project = getProject(slug);

  if (!project) {
    return (
      <section className="container mx-auto px-4 py-12">
        Not found
      </section>
    );
  }

  const hero = toSrc((project as any).hero);
  const galleryArr = (project as any).gallery ?? (hero ? [hero] : []);
  const slides = Array.isArray(galleryArr) ? toSlides(galleryArr, project.title) : [];

  return (
    <article className="container mx-auto px-4 pt-24 md:pt-28 pb-14 max-w-5xl">
      <div className="mb-4">
        <Link href="/portfolio" className="no-underline text-sm text-slate-600 dark:text-slate-300 hover:underline">
          ← Back to portfolio
        </Link>
      </div>

      {/* Header */}
      <header className="mb-5">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="text-slate-500 text-sm mt-1">
          {project.role}{project.year ? ` · ${project.year}` : ''}
        </p>
      </header>

      {/* Visuals */}
      {slides.length >= 2 ? (
        // 1) Polished carousel hero
        <div className="my-6">
          <ProCarousel slides={slides} compact auto />
        </div>
      ) : hero ? (
        // 1) Single large visual (no misleading "click" caption here)
        <figure className="my-6">
          <div className="relative w-full max-w-[1100px]">
            <Image
              src={hero}
              alt={project.title}
              width={1600}
              height={900}
              className="w-full h-auto rounded-2xl border border-slate-200 dark:border-slate-800"
              sizes="(min-width: 1024px) 900px, 92vw"
              priority
            />
          </div>
        </figure>
      ) : null}

      {/* 2) Click-to-zoom Gallery (modal). Always render if we have at least one image. */}
      {slides.length > 0 && (
        <>
          <h2 className="mt-2 mb-3 text-lg font-semibold">Gallery</h2>
          <Gallery images={slides} thumbHeight={220} />
        </>
      )}

      {/* ===== Case study: cleaner, more readable cards ===== */}
      <div className="grid gap-6 mt-8">
        {/* Problem */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h2 className="m-0 mb-3 flex items-center gap-2 text-lg font-semibold">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-xs">P</span>
            Problem
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {(project as any).problem ?? 'Briefly describe the pain points (navigation, performance, accessibility, content sprawl, etc.).'}
          </p>
        </section>

        {/* What I did */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h2 className="m-0 mb-3 flex items-center gap-2 text-lg font-semibold">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-xs">W</span>
            What I did
          </h2>
          <ul className="space-y-2">
            {((project as any).did?.length
              ? (project as any).did
              : [
                  'Front end: componentized UI, responsive grid, keyboard flows',
                  'Back end: data modeling, queries, caching',
                  'Accessibility: landmarks, focus order, color contrast',
                  'Performance: optimized images, lazy routes, lighter JS',
                ]
            ).map((item: string) => (
              <li key={item} className="flex gap-3">
                <svg className="mt-1 h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.25 7.25a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 6.543-6.543a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Impact */}
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h2 className="m-0 mb-3 flex items-center gap-2 text-lg font-semibold">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-xs">I</span>
            Impact
          </h2>
          <ul className="space-y-2">
            {(((project as any).impact?.length ? (project as any).impact : (project as any).highlights) ?? []).map((item: string) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-500 dark:bg-slate-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Training (optional) */}
        {(project as any).training && (
          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h2 className="m-0 mb-3 flex items-center gap-2 text-lg font-semibold">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 text-xs">T</span>
              Training
            </h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {(project as any).training}
            </p>
          </section>
        )}

        {/* Stack + Live link */}
        {(project as any).stack?.length || (project as any).links?.live ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {(project as any).stack?.length && (
              <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <h2 className="m-0 mb-3 text-lg font-semibold">Stack</h2>
                <ul className="flex flex-wrap gap-2">
                  {(project as any).stack.map((s: string) => (
                    <li
                      key={s}
                      className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {(project as any).links?.live && (
              <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
                <h2 className="m-0 mb-3 text-lg font-semibold">Live site</h2>
                <a
                  href={(project as any).links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer"
                >
                  {(project as any).links.live}
                  <span aria-hidden>↗</span>
                </a>
              </section>
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}

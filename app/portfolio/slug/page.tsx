import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/projects';
import { projects } from '@/content/projects';

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const project = getProject(params.slug);
  if (!project) return { title: 'Project not found · Shadesblue' };
  return {
    title: `${project.title} · Shadesblue`,
    description: project.summary,
    alternates: { canonical: `/portfolio/${params.slug}` },
    openGraph: { images: project.hero ? [project.hero] : [] },
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const project = getProject(params.slug);
  if (!project) return notFound();

  const img = project.hero ?? '/images/photo-not-available.jpg';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: `https://www.shadesblue.com/portfolio/${project.slug}`,
    image: project.hero ? `https://www.shadesblue.com${project.hero}` : undefined,
    author: { '@type': 'Person', name: 'Jason Martin' },
    datePublished: String(project.year),
    about: project.tags,
  };

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <nav className="mb-4">
        <Link href="/portfolio" className="text-sm underline-offset-4 hover:underline">
          ← Back to portfolio
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-1 text-slate-500">
        {project.role} · {project.year}
        {project.attribution && project.source === 'employment' && (
          <> · <span className="italic">Employment project — {project.attribution}</span></>
        )}
      </p>

      {/* Tech stack chips */}
      <ul className="mt-3 flex flex-wrap gap-2">
        {project.stack.map(s => (
          <li key={s} className="text-[11px] rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5">
            {s}
          </li>
        ))}
      </ul>

      {/* Hero (cropped preview) + full view */}
      <div className="relative my-6 aspect-[16/9] rounded-2xl overflow-hidden border">
        <Image
          src={img}
          alt={project.title}
          fill
          sizes="(min-width:768px) 768px, 100vw"
          className="object-cover object-top"
        />
      </div>
      <p className="text-sm">
        <a href={img} target="_blank" rel="noreferrer" className="underline">Full screenshot ↗</a>
      </p>

      {/* Write-up */}
      <section className="prose prose-slate dark:prose-invert mt-8">
        <h2>Problem</h2>
        <p>Briefly describe the pain points (navigation, performance, accessibility, content sprawl, etc.).</p>

        <h2>What I did</h2>
        <ul>
          <li>Front-end: componentized UI, responsive grid, keyboard flows</li>
          <li>Back-end: data modeling, queries, caching</li>
          <li>Accessibility: landmarks, focus order, color contrast</li>
          <li>Performance: optimized images, lazy routes, lighter JS</li>
        </ul>

        <h2>Impact</h2>
        <ul>
          {(project.highlights ?? []).map(h => <li key={h}>{h}</li>)}
        </ul>
      </section>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-2">
        {project.links?.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Live site ↗
          </a>
        )}
        {project.links?.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Code ↗
          </a>
        )}
        <Link href="/contact" className="rounded-2xl bg-brand-blue text-white px-4 py-2 text-sm">
          Hire me
        </Link>
      </div>

      {/* SEO */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}

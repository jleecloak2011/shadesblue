// components/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/content/projects';

// Local union for optional source without touching your content types
type ProjectSource = 'employment' | 'client' | 'personal' | 'open-source';
type ProjectWithOptional = Project & {
  source?: ProjectSource;
  stack?: string[];
  hero?: string | null;
  featured?: boolean;
};

function SourceBadge({ source }: { source?: ProjectSource }) {
  if (!source) return null;
  const label: Record<ProjectSource, string> = {
    employment: 'Employment',
    client: 'Client',
    personal: 'Personal',
    'open-source': 'Open Source',
  };
  return (
    <span
      className="text-[11px] rounded-full border px-2 py-0.5
                 border-slate-300 dark:border-slate-700
                 text-slate-700 dark:text-slate-200
                 bg-slate-50 dark:bg-slate-800"
    >
      {label[source]}
    </span>
  );
}

export default function ProjectCard({ project }: { project: ProjectWithOptional }) {
  const img = project.hero || '/images/photo-not-available.jpg';
  const summary = project.summary ?? '';
  const stack = Array.isArray(project.stack) ? project.stack : [];
  const hasBadges = Boolean(project.featured) || Boolean(project.source);

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block rounded-2xl border overflow-hidden bg-white dark:bg-slate-900 hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
      aria-label={`View case study: ${project.title}`}
      title={`View: ${project.title}`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={img}
          alt={project.title}
          fill
          sizes="(min-width:1024px)33vw,(min-width:640px)50vw,100vw"
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
        />

        {/* Open full screenshot (doesn't navigate away from card) */}
        {project.hero && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              window.open(project.hero!, '_blank', 'noopener');
            }}
            className="absolute right-2 top-2 rounded-md bg-black/50 text-white text-xs px-2 py-1 hover:bg-black/70
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer"
            aria-label="Open full screenshot"
          >
            View full
          </button>
        )}
      </div>

      <div className="p-4">
        {hasBadges && (
          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="text-[11px] rounded-full bg-brand-blue/10 text-brand-blue px-2 py-0.5">
                Featured
              </span>
            )}
            <SourceBadge source={project.source} />
          </div>
        )}

        <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>

        {summary && (
          <p className="text-sm text-slate-500 mt-1 line-clamp-3">{summary}</p>
        )}

        {stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="text-[11px] rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

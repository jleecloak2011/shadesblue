import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

function SourceBadge({ source }: { source: Project["source"] }) {
  const label = { employment: "Employment", client: "Client", personal: "Personal", "open-source": "Open Source" }[source];
  return <span className="text-[11px] rounded-full border px-2 py-0.5">{label}</span>;
}

export default function ProjectCard({ project }: { project: Project }) {
  const img = project.hero || "/images/photo-not-available.jpg";

  return (
    <article className="rounded-2xl border bg-white dark:bg-slate-900 overflow-hidden">
      {/* PRIMARY: Case study (thumbnail + title) */}
      <Link
        href={`/portfolio/${project.slug}`}
        className="group block"
        aria-label={`View case study: ${project.title}`}
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={img}
            alt={project.title}
            fill
            sizes="(min-width:1024px)33vw,(min-width:640px)50vw,100vw"
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
            priority={project.featured}
          />
          {/* Non-interactive hover hint is OK inside the link */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="text-[11px] rounded-full bg-brand-blue/10 text-brand-blue px-2 py-0.5">Featured</span>
            )}
            <SourceBadge source={project.source} />
          </div>
          <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((s) => (
              <span key={s} className="text-[11px] rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5">
                {s}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* SECONDARY: external/live + full screenshot + repo (outside the Link) */}
      <div className="px-4 pb-4 pt-1 flex flex-wrap gap-2">
        {project.links?.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label={`Open live site for ${project.title} (opens in a new tab)`}
          >
            Live site ↗
          </a>
        )}

        {project.hero && (
          <a
            href={project.hero}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label={`Open full screenshot of ${project.title} (opens in a new tab)`}
          >
            Full screenshot ↗
          </a>
        )}

        {project.links?.repo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
            aria-label={`View code repository for ${project.title} (opens in a new tab)`}
          >
            Code ↗
          </a>
        )}
      </div>
    </article>
  );
}

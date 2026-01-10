// lib/projects.ts
import type { Project } from '@/content/projects';
import { projects as DATA } from '@/content/projects';
import { PROJECT_EXTRAS, type ProjectExtra } from '@/content/projectDetails';

export type { Project };

// re-export the array as `projects`
export const projects = DATA;

export function getProject(slug: string): (Project & ProjectExtra) | undefined {
  const base = projects.find((p) => p.slug === slug);
  if (!base) return undefined;
  const extra = PROJECT_EXTRAS[slug] ?? {};

  const baseStack = ((base as any).stack ?? []) as string[];
  const extraStack = (extra.stack ?? []) as string[];
  const stack = Array.from(new Set([...baseStack, ...extraStack]));
  return {
    ...base,
    ...extra,
    hero: extra.hero ?? (base as any).hero,
    gallery: extra.gallery ?? (base as any).gallery,
    links: { ...(base as any).links, ...extra.links },
  };
}

// local types (no need to import ProjectSource from content)
type ProjectSource = 'employment' | 'client' | 'personal' | 'open-source';
type SourceFilter = 'all' | ProjectSource;

export function listProjects(opts: { source?: SourceFilter; q?: string } = {}) {
  const { source = 'all', q = '' } = opts;
  const ql = q.trim().toLowerCase();

  // Merge extras for every project so the list page receives hero/gallery/source/featured/etc.
  const merged: (Project & ProjectExtra & { slug: string })[] = projects.map((p) => {
    const extra = PROJECT_EXTRAS[p.slug] ?? {};
    return {
      ...(p as any),
      ...extra,
      hero: extra.hero ?? (p as any).hero,
      gallery: extra.gallery ?? (p as any).gallery,
      links: { ...(p as any).links, ...extra.links },
    };
  });

  // ---- NEW: make row 1–2 pop
  const PRIORITY: string[] = [
    'afterschool-memphis',
    'mscs-district-template',
    'leaderboard-cms',
  ];

  merged.sort((a, b) => {
    const af = (a as any).featured ? 1 : 0;
    const bf = (b as any).featured ? 1 : 0;
    if (af !== bf) return bf - af; // Featured first

    const ai = PRIORITY.indexOf(a.slug);
    const bi = PRIORITY.indexOf(b.slug);
    const aIn = ai !== -1;
    const bIn = bi !== -1;
    if (aIn && bIn) return ai - bi; // both prioritized: earlier wins
    if (aIn) return -1;             // only a prioritized
    if (bIn) return 1;              // only b prioritized

    return a.title.localeCompare(b.title); // fallback alpha
  });

  // Filter by source + search query
  return merged.filter((p) => {
    const itemSource = p.source as ProjectSource | undefined;
    const sourceOk = source === 'all' ? true : itemSource === source;
    if (!sourceOk) return false;

    if (!ql) return true;
    const tags = Array.isArray((p as any).tags) ? (p as any).tags.join(' ') : '';
    const hay = `${p.title} ${p.summary ?? ''} ${tags}`.toLowerCase();
    return hay.includes(ql);
  });
}

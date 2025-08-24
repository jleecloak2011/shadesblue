// lib/projects.ts
import { projects, type Project } from '@/content/projects';

export function listProjects(opts?: { source?: string; q?: string }) {
  let out: Project[] = [...projects];

  if (opts?.source && opts.source !== 'all') {
    out = out.filter(p => p.source === opts.source);
  }

  if (opts?.q) {
    const q = opts.q.toLowerCase();
    out = out.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.stack.some(s => s.toLowerCase().includes(q)) ||
      (p.tags ?? []).some(t => t.toLowerCase().includes(q))
    );
  }

  // Promote featured, then sort by year desc
  out.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.year - a.year);
  return out;
}

export function getProject(slug: string) {
  return projects.find(p => p.slug === slug) ?? null;
}

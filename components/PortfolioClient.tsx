'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import PortfolioFilters from '@/components/PortfolioFilters';
import { listProjects } from '@/lib/projects';

const SOURCE_VALUES = ['all','employment','client','personal','open-source'] as const;
type SourceFilter = typeof SOURCE_VALUES[number];
const isSourceFilter = (v: string): v is SourceFilter =>
  (SOURCE_VALUES as readonly string[]).includes(v);

export default function PortfolioClient() {
  const sp = useSearchParams();

  const sourceParam = sp.get('source') ?? 'all';
  const source: SourceFilter = isSourceFilter(sourceParam) ? sourceParam : 'all';

  const q = (sp.get('q') ?? '').trim();

  const items = useMemo(() => listProjects({ source, q }), [source, q]);
  const hasItems = items.length > 0;

  return (
    <>
      <PortfolioFilters total={items.length} />

      {hasItems ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border p-8 text-slate-500">
          No projects matched your filters. Try clearing the search or switching the source.
        </div>
      )}
    </>
  );
}

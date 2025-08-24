// app/portfolio/page.tsx
import ProjectCard from '@/components/ProjectCard';
import PortfolioFilters from '@/components/PortfolioFilters';
import { listProjects } from '@/lib/projects';

export const metadata = {
  title: 'Portfolio · Shadesblue',
  description: 'Selected projects and demos by Jason Martin.',
};

export default function PortfolioPage({ searchParams }: { searchParams: { source?: string; q?: string } }) {
  const source = (searchParams.source ?? 'all') as any;
  const q = searchParams.q ?? '';
  const items = listProjects({ source, q });
  const hasItems = items.length > 0;

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-2">Portfolio</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">Employment projects, client work, and personal demos.</p>

      <PortfolioFilters total={items.length} />

      {hasItems ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(p => <ProjectCard key={p.slug} project={p} />)}
        </div>
      ) : (
        <div className="rounded-2xl border p-8 text-slate-500">
          No projects matched your filters. Try clearing the search or switching the source.
        </div>
      )}
    </section>
  );
}

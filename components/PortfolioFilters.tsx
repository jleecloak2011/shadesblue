'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

const SOURCES = [
  { key: 'all', label: 'All' },
  { key: 'employment', label: 'Employment' },
  { key: 'client', label: 'Client' },
  { key: 'personal', label: 'Personal' },
  { key: 'open-source', label: 'Open Source' },
] as const;

export default function PortfolioFilters({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const currentSource = sp.get('source') ?? 'all';
  const q = sp.get('q') ?? '';

  const setParam = useCallback((key: string, value?: string) => {
    const params = new URLSearchParams(sp);
    if (!value || value === 'all' || value.trim() === '') params.delete(key);
    else params.set(key, value);
    router.replace(`${pathname}?${params.toString()}`);
  }, [router, pathname, sp]);

  const onSourceClick = (key: string) => () => setParam('source', key);
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => setParam('q', e.target.value);

  const countLabel = useMemo(() => {
    const base = q ? `Results` : `Projects`;
    return `${base}: ${total}`;
  }, [total, q]);

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {SOURCES.map(s => (
          <button
            key={s.key}
            onClick={onSourceClick(s.key)}
            className={`rounded-full border px-3 py-1 text-sm ${currentSource === s.key ? 'bg-brand-blue text-white border-brand-blue' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            aria-pressed={currentSource === s.key}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="search"
          placeholder="Search tech, tags, titles…"
          defaultValue={q}
          onChange={onSearch}
          className="rounded-xl border px-3 py-2 text-sm w-72 max-w-full bg-white dark:bg-slate-900"
          aria-label="Search portfolio"
        />
        <span className="text-sm text-slate-500">{countLabel}</span>
      </div>
    </div>
  );
}

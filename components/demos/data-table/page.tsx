// Server-rendered Sortable/Filterable Data Table (Next.js App Router)
// URL params: ?q=&sort=name|role|dept|loc|start|salary&dir=asc|desc&page=1&per=10
// Tailwind v4 classes used throughout.

import Link from 'next/link';

// Ensure searchParams variations render dynamically in prod/CDN
export const dynamic = 'force-dynamic';

type Row = {
  id: number;
  name: string;
  role: string;
  dept: string;
  loc: string;
  start: string;   // ISO yyyy-mm-dd
  salary: number;  // USD
};

function makeRows(): Row[] {
  const first = ['Ava','Noah','Mia','Liam','Emma','Elijah','Olivia','Lucas','Amelia','Mateo','Sophia','Ethan'];
  const last  = ['Johnson','Garcia','Williams','Brown','Jones','Miller','Davis','Martinez','Hernandez','Lopez','Gonzalez','Wilson'];
  const roles = ['Frontend Dev','Backend Dev','Full-stack Dev','Designer','PM','QA Engineer','Data Analyst','DevOps'];
  const depts = ['Web','HR','Operations','Communications','IT','Student Services'];
  const locs  = ['Memphis, TN','Nashville, TN','Knoxville, TN','Atlanta, GA','Dallas, TX','Remote'];

  const rows: Row[] = [];
  let id = 1;
  for (let i = 0; i < 120; i++) {
    const name = `${first[i % first.length]} ${last[(i * 3) % last.length]}`;
    const role = roles[i % roles.length];
    const dept = depts[(i * 2) % depts.length];
    const loc  = locs[(i * 5) % locs.length];
    // Cycle dates deterministically (recent years)
    const year = 2020 + (i % 6);
    const month = (i % 12) + 1;
    const day = ((i * 7) % 27) + 1;
    const start = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    // Salary: base + small increment
    const salary = 55000 + (i % 15) * 2500;
    rows.push({ id: id++, name, role, dept, loc, start, salary });
  }
  return rows;
}

type SearchParams = {
  q?: string;
  sort?: 'name'|'role'|'dept'|'loc'|'start'|'salary';
  dir?: 'asc'|'desc';
  page?: string;
  per?: string;
};

function normalize(params: Record<string, string | string[] | undefined>) {
  const p = params as Record<string, string | undefined>;
  const q = (p.q ?? '').trim();
  const sort = (p.sort as SearchParams['sort']) || 'name';
  const dir = (p.dir as SearchParams['dir']) || 'asc';
  const page = Math.max(1, parseInt(p.page ?? '1', 10) || 1);
  const per = [10, 20, 50].includes(parseInt(p.per ?? '', 10)) ? parseInt(p.per!, 10) : 10;
  return { q, sort, dir, page, per };
}

function searchFilter(rows: Row[], q: string) {
  if (!q) return rows;
  const n = q.toLowerCase();
  return rows.filter(r =>
    r.name.toLowerCase().includes(n) ||
    r.role.toLowerCase().includes(n) ||
    r.dept.toLowerCase().includes(n) ||
    r.loc.toLowerCase().includes(n)
  );
}

function sortRows(rows: Row[], sort: SearchParams['sort'], dir: SearchParams['dir']) {
  const mult = dir === 'desc' ? -1 : 1;
  const cmp = (a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0) * mult;

  return [...rows].sort((a, b) => {
    switch (sort) {
      case 'name':   return cmp(a.name, b.name);
      case 'role':   return cmp(a.role, b.role);
      case 'dept':   return cmp(a.dept, b.dept);
      case 'loc':    return cmp(a.loc, b.loc);
      case 'start':  return cmp(a.start, b.start);
      case 'salary': return cmp(a.salary, b.salary);
      default:       return 0;
    }
  });
}

function paginate<T>(rows: T[], page: number, per: number) {
  const total = rows.length;
  const pages = Math.max(1, Math.ceil(total / per));
  const p = Math.min(Math.max(1, page), pages);
  const startIdx = (p - 1) * per;
  const endIdx = Math.min(startIdx + per, total);
  return { slice: rows.slice(startIdx, endIdx), total, pages, page: p, startIdx, endIdx };
}

// Build a query string while toggling certain keys
function qs(current: Record<string, string | undefined>, patch: Record<string, string | undefined>) {
  const merged = { ...current, ...patch };
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(merged)) {
    if (v != null && v !== '') params.set(k, v);
  }
  const s = params.toString();
  return s ? `?${s}` : '';
}

export default async function Page({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const { q, sort, dir, page, per } = normalize(searchParams);
  const base = { q, sort, dir, per: String(per) };

  // Data pipeline: filter → sort → paginate (server-side)
  const rowsAll = makeRows();
  const rowsFiltered = searchFilter(rowsAll, q);
  const rowsSorted = sortRows(rowsFiltered, sort, dir);
  const { slice, total, pages, page: pageNum, startIdx, endIdx } = paginate(rowsSorted, page, per);

  // Helpers for sorting links
  const toggleDir = (col: SearchParams['sort']) =>
    sort === col ? (dir === 'asc' ? 'desc' : 'asc') : 'asc';

  const formatMoney = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Sortable/Filterable Data Table (Demo)</h1>
      <p className="text-slate-600 dark:text-slate-300 mt-1">
        Client/server search, sort, and pagination with proper table semantics.
      </p>

      {/* Controls */}
      <form method="get" className="mt-6 flex flex-wrap gap-3 items-end" aria-label="Table controls">
        <div className="flex flex-col">
          <label htmlFor="q" className="text-sm font-medium">Search</label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Name, role, dept, location…"
            className="rounded-xl border px-3 py-2 w-64"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="per" className="text-sm font-medium">Rows per page</label>
          <select id="per" name="per" defaultValue={String(per)} className="rounded-xl border px-3 py-2">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* Preserve current sort/dir when submitting search/per */}
        <input type="hidden" name="sort" value={sort} />
        <input type="hidden" name="dir" value={dir} />

        <button className="rounded-2xl bg-brand-blue text-white px-4 py-2">Apply</button>
        <Link href="/demo/data-table" className="rounded-2xl border px-4 py-2">Clear</Link>
      </form>

      {/* Result count (live region) */}
      <p className="mt-3 text-sm text-slate-500" aria-live="polite">
        Showing <strong>{total === 0 ? 0 : startIdx + 1}–{endIdx}</strong> of <strong>{total}</strong> results
        {q && <> for “<em>{q}</em>”</>}
      </p>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-2xl border">
        <table className="min-w-full text-sm">
          <caption className="sr-only">Employee directory demo with search, sort, and pagination</caption>
          <thead className="bg-slate-50 dark:bg-slate-900/40">
            <tr className="[&>th]:px-3 [&>th]:py-2 text-left">
              {[
                { key: 'name',  label: 'Name'  },
                { key: 'role',  label: 'Role'  },
                { key: 'dept',  label: 'Department' },
                { key: 'loc',   label: 'Location' },
                { key: 'start', label: 'Start' },
                { key: 'salary',label: 'Salary' },
              ].map(col => {
                const is = sort === (col.key as any);
                const nextDir = toggleDir(col.key as any);
                const href = qs(base, { sort: col.key as any, dir: nextDir, page: '1' });
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className="font-semibold"
                    aria-sort={is ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    <a
                      href={href}
                      className={`inline-flex items-center gap-1 underline-offset-4 hover:underline ${is ? 'text-brand-blue' : ''}`}
                    >
                      {col.label}
                      {is && (
                        <span aria-hidden="true" className="text-xs">{dir === 'asc' ? '▲' : '▼'}</span>
                      )}
                    </a>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="[&>tr:nth-child(even)]:bg-slate-50/50 dark:[&>tr:nth-child(even)]:bg-slate-900/20">
            {slice.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-slate-500">
                  No results. Try clearing filters.
                </td>
              </tr>
            ) : slice.map(r => (
              <tr key={r.id} className="[&>td]:px-3 [&>td]:py-2">
                <td className="font-medium">{r.name}</td>
                <td>{r.role}</td>
                <td>{r.dept}</td>
                <td>{r.loc}</td>
                <td><time dateTime={r.start}>{r.start}</time></td>
                <td>{formatMoney(r.salary)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pager */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-500">
          Page {pageNum} of {pages}
        </div>
        <div className="flex gap-2">
          <Link
            aria-disabled={pageNum <= 1}
            className={`rounded-xl border px-3 py-1.5 text-sm ${pageNum <= 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            href={qs(base, { page: String(pageNum - 1) }) || '#'}
          >
            ← Prev
          </Link>
          <Link
            aria-disabled={pageNum >= pages}
            className={`rounded-xl border px-3 py-1.5 text-sm ${pageNum >= pages ? 'opacity-50 pointer-events-none' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            href={qs(base, { page: String(pageNum + 1) }) || '#'}
          >
            Next →
          </Link>
        </div>
      </div>
    </section>
  );
}

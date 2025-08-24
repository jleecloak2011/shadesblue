import Link from 'next/link';
import { ReactNode } from 'react';

export function Cta({
  href, children, variant = 'primary', ariaLabel,
}: { href: string; children: ReactNode; variant?: 'primary'|'secondary'; ariaLabel?: string }) {
  const cls =
    variant === 'primary'
      ? 'inline-flex items-center rounded-2xl border px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue'
      : 'inline-flex items-center rounded-2xl border px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue';
  return (
    <Link href={href} aria-label={ariaLabel} className={cls}>
      {children}
    </Link>
  );
}

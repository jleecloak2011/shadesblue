'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils'; // if you don't have cn, replace cn(a,b) with [a,b].join(' ')

type Variant = 'primary' | 'secondary' | 'ghost' | 'link';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-sky-400 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white shadow-sm',
  secondary:
    'border border-slate-300 text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/60',
  ghost:
    'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60',
  link:
    'text-slate-800 underline underline-offset-4 hover:no-underline dark:text-slate-100',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-2',
  md: 'h-11 px-4 text-[15px] gap-2',
  lg: 'h-12 px-5 text-base gap-2',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
  href?: string;
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  href,
  children,
  ...props
}: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={cls} aria-label={props['aria-label']}>
        {leftIcon ? <span aria-hidden>{leftIcon}</span> : null}
        <span>{children}</span>
        {rightIcon ? <span aria-hidden>{rightIcon}</span> : null}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {leftIcon ? <span aria-hidden>{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span aria-hidden>{rightIcon}</span> : null}
    </button>
  );
}

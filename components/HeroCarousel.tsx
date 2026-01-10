'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type Slide = {
  src: string;
  alt: string;
  caption?: string;
  href?: string;
};

type Props = {
  slides: Slide[];
  className?: string;
  autoPlay?: boolean;
  intervalMs?: number;
};

export default function HeroCarousel({
  slides,
  className = '',
  autoPlay = true,
  intervalMs = 6500,
}: Props) {
  const items = useMemo(() => slides.filter(Boolean), [slides]);
  const count = items.length;

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const timerRef = useRef<number | null>(null);

  const go = (i: number) => {
    if (!count) return;
    setIndex((i + count) % count);
  };

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // autoplay with pause
  useEffect(() => {
    if (!playing || count <= 1) return;

    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [playing, count, intervalMs]);

  // keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count]);

  if (!count) return null;

  return (
    <section aria-label="Project screenshots carousel" className={className}>
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
        {/* Track */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((s, i) => {
            const content = (
              <div className="relative w-full shrink-0">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 720px"
                    priority={i === 0}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/10" />
                </div>

                {(s.caption || s.href) && (
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    {s.caption && (
                      <p className="text-sm sm:text-base font-semibold text-white drop-shadow">
                        {s.caption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );

            return s.href ? (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.alt}
                className="block w-full shrink-0 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                {content}
              </a>
            ) : (
              <div key={i} className="w-full shrink-0">
                {content}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        {count > 1 && (
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-900/80 dark:text-slate-50"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-900/80 dark:text-slate-50"
                aria-label="Next slide"
              >
                →
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-900/80 dark:text-slate-50"
                aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              >
                {playing ? 'Pause' : 'Play'}
              </button>

              <span className="hidden sm:inline text-xs font-medium text-white/90 drop-shadow">
                {index + 1} / {count}
              </span>
            </div>
          </div>
        )}

        {/* Dots */}
        {count > 1 && (
          <div className="flex items-center justify-center gap-2 p-3">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index ? 'bg-slate-900 dark:bg-slate-50' : 'bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600'
                }`}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index ? 'true' : 'false'}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

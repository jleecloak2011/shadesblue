'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type Slide = {
  src: string;
  alt: string;
  caption?: string;
  href?: string; // optional: make slide clickable
};

type Props = {
  slides: Slide[];
  autoPlay?: boolean;
  intervalMs?: number;
  className?: string;
};

export default function HomeCarousel({
  slides,
  autoPlay = true,
  intervalMs = 6000,
  className = '',
}: Props) {
  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const timerRef = useRef<number | null>(null);

  const count = safeSlides.length;

  const go = (next: number) => {
    if (!count) return;
    const normalized = (next + count) % count;
    setIndex(normalized);
  };

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  // Auto-rotate (with pause/play)
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

  // Keyboard support
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

  const slide = safeSlides[index];

  return (
    <section
      aria-label="Project screenshots carousel"
      className={`w-full ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Image area */}
        <div className="relative aspect-[16/9] w-full">
          {slide.href ? (
            <a href={slide.href} target="_blank" rel="noreferrer" aria-label={slide.alt}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </a>
          ) : (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          )}

          {/* Subtle top/bottom fade to help captions/buttons */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/10" />
        </div>

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
              aria-label="Next slide"
            >
              →
            </button>

            {count > 1 && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="ml-2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              >
                {playing ? 'Pause' : 'Play'}
              </button>
            )}
          </div>

          {/* Caption */}
          <div className="hidden sm:block text-right">
            {slide.caption && (
              <p className="max-w-[38ch] text-sm font-semibold text-white drop-shadow">
                {slide.caption}
              </p>
            )}
            <p className="text-xs text-white/90 drop-shadow">
              {index + 1} / {count}
            </p>
          </div>
        </div>

        {/* Dots */}
        {count > 1 && (
          <div className="flex items-center justify-center gap-2 p-3">
            {safeSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index ? 'bg-slate-900' : 'bg-slate-300 hover:bg-slate-400'
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

// components/ProCarousel.tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Lightbox from './Lightbox';

type Slide = { src: string; alt: string };

export default function ProCarousel({
  slides,
  className = '',
  compact = false,
  auto = true,
  intervalMs = 6000,
}: {
  slides: Slide[];
  className?: string;
  compact?: boolean;
  auto?: boolean;
  intervalMs?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  const goTo = (i: number) => {
    if (!trackRef.current) return;
    const clamped = Math.max(0, Math.min(i, slides.length - 1));
    setIndex(clamped);
    const el = trackRef.current.children[clamped] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // sync index on scroll (so dots/arrows reflect drag)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let handle = 0;
    const onScroll = () => {
      cancelAnimationFrame(handle);
      handle = requestAnimationFrame(() => {
        const children = Array.from(el.children) as HTMLElement[];
        const centers = children.map((c) => Math.abs(c.getBoundingClientRect().left - el.getBoundingClientRect().left));
        const nearest = centers.indexOf(Math.min(...centers));
        if (nearest !== -1 && nearest !== index) setIndex(nearest);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [index]);

  // autoplay (pauses on hover or when lightbox open)
  useEffect(() => {
    if (!auto || hover || lbIndex !== null) return;
    const id = setInterval(() => {
      setIndex((i) => {
        const ni = i + 1 >= slides.length ? 0 : i + 1;
        goTo(ni);
        return ni;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [auto, hover, intervalMs, slides.length, lbIndex]);

  const figureH = compact ? 'h-56 sm:h-64 lg:h-72' : 'h-auto';
  const imgClass = compact ? 'w-full h-full object-cover' : 'w-full h-auto object-cover';

  return (
    <section
      className={`not-prose ${className}`}
      aria-roledescription="carousel"
      aria-label="Project images"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        {/* Edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white dark:from-slate-950 to-transparent rounded-l-2xl" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-slate-950 to-transparent rounded-r-2xl" />

        {/* Track */}
        <div
          ref={trackRef}
          className="relative flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          role="group"
          aria-live="polite"
          aria-atomic="true"
          tabIndex={0}
        >
          {slides.map((s, i) => (
            <figure
              key={i}
              className={`snap-center shrink-0 w-full sm:w-[80%] lg:w-[70%] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 ${figureH}`}
              aria-roledescription="slide"
              aria-label={`Image ${i + 1} of ${slides.length}`}
            >
              <button
                type="button"
                onClick={() => setLbIndex(i)}
                className="block w-full h-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/70 rounded-lg cursor-pointer"
                aria-label={`Open larger view of image ${i + 1}`}
                data-zoom
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={1600}
                  height={900}
                  className={imgClass}
                  priority={i === 0}
                  sizes={compact ? '(min-width:1024px) 700px, 85vw' : '(min-width:1024px) 900px, 100vw'}
                />
              </button>
            </figure>
          ))}
        </div>

        {/* Arrows */}
        <div className="absolute inset-y-0 left-2 flex items-center">
          <button
            onClick={prev}
            aria-label="Previous image"
            className="rounded-full bg-white/80 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 px-3 py-2 border border-slate-200 dark:border-slate-700 shadow"
            disabled={index === 0}
          >
            ‹
          </button>
        </div>
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button
            onClick={next}
            aria-label="Next image"
            className="rounded-full bg-white/80 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 px-3 py-2 border border-slate-200 dark:border-slate-700 shadow"
            disabled={index === slides.length - 1}
          >
            ›
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-3 flex items-center justify-center gap-1" aria-label="Slide navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full border dark:border-slate-700 ${
              i === index ? 'bg-slate-800 dark:bg-slate-200' : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lbIndex !== null && (
        <Lightbox
          slides={slides}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onPrev={() => setLbIndex((i) => (i! - 1 + slides.length) % slides.length)}
          onNext={() => setLbIndex((i) => (i! + 1) % slides.length)}
        />
      )}
    </section>
  );
}

// components/ImageCarousel.tsx
'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

type Slide = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type Props = {
  slides: Slide[];
  className?: string;
  variant?: 'standard' | 'compact';
};

export default function ImageCarousel({ slides, className = '', variant = 'standard' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index > slides.length - 1) setIndex(slides.length - 1);
  }, [slides.length, index]);

  const goTo = (i: number) => {
    if (!trackRef.current) return;
    const clamped = Math.max(0, Math.min(i, slides.length - 1));
    setIndex(clamped);
    const slide = trackRef.current.children[clamped] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // Height styles for compact vs standard
  const figureHeight = variant === 'compact' ? 'h-48 sm:h-56 lg:h-60' : 'h-auto';
  const imageClass = variant === 'compact' ? 'w-full h-full object-cover' : 'h-auto w-full object-cover';

  return (
    <section
      className={`not-prose ${className}`}
      aria-roledescription="carousel"
      aria-label="Project images"
    >
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
            className={`snap-center shrink-0 w-full sm:w-[80%] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 ${figureHeight}`}
            aria-roledescription="slide"
            aria-label={`Image ${i + 1} of ${slides.length}`}
          >
            {/* For compact we just crop with object-cover via fixed height */}
            <Image
              src={s.src}
              alt={s.alt}
              width={s.width ?? 1600}
              height={s.height ?? 900}
              className={imageClass}
              priority={i === 0}
              sizes={variant === 'compact' ? '(min-width: 1024px) 600px, 80vw' : '(min-width: 1024px) 800px, 100vw'}
            />
          </figure>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:border-slate-700 disabled:opacity-40"
            aria-label="Previous image"
            disabled={index === 0}
          >
            Prev
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/60 dark:border-slate-700 disabled:opacity-40"
            aria-label="Next image"
            disabled={index === slides.length - 1}
          >
            Next
          </button>
        </div>

        <div className="flex items-center gap-1" aria-label="Slide navigation">
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
      </div>
    </section>
  );
}

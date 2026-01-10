'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Props = {
  images: { src: string; alt?: string }[];
  thumbHeight?: number; // px
};

export default function Gallery({ images, thumbHeight = 220 }: Props) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i: number) => { setIdx(i); setOpen(true); };
  const close = () => setOpen(false);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  // ESC to close, arrows to navigate
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {/* Thumbs */}
      <div className="grid gap-3 sm:grid-cols-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => openAt(i)}
            className="relative w-full overflow-hidden rounded-xl border bg-white dark:bg-slate-900 cursor-zoom-in group"
            style={{ height: thumbHeight }}
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <Image
              src={img.src}
              alt={img.alt ?? 'Project image'}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(min-width:1024px)50vw,(min-width:640px)50vw,100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="absolute inset-4 md:inset-10 lg:inset-16 rounded-2xl overflow-hidden bg-slate-950/70 border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-sm text-white hover:bg-slate-800 cursor-pointer"
                onClick={close}
                aria-label="Close"
              >
                Close ✕
              </button>
            </div>

            {/* Nav */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-sm text-white hover:bg-slate-800 cursor-pointer"
              onClick={prev}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-sm text-white hover:bg-slate-800 cursor-pointer"
              onClick={next}
              aria-label="Next image"
            >
              →
            </button>

            {/* Full image container (ensures ≥800px width when space allows) */}
            <div className="h-full w-full grid place-items-center p-4">
              <div className="relative w-full max-w-5xl aspect-[16/9]">
                <Image
                  src={images[idx].src}
                  alt={images[idx].alt ?? 'Project image'}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  // ≥ 800px wide on most viewports due to max-w-5xl container
                />
              </div>
              <div className="mt-2 text-xs text-slate-300">{idx + 1} / {images.length}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

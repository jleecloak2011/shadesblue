// components/Lightbox.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

type Slide = { src: string; alt: string };

export default function Lightbox({
  slides,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  slides: Slide[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  const s = slides[index];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={(e) => {
        // close if clicking backdrop (not buttons or image)
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="relative max-w-6xl w-full">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-10 right-0 text-white/90 hover:text-white text-sm"
        >
          Close ✕
        </button>

        {/* Nav arrows */}
        <button
          onClick={onPrev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 px-3 py-2 text-white"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 px-3 py-2 text-white"
        >
          ›
        </button>

        // Close + arrows
        <button className="absolute -top-10 right-0 text-white/90 hover:text-white text-sm cursor-pointer">Close ✕</button>
        <button className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 px-3 py-2 text-white cursor-pointer">‹</button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 px-3 py-2 text-white cursor-pointer">›</button>

        <figure className="rounded-xl overflow-hidden border border-white/15 bg-black">
          <Image
            src={s.src}
            alt={s.alt}
            width={1920}
            height={1080}
            className="w-full h-auto"
            priority
            sizes="(min-width: 1280px) 1120px, 90vw"
          />
          <figcaption className="text-white/80 text-sm p-3">{s.alt}</figcaption>
        </figure>
      </div>
    </div>
  );
}

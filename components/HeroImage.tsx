import Image, { type StaticImageData } from 'next/image';
import placeholder from '@/public/images/placeholder-16x9.webp'; // ← static import

export default function HeroImage({
  hero,
  alt,
}: { hero?: string | StaticImageData | null; alt: string }) {
  const img = hero ?? placeholder; // can be string or StaticImageData
  const isStatic = typeof img !== 'string';

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border">
      <Image
        src={img}
        alt={alt}
        fill
        className="object-cover object-top"
        {...(isStatic ? { placeholder: 'blur' } : {})}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
    </div>
  );
}

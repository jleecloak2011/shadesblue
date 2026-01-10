// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true }, // ✅ don't block builds on lint errors
};

export default config;

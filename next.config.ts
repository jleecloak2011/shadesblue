import type { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true }, // allow build even with lint errors
};

export default config;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

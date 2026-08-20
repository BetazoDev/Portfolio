import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.diabolicalservices.tech' },
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;

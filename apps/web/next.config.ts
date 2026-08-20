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
  async rewrites() { return [{ source: '/api/:path*', destination: `${process.env.API_INTERNAL_URL ?? 'https://back.halonso.digital'}/api/:path*` }]; },
};

export default nextConfig;

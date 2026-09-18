import type { NextConfig } from 'next';

const apiOrigin = process.env.API_INTERNAL_URL ?? 'https://back.halonso.digital';
const storageHost = process.env.NEXT_PUBLIC_STORAGE_HOST ?? 'supastorage.halonso.digital';

// Applied to every response. The public site previously shipped none of these.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  images: {
    // Supabase Storage is the only place project media lives, so it is the only host the
    // optimizer accepts. Anything else — including the CDN this site used to borrow from —
    // is refused here rather than failing later at render time.
    remotePatterns: [{ protocol: 'https', hostname: storageHost }],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/admin/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ];
  },
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${apiOrigin}/api/:path*` }];
  },
};

export default nextConfig;

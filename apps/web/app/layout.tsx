/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next';
import './styles.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Humberto Alonso — Intelligent Web Platforms', template: '%s — Humberto Alonso' },
  description: 'Full-stack developer building intelligent web platforms, CMS systems, automation and AI workflows.',
  openGraph: { title: 'Humberto Alonso — Intelligent Web Platforms', description: 'AI, automation, CMS and modern web platforms.', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

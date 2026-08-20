import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import './portfolio.css';

const sans = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://halonso.digital'),
  title: { default: 'Humberto Alonso — Full-stack developer', template: '%s — Humberto Alonso' },
  description: 'Desarrollo plataformas, CMS, automatizaciones y productos digitales orientados a resultados.',
  openGraph: { type: 'website', siteName: 'Humberto Alonso', locale: 'es_MX' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `try{var t=localStorage.getItem('theme');document.documentElement.classList.add(t==='light'?'light':'dark')}catch(e){document.documentElement.classList.add('dark')}`;
  return <html lang="es" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body className={`${sans.variable} ${mono.variable} font-sans antialiased`}>{children}</body></html>;
}

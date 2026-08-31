import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';

const sans = Space_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--font-space-grotesk' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], display: 'swap', variable: '--font-space-mono' });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://halonso.digital';
const title = 'Humberto Alonso — Full-stack developer';
const description = 'Platforms, CMS, automation and digital products built around business outcomes.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: '%s — Humberto Alonso' },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Humberto Alonso',
    locale: 'en_US',
    alternateLocale: ['es_MX'],
    url: siteUrl,
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f8' },
    { media: '(prefers-color-scheme: dark)', color: '#050505' },
  ],
};

// Applies the stored theme and language before first paint so the page never flashes
// the wrong palette or the wrong language variant.
const bootstrapScript = `try{var t=localStorage.getItem('theme');var l=localStorage.getItem('language');document.documentElement.classList.add(t==='light'?'light':'dark');var lang=l==='es'?'es':'en';document.documentElement.dataset.language=lang;document.documentElement.lang=lang}catch(e){document.documentElement.classList.add('dark');document.documentElement.dataset.language='en'}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The font variables must live on <html>: Tailwind's @theme resolves --font-sans here,
    // and a custom property referencing a variable defined on <body> would be invalid at :root.
    <html
      lang="en"
      data-language="en"
      className={`dark ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrapScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

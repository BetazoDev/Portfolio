'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  return <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors">
    <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="font-mono text-xs uppercase tracking-[.25em]">H. Alonso</Link>
        <nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-widest md:gap-8">
          <Link href="/projects">Proyectos</Link><Link href="/about">Sobre mí</Link><Link href="/contact">Contacto</Link>
          <button type="button" onClick={() => setDark((value) => !value)} aria-label="Cambiar tema">{dark ? '○' : '●'}</button>
        </nav>
      </div>
    </header>{children}
    <footer className="border-t border-[var(--border-color)] px-6 py-10 font-mono text-[10px] uppercase tracking-widest md:px-12">© {new Date().getFullYear()} Humberto Alonso</footer>
  </div>;
}

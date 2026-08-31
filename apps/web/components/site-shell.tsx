'use client';

import Link from 'next/link';
import { AppProvider, useAppContext } from '../legacy/context/AppContext';
import { Navbar } from '../legacy/components/Navbar';
import { ThemeToggle } from '../legacy/components/ThemeToggle';
import { CustomCursor } from '../legacy/components/CustomCursor';
import { LangText } from './lang-text';

const RINGS = [50, 100, 150, 200, 250, 300, 350, 380];

function SiteFooter() {
  const { language } = useAppContext();
  const links = [
    { label: language === 'es' ? 'Inicio' : 'Home', href: '/' },
    { label: language === 'es' ? 'Soluciones' : 'Solutions', href: '/solutions' },
    { label: language === 'es' ? 'Proyectos' : 'Projects', href: '/projects' },
    { label: language === 'es' ? 'Contacto' : 'Contact', href: '/#contact' },
  ];

  return (
    <footer className="border-t border-[var(--border-color)] py-12">
      <nav className="mb-8 flex flex-wrap gap-x-8 gap-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 transition-opacity hover:opacity-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex flex-col justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 md:flex-row">
        <span>© {new Date().getFullYear()} Humberto Alonso</span>
        <LangText
          en="Engineering, management and software development"
          es="Ingeniería, gestión y desarrollo de software"
        />
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="noise relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <div className="circles-bg">
          <svg viewBox="0 0 800 800" fill="none" aria-hidden="true">
            {RINGS.map((radius) => (
              <circle key={radius} cx="400" cy="400" r={radius} stroke="var(--accent)" strokeWidth=".5" />
            ))}
          </svg>
        </div>
        <CustomCursor />
        <ThemeToggle />
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">
          <Navbar />
          {children}
          <SiteFooter />
        </div>
      </div>
    </AppProvider>
  );
}

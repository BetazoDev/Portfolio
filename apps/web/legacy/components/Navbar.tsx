'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppContext } from '../context/AppContext';

export const Navbar = () => {
  const { language, availableLanguages, setLanguage } = useAppContext();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { label: language === 'es' ? 'Inicio' : 'Home', href: '/' },
    { label: language === 'es' ? 'Soluciones' : 'Solutions', href: '/solutions' },
    { label: language === 'es' ? 'Proyectos' : 'Projects', href: '/projects' },
    { label: language === 'es' ? 'Sobre mí' : 'About', href: '/#about' },
    { label: language === 'es' ? 'Contacto' : 'Contact', href: '/#contact' },
  ];

  // Close the drawer when the route changes, and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const languageSwitcher = (size: 'sm' | 'lg') => (
    <div className={size === 'lg' ? 'flex items-center gap-4' : 'flex items-center gap-1'}>
      {availableLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          aria-pressed={language === lang.code}
          // Padding keeps the tap area at least 44px without enlarging the label.
          className={`grid min-h-11 min-w-11 place-items-center font-mono uppercase tracking-widest transition-colors duration-300 ${
            size === 'lg' ? 'text-base' : 'text-[10px]'
          } ${
            language === lang.code
              ? 'font-bold text-accent'
              : 'text-[var(--text-primary)]/40 hover:text-[var(--text-primary)]'
          }`}
        >
          {lang.code}
        </button>
      ))}
    </div>
  );

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-between border-b border-[var(--border-color)] py-7"
    >
      <Link href="/" className="group flex flex-col leading-tight">
        <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-accent transition-colors duration-300 group-hover:text-accent-light">
          Humberto Guadalupe
        </span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--text-primary)] transition-colors duration-300 group-hover:text-accent">
          Alonso López
        </span>
      </Link>

      <div className="flex items-center gap-2 lg:gap-8">
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-primary)]/70 transition-colors duration-300 hover:text-accent"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden border-l border-[var(--border-color)] pl-4 lg:flex xl:pl-6">
          {languageSwitcher('sm')}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={language === 'es' ? 'Abrir menú' : 'Open menu'}
          aria-expanded={open}
          className="grid min-h-11 min-w-11 place-items-center text-[var(--text-primary)] transition-colors hover:text-accent lg:hidden"
        >
          <Menu size={22} />
        </button>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[400] flex flex-col bg-[var(--bg-primary)] px-8 py-7 text-[var(--text-primary)] lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-7">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--text-primary)]">
                Alonso López
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={language === 'es' ? 'Cerrar menú' : 'Close menu'}
                className="grid min-h-11 min-w-11 place-items-center text-[var(--text-primary)] transition-colors hover:text-accent"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-3 text-3xl font-bold uppercase tracking-tight text-[var(--text-primary)] transition-colors hover:text-accent"
                >
                  <span className="font-mono text-[10px] tracking-[0.3em] text-accent">
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-primary)]/50">
                {language === 'es' ? 'Idioma' : 'Language'}
              </span>
              {languageSwitcher('lg')}
            </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </motion.header>
  );
};

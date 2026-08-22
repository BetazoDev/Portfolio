import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export const Navbar = () => {
  const { language, availableLanguages, setLanguage } = useAppContext();

  const navLinks = [
    { label: language === 'es' ? 'Inicio' : 'Home', href: '/' },
    { label: language === 'es' ? 'Soluciones' : 'Solutions', href: '/solutions' },
    { label: language === 'es' ? 'Proyectos' : 'Projects', href: '/projects' },
    { label: language === 'es' ? 'Sobre mí' : 'About', href: '/#about' },
    { label: language === 'es' ? 'Contacto' : 'Contact', href: '/#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] as any }}
      className="py-7 flex items-center justify-between border-b border-[var(--border-color)]"
    >
      {/* Name — left */}
      <a href="/" className="flex flex-col leading-tight group">
        <span className="text-[10px] font-mono uppercase tracking-[0.34em] text-accent group-hover:text-accent-light transition-colors duration-300">
          Humberto Guadalupe
        </span>
        <span className="text-[11px] font-mono text-[var(--text-primary)] uppercase tracking-[0.25em] font-bold group-hover:text-accent transition-colors duration-300">
          Alonso López
        </span>
      </a>

      <div className="flex items-center gap-8">
        {/* Links — right */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
              className="relative text-[11px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)]/70 hover:text-accent transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        {/* Dynamic Language Switcher */}
        <div className="flex items-center gap-2.5 border-l border-[var(--border-color)] pl-4 xl:pl-6">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`text-[10px] font-mono uppercase tracking-widest transition-all duration-300 ${
                language === lang.code
                  ? 'text-accent font-bold scale-110'
                  : 'text-[var(--text-primary)]/40 hover:text-[var(--text-primary)]'
              }`}
            >
              {lang.code}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
};

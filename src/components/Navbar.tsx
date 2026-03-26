import { motion } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Work', href: '#work' },
  { label: 'Contacts', href: '#contact' },
];

export const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] as any }}
      className="py-7 flex items-center justify-between border-b border-white/10"
    >
      {/* Name — left */}
      <a href="#" className="flex flex-col leading-tight group">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 group-hover:text-white/60 transition-colors duration-300">
          Humberto Guadalupe
        </span>
        <span className="text-[11px] font-mono text-white uppercase tracking-[0.25em] font-bold group-hover:text-white/70 transition-colors duration-300">
          Alonso López
        </span>
      </a>

      {/* Links — right */}
      <nav className="hidden md:flex items-center gap-10">
        {navLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
            className="relative text-[11px] font-mono uppercase tracking-[0.3em] text-white/35 hover:text-white transition-colors duration-300 group"
          >
            {link.label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
          </motion.a>
        ))}
      </nav>
    </motion.header>
  );
};

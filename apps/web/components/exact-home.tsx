'use client';

import { motion } from 'framer-motion';
import { CustomCursor } from '../legacy/components/CustomCursor';
import { ThemeToggle } from '../legacy/components/ThemeToggle';
import { Navbar } from '../legacy/components/Navbar';
import { Hero } from '../legacy/sections/Hero';
import { About } from '../legacy/sections/About';
import { Projects } from '../legacy/sections/Projects';
import { Work } from '../legacy/sections/Work';
import { Contact } from '../legacy/sections/Contact';
import { AppProvider } from '../legacy/context/AppContext';

export function ExactHome() {
  return <AppProvider><div className="noise relative min-h-screen bg-[var(--bg-primary)] overflow-x-hidden transition-colors duration-300"><div className="circles-bg"><svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">{[50, 100, 150, 200, 250, 300, 350, 380].map((r, i) => <motion.circle key={i} cx="400" cy="400" r={r} stroke="var(--color-accent)" strokeWidth="0.5" initial={{ opacity: .02 }} animate={{ opacity: .12 }} transition={{ duration: 2, delay: i * .1 }} />)}</svg></div><CustomCursor /><ThemeToggle /><div className="relative z-10 w-full px-8 md:px-16 lg:px-24"><Navbar /><main><Hero /><About /><Projects /><Work /><Contact /></main></div></div></AppProvider>;
}

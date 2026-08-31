'use client';

import { motion } from 'framer-motion';
import { CustomCursor } from '../legacy/components/CustomCursor';
import { ThemeToggle } from '../legacy/components/ThemeToggle';
import { Navbar } from '../legacy/components/Navbar';
import { Hero } from '../legacy/sections/Hero';
import { About } from '../legacy/sections/About';
import { Solutions } from '../legacy/sections/Solutions';
import { Projects } from '../legacy/sections/Projects';
import { Work } from '../legacy/sections/Work';
import { Contact } from '../legacy/sections/Contact';
import { AppProvider } from '../legacy/context/AppContext';
import type { Project } from '../legacy/types';

const RINGS = [50, 100, 150, 200, 250, 300, 350, 380];

export function ExactHome({ projects }: { projects: Project[] }) {
  return (
    <AppProvider>
      <div className="noise relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)] transition-colors duration-300">
        <div className="circles-bg">
          <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {RINGS.map((radius, index) => (
              <motion.circle
                key={radius}
                cx="400"
                cy="400"
                r={radius}
                stroke="var(--accent)"
                strokeWidth="0.5"
                initial={{ opacity: 0.02 }}
                animate={{ opacity: 0.12 }}
                transition={{ duration: 2, delay: index * 0.1 }}
              />
            ))}
          </svg>
        </div>
        <CustomCursor />
        <ThemeToggle />
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">
          <Navbar />
          <main>
            <Hero />
            <Solutions />
            <About />
            <Projects projects={projects} />
            <Work />
            <Contact />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

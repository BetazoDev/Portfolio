import { motion } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { ThemeToggle } from './components/ThemeToggle';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Work } from './sections/Work';
import { Contact } from './sections/Contact';

import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="noise relative min-h-screen bg-[var(--bg-primary)] overflow-x-hidden transition-colors duration-300">
        {/* Concentric circles background */}
        <div className="circles-bg">
          <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[50, 100, 150, 200, 250, 300, 350, 380].map((r, i) => (
              <motion.circle
                key={i}
                cx="400"
                cy="400"
                r={r}
                stroke="var(--color-accent)"
                strokeWidth="0.5"
                initial={{ opacity: 0.02 }}
                animate={{ opacity: 0.12 }}
                transition={{ duration: 2, delay: i * 0.1 }}
              />
            ))}
          </svg>
        </div>

        <CustomCursor />
        <ThemeToggle />

        {/* Main content — full width with controlled padding */}
        <div className="relative z-10 w-full px-8 md:px-16 lg:px-24">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Projects />
            <Work />
            <Contact />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-[100] w-14 h-14 rounded-full bg-[var(--bg-primary)] border border-accent flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] text-accent transition-colors duration-300"
      aria-label="Toggle Theme"
    >
      <div className="relative w-6 h-6">
        <motion.div
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : 90,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          className="absolute inset-0"
        >
          <Moon size={24} />
        </motion.div>
        <motion.div
          animate={{
            scale: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : -90,
            opacity: theme === 'light' ? 1 : 0,
          }}
          className="absolute inset-0"
        >
          <Sun size={24} />
        </motion.div>
      </div>
    </motion.button>
  );
};

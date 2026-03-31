import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { SectionHeader } from '../components/ui/SectionHeader';

const lineVariant = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.33, 1, 0.68, 1] as any,
      delay: i * 0.14 + 0.1,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] as any, delay: i * 0.12 + 0.75 },
  }),
};

export const Hero = () => {
  const { t } = useAppContext();
  const words = t('hero.words') as string[];

  return (
    <section
      id="hero"
      className="min-h-[92vh] flex flex-col justify-center py-28 border-b border-[var(--border-color)]"
    >
      <SectionHeader 
        subtitle={t('hero.available')} 
        className="mb-12"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      />

      {/* Staggered title — word by word, dark theme */}
      <h1 className="text-[clamp(2.5rem,6.5vw,7.5rem)] font-sans font-bold leading-[0.88] tracking-tight text-[var(--text-primary)] mb-16 overflow-hidden">
        {words.map((word, i) => (
          <span key={i} className="block overflow-hidden" style={{ paddingBottom: '0.07em' }}>
            <motion.span
              className="block"
              custom={i}
              variants={lineVariant}
              initial="hidden"
              animate="show"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Bottom grid */}
      <div className="grid md:grid-cols-2 gap-12 items-end">
        {/* Paragraph + CTAs */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <p className="text-base md:text-lg font-sans text-[var(--text-primary)]/80 max-w-md leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-accent text-white text-[11px] font-mono uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            >
              <span className="relative z-10 group-hover:text-accent transition-colors duration-300">{t('hero.viewWork')}</span>
              <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 z-0" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-[var(--border-color)] text-[var(--text-primary)]/90 text-[11px] font-mono uppercase tracking-[0.3em] hover:border-accent hover:text-accent transition-all duration-300"
            >
              {t('hero.contactMe')}
            </a>
            <a
              href="/docs/Humberto Alonso Lopez CV 2026.pdf"
              download
              className="px-8 py-4 bg-[var(--text-primary)]/5 border border-[var(--border-color)] text-[var(--text-primary)]/90 text-[11px] font-mono uppercase tracking-[0.3em] hover:bg-[var(--text-primary)]/10 hover:border-accent/40 hover:text-[var(--text-primary)]/100 transition-all duration-300 flex items-center gap-2"
            >
              {t('hero.cv')}
              <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-3 md:justify-end"
        >
          {[
            { label: 'Github', href: 'https://github.com/BetazoDev' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/halonso-l/' },
            { label: 'Figma', href: 'https://www.figma.com/design/NDIMf0eqCo8oi6oHCSODHf/Portfolio?node-id=602-4' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)]/60 hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-accent/50 px-5 py-2.5 transition-all duration-300 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-300" />
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from 'framer-motion';

const words = ['Software', 'Development', '& Management Enginnering'];

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
  return (
    <section
      id="hero"
      className="min-h-[92vh] flex flex-col justify-center py-28 border-b border-white/10"
    >
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mb-12 flex items-center gap-4"
      >
        <span className="w-8 h-[1px] bg-white/20" />
        <span className="text-[10px] font-mono uppercase tracking-[0.45em] text-white/30">
          Portfolio 2026 — Available for work
        </span>
      </motion.div>

      {/* Staggered title — word by word, dark theme */}
      <h1 className="text-[clamp(2.5rem,6.5vw,7.5rem)] font-sans font-bold leading-[0.88] tracking-tight text-white mb-16 overflow-hidden">
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
          <p className="text-base md:text-lg font-sans text-white/45 max-w-md leading-relaxed">
            Software Developer & WordPress Developer with hands-on experience building
            custom websites from scratch. Strong focus on UX/UI, responsive layouts,
            and performance optimization.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-white text-black text-[11px] font-mono uppercase tracking-[0.3em] overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Work</span>
              <div className="absolute inset-0 bg-black scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-400 z-0" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/20 text-white/70 text-[11px] font-mono uppercase tracking-[0.3em] hover:border-white hover:text-white transition-all duration-300"
            >
              Contact Me
            </a>
            <a
              href="/docs/Humberto Alonso Lopez CV 2026.pdf"
              download
              className="px-8 py-4 bg-white/5 border border-white/10 text-white/70 text-[11px] font-mono uppercase tracking-[0.3em] hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              CV
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/25 hover:text-white border border-white/10 hover:border-white/50 px-5 py-2.5 transition-all duration-300 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/15 group-hover:bg-white transition-colors duration-300" />
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

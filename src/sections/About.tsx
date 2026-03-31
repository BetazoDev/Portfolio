import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { SectionHeader } from '../components/ui/SectionHeader';
import { skillsData } from '../data/skills';

export const About = () => {
  const { t, language } = useAppContext();

  return (
    <section id="about" className="py-24 border-b border-[var(--border-color)]">
      <SectionHeader subtitle={t('about.subtitle')} />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        {/* Left: Skills Grid */}
        <div className="lg:col-span-7 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-[var(--text-primary)] tracking-tight leading-none mb-8">
              {t('about.title')}
            </h2>
            <p className="text-base font-sans leading-relaxed text-[var(--text-primary)]/80 max-w-xl">
              {t('about.description')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {skillsData.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="border border-[var(--border-color)] p-8 hover:bg-[var(--text-primary)]/[0.02] transition-colors duration-300"
              >
                <div className="mb-6 pb-4 border-b border-[var(--border-color)]">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">
                    {group.category[language]}
                  </span>
                </div>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm font-sans text-[var(--text-primary)]/90 flex items-start gap-3 w-full"
                    >
                      <span className="w-1.5 h-1.5 shrink-0 bg-accent mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Vertical Photo Layer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative w-full aspect-[3/4] border border-[var(--text-primary)]/15 bg-[var(--bg-primary)] overflow-hidden group"
        >
          <img 
            src="/me.png" 
            alt="Humberto Alonso" 
            className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[var(--text-primary)]/5 opacity-50 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 ring-1 ring-inset ring-[var(--text-primary)]/10 pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end mix-blend-difference pointer-events-none">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white drop-shadow-md shadow-black">
              Humberto / 2026
            </span>
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/70 drop-shadow-md shadow-black">
              [ {t('about.developer')} ]
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

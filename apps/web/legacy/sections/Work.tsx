import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { API_URL } from '@/lib/api';

type WorkItem = {
  id: string;
  company: string;
  role: string;
  timeframe: string;
  description?: string | null;
  translations?: Record<string, { role?: string; timeframe?: string; description?: string }>;
};

export const Work = () => {
  const { language, t } = useAppContext();
  const [items, setItems] = useState<WorkItem[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/experience`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setItems(data))
      .catch(() => {});
  }, []);

  // Static fallback if database is empty
  const fallbackData: WorkItem[] = [
    {
      id: '1',
      company: 'Reputation Defense Network',
      timeframe: '2025 - Present',
      role: language === 'es' ? 'Diseñador Web y Desarrollador WordPress' : 'Web Designer & WordPress Developer',
      description: language === 'es'
        ? 'Lideró el desarrollo integral de sitios WordPress de alto rendimiento partiendo de prototipos en Figma.'
        : 'Led end-to-end development of high-performance WordPress sites from Figma prototypes. Solved performance bottlenecks by optimizing load speeds and stability.',
    },
    {
      id: '2',
      company: 'Agency4RealEstate',
      timeframe: '2023 - 2024',
      role: language === 'es' ? 'Desarrollador Front-End de WordPress' : 'WordPress Developer',
      description: language === 'es'
        ? 'Arquitecté plataformas inmobiliarias y personalicé tiendas orgánicas en WooCommerce.'
        : 'Architected real estate platforms and customized complex WooCommerce stores. Solved major UX friction by optimizing Core Web Vitals.',
    },
    {
      id: '3',
      company: 'Bloom / DUDE Agency',
      timeframe: '2022 - 2023',
      role: language === 'es' ? 'Desarrollador Web' : 'WordPress Developer',
      description: language === 'es'
        ? 'Ingeniería de soluciones web responsivas a través de múltiples CMS como WordPress, Duda y HubSpot.'
        : 'Engineered responsive web solutions across CMS platforms including WordPress, Duda, and HubSpot.',
    },
  ];

  const workData = items.length ? items : fallbackData;

  const getTranslated = (item: WorkItem, field: 'role' | 'timeframe' | 'description') => {
    const langTrans = item.translations?.[language];
    if (langTrans && langTrans[field]) return langTrans[field];
    return item[field] ?? '';
  };

  return (
    <section id="work" className="py-24 border-b border-[var(--border-color)]">
      <div className="flex items-center gap-4 mb-20">
        <span className="w-8 h-[1px] bg-accent" />
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent font-medium">
          {language === 'es' ? 'Experiencia' : 'Experience'}
        </span>
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-[var(--text-primary)] tracking-tight leading-none mb-16">
        {t('work.title')}
      </h2>

      {/* Data Table Approach */}
      <div className="w-full border-t border-[var(--border-color)] flex flex-col">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 py-6 border-b border-[var(--border-color)] text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--text-primary)]/50">
          <div className="col-span-3 lg:col-span-2">{t('work.timeframe')}</div>
          <div className="col-span-4 lg:col-span-4">{t('work.company')}</div>
          <div className="col-span-5 lg:col-span-6">{t('work.role')}</div>
        </div>

        {workData.map((row, index) => (
          <motion.div
            key={row.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
            }}
            className="group relative"
          >
            {/* Animated Bottom Border Line */}
            <motion.div
              variants={{
                hidden: { width: 0 },
                visible: { width: '100%' },
              }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] as any, delay: index * 0.1 }}
              className="absolute bottom-0 left-0 h-[1px] bg-[var(--border-color)]"
            />

            {/* Row Layout */}
            <div className="grid md:grid-cols-12 py-8 lg:py-12 gap-y-4 gap-x-6 hover:bg-[var(--text-primary)]/[0.02] transition-colors duration-500 min-h-[140px] items-center">
              {/* Year */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="col-span-3 lg:col-span-2 text-sm font-mono text-accent tracking-widest pl-4"
              >
                {getTranslated(row, 'timeframe')}
              </motion.div>

              {/* Company */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="col-span-4 lg:col-span-4 pl-4 md:pl-0"
              >
                <span className="text-xl md:text-3xl font-sans font-medium text-[var(--text-primary)] group-hover:pl-2 transition-all duration-300">
                  {row.company}
                </span>
              </motion.div>

              {/* Role */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="col-span-5 lg:col-span-6 pl-4 md:pl-0"
              >
                <span className="text-sm md:text-base font-sans leading-relaxed text-[var(--text-primary)]/90 block max-w-lg mb-2">
                  {getTranslated(row, 'role')}
                </span>
                <p className="text-xs md:text-sm font-sans text-[var(--text-primary)]/70 leading-relaxed max-w-xl">
                  {getTranslated(row, 'description')}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

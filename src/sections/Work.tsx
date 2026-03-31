import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

export const Work = () => {
  const { language, t } = useAppContext();

  const workData = [
    {
      id: 1,
      years: '2025 - Present',
      company: 'Reputation Defense Network',
      role: language === 'es' ? 'Diseñador Web y Desarrollador WordPress' : 'Web Designer & WordPress Developer',
      description: language === 'es' 
        ? 'Lideré el desarrollo integral de sitios WordPress de alto rendimiento partiendo de prototipos en Figma. Resolví cuellos de botella optimizando los tiempos de carga y la estabilidad general, e impulsé la escalabilidad del equipo mediante la implementación de procesos estructurados y componentes reutilizables.'
        : 'Led end-to-end development of high-performance WordPress sites from Figma prototypes. Solved performance bottlenecks by optimizing load speeds and stability, and drove workflow scalability through the implementation of structured processes and reusable components.',
    },
    {
      id: 2,
      years: '2023 - 2024',
      company: 'Agency4RealEstate',
      role: language === 'es' ? 'Desarrollador Front-End de WordPress' : 'WordPress Front-End Developer',
      description: language === 'es'
        ? 'Arquitecté plataformas inmobiliarias y personalicé tiendas orgánicas en WooCommerce. Resolví fricciones críticas de UX optimizando los Core Web Vitals y simplificando los flujos de configuración, resultando en sitios considerablemente más rápidos, seguros y con mayor conversión de leads.'
        : 'Architected real estate platforms and customized complex WooCommerce stores. Solved major UX friction by optimizing Core Web Vitals and streamlining configuration pipelines, resulting in significantly faster, highly secure sites with improved lead conversion.',
    },
    {
      id: 3,
      years: '2022 - 2023',
      company: 'Bloom / DUDE Agency',
      role: language === 'es' ? 'Desarrollador Web' : 'Web Developer',
      description: language === 'es'
        ? 'Ingeniería de soluciones web responsivas a través de múltiples CMS como WordPress, Duda y HubSpot. Aceleré la entrega de proyectos al resolver bugs recurrentes del ecosistema, asegurando una conversión pixel-perfect del diseño y reduciendo los tiempos de soporte técnico de clientes internacionales.'
        : 'Engineered responsive web solutions across CMS platforms including WordPress, Duda, and HubSpot. Accelerated project delivery by resolving recurrent core bugs, ensuring pixel-perfect design translation and significantly reducing technical support cycles for international clients.',
    },
  ];

  return (
    <section id="work" className="py-24 border-b border-[var(--border-color)]">
      <div className="flex items-center gap-4 mb-20">
        <span className="w-8 h-[1px] bg-accent" />
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent font-medium">
          {t('work.subtitle')}
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
                {row.years}
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
                    {row.role}
                 </span>
                  <p className="text-xs md:text-sm font-sans text-[var(--text-primary)]/70 leading-relaxed max-w-xl">
                    {row.description}
                  </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

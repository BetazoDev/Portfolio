import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { SectionHeader } from '../components/ui/SectionHeader';

const solutions = [
  {
    number: '01',
    title: { en: 'Digital platforms', es: 'Plataformas digitales' },
    description: {
      en: 'Scalable products, portals and business systems built around real operational needs.',
      es: 'Productos, portales y sistemas de negocio escalables construidos alrededor de necesidades operativas reales.',
    },
    stack: 'PRODUCT · UX · FRONTEND · BACKEND',
  },
  {
    number: '02',
    title: { en: 'CMS & content systems', es: 'CMS y sistemas de contenido' },
    description: {
      en: 'Editorial platforms that give teams control of content, media, SEO and publishing.',
      es: 'Plataformas editoriales que dan al equipo control de contenido, medios, SEO y publicación.',
    },
    stack: 'HEADLESS CMS · WORDPRESS · APIS',
  },
  {
    number: '03',
    title: { en: 'Automation & AI', es: 'Automatización e IA' },
    description: {
      en: 'Intelligent workflows, integrations and automation designed to reduce manual work.',
      es: 'Flujos inteligentes, integraciones y automatización diseñados para reducir trabajo manual.',
    },
    stack: 'AI · N8N · DATA · INTEGRATIONS',
  },
];

export const Solutions = () => {
  const { language } = useAppContext();
  const langKey = (language as 'en' | 'es') === 'es' ? 'es' : 'en';
  return (
    <section id="solutions" className="border-b border-[var(--border-color)] py-24">
      <SectionHeader subtitle={language === 'en' ? 'Capabilities' : 'Capacidades'} />
      <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="text-4xl font-sans font-bold leading-[.92] tracking-tight text-[var(--text-primary)] md:text-6xl lg:col-span-8 lg:text-7xl">
          {language === 'en' ? 'Solutions built around business.' : 'Soluciones creadas alrededor del negocio.'}
        </h2>
        <p className="max-w-md text-sm leading-7 text-[var(--text-primary)]/60 lg:col-span-4">
          {language === 'en'
            ? 'I start with the problem, the process and the outcome the product must produce.'
            : 'Parto del problema, el proceso y el resultado que el producto debe producir.'}
        </p>
      </div>
      <div className="border-t border-[var(--border-color)]">
        {solutions.map((solution, index) => (
          <motion.article
            key={solution.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="grid gap-6 border-b border-[var(--border-color)] py-10 md:grid-cols-12 md:items-start"
          >
            <span className="font-mono text-[10px] text-accent md:col-span-1">{solution.number}</span>
            <h3 className="text-2xl font-sans font-bold uppercase tracking-tight md:col-span-5 md:text-4xl">{solution.title[langKey]}</h3>
            <div className="md:col-span-6">
              <p className="max-w-xl text-sm leading-7 text-[var(--text-primary)]/65">{solution.description[langKey]}</p>
              <p className="mt-6 font-mono text-[9px] uppercase tracking-[.22em] text-[var(--text-primary)]/45">{solution.stack}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

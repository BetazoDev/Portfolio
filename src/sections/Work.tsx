import { motion } from 'framer-motion';

const workData = [
  {
    id: 1,
    years: '2025 - Present',
    company: 'Reputation Defense Network',
    role: 'Web Designer & WordPress Developer | Figma to WordPress',
    description: 'Specializing in high-performance WordPress development and interactive UI/UX design. Transforming complex Figma prototypes into pixel-perfect, responsive websites. Focused on performance optimization, SEO best practices, and custom theme development using modern stacks.',
  },
  {
    id: 2,
    years: '2023 - 2024',
    company: 'Agency4RealEstate',
    role: 'WordPress Front-End Developer | Elementor, WooCommerce',
    description: 'Developed and maintained robust real estate platforms using WordPress and Elementor. Integrated WooCommerce for property listings and lead generation systems. Improved site speed and user engagement through optimized front-end workflows and customized plugins.',
  },
  {
    id: 3,
    years: '2022 - 2023',
    company: 'Bloom / Former DUDE Agency',
    role: 'Web Developer | WordPress, Duda, HubSpot',
    description: 'Collaborated with cross-functional teams to deliver diverse web solutions across multiple CMS platforms. Mastered HubSpot integration and Duda white-label development. Streamlined internal development processes and ensured high-quality standards for international clients.',
  },
];

export const Work = () => {
  return (
    <section id="work" className="py-24 border-b border-white/10">
      <div className="flex items-center gap-4 mb-20">
        <span className="w-8 h-[1px] bg-white/20" />
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30">
          Professional Experience
        </span>
      </div>

      <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-none mb-16">
        Work Timeline
      </h2>

      {/* Data Table Approach */}
      <div className="w-full border-t border-white/10 flex flex-col">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 py-6 border-b border-white/10 text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
          <div className="col-span-3 lg:col-span-2">Timeframe</div>
          <div className="col-span-4 lg:col-span-4">Company</div>
          <div className="col-span-5 lg:col-span-6">Role & Impact</div>
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
              className="absolute bottom-0 left-0 h-[1px] bg-white/15"
            />

            {/* Row Layout */}
            <div className="grid md:grid-cols-12 py-8 lg:py-12 gap-y-4 gap-x-6 hover:bg-white/[0.02] transition-colors duration-500 min-h-[140px] items-center">
              
              {/* Year */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="col-span-3 lg:col-span-2 text-sm font-mono text-white/40 tracking-widest pl-4"
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
                 <span className="text-xl md:text-3xl font-sans font-medium text-white group-hover:pl-2 transition-all duration-300">
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
                 <span className="text-sm md:text-base font-sans leading-relaxed text-white/50 block max-w-lg mb-2">
                    {row.role}
                 </span>
                  <p className="text-xs md:text-sm font-sans text-white/30 leading-relaxed max-w-xl">
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

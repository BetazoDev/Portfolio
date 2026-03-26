import { motion } from 'framer-motion';

const skillsLayout = [
  {
    category: 'Front-end',
    items: ['React & TypeScript', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    category: 'Styles/UI/UX',
    items: ['Figma', 'Tailwind CSS', 'UI/UX Design'],
  },
  {
    category: 'Back-end/CMS',
    items: ['NodeJs', 'Express', 'MongoDB', 'TypeScript'],
  },
  {
    category: 'DevOps/Other',
    items: ['Dokploy', 'Nginx', 'Git', 'GitHub', 'PostgreSQL'],
  },
];

export const About = () => {
  return (
    <section id="about" className="py-24 border-b border-white/10">
      <div className="flex items-center gap-4 mb-20">
        <span className="w-8 h-[1px] bg-white/20" />
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30">
          About Me
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        {/* Left: Skills Grid */}
        <div className="lg:col-span-7 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight leading-none mb-8">
              Technical Arsenal
            </h2>
            <p className="text-base font-sans leading-relaxed text-white/45 max-w-xl">
              I specialize in robust architectures and pixel-perfect UIs, constantly looking to bridge the gap between design vision and technical execution.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {skillsLayout.map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="border border-white/10 p-8 hover:bg-white/[0.02] transition-colors duration-300"
              >
                <div className="mb-6 pb-4 border-b border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
                    {group.category}
                  </span>
                </div>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm font-sans text-white/70 flex items-start gap-3 w-full"
                    >
                      <span className="w-1.5 h-1.5 shrink-0 bg-white mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Vertical Photo Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative w-full aspect-[3/4] border border-white/15 bg-[#0a0a0a] overflow-hidden group"
        >
          {/* Black and white placeholder for photo */}
          <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 w-full h-full object-cover">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/5 opacity-50 mix-blend-overlay" />

            {/* Minimalist abstract developer portrait representation */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="w-full h-full border border-white/10 flex flex-col justify-between">
                {/* Faux Code editor effect */}
                <div className="border-b border-white/10 flex px-4 h-8 items-center gap-1.5 opacity-30">
                  <span className="w-1 h-1 bg-white" />
                  <span className="w-1 h-1 bg-white" />
                  <span className="w-1 h-1 bg-white" />
                </div>
                <div className="flex-1 p-6 flex flex-col gap-4 opacity-10 font-mono text-xs leading-none">
                  <span className="w-1/2 h-1 bg-white block" />
                  <span className="w-3/4 h-1 bg-white block" />
                  <span className="w-2/3 h-1 bg-white block" />
                  <span className="w-1/3 h-1 bg-white block mt-8" />
                  <span className="w-full h-1 bg-white block" />
                </div>
              </div>
            </div>

            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end mix-blend-difference">
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white">
                Humberto / 2026
              </span>
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/50">
                [ Developer ]
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

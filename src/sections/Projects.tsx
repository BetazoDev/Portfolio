import { motion } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    number: '01',
    title: 'DIABOLICAL MEDIA MANAGER',
    year: '2024',
    description:
      'Internal image management and CDN system. Features automatic image optimization (WebP/AVIF) and dynamic CDN serving.',
    stack: ['Next.js', 'Node.js', 'Express', 'Sharp', 'PostgreSQL'],
    link: 'https://media.diabolicalservices.tech/',
    github: 'https://github.com/BetazoDev',
    image: 'https://cdn.diabolicalservices.tech/diabolical/general/original/icono-diabolical-blanco.png', // Add image path here
  },
  {
    number: '02',
    title: 'Project Manager System',
    year: '2024',
    description:
      'Internal Project Management System designed to streamline the workflow of web production teams with Kanban pipeline.',
    stack: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Node.js', 'MongoDB'],
    link: 'https://rdn.diabolicalservices.tech/',
    github: 'https://github.com/BetazoDev',
    image: 'https://cdn.diabolicalservices.tech/humberto-personal-projects/general/original/gemini-generated-image-a95usua95usua95u-1.png', // Add image path here
  },
  {
    number: '03',
    title: 'NailFlow',
    year: '2025',
    description:
      'A custom booking automation platform designed specifically for nail technicians in LATAM.',
    stack: ['React', 'TypeScript', 'Framer Motion', 'UI/UX Design'],
    link: 'https://demo.diabolicalservices.tech/',
    github: 'https://github.com/BetazoDev',
    image: 'https://cdn.diabolicalservices.tech/humberto-personal-projects/general/original/gemini-generated-image-v8v6blv8v6blv8v6.png', // Add image path here
  },
  {
    number: '04',
    title: 'ERP Diabolical',
    year: '2024',
    description:
      'Enterprise Resource Planning system for internal management and operations at Diabolical Projects.',
    stack: ['Internal Tool', 'System Design'],
    link: '#',
    github: 'https://github.com/diabolicalprojects/erp-diabolical',
    image: 'https://cdn.diabolicalservices.tech/diabolical/general/original/icono-diabolical-blanco.png', // Add image path here
  },
  {
    number: '05',
    title: 'Diabolical Landing Page',
    year: '2024',
    description:
      'Corporate landing page focusing on high performance, modern UI/UX, and optimized Core Web Vitals.',
    stack: ['React', 'Performance', 'UI/UX'],
    link: 'https://diabolicalservices.tech/',
    github: 'https://github.com/diabolicalprojects/landing-page',
    image: 'https://cdn.diabolicalservices.tech/diabolical/general/original/icono-diabolical-blanco.png', // Add image path here
  },
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <section id="projects" className="py-24 border-b border-white/10 overflow-hidden">
      <div className="flex items-center gap-4 mb-20">
        <span className="w-8 h-[1px] bg-white/20" />
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30">
          Selected Work
        </span>
      </div>

      <div className="flex items-end justify-between mb-16 gap-8">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-none">
          Featured Projects
        </h2>
        <div className="hidden md:flex flex-col items-end gap-2">
          <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
            {projects.length} Works
          </p>
          <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] animate-pulse">
            [ Scroll to Navigate ]
          </p>
        </div>
      </div>

      {/* Horizontal Slider Area */}
      <div
        className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory cursor-grab active:cursor-grabbing px-4 md:px-0"
        ref={containerRef}
      >
        <div className="flex gap-6">
          {duplicatedProjects.map((project, index) => (
            <motion.div
              key={`${project.number}-${index}`}
              className="w-[85vw] md:w-[45vw] lg:w-[30vw] h-[480px] shrink-0 border border-white/10 bg-black overflow-hidden group rounded-none snap-start relative"
            >
              {/* Card Content - Background Image Layer */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity duration-500">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full border border-white/5 flex flex-col items-center justify-center p-8">
                    <div className="w-full h-full border border-white/5 grid grid-cols-4 grid-rows-4 gap-2 p-2 opacity-30">
                      {[...Array(16)].map((_, i) => <div key={i} className="bg-white/5" />)}
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 font-mono text-[40px] md:text-[60px] font-bold select-none uppercase tracking-tighter">
                      No Image
                    </div>
                  </div>
                )}
              </div>

              {/* Main Info Layer (Always Visible) */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col h-full pointer-events-none group-hover:opacity-20 transition-opacity duration-500">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-sm font-mono uppercase tracking-[0.4em] text-white/60">
                    {project.number}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-[0.1em] text-white/40">
                    {project.year}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-tight mb-4 text-white leading-tight uppercase">
                    {project.title}
                  </h3>
                  <p className="text-xs font-sans text-white/50 leading-relaxed line-clamp-3 max-w-sm">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Hover Overlay Layer (Stack & Buttons) */}
              <div className="absolute inset-0 z-20 bg-black/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-8 text-center">
                <div className="flex flex-wrap justify-center gap-2 mb-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-mono uppercase tracking-[0.2em] border border-white/20 px-3 py-1.5 text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 border border-white text-[11px] font-mono uppercase tracking-[0.3em] px-8 py-4 hover:bg-white hover:text-black transition-all duration-300"
                  >
                    View Project
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border border-white/20 w-12 h-12 hover:border-white hover:text-white transition-all duration-300 group/git"
                  >
                    <svg className="w-6 h-6 text-white/40 group-hover/git:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Mobile scroll instructions */}
      <div className="mt-8 md:hidden flex justify-center">
        <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] border border-white/10 px-4 py-2">
          Swipe to navigate →
        </span>
      </div>
    </section>
  );
};


import { motion } from 'framer-motion';
import type { Project } from '../types';
import { useAppContext } from '../context/AppContext';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { t, language } = useAppContext();
  const description = project.description[language] || project.description['en'];

  return (
    <motion.div
      key={`${project.number}-${index}`}
      className="w-[85vw] md:w-[45vw] lg:w-[30vw] h-[480px] shrink-0 border border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden group rounded-none snap-start relative"
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
          <div className="w-full h-full border border-[var(--border-color)]/20 flex flex-col items-center justify-center p-8">
            <div className="w-full h-full border border-[var(--border-color)] grid grid-cols-4 grid-rows-4 gap-2 p-2 opacity-30">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="bg-[var(--text-primary)]/5" />
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--text-primary)]/10 font-mono text-[40px] md:text-[60px] font-bold select-none uppercase tracking-tighter">
              {t('projects.noImage')}
            </div>
          </div>
        )}
      </div>

      {/* Main Info Layer (Always Visible) */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full pointer-events-none group-hover:opacity-20 transition-opacity duration-500">
        <div className="flex justify-between items-start mb-6">
          <span className="text-sm font-mono uppercase tracking-[0.4em] text-accent">
            {project.number}
          </span>
          <span className="text-xs font-mono uppercase tracking-[0.1em] text-[var(--text-primary)]/70">
            {project.year}
          </span>
        </div>

        <div className="mt-auto">
          <h3 className="text-2xl md:text-3xl font-sans font-bold tracking-tight mb-4 text-[var(--text-primary)] leading-tight uppercase">
            {project.title}
          </h3>
          <p className="text-xs font-sans text-[var(--text-primary)]/80 leading-relaxed line-clamp-3 max-w-sm">
            {description}
          </p>
        </div>
      </div>

      {/* Hover Overlay Layer (Stack & Buttons) */}
      <div className="absolute inset-0 z-20 bg-[var(--bg-primary)]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center p-8 text-center">
        <div className="flex flex-wrap justify-center gap-2 mb-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[9px] font-mono uppercase tracking-[0.2em] border border-accent/30 px-3 py-1.5 text-accent-light"
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
            className="inline-flex items-center gap-3 border border-accent bg-accent/10 text-[11px] font-mono uppercase tracking-[0.3em] px-8 py-4 hover:bg-accent hover:text-white transition-all duration-300"
          >
            {t('projects.viewProject')}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-[var(--border-color)]/20 w-12 h-12 hover:border-accent hover:text-accent transition-all duration-300 group/git text-[var(--text-primary)]/60"
          >
            <svg className="w-6 h-6 group-hover:text-accent" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

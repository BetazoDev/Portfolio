import { useRef, useState, type MouseEvent } from 'react';
import { useAppContext } from '../context/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeader } from '../components/ui/SectionHeader';
import type { Project } from '../types';

export const Projects = ({ projects }: { projects: Project[] }) => {
  const { t } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // A short list is repeated so the horizontal rail still feels continuous; a long one is not,
  // because duplicating it only multiplies DOM nodes and image requests.
  const rail = projects.length && projects.length < 5 ? [...projects, ...projects, ...projects] : projects;

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="projects" className="py-24 border-b border-[var(--border-color)] overflow-hidden">
      <SectionHeader subtitle={t('projects.selectedWork')} />

      <div className="flex items-end justify-between mb-16 gap-8">
        <h2 className="section-title font-sans font-bold text-[var(--text-primary)]">
          {t('projects.title')}
        </h2>
        <div className="hidden md:flex flex-col items-end gap-2">
          <p className="text-[10px] font-mono text-[var(--text-primary)]/60 uppercase tracking-widest">
            {projects.length} {t('projects.works')}
          </p>
          <p className="text-[9px] font-mono text-accent uppercase tracking-[0.2em] animate-pulse">
            {t('projects.scroll')}
          </p>
        </div>
      </div>

      {/* Horizontal Slider Area */}
      <div
        className={`flex gap-6 overflow-x-auto pb-12 scrollbar-hide px-4 md:px-0 ${
          isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'
        }`}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div className="flex gap-6">
          {rail.map((project, index) => (
            <ProjectCard 
              key={`${project.id}-${index}`} 
              project={project} 
              index={index % projects.length}
            />
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
        <span className="text-[9px] font-mono text-accent uppercase tracking-[0.2em] border border-accent/20 px-4 py-2">
          {t('projects.swipe')}
        </span>
      </div>
    </section>
  );
};

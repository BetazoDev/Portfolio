import { useRef, useState, type MouseEvent } from 'react';
import { useAppContext } from '../context/AppContext';
import { projectsData } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeader } from '../components/ui/SectionHeader';

export const Projects = () => {
  const { t } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Duplicating projects for infinite horizontal scroll effect
  const duplicatedProjects = [...projectsData, ...projectsData, ...projectsData];

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
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-sans font-bold text-[var(--text-primary)] tracking-tight leading-none">
          {t('projects.title')}
        </h2>
        <div className="hidden md:flex flex-col items-end gap-2">
          <p className="text-[10px] font-mono text-[var(--text-primary)]/60 uppercase tracking-widest">
            {projectsData.length} {t('projects.works')}
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
          {duplicatedProjects.map((project, index) => (
            <ProjectCard 
              key={`${project.id}-${index}`} 
              project={project} 
              index={index} 
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

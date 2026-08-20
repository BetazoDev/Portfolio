import Link from 'next/link';
import type { PublicProject } from '@/lib/api';

export function ProjectGrid({ projects }: { projects: PublicProject[] }) {
  return <div className="grid border-l border-t border-[var(--border-color)] md:grid-cols-2">
    {projects.map((project, index) => <Link key={project.id} href={`/projects/${project.slug}`} className="group min-h-80 border-b border-r border-[var(--border-color)] p-7 transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] md:p-10">
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest opacity-60"><span>{String(index + 1).padStart(2, '0')}</span><span>{project.year ?? '—'}</span></div>
      <div className="mt-24"><h2 className="text-4xl font-bold uppercase tracking-tight md:text-6xl">{project.title}</h2><p className="mt-5 max-w-xl text-sm opacity-70">{project.shortSummary ?? project.subtitle}</p><div className="mt-8 flex flex-wrap gap-2">{project.technologies.map(({ technology }) => <span key={technology.id} className="border border-current px-2 py-1 font-mono text-[9px] uppercase">{technology.name}</span>)}</div></div>
    </Link>)}
  </div>;
}

import Link from 'next/link';
import type { Project } from '../lib/api';

export function ProjectCard({ project }: { project: Project }) {
  return <Link href={`/projects/${project.slug}`} className="project-card"><div className="project-card-art"><span>{project.projectType ?? 'Digital platform'}</span><strong>{project.title.slice(0, 1)}</strong></div><div className="project-card-copy"><div><h3>{project.title}</h3><p>{project.shortSummary ?? project.subtitle ?? 'A system designed for clarity, scale and measurable outcomes.'}</p></div><span className="arrow">↗</span></div><div className="tags">{project.technologies?.slice(0, 4).map(({ technology }) => <span key={technology.name}>{technology.name}</span>)}</div></Link>;
}

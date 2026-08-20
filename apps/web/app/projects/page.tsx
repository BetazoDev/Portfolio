/* eslint-disable react-refresh/only-export-components */
import { SiteFooter, SiteHeader } from '../components/SiteHeader';
import { ProjectCard } from '../components/ProjectCard';
import { getProjects } from '../lib/api';

export const metadata = { title: 'Projects' };
export default async function ProjectsPage() { const projects = await getProjects(); return <><SiteHeader /><main className="page-shell"><div className="page-intro"><span className="eyebrow">SELECTED WORK</span><h1>Projects that<br /><em>move the needle.</em></h1><p>Case studies in product design, automation, CMS architecture and software systems.</p></div><div className="filter-row"><span className="filter-active">All projects</span><span>AI & Automation</span><span>CMS</span><span>Business platforms</span></div><div className="project-grid project-grid-wide">{projects.length ? projects.map((project) => <ProjectCard key={project.id} project={project} />) : <div className="empty-state">No published projects yet. Use the admin panel to publish your first case study.</div>}</div></main><SiteFooter /></>; }

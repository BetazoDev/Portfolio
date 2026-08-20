import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { ProjectGrid } from '@/components/project-grid';
import { getProjects } from '@/lib/api';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Proyectos', description: 'Casos de estudio y plataformas desarrolladas por Humberto Alonso.' };
export default async function ProjectsPage() { const projects = await getProjects(); return <SiteShell><main className="mx-auto max-w-[1600px] px-6 py-20 md:px-12"><p className="eyebrow">Portfolio / Selected work</p><h1 className="display-title my-12">Projects</h1><p className="mb-16 max-w-3xl text-xl muted">Plataformas, productos, automatizaciones y experiencias digitales. Filtra por categoría o tecnología.</p><ProjectGrid projects={projects} filters /></main></SiteShell>; }

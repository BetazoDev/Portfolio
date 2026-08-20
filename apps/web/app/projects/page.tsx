import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { ProjectGrid } from '@/components/project-grid';
import { getProjects } from '@/lib/api';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = { title: 'Proyectos', description: 'Casos de estudio y plataformas desarrolladas por Humberto Alonso.' };
export default async function ProjectsPage() { const projects = await getProjects(); return <SiteShell><main className="mx-auto max-w-[1600px] px-6 py-20 md:px-12"><p className="font-mono text-[10px] uppercase tracking-[.3em] text-accent">Portfolio / Casos de estudio</p><h1 className="my-12 text-7xl font-bold uppercase tracking-[-.06em] md:text-9xl">Proyectos</h1><ProjectGrid projects={projects} /></main></SiteShell>; }

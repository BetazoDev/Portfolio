import type { Project } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

type CmsProject = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  shortSummary?: string | null;
  projectType?: string | null;
  year?: number | null;
  technologies?: { technology: { name: string } }[];
  links?: { url: string }[];
};

export async function fetchPublishedProjects(): Promise<Project[] | null> {
  try {
    const response = await fetch(`${API_URL}/api/projects`, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) return null;
    const projects = (await response.json()) as CmsProject[];
    return projects.map((project, index) => ({
      id: project.id,
      number: String(index + 1).padStart(2, '0'),
      title: project.title.toUpperCase(),
      year: String(project.year ?? 2026),
      description: {
        en: project.shortSummary ?? project.subtitle ?? '',
        es: project.shortSummary ?? project.subtitle ?? '',
      },
      stack: project.technologies?.map(({ technology }) => technology.name) ?? [],
      link: project.links?.[0]?.url ?? '#',
      github: '',
    }));
  } catch {
    return null;
  }
}

export { API_URL };

import type { Project } from '../types';
import { projectsData } from '../data/projects';

const API_URL = '';

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
  media?: { type: string; media: { publicUrl?: string | null } }[];
};

export async function fetchPublishedProjects(): Promise<Project[] | null> {
  try {
    const response = await fetch(`${API_URL}/api/projects/home`, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) return null;
    const projects = (await response.json()) as CmsProject[];
    return projects.map((project, index) => {
      const original = projectsData.find((item) => item.title.toLowerCase() === project.title.toLowerCase());
      return ({
      id: project.id,
      number: String(index + 1).padStart(2, '0'),
      title: project.title.toUpperCase(),
      year: String(project.year ?? 2026),
      description: original?.description ?? {
        en: project.shortSummary ?? project.subtitle ?? '',
        es: project.shortSummary ?? project.subtitle ?? '',
      },
      stack: project.technologies?.length ? project.technologies.map(({ technology }) => technology.name) : (original?.stack ?? []),
      link: `/projects/${project.slug}`,
      github: '',
      image: project.media?.find(({ type, media }) => (type === 'thumbnail' || type === 'cover') && media.publicUrl)?.media.publicUrl ?? undefined,
    });
    });
  } catch {
    return null;
  }
}

export { API_URL };

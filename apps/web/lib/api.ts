import type { Project } from '@/legacy/types';

/**
 * Server components talk to the API over the internal network when `API_INTERNAL_URL` is set,
 * which avoids a public DNS + TLS round trip on every render. The browser never uses these:
 * client code hits `BROWSER_API_URL` (same origin) and the Next rewrite in `next.config.ts`
 * forwards it to the API.
 */
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
export const SERVER_API_URL = process.env.API_INTERNAL_URL ?? API_URL;
export const BROWSER_API_URL = '';

/** Seconds the public content stays cached before Next revalidates it against the CMS. */
export const CONTENT_REVALIDATE = 60;

export type PublicProject = {
  id: string;
  title: string;
  titleEn?: string | null;
  slug: string;
  subtitle: string | null;
  subtitleEn?: string | null;
  shortSummary: string | null;
  shortSummaryEn?: string | null;
  problem: string | null;
  problemEn?: string | null;
  solution: string | null;
  solutionEn?: string | null;
  result: string | null;
  resultEn?: string | null;
  role: string | null;
  year: number | null;
  clientName: string | null;
  industry: string | null;
  projectType: string | null;
  architectureSummary: string | null;
  architectureSummaryEn?: string | null;
  frontendStack: string | null;
  backendStack: string | null;
  databaseStack: string | null;
  automationStack: string | null;
  aiStack: string | null;
  deploymentStack: string | null;
  featured: boolean;
  seoTitle: string | null;
  seoTitleEn?: string | null;
  seoDescription: string | null;
  seoDescriptionEn?: string | null;
  translations?: Record<string, Record<string, string>> | null;
  technologies: { technology: { id: string; name: string; slug: string } }[];
  categories: { category: { id: string; name: string; slug: string } }[];
  media: { id: string; type: string; title: string | null; caption: string | null; media: { publicUrl: string | null; altText: string | null } }[];
  links: { id: string; label: string; url: string; type: string; isPublic?: boolean }[];
  sections: { id: string; type: string; title: string | null; content: unknown; sortOrder: number }[];
};

/**
 * Resolves a translatable project field. Order: the `translations` JSON for the requested
 * language, then the dedicated `*En` column when English is asked for, then the base column,
 * then English as a last resort so a page never renders an empty string.
 */
export function getProjectField(project: PublicProject, field: string, lang: string): string {
  const translated = project.translations?.[lang]?.[field];
  if (translated && translated.trim() !== '') return translated;

  const english = (project as unknown as Record<string, unknown>)[`${field}En`];
  const base = (project as unknown as Record<string, unknown>)[field];
  const order = lang === 'en' ? [english, base] : [base, english];

  for (const value of order) {
    if (value && String(value).trim() !== '') return String(value);
  }
  return '';
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${SERVER_API_URL}${path}`, { next: { revalidate: CONTENT_REVALIDATE } });
  if (!response.ok) throw new Error(`API ${path} responded ${response.status}`);
  return response.json() as Promise<T>;
}

/** Every published project, including the ones hidden from the homepage carousel. */
export async function getProjects(): Promise<PublicProject[]> {
  return fetchJson<PublicProject[]>('/api/projects');
}

export async function getProject(slug: string): Promise<PublicProject | null> {
  const response = await fetch(`${SERVER_API_URL}/api/projects/${encodeURIComponent(slug)}`, {
    next: { revalidate: CONTENT_REVALIDATE },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`API project ${slug} responded ${response.status}`);
  return response.json();
}

function projectImage(project: PublicProject): string | undefined {
  const preferred = project.media.find(
    (item) => (item.type === 'thumbnail' || item.type === 'cover') && item.media.publicUrl,
  );
  return preferred?.media.publicUrl ?? undefined;
}

/**
 * Homepage carousel data, mapped server-side so the markup ships with the HTML instead of
 * appearing after a client fetch. The CMS is the only source: there is no static fallback.
 */
export async function getHomeProjects(): Promise<Project[]> {
  let projects: PublicProject[] = [];
  try {
    projects = await fetchJson<PublicProject[]>('/api/projects/home');
  } catch (error) {
    console.error('Failed to load homepage projects:', error);
    return [];
  }

  return projects.map((project, index) => ({
    id: project.id,
    number: String(index + 1).padStart(2, '0'),
    title: (getProjectField(project, 'title', 'en') || project.title).toUpperCase(),
    year: String(project.year ?? ''),
    description: {
      en: getProjectField(project, 'shortSummary', 'en') || getProjectField(project, 'subtitle', 'en'),
      es: getProjectField(project, 'shortSummary', 'es') || getProjectField(project, 'subtitle', 'es'),
    },
    stack: project.technologies.map(({ technology }) => technology.name),
    link: `/projects/${project.slug}`,
    github: project.links.find((link) => link.type === 'repository' && link.isPublic !== false)?.url ?? '',
    image: projectImage(project),
  }));
}

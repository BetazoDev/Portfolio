export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
export const BROWSER_API_URL = '';

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

export function getProjectField(
  project: PublicProject,
  field: string,
  lang: string,
): string {
  const trans = project.translations?.[lang];
  if (trans && trans[field] !== undefined && trans[field] !== null && trans[field].trim() !== '') {
    return trans[field];
  }

  if (lang === 'en') {
    const enVal = (project as any)[`${field}En`];
    if (enVal && String(enVal).trim() !== '') return String(enVal);
  }

  const baseVal = (project as any)[field];
  if (baseVal && String(baseVal).trim() !== '') return String(baseVal);

  if (lang !== 'en') {
    const enVal = (project as any)[`${field}En`];
    if (enVal && String(enVal).trim() !== '') return String(enVal);
  }

  return '';
}

export async function getProjects(): Promise<PublicProject[]> {
  const response = await fetch(`${API_URL}/api/projects`, { next: { revalidate: 60 } });
  if (!response.ok) throw new Error('No fue posible cargar los proyectos');
  return response.json();
}

export async function getProject(slug: string): Promise<PublicProject | null> {
  const response = await fetch(`${API_URL}/api/projects/${encodeURIComponent(slug)}`, { next: { revalidate: 60 } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('No fue posible cargar el proyecto');
  return response.json();
}

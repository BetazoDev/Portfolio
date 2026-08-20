export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
export const BROWSER_API_URL = '';

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  shortSummary: string | null;
  problem: string | null;
  solution: string | null;
  result: string | null;
  role: string | null;
  year: number | null;
  seoTitle: string | null;
  seoDescription: string | null;
  technologies: { technology: { id: string; name: string; slug: string } }[];
  categories: { category: { id: string; name: string; slug: string } }[];
  media: { id: string; type: string; title: string | null; caption: string | null; media: { publicUrl: string | null; altText: string | null } }[];
  links: { id: string; label: string; url: string; type: string }[];
  sections: { id: string; type: string; title: string | null; content: unknown; sortOrder: number }[];
};

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

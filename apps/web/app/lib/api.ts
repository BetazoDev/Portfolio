export type Project = {
  id: string; title: string; slug: string; subtitle?: string | null; shortSummary?: string | null;
  projectType?: string | null; role?: string | null; year?: number | null; status?: string;
  featured?: boolean; problem?: string | null; solution?: string | null; result?: string | null;
  architectureSummary?: string | null; seoTitle?: string | null; seoDescription?: string | null;
  technologies?: { technology: { name: string } }[]; categories?: { category: { name: string } }[];
  media?: { media: { publicUrl?: string | null; altText?: string | null; caption?: string | null } }[];
  links?: { label: string; url: string; type: string }[];
};

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function getProjects(): Promise<Project[]> {
  try { const response = await fetch(`${API}/api/projects`, { next: { revalidate: 60 } }); if (!response.ok) return []; return response.json(); }
  catch { return []; }
}

export async function getProject(slug: string): Promise<Project | null> {
  try { const response = await fetch(`${API}/api/projects/${slug}`, { next: { revalidate: 60 } }); if (!response.ok) return null; return response.json(); }
  catch { return null; }
}

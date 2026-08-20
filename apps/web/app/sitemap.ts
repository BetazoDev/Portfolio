import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/api';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://halonso.digital';
  let projects: Awaited<ReturnType<typeof getProjects>> = [];
  try { projects = await getProjects(); } catch { /* API can be unavailable during image build. */ }
  const staticRoutes: MetadataRoute.Sitemap = ['', '/projects', '/about', '/contact'].map((path) => ({ url: `${base}${path}`, changeFrequency: 'weekly', priority: path === '' ? 1 : .8 }));
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({ url: `${base}/projects/${project.slug}`, changeFrequency: 'monthly', priority: .7 }));
  return [...staticRoutes, ...projectRoutes];
}

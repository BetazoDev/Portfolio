import { ExactHome } from '@/components/exact-home';
import { getHomeProjects } from '@/lib/api';

// The homepage is CMS-driven, so it must not be frozen at build time.
export const revalidate = 60;

export default async function HomePage() {
  const projects = await getHomeProjects();
  return <ExactHome projects={projects} />;
}

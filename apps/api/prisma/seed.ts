import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const technologies = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Supabase', 'n8n', 'WordPress'];
const categories = ['AI Automation', 'Headless CMS', 'WordPress', 'SaaS', 'Business Platform', 'Lead Generation'];
const projects = [
  { title: 'Retrato', slug: 'retrato', subtitle: 'A headless editorial platform for independent publishing.', shortSummary: 'A premium editorial workflow connecting content, media and public storytelling.', projectType: 'Headless CMS', role: 'Architecture, frontend & CMS', year: 2026, status: 'published' as const, featured: true, problem: 'A modern publication needed a flexible editorial system without sacrificing visual direction.', solution: 'A headless content architecture with a custom frontend and reusable story presentation patterns.', result: 'A faster publishing workflow and a more distinctive reading experience.' },
  { title: 'Lumina Dental Studio', slug: 'lumina-dental-studio', subtitle: 'A conversion-focused digital experience for a modern clinic.', shortSummary: 'A calm, high-trust digital presence designed around patient action.', projectType: 'Business platform', role: 'Product design & development', year: 2026, status: 'published' as const, featured: true, problem: 'The clinic needed to communicate expertise and make the next step feel effortless.', solution: 'A responsive experience that combines clear service architecture, trust signals and focused conversion paths.', result: 'A more coherent brand system and a simpler path from discovery to contact.' },
  { title: 'NeoProspector', slug: 'neo-prospector', subtitle: 'Lead intelligence from map data and automated workflows.', shortSummary: 'A prospecting dashboard that turns raw location data into useful sales lists.', projectType: 'AI & automation', role: 'Full-stack development', year: 2026, status: 'published' as const, featured: true, problem: 'Sales teams needed to move from scattered search results to structured, actionable prospecting.', solution: 'A dashboard with scraping orchestration, filters, exports and a clear operational workflow.', result: 'A reusable foundation for repeatable lead generation and qualification.' },
  { title: 'HidroDemo', slug: 'hidrodemo', subtitle: 'A B2B analytics platform for media intelligence.', shortSummary: 'A data-heavy business platform made easier to understand and operate.', projectType: 'Business platform', role: 'Frontend, backend & deployment', year: 2026, status: 'published' as const, featured: false, problem: 'Complex media data needed to become a daily decision-making tool for teams.', solution: 'A structured dashboard experience backed by a dedicated API and persistent data layer.', result: 'A clearer operational view of the information that drives commercial decisions.' },
  { title: 'Diabolical Services', slug: 'diabolical-services', subtitle: 'A technical portfolio and systems studio.', shortSummary: 'A digital home for a studio building products, automations and internal tools.', projectType: 'Studio platform', role: 'Design system & development', year: 2026, status: 'published' as const, featured: false, problem: 'A broad range of technical capabilities needed a sharper commercial narrative.', solution: 'A modular site system that presents projects as business outcomes and technical case studies.', result: 'A stronger sales surface for high-value digital work.' },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@halonso.digital';
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error('ADMIN_PASSWORD is required for the initial seed');
  await prisma.user.upsert({ where: { email }, update: {}, create: { name: 'Humberto Alonso', email, passwordHash: await bcrypt.hash(password, 12), role: 'admin' } });
  for (const name of technologies) await prisma.technology.upsert({ where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }, update: {}, create: { name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') } });
  for (const name of categories) await prisma.category.upsert({ where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }, update: {}, create: { name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') } });
  for (const [sortOrder, project] of projects.entries()) {
    const saved = await prisma.project.upsert({ where: { slug: project.slug }, update: project, create: { ...project, publishedAt: project.status === 'published' ? new Date() : undefined, sortOrder } });
    const tech = await prisma.technology.findMany({ where: { slug: { in: ['next-js', 'react', 'typescript', 'node-js', 'postgresql', 'prisma'] } } });
    await prisma.projectTechnology.deleteMany({ where: { projectId: saved.id } });
    await prisma.projectTechnology.createMany({ data: tech.map((technology, index) => ({ projectId: saved.id, technologyId: technology.id, sortOrder: index })), skipDuplicates: true });
  }
}
main().finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const technologies = ['Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Supabase', 'n8n', 'WordPress'];
const categories = ['AI Automation', 'Headless CMS', 'WordPress', 'SaaS', 'Business Platform', 'Lead Generation'];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@halonso.digital';
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error('ADMIN_PASSWORD is required for the initial seed');
  await prisma.user.upsert({ where: { email }, update: {}, create: { name: 'Humberto Alonso', email, passwordHash: await bcrypt.hash(password, 12), role: 'admin' } });
  for (const name of technologies) await prisma.technology.upsert({ where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }, update: {}, create: { name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') } });
  for (const name of categories) await prisma.category.upsert({ where: { slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') }, update: {}, create: { name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') } });
}
main().finally(() => prisma.$disconnect());

// Applies Prisma migrations on container start.
//
// Production was provisioned with `prisma db push`, so its schema is correct but
// `_prisma_migrations` does not exist. Running `migrate deploy` against it would try to
// re-create existing tables and fail. This script baselines such a database once — marking
// every migration as already applied — and then defers to `migrate deploy` from then on.
// A brand-new database skips the baseline and gets the migrations applied normally.
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const migrationsDir = path.join(root, 'prisma', 'migrations');

const run = (args) => execFileSync('npx', ['prisma', ...args], { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });

const tableExists = async (prisma, table) => {
  const [{ exists }] = await prisma.$queryRaw`SELECT to_regclass(${`public.${table}`}) IS NOT NULL AS exists`;
  return exists;
};

const main = async () => {
  const prisma = new PrismaClient();
  try {
    const hasHistory = await tableExists(prisma, '_prisma_migrations');
    const hasSchema = await tableExists(prisma, 'projects');

    if (!hasHistory && hasSchema) {
      const migrations = readdirSync(migrationsDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
      console.log(`Baselining existing database against ${migrations.length} migration(s).`);
      for (const migration of migrations) run(['migrate', 'resolve', '--applied', migration]);
    }
  } finally {
    await prisma.$disconnect();
  }

  run(['migrate', 'deploy']);
};

main().catch((error) => {
  console.error('Migration step failed:', error);
  process.exit(1);
});

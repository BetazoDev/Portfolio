import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { PrismaClient, ProjectStatus, MediaType, SectionType } from '@prisma/client';
import { z } from 'zod';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT ?? 4000);
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
if (!accessSecret || accessSecret.length < 32 || !refreshSecret || refreshSecret.length < 32) throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must each contain at least 32 characters');
const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:3000';
const refreshCookie = 'portfolio_refresh';
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 }, fileFilter: (_req, file, callback) => callback(null, ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.mimetype)) });
let storageConfigurationError: string | null = null;
const supabase = (() => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  try {
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  } catch (error) {
    storageConfigurationError = error instanceof Error ? error.message : 'Invalid Supabase configuration';
    console.error('Supabase configuration failed:', storageConfigurationError);
    return null;
  }
})();
const storageBucket = process.env.SUPABASE_BUCKET ?? 'portfolio-media';
const tokenHash = (token: string) => crypto.createHash('sha256').update(token).digest('hex');
const signAccess = (user: { id: string; email: string; role: string }) => jwt.sign({ sub: user.id, email: user.email, role: user.role }, accessSecret, { expiresIn: '15m' as any });
const signRefresh = (userId: string) => jwt.sign({ sub: userId, type: 'refresh' }, refreshSecret, { expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN ?? '30d') as any });

app.use(helmet());
app.use(cors({ origin: corsOrigin.split(',').map((value) => value.trim()), credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.get('/health', async (_req, res) => { await prisma.$queryRaw`SELECT 1`; res.json({ ok: true, service: 'portfolio-api' }); });
app.get('/health/storage', async (_req, res) => { if (!supabase) return res.status(503).json({ ok: false, storage: storageConfigurationError ? 'invalid-configuration' : 'not-configured', error: storageConfigurationError }); const { data, error } = await supabase.storage.listBuckets(); if (error) return res.status(502).json({ ok: false, storage: 'unreachable', error: error.message }); const bucket = process.env.SUPABASE_BUCKET ?? 'portfolio-media'; res.json({ ok: data.some((item) => item.name === bucket), storage: 'connected', bucket, bucketExists: data.some((item) => item.name === bucket) }); });

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
const loginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid credentials format' });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!user || !user.isActive || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return res.status(401).json({ error: 'Invalid credentials' });
  const refresh = signRefresh(user.id);
  await prisma.refreshToken.create({ data: { userId: user.id, tokenHash: tokenHash(refresh), expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), userAgent: typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : undefined, ipAddress: typeof req.ip === 'string' ? req.ip : undefined } });
  res.cookie(refreshCookie, refresh, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', domain: process.env.COOKIE_DOMAIN || undefined, maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.json({ accessToken: signAccess(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

const refreshLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });
const adminLimiter = rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: true, legacyHeaders: false });
const uploadLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });

app.post('/api/auth/refresh', refreshLimiter, async (req, res) => {
  const token = req.cookies[refreshCookie];
  if (!token) return res.status(401).json({ error: 'Refresh token missing' });
  try {
    const payload = jwt.verify(token, refreshSecret) as { sub: string };
    const existing = await prisma.refreshToken.findFirst({ where: { userId: payload.sub, tokenHash: tokenHash(token), revokedAt: null, expiresAt: { gt: new Date() } }, include: { user: true } });
    if (!existing || !existing.user.isActive) return res.status(401).json({ error: 'Refresh token revoked' });
    const replacement = signRefresh(existing.userId);
    await prisma.$transaction([prisma.refreshToken.update({ where: { id: existing.id }, data: { revokedAt: new Date() } }), prisma.refreshToken.create({ data: { userId: existing.userId, tokenHash: tokenHash(replacement), expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } })]);
    res.cookie(refreshCookie, replacement, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', domain: process.env.COOKIE_DOMAIN || undefined, maxAge: 30 * 24 * 60 * 60 * 1000 });
    return res.json({ accessToken: signAccess(existing.user) });
  } catch { return res.status(401).json({ error: 'Invalid refresh token' }); }
});

app.post('/api/auth/logout', async (req, res) => { const token = req.cookies[refreshCookie]; if (token) await prisma.refreshToken.updateMany({ where: { tokenHash: tokenHash(token), revokedAt: null }, data: { revokedAt: new Date() } }); res.clearCookie(refreshCookie, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', domain: process.env.COOKIE_DOMAIN || undefined }); res.status(204).send(); });

type AuthRequest = express.Request & { userId?: string; };
const requireAuth = (req: AuthRequest, res: express.Response, next: express.NextFunction) => { const header = req.headers.authorization; if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Authentication required' }); try { req.userId = (jwt.verify(header.slice(7), accessSecret) as { sub: string }).sub; next(); } catch { res.status(401).json({ error: 'Invalid access token' }); } };

app.use('/api/admin', adminLimiter);

app.get('/api/auth/me', requireAuth, async (req: AuthRequest, res) => { const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { id: true, name: true, email: true, role: true } }); if (!user) return res.status(404).json({ error: 'User not found' }); res.json({ user }); });
app.put('/api/auth/password', requireAuth, async (req: AuthRequest, res) => { const data = z.object({ currentPassword: z.string().min(8), newPassword: z.string().min(12).max(128) }).parse(req.body); const user = await prisma.user.findUnique({ where: { id: req.userId } }); if (!user || !(await bcrypt.compare(data.currentPassword, user.passwordHash))) return res.status(401).json({ error: 'Current password is incorrect' }); await prisma.$transaction([prisma.user.update({ where: { id: user.id }, data: { passwordHash: await bcrypt.hash(data.newPassword, 12) } }), prisma.refreshToken.updateMany({ where: { userId: user.id, revokedAt: null }, data: { revokedAt: new Date() } })]); res.clearCookie(refreshCookie, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', domain: process.env.COOKIE_DOMAIN || undefined }); res.status(204).send(); });
const projectInclude = { technologies: { include: { technology: true } }, categories: { include: { category: true } }, media: { include: { media: true }, orderBy: { sortOrder: 'asc' as const } }, links: { orderBy: { sortOrder: 'asc' as const } }, sections: { orderBy: { sortOrder: 'asc' as const } } };
app.get('/api/projects', async (_req, res) => res.json(await prisma.project.findMany({ where: { status: ProjectStatus.published, showOnHomepage: true }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }], include: projectInclude })));
app.get('/api/projects/home', async (_req, res) => res.json(await prisma.project.findMany({ where: { status: ProjectStatus.published, showOnHomepage: true }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }], include: projectInclude })));
app.get('/api/projects/:slug', async (req, res) => { const project = await prisma.project.findFirst({ where: { slug: req.params.slug, status: ProjectStatus.published, showOnHomepage: true }, include: projectInclude }); if (!project) return res.status(404).json({ error: 'Project not found' }); res.json(project); });
app.get('/api/admin/projects', requireAuth, async (_req, res) => res.json(await prisma.project.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] })));
app.put('/api/admin/projects/reorder', requireAuth, async (req, res) => { const data = z.object({ items: z.array(z.object({ id: z.string(), sortOrder: z.number().int() })) }).parse(req.body); await prisma.$transaction(data.items.map((item) => prisma.project.update({ where: { id: item.id }, data: { sortOrder: item.sortOrder } }))); res.status(204).send(); });
app.get('/api/admin/projects/:id', requireAuth, async (req, res) => { const project = await prisma.project.findUnique({ where: { id: String(req.params.id) }, include: projectInclude }); if (!project) return res.status(404).json({ error: 'Project not found' }); res.json(project); });
app.post('/api/admin/projects', requireAuth, async (req, res) => { const data = z.object({ title: z.string().min(1), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), shortSummary: z.string().optional(), status: z.nativeEnum(ProjectStatus).optional() }).parse(req.body); const project = await prisma.project.create({ data }); res.status(201).json(project); });
app.patch('/api/admin/projects/:id', requireAuth, async (req, res) => { const data = z.object({ title: z.string().min(1).optional(), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(), shortSummary: z.string().optional(), status: z.nativeEnum(ProjectStatus).optional(), featured: z.boolean().optional(), showOnHomepage: z.boolean().optional() }).parse(req.body); const project = await prisma.project.update({ where: { id: String(req.params.id) }, data: { ...data, publishedAt: data.status === 'published' ? new Date() : undefined } }); res.json(project); });
app.delete('/api/admin/projects/:id', requireAuth, async (req, res) => { await prisma.project.delete({ where: { id: String(req.params.id) } }); res.status(204).send(); });
app.patch('/api/admin/projects/:id/publish', requireAuth, async (req, res) => { const project = await prisma.project.update({ where: { id: String(req.params.id) }, data: { status: ProjectStatus.published, publishedAt: new Date() } }); res.json(project); });
app.patch('/api/admin/projects/:id/archive', requireAuth, async (req, res) => { const project = await prisma.project.update({ where: { id: String(req.params.id) }, data: { status: ProjectStatus.archived } }); res.json(project); });
app.put('/api/admin/projects/:id/details', requireAuth, async (req, res) => { const data = z.object({ title: z.string().min(1), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), subtitle: z.string().nullable().optional(), shortSummary: z.string().nullable().optional(), clientName: z.string().nullable().optional(), industry: z.string().nullable().optional(), projectType: z.string().nullable().optional(), role: z.string().nullable().optional(), year: z.number().int().min(1990).max(2100).nullable().optional(), status: z.nativeEnum(ProjectStatus), featured: z.boolean(), showOnHomepage: z.boolean(), sortOrder: z.number().int(), problem: z.string().nullable().optional(), solution: z.string().nullable().optional(), result: z.string().nullable().optional(), architectureSummary: z.string().nullable().optional(), frontendStack: z.string().nullable().optional(), backendStack: z.string().nullable().optional(), databaseStack: z.string().nullable().optional(), automationStack: z.string().nullable().optional(), aiStack: z.string().nullable().optional(), deploymentStack: z.string().nullable().optional(), seoTitle: z.string().max(70).nullable().optional(), seoDescription: z.string().max(170).nullable().optional(), titleEn: z.string().nullable().optional(), subtitleEn: z.string().nullable().optional(), shortSummaryEn: z.string().nullable().optional(), problemEn: z.string().nullable().optional(), solutionEn: z.string().nullable().optional(), resultEn: z.string().nullable().optional(), architectureSummaryEn: z.string().nullable().optional(), seoTitleEn: z.string().max(70).nullable().optional(), seoDescriptionEn: z.string().max(170).nullable().optional(), technologyIds: z.array(z.string()), categoryIds: z.array(z.string()) }).parse(req.body); const { technologyIds, categoryIds, ...projectData } = data; const project = await prisma.$transaction(async (tx) => { await tx.projectTechnology.deleteMany({ where: { projectId: String(req.params.id) } }); await tx.projectCategory.deleteMany({ where: { projectId: String(req.params.id) } }); await tx.project.update({ where: { id: String(req.params.id) }, data: { ...projectData, publishedAt: projectData.status === 'published' ? new Date() : undefined, technologies: { create: technologyIds.map((technologyId, sortOrder) => ({ technologyId, sortOrder })) }, categories: { create: categoryIds.map((categoryId, sortOrder) => ({ categoryId, sortOrder })) } } }); return tx.project.findUniqueOrThrow({ where: { id: String(req.params.id) }, include: projectInclude }); }); res.json(project); });
app.get('/api/technologies', async (_req, res) => res.json(await prisma.technology.findMany({ orderBy: { name: 'asc' } })));
app.get('/api/categories', async (_req, res) => res.json(await prisma.category.findMany({ orderBy: { name: 'asc' } })));
app.get('/api/admin/technologies', requireAuth, async (_req, res) => res.json(await prisma.technology.findMany({ orderBy: { name: 'asc' } })));
app.post('/api/admin/technologies', requireAuth, async (req, res) => { const data = z.object({ name: z.string().min(1), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), category: z.string().optional() }).parse(req.body); res.status(201).json(await prisma.technology.create({ data })); });
app.patch('/api/admin/technologies/:id', requireAuth, async (req, res) => { const data = z.object({ name: z.string().min(1).optional(), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(), category: z.string().optional() }).parse(req.body); res.json(await prisma.technology.update({ where: { id: String(req.params.id) }, data })); });
app.delete('/api/admin/technologies/:id', requireAuth, async (req, res) => { await prisma.technology.delete({ where: { id: String(req.params.id) } }); res.status(204).send(); });
app.get('/api/admin/categories', requireAuth, async (_req, res) => res.json(await prisma.category.findMany({ orderBy: { name: 'asc' } })));
app.post('/api/admin/categories', requireAuth, async (req, res) => { const data = z.object({ name: z.string().min(1), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), description: z.string().optional() }).parse(req.body); res.status(201).json(await prisma.category.create({ data })); });
app.patch('/api/admin/categories/:id', requireAuth, async (req, res) => { const data = z.object({ name: z.string().min(1).optional(), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(), description: z.string().optional() }).parse(req.body); res.json(await prisma.category.update({ where: { id: String(req.params.id) }, data })); });
app.delete('/api/admin/categories/:id', requireAuth, async (req, res) => { await prisma.category.delete({ where: { id: String(req.params.id) } }); res.status(204).send(); });
app.get('/api/admin/media', requireAuth, async (_req, res) => res.json(await prisma.media.findMany({ orderBy: { createdAt: 'desc' } })));
app.post('/api/admin/media/upload', uploadLimiter, requireAuth, upload.single('file'), async (req: AuthRequest, res) => { if (!req.file || !supabase) return res.status(503).json({ error: 'Storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.' }); const bucket = process.env.SUPABASE_BUCKET ?? 'portfolio-media'; const filename = `${Date.now()}-${crypto.randomUUID()}-${req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-')}`; const { error } = await supabase.storage.from(bucket).upload(filename, req.file.buffer, { contentType: req.file.mimetype, upsert: false }); if (error) return res.status(502).json({ error: error.message }); const { data: url } = supabase.storage.from(bucket).getPublicUrl(filename); const media = await prisma.media.create({ data: { filename, originalFilename: req.file.originalname, storageBucket: bucket, storagePath: filename, publicUrl: url.publicUrl, mimeType: req.file.mimetype, sizeBytes: req.file.size, uploadedBy: req.userId! } }); res.status(201).json(media); });
app.patch('/api/admin/media/:id', requireAuth, async (req, res) => { const data = z.object({ originalFilename: z.string().min(1).optional(), altText: z.string().nullable().optional(), caption: z.string().nullable().optional() }).parse(req.body); res.json(await prisma.media.update({ where: { id: String(req.params.id) }, data })); });
app.delete('/api/admin/media/:id', requireAuth, async (req, res) => { const media = await prisma.media.findUnique({ where: { id: String(req.params.id) } }); if (!media) return res.status(404).json({ error: 'Media not found' }); if (supabase) await supabase.storage.from(media.storageBucket).remove([media.storagePath]); await prisma.media.delete({ where: { id: media.id } }); res.status(204).send(); });
app.post('/api/admin/projects/:id/media', requireAuth, async (req, res) => { const data = z.object({ mediaId: z.string(), type: z.nativeEnum(MediaType), title: z.string().optional(), caption: z.string().optional(), sortOrder: z.number().int().default(0) }).parse(req.body); res.status(201).json(await prisma.projectMedia.create({ data: { ...data, projectId: String(req.params.id) } })); });
app.delete('/api/admin/projects/:id/media/:relationId', requireAuth, async (req, res) => { await prisma.projectMedia.delete({ where: { id: String(req.params.relationId) } }); res.status(204).send(); });
app.post('/api/admin/projects/:id/links', requireAuth, async (req, res) => { const data = z.object({ label: z.string().min(1), url: z.string().url(), type: z.string().min(1), isPublic: z.boolean().default(true), sortOrder: z.number().int().default(0) }).parse(req.body); res.status(201).json(await prisma.projectLink.create({ data: { ...data, projectId: String(req.params.id) } })); });
app.patch('/api/admin/links/:id', requireAuth, async (req, res) => { const data = z.object({ label: z.string().min(1).optional(), url: z.string().url().optional(), type: z.string().optional(), isPublic: z.boolean().optional(), sortOrder: z.number().int().optional() }).parse(req.body); res.json(await prisma.projectLink.update({ where: { id: String(req.params.id) }, data })); });
app.delete('/api/admin/links/:id', requireAuth, async (req, res) => { await prisma.projectLink.delete({ where: { id: String(req.params.id) } }); res.status(204).send(); });
app.post('/api/admin/projects/:id/sections', requireAuth, async (req, res) => { const data = z.object({ type: z.nativeEnum(SectionType), title: z.string().optional(), content: z.unknown(), sortOrder: z.number().int().default(0) }).parse(req.body); res.status(201).json(await prisma.projectSection.create({ data: { ...data, content: data.content as any, projectId: String(req.params.id) } })); });
app.patch('/api/admin/sections/:id', requireAuth, async (req, res) => { const data = z.object({ type: z.nativeEnum(SectionType).optional(), title: z.string().nullable().optional(), content: z.unknown().optional(), sortOrder: z.number().int().optional() }).parse(req.body); res.json(await prisma.projectSection.update({ where: { id: String(req.params.id) }, data: data as any })); });
app.delete('/api/admin/sections/:id', requireAuth, async (req, res) => { await prisma.projectSection.delete({ where: { id: String(req.params.id) } }); res.status(204).send(); });
app.get('/api/settings', async (_req, res) => res.json(await prisma.setting.findMany()));
app.get('/api/admin/settings', requireAuth, async (_req, res) => res.json(await prisma.setting.findMany()));
app.put('/api/admin/settings/:key', requireAuth, async (req, res) => { const value = z.object({ value: z.unknown() }).parse(req.body).value; res.json(await prisma.setting.upsert({ where: { key: String(req.params.key) }, update: { value: value as any }, create: { key: String(req.params.key), value: value as any } })); });

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => { console.error(err); if (err instanceof z.ZodError) return res.status(400).json({ error: 'Validation failed', issues: err.issues }); const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: unknown }).code) : ''; if (code === 'P2002') return res.status(409).json({ error: 'A record with that unique value already exists' }); if (code === 'P2025') return res.status(404).json({ error: 'Record not found' }); res.status(500).json({ error: 'Internal server error' }); });
async function ensureStorageBucket() {
  if (!supabase) return;
  const { data, error } = await supabase.storage.listBuckets();
  if (error) { console.error('Supabase Storage connection failed:', error.message); return; }
  if (!data.some((item) => item.name === storageBucket)) {
    const created = await supabase.storage.createBucket(storageBucket, { public: true, fileSizeLimit: 10 * 1024 * 1024, allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] });
    if (created.error) console.error('Supabase bucket creation failed:', created.error.message);
  }
}
async function fixMediaUrls() {
  try {
    const targetUrl = process.env.SUPABASE_URL ?? 'https://supastorage.halonso.digital';
    const oldPrefix = 'http://portfolio-supabase-e5f1bd-93-188-167-69.traefik.me';
    if (targetUrl) {
      await prisma.$executeRawUnsafe(
        `UPDATE "media" SET "public_url" = REPLACE("public_url", '${oldPrefix}', '${targetUrl}') WHERE "public_url" LIKE '${oldPrefix}%';`
      );
    }
  } catch (e) {
    console.error('Failed to migrate media URLs:', e);
  }
}
app.listen(port, '0.0.0.0', () => { console.log(`Portfolio API listening on ${port}`); void ensureStorageBucket(); void fixMediaUrls(); });

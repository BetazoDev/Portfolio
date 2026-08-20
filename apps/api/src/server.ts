import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { PrismaClient, ProjectStatus } from '@prisma/client';
import { z } from 'zod';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();
const app = express();
const port = Number(process.env.PORT ?? 4000);
const accessSecret = process.env.JWT_ACCESS_SECRET ?? 'development-access-secret';
const refreshSecret = process.env.JWT_REFRESH_SECRET ?? 'development-refresh-secret';
const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:3000';
const refreshCookie = 'portfolio_refresh';
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 }, fileFilter: (_req, file, callback) => callback(null, ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.mimetype)) });
const supabase = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY) : null;
const tokenHash = (token: string) => crypto.createHash('sha256').update(token).digest('hex');
const signAccess = (user: { id: string; email: string; role: string }) => jwt.sign({ sub: user.id, email: user.email, role: user.role }, accessSecret, { expiresIn: '15m' as any });
const signRefresh = (userId: string) => jwt.sign({ sub: userId, type: 'refresh' }, refreshSecret, { expiresIn: (process.env.REFRESH_TOKEN_EXPIRES_IN ?? '30d') as any });

app.use(helmet());
app.use(cors({ origin: corsOrigin.split(',').map((value) => value.trim()), credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.get('/health', async (_req, res) => { await prisma.$queryRaw`SELECT 1`; res.json({ ok: true, service: 'portfolio-api' }); });

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

app.post('/api/auth/refresh', async (req, res) => {
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

app.get('/api/auth/me', requireAuth, async (req: AuthRequest, res) => { const user = await prisma.user.findUnique({ where: { id: req.userId }, select: { id: true, name: true, email: true, role: true } }); if (!user) return res.status(404).json({ error: 'User not found' }); res.json({ user }); });
app.get('/api/projects', async (_req, res) => res.json(await prisma.project.findMany({ where: { status: ProjectStatus.published }, orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }], include: { technologies: { include: { technology: true } }, categories: { include: { category: true } }, media: { include: { media: true } }, links: true } })));
app.get('/api/projects/:slug', async (req, res) => { const project = await prisma.project.findFirst({ where: { slug: req.params.slug, status: ProjectStatus.published }, include: { technologies: { include: { technology: true } }, categories: { include: { category: true } }, media: { include: { media: true } }, links: true } }); if (!project) return res.status(404).json({ error: 'Project not found' }); res.json(project); });
app.get('/api/admin/projects', requireAuth, async (_req, res) => res.json(await prisma.project.findMany({ orderBy: [{ updatedAt: 'desc' }] })));
app.post('/api/admin/projects', requireAuth, async (req, res) => { const data = z.object({ title: z.string().min(1), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), shortSummary: z.string().optional(), status: z.nativeEnum(ProjectStatus).optional() }).parse(req.body); const project = await prisma.project.create({ data }); res.status(201).json(project); });
app.patch('/api/admin/projects/:id', requireAuth, async (req, res) => { const data = z.object({ title: z.string().min(1).optional(), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(), shortSummary: z.string().optional(), status: z.nativeEnum(ProjectStatus).optional(), featured: z.boolean().optional() }).parse(req.body); const project = await prisma.project.update({ where: { id: String(req.params.id) }, data: { ...data, publishedAt: data.status === 'published' ? new Date() : undefined } }); res.json(project); });
app.delete('/api/admin/projects/:id', requireAuth, async (req, res) => { await prisma.project.delete({ where: { id: String(req.params.id) } }); res.status(204).send(); });
app.patch('/api/admin/projects/:id/publish', requireAuth, async (req, res) => { const project = await prisma.project.update({ where: { id: String(req.params.id) }, data: { status: ProjectStatus.published, publishedAt: new Date() } }); res.json(project); });
app.patch('/api/admin/projects/:id/archive', requireAuth, async (req, res) => { const project = await prisma.project.update({ where: { id: String(req.params.id) }, data: { status: ProjectStatus.archived } }); res.json(project); });
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
app.post('/api/admin/media/upload', requireAuth, upload.single('file'), async (req: AuthRequest, res) => { if (!req.file || !supabase) return res.status(503).json({ error: 'Storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.' }); const bucket = process.env.SUPABASE_BUCKET ?? 'portfolio-media'; const filename = `${Date.now()}-${crypto.randomUUID()}-${req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '-')}`; const { error } = await supabase.storage.from(bucket).upload(filename, req.file.buffer, { contentType: req.file.mimetype, upsert: false }); if (error) return res.status(502).json({ error: error.message }); const { data: url } = supabase.storage.from(bucket).getPublicUrl(filename); const media = await prisma.media.create({ data: { filename, originalFilename: req.file.originalname, storageBucket: bucket, storagePath: filename, publicUrl: url.publicUrl, mimeType: req.file.mimetype, sizeBytes: req.file.size, uploadedBy: req.userId! } }); res.status(201).json(media); });

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => { console.error(err); res.status(500).json({ error: 'Internal server error' }); });
app.listen(port, '0.0.0.0', () => console.log(`Portfolio API listening on ${port}`));

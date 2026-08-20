# Portfolio CMS

Portafolio personal de Humberto Alonso migrado a una plataforma CMS propia. La interfaz pública conserva el diseño, tipografías, contenido, animaciones y assets del portafolio React original; la arquitectura final utiliza Next.js, Express, PostgreSQL, Prisma y Supabase Storage.

## Estructura

- `apps/web`: Next.js App Router, sitio público, casos de estudio, SEO y panel privado.
- `apps/api`: API REST Express, Prisma, autenticación JWT y conexión con Supabase Storage.
- `src`: frontend Vite anterior, conservado temporalmente como referencia y rollback.
- `migration-audit.md`: decisiones de conservación y migración.

## Desarrollo local

1. Copiar `apps/api/.env.example` a `apps/api/.env` y completar credenciales.
2. Copiar `apps/web/.env.example` a `apps/web/.env.local`.
3. Ejecutar `npm install` en `apps/api` y `apps/web`.
4. En API: `npm run prisma:migrate`, `npm run prisma:seed`, `npm run dev`.
5. En web: `npm run dev`.

Web: `http://localhost:3000`

API: `http://localhost:4000`

Admin: `http://localhost:3000/admin/login`

## Producción

Dokploy usa `BetazoDev/Portfolio`, rama `main`:

- Frontend: build path `/apps/web`, Dockerfile, puerto 3000.
- Backend: build path `/apps/api`, Dockerfile, puerto 4000.
- PostgreSQL: servicio `pdatabase` del proyecto `portfolio`.
- Storage: compose `supabase` del proyecto `portfolio`.

El backend ejecuta `prisma migrate deploy` antes de iniciar y realiza un seed idempotente. Nunca utiliza `db push --accept-data-loss` en producción.

# Portfolio CMS

Portafolio personal de Humberto Alonso sobre una plataforma CMS propia. Sitio público, casos de
estudio y panel de administración privado.

**Producción:** [halonso.digital](https://halonso.digital) · API en `back.halonso.digital`

## Arquitectura

| Pieza | Stack | Ubicación |
| --- | --- | --- |
| Sitio público + panel | Next.js 16 App Router, React 19, Tailwind 4 | `apps/web` |
| API REST | Express 5, Prisma 6, JWT | `apps/api` |
| Base de datos | PostgreSQL (servicio `pdatabase` en Dokploy) | — |
| Medios | Supabase Storage (compose `supabase`, `supastorage.halonso.digital`) | — |

`apps/web/legacy` contiene los componentes y secciones heredados del portafolio Vite original.
Siguen en uso: son la fuente visual del sitio, no código muerto.

## Flujo de datos

- El **home** y `/projects` se renderizan en el servidor con ISR (`revalidate = 60`). Los datos
  vienen del CMS; no existe fallback estático de proyectos.
- Las páginas de caso de estudio se prerrenderizan con `generateStaticParams` y revalidan cada
  60 s. Un slug nuevo se sirve bajo demanda.
- El navegador **no** llama a la API directamente: pega contra `/api/*` del mismo origen y el
  rewrite de `next.config.ts` lo reenvía a `API_INTERNAL_URL`. Evita CORS y un salto TLS extra.

## Endpoints públicos relevantes

| Ruta | Devuelve |
| --- | --- |
| `GET /api/projects` | Todos los proyectos publicados (alimenta `/projects`) |
| `GET /api/projects/home` | Solo los marcados con `showOnHomepage` (alimenta el home) |
| `GET /api/projects/:slug` | Detalle de cualquier proyecto publicado |
| `GET /api/settings`, `GET /api/languages`, `GET /api/experience` | Contenido editable del sitio |

## Desarrollo local

```bash
cp apps/api/.env.example apps/api/.env      # completar credenciales
cp apps/web/.env.example apps/web/.env.local
```

```bash
cd apps/api && npm install && npm run prisma:migrate && npm run prisma:seed && npm run dev
```

```bash
cd apps/web && npm install && npm run dev
```

Web `http://localhost:3000` · API `http://localhost:4000` · Admin `http://localhost:3000/admin/login`

## Producción (Dokploy)

Repositorio `BetazoDev/Portfolio`, rama `main`, despliegue automático por push.

| Servicio | Build path | Puerto | Watch paths |
| --- | --- | --- | --- |
| `Portfolio-front` | `/apps/web` | 3000 | `apps/web/**` |
| `portfolio-api` | `/apps/api` | 4000 | `apps/api/**` |

### Migraciones

El arranque ejecuta `node scripts/deploy.mjs`, que:

1. Detecta si la base ya tiene esquema pero no tabla `_prisma_migrations` — el caso de una base
   creada históricamente con `prisma db push`. Si es así, la **baselinea** marcando cada
   migración como aplicada.
2. Ejecuta `prisma migrate deploy`.

Después corre el seed idempotente y arranca el servidor. Nunca se usa `db push` ni
`--accept-data-loss` en producción.

`prisma/migrations/20260901000000_baseline` contiene el DDL completo del esquema actual y es la
migración de partida para cualquier base nueva.

# halonso.digital

Portafolio de Humberto Alonso López, AI Engineer. Sitio estático en inglés (`/`) y español (`/es/`)
con el caso de estudio de Hemeron Prospector y el CV descargable.

**Producción:** [halonso.digital](https://halonso.digital)

## Estructura

| Pieza | Stack | Ubicación |
| --- | --- | --- |
| Sitio público | Astro 7 estático, Motion, CSS propio con la paleta de Hemeron | `apps/web` |
| CV (PDF y DOCX, EN y ES) | `apps/web/cv-src/cv.json` → HTML → Chrome headless; DOCX con python-docx | `apps/web/public/cv` |
| API del CMS anterior | Express 5, Prisma 6 (ya no la usa el sitio) | `apps/api` |

Los textos del sitio viven en `apps/web/src/lib/content.ts`. Cada cifra sale de los proyectos reales
(historial de git, pruebas, bitácoras del worker): no agregues números que no se puedan rastrear.

## Desarrollo

```bash
cd apps/web && npm install && npm run dev      # http://localhost:4321
npm run build && npm start                     # sirve dist/ en :3000 con server.mjs
```

Para regenerar el CV después de editar `cv-src/cv.json`:

```bash
cd apps/web && npm run cv                      # PDFs
python3 cv-src/build-docx.py                   # DOCX (requiere python-docx)
```

## Producción (Dokploy)

Repositorio `BetazoDev/Portfolio`, rama `main`, despliegue automático por push. El servicio
`Portfolio-front` construye `/apps/web` con su `Dockerfile` (Node 22, `astro build`) y sirve el
resultado en el puerto 3000 con `server.mjs`, sin dependencias.

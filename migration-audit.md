# Auditoría de migración del Portfolio CMS

## Fuente de verdad

El portafolio React/Vite actual es la fuente de verdad visual y editorial. La migración a Next.js debe conservar tipografías, paleta, temas claro/oscuro, navegación, cursor, animaciones, composición, textos, traducciones, proyectos y assets. La nueva arquitectura no autoriza una identidad visual distinta.

## Se reutiliza

- Componentes y secciones en `src/components` y `src/sections`.
- Sistema visual de `src/index.css` y `src/App.css`.
- Contexto de idioma y tema, traducciones y tipos.
- Todos los assets de `public` y los documentos públicos vigentes.
- La información actual de proyectos como fuente para el seed de migración.
- Los servicios existentes de Dokploy: `Portfolio-front`, `portfolio-api`, PostgreSQL `pdatabase` y compose `supabase`.

## Se reescribe o amplía

- Vite se sustituye como frontend final por Next.js App Router en `apps/web`.
- La navegación SPA se convierte en rutas públicas y privadas reales.
- Los proyectos hardcodeados se migran a PostgreSQL y el frontend deja de tener fallback estático.
- El prototipo de administración se sustituye por un CMS completo.
- La API monolítica se divide por módulos, validación, servicios y middleware.
- Prisma se amplía con secciones de caso de estudio y configuración.
- Imágenes y archivos se migran a Supabase Storage y se relacionan desde PostgreSQL.

## No se descarta todavía

La aplicación Vite de raíz se conserva temporalmente como referencia y mecanismo de rollback hasta que la versión Next.js supere el QA de producción. Se retirará solo después de validar paridad visual, contenido, administración, SEO y despliegue.

## Criterio de corte

El cambio de producción se realizará cuando Next.js, API, PostgreSQL y Supabase Storage funcionen de extremo a extremo; exista CRUD completo; todo el contenido esté migrado; y pasen las pruebas de autenticación, responsive, SEO, subida de medios y páginas dinámicas.

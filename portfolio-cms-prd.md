# Portfolio CMS — Documento de Gestión, Arquitectura y Migración

**Proyecto:** Rediseño y migración del portafolio personal `halonso.digital` a una plataforma CMS propia.  
**Autor:** Humberto Alonso  
**Objetivo:** Convertir el portafolio actual en una plataforma administrable, escalable y profesional para mostrar proyectos, casos de estudio, imágenes, tecnologías, descripciones, arquitectura y resultados desde un panel privado.

---

## 0. Contexto general del proyecto

El portafolio actual funciona como una presentación pública de proyectos, pero el nuevo objetivo es convertirlo en un sistema dinámico tipo CMS donde los proyectos puedan gestionarse desde un login privado.

El nuevo sistema deberá permitir:

- Crear, editar, publicar y archivar proyectos.
- Subir imágenes y usarlas como thumbnails, covers o galerías.
- Agregar descripción, título, slug, tecnologías, categorías, links, resultados y secciones de caso de estudio.
- Mostrar cada proyecto en una URL pública optimizada para SEO.
- Mantener una estética minimalista, premium y técnica.
- Migrar el proyecto actual de React a Next.js para mejorar estructura, SEO, rutas dinámicas y escalabilidad.
- Desarrollar un backend separado con Node.js + Express.
- Usar PostgreSQL como base de datos principal.
- Usar Supabase Storage para archivos e imágenes, desplegado/gestionado desde Dokploy.
- Implementar autenticación segura con JWT + Refresh Tokens.

Este documento está escrito para que un agente de IA de desarrollo pueda entender el proyecto, crear una nueva base desde cero dentro de la carpeta del portafolio actual y migrar progresivamente los componentes, estilos, assets y contenido existentes.

---

# 1. Product Requirements Document (PRD)

## 1.1 Problema que resuelve

El portafolio actual depende demasiado de contenido estático o hardcodeado. Esto genera varios problemas:

- Agregar nuevos proyectos requiere modificar código.
- Cambiar imágenes o descripciones no es rápido.
- No existe una estructura formal para casos de estudio.
- Cada nuevo proyecto puede terminar con una presentación inconsistente.
- No hay panel privado para gestionar contenido.
- No hay un sistema reutilizable para tecnologías, categorías, medios o secciones.
- El portafolio no aprovecha completamente el valor comercial de los proyectos creados.

El nuevo sistema debe resolver esto convirtiendo el portafolio en una plataforma CMS propia.

## 1.2 Para quién es

### Usuario principal

**Humberto Alonso**, como administrador del portafolio.

Necesita una herramienta privada para:

- Subir nuevos proyectos.
- Editar proyectos existentes.
- Administrar imágenes.
- Clasificar proyectos por tecnologías, categorías y tipo de solución.
- Publicar casos de estudio sin tocar código.
- Mantener el portafolio actualizado para Upwork, LinkedIn, clientes y reclutadores.

### Audiencia pública

El sitio público está dirigido a:

- Clientes de Upwork.
- Empresas SaaS y B2B.
- Agencias digitales.
- Startups.
- Reclutadores técnicos.
- Clientes interesados en WordPress avanzado, Next.js, automatización, IA, scraping, CMS, dashboards y plataformas de negocio.

## 1.3 Objetivo del producto

Crear una plataforma de portafolio/CMS que comunique claramente que Humberto no solo crea sitios web, sino sistemas completos que combinan:

- Frontend moderno.
- CMS.
- Automatización.
- Inteligencia artificial.
- APIs.
- Dashboards.
- Arquitectura técnica.
- Diseño UI/UX.

El sitio debe funcionar como una herramienta comercial para atraer mejores clientes y como un caso de estudio en sí mismo.

## 1.4 Objetivos de negocio

- Mejorar la percepción profesional del perfil de Upwork.
- Mostrar proyectos como soluciones de negocio, no solo como screenshots.
- Aumentar la calidad de leads y oportunidades.
- Facilitar la creación de casos de estudio detallados.
- Permitir actualizar el portafolio con rapidez.
- Usar el propio portafolio CMS como ejemplo de desarrollo full-stack.

## 1.5 Objetivos funcionales

El sistema debe permitir:

- Login seguro de administrador.
- Dashboard privado.
- CRUD de proyectos.
- CRUD de tecnologías.
- CRUD de categorías.
- Gestión de imágenes y archivos.
- Selección de thumbnail, cover y galería por proyecto.
- Ordenamiento de proyectos destacados.
- Publicación en estado `draft`, `published` o `archived`.
- Páginas públicas dinámicas por slug.
- SEO por proyecto.
- Metadata y Open Graph por proyecto.
- Diseño responsive.
- Filtros por tecnologías, categorías y tipo de proyecto.
- Gestión de enlaces externos: demo, GitHub, Upwork, video, documentación.

## 1.6 Objetivos no funcionales

- Seguridad en autenticación y endpoints privados.
- Código mantenible y modular.
- Componentes reutilizables.
- Buen rendimiento en Core Web Vitals.
- Separación clara entre frontend y backend.
- Buen manejo de errores.
- Validación de inputs.
- Rate limiting.
- CORS configurado correctamente.
- Protección de tokens y credenciales.
- Deploy reproducible en Dokploy.

## 1.7 No objetivos de la primera versión

En el MVP no se necesita:

- Sistema multiusuario avanzado.
- Roles complejos más allá de `admin` y opcionalmente `editor`.
- Editor visual tipo Webflow.
- Comentarios públicos.
- Ecommerce.
- Sistema de pagos.
- Integración con IA para crear proyectos automáticamente.
- Multilenguaje.
- Blog público completo, salvo que se decida incluirlo en v2.

---

# 2. Arquitectura técnica

## 2.1 Decisión principal: migrar de React a Next.js

El portafolio actual parte de una base React. La migración a Next.js es viable porque el stack visual existente ya está alineado con React, TypeScript, Tailwind, Shadcn y componentes `.tsx`.

La migración no debe tratarse como una simple conversión de archivos. Debe hacerse como una reconstrucción ordenada:

1. Crear una nueva app Next.js desde cero dentro de la carpeta del portafolio.
2. Migrar los componentes visuales útiles del proyecto actual.
3. Reemplazar rutas de React Router por rutas nativas de Next.js App Router.
4. Convertir proyectos hardcodeados en datos dinámicos desde PostgreSQL.
5. Crear páginas públicas dinámicas para cada proyecto.
6. Crear un dashboard privado para administración.
7. Conectar el frontend con el backend Express.
8. Desplegar la nueva versión en Dokploy.

## 2.2 Por qué Next.js es mejor para este caso

Next.js es recomendable para este portafolio porque permite:

- Rutas dinámicas para proyectos: `/projects/[slug]`.
- SEO por página.
- Metadata dinámica.
- Mejor estructura para páginas públicas y privadas.
- Server-side rendering o static generation cuando convenga.
- Mejor manejo de layouts.
- Mejor separación entre componentes de servidor y cliente.
- Mayor percepción profesional del proyecto.

## 2.3 Stack definido

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Motion
- Archivos `.tsx`

### Backend

- Node.js
- Express
- TypeScript recomendado para backend también
- REST API

### Base de datos

- PostgreSQL
- ORM recomendado: Prisma

> Nota: Prisma no es obligatorio, pero se recomienda porque facilita migraciones, tipado, seeds y mantenimiento para un agente de IA o desarrollo asistido.

### Autenticación

- JWT Access Tokens
- Refresh Tokens
- Cookies `httpOnly` para refresh tokens
- Rotación de refresh tokens
- Hash de refresh tokens en base de datos
- Logout con revocación de sesión
- Protección de rutas privadas

### Seguridad

- CORS configurado por dominio permitido.
- Rate limiting en login, refresh, upload y endpoints admin.
- Helmet para headers de seguridad.
- Validación de inputs con Zod o equivalente.
- Sanitización de slugs y filenames.
- Validación de MIME type en uploads.
- Límite de tamaño de archivos.
- Manejo seguro de variables de entorno.
- No exponer API keys en frontend.
- Protección contra fuerza bruta en login.
- Logs básicos de errores.

### Storage

- Supabase Storage
- Creado/gestionado con Dokploy según la infraestructura disponible.
- Usado para imágenes de proyectos, thumbnails, covers, galerías y archivos relacionados.

### Deploy

- Dokploy
- Docker / Docker Compose recomendado
- Nginx o proxy gestionado por Dokploy
- SSL configurado desde Dokploy
- Variables de entorno separadas para frontend y backend

## 2.4 Arquitectura general

```txt
Usuario público
     │
     ▼
Next.js Frontend
     │
     ├── Páginas públicas
     │     ├── Home
     │     ├── Projects
     │     ├── Project Detail
     │     ├── About
     │     └── Contact
     │
     └── Dashboard privado
           ├── Login
           ├── Project Manager
           ├── Media Library
           ├── Technologies
           ├── Categories
           └── Settings

Next.js Frontend
     │
     ▼
Express API
     │
     ├── Auth module
     ├── Projects module
     ├── Media module
     ├── Technologies module
     ├── Categories module
     ├── Users module
     └── Settings module

Express API
     │
     ├── PostgreSQL
     │
     └── Supabase Storage
```

## 2.5 Estructura recomendada del repositorio

El agente debe crear el nuevo proyecto desde cero dentro de la carpeta del portafolio actual, sin destruir inmediatamente el código existente.

Estructura recomendada:

```txt
portfolio/
│
├── legacy/
│   └── [código actual del portafolio React, si se decide conservarlo]
│
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── styles/
│   │   └── public/
│   │
│   └── api/
│       ├── src/
│       │   ├── config/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── projects/
│       │   │   ├── media/
│       │   │   ├── technologies/
│       │   │   ├── categories/
│       │   │   └── users/
│       │   ├── middleware/
│       │   ├── utils/
│       │   ├── validators/
│       │   └── server.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── seed.ts
│       └── package.json
│
├── packages/
│   └── shared/
│       ├── types/
│       └── schemas/
│
├── docker-compose.yml
├── .env.example
└── README.md
```

## 2.6 Frontend: rutas públicas

```txt
/
/projects
/projects/[slug]
/about
/contact
```

## 2.7 Frontend: rutas privadas

```txt
/admin/login
/admin
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/media
/admin/technologies
/admin/categories
/admin/settings
```

## 2.8 Backend: endpoints principales

### Auth

```txt
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me
```

### Projects

```txt
GET    /api/projects
GET    /api/projects/:slug
GET    /api/admin/projects
GET    /api/admin/projects/:id
POST   /api/admin/projects
PATCH  /api/admin/projects/:id
DELETE /api/admin/projects/:id
PATCH  /api/admin/projects/:id/publish
PATCH  /api/admin/projects/:id/archive
```

### Media

```txt
GET    /api/admin/media
POST   /api/admin/media/upload
PATCH  /api/admin/media/:id
DELETE /api/admin/media/:id
```

### Technologies

```txt
GET    /api/technologies
GET    /api/admin/technologies
POST   /api/admin/technologies
PATCH  /api/admin/technologies/:id
DELETE /api/admin/technologies/:id
```

### Categories

```txt
GET    /api/categories
GET    /api/admin/categories
POST   /api/admin/categories
PATCH  /api/admin/categories/:id
DELETE /api/admin/categories/:id
```

---

# 3. UX/UI

## 3.1 Dirección visual

El portafolio debe mantener una estética:

- Minimalista.
- Oscura o neutra.
- Premium.
- Técnica.
- Editorial.
- Limpia.
- Muy enfocada en jerarquía visual.
- Con buen uso de espacios, tipografía y contraste.

No debe sentirse como un dashboard genérico ni como una plantilla saturada. Debe verse como el sitio de un desarrollador/arquitecto de software que construye productos inteligentes.

## 3.2 Principio de diseño

El sitio debe comunicar:

> “No construyo solo sitios web. Diseño y desarrollo plataformas que automatizan procesos de negocio.”

## 3.3 Home pública

### Objetivo

Explicar rápidamente quién es Humberto, qué construye y qué tipo de proyectos puede resolver.

### Wireframe conceptual

```txt
┌────────────────────────────────────────────┐
│ Navbar                                     │
│ Logo / Projects / About / Contact          │
├────────────────────────────────────────────┤
│ Hero                                       │
│ Headline: Intelligent Web Platforms        │
│ Subheadline: AI, Automation, CMS, Next.js  │
│ CTA: View Projects / Contact               │
├────────────────────────────────────────────┤
│ Featured Projects                          │
│ Retrato / Lumina / Prospector / HidroDemo  │
├────────────────────────────────────────────┤
│ What I Build                               │
│ AI Workflows / CMS / Dashboards / Websites │
├────────────────────────────────────────────┤
│ Selected Technologies                      │
│ Next.js / WordPress / n8n / PostgreSQL     │
├────────────────────────────────────────────┤
│ Contact CTA                                │
└────────────────────────────────────────────┘
```

## 3.4 Projects listing

### Funcionalidad

- Mostrar proyectos publicados.
- Filtrar por tecnología.
- Filtrar por categoría.
- Filtrar por problema que resuelve.
- Ordenar destacados primero.

### Wireframe

```txt
┌────────────────────────────────────────────┐
│ Projects                                   │
│ Filter: All / AI / WordPress / SaaS / CMS  │
├────────────────────────────────────────────┤
│ Project Card                               │
│ Image / Title / Short Summary / Tech       │
├────────────────────────────────────────────┤
│ Project Card                               │
├────────────────────────────────────────────┤
│ Project Card                               │
└────────────────────────────────────────────┘
```

## 3.5 Project detail page

Cada proyecto debe funcionar como un caso de estudio.

### Estructura recomendada

```txt
Hero
├── Title
├── Subtitle
├── Project type
├── Role
├── Year
├── Main technologies
└── Cover image

Overview
├── Short summary
├── Problem
├── Solution
└── Result

Architecture
├── Frontend
├── Backend
├── Database
├── Automation
├── AI
└── Deployment

Gallery
├── Screenshots
├── Captions
└── Optional video

Process
├── Design
├── Development
├── Integration
├── Testing
└── Deployment

Links
├── Live demo
├── GitHub
└── External references
```

## 3.6 Admin login

### Requisitos UX

- Login simple.
- Email + password.
- Mensajes claros de error.
- Estado de carga.
- Bloqueo temporal por demasiados intentos.
- Redirección al dashboard si ya está autenticado.

### Wireframe

```txt
┌─────────────────────────────┐
│ Portfolio Admin             │
│                             │
│ Email                       │
│ [____________________]      │
│ Password                    │
│ [____________________]      │
│                             │
│ [ Sign in ]                 │
└─────────────────────────────┘
```

## 3.7 Admin dashboard

### Objetivo

Dar una vista rápida del estado del portafolio.

### Métricas iniciales

- Total de proyectos.
- Proyectos publicados.
- Proyectos en draft.
- Imágenes subidas.
- Tecnologías registradas.

### Wireframe

```txt
┌────────────────────────────────────────────┐
│ Sidebar        │ Dashboard                 │
│ Projects       │ Published Projects: 5     │
│ Media          │ Drafts: 2                 │
│ Technologies   │ Media Items: 34           │
│ Categories     │                           │
├────────────────┼───────────────────────────┤
│                │ Recent Projects           │
│                │ Retrato / Lumina / ...    │
└────────────────────────────────────────────┘
```

## 3.8 Project editor

El editor de proyectos debe ser claro, modular y escalable.

### Secciones del editor

- Basic Info
- Content
- Architecture
- Technologies
- Categories
- Media
- Links
- SEO
- Publishing

### Wireframe

```txt
┌────────────────────────────────────────────┐
│ Edit Project: Retrato                      │
├────────────────────────────────────────────┤
│ Basic Info                                 │
│ Title / Slug / Subtitle / Year / Role      │
├────────────────────────────────────────────┤
│ Content                                    │
│ Summary / Problem / Solution / Result      │
├────────────────────────────────────────────┤
│ Architecture                               │
│ Frontend / Backend / AI / Automation       │
├────────────────────────────────────────────┤
│ Media                                      │
│ Cover / Thumbnail / Gallery                │
├────────────────────────────────────────────┤
│ SEO                                        │
│ SEO title / SEO description / OG image     │
├────────────────────────────────────────────┤
│ [Save Draft] [Preview] [Publish]           │
└────────────────────────────────────────────┘
```

## 3.9 Componentes UI principales

### Públicos

- `Navbar`
- `HeroSection`
- `ProjectCard`
- `FeaturedProjects`
- `TechBadge`
- `CategoryBadge`
- `CaseStudyHero`
- `CaseStudySection`
- `ArchitectureGrid`
- `ProjectGallery`
- `Timeline`
- `ContactCTA`
- `Footer`

### Admin

- `AdminLayout`
- `Sidebar`
- `AdminHeader`
- `LoginForm`
- `DataTable`
- `ProjectForm`
- `MediaUploader`
- `ImagePicker`
- `TechnologySelector`
- `CategorySelector`
- `StatusBadge`
- `SeoFields`
- `ConfirmDialog`
- `ToastNotifications`

---

# 4. Modelo de datos

## 4.1 Entidades principales

- Users
- Refresh Tokens
- Projects
- Technologies
- Project Technologies
- Categories
- Project Categories
- Media
- Project Media
- Project Links
- Project Sections
- Settings

## 4.2 User

```txt
User
├── id
├── name
├── email
├── password_hash
├── role: admin | editor
├── is_active
├── created_at
└── updated_at
```

## 4.3 RefreshToken

```txt
RefreshToken
├── id
├── user_id
├── token_hash
├── expires_at
├── revoked_at
├── created_at
├── replaced_by_token_id
└── user_agent / ip_address opcional
```

## 4.4 Project

```txt
Project
├── id
├── title
├── slug
├── subtitle
├── short_summary
├── client_name
├── industry
├── project_type
├── role
├── year
├── status: draft | published | archived
├── featured
├── sort_order
├── problem
├── solution
├── result
├── architecture_summary
├── frontend_stack
├── backend_stack
├── database_stack
├── automation_stack
├── ai_stack
├── deployment_stack
├── seo_title
├── seo_description
├── cover_media_id
├── thumbnail_media_id
├── og_media_id
├── published_at
├── created_at
└── updated_at
```

## 4.5 Technology

```txt
Technology
├── id
├── name
├── slug
├── category: frontend | backend | database | cms | automation | ai | deployment | design | other
├── icon_url
├── color
├── created_at
└── updated_at
```

## 4.6 ProjectTechnology

```txt
ProjectTechnology
├── project_id
├── technology_id
└── sort_order
```

## 4.7 Category

Las categorías pueden representar tipos de proyecto o problemas resueltos.

Ejemplos:

- AI Automation
- Headless CMS
- WordPress
- SaaS
- Business Platform
- Lead Generation
- Data Collection
- Editorial Workflow
- Performance

```txt
Category
├── id
├── name
├── slug
├── description
├── created_at
└── updated_at
```

## 4.8 ProjectCategory

```txt
ProjectCategory
├── project_id
├── category_id
└── sort_order
```

## 4.9 Media

```txt
Media
├── id
├── filename
├── original_filename
├── storage_bucket
├── storage_path
├── public_url
├── alt_text
├── caption
├── mime_type
├── size_bytes
├── width
├── height
├── uploaded_by
├── created_at
└── updated_at
```

## 4.10 ProjectMedia

```txt
ProjectMedia
├── id
├── project_id
├── media_id
├── type: cover | thumbnail | gallery | workflow | architecture | screenshot | video
├── title
├── caption
├── sort_order
├── created_at
└── updated_at
```

## 4.11 ProjectLink

```txt
ProjectLink
├── id
├── project_id
├── label
├── url
├── type: live | github | video | docs | upwork | other
├── is_public
├── sort_order
├── created_at
└── updated_at
```

## 4.12 ProjectSection

Para permitir casos de estudio más flexibles, se recomienda tener secciones dinámicas.

```txt
ProjectSection
├── id
├── project_id
├── title
├── slug
├── content
├── type: text | image | gallery | architecture | timeline | quote | metrics | custom
├── data_json
├── sort_order
├── created_at
└── updated_at
```

`data_json` permite guardar estructuras variables, por ejemplo:

```json
{
  "items": [
    { "label": "Frontend", "value": "Next.js, React, TypeScript" },
    { "label": "CMS", "value": "Headless WordPress" },
    { "label": "Automation", "value": "n8n" }
  ]
}
```

## 4.13 Settings

```txt
Setting
├── id
├── key
├── value
├── created_at
└── updated_at
```

Ejemplos de settings:

- site_title
- site_description
- contact_email
- linkedin_url
- github_url
- upwork_url
- resume_url

---

# 5. Roadmap por fases

## 5.1 MVP

El MVP debe enfocarse en tener una versión funcional, segura y publicable.

### Objetivo del MVP

Migrar el portafolio actual a Next.js y permitir la gestión básica de proyectos desde un panel privado.

### Alcance MVP

#### Frontend público

- Home renovada.
- Página de proyectos.
- Página dinámica por proyecto: `/projects/[slug]`.
- Diseño responsive.
- Filtros básicos por categoría y tecnología.
- SEO básico por página.
- Open Graph básico.

#### Admin

- Login seguro.
- Dashboard básico.
- Crear proyecto.
- Editar proyecto.
- Publicar/despublicar proyecto.
- Subir imágenes a Supabase Storage.
- Seleccionar thumbnail y cover.
- Gestionar tecnologías.
- Gestionar categorías.

#### Backend

- Express API.
- Auth con JWT + Refresh Tokens.
- PostgreSQL.
- CRUD de proyectos.
- CRUD de tecnologías.
- CRUD de categorías.
- Upload de medios.
- Middlewares de seguridad.

#### Deploy

- Deploy frontend en Dokploy.
- Deploy backend en Dokploy.
- PostgreSQL configurado.
- Supabase Storage configurado.
- Variables de entorno.
- SSL.

## 5.2 v1.1

### Objetivo

Mejorar la experiencia editorial y el valor comercial del portafolio.

### Funcionalidades

- Editor de secciones dinámicas para casos de estudio.
- Reordenamiento drag-and-drop de imágenes.
- Reordenamiento de proyectos destacados.
- Preview privado de proyectos en draft.
- Mejoras de SEO: sitemap dinámico, robots.txt, canonical URLs.
- Metadata avanzada por proyecto.
- OG image personalizada por proyecto.
- Analytics básico de clicks.
- Tracking de clicks a LinkedIn, GitHub, Upwork y CV.
- Búsqueda interna por tecnología o palabra clave.
- Mejoras de performance e imágenes.

## 5.3 v2

### Objetivo

Convertir el portafolio en una plataforma más completa de contenido, marketing y automatización.

### Funcionalidades posibles

- Blog propio dentro del CMS.
- Integración con IA para ayudar a redactar casos de estudio.
- Generador de thumbnails para proyectos.
- Multilenguaje.
- Formularios de contacto con clasificación automática de leads.
- Integración con n8n.
- Automatización para enviar nuevos proyectos a LinkedIn o email.
- Panel de analytics avanzado.
- Sistema de templates para proyectos.
- Exportar casos de estudio como Markdown o PDF.
- Página privada para compartir proyectos no publicados con clientes.

---

# 6. Plan de implementación

## 6.1 Instrucciones para el agente de IA de desarrollo

El agente debe trabajar dentro de la carpeta del portafolio actual, pero debe crear la nueva versión desde cero para evitar mezclar arquitectura vieja con nueva.

### Reglas importantes

1. No borrar el proyecto actual sin autorización.
2. Crear una nueva estructura de proyecto.
3. Reutilizar componentes, estilos y assets solo cuando tenga sentido.
4. Migrar gradualmente.
5. Mantener el código modular.
6. Documentar decisiones importantes.
7. Usar TypeScript en frontend y backend si es posible.
8. No hardcodear proyectos en el frontend final.
9. Todo proyecto público debe venir desde la base de datos.
10. Proteger todos los endpoints admin.

## 6.2 Fase 0 — Auditoría del proyecto actual

### Tareas

- Revisar estructura actual del portafolio React.
- Identificar componentes reutilizables.
- Identificar estilos globales reutilizables.
- Identificar assets actuales.
- Listar proyectos actuales.
- Listar secciones actuales del home.
- Identificar dependencias existentes.

### Entregable

Archivo `migration-audit.md` con:

- Qué se reutiliza.
- Qué se descarta.
- Qué se reescribe.
- Qué assets se migran.

## 6.3 Fase 1 — Crear nueva base del proyecto

### Tareas

- Crear monorepo o estructura `/apps/web` y `/apps/api`.
- Inicializar Next.js con TypeScript.
- Configurar Tailwind.
- Configurar Shadcn UI.
- Configurar Motion.
- Crear Express API con TypeScript.
- Configurar variables de entorno.
- Crear `.env.example`.
- Configurar linting y formatting.

### Entregable

Proyecto base ejecutándose localmente:

```txt
web: http://localhost:3000
api: http://localhost:4000
```

## 6.4 Fase 2 — Base de datos y ORM

### Tareas

- Configurar PostgreSQL.
- Configurar Prisma.
- Crear schema inicial.
- Crear migraciones.
- Crear seed con usuario admin inicial.
- Crear seed con tecnologías base.
- Crear seed con proyectos iniciales si aplica.

### Entregable

Base de datos funcional con tablas principales.

## 6.5 Fase 3 — Backend Auth

### Tareas

- Crear endpoint de login.
- Validar email/password.
- Hashear passwords con bcrypt o argon2.
- Generar access token JWT.
- Generar refresh token.
- Guardar hash del refresh token en DB.
- Enviar refresh token en cookie `httpOnly`.
- Crear endpoint `/me`.
- Crear endpoint `/refresh`.
- Crear endpoint `/logout`.
- Implementar middleware `requireAuth`.
- Implementar rate limit en login.

### Requisitos de seguridad

- Access token corto: 10 a 15 minutos.
- Refresh token largo: 7 a 30 días.
- Refresh token rotativo.
- Cookie `httpOnly`, `secure` en producción y `sameSite` adecuado.
- Password nunca debe exponerse.
- No guardar refresh token plano.

## 6.6 Fase 4 — Backend CMS modules

### Tareas

Crear módulos:

- Projects
- Media
- Technologies
- Categories
- Users
- Settings

Cada módulo debe tener:

- Routes
- Controller
- Service
- Validator
- Types

### Validaciones

- Slug único.
- Title requerido.
- Status válido.
- URLs válidas.
- Metadata con longitud razonable.
- Imágenes con MIME type permitido.

## 6.7 Fase 5 — Supabase Storage

### Tareas

- Crear bucket para `portfolio-media`.
- Configurar permisos.
- Subir imágenes desde backend.
- Guardar metadata en PostgreSQL.
- Retornar URL pública o firmada según configuración.
- Validar tamaño máximo.
- Validar tipo de archivo.
- Generar nombres seguros.

### Tipos permitidos iniciales

```txt
image/jpeg
image/png
image/webp
image/avif
```

## 6.8 Fase 6 — Frontend público

### Tareas

- Crear layout principal.
- Migrar diseño visual actual.
- Crear home.
- Crear página de proyectos.
- Crear página dinámica de proyecto.
- Crear componentes de caso de estudio.
- Crear filtros.
- Crear estados de carga y error.
- Crear metadata dinámica.

### Rutas

```txt
/
/projects
/projects/[slug]
/about
/contact
```

## 6.9 Fase 7 — Admin frontend

### Tareas

- Crear login.
- Crear layout admin.
- Crear sidebar.
- Crear dashboard.
- Crear tabla de proyectos.
- Crear formulario de proyecto.
- Crear media uploader.
- Crear selector de tecnologías.
- Crear selector de categorías.
- Crear campos SEO.
- Crear acciones: save draft, publish, archive, delete.

## 6.10 Fase 8 — Migración de contenido

### Tareas

Migrar proyectos existentes:

- Retrato.
- Lumina.
- Prospector.
- HidroDemo.
- Diabolical Services.

Para cada proyecto cargar:

- Título.
- Slug.
- Resumen.
- Problema.
- Solución.
- Resultado.
- Tecnologías.
- Categorías.
- Imágenes.
- Links.
- SEO title.
- SEO description.

### Enfoque recomendado

Crear un seed script inicial:

```txt
apps/api/prisma/seed.ts
```

Este seed debe insertar los proyectos iniciales en PostgreSQL y asociarlos con tecnologías/categorías.

Las imágenes deben subirse a Supabase Storage y luego registrarse en la tabla `Media`.

## 6.11 Fase 9 — SEO y performance

### Tareas

- Metadata dinámica por proyecto.
- Open Graph tags.
- Sitemap dinámico.
- Robots.txt.
- URLs limpias.
- Alt text en imágenes.
- Lazy loading.
- Optimización de imágenes.
- Buen uso de headings.
- Revisar Lighthouse.
- Revisar responsive.

## 6.12 Fase 10 — Deploy en Dokploy

### Tareas

- Crear servicio frontend.
- Crear servicio backend.
- Crear PostgreSQL.
- Crear/configurar Supabase Storage si la infraestructura lo permite.
- Configurar variables de entorno.
- Configurar dominios.
- Configurar SSL.
- Probar comunicación frontend/backend.
- Probar login en producción.
- Probar subida de imágenes en producción.
- Probar páginas públicas.

## 6.13 Fase 11 — QA final

### Checklist

- Login funciona.
- Refresh token funciona.
- Logout revoca sesión.
- Admin routes protegidas.
- CRUD de proyectos funciona.
- Upload de imágenes funciona.
- Imágenes se muestran públicamente.
- Proyectos publicados aparecen en `/projects`.
- Proyectos draft no aparecen públicamente.
- Página `/projects/[slug]` funciona.
- Metadata se genera correctamente.
- Sitio responsive.
- Sin errores visibles en consola.
- Sin credenciales expuestas.
- CORS correcto.
- Rate limiting activo.
- Deploy estable.

---

# 7. Variables de entorno sugeridas

## Frontend

```env
NEXT_PUBLIC_API_URL=https://api.halonso.digital
NEXT_PUBLIC_SITE_URL=https://halonso.digital
```

## Backend

```env
NODE_ENV=production
PORT=4000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/portfolio
JWT_ACCESS_SECRET=change_me
JWT_REFRESH_SECRET=change_me
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=30d
CORS_ORIGIN=https://halonso.digital
SUPABASE_URL=https://your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=change_me
SUPABASE_BUCKET=portfolio-media
COOKIE_DOMAIN=.halonso.digital
```

---

# 8. Definición de terminado

El proyecto se considera terminado en MVP cuando:

- El portafolio público está migrado a Next.js.
- Los proyectos ya no están hardcodeados.
- Existe login privado.
- Se pueden crear, editar y publicar proyectos desde el panel.
- Se pueden subir imágenes a Supabase Storage.
- Cada proyecto tiene página pública dinámica.
- Existen tecnologías y categorías administrables.
- El sitio está desplegado en Dokploy.
- La autenticación es segura.
- El sitio es responsive y rápido.
- El portafolio puede usarse como caso de estudio en Upwork.

---

# 9. Prioridad de implementación resumida

```txt
1. Crear nueva estructura Next.js + Express
2. Configurar PostgreSQL + Prisma
3. Implementar Auth seguro
4. Crear CRUD de proyectos
5. Crear upload con Supabase Storage
6. Migrar frontend visual actual
7. Crear páginas dinámicas de proyectos
8. Crear admin dashboard
9. Migrar proyectos actuales
10. Optimizar SEO/performance
11. Desplegar en Dokploy
12. QA final
```

---

# 10. Nota final de posicionamiento

Este portafolio no debe presentarse únicamente como una web personal. Debe construirse y documentarse como una plataforma CMS propia.

El mensaje final del proyecto debe ser:

> “Built a custom portfolio CMS using Next.js, Node.js, Express, PostgreSQL, Supabase Storage, JWT authentication, and a secure admin dashboard to manage case studies, media, technologies, and SEO-ready project pages.”

Este proyecto también podrá convertirse en un caso de estudio para Upwork, demostrando experiencia en:

- Full-stack development.
- Migración de React a Next.js.
- Arquitectura CMS personalizada.
- Autenticación segura.
- PostgreSQL.
- Supabase Storage.
- Dashboard admin.
- SEO técnico.
- Deploy en Dokploy.


# Documento de Gestión Técnica Maestro: Portafolio de Humberto Alonso López (Basado en Referencia Visual)

**Roles:**
- **Fase 1 (Stitch):** Generación de Layout y Diseño (Interpretación Visual).
- **Fase 2 (Antigravity):** Generación de Código, Interactividad y Animaciones (React/TS/Tailwind/Framer Motion).

## 1. Directrices Visuales Globales (De Referencia e7b343cf-7cfa-4efa-9a32-c1ddd8d5daac.jpeg)
* **Estructura del Contenedor:** El layout debe ser estrictamente **Full-Width (ancho completo, extendiéndose de borde a borde de la pantalla)**. NO debe haber ningún contenedor tipo "tarjeta" o wrapper que encierre la página. 
* **Geometría y Bordes:** Cero esquinas redondeadas. Todos los elementos (contenedores, botones, tarjetas de proyectos, inputs, imágenes) deben tener bordes completamente rectos y afilados (utilizar `rounded-none` en Tailwind CSS).
* **Fondo:** Fondo negro oscuro sólido extendido al 100% del ancho, con gráficos de círculos concéntricos sutiles y de gran tamaño de fondo (como en la referencia).
* **Estilo:** Minimalismo técnico, alto contraste (blanco y negro), líneas limpias, tipografía sans-serif (con toques monospace para etiquetas técnicas).

## 2. Fase 1: Estructura y Contenido (Integrando CV a Layout)

### 2.1 Header y Navegación
* **Top Izquierda (Name):** Humberto Guadalupe Alonso López
* **Top Centro (Nav):** About, Projects, Work, Contacts (Eliminada la sección de Artículos/Blogs para dar prioridad a los proyectos).
* **Hero Title (Grande):** WordPress Web Developer & Designer
* **Intro Paragraph:** "WordPress Web Developer & Designer with hands-on experience building custom websites from scratch. Strong focus on UX/UI, responsive layouts, and performance optimization."

### 2.2 Sección "Proyectos Destacados" (Sustituye la sección de Artículos)
Adapta el layout de rejilla de la referencia (con flechas de navegación) en un slider/carrusel funcional horizontal (full-width, `rounded-none`) para mostrar los siguientes 5 proyectos:

* **Proyecto 1: DIABOLICAL MEDIA MANAGER**
  * [cite_start]**Descripción:** Internal image management and CDN system[cite: 37]. [cite_start]Features automatic image optimization (WebP/AVIF) [cite: 43, 122, 123][cite_start], duplicate detection via SHA256 hashing [cite: 104, 222][cite_start], and dynamic CDN serving[cite: 45, 137].
  * [cite_start]**Stack:** Next.js, Node.js, Express, Sharp, PostgreSQL, TailwindCSS[cite: 51, 52, 53, 54, 56, 57].
* **Proyecto 2: Project Manager System – MERN Stack**
  * **Descripción:** Internal Project Management System designed to streamline the workflow of web production teams. Features role-based access, a Kanban pipeline system, and SOP-driven execution for seamless design-to-development handoffs.
  * **Stack:** React, TypeScript, Vite, TailwindCSS, Node.js, Express, MongoDB.
* **Proyecto 3: NailFlow**
  * **Descripción:** A custom booking automation platform designed specifically for nail technicians in LATAM. Built from the ground up to streamline appointments, manage client scheduling, and provide a seamless user experience.
  * **Stack:** React, TypeScript, UI/UX Design.
* **Proyecto 4: ERP Diabolical**
  * **Descripción:** Enterprise Resource Planning system for internal management and operations at Diabolical Projects.
  * **Enlace:** github.com/diabolicalprojects/erp-diabolical
* **Proyecto 5: Diabolical Landing Page**
  * **Descripción:** Corporate landing page focusing on high performance, modern UI/UX, and optimized Core Web Vitals.
  * **Enlace:** github.com/diabolicalprojects/landing-page

### 2.3 Sección "About me"
Reproduce la rejilla de contenedores de habilidades a la izquierda y la foto a la derecha, asegurando bordes rectos.
* **Habilidades a la izquierda:**
    * **Contenedor 1 (Front-end):** React & TypeScript, HTML5, CSS3 (Sass basics), Responsive Design.
    * **Contenedor 2 (Styles/UI/UX):** Figma, UI/UX Design.
    * **Contenedor 3 (Back-end/CMS):** WordPress Development (Elementor), WooCommerce (Setup & Customization).
    * [cite_start]**Contenedor 4 (DevOps/Other):** Performance Optimization (Core Web Vitals), Dokploy, Nginx[cite: 61, 62].
* **Foto a la derecha:** Placeholder de imagen vertical para foto del desarrollador en estilo blanco y negro de alto contraste.

### 2.4 Sección "Work" (Timeline)
Reproduce el layout de data-table exacta con las columnas para fechas, empresa y rol, con líneas divisorias extendidas a lo ancho del contenedor.
* **Fila 1:** [2025 - Present] | [Reputation Defense Network] | [Web Designer & WordPress Developer | Figma to WordPress]
* **Fila 2:** [2023 - 2024] | [Agency4RealEstate] | [WordPress Front-End Developer | Elementor, WooCommerce]
* **Fila 3:** [2022 - 2023] | [Bloom / Former DUDE Agency] | [Web Developer | WordPress, Duda, HubSpot]

## 3. Fase 2: Desarrollo y Animaciones (React/TS/Tailwind)
El portafolio debe ser altamente interactivo, compensando la paleta monocromática con físicas y animaciones de nivel "Senior Frontend".

### 3.1 Stack Técnico y Performance
* **Stack:** React (TypeScript), Tailwind CSS, Framer Motion.
* **Prioridad:** Componentes modulares, 60fps constantes, Lazy Loading para imágenes de proyectos y optimización de LCP/CLS.

### 3.2 Lógica de Animaciones Específicas
* **Custom Cursor monocromático:** Implementar un cursor que aplique `mix-blend-mode: difference` al pasar sobre textos grandes o imágenes.
* **Slider de Proyectos Interactivo:** El carrusel de los 5 proyectos debe permitir navegación por arrastre (drag/swipe) usando Framer Motion. Al hacer hover en la imagen del proyecto activo, esta debe escalar ligeramente (scale: 1.05) mostrando un overlay negro semi-transparente con el stack técnico y el botón "View Project / Repository".
* **Scroll Suave y Reveal:** Implementar `IntersectionReveal` (fade-in + traslación en Y) para cada sección.
* **Staggered Text Animation (Hero):** El título del héroe debe revelarse letra por letra desde abajo hacia arriba (overflow-hidden con bordes rectos).
* **Nodos de Experiencia:** Las líneas horizontales de la tabla de "Work" deben "dibujarse" (animación de `width: 0` a `100%`) de izquierda a derecha a medida que el usuario hace scroll.

## 4. Entregable Esperado
* Código fuente estructurado en componentes funcionales de React.
* Tipado estricto en TypeScript.
* Implementación de Tailwind CSS (enfatizando clases como `w-full`, `rounded-none`, `border-white/20`) y Framer Motion.
* Archivo principal ensamblado con el Slider de Proyectos completamente funcional.
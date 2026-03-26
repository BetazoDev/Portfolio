# Documento de Gestión Técnica Maestro: Portafolio de Humberto Alonso López

**Rol del Agente:** Desarrollo Front-End Senior (React, TypeScript, Tailwind CSS).
**Objetivo:** Construir un portafolio web personal altamente profesional, dinámico y optimizado, basándose estrictamente en las directrices visuales y de comportamiento descritas a continuación.

## 1. Directrices Visuales y Stack Técnico Globales
* **Stack:** React (TypeScript), Tailwind CSS, Framer Motion (para animaciones).
* **Estructura del Contenedor:** Layout estrictamente **Full-Width** (ancho completo de borde a borde). NO encerrar la página en tarjetas.
* **Geometría y Bordes:** Cero esquinas redondeadas (`rounded-none` en todo: contenedores, botones, imágenes).
* **Fondo:** Negro oscuro sólido, con sutiles gráficos de círculos concéntricos de gran tamaño como fondo global.
* **Estilo:** Minimalismo técnico, alto contraste (blanco y negro), líneas limpias.
* **Tipografía:** Limpia y sans-serif (ej. Inter o Roboto).
* **Performance:** Optimizado para Core Web Vitals (imágenes lazy-loaded, animaciones a 60fps).

---

## 2. Estructura y Contenido del Layout

### 2.1 Hero Section (Inicio)
**Layout Visual:** Debe ser idéntico al diseño de la referencia "image_d28c04.png".
* **Header (Top):**
  * Izquierda: Humberto Guadalupe Alonso López
  * Centro (Navegación): About, Projects, Work, Contacts
  * Derecha (Idioma): En / Es
* **Cuerpo Central:**
  * **Título Principal (H1):** Software Development and Management Engineering
  * **Párrafo:** "WordPress Web Developer & Designer with hands-on experience building custom websites from scratch. Strong focus on UX/UI, responsive layouts, and performance optimization."
* **Footer del Hero (Redes Sociales):** Fila de botones minimalistas con los siguientes enlaces exactos:
  * Github: `https://github.com/BetazoDev`
  * LinkedIn: `https://www.linkedin.com/in/halonso-l/`
  * Figma: `https://www.figma.com/design/NDIMf0eqCo8oi6oHCSODHf/Portfolio?node-id=602-4&m=dev&t=E8G9g2BK7lRUoLAU-1`

### 2.2 Proyectos (Project Slider)
**Layout Visual:** Debe ser idéntico al diseño de la referencia "image_d28cbd.png".
* **Comportamiento:** Slider infinito, centrado, con scroll horizontal nativo o por arrastre (Framer Motion). Deben verse 3 tarjetas a la vez (la central activa/colorida, y las laterales atenuadas/dimmed).
* **Diseño de Tarjeta:** * Lado izquierdo: Forma abstracta iridiscente.
  * Lado derecho: Campo vacío definido para una imagen de fondo (el usuario la agregará después manualmente), superpuesto con el texto del proyecto.
* **Botones por Proyecto (Fila de 3):**
  1. "Read More" (Botón estándar).
  2. Icono de Github (Enlace al repositorio).
  3. Icono de Flecha (Enlace al sitio en vivo).
* **Datos de los 5 Proyectos:**
  1. **DIABOLICAL MEDIA MANAGER:** Internal image management and CDN system. Features automatic image optimization (WebP/AVIF), duplicate detection via SHA256 hashing, and dynamic CDN serving. Stack: Next.js, Node.js, Express, PostgreSQL.
  2. **Project Manager System – MERN Stack:** Internal system to streamline web production workflows. Features role-based access, a Kanban pipeline, and SOP-driven execution for design-to-dev handoffs. Stack: React, TypeScript, Node.js, MongoDB.
  3. **NailFlow:** A custom booking automation platform designed specifically for nail technicians in LATAM. Built to streamline appointments and manage client scheduling. Stack: React, TypeScript, UI/UX Design.
  4. **ERP Diabolical:** Enterprise Resource Planning system for internal management and operations. (Repo: `https://github.com/diabolicalprojects/erp-diabolical`)
  5. **Diabolical Landing Page:** Corporate landing page focusing on high performance, modern UI/UX, and optimized Core Web Vitals. (Repo: `https://github.com/diabolicalprojects/landing-page`)

### 2.3 Sección "About me"
Reproducir rejilla de contenedores a la izquierda y foto a la derecha (sin bordes redondeados).
* **Habilidades (Izquierda):**
  * Front-end: React & TypeScript, HTML5, CSS3 (Sass basics), Responsive Design.
  * Styles/UI/UX: Figma, UI/UX Design.
  * Back-end/CMS: WordPress Development (Elementor), WooCommerce (Setup & Customization).
  * DevOps/Other: Performance Optimization (Core Web Vitals), Dokploy, Nginx.
* **Foto (Derecha):** Placeholder vertical en escala de grises/alto contraste.

### 2.4 Sección "Work" (Timeline)
Tabla de datos a ancho completo con líneas divisorias rectas (`border-white/20`).
* **[2025 - Present]** | Reputation Defense Network | Web Designer & WordPress Developer
* **[2023 - 2024]** | Agency4RealEstate | WordPress Front-End Developer
* **[2022 - 2023]** | Bloom / Former DUDE Agency | Web Developer

### 2.5 Educación
* Bachelor's Degree in Software Development and Management Engineering | Universidad Tecnológica El Retoño (2023)

## 3. Interactividad y Animaciones (Framer Motion)
* **Custom Cursor:** Cursor monocromático que aplique `mix-blend-mode: difference` al hacer hover en textos grandes o enlaces.
* **Scroll & Reveal:** Implementar scroll suave y aparición en fade-in (`whileInView`) para cada sección.
* **Animación de Texto (Hero):** El H1 debe revelarse de abajo hacia arriba (staggered text) en la carga inicial.
* **Líneas de Trabajo:** Las líneas horizontales divisorias en la sección "Work" deben animarse dibujándose de izquierda a derecha (`width: 0%` a `100%`) al entrar en pantalla.

## Entregable
Generar el código completo en React (TypeScript) modular, utilizando clases de Tailwind CSS y Framer Motion para cumplir con todas las especificaciones visuales e interactivas detalladas.
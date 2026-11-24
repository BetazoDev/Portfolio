// All visible copy, in English and Spanish. Facts here come from the projects themselves
// (git history, test files, worker logs); do not add numbers that can't be traced back.

export type Lang = "en" | "es";

export const site = {
  url: "https://halonso.digital",
  name: "Humberto Alonso López",
  email: "alonso.humberto0401@gmail.com",
  phone: "+52 449 124 5952",
  linkedin: "https://www.linkedin.com/in/halonso-l/",
  github: "https://github.com/BetazoDev",
  cv: {
    en: { pdf: "/cv/Humberto-Alonso-Lopez-AI-Engineer-CV-EN.pdf", docx: "/cv/Humberto-Alonso-Lopez-AI-Engineer-CV-EN.docx" },
    es: { pdf: "/cv/Humberto-Alonso-Lopez-AI-Engineer-CV-ES.pdf", docx: "/cv/Humberto-Alonso-Lopez-AI-Engineer-CV-ES.docx" },
  },
};

export const path = (lang: Lang, p = "/") => (lang === "es" ? `/es${p === "/" ? "/" : p}` : p);

const en = {
  meta: {
    title: "Humberto Alonso López | AI Engineer",
    description:
      "AI Engineer and full-stack developer. I build LLM agents that run in production: multi-agent pipelines on the Claude Agent SDK, WhatsApp sales agents, and the TypeScript systems around them.",
  },
  nav: { work: "Work", approach: "Approach", experience: "Experience", contact: "Contact", other: "Español", otherLang: "es" },
  hero: {
    eyebrow: "Humberto Alonso López, AI Engineer",
    title: "I build AI agents that run in production.",
    sub: "Full-stack developer and co-founder of Hemeron, where my agents research businesses, build their websites and answer on WhatsApp.",
    primary: "See the work",
    secondary: "Download CV",
    fieldCaption: "Each dot is a business my agents researched. The crimson ones got a website built.",
    researched: "researched",
    built: "sites built",
  },
  numbers: [
    { value: "429", label: "multi-page websites built by my agent pipeline" },
    { value: "318", label: "automated tests guarding the Prospector codebase" },
    { value: "$0.002", label: "about what one sales-agent reply costs on Haiku" },
    { value: "161", label: "commits in the first six weeks of the Prospector" },
  ],
  flagship: {
    kicker: "Flagship project",
    title: "Hemeron Prospector",
    lead: "An AI sales pipeline I designed and built alone. It finds businesses with weak websites, researches them, builds each one a new site and sells it in a WhatsApp chat.",
    steps: [
      { name: "Find", text: "Apify scrapes Google Maps and Instagram. Claude Haiku proposes search terms for new niches." },
      { name: "Triage", text: "The server checks every site: errors, mobile, age, platform, WhatsApp. Each lead gets a score." },
      { name: "Research", text: "A Claude Agent SDK worker digs through Maps, social profiles, directories and the Wayback Machine." },
      { name: "Build", text: "Another agent writes a multi-page Astro site from the business's own logo, colors and facts." },
      { name: "Review", text: "An art-director agent grades it, up to four fixer agents repair pages in parallel, Playwright checks three viewports." },
      { name: "Sell", text: "A Claude API agent answers on WhatsApp, quotes, books calls and hands off what it can't answer." },
      { name: "Close", text: "One link carries the quote, the deposit, the client brief and the delivery job." },
    ],
    cta: "Read the case study",
    galleryTitle: "Sites the pipeline built",
    galleryNote: "Demo sites generated from each business's real brand. Live at demos.hemeron.com.",
  },
  work: {
    title: "More things I built",
    items: {
      agenda: {
        name: "Agenda Hemeron",
        text: "A self-hosted Calendly. Google Calendar and Meet, team round-robin, Postgres advisory locks against double booking. The sales agent books calls through its API.",
        tags: "Next.js 16 · Drizzle · PostgreSQL · Google APIs",
        link: "schedule.hemeron.com",
      },
      hemenu: {
        name: "Hemenú",
        text: "Multi-tenant SaaS for restaurants: QR menu, orders and a loyalty club. Ships an MCP server for AI agents and a Claude vision importer that turns menu photos into data.",
        tags: "Go · PostgreSQL RLS · Astro · React · MCP",
        link: "hemenu.halonso.digital/cafe-jardin",
      },
      stenia: {
        name: "Stenia",
        text: "Offline-first training PWA that writes routines with Claude, Gemini or OpenAI through the Vercel AI SDK, with on-device pose tracking.",
        tags: "Next.js · Vercel AI SDK · MediaPipe · PWA",
        link: "github.com/BetazoDev/stenia",
      },
      ab: {
        name: "AB Abogados",
        text: "First paying client of the pipeline. 29 pages with local SEO and llms.txt, scoring 100 in Lighthouse SEO, accessibility and best practices.",
        tags: "Astro · Technical SEO · GEO",
        link: "demos.hemeron.com/ababogadosmty",
      },
      quote: {
        name: "Quote and brief flow",
        text: "The closing step of the pipeline: live quote, 50/50 payment, an 8-step brief and PDF generation, all on one link. Try the simulator.",
        tags: "Next.js · pdf-lib · Stripe · Mercado Pago",
        link: "brief.hemeron.com/simulador",
      },
    },
  },
  approach: {
    title: "How I build with LLMs",
    items: [
      {
        name: "Evals before opinions",
        text: "I picked the sales agent's models by replaying 41 real conversations, then routed each message to Haiku, Sonnet or Opus by intent and length.",
      },
      {
        name: "Guardrails live in code",
        text: "Prices are checked against the catalog, a refusal stops every follow-up, duplicate sends are blocked. The prompt is never the only line of defense.",
      },
      {
        name: "Cost is a feature",
        text: "Prompt caching, structured outputs and model routing keep a reply near US$0.002. Every call is metered per lead with a daily spend cap.",
      },
      {
        name: "Agents get tests too",
        text: "Agent steps run with tool allowlists, JSON-schema outputs, timeouts and resumable sessions. Their work is checked by Playwright before anyone sees it.",
      },
    ],
  },
  stack: {
    title: "Tools I use every week",
    groups: [
      { name: "AI", items: ["Claude API", "Claude Agent SDK", "Claude Code", "OpenAI", "Gemini", "Vercel AI SDK", "Tool use", "MCP", "RAG", "Embeddings", "Evals", "Prompt caching", "Structured outputs", "Whisper"] },
      { name: "Full-stack", items: ["TypeScript", "Next.js", "React", "Node.js", "Go", "Astro", "Tailwind CSS", "Flutter", "WordPress"] },
      { name: "Data", items: ["PostgreSQL", "Prisma", "Drizzle", "sqlc", "PGlite"] },
      { name: "Ops and QA", items: ["Docker", "Dokploy", "Traefik", "GitHub Actions", "Playwright", "Vitest", "Lighthouse", "n8n"] },
    ],
  },
  experience: {
    title: "Experience",
    items: [
      { role: "Co-Founder & AI Engineer", org: "Hemeron", dates: "2026 - now", text: "LLM agents, multi-agent pipelines and the full-stack products around them." },
      { role: "Full-Stack & AI Automation Developer", org: "Independent projects", dates: "2026", text: "Autonomous publishing with Gemini and n8n, WhatsApp agents, editorial workflows." },
      { role: "WordPress Developer", org: "Reputation Defense Network", dates: "2025 - now", text: "Custom WordPress builds, performance and Core Web Vitals." },
      { role: "WordPress Developer", org: "Agency4RealEstate", dates: "2023 - 2024", text: "WordPress and WooCommerce for real estate agencies." },
      { role: "Web Developer", org: "Bloom (formerly DUDE Agency)", dates: "2022 - 2023", text: "WordPress, Duda and HubSpot sites." },
      { role: "Freelance Web Developer", org: "Fundación Acuerdo UVTC", dates: "2021 - 2022", text: "Full websites from planning to delivery." },
    ],
    education: "B.Eng. in Software Development and Management, Universidad Tecnológica El Retoño. Spanish native, English B2.",
  },
  contact: {
    title: "Let's talk about your agents.",
    text: "Open to remote AI Engineer and full-stack roles. The fastest way to reach me is email.",
    cvEn: "CV in English",
    cvEs: "CV en español",
    pdf: "PDF",
    docx: "DOCX",
  },
  footer: "Built with Astro and Claude Code. Colors from Hemeron.",
  cs: {
    back: "Back to all work",
    metaTitle: "Hemeron Prospector case study | Humberto Alonso López",
    metaDescription:
      "How I built an AI sales pipeline with the Claude Agent SDK and the Claude API: multi-agent website builds, a WhatsApp sales agent, evals, guardrails and cost control.",
    title: "Hemeron Prospector",
    lead: "An AI sales pipeline that takes a business from a Google Maps listing to a paid website. I designed it, built it and run it.",
    facts: [
      { k: "Role", v: "Sole engineer, co-founder" },
      { k: "Timeline", v: "Oct to Nov 2026, 161 commits" },
      { k: "Stack", v: "Next.js 16, TypeScript, PostgreSQL, Prisma, Claude API, Claude Agent SDK" },
      { k: "Status", v: "In production, internal tool" },
    ],
    sections: [
      {
        h: "The problem",
        p: [
          "Hemeron sells custom websites and software to small businesses in Mexico. Cold outreach with a portfolio rarely works. Showing a business its own website, already redesigned with its real logo and information, works much better, but building one by hand takes hours.",
          "So the question became: can agents do the research and the build well enough that a person only needs to start the conversation?",
        ],
      },
      {
        h: "Architecture",
        p: [
          "A Next.js control plane on a VPS owns the data: leads, bases, demo jobs, chats, quotes. A worker on a Mac polls it through 28 token-authenticated routes and runs the heavy agent work on a Claude subscription plan, with an automatic switch to the API when the Mac goes offline.",
          "The job queue lives in Postgres with leases, heartbeats, three attempts and requeue after 25 silent minutes, so a closed laptop never loses a build.",
        ],
      },
      {
        h: "The agent pipeline",
        p: [
          "Each demo is a chain of Claude Agent SDK runs, each with its own tool allowlist, JSON-schema output, turn limit and timeout. Research comes first and is mandatory: Maps, social profiles, directories and the Wayback Machine, with one rule above all: nothing invented.",
          "The build agent writes a multi-page Astro site from the brand it found. An art-director agent reviews it, and its notes are split by page across up to four fixer agents that share one dev server. In a measured round that cut the fix time from 26 to 19.5 minutes and automated issues from 8 to 0.",
          "A Playwright tool I wrote captures every route at 1440, 820 and 390 px and flags overlapping text, overflow, broken images, tiny text and console errors before a demo can publish.",
        ],
      },
      {
        h: "The sales agent",
        p: [
          "Replies on WhatsApp come from a Claude API agent. The stable rules and the sales skill sit in a cached system prompt, the answer comes back as JSON Schema structured output, and customer photos go in as images. Voice notes are transcribed locally with whisper.cpp.",
          "Routing is deliberate: Haiku handles most messages, Sonnet takes interested leads and long or multi-question messages, Opus runs the daily analyst. I chose that split by replaying 41 real chats. A Haiku reply costs about US$0.002 and a Sonnet reply about US$0.03, and every call is metered per lead under a daily cap.",
          "When the agent doesn't know something, it asks the owner on WhatsApp, relays the answer, and stores general facts so it won't ask twice.",
        ],
      },
      {
        h: "Guardrails",
        p: [
          "The model never has the final word on things that matter. Price figures are checked against the package catalog, bank details never come from the model, a refusal blocks every follow-up through three separate checks, and the sender refuses duplicates and more than four automatic messages in six minutes.",
          "A daily job mines lessons from 14 days of chats to improve the prompt, but it is not allowed to write rules about prices, discounts or payments.",
        ],
      },
      {
        h: "Results",
        p: [
          "496 businesses researched and 429 multi-page sites built by the pipeline. The codebase has 78 API routes, 26 data models and 318 automated tests. The first client, a law firm in Monterrey, paid for a 29-page site that scores 100 in Lighthouse SEO, accessibility and best practices.",
        ],
      },
    ],
    pipelineTitle: "From listing to paid website",
    galleryTitle: "A few of the 429",
  },
};

const es: typeof en = {
  meta: {
    title: "Humberto Alonso López | AI Engineer",
    description:
      "AI Engineer y desarrollador full-stack. Construyo agentes con LLMs que corren en producción: pipelines multiagente con el Claude Agent SDK, agentes de ventas en WhatsApp y los sistemas en TypeScript que los sostienen.",
  },
  nav: { work: "Proyectos", approach: "Método", experience: "Experiencia", contact: "Contacto", other: "English", otherLang: "en" },
  hero: {
    eyebrow: "Humberto Alonso López, AI Engineer",
    title: "Construyo agentes de IA que corren en producción.",
    sub: "Desarrollador full-stack y cofundador de Hemeron, donde mis agentes investigan negocios, construyen sus sitios y responden por WhatsApp.",
    primary: "Ver proyectos",
    secondary: "Descargar CV",
    fieldCaption: "Cada punto es un negocio que investigaron mis agentes. Los carmesí recibieron un sitio construido.",
    researched: "investigados",
    built: "sitios construidos",
  },
  numbers: [
    { value: "429", label: "sitios multipágina construidos por mi pipeline de agentes" },
    { value: "318", label: "pruebas automatizadas cuidando el código del Prospector" },
    { value: "$0.002", label: "dólares, lo que cuesta más o menos una respuesta del agente en Haiku" },
    { value: "161", label: "commits en las primeras seis semanas del Prospector" },
  ],
  flagship: {
    kicker: "Proyecto principal",
    title: "Hemeron Prospector",
    lead: "Un pipeline de ventas con IA que diseñé y construí yo solo. Encuentra negocios con sitios débiles, los investiga, le construye a cada uno un sitio nuevo y lo vende en un chat de WhatsApp.",
    steps: [
      { name: "Encontrar", text: "Apify extrae Google Maps e Instagram. Claude Haiku propone términos de búsqueda para nichos nuevos." },
      { name: "Filtrar", text: "El servidor revisa cada sitio: errores, móvil, antigüedad, plataforma, WhatsApp. Cada prospecto recibe un puntaje." },
      { name: "Investigar", text: "Un worker con el Claude Agent SDK revisa Maps, redes sociales, directorios y el Wayback Machine." },
      { name: "Construir", text: "Otro agente escribe un sitio multipágina en Astro con el logo, los colores y los datos reales del negocio." },
      { name: "Revisar", text: "Un agente director de arte lo califica, hasta cuatro agentes corrigen páginas en paralelo y Playwright revisa tres tamaños de pantalla." },
      { name: "Vender", text: "Un agente sobre la Claude API responde en WhatsApp, cotiza, agenda llamadas y pasa lo que no sabe." },
      { name: "Cerrar", text: "Un solo enlace lleva la cotización, el anticipo, el brief del cliente y el trabajo de entrega." },
    ],
    cta: "Leer el caso completo",
    galleryTitle: "Sitios que construyó el pipeline",
    galleryNote: "Sitios demo generados desde la marca real de cada negocio. En línea en demos.hemeron.com.",
  },
  work: {
    title: "Otros proyectos que construí",
    items: {
      agenda: {
        name: "Agenda Hemeron",
        text: "Un Calendly propio. Google Calendar y Meet, eventos de equipo con round-robin y advisory locks de Postgres contra reservas dobles. El agente de ventas agenda llamadas con su API.",
        tags: "Next.js 16 · Drizzle · PostgreSQL · Google APIs",
        link: "schedule.hemeron.com",
      },
      hemenu: {
        name: "Hemenú",
        text: "SaaS multi-tenant para restaurantes: menú QR, pedidos y club de lealtad. Incluye un servidor MCP para agentes de IA y un importador con visión de Claude que convierte fotos del menú en datos.",
        tags: "Go · PostgreSQL RLS · Astro · React · MCP",
        link: "hemenu.halonso.digital/cafe-jardin",
      },
      stenia: {
        name: "Stenia",
        text: "PWA de entrenamiento que funciona sin conexión y arma rutinas con Claude, Gemini u OpenAI mediante el Vercel AI SDK, con detección de postura en el dispositivo.",
        tags: "Next.js · Vercel AI SDK · MediaPipe · PWA",
        link: "github.com/BetazoDev/stenia",
      },
      ab: {
        name: "AB Abogados",
        text: "Primer cliente que pagó gracias al pipeline. 29 páginas con SEO local y llms.txt, con 100 en Lighthouse en SEO, accesibilidad y buenas prácticas.",
        tags: "Astro · SEO técnico · GEO",
        link: "demos.hemeron.com/ababogadosmty",
      },
      quote: {
        name: "Cotización y brief",
        text: "El cierre del pipeline: cotización en vivo, pago 50/50, un brief de 8 pasos y PDFs generados, todo en un solo enlace. Prueba el simulador.",
        tags: "Next.js · pdf-lib · Stripe · Mercado Pago",
        link: "brief.hemeron.com/simulador",
      },
    },
  },
  approach: {
    title: "Cómo construyo con LLMs",
    items: [
      {
        name: "Primero evals, luego opiniones",
        text: "Elegí los modelos del agente de ventas repitiendo 41 conversaciones reales, y enruto cada mensaje a Haiku, Sonnet u Opus según intención y longitud.",
      },
      {
        name: "Los guardrails viven en el código",
        text: "Los precios se validan contra el catálogo, un «no» detiene todo seguimiento y los envíos duplicados se bloquean. El prompt nunca es la única defensa.",
      },
      {
        name: "El costo también es una función",
        text: "Prompt caching, salidas estructuradas y ruteo de modelos dejan una respuesta cerca de US$0.002. Cada llamada se mide por prospecto con un tope diario.",
      },
      {
        name: "Los agentes también llevan pruebas",
        text: "Cada paso de agente corre con herramientas permitidas, salida con JSON Schema, tiempos límite y sesiones reanudables. Playwright revisa su trabajo antes de que alguien lo vea.",
      },
    ],
  },
  stack: {
    title: "Herramientas de todas las semanas",
    groups: [
      { name: "IA", items: ["Claude API", "Claude Agent SDK", "Claude Code", "OpenAI", "Gemini", "Vercel AI SDK", "Tool use", "MCP", "RAG", "Embeddings", "Evals", "Prompt caching", "Salidas estructuradas", "Whisper"] },
      { name: "Full-stack", items: ["TypeScript", "Next.js", "React", "Node.js", "Go", "Astro", "Tailwind CSS", "Flutter", "WordPress"] },
      { name: "Datos", items: ["PostgreSQL", "Prisma", "Drizzle", "sqlc", "PGlite"] },
      { name: "Ops y QA", items: ["Docker", "Dokploy", "Traefik", "GitHub Actions", "Playwright", "Vitest", "Lighthouse", "n8n"] },
    ],
  },
  experience: {
    title: "Experiencia",
    items: [
      { role: "Cofundador y AI Engineer", org: "Hemeron", dates: "2026 - hoy", text: "Agentes con LLMs, pipelines multiagente y los productos full-stack que los rodean." },
      { role: "Desarrollador Full-Stack y de Automatización con IA", org: "Proyectos independientes", dates: "2026", text: "Publicación autónoma con Gemini y n8n, agentes de WhatsApp, flujos editoriales." },
      { role: "Desarrollador WordPress", org: "Reputation Defense Network", dates: "2025 - hoy", text: "Sitios WordPress a la medida, rendimiento y Core Web Vitals." },
      { role: "Desarrollador WordPress", org: "Agency4RealEstate", dates: "2023 - 2024", text: "WordPress y WooCommerce para agencias inmobiliarias." },
      { role: "Desarrollador Web", org: "Bloom (antes DUDE Agency)", dates: "2022 - 2023", text: "Sitios en WordPress, Duda y HubSpot." },
      { role: "Desarrollador Web Freelance", org: "Fundación Acuerdo UVTC", dates: "2021 - 2022", text: "Sitios completos de la planeación a la entrega." },
    ],
    education: "Ingeniería en Desarrollo y Gestión de Software, Universidad Tecnológica El Retoño. Español nativo, inglés B2.",
  },
  contact: {
    title: "Hablemos de tus agentes.",
    text: "Disponible para puestos remotos de AI Engineer y full-stack. La forma más rápida de contactarme es por correo.",
    cvEn: "CV in English",
    cvEs: "CV en español",
    pdf: "PDF",
    docx: "DOCX",
  },
  footer: "Hecho con Astro y Claude Code. Colores de Hemeron.",
  cs: {
    back: "Volver a todos los proyectos",
    metaTitle: "Caso Hemeron Prospector | Humberto Alonso López",
    metaDescription:
      "Cómo construí un pipeline de ventas con IA usando el Claude Agent SDK y la Claude API: sitios hechos por agentes, un agente de ventas en WhatsApp, evals, guardrails y control de costos.",
    title: "Hemeron Prospector",
    lead: "Un pipeline de ventas con IA que lleva a un negocio de su ficha en Google Maps a un sitio pagado. Lo diseñé, lo construí y lo opero.",
    facts: [
      { k: "Rol", v: "Único ingeniero, cofundador" },
      { k: "Periodo", v: "Oct a nov 2026, 161 commits" },
      { k: "Stack", v: "Next.js 16, TypeScript, PostgreSQL, Prisma, Claude API, Claude Agent SDK" },
      { k: "Estado", v: "En producción, herramienta interna" },
    ],
    sections: [
      {
        h: "El problema",
        p: [
          "Hemeron vende sitios y software a la medida a negocios pequeños en México. Escribir en frío con un portafolio casi nunca funciona. Mostrarle a un negocio su propio sitio, ya rediseñado con su logo y su información real, funciona mucho mejor, pero hacerlo a mano toma horas.",
          "La pregunta fue: ¿pueden los agentes investigar y construir tan bien que una persona solo tenga que iniciar la conversación?",
        ],
      },
      {
        h: "Arquitectura",
        p: [
          "Un panel en Next.js sobre un VPS es dueño de los datos: prospectos, bases, trabajos de demo, chats, cotizaciones. Un worker en una Mac lo consulta por 28 rutas autenticadas con token y corre el trabajo pesado de los agentes con un plan de Claude, con cambio automático a la API cuando la Mac se desconecta.",
          "La cola de trabajos vive en Postgres con arrendamientos, latidos, tres intentos y reencolado tras 25 minutos de silencio, así que una laptop cerrada nunca pierde una construcción.",
        ],
      },
      {
        h: "El pipeline de agentes",
        p: [
          "Cada demo es una cadena de ejecuciones del Claude Agent SDK, cada una con sus herramientas permitidas, salida con JSON Schema, límite de turnos y tiempo límite. La investigación va primero y es obligatoria: Maps, redes, directorios y el Wayback Machine, con una regla por encima de todo: nada inventado.",
          "El agente constructor escribe un sitio multipágina en Astro con la marca que encontró. Un agente director de arte lo revisa, y sus notas se reparten por página entre hasta cuatro agentes correctores que comparten un servidor. En una ronda medida, el tiempo bajó de 26 a 19.5 minutos y los problemas automáticos de 8 a 0.",
          "Una herramienta de Playwright que escribí captura cada ruta a 1440, 820 y 390 px y detecta texto encimado, desbordes, imágenes rotas, letra diminuta y errores de consola antes de que una demo se publique.",
        ],
      },
      {
        h: "El agente de ventas",
        p: [
          "Las respuestas en WhatsApp salen de un agente sobre la Claude API. Las reglas estables y la skill de ventas van en un system prompt con caché, la respuesta vuelve como salida estructurada con JSON Schema y las fotos del cliente entran como imágenes. Las notas de voz se transcriben en local con whisper.cpp.",
          "El ruteo es deliberado: Haiku atiende la mayoría, Sonnet toma a los interesados y los mensajes largos o con varias preguntas, Opus corre el analista diario. Elegí esa división repitiendo 41 chats reales. Una respuesta de Haiku cuesta cerca de US$0.002 y una de Sonnet cerca de US$0.03, y cada llamada se mide por prospecto con un tope diario.",
          "Cuando el agente no sabe algo, le pregunta al dueño por WhatsApp, reenvía la respuesta y guarda los datos generales para no volver a preguntar.",
        ],
      },
      {
        h: "Guardrails",
        p: [
          "El modelo nunca tiene la última palabra en lo que importa. Los precios se validan contra el catálogo de paquetes, los datos bancarios nunca salen del modelo, un «no» bloquea todo seguimiento con tres revisiones separadas, y el envío rechaza duplicados y más de cuatro mensajes automáticos en seis minutos.",
          "Un proceso diario saca lecciones de 14 días de chats para mejorar el prompt, pero no tiene permitido escribir reglas sobre precios, descuentos ni pagos.",
        ],
      },
      {
        h: "Resultados",
        p: [
          "496 negocios investigados y 429 sitios multipágina construidos por el pipeline. El código tiene 78 rutas de API, 26 modelos de datos y 318 pruebas automatizadas. El primer cliente, un despacho de abogados en Monterrey, pagó por un sitio de 29 páginas con 100 en Lighthouse en SEO, accesibilidad y buenas prácticas.",
        ],
      },
    ],
    pipelineTitle: "De la ficha al sitio pagado",
    galleryTitle: "Algunos de los 429",
  },
};

export const t = { en, es };

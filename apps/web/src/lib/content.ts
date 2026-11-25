// All visible copy for the portfolio, in English and Spanish.
// Every figure here comes from the projects themselves (git history, test files, worker logs).
// Do not add numbers that can't be traced back, and do not count designs or demo sites.

export type Lang = "en" | "es";

export const site = {
  url: "https://halonso.digital",
  name: "Humberto Alonso López",
  short: "Humberto Alonso",
  email: "alonso.humberto0401@gmail.com",
  phone: "+52 449 124 5952",
  linkedin: "https://www.linkedin.com/in/halonso-l/",
  github: "https://github.com/BetazoDev",
  cv: {
    en: { pdf: "/cv/Humberto-Alonso-Lopez-AI-Engineer-CV-EN.pdf", docx: "/cv/Humberto-Alonso-Lopez-AI-Engineer-CV-EN.docx" },
    es: { pdf: "/cv/Humberto-Alonso-Lopez-AI-Engineer-CV-ES.pdf", docx: "/cv/Humberto-Alonso-Lopez-AI-Engineer-CV-ES.docx" },
  },
};

/** Localized path: "/work/" -> "/es/work/" for Spanish. */
export const href = (lang: Lang, p = "/") => (lang === "es" ? `/es${p}` : p);

type Section = { h: string; p: string[]; image?: string; caption?: string };
type Metric = { value: string; label: string };
export type Project = {
  slug: string;
  name: string;
  year: string;
  role: string;
  tagline: string;
  summary: string;
  tags: string[];
  stack: string[];
  links: { label: string; url: string }[];
  metrics: Metric[];
  sections: Section[];
  gallery: { src: string; alt: string; kind: "desktop" | "phone" }[];
};

const ui = {
  en: {
    nav: { work: "Work", about: "About", contact: "Contact", cv: "Download CV", menu: "Menu", close: "Close", other: "ES", otherName: "Español" },
    skip: "Skip to content",
    cta: { work: "See the work", cv: "Download CV", case: "Read the case study", all: "All work", back: "All work", next: "Next project", visit: "Visit", email: "Email me" },
    footer: {
      tagline: "AI Engineer and full-stack developer. Aguascalientes, Mexico.",
      site: "Site",
      work: "Work",
      contact: "Contact",
      bottom: "LLM agents in production",
      lang: "Español",
    },
  },
  es: {
    nav: { work: "Proyectos", about: "Sobre mí", contact: "Contacto", cv: "Descargar CV", menu: "Menú", close: "Cerrar", other: "EN", otherName: "English" },
    skip: "Saltar al contenido",
    cta: { work: "Ver proyectos", cv: "Descargar CV", case: "Leer el caso completo", all: "Todos los proyectos", back: "Todos los proyectos", next: "Siguiente proyecto", visit: "Visitar", email: "Escríbeme" },
    footer: {
      tagline: "AI Engineer y desarrollador full-stack. Aguascalientes, México.",
      site: "Sitio",
      work: "Proyectos",
      contact: "Contacto",
      bottom: "Agentes con LLMs en producción",
      lang: "English",
    },
  },
};

const home = {
  en: {
    title: "Humberto Alonso López | AI Engineer",
    description:
      "AI Engineer and full-stack developer. I build LLM agents that run in production with the Claude API and the Claude Agent SDK, plus the TypeScript, Next.js and PostgreSQL systems around them.",
    first: "Humberto",
    last: "Alonso",
    metaRole: "AI Engineer",
    metaPlace: "Aguascalientes, MX / UTC-6",
    metaStatus: "Open to remote roles",
    roleMark: "AI Engineer",
    roleRest: "and full-stack developer.",
    intro: "I build LLM agents that ship to production, and the TypeScript, Go and PostgreSQL systems around them. Co-founder of Hemeron.",
    view: "View case study",
    selected: "Selected work",
    aboutTitle: "Five years shipping for the web.",
    aboutMuted: "Now I build the agents.",
    aboutText: "Before AI I built websites for international agencies and remote teams. Today I design and ship LLM products end to end: agents, evals, guardrails and the platforms they run on.",
    aboutCta: "More about me",
    talk: "Let's talk.",
    talkMuted: "Tell me what you're building.",
    pill: "AI Engineer and full-stack developer",
    h1a: "I build AI agents that",
    h1mark: "ship",
    h1b: "to production.",
    h1muted: "End to end.",
    sub: "Co-founder of Hemeron. Claude API, Agent SDK, TypeScript and PostgreSQL, from the first prompt to the deploy.",
    checks: ["LLM agents in production", "TypeScript end to end", "Remote, UTC-6"],
    showcaseLabel: "Projects",
    stats: [
      { icon: "coins", value: "US$0.002", label: "per sales-agent reply on Claude Haiku" },
      { icon: "chats-circle", value: "41 chats", label: "real conversations replayed as an eval set" },
      { icon: "test-tube", value: "318 tests", label: "guarding the Prospector codebase" },
      { icon: "robot", value: "4 agents", label: "fixing pages in parallel after review" },
    ],
    toolsLabel: "Built with",
    workEyebrow: "Selected work",
    workTitle: "Products I designed,",
    workTitleMuted: "built and shipped.",
    workIntro: "Each one is in production or in a client's hands. Open any of them for the full story.",
    pipeEyebrow: "How Prospector works",
    pipeTitle: "From a Maps listing",
    pipeTitleMuted: "to a paid website.",
    pipeSteps: [
      { name: "Find", text: "Apify scrapes Google Maps and Instagram. Claude Haiku proposes search terms for new niches." },
      { name: "Triage", text: "The server checks every site: errors, mobile, age, platform, WhatsApp. Each lead gets a score." },
      { name: "Research", text: "A Claude Agent SDK worker reads Maps, social profiles, directories and the Wayback Machine." },
      { name: "Build", text: "Another agent writes a multi-page Astro site from the business's own logo, colors and facts." },
      { name: "Review", text: "An art-director agent grades it, fixer agents repair pages in parallel, Playwright checks three viewports." },
      { name: "Sell", text: "A Claude API agent answers on WhatsApp, quotes, books calls and hands off what it can't answer." },
      { name: "Close", text: "One link carries the quote, the deposit, the client brief and the delivery job." },
    ],
    approachEyebrow: "Approach",
    approachTitle: "Evals first.",
    approachTitleMuted: "Guardrails in code.",
    approach: [
      { icon: "flask", name: "Evals before opinions", text: "I picked the sales agent's models by replaying 41 real conversations, then routed each message by intent and length." },
      { icon: "shield-check", name: "Guardrails live in code", text: "Prices are checked against the catalog, a refusal stops every follow-up, duplicate sends are blocked. The prompt is never the only defense." },
      { icon: "gauge", name: "Cost is a feature", text: "Prompt caching, structured outputs and model routing keep a reply near US$0.002, metered per lead under a daily cap." },
      { icon: "robot", name: "Agents get tests too", text: "Every agent step runs with a tool allowlist, a JSON Schema output, timeouts and resumable sessions, then Playwright checks the result." },
    ],
    contactTitle: "Let's talk about",
    contactMark: "your agents.",
    contactText: "Open to remote AI Engineer and full-stack roles. Email is the fastest way to reach me.",
    // Sections of the home page, in order.
    hero: {
      eyebrow: "AI Engineer, full-stack",
      lines: ["Hi, I'm Humberto.", "Building AI agents"],
      em: "that ship to production.",
      intro: "Co-founder of Hemeron. I design and ship LLM products end to end: agents, evals, guardrails and the TypeScript, Go and PostgreSQL systems they run on.",
      cv: "Download CV",
      work: "Explore work",
      status: "Open to remote roles",
      place: "Aguascalientes, MX / UTC-6",
    },
    me: {
      eyebrow: "About me",
      a: "I'm an AI Engineer who turns LLMs into",
      em: "software that does real work.",
      stats: [
        { to: 5, suffix: "+", label: "Years shipping for the web" },
        { to: 41, suffix: "", label: "Real chats replayed as an eval set" },
        { to: 318, suffix: "", label: "Automated tests on the Prospector" },
      ],
      more: "More about me",
    },
    build: {
      eyebrow: "What I do",
      a: "What I",
      em: "build",
      lead: "LLM features that hold up in production, and the full-stack systems they run on.",
      cta: "Let's talk",
      items: [
        { a: "AI", em: "agents", text: "Agents on the Claude API and the Agent SDK with tool allowlists, JSON Schema outputs, timeouts and resumable sessions.", tags: ["Claude API", "Agent SDK", "Tool use"] },
        { a: "Multi-agent", em: "pipelines", text: "Workers that research, build, review and fix in parallel, with Playwright checking every result before it ships.", tags: ["Orchestration", "Playwright", "PostgreSQL"] },
        { a: "MCP", em: "servers", text: "Tools that let AI agents act on real systems through scoped tokens, like the MCP server and CLI inside Hemenú.", tags: ["MCP", "Go", "API tokens"] },
        { a: "LLM", em: "evals", text: "Models picked by replaying real conversations, messages routed by intent and length, cost metered on every call.", tags: ["Evals", "Model routing", "Prompt caching"] },
        { a: "Full-stack", em: "products", text: "The platforms around the agents: Next.js, Go and PostgreSQL apps with tests, deployed with Docker.", tags: ["TypeScript", "Next.js", "Docker"] },
      ],
    },
    slider: {
      eyebrow: "Work",
      a: "Selected",
      em: "work",
      role: "Role",
      stack: "Built with",
      prev: "Previous project",
      next: "Next project",
      all: "All work",
    },
    reach: {
      a: "Building with LLMs?",
      b: "Let's get",
      em: "in touch.",
      text: "Open to remote AI Engineer and full-stack roles with product teams and agencies.",
      circle: "Get in touch",
    },
    past: {
      eyebrow: "Experience",
      a: "Five years",
      em: "of shipping.",
      lead: "Websites for international agencies and remote teams first. LLM products end to end now.",
      cv: "Full experience in the CV",
    },
    hire: {
      eyebrow: "Hiring",
      a: "Need an AI Engineer",
      b: "on",
      em: "your team?",
      lead: "Open to remote AI Engineer and full-stack roles with product teams and agencies.",
      big: "EN / ES",
      bigLabel: "Professional English (B2), native Spanish",
      title: "What I bring",
      list: ["Evals on real data before picking a model", "Guardrails in code, not only in prompts", "Cost measured on every call", "TypeScript, Go and PostgreSQL end to end"],
      cv: "Download CV",
      email: "Email me",
    },
    process: { eyebrow: "Approach", a: "How I", em: "work" },
    faq: {
      eyebrow: "FAQ",
      a: "Before you",
      em: "reach out",
      lead: "Quick answers to what recruiters usually ask.",
      items: [
        { q: "What roles are you looking for?", a: "Remote AI Engineer and full-stack roles, with product teams or agencies. I'm most useful where LLM features have to work in production, not only in a demo." },
        { q: "Where are you based, and how is your English?", a: "Aguascalientes, Mexico, on UTC-6, so my day overlaps with most US business hours. Spanish is my native language and my English is professional (B2)." },
        { q: "Which models and tools do you use?", a: "Mostly the Claude API and the Claude Agent SDK, plus OpenAI and Gemini when a project calls for them. Around them: TypeScript, Next.js, Go, PostgreSQL and Docker." },
        { q: "How do you make LLM features reliable?", a: "I replay real conversations as evals before choosing a model, keep guardrails in code instead of only in the prompt, use structured outputs and measure the cost of every call. The Prospector case study shows all of it." },
        { q: "Can I see the code?", a: "Most of this work lives in private company and client repositories. My GitHub has public projects, and each case study walks through the architecture." },
      ],
    },
    marquee: { a: "Let's build", em: "together" },
    end: { a: "Let's work", em: "together.", home: "Home", made: "Built by Humberto Alonso with Astro and Motion" },
  },
  es: {
    title: "Humberto Alonso López | AI Engineer",
    description:
      "AI Engineer y desarrollador full-stack. Construyo agentes con LLMs que corren en producción con la Claude API y el Claude Agent SDK, y los sistemas en TypeScript, Next.js y PostgreSQL que los sostienen.",
    first: "Humberto",
    last: "Alonso",
    metaRole: "AI Engineer",
    metaPlace: "Aguascalientes, MX / UTC-6",
    metaStatus: "Disponible para remoto",
    roleMark: "AI Engineer",
    roleRest: "y desarrollador full-stack.",
    intro: "Construyo agentes con LLMs que llegan a producción, y los sistemas en TypeScript, Go y PostgreSQL que los rodean. Cofundador de Hemeron.",
    view: "Ver el caso",
    selected: "Proyectos",
    aboutTitle: "Cinco años entregando para la web.",
    aboutMuted: "Ahora construyo los agentes.",
    aboutText: "Antes de la IA construí sitios para agencias internacionales y equipos remotos. Hoy diseño y entrego productos con LLMs de punta a punta: agentes, evals, guardrails y las plataformas donde corren.",
    aboutCta: "Más sobre mí",
    talk: "Hablemos.",
    talkMuted: "Cuéntame qué estás construyendo.",
    pill: "AI Engineer y desarrollador full-stack",
    h1a: "Construyo agentes de IA que",
    h1mark: "llegan",
    h1b: "a producción.",
    h1muted: "De punta a punta.",
    sub: "Cofundador de Hemeron. Claude API, Agent SDK, TypeScript y PostgreSQL, del primer prompt al despliegue.",
    checks: ["Agentes con LLMs en producción", "TypeScript de punta a punta", "Remoto, UTC-6"],
    showcaseLabel: "Proyectos",
    stats: [
      { icon: "coins", value: "US$0.002", label: "por respuesta del agente de ventas en Claude Haiku" },
      { icon: "chats-circle", value: "41 chats", label: "conversaciones reales repetidas como evaluación" },
      { icon: "test-tube", value: "318 pruebas", label: "cuidando el código del Prospector" },
      { icon: "robot", value: "4 agentes", label: "corrigiendo páginas en paralelo tras la revisión" },
    ],
    toolsLabel: "Hecho con",
    workEyebrow: "Proyectos",
    workTitle: "Productos que diseñé,",
    workTitleMuted: "construí y entregué.",
    workIntro: "Todos están en producción o en manos de un cliente. Abre cualquiera para ver la historia completa.",
    pipeEyebrow: "Cómo funciona el Prospector",
    pipeTitle: "De una ficha en Maps",
    pipeTitleMuted: "a un sitio pagado.",
    pipeSteps: [
      { name: "Encontrar", text: "Apify extrae Google Maps e Instagram. Claude Haiku propone términos de búsqueda para nichos nuevos." },
      { name: "Filtrar", text: "El servidor revisa cada sitio: errores, móvil, antigüedad, plataforma, WhatsApp. Cada prospecto recibe un puntaje." },
      { name: "Investigar", text: "Un worker con el Claude Agent SDK revisa Maps, redes sociales, directorios y el Wayback Machine." },
      { name: "Construir", text: "Otro agente escribe un sitio multipágina en Astro con el logo, los colores y los datos reales del negocio." },
      { name: "Revisar", text: "Un agente director de arte lo califica, agentes correctores reparan páginas en paralelo y Playwright revisa tres tamaños." },
      { name: "Vender", text: "Un agente sobre la Claude API responde en WhatsApp, cotiza, agenda llamadas y pasa lo que no sabe." },
      { name: "Cerrar", text: "Un solo enlace lleva la cotización, el anticipo, el brief del cliente y el trabajo de entrega." },
    ],
    approachEyebrow: "Método",
    approachTitle: "Primero evals.",
    approachTitleMuted: "Guardrails en el código.",
    approach: [
      { icon: "flask", name: "Primero evals, luego opiniones", text: "Elegí los modelos del agente de ventas repitiendo 41 conversaciones reales, y enruto cada mensaje según intención y longitud." },
      { icon: "shield-check", name: "Los guardrails viven en el código", text: "Los precios se validan contra el catálogo, un «no» detiene todo seguimiento y los duplicados se bloquean. El prompt nunca es la única defensa." },
      { icon: "gauge", name: "El costo también es una función", text: "Prompt caching, salidas estructuradas y ruteo de modelos dejan una respuesta cerca de US$0.002, medida por prospecto con tope diario." },
      { icon: "robot", name: "Los agentes también llevan pruebas", text: "Cada paso de agente corre con herramientas permitidas, salida con JSON Schema, tiempos límite y sesiones reanudables; luego Playwright revisa el resultado." },
    ],
    contactTitle: "Hablemos de",
    contactMark: "tus agentes.",
    contactText: "Disponible para puestos remotos de AI Engineer y full-stack. La forma más rápida de contactarme es por correo.",
    hero: {
      eyebrow: "AI Engineer, full-stack",
      lines: ["Hola, soy Humberto.", "Construyo agentes de IA"],
      em: "que llegan a producción.",
      intro: "Cofundador de Hemeron. Diseño y entrego productos con LLMs de punta a punta: agentes, evals, guardrails y los sistemas en TypeScript, Go y PostgreSQL donde corren.",
      cv: "Descargar CV",
      work: "Ver proyectos",
      status: "Disponible para remoto",
      place: "Aguascalientes, MX / UTC-6",
    },
    me: {
      eyebrow: "Sobre mí",
      a: "Soy AI Engineer y convierto los LLMs en",
      em: "software que hace trabajo real.",
      stats: [
        { to: 5, suffix: "+", label: "Años entregando para la web" },
        { to: 41, suffix: "", label: "Chats reales repetidos como evaluación" },
        { to: 318, suffix: "", label: "Pruebas automáticas en el Prospector" },
      ],
      more: "Más sobre mí",
    },
    build: {
      eyebrow: "Lo que hago",
      a: "Lo que",
      em: "construyo",
      lead: "Funciones con LLMs que aguantan producción, y los sistemas full-stack donde corren.",
      cta: "Hablemos",
      items: [
        { a: "Agentes de", em: "IA", text: "Agentes sobre la Claude API y el Agent SDK con herramientas permitidas, salidas con JSON Schema, tiempos límite y sesiones reanudables.", tags: ["Claude API", "Agent SDK", "Tool use"] },
        { a: "Pipelines", em: "multiagente", text: "Workers que investigan, construyen, revisan y corrigen en paralelo, con Playwright revisando cada resultado antes de publicarlo.", tags: ["Orquestación", "Playwright", "PostgreSQL"] },
        { a: "Servidores", em: "MCP", text: "Herramientas para que agentes de IA actúen sobre sistemas reales con tokens acotados, como el servidor MCP y la CLI de Hemenú.", tags: ["MCP", "Go", "Tokens de API"] },
        { a: "Evals de", em: "LLMs", text: "Modelos elegidos repitiendo conversaciones reales, mensajes enrutados por intención y longitud, y el costo medido en cada llamada.", tags: ["Evals", "Ruteo de modelos", "Prompt caching"] },
        { a: "Productos", em: "full-stack", text: "Las plataformas alrededor de los agentes: apps en Next.js, Go y PostgreSQL con pruebas, desplegadas con Docker.", tags: ["TypeScript", "Next.js", "Docker"] },
      ],
    },
    slider: {
      eyebrow: "Proyectos",
      a: "Proyectos",
      em: "seleccionados",
      role: "Rol",
      stack: "Hecho con",
      prev: "Proyecto anterior",
      next: "Siguiente proyecto",
      all: "Todos los proyectos",
    },
    reach: {
      a: "¿Construyes con LLMs?",
      b: "Ponte en",
      em: "contacto.",
      text: "Disponible para puestos remotos de AI Engineer y full-stack con equipos de producto y agencias.",
      circle: "Escríbeme",
    },
    past: {
      eyebrow: "Experiencia",
      a: "Cinco años",
      em: "entregando.",
      lead: "Primero sitios para agencias internacionales y equipos remotos. Hoy, productos con LLMs de punta a punta.",
      cv: "Experiencia completa en el CV",
    },
    hire: {
      eyebrow: "Contratación",
      a: "¿Buscas un AI Engineer",
      b: "para",
      em: "tu equipo?",
      lead: "Disponible para puestos remotos de AI Engineer y full-stack con equipos de producto y agencias.",
      big: "ES / EN",
      bigLabel: "Español nativo, inglés profesional (B2)",
      title: "Lo que aporto",
      list: ["Evals con datos reales antes de elegir modelo", "Guardrails en el código, no solo en el prompt", "Costo medido en cada llamada", "TypeScript, Go y PostgreSQL de punta a punta"],
      cv: "Descargar CV",
      email: "Escríbeme",
    },
    process: { eyebrow: "Método", a: "Cómo", em: "trabajo" },
    faq: {
      eyebrow: "Preguntas",
      a: "Antes de",
      em: "escribirme",
      lead: "Respuestas rápidas a lo que suelen preguntar los reclutadores.",
      items: [
        { q: "¿Qué puestos buscas?", a: "Puestos remotos de AI Engineer y full-stack, con equipos de producto o agencias. Aporto más donde las funciones con LLMs tienen que funcionar en producción, no solo en una demo." },
        { q: "¿Dónde estás y cómo es tu inglés?", a: "En Aguascalientes, México, en UTC-6, así que mi día coincide con casi todo el horario laboral de Estados Unidos. Mi idioma nativo es el español y mi inglés es profesional (B2)." },
        { q: "¿Qué modelos y herramientas usas?", a: "Sobre todo la Claude API y el Claude Agent SDK, y OpenAI o Gemini cuando el proyecto lo pide. Alrededor: TypeScript, Next.js, Go, PostgreSQL y Docker." },
        { q: "¿Cómo haces confiables las funciones con LLMs?", a: "Repito conversaciones reales como evals antes de elegir modelo, dejo los guardrails en el código y no solo en el prompt, uso salidas estructuradas y mido el costo de cada llamada. El caso del Prospector lo muestra todo." },
        { q: "¿Puedo ver el código?", a: "Casi todo este trabajo vive en repositorios privados de la empresa y de clientes. Mi GitHub tiene proyectos públicos, y cada caso explica la arquitectura." },
      ],
    },
    marquee: { a: "Construyamos", em: "juntos" },
    end: { a: "Trabajemos", em: "juntos.", home: "Inicio", made: "Hecho por Humberto Alonso con Astro y Motion" },
  },
};

const work = {
  en: {
    title: "Work | Humberto Alonso López",
    description: "Case studies: an AI sales pipeline with autonomous agents, a scheduling platform, a multi-tenant restaurant SaaS with an MCP server, an AI training app and an AI-built client website.",
    eyebrow: "Work",
    h1: "Selected work",
    h1muted: "2026",
    intro: "Five projects, from multi-agent pipelines to the platforms around them. Every one is live or delivered.",
  },
  es: {
    title: "Proyectos | Humberto Alonso López",
    description: "Casos de estudio: un pipeline de ventas con agentes autónomos, una plataforma de agenda, un SaaS multi-tenant para restaurantes con servidor MCP, una app de entrenamiento con IA y un sitio de cliente hecho con IA.",
    eyebrow: "Proyectos",
    h1: "Proyectos seleccionados",
    h1muted: "2026",
    intro: "Cinco proyectos, de pipelines multiagente a las plataformas que los rodean. Todos están en línea o entregados.",
  },
};

const about = {
  en: {
    title: "About | Humberto Alonso López",
    description: "Humberto Alonso López, AI Engineer and full-stack developer from Aguascalientes, Mexico. Experience, approach, stack and CV.",
    eyebrow: "About",
    h1: "Humberto Alonso López.",
    h1muted: "AI Engineer from Aguascalientes, Mexico.",
    bio: [
      "I build software that uses large language models to do real work: research, write, sell, schedule, import. Since 2026 I've done it as co-founder of Hemeron, a custom AI software studio, where I design and ship every system end to end.",
      "Before that I spent five years building websites for international agencies and remote teams. That's where I learned to care about speed, tests, clean deploys and clients who need things to just work. It shows in how I treat LLM features: evals on real data, guardrails in code, costs measured per call.",
    ],
    facts: [
      { k: "Based in", v: "Aguascalientes, Mexico (UTC-6)" },
      { k: "Open to", v: "Remote AI Engineer and full-stack roles" },
      { k: "Languages", v: "Spanish (native), English (B2)" },
      { k: "Education", v: "B.Eng. in Software Development and Management" },
    ],
    stackTitle: "Tools I use every week",
    stack: [
      { name: "AI", items: ["Claude API", "Claude Agent SDK", "Claude Code", "OpenAI", "Gemini", "Vercel AI SDK", "Tool use", "MCP", "RAG", "Embeddings", "Evals", "Prompt caching", "Structured outputs", "Whisper"] },
      { name: "Full-stack", items: ["TypeScript", "Next.js", "React", "Node.js", "Go", "Astro", "Tailwind CSS", "Flutter", "WordPress"] },
      { name: "Data", items: ["PostgreSQL", "Prisma", "Drizzle", "sqlc", "PGlite"] },
      { name: "Ops and QA", items: ["Docker", "Dokploy", "Traefik", "GitHub Actions", "Playwright", "Vitest", "Lighthouse", "n8n"] },
    ],
    expTitle: "Experience",
    experience: [
      { role: "Co-Founder & AI Engineer", org: "Hemeron", dates: "2026 - now", text: "LLM agents, multi-agent pipelines and the full-stack products around them." },
      { role: "Full-Stack & AI Automation Developer", org: "Independent projects", dates: "2026", text: "Autonomous publishing with Gemini and n8n, WhatsApp agents, editorial workflows." },
      { role: "WordPress Developer", org: "Reputation Defense Network", dates: "2025 - now", text: "Custom WordPress builds, performance and Core Web Vitals." },
      { role: "WordPress Developer", org: "Agency4RealEstate", dates: "2023 - 2024", text: "WordPress and WooCommerce for real estate agencies." },
      { role: "Web Developer", org: "Bloom (formerly DUDE Agency)", dates: "2022 - 2023", text: "WordPress, Duda and HubSpot sites." },
      { role: "Freelance Web Developer", org: "Fundación Acuerdo UVTC", dates: "2021 - 2022", text: "Full websites from planning to delivery." },
    ],
    cvTitle: "Résumé",
    cvText: "Single column and plain text, so applicant tracking systems read it as written.",
  },
  es: {
    title: "Sobre mí | Humberto Alonso López",
    description: "Humberto Alonso López, AI Engineer y desarrollador full-stack de Aguascalientes, México. Experiencia, método, herramientas y CV.",
    eyebrow: "Sobre mí",
    h1: "Humberto Alonso López.",
    h1muted: "AI Engineer en Aguascalientes, México.",
    bio: [
      "Construyo software que usa modelos de lenguaje para hacer trabajo real: investigar, escribir, vender, agendar, importar. Desde 2026 lo hago como cofundador de Hemeron, un estudio de software a la medida con IA, donde diseño y entrego cada sistema de punta a punta.",
      "Antes pasé cinco años construyendo sitios para agencias internacionales y equipos remotos. Ahí aprendí a cuidar la velocidad, las pruebas, los despliegues limpios y a los clientes que necesitan que todo simplemente funcione. Se nota en cómo trato las funciones con LLMs: evals con datos reales, guardrails en el código y costo medido por llamada.",
    ],
    facts: [
      { k: "Ubicación", v: "Aguascalientes, México (UTC-6)" },
      { k: "Disponible para", v: "Puestos remotos de AI Engineer y full-stack" },
      { k: "Idiomas", v: "Español (nativo), inglés (B2)" },
      { k: "Educación", v: "Ingeniería en Desarrollo y Gestión de Software" },
    ],
    stackTitle: "Herramientas de todas las semanas",
    stack: [
      { name: "IA", items: ["Claude API", "Claude Agent SDK", "Claude Code", "OpenAI", "Gemini", "Vercel AI SDK", "Tool use", "MCP", "RAG", "Embeddings", "Evals", "Prompt caching", "Salidas estructuradas", "Whisper"] },
      { name: "Full-stack", items: ["TypeScript", "Next.js", "React", "Node.js", "Go", "Astro", "Tailwind CSS", "Flutter", "WordPress"] },
      { name: "Datos", items: ["PostgreSQL", "Prisma", "Drizzle", "sqlc", "PGlite"] },
      { name: "Ops y QA", items: ["Docker", "Dokploy", "Traefik", "GitHub Actions", "Playwright", "Vitest", "Lighthouse", "n8n"] },
    ],
    expTitle: "Experiencia",
    experience: [
      { role: "Cofundador y AI Engineer", org: "Hemeron", dates: "2026 - hoy", text: "Agentes con LLMs, pipelines multiagente y los productos full-stack que los rodean." },
      { role: "Desarrollador Full-Stack y de Automatización con IA", org: "Proyectos independientes", dates: "2026", text: "Publicación autónoma con Gemini y n8n, agentes de WhatsApp, flujos editoriales." },
      { role: "Desarrollador WordPress", org: "Reputation Defense Network", dates: "2025 - hoy", text: "Sitios WordPress a la medida, rendimiento y Core Web Vitals." },
      { role: "Desarrollador WordPress", org: "Agency4RealEstate", dates: "2023 - 2024", text: "WordPress y WooCommerce para agencias inmobiliarias." },
      { role: "Desarrollador Web", org: "Bloom (antes DUDE Agency)", dates: "2022 - 2023", text: "Sitios en WordPress, Duda y HubSpot." },
      { role: "Desarrollador Web Freelance", org: "Fundación Acuerdo UVTC", dates: "2021 - 2022", text: "Sitios completos de la planeación a la entrega." },
    ],
    cvTitle: "Currículum",
    cvText: "Una sola columna y texto plano, para que los sistemas de reclutamiento lo lean tal cual.",
  },
};

const contact = {
  en: {
    title: "Contact | Humberto Alonso López",
    description: "Contact Humberto Alonso López, AI Engineer. Email, LinkedIn, GitHub and CV in English and Spanish.",
    eyebrow: "Contact",
    h1: "Let's talk.",
    h1muted: "Tell me what you're building.",
    text: "Open to remote AI Engineer and full-stack roles with product teams and agencies. Email works best.",
    channels: "Elsewhere",
    files: "Résumé",
    en: "English",
    es: "Spanish",
  },
  es: {
    title: "Contacto | Humberto Alonso López",
    description: "Contacta a Humberto Alonso López, AI Engineer. Correo, LinkedIn, GitHub y CV en inglés y español.",
    eyebrow: "Contacto",
    h1: "Hablemos.",
    h1muted: "Cuéntame qué estás construyendo.",
    text: "Disponible para puestos remotos de AI Engineer y full-stack con equipos de producto y agencias. El correo es lo más rápido.",
    channels: "En otros lados",
    files: "Currículum",
    en: "Inglés",
    es: "Español",
  },
};

const projects: Record<Lang, Project[]> = {
  en: [
    {
      slug: "prospector",
      name: "Hemeron Prospector",
      year: "2026",
      role: "Sole engineer, co-founder",
      tagline: "An AI sales pipeline. Agents research a business, build its new website and sell it on WhatsApp.",
      summary: "Takes a business from a Google Maps listing to a paid website, with a multi-agent worker on the Claude Agent SDK and a sales agent on the Claude API.",
      tags: ["Claude Agent SDK", "Claude API", "Multi-agent", "Evals"],
      stack: ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma", "Claude API", "Claude Agent SDK", "Playwright", "Apify", "whisper.cpp", "Docker"],
      links: [{ label: "Quote simulator", url: "https://brief.hemeron.com/simulador" }],
      metrics: [
        { value: "US$0.002", label: "per Haiku reply, metered per lead" },
        { value: "41", label: "real chats replayed to pick models" },
        { value: "318", label: "automated tests" },
        { value: "78", label: "API routes over 26 data models" },
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
            "Each demo is a chain of Claude Agent SDK runs, each with its own tool allowlist, JSON Schema output, turn limit and timeout. Research comes first and is mandatory: Maps, social profiles, directories and the Wayback Machine, with one rule above all: nothing invented.",
            "The build agent writes a multi-page Astro site from the brand it found. An art-director agent reviews it, and its notes are split by page across up to four fixer agents that share one dev server. In a measured round that cut the fix time from 26 to 19.5 minutes and the automated issues from 8 to 0.",
            "A Playwright tool I wrote captures every route at 1440, 820 and 390 px and flags overlapping text, overflow, broken images, tiny text and console errors before a demo can publish.",
          ],
          image: "nebula",
          caption: "A demo built by the pipeline from the studio's own brand.",
        },
        {
          h: "The sales agent",
          p: [
            "Replies on WhatsApp come from a Claude API agent. The stable rules and the sales skill sit in a cached system prompt, the answer comes back as JSON Schema structured output, and customer photos go in as images. Voice notes are transcribed locally with whisper.cpp.",
            "Routing is deliberate: Haiku handles most messages, Sonnet takes interested leads and long or multi-question messages, Opus runs the daily analyst. I chose that split by replaying 41 real chats. A Haiku reply costs about US$0.002 and a Sonnet reply about US$0.03, and every call is metered per lead under a daily cap.",
            "When the agent doesn't know something, it asks the owner on WhatsApp, relays the answer and stores general facts so it won't ask twice.",
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
          h: "Closing the sale",
          p: [
            "One link carries the whole close: live quote, 50/50 payment, an 8-step client brief, PDFs generated on the server and a delivery job that hands the final site to the worker.",
          ],
          image: "simulador",
          caption: "The quote simulator at brief.hemeron.com/simulador.",
        },
        {
          h: "Results",
          p: [
            "The codebase has 78 API routes, 26 data models and 318 automated tests, built in 161 commits over six weeks. The first client, a law firm in Monterrey, paid for a 29-page site that scores 100 in Lighthouse SEO, accessibility and best practices.",
          ],
        },
      ],
      gallery: [],
    },
    {
      slug: "agenda",
      name: "Agenda Hemeron",
      year: "2026",
      role: "Sole engineer",
      tagline: "A self-hosted Calendly with Google Calendar, Meet and an API that AI agents use to book calls.",
      summary: "Public booking pages, team round-robin and a slot engine that never double-books, wired to Google Calendar and to the Prospector's sales agent.",
      tags: ["Next.js 16", "Google APIs", "PostgreSQL", "Agent API"],
      stack: ["Next.js 16", "React 19", "TypeScript", "Drizzle ORM", "PostgreSQL", "PGlite", "Zod", "Luxon", "Google Calendar API", "Docker"],
      links: [{ label: "schedule.hemeron.com", url: "https://schedule.hemeron.com" }],
      metrics: [
        { value: "0", label: "double bookings: live recheck plus a Postgres lock" },
        { value: "AES-256", label: "GCM encryption for every Google token" },
        { value: "21", label: "test cases on slots, email and the API" },
        { value: "9", label: "tables, one source of truth" },
      ],
      sections: [
        {
          h: "Why build it",
          p: [
            "Hemeron's sales agent needed booking links it could send in a WhatsApp chat, with Google Calendar as the source of truth and no per-seat fees. So I built our own scheduler, modeled on how Calendly's API works.",
          ],
        },
        {
          h: "What it does",
          p: [
            "Public pages for the team, each person and each event type, with a month calendar, times in the visitor's time zone, a booking form, and links to reschedule or cancel. Every booking creates the event in the host's calendar with a Google Meet link, and Google sends the invitation.",
            "The dashboard covers meetings, event types (duration, buffers, minimum notice, horizon, daily cap, questions, secret events), weekly availability with date overrides, Google Calendar connection, users and roles.",
          ],
          image: "schedule",
          caption: "The public team page at schedule.hemeron.com.",
        },
        {
          h: "The slot engine",
          p: [
            "Slots come from pure, tested functions: weekly hours, replaced by date overrides, starts every N minutes, minus Google free/busy and existing bookings with their buffers, then minimum notice, horizon and daily cap.",
            "Team events work two ways. All together intersects the hosts' availability. Whoever is free unions it, then assigns by priority and by who had fewer recent meetings.",
          ],
        },
        {
          h: "No double bookings",
          p: [
            "At booking time availability is recomputed live against Google, and a Postgres advisory transaction lock per host set makes two people racing for the same slot impossible.",
          ],
        },
        {
          h: "Built for agents",
          p: [
            "A read API with bearer tokens exposes event types and bookings. The Prospector's sales agent uses it to pick the right event link, match a booking to a lead and send meeting reminders in the chat.",
            "Google tokens are encrypted with AES-256-GCM, passwords use scrypt and public endpoints are rate limited. Without a DATABASE_URL it runs on PGlite, Postgres compiled to WASM, so local setup is one command.",
          ],
        },
      ],
      gallery: [],
    },
    {
      slug: "hemenu",
      name: "Hemenú",
      year: "2026",
      role: "Sole engineer",
      tagline: "Multi-tenant restaurant SaaS with an MCP server for AI agents and a Claude vision menu importer.",
      summary: "QR menus, orders from the table, a loyalty club and a CRM for restaurants, on a Go API with Postgres row-level security per tenant.",
      tags: ["Go", "MCP server", "Claude vision", "Multi-tenant"],
      stack: ["Go", "chi", "pgx + sqlc", "goose", "River", "PostgreSQL RLS", "Astro SSR", "Preact", "React", "TanStack", "Server-Sent Events", "Web Push", "Stripe", "Mercado Pago", "Claude"],
      links: [{ label: "Demo menu", url: "https://hemenu.halonso.digital/cafe-jardin" }],
      metrics: [
        { value: "RLS", label: "row-level security on every tenant table" },
        { value: "MCP", label: "server at /mcp plus a CLI for agents" },
        { value: "1", label: "Go binary: API, worker, migrations, seed" },
        { value: "Live", label: "orders over LISTEN/NOTIFY and SSE" },
      ],
      sections: [
        {
          h: "The product",
          p: [
            "A QR menu with the restaurant's own brand, orders from the table and a live order board for the staff. Around it: a loyalty club with stamps or points, rewards, a prize wheel and birthdays; a CRM with RFM segments; automated emails; payment at the table and invoices.",
          ],
          image: "pedidos",
          caption: "The live order board on a phone, with demo data.",
        },
        {
          h: "Architecture",
          p: [
            "A single Go binary runs the API, the River background workers, migrations and the demo seed. The public menu is Astro SSR with small Preact islands, because guests open it on mobile data. The dashboard is React with TanStack Router and Query, embedded in the same binary.",
            "Orders reach the board instantly: Postgres LISTEN/NOTIFY feeds Server-Sent Events, and guests get Web Push when their order is ready.",
          ],
        },
        {
          h: "Tenant isolation",
          p: [
            "Every query for a business runs inside a tenant scope with a restricted database role and row-level security. Each tenant table carries a tenant id and composite foreign keys to its parent, and integration tests against an embedded Postgres prove one restaurant can never read another's data.",
          ],
          image: "mesas",
          caption: "Tables and QR codes in the dashboard, with demo data.",
        },
        {
          h: "AI and agents",
          p: [
            "Claude reads a menu from photos or a PDF and turns it into a draft the owner reviews before publishing. A Sonnet summary of the period, built only from totals, suggests what to do next.",
            "An MCP server at /mcp and a CLI let AI agents work with the menu through API tokens. Agent tokens act on the owner's behalf but can never touch the team, settings, billing, exports or other tokens, and the plan can switch AI off at any moment.",
          ],
        },
      ],
      gallery: [],
    },
    {
      slug: "stenia",
      name: "Stenia",
      year: "2026",
      role: "Sole engineer",
      tagline: "An installable training app that writes routines with Claude, Gemini or OpenAI and works offline.",
      summary: "A gym and calisthenics PWA: AI routines from a health questionnaire and the user's real equipment, live session logging offline, progress and nutrition.",
      tags: ["Vercel AI SDK", "PWA", "MediaPipe", "Multi-provider"],
      stack: ["Next.js 16", "TypeScript", "Vercel AI SDK", "Claude Agent SDK", "Drizzle", "better-auth", "Dexie", "Serwist", "MediaPipe", "Vitest", "Playwright"],
      links: [
        { label: "Source on GitHub", url: "https://github.com/BetazoDev/stenia" },
        { label: "stenia.halonso.digital", url: "https://stenia.halonso.digital" },
      ],
      metrics: [
        { value: "3", label: "AI providers behind one interface" },
        { value: "Offline", label: "sessions logged without a connection" },
        { value: "PAR-Q+", label: "health screening before any routine" },
        { value: "E2E", label: "Playwright tests on the main flows" },
      ],
      sections: [
        {
          h: "The product",
          p: [
            "Stenia builds a routine from a PAR-Q+ and ACSM based questionnaire and the equipment the person actually has. It logs each session live, even offline, and tracks records, charts, a muscle map, body measurements and guided progress photos. Nutrition adds foods in Spanish from USDA data, weekly plans and barcode scanning.",
          ],
          image: "stenia",
          caption: "Sign-in screen of the installable app.",
        },
        {
          h: "AI behind one interface",
          p: [
            "Routine generation goes through the Vercel AI SDK, so the same code runs on Anthropic, Google or OpenAI with the user's own key. Output is validated against a template before anything is saved.",
            "There is also a Claude subscription provider: requests go through a queue to a Mac bridge that runs them with the Claude Agent SDK, which keeps costs flat during development.",
          ],
        },
        {
          h: "Vision",
          p: [
            "MediaPipe runs on the device to guide progress photos and to count repetitions from the camera. Vision models read InBody, BIA and DEXA reports into structured measurements.",
          ],
        },
        {
          h: "Engineering",
          p: [
            "A pnpm monorepo with the app, an AI package and the shared domain. Serwist and Dexie make it installable and offline-capable, better-auth handles accounts with an admin role, and Vitest plus Playwright cover the main flows.",
          ],
        },
      ],
      gallery: [],
    },
    {
      slug: "ab-abogados",
      name: "AB Abogados",
      year: "2026",
      role: "Pipeline output, delivered by me",
      tagline: "The Prospector's first paying client: a 29-page law firm site built for search engines and AI answers.",
      summary: "A demo built by the agents from the firm's real brand became a delivered site with local SEO, structured data and llms.txt.",
      tags: ["Astro", "Technical SEO", "GEO", "View Transitions"],
      stack: ["Astro 7", "View Transitions", "JSON-LD", "Sitemap", "llms.txt", "Lighthouse"],
      links: [{ label: "Live site", url: "https://demos.hemeron.com/ababogadosmty/" }],
      metrics: [
        { value: "29", label: "pages in the production build" },
        { value: "100", label: "Lighthouse SEO, accessibility and best practices" },
        { value: "10", label: "local landing pages by municipality" },
        { value: "llms.txt", label: "and llms-full.txt for AI assistants" },
      ],
      sections: [
        {
          h: "From demo to client",
          p: [
            "The pipeline researched the firm, built a demo from its real logo, colors and published information, and sent it on WhatsApp. The firm accepted the quote and became the Prospector's first paying client.",
          ],
        },
        {
          h: "What shipped",
          p: [
            "Five practice areas with criminal law first, five legal guides, an FAQ, ten municipality pages for local search, a contact page with map, a privacy notice written under Mexico's data protection law and a 404 page. The team appears with structured data, and shared-element view transitions connect the home page to each practice area.",
          ],
          image: "ab",
          caption: "The firm's home page on desktop.",
        },
        {
          h: "Built for AI answers",
          p: [
            "Besides the sitemap and JSON-LD, the site ships llms.txt and llms-full.txt, so assistants like ChatGPT or Claude can read and cite the firm accurately. The production build scores 100 in Lighthouse SEO, accessibility and best practices.",
          ],
        },
      ],
      gallery: [],
    },
  ],
  es: [
    {
      slug: "prospector",
      name: "Hemeron Prospector",
      year: "2026",
      role: "Único ingeniero, cofundador",
      tagline: "Un pipeline de ventas con IA. Los agentes investigan un negocio, construyen su sitio nuevo y lo venden por WhatsApp.",
      summary: "Lleva a un negocio de su ficha en Google Maps a un sitio pagado, con un worker multiagente sobre el Claude Agent SDK y un agente de ventas sobre la Claude API.",
      tags: ["Claude Agent SDK", "Claude API", "Multiagente", "Evals"],
      stack: ["Next.js 16", "TypeScript", "PostgreSQL", "Prisma", "Claude API", "Claude Agent SDK", "Playwright", "Apify", "whisper.cpp", "Docker"],
      links: [{ label: "Simulador de cotización", url: "https://brief.hemeron.com/simulador" }],
      metrics: [
        { value: "US$0.002", label: "por respuesta en Haiku, medida por prospecto" },
        { value: "41", label: "chats reales repetidos para elegir modelos" },
        { value: "318", label: "pruebas automatizadas" },
        { value: "78", label: "rutas de API sobre 26 modelos de datos" },
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
          image: "nebula",
          caption: "Una demo construida por el pipeline con la marca del estudio.",
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
          h: "Cerrar la venta",
          p: [
            "Un solo enlace lleva todo el cierre: cotización en vivo, pago 50/50, un brief del cliente de 8 pasos, PDFs generados en el servidor y un trabajo de entrega que le pasa el sitio final al worker.",
          ],
          image: "simulador",
          caption: "El simulador de cotización en brief.hemeron.com/simulador.",
        },
        {
          h: "Resultados",
          p: [
            "El código tiene 78 rutas de API, 26 modelos de datos y 318 pruebas automatizadas, en 161 commits durante seis semanas. El primer cliente, un despacho de abogados en Monterrey, pagó por un sitio de 29 páginas con 100 en Lighthouse en SEO, accesibilidad y buenas prácticas.",
          ],
        },
      ],
      gallery: [],
    },
    {
      slug: "agenda",
      name: "Agenda Hemeron",
      year: "2026",
      role: "Único ingeniero",
      tagline: "Un Calendly propio con Google Calendar, Meet y una API que los agentes de IA usan para agendar llamadas.",
      summary: "Páginas públicas de reserva, round-robin de equipo y un motor de horarios que nunca empalma citas, conectado a Google Calendar y al agente de ventas del Prospector.",
      tags: ["Next.js 16", "Google APIs", "PostgreSQL", "API para agentes"],
      stack: ["Next.js 16", "React 19", "TypeScript", "Drizzle ORM", "PostgreSQL", "PGlite", "Zod", "Luxon", "Google Calendar API", "Docker"],
      links: [{ label: "schedule.hemeron.com", url: "https://schedule.hemeron.com" }],
      metrics: [
        { value: "0", label: "reservas dobles: revisión en vivo y candado de Postgres" },
        { value: "AES-256", label: "GCM para cada token de Google" },
        { value: "21", label: "casos de prueba de horarios, correo y API" },
        { value: "9", label: "tablas, una sola fuente de verdad" },
      ],
      sections: [
        {
          h: "Por qué construirlo",
          p: [
            "El agente de ventas de Hemeron necesitaba enlaces de reserva que pudiera mandar en un chat de WhatsApp, con Google Calendar como fuente de verdad y sin pagar por usuario. Así que construí nuestro propio agendador, modelado en cómo funciona la API de Calendly.",
          ],
        },
        {
          h: "Qué hace",
          p: [
            "Páginas públicas del equipo, de cada persona y de cada tipo de evento, con calendario del mes, horarios en la zona de quien agenda, formulario y enlaces para reagendar o cancelar. Cada reserva crea el evento en el calendario del anfitrión con su enlace de Google Meet, y Google manda la invitación.",
            "El panel cubre reuniones, tipos de evento (duración, márgenes, anticipación mínima, días hacia adelante, máximo por día, preguntas, eventos secretos), disponibilidad semanal con fechas específicas, conexión con Google Calendar, usuarios y roles.",
          ],
          image: "schedule",
          caption: "La página pública del equipo en schedule.hemeron.com.",
        },
        {
          h: "El motor de horarios",
          p: [
            "Los horarios salen de funciones puras y probadas: horario semanal, reemplazado por fechas específicas, inicios cada N minutos, menos lo ocupado en Google y las reservas propias con sus márgenes, y luego anticipación mínima, días hacia adelante y máximo por día.",
            "Los eventos de equipo funcionan de dos formas. «Todos juntos» intersecta la disponibilidad de los anfitriones. «Quien esté libre» la une y luego asigna por prioridad y por quién tuvo menos reuniones recientes.",
          ],
        },
        {
          h: "Sin reservas dobles",
          p: [
            "Al reservar se vuelve a calcular la disponibilidad en vivo contra Google, y un candado transaccional de Postgres por grupo de anfitriones hace imposible que dos personas tomen el mismo horario.",
          ],
        },
        {
          h: "Hecho para agentes",
          p: [
            "Una API de lectura con tokens expone tipos de evento y reservas. El agente de ventas del Prospector la usa para elegir el enlace correcto, relacionar una reserva con un prospecto y mandar recordatorios de la reunión en el chat.",
            "Los tokens de Google se cifran con AES-256-GCM, las contraseñas usan scrypt y los endpoints públicos tienen límite de frecuencia. Sin DATABASE_URL corre sobre PGlite, Postgres compilado a WASM, así que arrancar en local es un solo comando.",
          ],
        },
      ],
      gallery: [],
    },
    {
      slug: "hemenu",
      name: "Hemenú",
      year: "2026",
      role: "Único ingeniero",
      tagline: "SaaS multi-tenant para restaurantes con servidor MCP para agentes de IA e importador de menús con visión de Claude.",
      summary: "Menú QR, pedidos desde la mesa, club de lealtad y CRM para restaurantes, sobre una API en Go con row-level security de Postgres por negocio.",
      tags: ["Go", "Servidor MCP", "Visión de Claude", "Multi-tenant"],
      stack: ["Go", "chi", "pgx + sqlc", "goose", "River", "PostgreSQL RLS", "Astro SSR", "Preact", "React", "TanStack", "Server-Sent Events", "Web Push", "Stripe", "Mercado Pago", "Claude"],
      links: [{ label: "Menú de ejemplo", url: "https://hemenu.halonso.digital/cafe-jardin" }],
      metrics: [
        { value: "RLS", label: "row-level security en cada tabla de negocio" },
        { value: "MCP", label: "servidor en /mcp y una CLI para agentes" },
        { value: "1", label: "binario de Go: API, worker, migraciones, semilla" },
        { value: "En vivo", label: "pedidos con LISTEN/NOTIFY y SSE" },
      ],
      sections: [
        {
          h: "El producto",
          p: [
            "Un menú QR con la marca del restaurante, pedidos desde la mesa y un tablero de pedidos en vivo para el personal. Alrededor: club de lealtad con sellos o puntos, recompensas, ruleta y cumpleaños; CRM con segmentos RFM; correos automáticos; cobro en la mesa y facturas.",
          ],
          image: "pedidos",
          caption: "El tablero de pedidos en vivo en un teléfono, con datos de ejemplo.",
        },
        {
          h: "Arquitectura",
          p: [
            "Un solo binario de Go corre la API, los trabajos en segundo plano con River, las migraciones y la semilla de demo. El menú público es Astro SSR con islas pequeñas de Preact, porque los comensales lo abren con datos móviles. El panel es React con TanStack Router y Query, embebido en el mismo binario.",
            "Los pedidos llegan al tablero al instante: LISTEN/NOTIFY de Postgres alimenta Server-Sent Events, y el comensal recibe Web Push cuando su pedido está listo.",
          ],
        },
        {
          h: "Aislamiento entre negocios",
          p: [
            "Cada consulta de un negocio corre dentro de su alcance con un rol de base de datos restringido y row-level security. Cada tabla lleva el id del negocio y llaves foráneas compuestas hacia su padre, y pruebas de integración contra un Postgres embebido demuestran que un restaurante nunca puede leer datos de otro.",
          ],
          image: "mesas",
          caption: "Mesas y códigos QR en el panel, con datos de ejemplo.",
        },
        {
          h: "IA y agentes",
          p: [
            "Claude lee un menú desde fotos o un PDF y lo convierte en un borrador que el dueño revisa antes de publicar. Un resumen del periodo con Sonnet, hecho solo con totales, sugiere qué hacer después.",
            "Un servidor MCP en /mcp y una CLI permiten que agentes de IA trabajen con el menú mediante tokens. Los tokens de agente actúan a nombre del dueño pero nunca tocan el equipo, los ajustes, los cobros, las exportaciones ni otros tokens, y el plan puede apagar la IA en cualquier momento.",
          ],
        },
      ],
      gallery: [],
    },
    {
      slug: "stenia",
      name: "Stenia",
      year: "2026",
      role: "Único ingeniero",
      tagline: "Una app de entrenamiento instalable que arma rutinas con Claude, Gemini u OpenAI y funciona sin conexión.",
      summary: "PWA de gimnasio y calistenia: rutinas con IA a partir de un cuestionario de salud y el equipo real de la persona, sesiones en vivo sin conexión, progreso y nutrición.",
      tags: ["Vercel AI SDK", "PWA", "MediaPipe", "Multiproveedor"],
      stack: ["Next.js 16", "TypeScript", "Vercel AI SDK", "Claude Agent SDK", "Drizzle", "better-auth", "Dexie", "Serwist", "MediaPipe", "Vitest", "Playwright"],
      links: [
        { label: "Código en GitHub", url: "https://github.com/BetazoDev/stenia" },
        { label: "stenia.halonso.digital", url: "https://stenia.halonso.digital" },
      ],
      metrics: [
        { value: "3", label: "proveedores de IA detrás de una sola interfaz" },
        { value: "Offline", label: "sesiones registradas sin conexión" },
        { value: "PAR-Q+", label: "revisión de salud antes de cualquier rutina" },
        { value: "E2E", label: "pruebas de Playwright en los flujos principales" },
      ],
      sections: [
        {
          h: "El producto",
          p: [
            "Stenia arma una rutina a partir de un cuestionario basado en PAR-Q+ y ACSM y del equipo que la persona realmente tiene. Registra cada sesión en vivo, aun sin conexión, y lleva récords, gráficas, un mapa muscular, medidas y fotos de progreso guiadas. La nutrición suma alimentos en español con datos de USDA, planes semanales y lectura de código de barras.",
          ],
          image: "stenia",
          caption: "Pantalla de acceso de la app instalable.",
        },
        {
          h: "IA detrás de una sola interfaz",
          p: [
            "La generación de rutinas pasa por el Vercel AI SDK, así que el mismo código corre en Anthropic, Google u OpenAI con la llave del usuario. La salida se valida contra una plantilla antes de guardar nada.",
            "También hay un proveedor con suscripción de Claude: las solicitudes pasan por una cola a un puente en una Mac que las corre con el Claude Agent SDK, lo que mantiene el costo fijo durante el desarrollo.",
          ],
        },
        {
          h: "Visión",
          p: [
            "MediaPipe corre en el dispositivo para guiar las fotos de progreso y contar repeticiones con la cámara. Modelos con visión leen reportes de InBody, BIA y DEXA y los convierten en medidas estructuradas.",
          ],
        },
        {
          h: "Ingeniería",
          p: [
            "Un monorepo con pnpm con la app, un paquete de IA y el dominio compartido. Serwist y Dexie la hacen instalable y usable sin conexión, better-auth maneja las cuentas con rol de administrador, y Vitest con Playwright cubren los flujos principales.",
          ],
        },
      ],
      gallery: [],
    },
    {
      slug: "ab-abogados",
      name: "AB Abogados",
      year: "2026",
      role: "Salida del pipeline, entregada por mí",
      tagline: "El primer cliente que pagó gracias al Prospector: un sitio de 29 páginas para un despacho, hecho para buscadores y respuestas de IA.",
      summary: "Una demo que los agentes construyeron con la marca real del despacho se convirtió en un sitio entregado con SEO local, datos estructurados y llms.txt.",
      tags: ["Astro", "SEO técnico", "GEO", "View Transitions"],
      stack: ["Astro 7", "View Transitions", "JSON-LD", "Sitemap", "llms.txt", "Lighthouse"],
      links: [{ label: "Sitio en línea", url: "https://demos.hemeron.com/ababogadosmty/" }],
      metrics: [
        { value: "29", label: "páginas en el build de producción" },
        { value: "100", label: "en Lighthouse: SEO, accesibilidad y buenas prácticas" },
        { value: "10", label: "páginas locales por municipio" },
        { value: "llms.txt", label: "y llms-full.txt para asistentes de IA" },
      ],
      sections: [
        {
          h: "De demo a cliente",
          p: [
            "El pipeline investigó al despacho, construyó una demo con su logo, sus colores y su información publicada, y la mandó por WhatsApp. El despacho aceptó la cotización y se volvió el primer cliente que pagó gracias al Prospector.",
          ],
        },
        {
          h: "Qué se entregó",
          p: [
            "Cinco áreas del derecho con Penal al frente, cinco guías legales, preguntas frecuentes, diez páginas por municipio para búsqueda local, contacto con mapa, un aviso de privacidad conforme a la ley mexicana de protección de datos y una página 404. El equipo aparece con datos estructurados, y transiciones de vista compartidas conectan el inicio con cada área.",
          ],
          image: "ab",
          caption: "El inicio del despacho en escritorio.",
        },
        {
          h: "Hecho para respuestas de IA",
          p: [
            "Además del sitemap y JSON-LD, el sitio incluye llms.txt y llms-full.txt, para que asistentes como ChatGPT o Claude lean y citen al despacho con precisión. El build de producción tiene 100 en Lighthouse en SEO, accesibilidad y buenas prácticas.",
          ],
        },
      ],
      gallery: [],
    },
  ],
};

export const t = { ui, home, work, about, contact, projects };

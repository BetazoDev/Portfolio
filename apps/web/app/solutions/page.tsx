import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { LangText } from "@/components/lang-text";
const items = [
  {
    title: "AI & Automation",
    en: "Intelligent workflows, classification, generation, scraping and model integration with real operations.",
    es: "Workflows inteligentes, clasificación, generación, scraping e integración de modelos con procesos reales.",
    stack: "OpenAI · n8n · APIs · Python",
  },
  {
    title: "Custom CMS",
    en: "Editorial platforms with publishing flows, media, SEO and structured content.",
    es: "Plataformas editoriales con flujos de publicación, medios, SEO y contenido estructurado.",
    stack: "Next.js · Node.js · PostgreSQL · Supabase",
  },
  {
    title: "SaaS & Business Platforms",
    en: "Dashboards, portals, authentication, roles and infrastructure for digital products.",
    es: "Dashboards, portales, autenticación, roles e infraestructura para productos digitales.",
    stack: "React · TypeScript · REST · Cloud",
  },
  {
    title: "Advanced WordPress",
    en: "Custom WordPress architecture, integrations, performance and complex editorial experiences.",
    es: "Arquitecturas WordPress a medida, integraciones, rendimiento y experiencias editoriales complejas.",
    stack: "WordPress · PHP · WooCommerce · Headless",
  },
];
export const metadata = {
  title: "Solutions",
  description:
    "Development, CMS, automation and artificial intelligence solutions.",
};
export default function SolutionsPage() {
  return (
    <SiteShell>
      <main className="py-24">
        <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[var(--accent)]">
          <LangText en="Capabilities" es="Capacidades" />
        </p>
        <h1 className="my-12 max-w-6xl text-6xl font-bold leading-[.92] tracking-tight md:text-8xl">
          <LangText
            en="Solutions built around business."
            es="Soluciones construidas alrededor del negocio."
          />
        </h1>
        <p className="max-w-3xl text-xl leading-relaxed opacity-65">
          <LangText
            en="I do not start with a technology. I start with the problem, the process and the result the product must produce."
            es="No parto de una tecnología. Parto del problema, el proceso y el resultado que el producto debe producir."
          />
        </p>
        <div className="mt-20 border-t border-[var(--border-color)]">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="grid gap-8 border-b border-[var(--border-color)] py-12 md:grid-cols-[100px_1fr_1fr]"
            >
              <span className="font-mono text-[10px] text-[var(--accent)]">
                0{index + 1}
              </span>
              <h2 className="text-3xl font-bold uppercase md:text-5xl">
                {item.title}
              </h2>
              <div>
                <p className="text-lg leading-relaxed opacity-65">
                  <LangText en={item.en} es={item.es} />
                </p>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-widest">
                  {item.stack}
                </p>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/#contact"
          className="my-20 inline-block border border-[var(--accent)] bg-[color:var(--accent)]/10 px-8 py-5 font-mono text-[10px] uppercase tracking-[.25em] text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
        >
          <LangText
            en="Discuss a solution ↗"
            es="Hablemos de una solución ↗"
          />
        </Link>
      </main>
    </SiteShell>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { getProject } from "@/lib/api";
import { LangText } from "@/components/lang-text";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return {};
  const image = project.media.find(
    (item) => item.type === "cover" || item.type === "thumbnail",
  )?.media.publicUrl;
  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.shortSummary,
    openGraph: {
      title: project.seoTitle ?? project.title,
      description: project.seoDescription ?? project.shortSummary ?? undefined,
      images: image ? [image] : [],
    },
  };
}
const Stack = ({ label, value }: { label: string; value: string | null }) =>
  value ? (
    <div className="border-b border-[var(--border-color)] py-5">
      <dt className="font-mono text-[9px] uppercase tracking-widest text-[var(--accent)]">
        {label}
      </dt>
      <dd className="mt-2 text-lg">{value}</dd>
    </div>
  ) : null;
export default async function ProjectPage({ params }: Props) {
  const project = await getProject((await params).slug);
  if (!project) notFound();
  const cover =
    project.media.find((item) => item.type === "cover")?.media ??
    project.media.find((item) => item.type === "thumbnail")?.media;
  const gallery = project.media.filter(
    (item) =>
      ["gallery", "screenshot", "workflow", "architecture"].includes(
        item.type,
      ) && item.media.publicUrl,
  );
  const demo = project.links.find((link) => link.type === "live");
  const github = project.links.find((link) => link.type === "github");
  return (
    <SiteShell>
      <main>
        <section className="pb-16 pt-20">
          <p className="eyebrow">
            Case study · {project.projectType ?? "Digital product"}
          </p>
          <h1 className="my-10 max-w-[1400px] text-6xl font-bold uppercase leading-[.9] tracking-tight md:text-8xl lg:text-9xl">
            {project.title}
          </h1>
          <p className="max-w-4xl text-xl leading-relaxed muted md:text-3xl">
            {project.subtitle ?? project.shortSummary}
          </p>
          <div className="mt-14 grid gap-px border-y border-[var(--border-color)] bg-[var(--border-color)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Role", project.role],
              ["Year", project.year],
              ["Industry", project.industry],
              ["Client", project.clientName],
            ].map(([label, value]) => (
              <div key={label} className="bg-[var(--bg-primary)] py-6 pr-8">
                <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--accent)]">
                  {label}
                </p>
                <p className="mt-3">{value ?? "Independent"}</p>
              </div>
            ))}
          </div>
        </section>
        {cover?.publicUrl && (
          <section className="mx-auto max-w-[1800px] px-3 md:px-6">
            <img
              src={cover.publicUrl}
              alt={cover.altText ?? project.title}
              className="min-h-[48vh] max-h-[86vh] w-full object-cover"
            />
          </section>
        )}
        <CaseBlock
          index="01"
          label={<LangText en="Overview" es="Resumen" />}
          title={
            <LangText
              en="The project in context"
              es="El proyecto en contexto"
            />
          }
        >
          <p className="max-w-4xl text-xl leading-relaxed muted md:text-2xl">
            {project.shortSummary ??
              project.subtitle ??
              "Case study in progress."}
          </p>
        </CaseBlock>
        <CaseBlock
          index="02"
          label={<LangText en="Technologies" es="Tecnologías" />}
          title={<LangText en="Tools selected for the job" es="Herramientas elegidas para el proyecto" />}
        >
          <div className="flex max-w-5xl flex-wrap gap-3">
            {project.technologies.length ? (
              project.technologies.map(({ technology }) => (
                <span
                  key={technology.id}
                  className="border border-[var(--border-color)] px-5 py-3 font-mono text-[10px] uppercase tracking-widest"
                >
                  {technology.name}
                </span>
              ))
            ) : (
              <p className="muted"><LangText en="Stack documentation in progress." es="Stack en documentación." /></p>
            )}
          </div>
        </CaseBlock>
        <CaseBlock
          index="03"
          label={<LangText en="Problem" es="Problema" />}
          title={
            <LangText
              en="What needed to change"
              es="Lo que necesitaba cambiar"
            />
          }
        >
          <Narrative value={project.problem} />
        </CaseBlock>
        <CaseBlock
          index="04"
          label={<LangText en="Solution" es="Solución" />}
          title={
            <LangText
              en="How the system responds"
              es="Cómo responde el sistema"
            />
          }
        >
          <Narrative value={project.solution} />
        </CaseBlock>
        <CaseBlock
          index="05"
          label={<LangText en="Architecture" es="Arquitectura" />}
          title={<LangText en="How it is built" es="Cómo está construido" />}
        >
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <Narrative value={project.architectureSummary} />
            <dl>
              <Stack label="Frontend" value={project.frontendStack} />
              <Stack label="Backend" value={project.backendStack} />
              <Stack label="Database" value={project.databaseStack} />
              <Stack label="Automation" value={project.automationStack} />
              <Stack label="AI" value={project.aiStack} />
              <Stack label="Deployment" value={project.deploymentStack} />
            </dl>
          </div>
        </CaseBlock>
        {project.sections.length > 0 && (
          <section className="py-10">
            {project.sections.map((section) => (
              <DynamicSection key={section.id} section={section} />
            ))}
          </section>
        )}
        <CaseBlock index="06" label={<LangText en="Gallery" es="Galería" />} title={<LangText en="The product in use" es="El producto en uso" />}>
          {gallery.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {gallery.map((item, index) => (
                <figure
                  key={item.id}
                  className={index % 3 === 0 ? "md:col-span-2" : ""}
                >
                  <img
                    src={item.media.publicUrl!}
                    alt={item.media.altText ?? item.title ?? project.title}
                    className="max-h-[850px] w-full object-cover"
                  />
                  {(item.caption || item.title) && (
                    <figcaption className="mt-3 font-mono text-[9px] uppercase tracking-widest muted">
                      {item.caption ?? item.title}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <p className="muted"><LangText en="This project's gallery is in progress." es="La galería de este proyecto está en preparación." /></p>
          )}
        </CaseBlock>
        <CaseBlock
          index="07"
          label={<LangText en="Results" es="Resultados" />}
          title={
            <LangText
              en="What the work produced"
              es="Lo que produjo el trabajo"
            />
          }
        >
          <Narrative value={project.result} large />
        </CaseBlock>
        {(demo || github) && (
          <section className="border-t border-[var(--border-color)]">
            <div className="flex flex-col justify-between gap-10 py-20 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[var(--accent)]"><LangText en="Explore the project" es="Explora el proyecto" /></p>
                <h2 className="mt-6 text-5xl font-bold uppercase tracking-tight md:text-7xl"><LangText en="See it live." es="Míralo en vivo." /></h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {demo && (
                  <a
                    href={demo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[var(--accent)] bg-[color:var(--accent)]/10 px-7 py-5 font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
                  >
                    <LangText en="Live demo ↗" es="Demo en vivo ↗" />
                  </a>
                )}
                {github && (
                  <a
                    href={github.url}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[var(--border-color)] px-7 py-5 font-mono text-[10px] uppercase tracking-widest"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </SiteShell>
  );
}
function CaseBlock({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--border-color)]">
      <div className="grid gap-10 py-20 lg:grid-cols-[280px_1fr]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[var(--accent)]">
            {index} · {label}
          </p>
          <h2 className="mt-5 text-2xl font-bold uppercase">{title}</h2>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
function Narrative({
  value,
  large = false,
}: {
  value: string | null;
  large?: boolean;
}) {
  return (
    <p
      className={`max-w-5xl whitespace-pre-line leading-relaxed muted ${large ? "text-2xl md:text-4xl" : "text-lg md:text-2xl"}`}
    >
      {value || "Información en preparación."}
    </p>
  );
}
function DynamicSection({
  section,
}: {
  section: { id: string; type: string; title: string | null; content: unknown };
}) {
  const content = section.content as Record<string, unknown>;
  const text =
    typeof content === "string"
      ? content
      : String(content?.text ?? content?.quote ?? "");
  const items = Array.isArray(content?.items)
    ? (content.items as { label?: string; value?: string }[])
    : [];
  return (
    <article className="border-t border-[var(--border-color)] py-14">
      <p className="eyebrow">{section.type}</p>
      {section.title && (
        <h2 className="mt-5 text-4xl font-semibold uppercase md:text-6xl">
          {section.title}
        </h2>
      )}
      {items.length ? (
        <div className="mt-10 grid gap-px bg-[var(--border-color)] md:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="bg-[var(--bg-primary)] p-8">
              <strong className="text-4xl">{item.value}</strong>
              <p className="mt-3 muted">{item.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-8 max-w-4xl whitespace-pre-line text-xl leading-relaxed muted">
          {text}
        </p>
      )}
    </article>
  );
}

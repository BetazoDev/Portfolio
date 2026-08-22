"use client";

import { SiteShell } from "@/components/site-shell";
import { PublicProject, getProjectField } from "@/lib/api";
import { useAppContext } from "@/legacy/context/AppContext";

const StackItem = ({ label, value }: { label: string; value: string | null | undefined }) =>
  value ? (
    <div className="border-b border-[var(--border-color)] py-4">
      <dt className="font-mono text-[9px] uppercase tracking-widest text-[var(--accent)]">
        {label}
      </dt>
      <dd className="mt-2 text-base text-white/90">{value}</dd>
    </div>
  ) : null;

export function ProjectDetailsView({ project }: { project: PublicProject }) {
  return (
    <SiteShell>
      <ProjectContent project={project} />
    </SiteShell>
  );
}

function ProjectContent({ project }: { project: PublicProject }) {
  const { language } = useAppContext();
  const isEs = language === "es";

  const title = getProjectField(project, "title", language) || project.title;
  const subtitle =
    getProjectField(project, "subtitle", language) ||
    getProjectField(project, "shortSummary", language) ||
    project.subtitle ||
    project.shortSummary;
  const summary = getProjectField(project, "shortSummary", language) || project.shortSummary;
  const problem = getProjectField(project, "problem", language) || project.problem;
  const solution = getProjectField(project, "solution", language) || project.solution;
  const architecture =
    getProjectField(project, "architectureSummary", language) || project.architectureSummary;
  const result = getProjectField(project, "result", language) || project.result;

  const role = getProjectField(project, "role", language) || project.role;
  const industry = getProjectField(project, "industry", language) || project.industry;
  const clientName = getProjectField(project, "clientName", language) || project.clientName;
  const projectType = getProjectField(project, "projectType", language) || project.projectType;

  const frontendStack = getProjectField(project, "frontendStack", language) || project.frontendStack;
  const backendStack = getProjectField(project, "backendStack", language) || project.backendStack;
  const databaseStack = getProjectField(project, "databaseStack", language) || project.databaseStack;
  const automationStack = getProjectField(project, "automationStack", language) || project.automationStack;
  const aiStack = getProjectField(project, "aiStack", language) || project.aiStack;
  const deploymentStack = getProjectField(project, "deploymentStack", language) || project.deploymentStack;

  const cover =
    project.media.find((item) => item.type === "cover")?.media ??
    project.media.find((item) => item.type === "thumbnail")?.media;
  const gallery = project.media.filter(
    (item) =>
      ["gallery", "screenshot", "workflow", "architecture"].includes(item.type) &&
      item.media.publicUrl,
  );
  const demo = project.links.find((link) => link.type === "live");
  const github = project.links.find((link) => link.type === "github");

  return (
    <main>
      {/* Hero Header */}
      <section className="pb-16 pt-20">
        <p className="eyebrow">
          {isEs ? "Caso de Estudio" : "Case Study"} · {projectType || (isEs ? "Producto Digital" : "Digital Product")}
        </p>
        <h1 className="my-8 max-w-[1400px] text-5xl font-bold leading-[.95] tracking-tight md:text-7xl lg:text-9xl">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-4xl text-lg leading-relaxed muted md:text-2xl lg:text-3xl">
            {subtitle}
          </p>
        )}

        {/* Project Identity Grid */}
        <div className="mt-14 grid gap-px border-y border-[var(--border-color)] bg-[var(--border-color)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            [isEs ? "Rol" : "Role", role],
            [isEs ? "Año" : "Year", project.year],
            [isEs ? "Industria" : "Industry", industry],
            [isEs ? "Cliente" : "Client", clientName],
          ].map(([label, value]) => (
            <div key={String(label)} className="bg-[var(--bg-primary)] py-6 pr-8">
              <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--accent)]">
                {label}
              </p>
              <p className="mt-2 font-medium">{value ?? (isEs ? "Independiente" : "Independent")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cover Image */}
      {cover?.publicUrl && (
        <section className="mx-auto max-w-[1800px] px-3 md:px-6">
          <img
            src={cover.publicUrl}
            alt={cover.altText ?? title}
            className="min-h-[48vh] max-h-[86vh] w-full rounded border border-[var(--border-color)] object-cover"
          />
        </section>
      )}

      {/* 01 · Overview */}
      {summary && (
        <CaseBlock
          index="01"
          label={isEs ? "Resumen" : "Overview"}
          title={isEs ? "Contexto del Proyecto" : "Project Context"}
        >
          <p className="max-w-4xl text-lg leading-relaxed muted md:text-2xl">
            {summary}
          </p>
        </CaseBlock>
      )}

      {/* 02 · Technologies & Categories */}
      {(project.technologies.length > 0 || project.categories.length > 0) && (
        <CaseBlock
          index="02"
          label={isEs ? "Taxonomías" : "Taxonomies"}
          title={isEs ? "Stack y Clasificación" : "Stack & Classification"}
        >
          <div className="space-y-6">
            {project.technologies.length > 0 && (
              <div>
                <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">
                  {isEs ? "Tecnologías" : "Technologies"}
                </p>
                <div className="flex max-w-5xl flex-wrap gap-2.5">
                  {project.technologies.map(({ technology }) => (
                    <span
                      key={technology.id}
                      className="border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[#c084fc]"
                    >
                      {technology.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.categories.length > 0 && (
              <div>
                <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">
                  {isEs ? "Categorías" : "Categories"}
                </p>
                <div className="flex max-w-5xl flex-wrap gap-2.5">
                  {project.categories.map(({ category }) => (
                    <span
                      key={category.id}
                      className="border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-white/60"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CaseBlock>
      )}

      {/* 03 · Problem Statement */}
      {problem && (
        <CaseBlock
          index="03"
          label={isEs ? "Problema" : "Problem"}
          title={isEs ? "El Desafío Principal" : "The Core Challenge"}
        >
          <Narrative value={problem} />
        </CaseBlock>
      )}

      {/* 04 · Solution */}
      {solution && (
        <CaseBlock
          index="04"
          label={isEs ? "Solución" : "Solution"}
          title={isEs ? "Diseño de Solución" : "System Design Response"}
        >
          <Narrative value={solution} />
        </CaseBlock>
      )}

      {/* 05 · Architecture & Tech Stack */}
      {(architecture ||
        frontendStack ||
        backendStack ||
        databaseStack ||
        automationStack ||
        aiStack ||
        deploymentStack) && (
        <CaseBlock
          index="05"
          label={isEs ? "Arquitectura" : "Architecture"}
          title={isEs ? "Ingeniería e Infraestructura" : "Engineering & Infrastructure"}
        >
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
            <Narrative value={architecture} />
            <dl className="grid gap-1">
              <StackItem label="Frontend Stack" value={frontendStack} />
              <StackItem label="Backend Stack" value={backendStack} />
              <StackItem label="Database Stack" value={databaseStack} />
              <StackItem label="Automation Stack" value={automationStack} />
              <StackItem label="AI Stack" value={aiStack} />
              <StackItem label="Deployment Stack" value={deploymentStack} />
            </dl>
          </div>
        </CaseBlock>
      )}

      {/* Dynamic Custom Sections */}
      {project.sections.length > 0 && (
        <section className="py-8">
          {project.sections.map((section) => (
            <DynamicSection key={section.id} section={section} />
          ))}
        </section>
      )}

      {/* 06 · Visual Gallery */}
      {gallery.length > 0 && (
        <CaseBlock
          index="06"
          label={isEs ? "Galería" : "Gallery"}
          title={isEs ? "Interfaz Visual y Flujos" : "Visual Interface & Workflows"}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {gallery.map((item, index) => (
              <figure
                key={item.id}
                className={index % 3 === 0 ? "md:col-span-2" : ""}
              >
                <img
                  src={item.media.publicUrl!}
                  alt={item.media.altText ?? item.title ?? title}
                  className="max-h-[850px] w-full rounded border border-[var(--border-color)] object-cover"
                />
                {(item.caption || item.title) && (
                  <figcaption className="mt-3 font-mono text-[9px] uppercase tracking-widest muted">
                    {item.caption ?? item.title}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </CaseBlock>
      )}

      {/* 07 · Results & Metrics */}
      {result && (
        <CaseBlock
          index="07"
          label={isEs ? "Resultados" : "Results"}
          title={isEs ? "Impacto Medible en el Negocio" : "Measured Business Impact"}
        >
          <Narrative value={result} large />
        </CaseBlock>
      )}

      {/* 08 · Live Links */}
      {(demo || github) && (
        <section className="border-t border-[var(--border-color)]">
          <div className="flex flex-col justify-between gap-10 py-20 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[var(--accent)]">
                {isEs ? "Explorar Proyecto" : "Explore Project"}
              </p>
              <h2 className="mt-6 text-4xl font-bold uppercase tracking-tight md:text-6xl lg:text-7xl">
                {isEs ? "Ver Trabajo en Vivo." : "Experience Live Work."}
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {demo && (
                <a
                  href={demo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[var(--accent)] bg-[color:var(--accent)]/10 px-8 py-5 font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-white"
                >
                  {isEs ? "Demo en Vivo ↗" : "Live Demo ↗"}
                </a>
              )}
              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[var(--border-color)] px-8 py-5 font-mono text-[10px] uppercase tracking-widest transition hover:border-white hover:text-white"
                >
                  {isEs ? "Código GitHub ↗" : "GitHub Source ↗"}
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function CaseBlock({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[var(--border-color)]">
      <div className="grid gap-10 py-16 lg:grid-cols-[280px_1fr] lg:py-20">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[var(--accent)]">
            {index} · {label}
          </p>
          <h2 className="mt-4 text-2xl font-bold uppercase tracking-tight">
            {title}
          </h2>
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
  value: string | null | undefined;
  large?: boolean;
}) {
  if (!value) return null;
  return (
    <p
      className={`max-w-5xl whitespace-pre-line leading-relaxed muted ${
        large
          ? "text-xl md:text-3xl lg:text-4xl font-light"
          : "text-base md:text-xl lg:text-2xl"
      }`}
    >
      {value}
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
        <h2 className="mt-4 text-3xl font-semibold uppercase md:text-5xl">
          {section.title}
        </h2>
      )}
      {items.length ? (
        <div className="mt-10 grid gap-px bg-[var(--border-color)] sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="bg-[var(--bg-primary)] p-8">
              <strong className="text-3xl font-bold text-[#c084fc] md:text-4xl">
                {item.value}
              </strong>
              <p className="mt-3 text-xs uppercase tracking-wider muted">{item.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-8 max-w-4xl whitespace-pre-line text-lg leading-relaxed muted">
          {text}
        </p>
      )}
    </article>
  );
}

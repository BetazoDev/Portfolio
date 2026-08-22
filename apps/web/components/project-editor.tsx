"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Save, AlertCircle, CheckCircle2 } from "lucide-react";
import { adminFetch, clearToken } from "@/lib/admin-api";
import { ProjectRelations } from "@/components/project-relations";

type Taxonomy = { id: string; name: string };
type Project = Record<string, unknown> & {
  id: string;
  title: string;
  titleEn?: string;
  slug: string;
  subtitle?: string;
  shortSummary?: string;
  clientName?: string;
  industry?: string;
  projectType?: string;
  role?: string;
  year?: number | string;
  status: string;
  featured: boolean;
  showOnHomepage: boolean;
  sortOrder: number;
  problem?: string;
  solution?: string;
  result?: string;
  architectureSummary?: string;
  frontendStack?: string;
  backendStack?: string;
  databaseStack?: string;
  automationStack?: string;
  aiStack?: string;
  deploymentStack?: string;
  seoTitle?: string;
  seoDescription?: string;
  technologies?: { technology: Taxonomy }[];
  categories?: { category: Taxonomy }[];
};

export function ProjectEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [tech, setTech] = useState<Taxonomy[]>([]);
  const [cats, setCats] = useState<Taxonomy[]>([]);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [activeTab, setActiveTab] = useState("Identidad");
  const [editorLang, setEditorLang] = useState<"es" | "en">("es");

  useEffect(() => {
    Promise.all([
      adminFetch("/api/admin/technologies").then((r) => (r.ok ? r.json() : [])),
      adminFetch("/api/admin/categories").then((r) => (r.ok ? r.json() : [])),
      id
        ? adminFetch(`/api/admin/projects/${id}`).then((r) =>
            r.ok ? r.json() : null,
          )
        : Promise.resolve({
            id: "",
            title: "",
            slug: "",
            status: "draft",
            featured: false,
            showOnHomepage: true,
            sortOrder: 0,
            technologies: [],
            categories: [],
          }),
    ]).then(([a, b, c]) => {
      setTech(a);
      setCats(b);
      setProject(c);
    });
  }, [id]);

  if (!project)
    return (
      <div className="grid min-h-[400px] place-items-center font-mono text-xs uppercase tracking-widest text-white/50">
        Cargando editor del proyecto…
      </div>
    );

  const update = (key: string, value: unknown) =>
    setProject((current) => ({ ...current!, [key]: value }));

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setStatusMessage({ text: "Guardando cambios…", type: "info" });

    if (!id) {
      const response = await adminFetch("/api/admin/projects", {
        method: "POST",
        body: JSON.stringify({
          title: project!.title,
          slug: project!.slug,
          shortSummary: project!.shortSummary || "",
          status: "draft",
        }),
      });

      if (response.status === 401) {
        clearToken();
        setStatusMessage({
          text: "Tu sesión ha expirado. Por favor inicia sesión nuevamente.",
          type: "error",
        });
        setTimeout(() => router.replace("/admin/login"), 1500);
        return;
      }

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        setStatusMessage({
          text: err.error ?? "No se pudo crear el proyecto. Revisa el slug.",
          type: "error",
        });
        setSaving(false);
        return;
      }

      const created = await response.json();
      router.replace(`/admin/projects/${created.id}`);
      return;
    }

    const payload = {
      ...project,
      year: project!.year ? Number(project!.year) : null,
      sortOrder: Number(project!.sortOrder ?? 0),
      technologyIds:
        project!.technologies?.map(({ technology }) => technology.id) ?? [],
      categoryIds:
        project!.categories?.map(({ category }) => category.id) ?? [],
    };

    try {
      const response = await adminFetch(`/api/admin/projects/${id}/details`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        clearToken();
        setStatusMessage({
          text: "Tu sesión ha expirado. Redirigiendo al login…",
          type: "error",
        });
        setTimeout(() => router.replace("/admin/login"), 1500);
        return;
      }

      if (response.ok) {
        const updated = await response.json();
        setProject(updated);
        setStatusMessage({
          text: "¡Cambios guardados con éxito!",
          type: "success",
        });
      } else {
        const err = await response.json().catch(() => ({}));
        setStatusMessage({
          text: err.error ?? "Error al guardar cambios.",
          type: "error",
        });
      }
    } catch {
      setStatusMessage({
        text: "Error de conexión al servidor.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  const toggleTax = (kind: "technologies" | "categories", item: Taxonomy) => {
    const current = (project![kind] ?? []) as {
      technology?: Taxonomy;
      category?: Taxonomy;
    }[];
    const key = kind === "technologies" ? "technology" : "category";
    update(
      kind,
      current.some((entry) => entry[key]?.id === item.id)
        ? current.filter((entry) => entry[key]?.id !== item.id)
        : [...current, { [key]: item }],
    );
  };

  const tabs = [
    { id: "Identidad", label: "1. Identidad del proyecto" },
    { id: "CasoEstudio", label: "2. Caso de estudio & Stack" },
    { id: "Medios", label: "3. Galería & Secciones" },
    { id: "Publicacion", label: "4. Publicación & SEO" },
  ];

  return (
    <form onSubmit={save} className="max-w-7xl">
      {/* Top Action Bar */}
      <header className="flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-8">
        <div className="flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#a855f7]">
            {id ? "Editar proyecto" : "Nuevo proyecto"}
          </p>
          <input
            value={
              editorLang === "es"
                ? project.title
                : (project.titleEn ?? "")
            }
            onChange={(e) => {
              update(
                editorLang === "es" ? "title" : "titleEn",
                e.target.value,
              );
              if (!id && editorLang === "es")
                update(
                  "slug",
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, ""),
                );
            }}
            required
            placeholder="Título del proyecto…"
            className="mt-3 w-full bg-transparent text-3xl font-semibold outline-none md:text-5xl"
          />
        </div>

        <div className="flex items-center gap-3">
          {id && project.status === "published" && (
            <a
              href={`/projects/${project.slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-white/15 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-white/70 hover:border-white/30 hover:text-white"
            >
              Ver sitio <ExternalLink size={14} />
            </a>
          )}
          <button
            disabled={saving}
            type="submit"
            className="flex items-center gap-2 border border-[#a855f7] bg-[#a855f7]/15 px-6 py-3.5 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition hover:bg-[#9333ea] hover:text-white disabled:opacity-50"
          >
            <Save size={14} /> {saving ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </header>

      {/* Language Selector & Feedback Toast */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest">
          <button
            type="button"
            onClick={() => setEditorLang("es")}
            className={`border-b-2 pb-1 transition-colors ${
              editorLang === "es"
                ? "border-[#a855f7] font-bold text-[#c084fc]"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            Español (Predeterminado)
          </button>
          <button
            type="button"
            onClick={() => setEditorLang("en")}
            className={`border-b-2 pb-1 transition-colors ${
              editorLang === "en"
                ? "border-[#a855f7] font-bold text-[#c084fc]"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            Inglés (Traducción)
          </button>
        </div>

        {statusMessage && (
          <div
            className={`flex items-center gap-2 rounded border px-4 py-2 font-mono text-[11px] ${
              statusMessage.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : statusMessage.type === "error"
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-[#a855f7]/30 bg-[#a855f7]/10 text-[#c084fc]"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 size={14} />
            ) : (
              <AlertCircle size={14} />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}
      </div>

      {/* Simplified Navigation Tabs */}
      <nav className="my-8 flex gap-2 overflow-x-auto border-b border-white/10 pb-2">
        {tabs.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`shrink-0 border-b-2 px-5 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors ${
              activeTab === t.id
                ? "border-[#a855f7] font-bold text-[#c084fc]"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* TAB 1: IDENTIDAD DEL PROYECTO */}
      {activeTab === "Identidad" && (
        <section className="grid gap-6 rounded-lg border border-white/10 bg-[#121214] p-6 sm:p-8 md:grid-cols-2">
          <Field
            label="Slug (URL del proyecto)"
            value={project.slug}
            change={(v) => update("slug", v)}
          />
          <Field
            label="Año de desarrollo"
            value={project.year}
            type="number"
            change={(v) => update("year", v)}
          />
          <Field
            label="Cliente / Plataforma"
            value={project.clientName}
            change={(v) => update("clientName", v)}
          />
          <Field
            label="Industria / Sector"
            value={project.industry}
            change={(v) => update("industry", v)}
          />
          <Field
            label="Tipo de proyecto (ej. Aplicación Web, E-Commerce)"
            value={project.projectType}
            change={(v) => update("projectType", v)}
          />
          <Field
            label="Tu rol en el proyecto"
            value={project.role}
            change={(v) => update("role", v)}
          />

          <div className="md:col-span-2">
            <Text
              label={
                editorLang === "es"
                  ? "Subtítulo de portada"
                  : "Subtitle (EN)"
              }
              value={
                editorLang === "es" ? project.subtitle : project.subtitleEn
              }
              rows={2}
              change={(v) =>
                update(editorLang === "es" ? "subtitle" : "subtitleEn", v)
              }
            />
          </div>

          <div className="md:col-span-2">
            <Text
              label={
                editorLang === "es"
                  ? "Resumen corto (Aparece en tarjetas y listado)"
                  : "Short summary (EN)"
              }
              value={
                editorLang === "es"
                  ? project.shortSummary
                  : project.shortSummaryEn
              }
              rows={3}
              change={(v) =>
                update(
                  editorLang === "es" ? "shortSummary" : "shortSummaryEn",
                  v,
                )
              }
            />
          </div>
        </section>
      )}

      {/* TAB 2: CASO DE ESTUDIO & STACK */}
      {activeTab === "CasoEstudio" && (
        <section className="grid gap-6 rounded-lg border border-white/10 bg-[#121214] p-6 sm:p-8">
          <Text
            label={
              editorLang === "es"
                ? "El Problema (Lo que necesitaba cambiar)"
                : "Problem (EN)"
            }
            value={editorLang === "es" ? project.problem : project.problemEn}
            rows={4}
            change={(v) =>
              update(editorLang === "es" ? "problem" : "problemEn", v)
            }
          />
          <Text
            label={
              editorLang === "es"
                ? "La Solución (Cómo responde el sistema)"
                : "Solution (EN)"
            }
            value={editorLang === "es" ? project.solution : project.solutionEn}
            rows={4}
            change={(v) =>
              update(editorLang === "es" ? "solution" : "solutionEn", v)
            }
          />
          <Text
            label={
              editorLang === "es"
                ? "Resumen de Arquitectura"
                : "Architecture summary (EN)"
            }
            value={
              editorLang === "es"
                ? project.architectureSummary
                : project.architectureSummaryEn
            }
            rows={4}
            change={(v) =>
              update(
                editorLang === "es"
                  ? "architectureSummary"
                  : "architectureSummaryEn",
                v,
              )
            }
          />

          <div className="mt-4 border-t border-white/10 pt-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-[#a855f7]">
              Desglose del Stack Tecnológico
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Field
                label="Frontend"
                value={project.frontendStack}
                change={(v) => update("frontendStack", v)}
              />
              <Field
                label="Backend"
                value={project.backendStack}
                change={(v) => update("backendStack", v)}
              />
              <Field
                label="Base de datos"
                value={project.databaseStack}
                change={(v) => update("databaseStack", v)}
              />
              <Field
                label="Automatización / CI-CD"
                value={project.automationStack}
                change={(v) => update("automationStack", v)}
              />
              <Field
                label="Inteligencia Artificial / Modelos"
                value={project.aiStack}
                change={(v) => update("aiStack", v)}
              />
              <Field
                label="Infraestructura & Despliegue"
                value={project.deploymentStack}
                change={(v) => update("deploymentStack", v)}
              />
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-6">
            <Text
              label={
                editorLang === "es"
                  ? "Resultados e Impacto"
                  : "Results (EN)"
              }
              value={editorLang === "es" ? project.result : project.resultEn}
              rows={4}
              change={(v) =>
                update(editorLang === "es" ? "result" : "resultEn", v)
              }
            />
          </div>
        </section>
      )}

      {/* TAB 3: GALERÍA & SECCIONES */}
      {activeTab === "Medios" && (
        <section className="rounded-lg border border-white/10 bg-[#121214] p-6 sm:p-8">
          {id ? (
            <ProjectRelations projectId={id} />
          ) : (
            <p className="text-center font-mono text-xs uppercase tracking-widest text-white/50 py-12">
              Guarda primero los datos básicos del proyecto para adjuntar imágenes, enlaces y secciones.
            </p>
          )}
        </section>
      )}

      {/* TAB 4: PUBLICACIÓN & SEO */}
      {activeTab === "Publicacion" && (
        <section className="grid gap-8 rounded-lg border border-white/10 bg-[#121214] p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <label className="block text-xs font-medium text-white/60">
              Estado de publicación
              <select
                value={project.status}
                onChange={(e) => update("status", e.target.value)}
                className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none focus:border-[#a855f7]"
              >
                <option value="draft" className="bg-[#151517]">
                  Borrador (Draft)
                </option>
                <option value="published" className="bg-[#151517]">
                  Publicado
                </option>
                <option value="archived" className="bg-[#151517]">
                  Archivado
                </option>
              </select>
            </label>

            <label className="flex cursor-pointer items-center gap-3 border-b border-white/15 py-4 text-xs text-white/70 hover:text-white">
              <input
                type="checkbox"
                checked={project.showOnHomepage}
                onChange={(e) => update("showOnHomepage", e.target.checked)}
                className="size-4 accent-[#a855f7]"
              />
              Visible en la Portada / Portfolio
            </label>

            <label className="flex cursor-pointer items-center gap-3 border-b border-white/15 py-4 text-xs text-white/70 hover:text-white">
              <input
                type="checkbox"
                checked={project.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="size-4 accent-[#a855f7]"
              />
              Proyecto Destacado
            </label>
          </div>

          <div className="border-t border-white/10 pt-6 grid gap-8 md:grid-cols-2">
            <Tax
              label="Tecnologías asociadas"
              items={tech}
              selected={(project.technologies ?? []).map(
                (x) => x.technology.id,
              )}
              toggle={(item) => toggleTax("technologies", item)}
            />
            <Tax
              label="Categorías"
              items={cats}
              selected={(project.categories ?? []).map((x) => x.category.id)}
              toggle={(item) => toggleTax("categories", item)}
            />
          </div>

          <div className="border-t border-white/10 pt-6 grid gap-6 md:grid-cols-2">
            <Field
              label={
                editorLang === "es"
                  ? "Título SEO (Meta Title)"
                  : "SEO Title (EN)"
              }
              value={
                editorLang === "es" ? project.seoTitle : project.seoTitleEn
              }
              change={(v) =>
                update(editorLang === "es" ? "seoTitle" : "seoTitleEn", v)
              }
            />
            <Text
              label={
                editorLang === "es"
                  ? "Descripción SEO (Meta Description)"
                  : "SEO Description (EN)"
              }
              value={
                editorLang === "es"
                  ? project.seoDescription
                  : project.seoDescriptionEn
              }
              rows={2}
              change={(v) =>
                update(
                  editorLang === "es" ? "seoDescription" : "seoDescriptionEn",
                  v,
                )
              }
            />
          </div>
        </section>
      )}
    </form>
  );
}

function Field({
  label,
  value,
  type = "text",
  change,
}: {
  label: string;
  value: unknown;
  type?: string;
  change: (v: string) => void;
}) {
  return (
    <label className="block text-xs font-medium text-white/60">
      {label}
      <input
        type={type}
        value={value === null || value === undefined ? "" : String(value)}
        onChange={(e) => change(e.target.value)}
        className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none focus:border-[#a855f7]"
      />
    </label>
  );
}

function Text({
  label,
  value,
  rows,
  change,
}: {
  label: string;
  value: unknown;
  rows: number;
  change: (v: string) => void;
}) {
  return (
    <label className="block text-xs font-medium text-white/60">
      {label}
      <textarea
        rows={rows}
        value={value === null || value === undefined ? "" : String(value)}
        onChange={(e) => change(e.target.value)}
        className="mt-2 w-full resize-y border border-white/15 bg-transparent p-3 text-xs text-white outline-none focus:border-[#a855f7]"
      />
    </label>
  );
}

function Tax({
  label,
  items,
  selected,
  toggle,
}: {
  label: string;
  items: Taxonomy[];
  selected: string[];
  toggle: (item: Taxonomy) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-4 font-mono text-xs uppercase tracking-widest text-[#a855f7]">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => toggle(item)}
            className={`border px-3.5 py-2 font-mono text-[9px] uppercase tracking-widest transition ${
              selected.includes(item.id)
                ? "border-[#a855f7] bg-[#a855f7]/20 font-bold text-[#c084fc]"
                : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

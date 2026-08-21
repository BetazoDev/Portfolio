"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Save } from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import { ProjectRelations } from "@/components/project-relations";
type Taxonomy = { id: string; name: string };
type Project = Record<string, unknown> & {
  id: string;
  title: string;
  titleEn?: string;
  slug: string;
  status: string;
  featured: boolean;
  showOnHomepage: boolean;
  sortOrder: number;
  technologies?: { technology: Taxonomy }[];
  categories?: { category: Taxonomy }[];
};
const groups = {
  Content: [
    ["subtitle", "Subtitle", 2],
    ["shortSummary", "Summary", 4],
    ["problem", "Problem", 5],
    ["solution", "Solution", 5],
    ["result", "Results", 5],
  ],
  Architecture: [
    ["architectureSummary", "Architecture Summary", 6],
    ["frontendStack", "Frontend", 2],
    ["backendStack", "Backend", 2],
    ["databaseStack", "Database", 2],
    ["automationStack", "Automation", 2],
    ["aiStack", "Artificial Intelligence", 2],
    ["deploymentStack", "Deployment", 2],
  ],
  SEO: [
    ["seoTitle", "SEO title", 2],
    ["seoDescription", "SEO description", 4],
  ],
} as const;
export function ProjectEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [tech, setTech] = useState<Taxonomy[]>([]);
  const [cats, setCats] = useState<Taxonomy[]>([]);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("Basic Info");
  const [editorLang, setEditorLang] = useState<"es" | "en">("es");
  useEffect(() => {
    Promise.all([
      adminFetch("/api/admin/technologies").then((r) => r.json()),
      adminFetch("/api/admin/categories").then((r) => r.json()),
      id
        ? adminFetch(`/api/admin/projects/${id}`).then((r) => r.json())
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
  if (!project) return <p>Loading editor…</p>;
  const update = (key: string, value: unknown) =>
    setProject((current) => ({ ...current!, [key]: value }));
  async function save(event: FormEvent) {
    event.preventDefault();
    setMessage("Saving…");
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
      if (!response.ok) return setMessage("Failed to create. Check the slug.");
      const created = await response.json();
      router.replace(`/admin/projects/${created.id}`);
      return;
    }
    const payload = {
      ...project,
      year: project!.year ? Number(project!.year) : null,
      sortOrder: Number(project!.sortOrder),
      technologyIds:
        project!.technologies?.map(({ technology }) => technology.id) ?? [],
      categoryIds:
        project!.categories?.map(({ category }) => category.id) ?? [],
    };
    const response = await adminFetch(`/api/admin/projects/${id}/details`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    setMessage(response.ok ? "Changes saved." : "Failed to save.");
  }
  const toggleTax = (kind: "technologies" | "categories", item: Taxonomy) => {
    const current = project![kind] as {
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
    "Basic Info",
    "Content",
    "Architecture",
    "Taxonomies",
    "Media & Case Study",
    "SEO",
    "Publishing",
  ];
  return (
    <form onSubmit={save}>
      <header className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#8b78ff]">
            {id ? "Edit project" : "New project"}
          </p>
          <input
            value={editorLang === 'es' ? project.title : (project.titleEn ?? '')}
            onChange={(e) => {
              update(editorLang === 'es' ? "title" : "titleEn", e.target.value);
              if (!id && editorLang === 'es')
                update(
                  "slug",
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, ""),
                );
            }}
            required
            placeholder="Project title"
            className="mt-4 w-full bg-transparent text-4xl font-semibold outline-none md:text-6xl"
          />
        </div>
        <div className="flex gap-2">
          {id && project.status === "published" && (
            <a
              href={`/projects/${project.slug}`}
              target="_blank"
              className="flex items-center gap-2 border border-white/15 px-5 py-3 font-mono text-[10px] uppercase tracking-widest"
            >
              Preview <ExternalLink size={14} />
            </a>
          )}
          <button className="flex items-center gap-2 border border-[#8b78ff] bg-[#8b78ff]/10 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-[#b6a8ff] transition hover:bg-[#7057ff] hover:text-white">
            <Save size={14} /> Save changes
          </button>
        </div>
      </header>
      
      <div className="mt-8 flex gap-4 font-mono text-[10px] uppercase tracking-widest">
        <button type="button" onClick={() => setEditorLang("es")} className={`border-b-2 pb-1 transition-colors ${editorLang === 'es' ? 'border-[#8b78ff] text-[#b6a8ff]' : 'border-transparent text-white/40 hover:text-white'}`}>ES (Default)</button>
        <button type="button" onClick={() => setEditorLang("en")} className={`border-b-2 pb-1 transition-colors ${editorLang === 'en' ? 'border-[#8b78ff] text-[#b6a8ff]' : 'border-transparent text-white/40 hover:text-white'}`}>EN (Translation)</button>
      </div>

      <nav className="my-10 flex gap-2 overflow-x-auto border-b border-white/10 pb-3">
        {tabs.map((value) => (
          <button
            type="button"
            key={value}
            onClick={() => setTab(value)}
            className={`shrink-0 border-b px-4 py-3 font-mono text-[9px] uppercase tracking-widest ${tab === value ? "border-[#8b78ff] text-[#b6a8ff]" : "border-transparent text-white/40 hover:text-white"}`}
          >
            {value}
          </button>
        ))}
      </nav>
      <section className="border-y border-white/10 py-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div><p className="font-mono text-[9px] uppercase tracking-[.25em] text-[#8b78ff]">{tab}</p><h2 className="mt-3 text-2xl font-semibold">{tab === 'Basic Info' ? 'Project Identity' : tab === 'Content' ? 'Narrative & Results' : tab === 'Architecture' ? 'Technical System' : tab === 'Taxonomies' ? 'Classification' : tab === 'Media & Case Study' ? 'Visual Content & Links' : tab === 'SEO' ? 'Search Engine Optimization' : 'Publishing Status'}</h2></div>
          <p className="max-w-md text-xs leading-5 text-white/40">Fill in the information that will populate the public presentation of the project.</p>
        </div>
        {tab === "Basic Info" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Slug"
              value={project.slug}
              change={(v) => update("slug", v)}
            />
            <Field
              label="Year"
              value={project.year}
              type="number"
              change={(v) => update("year", v)}
            />
            <Field
              label="Client"
              value={project.clientName}
              change={(v) => update("clientName", v)}
            />
            <Field
              label="Industry"
              value={project.industry}
              change={(v) => update("industry", v)}
            />
            <Field
              label="Project Type"
              value={project.projectType}
              change={(v) => update("projectType", v)}
            />
            <Field
              label="Role"
              value={project.role}
              change={(v) => update("role", v)}
            />
          </div>
        )}
        {(tab === "Content" || tab === "Architecture" || tab === "SEO") && (
          <div className="grid gap-6 md:grid-cols-2">
            {groups[tab].map(([key, label, rows]) => {
              const fieldKey = editorLang === 'es' || !['subtitle', 'shortSummary', 'problem', 'solution', 'result', 'architectureSummary', 'seoTitle', 'seoDescription'].includes(key as string) ? key : `${key}En`;
              return (
                <Text
                  key={fieldKey}
                  label={label}
                  rows={rows as number}
                  value={project[fieldKey as string]}
                  change={(v) => update(fieldKey as string, v)}
                />
              );
            })}
          </div>
        )}
        {tab === "Taxonomies" && (
          <div className="grid gap-8 xl:grid-cols-2">
            <Tax
              label="Technologies"
              items={tech}
              selected={(project.technologies ?? []).map(
                (x) => x.technology.id,
              )}
              toggle={(item) => toggleTax("technologies", item)}
            />
            <Tax
              label="Categories"
              items={cats}
              selected={(project.categories ?? []).map((x) => x.category.id)}
              toggle={(item) => toggleTax("categories", item)}
            />
          </div>
        )}
        {tab === "Media & Case Study" &&
          (id ? (
            <ProjectRelations projectId={id} />
          ) : (
            <p className="text-white/50">
              Save the project first to associate images, links, and sections.
            </p>
          ))}
        {tab === "Publishing" && (
          <div className="grid gap-8 md:grid-cols-2">
            <label className="text-xs text-white/50">
              Status
              <select
                value={project.status}
                onChange={(e) => update("status", e.target.value)}
                className="mt-3 w-full border-x-0 border-b border-t-0 border-white/15 bg-transparent px-0 py-4 text-white outline-none focus:border-[#8b78ff]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label className="flex items-center gap-3 border-b border-white/15 py-5 text-sm text-white/60">
              <input
                type="checkbox"
                checked={project.featured}
                onChange={(e) => update("featured", e.target.checked)}
              />{" "}
              Featured project
            </label>
            <label className="flex items-center gap-3 border-b border-white/15 py-5 text-sm text-white/60">
              <input
                type="checkbox"
                checked={project.showOnHomepage}
                onChange={(e) => update("showOnHomepage", e.target.checked)}
              />{" "}
              Visible in portfolio
            </label>
            <Field
              label="Sort Order"
              value={project.sortOrder}
              type="number"
              change={(v) => update("sortOrder", v)}
            />
          </div>
        )}
      </section>
      {message && (
        <p className="mt-5 font-mono text-xs text-[#8b78ff]">{message}</p>
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
    <label className="text-xs text-white/50">
      {label}
      <input
        type={type}
        value={String(value ?? "")}
        onChange={(e) => change(e.target.value)}
        className="mt-2 w-full border-x-0 border-b border-t-0 border-white/15 bg-transparent px-0 py-4 text-white outline-none focus:border-[#8b78ff]"
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
    <label
      className={`text-xs text-white/50 ${rows >= 5 ? "md:col-span-2" : ""}`}
    >
      {label}
      <textarea
        rows={rows}
        value={String(value ?? "")}
        onChange={(e) => change(e.target.value)}
        className="mt-2 w-full resize-y border-x-0 border-b border-t-0 border-white/15 bg-transparent px-0 py-4 text-white outline-none focus:border-[#8b78ff]"
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
      <legend className="mb-5 text-lg font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => toggle(item)}
            className={`border px-4 py-3 font-mono text-[9px] uppercase tracking-widest ${selected.includes(item.id) ? "border-[#8b78ff] bg-[#8b78ff]/10 text-[#b6a8ff]" : "border-white/10 text-white/50"}`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

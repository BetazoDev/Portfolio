"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { adminFetch, clearToken } from "@/lib/admin-api";
import { ProjectRelations } from "@/components/project-relations";

type Taxonomy = { id: string; name: string };
type LanguageItem = { code: string; name: string; isDefault: boolean; isEnabled: boolean };

type Project = Record<string, unknown> & {
  id: string;
  title: string;
  titleEn?: string;
  slug: string;
  status: string;
  featured: boolean;
  showOnHomepage: boolean;
  sortOrder: number;
  year?: number | string | null;
  translations?: Record<string, Record<string, string>>;
  technologies?: { technology: Taxonomy }[];
  categories?: { category: Taxonomy }[];
};

export function ProjectEditor({ id }: { id?: string }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [tech, setTech] = useState<Taxonomy[]>([]);
  const [cats, setCats] = useState<Taxonomy[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("Basic Info");
  const [editorLang, setEditorLang] = useState<string>("en");

  useEffect(() => {
    Promise.all([
      adminFetch("/api/languages").then((r) => r.json()),
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
            translations: {},
          }),
    ]).then(([langData, a, b, c]) => {
      const enabledLangs = (langData.languages ?? []).filter((l: LanguageItem) => l.isEnabled);
      setLanguages(
        enabledLangs.length
          ? enabledLangs
          : [
              { code: "en", name: "English", isDefault: true, isEnabled: true },
              { code: "es", name: "Spanish", isDefault: false, isEnabled: true },
            ],
      );
      if (langData.defaultLanguage) setEditorLang(langData.defaultLanguage);
      setTech(a);
      setCats(b);
      setProject(c);
    });
  }, [id]);

  if (!project) return <p className="font-mono text-xs text-white/50">Loading editor…</p>;

  const update = (key: string, value: unknown) =>
    setProject((current) => ({ ...current!, [key]: value }));

  const getTranslatedValue = (field: string): string => {
    const langTrans = project.translations?.[editorLang];
    if (langTrans && langTrans[field] !== undefined && langTrans[field] !== null) {
      return langTrans[field];
    }

    if (editorLang === "en") {
      const enVal = project[`${field}En` as keyof Project] ?? project[field as keyof Project];
      return enVal !== undefined && enVal !== null ? String(enVal) : "";
    }

    const val = project[field as keyof Project];
    return val !== undefined && val !== null ? String(val) : "";
  };

  const updateTranslation = (field: string, value: string) => {
    setProject((current) => {
      if (!current) return current;
      const currTrans = current.translations ?? {};
      const langTrans = currTrans[editorLang] ?? {};
      const updatedTrans = {
        ...currTrans,
        [editorLang]: { ...langTrans, [field]: value },
      };

      const isEnglish = editorLang === "en";
      const isSpanish = editorLang === "es";

      const extraFlat: Record<string, unknown> = {};
      if (isSpanish) {
        extraFlat[field] = value;
      } else if (isEnglish) {
        extraFlat[`${field}En`] = value;
        if (field === "title" && !current.title) extraFlat.title = value;
        if (field === "shortSummary" && !current.shortSummary) extraFlat.shortSummary = value;
      }

      return {
        ...current,
        ...extraFlat,
        translations: updatedTrans,
      };
    });
  };

  const cleanValue = (val: unknown) => {
    if (val === "" || val === undefined) return null;
    return val;
  };

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage({ type: "info", text: "Saving changes…" });

    if (!id) {
      const response = await adminFetch("/api/admin/projects", {
        method: "POST",
        body: JSON.stringify({
          title: getTranslatedValue("title") || project!.title || "Untitled Project",
          slug: project!.slug,
          shortSummary: getTranslatedValue("shortSummary") || project!.shortSummary || "",
          status: "draft",
        }),
      });
      setSaving(false);
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        return setMessage({
          type: "error",
          text: err.error || "Failed to create project. Check slug uniqueness.",
        });
      }
      const created = await response.json();
      router.replace(`/admin/projects/${created.id}`);
      return;
    }

    const payload = {
      title: cleanValue(project!.title) || getTranslatedValue("title") || "Untitled Project",
      slug: project!.slug,
      subtitle: cleanValue(project!.subtitle),
      shortSummary: cleanValue(project!.shortSummary),
      clientName: cleanValue(project!.clientName),
      industry: cleanValue(project!.industry),
      projectType: cleanValue(project!.projectType),
      role: cleanValue(project!.role),
      year: project!.year ? Number(project!.year) : null,
      status: project!.status || "draft",
      featured: Boolean(project!.featured),
      showOnHomepage: Boolean(project!.showOnHomepage),
      sortOrder: Number(project!.sortOrder || 0),
      problem: cleanValue(project!.problem),
      solution: cleanValue(project!.solution),
      result: cleanValue(project!.result),
      architectureSummary: cleanValue(project!.architectureSummary),
      frontendStack: cleanValue(project!.frontendStack),
      backendStack: cleanValue(project!.backendStack),
      databaseStack: cleanValue(project!.databaseStack),
      automationStack: cleanValue(project!.automationStack),
      aiStack: cleanValue(project!.aiStack),
      deploymentStack: cleanValue(project!.deploymentStack),
      seoTitle: cleanValue(project!.seoTitle),
      seoDescription: cleanValue(project!.seoDescription),
      titleEn: cleanValue(project!.titleEn),
      subtitleEn: cleanValue(project!.subtitleEn),
      shortSummaryEn: cleanValue(project!.shortSummaryEn),
      problemEn: cleanValue(project!.problemEn),
      solutionEn: cleanValue(project!.solutionEn),
      resultEn: cleanValue(project!.resultEn),
      architectureSummaryEn: cleanValue(project!.architectureSummaryEn),
      seoTitleEn: cleanValue(project!.seoTitleEn),
      seoDescriptionEn: cleanValue(project!.seoDescriptionEn),
      translations: project!.translations ?? {},
      technologyIds: (project!.technologies ?? []).map(({ technology }) => technology.id),
      categoryIds: (project!.categories ?? []).map(({ category }) => category.id),
    };

    try {
      const response = await adminFetch(`/api/admin/projects/${id}/details`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updated = await response.json();
        setProject(updated);
        setMessage({ type: "success", text: "Changes saved successfully!" });
      } else if (response.status === 401) {
        setMessage({ type: "error", text: "Session expired. Please sign in again." });
        clearToken();
        router.replace("/admin/login");
      } else {
        const err = await response.json().catch(() => ({}));
        const detailText = err.issues
          ? err.issues.map((i: { message: string }) => i.message).join(", ")
          : err.error;
        setMessage({
          type: "error",
          text: detailText || "Failed to save changes. Please check required fields.",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Connection error while saving." });
    } finally {
      setSaving(false);
    }
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
          <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#a855f7]">
            {id ? "Edit project" : "New project"}
          </p>
          <input
            value={getTranslatedValue("title")}
            onChange={(e) => {
              updateTranslation("title", e.target.value);
              if (!id && editorLang === "en")
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
        <div className="flex items-center gap-3">
          {id && project.status === "published" && (
            <a
              href={`/projects/${project.slug}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 border border-white/15 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-white/70 hover:border-[#a855f7] hover:text-white"
            >
              Preview <ExternalLink size={14} />
            </a>
          )}
          <button
            disabled={saving}
            className="flex items-center gap-2 border border-[#a855f7] bg-[#a855f7]/10 px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition hover:bg-[#9333ea] hover:text-white disabled:opacity-50"
          >
            <Save size={14} /> {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </header>

      {/* Global Status Notification */}
      {message && (
        <div
          className={`mt-6 flex items-center gap-3 border p-4 font-mono text-xs ${
            message.type === "success"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : message.type === "error"
              ? "border-red-500/40 bg-red-500/10 text-red-300"
              : "border-[#a855f7]/40 bg-[#a855f7]/10 text-[#c084fc]"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={16} className="shrink-0" />
          ) : (
            <AlertCircle size={16} className="shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Dynamic Language Translation Tabs */}
      <div className="mt-8 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setEditorLang(lang.code)}
            className={`border-b-2 pb-1 transition-colors ${
              editorLang === lang.code
                ? "border-[#a855f7] text-[#c084fc]"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            {lang.name} ({lang.code.toUpperCase()}) {lang.isDefault ? "DEFAULT" : ""}
          </button>
        ))}
      </div>

      <nav className="my-8 flex gap-2 overflow-x-auto border-b border-white/10 pb-3">
        {tabs.map((value) => (
          <button
            type="button"
            key={value}
            onClick={() => setTab(value)}
            className={`shrink-0 border-b px-4 py-3 font-mono text-[9px] uppercase tracking-widest ${
              tab === value
                ? "border-[#a855f7] text-[#c084fc]"
                : "border-transparent text-white/40 hover:text-white"
            }`}
          >
            {value}
          </button>
        ))}
      </nav>

      <section className="border-y border-white/10 py-8">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.25em] text-[#a855f7]">
              {tab} · Editing in{" "}
              {languages.find((l) => l.code === editorLang)?.name ?? editorLang.toUpperCase()}
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              {tab === "Basic Info"
                ? "Project Identity"
                : tab === "Content"
                ? "Narrative & Results"
                : tab === "Architecture"
                ? "Technical System"
                : tab === "Taxonomies"
                ? "Classification"
                : tab === "Media & Case Study"
                ? "Visual Content & Links"
                : tab === "SEO"
                ? "Search Engine Optimization"
                : "Publishing Status"}
            </h2>
          </div>
          <p className="max-w-md text-xs leading-5 text-white/40">
            Fill in the information for this language tab ({editorLang.toUpperCase()}).
          </p>
        </div>

        {tab === "Basic Info" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Slug (Shared)"
              value={project.slug}
              change={(v) => update("slug", v)}
            />
            <Field
              label="Year (Shared)"
              value={project.year}
              type="number"
              change={(v) => update("year", v)}
            />
            <Field
              label={`Client (${editorLang.toUpperCase()})`}
              value={getTranslatedValue("clientName")}
              change={(v) => updateTranslation("clientName", v)}
            />
            <Field
              label={`Industry (${editorLang.toUpperCase()})`}
              value={getTranslatedValue("industry")}
              change={(v) => updateTranslation("industry", v)}
            />
            <Field
              label={`Project Type (${editorLang.toUpperCase()})`}
              value={getTranslatedValue("projectType")}
              change={(v) => updateTranslation("projectType", v)}
            />
            <Field
              label={`Role (${editorLang.toUpperCase()})`}
              value={getTranslatedValue("role")}
              change={(v) => updateTranslation("role", v)}
            />
          </div>
        )}

        {tab === "Content" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Text
              label={`Subtitle (${editorLang.toUpperCase()})`}
              rows={2}
              value={getTranslatedValue("subtitle")}
              change={(v) => updateTranslation("subtitle", v)}
            />
            <Text
              label={`Summary (${editorLang.toUpperCase()})`}
              rows={4}
              value={getTranslatedValue("shortSummary")}
              change={(v) => updateTranslation("shortSummary", v)}
            />
            <Text
              label={`Problem (${editorLang.toUpperCase()})`}
              rows={5}
              value={getTranslatedValue("problem")}
              change={(v) => updateTranslation("problem", v)}
            />
            <Text
              label={`Solution (${editorLang.toUpperCase()})`}
              rows={5}
              value={getTranslatedValue("solution")}
              change={(v) => updateTranslation("solution", v)}
            />
            <Text
              label={`Results (${editorLang.toUpperCase()})`}
              rows={5}
              value={getTranslatedValue("result")}
              change={(v) => updateTranslation("result", v)}
            />
          </div>
        )}

        {tab === "Architecture" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Text
              label={`Architecture Summary (${editorLang.toUpperCase()})`}
              rows={6}
              value={getTranslatedValue("architectureSummary")}
              change={(v) => updateTranslation("architectureSummary", v)}
            />
            <Field
              label={`Frontend (${editorLang.toUpperCase()})`}
              value={getTranslatedValue("frontendStack")}
              change={(v) => updateTranslation("frontendStack", v)}
            />
            <Field
              label={`Backend (${editorLang.toUpperCase()})`}
              value={getTranslatedValue("backendStack")}
              change={(v) => updateTranslation("backendStack", v)}
            />
            <Field
              label={`Database (${editorLang.toUpperCase()})`}
              value={getTranslatedValue("databaseStack")}
              change={(v) => updateTranslation("databaseStack", v)}
            />
            <Field
              label={`Automation (${editorLang.toUpperCase()})`}
              value={getTranslatedValue("automationStack")}
              change={(v) => updateTranslation("automationStack", v)}
            />
            <Field
              label={`Artificial Intelligence (${editorLang.toUpperCase()})`}
              value={getTranslatedValue("aiStack")}
              change={(v) => updateTranslation("aiStack", v)}
            />
            <Field
              label={`Deployment (${editorLang.toUpperCase()})`}
              value={getTranslatedValue("deploymentStack")}
              change={(v) => updateTranslation("deploymentStack", v)}
            />
          </div>
        )}

        {tab === "SEO" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Text
              label={`SEO Title (${editorLang.toUpperCase()})`}
              rows={2}
              value={getTranslatedValue("seoTitle")}
              change={(v) => updateTranslation("seoTitle", v)}
            />
            <Text
              label={`SEO Description (${editorLang.toUpperCase()})`}
              rows={4}
              value={getTranslatedValue("seoDescription")}
              change={(v) => updateTranslation("seoDescription", v)}
            />
          </div>
        )}

        {tab === "Taxonomies" && (
          <div className="grid gap-8 xl:grid-cols-2">
            <Tax
              label="Technologies"
              items={tech}
              selected={(project.technologies ?? []).map((x) => x.technology.id)}
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
                className="mt-3 w-full border-x-0 border-b border-t-0 border-white/15 bg-transparent px-0 py-4 text-white outline-none focus:border-[#a855f7]"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label className="flex items-center gap-3 border-b border-white/15 py-5 text-sm text-white/60">
              <input
                type="checkbox"
                checked={Boolean(project.featured)}
                onChange={(e) => update("featured", e.target.checked)}
              />{" "}
              Featured project
            </label>
            <label className="flex items-center gap-3 border-b border-white/15 py-5 text-sm text-white/60">
              <input
                type="checkbox"
                checked={Boolean(project.showOnHomepage)}
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
        className="mt-2 w-full border-x-0 border-b border-t-0 border-white/15 bg-transparent px-0 py-4 text-white outline-none focus:border-[#a855f7]"
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
    <label className={`text-xs text-white/50 ${rows >= 5 ? "md:col-span-2" : ""}`}>
      {label}
      <textarea
        rows={rows}
        value={String(value ?? "")}
        onChange={(e) => change(e.target.value)}
        className="mt-2 w-full resize-y border-x-0 border-b border-t-0 border-white/15 bg-transparent px-0 py-4 text-white outline-none focus:border-[#a855f7]"
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
            className={`border px-4 py-3 font-mono text-[9px] uppercase tracking-widest ${
              selected.includes(item.id)
                ? "border-[#a855f7] bg-[#a855f7]/10 text-[#c084fc]"
                : "border-white/10 text-white/50"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

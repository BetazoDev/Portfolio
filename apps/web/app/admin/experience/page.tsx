"use client";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  GripVertical,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import { ConfirmModal } from "@/components/confirm-modal";

type LanguageItem = {
  code: string;
  name: string;
  isDefault: boolean;
  isEnabled: boolean;
};

type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  timeframe: string;
  description?: string | null;
  sortOrder: number;
  translations?: Record<string, { role?: string; timeframe?: string; description?: string }>;
};

export default function ExperiencePage() {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [languages, setLanguages] = useState<LanguageItem[]>([]);
  const [activeLang, setActiveLang] = useState("en");

  const [editingItem, setEditingItem] = useState<Partial<ExperienceItem> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ExperienceItem | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const loadLanguages = async () => {
    const res = await adminFetch("/api/languages");
    if (res.ok) {
      const data = await res.json();
      const enabled = data.languages.filter((l: LanguageItem) => l.isEnabled);
      setLanguages(enabled);
      if (data.defaultLanguage) setActiveLang(data.defaultLanguage);
    }
  };

  const loadExperience = async () => {
    const res = await adminFetch("/api/admin/experience");
    if (res.ok) {
      setItems(await res.json());
    }
  };

  useEffect(() => {
    void loadLanguages();
    void loadExperience();
  }, []);

  async function persistOrder(newItems: ExperienceItem[]) {
    setItems(newItems);
    const payload = newItems.map((item, index) => ({
      id: item.id,
      sortOrder: index,
    }));
    await adminFetch("/api/admin/experience/reorder", {
      method: "PUT",
      body: JSON.stringify({ items: payload }),
    });
  }

  function moveItem(fromIndex: number, toIndex: number) {
    if (toIndex < 0 || toIndex >= items.length) return;
    const reordered = [...items];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    void persistOrder(reordered);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!editingItem?.company) return;

    setMessage("Saving work experience…");

    const payload = {
      company: editingItem.company,
      role: editingItem.role || "",
      timeframe: editingItem.timeframe || "",
      description: editingItem.description || "",
      translations: editingItem.translations ?? {},
      sortOrder: editingItem.sortOrder ?? items.length,
    };

    if (editingItem.id) {
      const res = await adminFetch(`/api/admin/experience/${editingItem.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage("Experience record updated.");
        setEditingItem(null);
        void loadExperience();
      } else {
        setMessage("Failed to update record.");
      }
    } else {
      const res = await adminFetch("/api/admin/experience", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setMessage("New experience record created.");
        setEditingItem(null);
        void loadExperience();
      } else {
        setMessage("Failed to create record.");
      }
    }
    setTimeout(() => setMessage(""), 3000);
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    await adminFetch(`/api/admin/experience/${deleteTarget.id}`, {
      method: "DELETE",
    });
    setDeleteTarget(null);
    void loadExperience();
  }

  const updateTranslationField = (code: string, field: "role" | "timeframe" | "description", val: string) => {
    if (!editingItem) return;
    const currTrans = editingItem.translations ?? {};
    const langTrans = currTrans[code] ?? {};
    const updated = {
      ...currTrans,
      [code]: { ...langTrans, [field]: val },
    };

    const isPrimary = code === activeLang || code === "en";
    setEditingItem({
      ...editingItem,
      ...(isPrimary ? { [field]: val } : {}),
      translations: updated,
    });
  };

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#a855f7]">
            Career History
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-6xl">Work Experience</h1>
          <p className="mt-2 text-xs text-white/45 sm:text-sm">
            Manage your professional timeline and role descriptions across all active languages.
          </p>
        </div>
        <button
          onClick={() =>
            setEditingItem({
              company: "",
              role: "",
              timeframe: "",
              description: "",
              translations: {},
            })
          }
          className="flex items-center gap-2 border border-[#a855f7] bg-[#a855f7]/10 px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] hover:bg-[#9333ea] hover:text-white"
        >
          <Plus size={14} /> Add Experience +
        </button>
      </header>

      {/* Editor Modal / Form Container */}
      {editingItem && (
        <form
          onSubmit={handleSave}
          className="my-8 rounded-xl border border-white/15 bg-[#121214] p-6 shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-lg font-bold text-white">
              {editingItem.id ? `Edit ${editingItem.company}` : "New Work Experience"}
            </h2>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="font-mono text-xs text-white/40 hover:text-white"
            >
              Cancel [Esc]
            </button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <label className="block text-xs font-medium text-white/60">
              Company Name
              <input
                type="text"
                required
                value={editingItem.company ?? ""}
                onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                placeholder="e.g. Reputation Defense Network"
                className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-[#a855f7]"
              />
            </label>

            {/* Language Translation Tabs */}
            <div className="md:col-span-2">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[#a855f7]">
                Content Language Translation
              </p>
              <div className="flex gap-2 border-b border-white/10 pb-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setActiveLang(lang.code)}
                    className={`border-b-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider ${
                      activeLang === lang.code
                        ? "border-[#a855f7] text-[#c084fc]"
                        : "border-transparent text-white/40 hover:text-white"
                    }`}
                  >
                    {lang.name} ({lang.code}) {lang.isDefault ? "DEFAULT" : ""}
                  </button>
                ))}
              </div>

              {languages.map((lang) => {
                if (lang.code !== activeLang) return null;
                const langTrans = editingItem.translations?.[lang.code] ?? {};
                const currentRole = langTrans.role ?? (lang.code === "en" ? editingItem.role : "");
                const currentTimeframe = langTrans.timeframe ?? (lang.code === "en" ? editingItem.timeframe : "");
                const currentDesc = langTrans.description ?? (lang.code === "en" ? editingItem.description : "");

                return (
                  <div key={lang.code} className="mt-4 grid gap-5 md:grid-cols-2">
                    <label className="block text-xs font-medium text-white/60">
                      Role / Position ({lang.code.toUpperCase()})
                      <input
                        type="text"
                        value={currentRole ?? ""}
                        onChange={(e) => updateTranslationField(lang.code, "role", e.target.value)}
                        placeholder="e.g. Web Designer & WordPress Developer"
                        className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-[#a855f7]"
                      />
                    </label>

                    <label className="block text-xs font-medium text-white/60">
                      Timeframe ({lang.code.toUpperCase()})
                      <input
                        type="text"
                        value={currentTimeframe ?? ""}
                        onChange={(e) => updateTranslationField(lang.code, "timeframe", e.target.value)}
                        placeholder="e.g. 2025 - Present"
                        className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-[#a855f7]"
                      />
                    </label>

                    <label className="block text-xs font-medium text-white/60 md:col-span-2">
                      Role & Impact Description ({lang.code.toUpperCase()})
                      <textarea
                        rows={3}
                        value={currentDesc ?? ""}
                        onChange={(e) => updateTranslationField(lang.code, "description", e.target.value)}
                        placeholder="Key responsibilities and achievements…"
                        className="mt-2 w-full resize-none border border-white/15 bg-transparent p-3 text-xs text-white outline-none focus:border-[#a855f7]"
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-widest">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="border border-white/15 px-5 py-3 text-white/70 hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 border border-[#a855f7] bg-[#a855f7]/15 px-6 py-3 text-[#c084fc] hover:bg-[#9333ea] hover:text-white"
            >
              <Save size={14} /> Save Experience
            </button>
          </div>
        </form>
      )}

      {message && (
        <p className="my-4 font-mono text-xs text-[#a855f7]">{message}</p>
      )}

      {/* Work Experience List */}
      <div className="mt-8 grid gap-4">
        {items.map((item, index) => (
          <article
            key={item.id}
            draggable
            onDragStart={(e) => {
              setDraggedIndex(index);
              e.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedIndex !== null && draggedIndex !== index) {
                moveItem(draggedIndex, index);
              }
              setDraggedIndex(null);
            }}
            onDragEnd={() => setDraggedIndex(null)}
            className={`group relative flex flex-col justify-between gap-4 border border-white/10 bg-[#101011] p-5 transition sm:flex-row sm:items-center ${
              draggedIndex === index ? "opacity-40 border-[#a855f7]" : "hover:border-[#a855f7]"
            }`}
          >
            <div className="flex items-center gap-4">
              <span
                title="Drag to reorder"
                className="cursor-grab text-white/30 hover:text-[#c084fc] active:cursor-grabbing"
              >
                <GripVertical size={16} />
              </span>
              <span className="font-mono text-xs font-bold text-[#c084fc]">
                0{index + 1}
              </span>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-bold text-white">{item.company}</h3>
                  <span className="font-mono text-[10px] text-[#a855f7]">
                    {item.timeframe}
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/60">{item.role}</p>
                {item.description && (
                  <p className="mt-2 line-clamp-2 max-w-3xl text-xs text-white/40">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveItem(index, index - 1)}
                  title="Move Up"
                  className="rounded p-1 text-white/30 hover:bg-white/10 hover:text-white disabled:opacity-20"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => moveItem(index, index + 1)}
                  title="Move Down"
                  className="rounded p-1 text-white/30 hover:bg-white/10 hover:text-white disabled:opacity-20"
                >
                  <ArrowDown size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setEditingItem(item)}
                className="border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase text-white/70 hover:border-[#a855f7] hover:text-white"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(item)}
                className="text-white/30 hover:text-red-400"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {!items.length && (
        <p className="border border-white/10 p-12 text-center font-mono text-[10px] uppercase tracking-widest text-white/35">
          No work experience records found.
        </p>
      )}

      {/* Dark Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Work Experience"
        description={`Are you sure you want to permanently delete "${deleteTarget?.company}"? This action cannot be undone.`}
        confirmLabel="Delete Record"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

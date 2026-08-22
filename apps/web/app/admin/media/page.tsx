"use client";
import { FormEvent, useEffect, useState, useCallback } from "react";
import {
  ImagePlus,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Save,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";

type Media = {
  id: string;
  originalFilename: string;
  publicUrl: string | null;
  altText: string | null;
  caption: string | null;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
};

function splitFilename(fullName: string) {
  const lastDot = fullName.lastIndexOf(".");
  if (lastDot <= 0) return { base: fullName, ext: "" };
  return {
    base: fullName.substring(0, lastDot),
    ext: fullName.substring(lastDot), // e.g. ".png"
  };
}

export default function MediaPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Edit fields for selected item
  const [editBaseName, setEditBaseName] = useState("");
  const [editExt, setEditExt] = useState("");
  const [editAltText, setEditAltText] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    const response = await adminFetch("/api/admin/media");
    if (response.ok) {
      const data = await response.json();
      setItems(data);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const selectedIndex = items.findIndex((i) => i.id === selectedId);
  const selectedMedia = selectedIndex !== -1 ? items[selectedIndex] : null;

  useEffect(() => {
    if (selectedMedia) {
      const { base, ext } = splitFilename(selectedMedia.originalFilename);
      setEditBaseName(base);
      setEditExt(ext);
      setEditAltText(selectedMedia.altText ?? "");
      setEditCaption(selectedMedia.caption ?? "");
      setSaveMessage("");
      setCopied(false);
    }
  }, [selectedId]); // Sync only when selecting a different media item

  const handlePrev = useCallback(() => {
    if (items.length === 0 || selectedIndex === -1) return;
    const prevIndex = (selectedIndex - 1 + items.length) % items.length;
    setSelectedId(items[prevIndex].id);
  }, [items, selectedIndex]);

  const handleNext = useCallback(() => {
    if (items.length === 0 || selectedIndex === -1) return;
    const nextIndex = (selectedIndex + 1) % items.length;
    setSelectedId(items[nextIndex].id);
  }, [items, selectedIndex]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMedia) return;
      if (e.key === "Escape") setSelectedId(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMedia, handlePrev, handleNext]);

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setUploading(true);
    setMessage("Subiendo archivo…");
    try {
      const response = await adminFetch("/api/admin/media/upload", {
        method: "POST",
        body: form,
      });
      if (!response.ok) {
        const detail = await response.json().catch(() => ({}));
        setMessage(
          detail.error ?? "No se pudo subir. Revisa Supabase Storage.",
        );
        return;
      }
      formElement.reset();
      setMessage("Archivo subido con éxito.");
      await load();
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("¿Eliminar permanentemente este archivo de la galería?")) return;
    await adminFetch(`/api/admin/media/${id}`, { method: "DELETE" });
    if (selectedId === id) setSelectedId(null);
    await load();
  }

  async function saveMetadata(e: FormEvent) {
    e.preventDefault();
    if (!selectedMedia) return;
    setSaving(true);
    setSaveMessage("Guardando…");
    const fullFilename = editExt ? `${editBaseName.trim()}${editExt}` : editBaseName.trim();
    try {
      const response = await adminFetch(`/api/admin/media/${selectedMedia.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          originalFilename: fullFilename,
          altText: editAltText || null,
          caption: editCaption || null,
        }),
      });
      if (response.ok) {
        const updated = (await response.json()) as Media;
        setItems((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item))
        );
        setSaveMessage("Cambios guardados con éxito.");
      } else {
        const err = await response.json().catch(() => ({}));
        setSaveMessage(err.error ?? "Error al guardar cambios");
      }
    } catch {
      setSaveMessage("Error de conexión al guardar");
    } finally {
      setSaving(false);
    }
  }

  function copyUrl() {
    if (!selectedMedia?.publicUrl) return;
    navigator.clipboard.writeText(selectedMedia.publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <header className="border-b border-white/10 pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#a855f7]">
          Galería de Medios
        </p>
        <h1 className="mt-5 text-5xl font-bold md:text-7xl">Medios</h1>
        <p className="mt-4 max-w-xl text-sm text-white/45">
          Haz clic en cualquier imagen para verla en grande y editar sus metadatos al estilo WordPress.
        </p>
      </header>

      {/* Upload Box */}
      <form
        onSubmit={upload}
        className="my-10 grid gap-5 border-y border-dashed border-white/20 py-8 md:grid-cols-[1fr_auto] md:items-center"
      >
        <label className="flex min-h-28 cursor-pointer items-center gap-5 border border-white/10 px-6 transition hover:border-[#a855f7]">
          <ImagePlus className="text-[#a855f7]" />
          <span>
            <strong className="block text-sm">Seleccionar imagen</strong>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-white/35">
              JPEG, PNG, WEBP, o AVIF · máx 10 MB
            </span>
          </span>
          <input
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            required
            className="ml-auto max-w-64 text-xs"
          />
        </label>
        <button
          disabled={uploading}
          className="border border-[#a855f7] bg-[#a855f7]/10 px-7 py-5 font-mono text-[10px] uppercase tracking-[.2em] text-[#c084fc] transition hover:bg-[#9333ea] hover:text-white disabled:opacity-40"
        >
          {uploading ? "Subiendo…" : "Subir archivo ↗"}
        </button>
        {message && (
          <p className="font-mono text-[10px] text-[#a855f7] md:col-span-2">
            {message}
          </p>
        )}
      </form>

      {/* Grid of Media Items */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <article
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className="group relative cursor-pointer overflow-hidden border border-white/10 bg-[#101011] p-3 transition hover:border-[#a855f7]"
          >
            <div className="aspect-video relative overflow-hidden bg-white/[.02]">
              {item.publicUrl ? (
                <img
                  src={item.publicUrl}
                  alt={item.altText ?? item.originalFilename}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="grid h-full place-items-center text-xs text-white/30">
                  Sin URL
                </div>
              )}
              <div className="absolute inset-0 bg-[#a855f7]/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2 px-1">
              <p className="truncate font-mono text-xs font-medium text-white/80 group-hover:text-[#c084fc]">
                {item.originalFilename}
              </p>
              <span className="shrink-0 font-mono text-[9px] uppercase text-white/35">
                0{index + 1}
              </span>
            </div>
          </article>
        ))}
      </div>

      {!items.length && (
        <p className="border border-white/10 p-12 text-center font-mono text-[10px] uppercase tracking-widest text-white/35">
          La librería de medios está vacía.
        </p>
      )}

      {/* WordPress Style Modal / Lightbox */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm md:p-6">
          <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-white/15 bg-[#121214] shadow-2xl lg:h-[85vh] lg:flex-row">
            
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              title="Anterior (flecha izquierda)"
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2.5 text-white/70 transition hover:bg-[#a855f7] hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              title="Siguiente (flecha derecha)"
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-2.5 text-white/70 transition hover:bg-[#a855f7] hover:text-white lg:right-[420px]"
            >
              <ChevronRight size={20} />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setSelectedId(null)}
              title="Cerrar (Esc)"
              className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/60 p-2 text-white/70 transition hover:bg-red-500 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Left Panel: Preview Area */}
            <div className="flex flex-1 flex-col items-center justify-center overflow-auto bg-[#0a0a0b] p-6 lg:p-10">
              <div className="flex h-full w-full items-center justify-center">
                {selectedMedia.publicUrl ? (
                  <img
                    src={selectedMedia.publicUrl}
                    alt={selectedMedia.altText ?? selectedMedia.originalFilename}
                    className="max-h-[60vh] max-w-full object-contain rounded shadow-lg"
                  />
                ) : (
                  <div className="text-sm text-white/40">Sin vista previa disponible</div>
                )}
              </div>
              <div className="mt-4 flex items-center gap-4 font-mono text-[10px] uppercase text-white/40">
                <span>{selectedMedia.originalFilename}</span>
                <span>•</span>
                <span>{selectedMedia.mimeType}</span>
                <span>•</span>
                <span>{Math.round(selectedMedia.sizeBytes / 1024)} KB</span>
              </div>
            </div>

            {/* Right Panel: WordPress Attachment Details Sidebar */}
            <aside className="w-full overflow-y-auto border-t border-white/10 bg-[#161619] p-6 lg:w-[400px] lg:border-l lg:border-t-0">
              <div className="border-b border-white/10 pb-4">
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7]">
                  Detalles del elemento
                </p>
                <h2 className="mt-1 truncate text-lg font-bold text-white">
                  {selectedMedia.originalFilename}
                </h2>
                <p className="mt-1 font-mono text-[9px] text-white/35">
                  Subido el: {new Date(selectedMedia.createdAt).toLocaleDateString("es-ES")}
                </p>
              </div>

              {/* Editable Metadata Form */}
              <form onSubmit={saveMetadata} className="mt-6 grid gap-5">
                <label className="block text-xs font-medium text-white/60">
                  Nombre del archivo
                  <div className="mt-2 flex items-center border-b border-white/20 focus-within:border-[#a855f7]">
                    <input
                      type="text"
                      value={editBaseName}
                      onChange={(e) => setEditBaseName(e.target.value)}
                      placeholder="Nombre del archivo…"
                      className="w-full bg-transparent py-2 text-sm text-white outline-none"
                    />
                    {editExt && (
                      <span title="La extensión se mantiene fija automáticamente" className="ml-2 shrink-0 rounded bg-[#a855f7]/15 px-2 py-0.5 font-mono text-[10px] font-bold text-[#c084fc]">
                        {editExt}
                      </span>
                    )}
                  </div>
                </label>

                <label className="block text-xs font-medium text-white/60">
                  Texto alternativo (Alt Text)
                  <textarea
                    rows={2}
                    value={editAltText}
                    onChange={(e) => setEditAltText(e.target.value)}
                    placeholder="Descripción para SEO y accesibilidad…"
                    className="mt-2 w-full resize-none border border-white/15 bg-transparent p-3 text-xs text-white outline-none focus:border-[#a855f7]"
                  />
                </label>

                <label className="block text-xs font-medium text-white/60">
                  Leyenda / Descripción
                  <textarea
                    rows={3}
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    placeholder="Información relevante de la imagen…"
                    className="mt-2 w-full resize-none border border-white/15 bg-transparent p-3 text-xs text-white outline-none focus:border-[#a855f7]"
                  />
                </label>

                {/* Save Button */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    disabled={saving}
                    type="submit"
                    className="flex flex-1 items-center justify-center gap-2 border border-[#a855f7] bg-[#a855f7]/15 py-3 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition hover:bg-[#9333ea] hover:text-white disabled:opacity-50"
                  >
                    <Save size={14} /> {saving ? "Guardando…" : "Guardar cambios"}
                  </button>
                </div>
                {saveMessage && (
                  <p className="font-mono text-[10px] text-[#a855f7]">{saveMessage}</p>
                )}
              </form>

              {/* Copy URL section */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                  Enlace directo (URL)
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={selectedMedia.publicUrl ?? ""}
                    className="w-full border border-white/15 bg-black/40 p-2.5 font-mono text-[10px] text-white/60 outline-none"
                  />
                  <button
                    type="button"
                    onClick={copyUrl}
                    title="Copiar URL"
                    className="flex shrink-0 items-center gap-1.5 border border-white/20 bg-white/5 p-2.5 font-mono text-[10px] uppercase text-white transition hover:border-[#a855f7] hover:bg-[#a855f7]/20"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              {/* Quick Links & Delete Action */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                {selectedMedia.publicUrl && (
                  <a
                    href={selectedMedia.publicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] hover:underline"
                  >
                    Ver original <ExternalLink size={12} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => remove(selectedMedia.id)}
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-red-400 hover:text-red-300"
                >
                  <Trash2 size={13} /> Eliminar
                </button>
              </div>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}

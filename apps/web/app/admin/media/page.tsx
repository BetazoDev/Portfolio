"use client";
import { FormEvent, useEffect, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
type Media = {
  id: string;
  originalFilename: string;
  publicUrl: string | null;
  altText: string | null;
  mimeType: string;
  sizeBytes: number;
};
export default function MediaPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const load = async () => {
    const response = await adminFetch("/api/admin/media");
    if (response.ok) setItems(await response.json());
  };
  useEffect(() => {
    void load();
  }, []);
  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setUploading(true);
    setMessage("Uploading…");
    try {
      const response = await adminFetch("/api/admin/media/upload", {
        method: "POST",
        body: form,
      });
      if (!response.ok) {
        const detail = await response.json().catch(() => ({}));
        setMessage(
          detail.error ?? "Failed to upload. Check Supabase Storage.",
        );
        return;
      }
      formElement.reset();
      setMessage("File uploaded successfully.");
      await load();
    } finally {
      setUploading(false);
    }
  }
  async function remove(id: string) {
    if (!confirm("Delete the file from storage and the library?"))
      return;
    await adminFetch(`/api/admin/media/${id}`, { method: "DELETE" });
    await load();
  }
  return (
    <>
      <header className="border-b border-white/10 pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#8b78ff]">
          Media library
        </p>
        <h1 className="mt-5 text-5xl font-bold md:text-7xl">Media</h1>
        <p className="mt-4 max-w-xl text-sm text-white/45">
          Images for covers, thumbnails, architecture, and galleries.
        </p>
      </header>
      <form
        onSubmit={upload}
        className="my-10 grid gap-5 border-y border-dashed border-white/20 py-8 md:grid-cols-[1fr_auto] md:items-center"
      >
        <label className="flex min-h-28 cursor-pointer items-center gap-5 border border-white/10 px-6 transition hover:border-[#8b78ff]">
          <ImagePlus className="text-[#8b78ff]" />
          <span>
            <strong className="block text-sm">Select image</strong>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-white/35">
              JPEG, PNG, WEBP, or AVIF · max 10 MB
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
          className="border border-[#8b78ff] bg-[#8b78ff]/10 px-7 py-5 font-mono text-[10px] uppercase tracking-[.2em] text-[#b6a8ff] transition hover:bg-[#7057ff] hover:text-white disabled:opacity-40"
        >
          {uploading ? "Uploading…" : "Upload image ↗"}
        </button>
        {message && (
          <p className="font-mono text-[10px] text-[#8b78ff] md:col-span-2">
            {message}
          </p>
        )}
      </form>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="border border-white/10 bg-[#101011] p-5">
            <div className="aspect-video bg-white/[.03]">
              {item.publicUrl && (
                <img
                  src={item.publicUrl}
                  alt={item.altText ?? ""}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm">{item.originalFilename}</p>
                <p className="mt-2 font-mono text-[9px] uppercase text-white/35">
                  {item.mimeType} · {Math.round(item.sizeBytes / 1024)} KB
                </p>
              </div>
              <button
                onClick={() => remove(item.id)}
                aria-label={`Delete ${item.originalFilename}`}
                className="text-white/35 transition hover:text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </article>
        ))}
      </div>
      {!items.length && (
        <p className="border border-white/10 p-12 text-center font-mono text-[10px] uppercase tracking-widest text-white/35">
          The library is empty.
        </p>
      )}
    </>
  );
}

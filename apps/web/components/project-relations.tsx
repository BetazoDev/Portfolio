"use client";

import { useEffect, useState, useRef } from "react";
import {
  Upload,
  Link as LinkIcon,
  Layers,
  Plus,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import { ConfirmModal } from "@/components/confirm-modal";

type Media = {
  id: string;
  originalFilename: string;
  publicUrl: string | null;
  mimeType: string;
};

type Relation = {
  id: string;
  type: string;
  media: Media;
};

type LinkItem = {
  id: string;
  label: string;
  url: string;
  type: string;
};

type Section = {
  id: string;
  type: string;
  title: string | null;
  content: unknown;
  sortOrder: number;
};

export function ProjectRelations({ projectId }: { projectId: string }) {
  const [library, setLibrary] = useState<Media[]>([]);
  const [relations, setRelations] = useState<Relation[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // File Uploading & Media selection state
  const [uploading, setUploading] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState("");
  const [mediaType, setMediaType] = useState("gallery");
  const [showMediaModal, setShowMediaModal] = useState(false);

  // Link state
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkType, setLinkType] = useState("live");

  // Section state
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionType, setSectionType] = useState("text");
  const [sectionContent, setSectionContent] = useState("");

  // Deletion modal target
  const [deleteTarget, setDeleteTarget] = useState<{
    path: string;
    title: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const load = async () => {
    const [mediaResponse, projectResponse] = await Promise.all([
      adminFetch("/api/admin/media"),
      adminFetch(`/api/admin/projects/${projectId}`),
    ]);
    if (mediaResponse.ok) setLibrary(await mediaResponse.json());
    if (projectResponse.ok) {
      const project = await projectResponse.json();
      setRelations(project.media ?? []);
      setLinks(project.links ?? []);
      setSections(project.sections ?? []);
    }
  };

  useEffect(() => {
    void load();
  }, [projectId]);

  const notify = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  // Associate existing library media
  const handleAttachMedia = async () => {
    if (!selectedMediaId) {
      return notify("error", "Please select a media file from your library or upload a new one.");
    }

    const response = await adminFetch(`/api/admin/projects/${projectId}/media`, {
      method: "POST",
      body: JSON.stringify({
        mediaId: selectedMediaId,
        type: mediaType,
        sortOrder: relations.length,
      }),
    });

    if (response.ok) {
      notify("success", "Media associated successfully.");
      setSelectedMediaId("");
      void load();
    } else {
      notify("error", "Failed to associate media.");
    }
  };

  // Direct upload new file & associate immediately
  const handleDirectFileUpload = async (file: File) => {
    setUploading(true);
    notify("success", "Uploading file to Supabase CDN…");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadRes = await adminFetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        setUploading(false);
        return notify("error", "Failed to upload file to storage.");
      }

      const newMedia: Media = await uploadRes.json();

      // Now associate with project
      const assocRes = await adminFetch(`/api/admin/projects/${projectId}/media`, {
        method: "POST",
        body: JSON.stringify({
          mediaId: newMedia.id,
          type: mediaType,
          sortOrder: relations.length,
        }),
      });

      if (assocRes.ok) {
        notify("success", "File uploaded and associated successfully.");
        void load();
      } else {
        notify("error", "Uploaded file, but failed to associate with project.");
      }
    } catch {
      notify("error", "Network error during upload.");
    } finally {
      setUploading(false);
    }
  };

  // Add Link
  const handleAddLink = async () => {
    if (!linkLabel.trim() || !linkUrl.trim()) {
      return notify("error", "Please fill in both label and valid URL.");
    }

    const response = await adminFetch(`/api/admin/projects/${projectId}/links`, {
      method: "POST",
      body: JSON.stringify({
        label: linkLabel.trim(),
        url: linkUrl.trim(),
        type: linkType,
        isPublic: true,
        sortOrder: links.length,
      }),
    });

    if (response.ok) {
      notify("success", "Link added successfully.");
      setLinkLabel("");
      setLinkUrl("");
      void load();
    } else {
      notify("error", "Failed to add link.");
    }
  };

  // Add Dynamic Section
  const handleAddSection = async () => {
    if (!sectionContent.trim()) {
      return notify("error", "Section content text is required.");
    }

    let contentObj: unknown;
    try {
      contentObj = JSON.parse(sectionContent);
    } catch {
      contentObj = { text: sectionContent };
    }

    const response = await adminFetch(`/api/admin/projects/${projectId}/sections`, {
      method: "POST",
      body: JSON.stringify({
        title: sectionTitle.trim() || undefined,
        type: sectionType,
        content: contentObj,
        sortOrder: sections.length,
      }),
    });

    if (response.ok) {
      notify("success", "Section added successfully.");
      setSectionTitle("");
      setSectionContent("");
      void load();
    } else {
      notify("error", "Failed to add section.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await adminFetch(deleteTarget.path, { method: "DELETE" });
    setDeleteTarget(null);
    notify("success", "Item removed successfully.");
    void load();
  };

  const selectedMediaObj = library.find((m) => m.id === selectedMediaId);

  return (
    <div className="space-y-8">
      {/* Global Notification */}
      {message && (
        <div
          className={`flex items-center gap-3 border p-4 font-mono text-xs ${
            message.type === "success"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/40 bg-red-500/10 text-red-300"
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

      <div className="grid gap-8 xl:grid-cols-3">
        {/* 1. MEDIA MANAGER PANEL */}
        <div className="border border-white/15 bg-[#121214] p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Project Media</h2>
              <p className="text-xs text-white/40">
                Covers, thumbnails, architecture & gallery images.
              </p>
            </div>
            <ImageIcon size={20} className="text-[#a855f7]" />
          </div>

          <div className="space-y-4">
            {/* Relation Type Dropdown */}
            <label className="block text-xs font-medium text-white/60">
              Media Usage Type
              <select
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
                className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-xs text-white outline-none focus:border-[#a855f7]"
              >
                <option value="cover" className="bg-[#121214]">
                  Cover Image (Hero Header)
                </option>
                <option value="thumbnail" className="bg-[#121214]">
                  Thumbnail (Card Grid)
                </option>
                <option value="gallery" className="bg-[#121214]">
                  Gallery Screenshot
                </option>
                <option value="architecture" className="bg-[#121214]">
                  Architecture Diagram
                </option>
                <option value="workflow" className="bg-[#121214]">
                  Workflow / Process Image
                </option>
              </select>
            </label>

            {/* Direct File Upload Dropzone / Button */}
            <div className="border border-dashed border-white/20 bg-white/5 p-4 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    void handleDirectFileUpload(e.target.files[0]);
                  }
                }}
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded border border-white/15 bg-white/5 py-3 font-mono text-[10px] uppercase tracking-widest text-white transition hover:border-[#a855f7] hover:bg-[#a855f7]/15 disabled:opacity-50"
              >
                <Upload size={14} /> {uploading ? "Uploading file…" : "Upload New File directly"}
              </button>
              <p className="mt-2 text-[10px] text-white/40">
                Uploads directly to Supabase CDN & links to project.
              </p>
            </div>

            <div className="relative flex items-center py-2">
              <div className="w-full border-t border-white/10" />
              <span className="shrink-0 bg-[#121214] px-3 font-mono text-[9px] uppercase tracking-widest text-white/40">
                OR Select Existing
              </span>
              <div className="w-full border-t border-white/10" />
            </div>

            {/* Media Selector Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowMediaModal(true)}
                className="flex flex-1 items-center justify-between border-b border-white/20 bg-transparent py-2.5 text-xs text-white/80 hover:border-[#a855f7]"
              >
                <span className="truncate">
                  {selectedMediaObj
                    ? selectedMediaObj.originalFilename
                    : "Choose from Media Library…"}
                </span>
                <span className="font-mono text-[9px] text-[#c084fc]">Browse →</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleAttachMedia}
              className="flex w-full items-center justify-center gap-2 border border-[#a855f7] bg-[#a855f7]/15 py-3 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition hover:bg-[#9333ea] hover:text-white"
            >
              <Plus size={14} /> Attach Selected Media
            </button>
          </div>

          {/* Associated Media List */}
          <div className="mt-8 border-t border-white/10 pt-4 space-y-3">
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7]">
              Associated Media ({relations.length})
            </p>

            {relations.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 border border-white/10 bg-[#0a0a0b] p-2.5"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="size-10 shrink-0 overflow-hidden border border-white/15 bg-white/5">
                    {item.media.publicUrl ? (
                      <img
                        src={item.media.publicUrl}
                        alt={item.media.originalFilename}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center font-mono text-[8px] text-white/30">
                        No URL
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="rounded bg-[#a855f7]/20 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#c084fc]">
                      {item.type}
                    </span>
                    <p className="mt-1 truncate font-mono text-xs text-white/80">
                      {item.media.originalFilename}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setDeleteTarget({
                      path: `/api/admin/projects/${projectId}/media/${item.id}`,
                      title: `Remove ${item.media.originalFilename}`,
                    })
                  }
                  className="text-white/30 hover:text-red-400"
                  title="Remove media"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {!relations.length && (
              <p className="py-4 text-center font-mono text-[10px] text-white/35">
                No media attached yet.
              </p>
            )}
          </div>
        </div>

        {/* 2. LINKS MANAGER PANEL */}
        <div className="border border-white/15 bg-[#121214] p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Project Links</h2>
              <p className="text-xs text-white/40">
                Live demo, GitHub, Figma, documentation, and videos.
              </p>
            </div>
            <LinkIcon size={20} className="text-[#a855f7]" />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-medium text-white/60">
              Link Label
              <input
                type="text"
                value={linkLabel}
                onChange={(e) => setLinkLabel(e.target.value)}
                placeholder="e.g. Live Demo, GitHub Source"
                className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-xs text-white outline-none focus:border-[#a855f7]"
              />
            </label>

            <label className="block text-xs font-medium text-white/60">
              URL Address
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-xs text-white outline-none focus:border-[#a855f7]"
              />
            </label>

            <label className="block text-xs font-medium text-white/60">
              Link Type
              <select
                value={linkType}
                onChange={(e) => setLinkType(e.target.value)}
                className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-xs text-white outline-none focus:border-[#a855f7]"
              >
                <option value="live" className="bg-[#121214]">
                  Live Production Demo
                </option>
                <option value="github" className="bg-[#121214]">
                  GitHub Repository
                </option>
                <option value="figma" className="bg-[#121214]">
                  Figma Design
                </option>
                <option value="video" className="bg-[#121214]">
                  Video Walkthrough
                </option>
                <option value="docs" className="bg-[#121214]">
                  Documentation
                </option>
                <option value="other" className="bg-[#121214]">
                  Other Reference
                </option>
              </select>
            </label>

            <button
              type="button"
              onClick={handleAddLink}
              className="flex w-full items-center justify-center gap-2 border border-[#a855f7] bg-[#a855f7]/15 py-3 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition hover:bg-[#9333ea] hover:text-white"
            >
              <Plus size={14} /> Add Link +
            </button>
          </div>

          {/* Added Links List */}
          <div className="mt-8 border-t border-white/10 pt-4 space-y-3">
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7]">
              Configured Links ({links.length})
            </p>

            {links.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 border border-white/10 bg-[#0a0a0b] p-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white/70">
                      {item.type}
                    </span>
                    <strong className="truncate text-xs text-white">{item.label}</strong>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 flex items-center gap-1 truncate font-mono text-[10px] text-[#c084fc] hover:underline"
                  >
                    {item.url} <ExternalLink size={10} />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setDeleteTarget({
                      path: `/api/admin/links/${item.id}`,
                      title: `Remove link "${item.label}"`,
                    })
                  }
                  className="text-white/30 hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {!links.length && (
              <p className="py-4 text-center font-mono text-[10px] text-white/35">
                No links added yet.
              </p>
            )}
          </div>
        </div>

        {/* 3. DYNAMIC SECTIONS MANAGER PANEL */}
        <div className="border border-white/15 bg-[#121214] p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Custom Sections</h2>
              <p className="text-xs text-white/40">
                Additional content blocks, quotes, or metric grids.
              </p>
            </div>
            <Layers size={20} className="text-[#a855f7]" />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-medium text-white/60">
              Section Title (Optional)
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder="e.g. Performance Metrics"
                className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-xs text-white outline-none focus:border-[#a855f7]"
              />
            </label>

            <label className="block text-xs font-medium text-white/60">
              Section Type
              <select
                value={sectionType}
                onChange={(e) => setSectionType(e.target.value)}
                className="mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-xs text-white outline-none focus:border-[#a855f7]"
              >
                <option value="text" className="bg-[#121214]">
                  Text Narrative
                </option>
                <option value="quote" className="bg-[#121214]">
                  Testimonial / Quote
                </option>
                <option value="metrics" className="bg-[#121214]">
                  Key Performance Metrics
                </option>
                <option value="architecture" className="bg-[#121214]">
                  Architecture Highlight
                </option>
              </select>
            </label>

            <label className="block text-xs font-medium text-white/60">
              Content Text or JSON
              <textarea
                rows={3}
                value={sectionContent}
                onChange={(e) => setSectionContent(e.target.value)}
                placeholder="Enter narrative text..."
                className="mt-2 w-full resize-none border border-white/15 bg-transparent p-3 font-mono text-xs text-white outline-none focus:border-[#a855f7]"
              />
            </label>

            <button
              type="button"
              onClick={handleAddSection}
              className="flex w-full items-center justify-center gap-2 border border-[#a855f7] bg-[#a855f7]/15 py-3 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition hover:bg-[#9333ea] hover:text-white"
            >
              <Plus size={14} /> Add Section +
            </button>
          </div>

          {/* Added Sections List */}
          <div className="mt-8 border-t border-white/10 pt-4 space-y-3">
            <p className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7]">
              Configured Sections ({sections.length})
            </p>

            {sections.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 border border-white/10 bg-[#0a0a0b] p-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#c084fc]">
                      0{idx + 1}
                    </span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-white/70">
                      {item.type}
                    </span>
                    <strong className="truncate text-xs text-white">
                      {item.title ?? "Untitled Section"}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setDeleteTarget({
                      path: `/api/admin/sections/${item.id}`,
                      title: `Remove section "${item.title ?? item.type}"`,
                    })
                  }
                  className="text-white/30 hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {!sections.length && (
              <p className="py-4 text-center font-mono text-[10px] text-white/35">
                No sections added yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Media Picker Modal */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
          <div className="relative flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-white/15 bg-[#121214] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">Select Media from Library</h3>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="rounded p-1 text-white/40 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="my-6 grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
              {library.map((media) => (
                <div
                  key={media.id}
                  onClick={() => {
                    setSelectedMediaId(media.id);
                    setShowMediaModal(false);
                  }}
                  className={`group relative aspect-square cursor-pointer overflow-hidden border p-2 transition ${
                    selectedMediaId === media.id
                      ? "border-[#a855f7] bg-[#a855f7]/15"
                      : "border-white/10 bg-black/40 hover:border-[#a855f7]"
                  }`}
                >
                  {media.publicUrl ? (
                    <img
                      src={media.publicUrl}
                      alt={media.originalFilename}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="grid h-full place-items-center font-mono text-[9px] text-white/30">
                      No URL
                    </div>
                  )}
                  <p className="absolute bottom-1 left-1 right-1 truncate bg-black/80 p-1 font-mono text-[8px] text-white">
                    {media.originalFilename}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Remove Relation Item"
        description={`Are you sure you want to delete ${deleteTarget?.title}?`}
        confirmLabel="Remove Item"
        cancelLabel="Cancel"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  Eye,
  EyeOff,
  GripVertical,
  Search,
  Trash2,
} from 'lucide-react';
import { adminFetch } from '@/lib/admin-api';
import { ConfirmModal } from '@/components/confirm-modal';

type Item = {
  id: string;
  title: string;
  slug: string;
  status: string;
  showOnHomepage: boolean;
  sortOrder: number;
  updatedAt: string;
  shortSummary?: string;
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [query, setQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);

  const load = () =>
    adminFetch('/api/admin/projects').then(async (response) => {
      if (response.ok) {
        const data: Item[] = await response.json();
        setItems(data);
      }
    });

  useEffect(() => {
    void load();
  }, []);

  async function persistOrder(newItems: Item[]) {
    setItems(newItems);
    setSavingOrder(true);
    try {
      const payload = newItems.map((item, index) => ({
        id: item.id,
        sortOrder: index,
      }));
      await adminFetch('/api/admin/projects/reorder', {
        method: 'PUT',
        body: JSON.stringify({ items: payload }),
      });
    } finally {
      setSavingOrder(false);
    }
  }

  function moveItem(fromIndex: number, toIndex: number) {
    if (toIndex < 0 || toIndex >= items.length) return;
    const reordered = [...items];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    void persistOrder(reordered);
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    await adminFetch(`/api/admin/projects/${deleteTarget.id}`, {
      method: 'DELETE',
    });
    setDeleteTarget(null);
    void load();
  }

  async function toggleHomepage(item: Item) {
    const response = await adminFetch(`/api/admin/projects/${item.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ showOnHomepage: !item.showOnHomepage }),
    });
    if (response.ok)
      setItems((current) =>
        current.map((entry) =>
          entry.id === item.id
            ? { ...entry, showOnHomepage: !item.showOnHomepage }
            : entry,
        ),
      );
  }

  const isSearching = query.trim().length > 0;
  const shown = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#a855f7]">
            Content library
          </p>
          <h1 className="mt-5 text-5xl font-bold md:text-7xl">Proyectos</h1>
          <p className="mt-4 max-w-xl text-sm text-white/45">
            Arrastra los proyectos para ordenar su posición en la portada y portfolio. El orden 01 será el primero en mostrarse.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {savingOrder && (
            <span className="font-mono text-xs text-[#a855f7]">
              Guardando orden…
            </span>
          )}
          <Link
            href="/admin/projects/new"
            className="border border-[#a855f7] bg-[#a855f7]/10 px-6 py-4 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition-colors hover:bg-[#9333ea] hover:text-white"
          >
            Nuevo proyecto +
          </Link>
        </div>
      </header>

      <div className="my-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex flex-1 items-center gap-4 border-b border-white/15 py-3 focus-within:border-[#a855f7]">
          <Search size={16} className="text-white/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título…"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        {isSearching && (
          <p className="font-mono text-[10px] text-white/40">
            Filtro activo. Limpia la búsqueda para arrastrar y reordenar.
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((item, index) => {
          const originalIndex = items.findIndex((i) => i.id === item.id);
          return (
            <article
              key={item.id}
              draggable={!isSearching}
              onDragStart={(e) => {
                setDraggedIndex(originalIndex);
                e.dataTransfer.effectAllowed = 'move';
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedIndex !== null && draggedIndex !== originalIndex) {
                  moveItem(draggedIndex, originalIndex);
                }
                setDraggedIndex(null);
              }}
              onDragEnd={() => setDraggedIndex(null)}
              className={`group relative min-h-72 overflow-hidden border border-white/10 bg-[#101011] p-6 transition ${
                draggedIndex === originalIndex ? 'opacity-40 border-[#a855f7]' : 'hover:border-[#a855f7]/70'
              }`}
            >
              <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_80%_20%,rgba(168,85,247,.35),transparent_38%)]" />
              <div className="relative flex h-full min-h-60 flex-col">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/35">
                  <div className="flex items-center gap-2">
                    {!isSearching && (
                      <span
                        title="Arrastra para reordenar"
                        className="cursor-grab text-white/30 hover:text-[#c084fc] active:cursor-grabbing"
                      >
                        <GripVertical size={14} />
                      </span>
                    )}
                    <span className="font-bold text-[#c084fc]">
                      {String(originalIndex + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {!isSearching && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={originalIndex === 0}
                          onClick={() => moveItem(originalIndex, originalIndex - 1)}
                          title="Mover hacia arriba"
                          className="rounded p-1 text-white/30 hover:bg-white/10 hover:text-white disabled:opacity-20"
                        >
                          <ArrowUp size={12} />
                        </button>
                        <button
                          type="button"
                          disabled={originalIndex === items.length - 1}
                          onClick={() => moveItem(originalIndex, originalIndex + 1)}
                          title="Mover hacia abajo"
                          className="rounded p-1 text-white/30 hover:bg-white/10 hover:text-white disabled:opacity-20"
                        >
                          <ArrowDown size={12} />
                        </button>
                      </div>
                    )}
                    <span
                      className={
                        item.status === 'published'
                          ? 'text-emerald-400'
                          : 'text-amber-300'
                      }
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <p className="font-mono text-[9px] text-[#a855f7]">
                    /{item.slug}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold leading-tight">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/45">
                    {item.shortSummary || 'Sin resumen editorial.'}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <Link
                    href={`/admin/projects/${item.id}`}
                    className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition-colors hover:text-white"
                  >
                    Editar <ArrowUpRight size={13} />
                  </Link>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleHomepage(item)}
                      aria-label={
                        item.showOnHomepage
                          ? `Ocultar ${item.title} del portfolio`
                          : `Mostrar ${item.title} en portfolio`
                      }
                      title={
                        item.showOnHomepage
                          ? 'Visible en portfolio'
                          : 'Oculto en portfolio'
                      }
                      className={
                        item.showOnHomepage
                          ? 'text-[#c084fc] hover:text-white'
                          : 'text-white/30 hover:text-white'
                      }
                    >
                      {item.showOnHomepage ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(item)}
                      aria-label={`Eliminar ${item.title}`}
                      className="text-white/30 hover:text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {!shown.length && (
        <p className="border border-white/10 p-12 text-center font-mono text-[10px] uppercase tracking-widest text-white/35">
          No hay proyectos que coincidan con la búsqueda.
        </p>
      )}

      {/* Dark Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Eliminar proyecto"
        description={`¿Estás seguro de que deseas eliminar permanentemente el proyecto "${deleteTarget?.title}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar proyecto"
        cancelLabel="Cancelar"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

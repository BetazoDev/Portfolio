'use client';
import { FormEvent, useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { adminFetch } from '@/lib/admin-api';
import { ConfirmModal } from '@/components/confirm-modal';

type Item = { id: string; name: string; slug: string; description?: string; category?: string };

export function TaxonomyManager({ type }: { type: 'technologies' | 'categories' }) {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);

  const load = () =>
    adminFetch(`/api/admin/${type}`).then(async (response) => {
      if (response.ok) setItems(await response.json());
    });

  useEffect(() => {
    void load();
  }, [type]);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);
    const response = await adminFetch(`/api/admin/${type}`, {
      method: 'POST',
      body: JSON.stringify({
        name: String(form.get('name')),
        slug: String(form.get('slug')),
        ...(type === 'categories'
          ? { description: String(form.get('extra') || '') }
          : { category: String(form.get('extra') || '') }),
      }),
    });
    if (!response.ok) return setError('No se pudo guardar; revisa el slug.');
    element.reset();
    setError('');
    void load();
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    await adminFetch(`/api/admin/${type}/${deleteTarget.id}`, {
      method: 'DELETE',
    });
    setDeleteTarget(null);
    void load();
  }

  const label = type === 'technologies' ? 'Tecnologías' : 'Categorías';

  return (
    <>
      <header className="border-b border-white/10 pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#a855f7]">
          Taxonomías
        </p>
        <h1 className="mt-5 text-5xl font-bold md:text-7xl">{label}</h1>
        <p className="mt-4 text-sm text-white/45">
          Organiza y reutiliza la clasificación editorial de tus proyectos.
        </p>
      </header>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_380px]">
        <div className="grid content-start gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="group border border-white/10 bg-[#101011] p-5 transition hover:border-[#a855f7]/60"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="font-mono text-[9px] text-[#a855f7]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-4 text-xl font-bold">{item.name}</h2>
                  <p className="mt-2 font-mono text-[9px] text-white/35">
                    /{item.slug}
                  </p>
                  {(item.description || item.category) && (
                    <p className="mt-4 text-xs leading-5 text-white/45">
                      {item.description || item.category}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setDeleteTarget(item)}
                  aria-label={`Eliminar ${item.name}`}
                  className="text-white/25 hover:text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <form
          onSubmit={create}
          className="h-fit border border-white/10 bg-[#101011] p-7 xl:sticky xl:top-8"
        >
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7]">
              Agregar {type === 'technologies' ? 'tecnología' : 'categoría'}
            </h2>
            <Plus size={16} className="text-[#a855f7]" />
          </div>
          <LineInput
            name="name"
            label="Nombre"
            required
            onChange={(event) => {
              const slug = event.currentTarget.form?.elements.namedItem(
                'slug',
              ) as HTMLInputElement;
              if (slug)
                slug.value = event.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-|-$/g, '');
            }}
          />
          <LineInput name="slug" label="Slug" required mono />
          <label className="mt-6 block text-xs text-white/45">
            {type === 'categories' ? 'Descripción' : 'Grupo o categoría'}
            <textarea
              name="extra"
              rows={4}
              className="mt-3 w-full border border-white/10 bg-transparent p-4 text-white outline-none focus:border-[#a855f7]"
            />
          </label>
          {error && <p className="mt-4 text-xs text-red-400">{error}</p>}
          <button className="mt-7 w-full border border-[#a855f7] bg-[#a855f7]/10 py-4 font-mono text-[10px] uppercase tracking-widest text-[#c084fc] transition-colors hover:bg-[#9333ea] hover:text-white">
            Guardar +
          </button>
        </form>
      </div>

      <ConfirmModal
        isOpen={!!deleteTarget}
        title={`Eliminar ${type === 'technologies' ? 'tecnología' : 'categoría'}`}
        description={`¿Estás seguro de que deseas eliminar permanentemente "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        isDanger={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

function LineInput({
  label,
  mono,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  mono?: boolean;
}) {
  return (
    <label className="mb-6 block text-xs text-white/45">
      {label}
      <input
        {...props}
        className={`mt-2 w-full border-b border-white/15 bg-transparent py-4 text-white outline-none focus:border-[#a855f7] ${
          mono ? 'font-mono text-xs' : ''
        }`}
      />
    </label>
  );
}

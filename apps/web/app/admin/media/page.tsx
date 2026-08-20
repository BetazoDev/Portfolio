'use client';
import { FormEvent, useEffect, useState } from 'react';
import { adminFetch } from '@/lib/admin-api';
type Media = { id: string; originalFilename: string; publicUrl: string | null; altText: string | null; mimeType: string; sizeBytes: number };
export default function MediaPage() {
  const [items, setItems] = useState<Media[]>([]); const [message, setMessage] = useState('');
  const load = async () => { const response = await adminFetch('/api/admin/media'); if (response.ok) setItems(await response.json()); };
  useEffect(() => { void load(); }, []);
  async function upload(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const form = new FormData(event.currentTarget); setMessage('Subiendo…'); const response = await adminFetch('/api/admin/media/upload', { method: 'POST', body: form }); setMessage(response.ok ? 'Archivo subido.' : 'No se pudo subir. Verifica Supabase Storage.'); if (response.ok) { event.currentTarget.reset(); void load(); } }
  async function remove(id: string) { if (!confirm('¿Eliminar el archivo del storage y de la biblioteca?')) return; await adminFetch(`/api/admin/media/${id}`, { method: 'DELETE' }); void load(); }
  return <><p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#8b78ff]">Biblioteca</p><h1 className="my-8 text-6xl font-bold">Medios</h1><form onSubmit={upload} className="mb-10 flex flex-wrap items-center gap-4 border border-dashed border-white/25 p-6"><input name="file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" required /><button className="bg-[#7057ff] px-5 py-3 font-mono text-[10px] uppercase tracking-widest">Subir imagen</button><span className="text-xs text-white/50">{message}</span></form><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <article key={item.id} className="border border-white/15"><div className="aspect-video bg-white/5">{item.publicUrl && <img src={item.publicUrl} alt={item.altText ?? ''} className="h-full w-full object-cover" />}</div><div className="p-4"><p className="truncate text-sm">{item.originalFilename}</p><p className="mt-2 font-mono text-[9px] uppercase text-white/40">{item.mimeType} / {Math.round(item.sizeBytes / 1024)} KB</p><button onClick={() => remove(item.id)} className="mt-4 font-mono text-[10px] uppercase text-red-400">Eliminar</button></div></article>)}</div></>;
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BROWSER_API_URL } from '@/lib/api';
import { adminFetch, clearToken, getToken } from '@/lib/admin-api';

const nav = [['Dashboard', '/admin'], ['Proyectos', '/admin/projects'], ['Medios', '/admin/media'], ['Tecnologías', '/admin/technologies'], ['Categorías', '/admin/categories'], ['Ajustes', '/admin/settings']];
export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter(); const pathname = usePathname(); const [ready, setReady] = useState(false);
  const isLogin = pathname === '/admin/login';
  useEffect(() => { if (isLogin) return; if (!getToken()) { router.replace('/admin/login'); return; } adminFetch('/api/auth/me').then((response) => { if (!response.ok) router.replace('/admin/login'); else setReady(true); }); }, [router, isLogin]);
  if (isLogin) return children;
  if (!ready) return <main className="grid min-h-screen place-items-center bg-[#0c0c0d] font-mono text-xs uppercase tracking-widest text-white">Validando sesión…</main>;
  return <div className="min-h-screen bg-[#0c0c0d] text-[#f4f1ed] lg:grid lg:grid-cols-[240px_1fr]"><aside className="border-b border-white/15 p-6 lg:min-h-screen lg:border-b-0 lg:border-r"><Link href="/" className="font-mono text-[10px] uppercase tracking-[.3em] text-[#8b78ff]">H. Alonso / CMS</Link><nav className="mt-12 grid gap-2">{nav.map(([label, href]) => <Link key={href} href={href} className={`px-3 py-3 font-mono text-[10px] uppercase tracking-widest ${pathname === href ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}>{label}</Link>)}</nav><button className="mt-12 px-3 font-mono text-[10px] uppercase tracking-widest text-white/50" onClick={async () => { await fetch(`${BROWSER_API_URL}/api/auth/logout`, { method: 'POST', credentials: 'include' }); clearToken(); router.replace('/admin/login'); }}>Cerrar sesión</button></aside><main className="p-6 md:p-10 lg:p-14">{children}</main></div>;
}

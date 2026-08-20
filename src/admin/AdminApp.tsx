import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { API_URL } from '../lib/cms';

type AdminProject = { id: string; title: string; slug: string; status: string; shortSummary?: string | null; updatedAt: string };

const token = () => localStorage.getItem('portfolio_access_token') ?? '';

export function AdminApp() {
  const [authenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('portfolio_access_token')));
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');

  const loadProjects = async () => {
    const response = await fetch(`${API_URL}/api/admin/projects`, { headers: { Authorization: `Bearer ${token()}` } });
    if (response.ok) setProjects(await response.json());
  };

  useEffect(() => { if (authenticated) void loadProjects(); }, [authenticated]);

  const login = async (event: FormEvent) => {
    event.preventDefault(); setError('');
    const response = await fetch(`${API_URL}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ email, password }) });
    if (!response.ok) { setError('Invalid email or password'); return; }
    const data = await response.json(); localStorage.setItem('portfolio_access_token', data.accessToken); setAuthenticated(true);
  };

  const createProject = async (event: FormEvent) => {
    event.preventDefault(); setError('');
    const response = await fetch(`${API_URL}/api/admin/projects`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` }, body: JSON.stringify({ title, slug, shortSummary: summary, status: 'draft' }) });
    if (!response.ok) { setError('Could not save project. Check the slug.'); return; }
    setTitle(''); setSlug(''); setSummary(''); await loadProjects();
  };

  if (!authenticated) return <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] grid place-items-center px-6"><form onSubmit={login} className="w-full max-w-md border border-[var(--border-color)] p-8 md:p-12"><p className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Portfolio CMS / Private</p><h1 className="text-4xl font-bold mt-6 mb-10">Admin access</h1><label className="block text-[10px] font-mono uppercase tracking-widest mb-5">Email<input className="mt-2 w-full bg-transparent border-b border-[var(--border-color)] py-3 outline-none" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label className="block text-[10px] font-mono uppercase tracking-widest mb-5">Password<input className="mt-2 w-full bg-transparent border-b border-[var(--border-color)] py-3 outline-none" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>{error && <p className="text-red-400 text-sm mb-5">{error}</p>}<button className="w-full bg-accent text-white py-4 text-[10px] font-mono uppercase tracking-widest">Sign in ↗</button></form></main>;

  return <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] px-6 md:px-16 lg:px-24"><header className="py-7 border-b border-[var(--border-color)] flex justify-between items-center"><a href="/" className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">← Public portfolio</a><button onClick={() => { localStorage.removeItem('portfolio_access_token'); setAuthenticated(false); }} className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-primary)]/60">Log out</button></header><section className="py-20"><p className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">Portfolio CMS / Dashboard</p><div className="flex flex-wrap justify-between gap-8 items-end mt-6 mb-14"><h1 className="text-5xl md:text-7xl font-bold tracking-tight">Projects</h1><span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-primary)]/50">{projects.length} records</span></div><div className="grid lg:grid-cols-[1fr_360px] gap-8"><div className="border border-[var(--border-color)]"><div className="p-5 border-b border-[var(--border-color)] text-[10px] font-mono uppercase tracking-widest text-accent">Content library</div>{projects.map((project) => <div key={project.id} className="p-5 border-b border-[var(--border-color)] last:border-0 grid md:grid-cols-[1fr_auto_auto] gap-4 items-center"><div><p className="font-bold">{project.title}</p><p className="text-xs text-[var(--text-primary)]/50 mt-1">/{project.slug}</p></div><span className="text-[10px] font-mono uppercase text-[var(--text-primary)]/50">{project.status}</span><a href={`/admin/projects/${project.id}`} className="text-[10px] font-mono uppercase text-accent">Edit ↗</a></div>)}{projects.length === 0 && <p className="p-8 text-sm text-[var(--text-primary)]/50">No projects loaded.</p>}</div><form onSubmit={createProject} className="border border-[var(--border-color)] p-6 h-fit"><p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-8">New project / Draft</p><input className="w-full bg-transparent border-b border-[var(--border-color)] py-3 mb-5 outline-none" placeholder="Title" value={title} onChange={(event) => { setTitle(event.target.value); setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')); }} required /><input className="w-full bg-transparent border-b border-[var(--border-color)] py-3 mb-5 outline-none font-mono text-xs" placeholder="slug" value={slug} onChange={(event) => setSlug(event.target.value)} required /><textarea className="w-full bg-transparent border border-[var(--border-color)] p-3 mb-5 outline-none resize-none" placeholder="Short summary" rows={5} value={summary} onChange={(event) => setSummary(event.target.value)} />{error && <p className="text-red-400 text-sm mb-4">{error}</p>}<button className="w-full border border-accent text-accent py-3 text-[10px] font-mono uppercase tracking-widest">Save draft +</button></form></div></section></main>;
}

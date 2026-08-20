import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

const nav = [['Home', '/'], ['Solutions', '/solutions'], ['Projects', '/projects'], ['Case Studies', '/case-studies'], ['About', '/about'], ['Contact', '/contact']];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <div className="noise min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
    <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[color:var(--bg-primary)]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-5 md:px-12"><Link href="/" className="leading-tight"><span className="block font-mono text-[9px] uppercase tracking-[.3em] text-[var(--accent)]">Humberto</span><strong className="text-sm uppercase tracking-[.16em]">Alonso López</strong></Link><nav className="hidden items-center gap-6 lg:flex">{nav.map(([label, href]) => <Link key={href} href={href} className="font-mono text-[9px] uppercase tracking-[.18em] opacity-60 transition hover:text-[var(--accent)] hover:opacity-100">{label}</Link>)}</nav><div className="flex items-center gap-3"><Link href="/contact" className="hidden border border-[var(--border-color)] px-4 py-3 font-mono text-[9px] uppercase tracking-widest sm:block">Start a project ↗</Link><ThemeToggle /></div></div>
      <nav className="flex gap-5 overflow-x-auto border-t border-[var(--border-color)] px-6 py-3 lg:hidden">{nav.map(([label, href]) => <Link key={href} href={href} className="shrink-0 font-mono text-[9px] uppercase tracking-widest opacity-70">{label}</Link>)}</nav>
    </header>
    {children}
    <footer className="border-t border-[var(--border-color)]"><div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-12 md:grid-cols-2 md:px-12"><div><p className="eyebrow">Halonso.digital</p><p className="mt-4 max-w-md text-sm muted">Plataformas web inteligentes, CMS, automatización y productos digitales construidos alrededor de resultados.</p></div><div className="flex flex-wrap gap-6 md:justify-end">{nav.slice(1).map(([label, href]) => <Link key={href} href={href} className="font-mono text-[9px] uppercase tracking-widest">{label}</Link>)}</div></div></footer>
  </div>;
}

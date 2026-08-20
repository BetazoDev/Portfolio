import Link from 'next/link';

export function SiteHeader() {
  return <header className="site-header"><Link href="/" className="brand">HA<span>•</span></Link><nav><Link href="/projects">Projects</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/admin/login" className="nav-admin">Admin</Link></nav></header>;
}

export function SiteFooter() { return <footer className="site-footer"><span>© {new Date().getFullYear()} Humberto Alonso</span><span>Built with Next.js · PostgreSQL · Express</span></footer>; }

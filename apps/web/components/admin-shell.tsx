"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  FolderKanban,
  Image,
  Layers3,
  LogOut,
  Menu,
  Settings,
  Tags,
  X,
} from "lucide-react";
import { BROWSER_API_URL } from "@/lib/api";
import { adminFetch, clearToken, getToken } from "@/lib/admin-api";

const nav = [
  { label: "Dashboard", href: "/admin", icon: BarChart3 },
  { label: "Proyectos", href: "/admin/projects", icon: FolderKanban },
  { label: "Medios", href: "/admin/media", icon: Image },
  { label: "Tecnologías", href: "/admin/technologies", icon: Layers3 },
  { label: "Categorías", href: "/admin/categories", icon: Tags },
  { label: "Ajustes", href: "/admin/settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState("Admin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) return;
    if (!getToken()) {
      router.replace("/admin/login");
      return;
    }
    adminFetch("/api/auth/me").then(async (response) => {
      if (!response.ok) router.replace("/admin/login");
      else {
        const data = await response.json();
        setUser(data.user?.name ?? "Admin");
        setReady(true);
      }
    });
  }, [router, isLogin]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (isLogin) return children;
  if (!ready)
    return (
      <main className="grid min-h-screen place-items-center bg-[#101011] font-mono text-xs uppercase tracking-widest text-white">
        Validando sesión…
      </main>
    );

  const handleLogout = async () => {
    await fetch(`${BROWSER_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    clearToken();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#101011] text-[#f4f1ed] lg:grid lg:grid-cols-[260px_1fr]">
      {/* Mobile Top Header */}
      <header className="flex items-center justify-between border-b border-white/10 bg-[#151517] p-4 lg:hidden">
        <div className="flex items-center gap-3">
          <div className="grid size-8 place-items-center border border-[#a855f7] bg-[#a855f7]/10 font-mono text-xs text-[#c084fc]">
            H
          </div>
          <div>
            <strong className="block text-sm">Halonso CMS</strong>
            <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">
              Portfolio platform
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="rounded border border-white/15 p-2 text-white/70 hover:border-[#a855f7] hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#151517] p-4 lg:hidden">
          <nav className="grid gap-1">
            {nav.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 border-l-2 px-3 py-2.5 text-sm transition ${
                    active
                      ? "border-[#a855f7] bg-[#a855f7]/10 font-medium text-white"
                      : "border-transparent text-white/50 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium">{user}</p>
              <p className="font-mono text-[8px] uppercase tracking-widest text-emerald-400">
                Production · online
              </p>
            </div>
            <button
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/50 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut size={13} /> Salir
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden lg:flex lg:flex-col border-r border-white/10 bg-[#151517] p-5 lg:sticky lg:top-0 lg:h-screen">
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="grid size-9 place-items-center border border-[#a855f7] bg-[#a855f7]/10 font-mono text-sm text-[#c084fc]">
            H
          </div>
          <div>
            <strong className="block text-sm">Halonso CMS</strong>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
              Portfolio platform
            </span>
          </div>
        </div>
        <nav className="mt-7 grid gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 border-l-2 px-3 py-3 text-sm transition ${
                  active
                    ? "border-[#a855f7] bg-[#a855f7]/10 font-medium text-white"
                    : "border-transparent text-white/50 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-5">
          <p className="text-sm font-medium">{user}</p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-emerald-400">
            Production · online
          </p>
          <button
            className="mt-4 flex items-center gap-2 text-xs text-white/50 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut size={14} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0 p-4 sm:p-6 md:p-10 xl:p-14">{children}</main>
    </div>
  );
}

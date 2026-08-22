"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-api";
type Item = { id: string; title: string; slug: string; status: string };
export default function DashboardPage() {
  const [projects, setProjects] = useState<Item[]>([]);
  const [counts, setCounts] = useState({ media: 0, technologies: 0 });
  useEffect(() => {
    Promise.all(
      [
        "/api/admin/projects",
        "/api/admin/media",
        "/api/admin/technologies",
      ].map((path) => adminFetch(path).then((r) => (r.ok ? r.json() : []))),
    ).then(([p, m, t]) => {
      setProjects(p);
      setCounts({ media: m.length, technologies: t.length });
    });
  }, []);
  const published = projects.filter((p) => p.status === "published").length;
  const cards = [
    ["Total projects", projects.length],
    ["Published", published],
    ["Drafts", projects.filter((p) => p.status === "draft").length],
    ["Media items", counts.media],
  ];
  return (
    <>
      <header className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.3em] text-[#a855f7]">
            Portfolio CMS / Overview
          </p>
          <h1 className="mt-5 text-5xl font-bold tracking-tight md:text-7xl">
            Content control.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-white/45">
            Manage projects, case studies, and media from a single editorial structure.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="border border-[#a855f7] bg-[#a855f7]/10 px-7 py-5 font-mono text-[10px] uppercase tracking-[.2em] text-[#c084fc] transition hover:bg-[#9333ea] hover:text-white"
        >
          New project +
        </Link>
      </header>
      <section className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value], index) => (
          <article key={label} className="bg-[#101011] p-7">
            <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-white/40">
              <span>{label}</span>
              <span className="text-[#a855f7]">0{index + 1}</span>
            </div>
            <strong className="mt-10 block text-5xl">{value}</strong>
            <div className="mt-6 h-px bg-white/10">
              <div
                className="h-px bg-[#a855f7]"
                style={{ width: `${Math.min(100, Number(value) * 5)}%` }}
              />
            </div>
          </article>
        ))}
      </section>
      <div className="mt-10 grid gap-px bg-white/10 xl:grid-cols-[1.6fr_.7fr]">
        <section className="bg-[#101011] p-7">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7]">
                Latest entries
              </p>
              <h2 className="mt-2 text-2xl font-bold">Recent projects</h2>
            </div>
            <Link
              href="/admin/projects"
              className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7]"
            >
              View all ↗
            </Link>
          </div>
          {projects.slice(0, 7).map((project, index) => (
            <Link
              href={`/admin/projects/${project.id}`}
              key={project.id}
              className="grid grid-cols-[32px_1fr_auto] items-center gap-4 border-t border-white/10 py-4"
            >
              <span className="font-mono text-[9px] text-white/25">
                0{index + 1}
              </span>
              <div>
                <strong className="text-sm">{project.title}</strong>
                <p className="mt-1 font-mono text-[9px] text-white/30">
                  /{project.slug}
                </p>
              </div>
              <span
                className={`border px-3 py-1 font-mono text-[8px] uppercase ${project.status === "published" ? "border-emerald-400/25 text-emerald-400" : "border-amber-300/25 text-amber-300"}`}
              >
                {project.status}
              </span>
            </Link>
          ))}
        </section>
        <aside className="bg-[#101011] p-7">
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#a855f7]">
            System snapshot
          </p>
          {[
            ["Technologies", counts.technologies],
            [
              "Published ratio",
              projects.length
                ? Math.round((published / projects.length) * 100) + "%"
                : "0%",
            ],
            ["Environment", "Production"],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-white/10 py-7">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/35">
                {label}
              </p>
              <strong className="mt-3 block text-2xl">{value}</strong>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}

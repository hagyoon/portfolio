/*
 * Admin dashboard — content counts and a plain-English map of how
 * publishing flows.
 */

import Link from "next/link";
import { getProjects, getEssays, getInterests } from "@/lib/content";

export default async function AdminDashboard() {
  const [projects, essays, interests] = await Promise.all([
    getProjects(),
    getEssays(),
    getInterests(),
  ]);

  const cards = [
    { label: "Projects", count: projects.length, href: "/admin/projects" },
    { label: "Writing", count: essays.length, href: "/admin/writing" },
    { label: "Interests", count: interests.length, href: "/admin/interests" },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl tracking-tight mb-2">Welcome back.</h1>
      <p className="text-stone-500 text-sm mb-10">
        Edit anything here, hit save, and it's live within a couple of minutes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="bg-paper border border-ink/10 p-6 hover:border-ink/30 transition-colors"
          >
            <div className="font-serif text-5xl mb-2">{c.count}</div>
            <div className="label">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="bg-paper border border-ink/10 p-6 text-sm text-stone-600 leading-relaxed max-w-2xl">
        <div className="label mb-3">How publishing works</div>
        <p>
          Saving here commits the change to the Obsidian vault (the source of
          truth — it shows up in your local vault on the next pull) and to the
          site repo, which triggers a deploy right away. Editing the{" "}
          <code className="font-mono text-[12px]">Portfolio/</code> folder in
          Obsidian publishes the same way: the watcher pushes it, GitHub relays
          it, the site rebuilds.
        </p>
      </div>
    </div>
  );
}

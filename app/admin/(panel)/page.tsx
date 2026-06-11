/*
 * Studio dashboard — live counts split by visibility, recently edited
 * content across every collection, and one-click quick actions.
 */

import Link from "next/link";
import { COLLECTIONS } from "@/lib/cms-schema";
import { listEntries, type EntrySummary } from "@/lib/cms-list";
import { listMedia } from "@/lib/cms";

const QUICK_ACTIONS = [
  { label: "New project", href: "/admin/projects/new" },
  { label: "New essay", href: "/admin/writing/new" },
  { label: "New note", href: "/admin/notes/new" },
  { label: "Upload images", href: "/admin/media" },
  { label: "Edit site copy", href: "/admin/site" },
];

export default async function AdminDashboard() {
  const [lists, media] = await Promise.all([
    Promise.all(COLLECTIONS.map(listEntries)),
    listMedia().catch(() => []),
  ]);

  const all: EntrySummary[] = lists.flat();
  const drafts = all.filter((e) => e.visibility === "draft");
  const published = all.filter((e) => e.visibility === "published");
  const recent = [...all]
    .filter((e) => e.updated ?? e.date)
    .sort((a, b) =>
      String(b.updated ?? b.date).localeCompare(String(a.updated ?? a.date))
    )
    .slice(0, 8);

  return (
    <div>
      <h1 className="font-serif text-4xl tracking-tight mb-2">Welcome back.</h1>
      <p className="text-stone-500 text-sm mb-8">
        {published.length} live · {drafts.length} in draft · {media.length} images —
        press <kbd className="font-mono text-[11px] border border-ink/15 px-1.5 py-0.5">⌘K</kbd> to
        jump anywhere.
      </p>

      <div className="flex flex-wrap gap-2 mb-12">
        {QUICK_ACTIONS.map((a) => (
          <Link
            key={a.href + a.label}
            href={a.href}
            className="border border-ink/20 px-4 py-2 text-xs font-mono uppercase tracking-wider hover:bg-ink hover:text-paper transition-colors"
          >
            {a.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {COLLECTIONS.map((c, i) => {
          const entries = lists[i];
          const live = entries.filter((e) => e.visibility === "published").length;
          const hidden = entries.length - live;
          return (
            <Link
              key={c.key}
              href={`/admin/${c.key}`}
              className="bg-paper border border-ink/10 p-6 hover:border-ink/30 transition-colors"
            >
              <div className="font-serif text-5xl mb-2">{entries.length}</div>
              <div className="label">{c.label}</div>
              <div className="mt-1 text-xs text-stone-400">
                {live} live{hidden > 0 ? ` · ${hidden} hidden` : ""}
              </div>
            </Link>
          );
        })}
        <Link
          href="/admin/media"
          className="bg-paper border border-ink/10 p-6 hover:border-ink/30 transition-colors"
        >
          <div className="font-serif text-5xl mb-2">{media.length}</div>
          <div className="label">Images</div>
          <div className="mt-1 text-xs text-stone-400">media library</div>
        </Link>
      </div>

      {recent.length > 0 && (
        <div className="mb-12">
          <div className="label mb-4">Recently edited</div>
          <div className="border-t border-ink/10">
            {recent.map((e) => (
              <Link
                key={e.path}
                href={`/admin/${e.collection}/${e.slug}`}
                className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-3 px-2 -mx-2 hover:bg-paper transition-colors"
              >
                <span className="text-sm truncate">{e.title}</span>
                <span className="flex items-baseline gap-4 shrink-0 text-xs text-stone-400">
                  <span className="font-mono uppercase tracking-wider text-[10px]">
                    {e.collectionLabel}
                    {e.visibility !== "published" ? ` · ${e.visibility}` : ""}
                  </span>
                  <span className="tabular-nums">
                    {String(e.updated ?? e.date).slice(0, 10)}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

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

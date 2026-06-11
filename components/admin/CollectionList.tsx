"use client";

/*
 * Collection list — searchable, filterable by visibility, with one-click
 * archive / restore / delete so nothing requires opening the editor.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getCollection } from "@/lib/cms-schema";

type Entry = {
  slug: string;
  path: string;
  title: string;
  date: string | null;
  updated: string | null;
  status: string | null;
  visibility: "published" | "draft" | "private" | "archived";
  excerpt: string;
};

const FILTERS = ["all", "published", "draft", "private", "archived"] as const;
type Filter = (typeof FILTERS)[number];

const BADGE: Record<Entry["visibility"], string> = {
  published: "text-moss",
  draft: "text-butter",
  private: "text-stone-400",
  archived: "text-stone-400 line-through",
};

export default function CollectionList({ collectionKey }: { collectionKey: string }) {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [busy, setBusy] = useState<string | null>(null); // path being mutated

  const col = getCollection(collectionKey);
  const statusOptions = col?.fields.find((f) => f.key === "status")?.options ?? [];
  const archivedValue = statusOptions.find((o) => o.startsWith("archiv")) ?? "archived";
  const publishedValue = statusOptions[0] ?? "published";

  async function load() {
    const res = await fetch(`/api/admin/content?collection=${collectionKey}`);
    const json = await res.json();
    if (res.ok) setEntries(json.entries);
    else setError(json.error ?? "Failed to load.");
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionKey]);

  async function setStatus(e: Entry, status: string) {
    setBusy(e.path);
    const res = await fetch("/api/admin/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: e.path, patch: { status } }),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? "Update failed.");
    }
    await load();
    setBusy(null);
  }

  async function remove(e: Entry) {
    if (!confirm(`Delete “${e.title}” permanently? This removes it from the vault too.`)) return;
    setBusy(e.path);
    const res = await fetch(`/api/admin/content?path=${encodeURIComponent(e.path)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? "Delete failed.");
    }
    await load();
    setBusy(null);
  }

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: 0, published: 0, draft: 0, private: 0, archived: 0 };
    for (const e of entries ?? []) {
      c.all++;
      c[e.visibility]++;
    }
    return c;
  }, [entries]);

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return (entries ?? []).filter((e) => {
      if (filter !== "all" && e.visibility !== filter) return false;
      if (!needle) return true;
      return (
        e.title.toLowerCase().includes(needle) ||
        e.slug.includes(needle) ||
        e.excerpt.toLowerCase().includes(needle)
      );
    });
  }, [entries, q, filter]);

  if (error && !entries) return <div className="text-terracotta text-sm">{error}</div>;
  if (!entries) return <div className="text-stone-500 text-sm">Loading…</div>;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${collectionKey}…`}
          className="admin-input !w-64"
        />
        <div className="flex gap-1">
          {FILTERS.map((f) =>
            f === "all" || counts[f] > 0 ? (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                  filter === f
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/15 text-stone-500 hover:border-ink/40"
                }`}
              >
                {f} {counts[f]}
              </button>
            ) : null
          )}
        </div>
      </div>

      {error && <div className="text-terracotta text-sm mb-4">{error}</div>}

      {visible.length === 0 ? (
        <div className="text-stone-500 text-sm border-t border-ink/10 pt-6">
          {entries.length === 0 ? "Nothing here yet — create the first entry." : "No matches."}
        </div>
      ) : (
        <div className="border-t border-ink/10">
          {visible.map((e) => {
            const isArchived = e.visibility === "archived";
            return (
              <div
                key={e.slug}
                className={`group flex items-baseline gap-4 border-b border-ink/10 py-3.5 px-2 -mx-2 hover:bg-paper transition-colors ${
                  busy === e.path ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                <Link href={`/admin/${collectionKey}/${e.slug}`} className="flex-1 min-w-0">
                  <span className={`text-sm ${isArchived ? "text-stone-400" : ""}`}>{e.title}</span>
                  <span className="ml-3 text-xs text-stone-400 font-mono">{e.slug}</span>
                </Link>
                <span className={`shrink-0 font-mono text-[10px] uppercase tracking-wider ${BADGE[e.visibility]}`}>
                  {e.visibility}
                </span>
                <span className="shrink-0 text-xs text-stone-400 tabular-nums w-20 text-right">
                  {(e.updated ?? e.date ?? "").slice(0, 10)}
                </span>
                <span className="shrink-0 flex gap-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {isArchived ? (
                    <button
                      type="button"
                      onClick={() => setStatus(e, publishedValue)}
                      className="text-stone-500 hover:text-moss cursor-pointer"
                    >
                      restore
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setStatus(e, archivedValue)}
                      className="text-stone-500 hover:text-ink cursor-pointer"
                      title="Hide from the public site without deleting"
                    >
                      archive
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(e)}
                    className="text-stone-500 hover:text-terracotta cursor-pointer"
                  >
                    delete
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

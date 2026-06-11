"use client";

/*
 * Library hub — three tabbed archives:
 *   Notes        — wiki knowledge notes (internal)
 *   Field Notes  — raw working notes / drafts (internal)
 *   Reading      — saved articles, links out to source
 * Each tab has search, topic grouping, and inline quick-preview.
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Note, ReadingItem } from "@/lib/content";

type Tab = "notes" | "field" | "reading";

export default function LibraryHub({
  notes,
  fieldNotes,
  reading,
  initial = "notes",
}: {
  notes: Note[];
  fieldNotes: Note[];
  reading: ReadingItem[];
  initial?: Tab;
}) {
  const [tab, setTab] = useState<Tab>(initial);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "notes", label: "Notes", count: notes.length },
    { key: "field", label: "Field Notes", count: fieldNotes.length },
    { key: "reading", label: "Reading", count: reading.length },
  ];

  const rows: (Note | ReadingItem)[] =
    tab === "notes" ? notes : tab === "field" ? fieldNotes : reading;

  const topics = useMemo(() => {
    const t = new Map<string, number>();
    rows.forEach((r) => t.set(r.topic, (t.get(r.topic) ?? 0) + 1));
    return [...t.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const inTopic = !topic || r.topic === topic;
      const inQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q);
      return inTopic && inQuery;
    });
  }, [rows, query, topic]);

  const groups = useMemo(() => {
    const g = new Map<string, (Note | ReadingItem)[]>();
    filtered.forEach((r) => g.set(r.topic, [...(g.get(r.topic) ?? []), r]));
    return [...g.entries()];
  }, [filtered]);

  function switchTab(t: Tab) {
    setTab(t);
    setTopic(null);
    setQuery("");
    setOpenSlug(null);
  }

  const isReading = tab === "reading";

  return (
    <div>
      {/* Tabs */}
      <div role="tablist" aria-label="Library sections" className="flex flex-wrap gap-2 border-b border-ink/15 pb-4 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => switchTab(t.key)}
            className={`px-5 py-2 text-sm transition-colors cursor-pointer ${
              tab === t.key ? "bg-ink text-paper" : "border border-ink/25 hover:bg-ivory"
            }`}
          >
            {t.label} <span className="opacity-60">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Search + topic filters */}
      <div className="flex flex-col md:flex-row md:items-end gap-6 mb-10">
        <div className="flex-1 max-w-md">
          <label htmlFor="lib-search" className="admin-label">
            Search {isReading ? "reading" : "notes"}
          </label>
          <input
            id="lib-search"
            type="search"
            placeholder="Search titles and summaries…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="admin-input"
          />
        </div>
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTopic(null)}
            aria-pressed={topic === null}
            className={`border px-4 py-1.5 text-sm transition-colors cursor-pointer ${
              topic === null ? "bg-ink text-paper border-ink" : "border-ink/25 hover:bg-ivory"
            }`}
          >
            All
          </button>
          {topics.map(([t, n]) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(topic === t ? null : t)}
              aria-pressed={topic === t}
              className={`border px-4 py-1.5 text-sm transition-colors cursor-pointer ${
                topic === t ? "bg-ink text-paper border-ink" : "border-ink/25 hover:bg-ivory"
              }`}
            >
              {t} ({n})
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-stone-600 py-12">Nothing matches — try another word or clear the filter.</p>
      ) : (
        <div className="space-y-12">
          {groups.map(([t, items]) => (
            <section key={t} aria-label={t}>
              <h2 className="eyebrow mb-5">{t}</h2>
              <ul className="border-t border-ink/15 list-none">
                {items.map((r) => {
                  const open = openSlug === r.slug;
                  const href = isReading
                    ? (r as ReadingItem).source
                    : `/${tab === "notes" ? "notes" : "field-notes"}/${r.slug}`;
                  const external = isReading;
                  return (
                    <li key={r.slug} className="border-b border-ink/15">
                      <div className="grid grid-cols-12 gap-4 items-baseline py-5">
                        <div className="col-span-12 md:col-span-8">
                          <a
                            href={href}
                            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                            className="group inline-flex items-baseline gap-2"
                          >
                            <h3 className="font-serif text-xl md:text-2xl tracking-tight leading-tight group-hover:text-butter transition-colors">
                              {r.title}
                            </h3>
                            <span aria-hidden className="text-stone-500 transition-transform duration-200 group-hover:translate-x-1">
                              {external ? "↗" : "→"}
                            </span>
                          </a>
                          {external && (
                            <span className="block mt-1 font-mono text-xs text-stone-500 truncate">
                              {hostOf((r as ReadingItem).source)}
                            </span>
                          )}
                        </div>
                        <div className="col-span-12 md:col-span-4 md:text-right">
                          <button
                            type="button"
                            onClick={() => setOpenSlug(open ? null : r.slug)}
                            aria-expanded={open}
                            className="link-inline text-sm text-stone-600 cursor-pointer"
                          >
                            {open ? "Hide preview" : "Quick preview"}
                          </button>
                        </div>
                      </div>
                      {open && (
                        <div className="pb-6 -mt-1 max-w-2xl">
                          <p className="text-stone-700 leading-relaxed">{r.summary}</p>
                          <a
                            href={href}
                            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                            className="link-inline text-sm mt-2 inline-block"
                          >
                            {external ? "Read at source ↗" : "Read the full note →"}
                          </a>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

"use client";

/*
 * Notes index — search + topic filter over knowledge notes, grouped by
 * topic. Each row has a quick-preview toggle (expands the summary inline)
 * plus a link to the full note.
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Note } from "@/lib/content";

export default function NotesIndex({ notes }: { notes: Note[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const topics = useMemo(() => {
    const t = new Map<string, number>();
    notes.forEach((n) => t.set(n.topic, (t.get(n.topic) ?? 0) + 1));
    return [...t.entries()].sort((a, b) => b[1] - a[1]);
  }, [notes]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notes.filter((n) => {
      const inTopic = !topic || n.topic === topic;
      const inQuery =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q);
      return inTopic && inQuery;
    });
  }, [notes, query, topic]);

  const groups = useMemo(() => {
    const g = new Map<string, Note[]>();
    filtered.forEach((n) => g.set(n.topic, [...(g.get(n.topic) ?? []), n]));
    return [...g.entries()];
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
        <div className="flex-1 max-w-md">
          <label htmlFor="notes-search" className="admin-label">
            Search notes
          </label>
          <input
            id="notes-search"
            type="search"
            placeholder="e.g. uranium, GANs, SORA, philosophy…"
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
            All ({notes.length})
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
        <div className="space-y-14">
          {groups.map(([t, items]) => (
            <section key={t} aria-label={t}>
              <h2 className="eyebrow mb-5">{t}</h2>
              <ul className="border-t border-ink/15 list-none">
                {items.map((note) => {
                  const open = openSlug === note.slug;
                  return (
                    <li key={note.slug} className="border-b border-ink/15">
                      <div className="grid grid-cols-12 gap-4 items-baseline py-5 md:py-6">
                        <div className="col-span-12 md:col-span-8">
                          <Link
                            href={`/notes/${note.slug}`}
                            className="group inline-flex items-baseline gap-2"
                          >
                            <h3 className="font-serif text-xl md:text-2xl tracking-tight leading-tight group-hover:text-butter transition-colors">
                              {note.title}
                            </h3>
                            <span
                              aria-hidden
                              className="text-stone-500 transition-transform duration-200 group-hover:translate-x-1"
                            >
                              →
                            </span>
                          </Link>
                        </div>
                        <div className="col-span-12 md:col-span-4 md:text-right">
                          <button
                            type="button"
                            onClick={() => setOpenSlug(open ? null : note.slug)}
                            aria-expanded={open}
                            className="link-inline text-sm text-stone-600 cursor-pointer"
                          >
                            {open ? "Hide preview" : "Quick preview"}
                          </button>
                        </div>
                      </div>
                      {open && (
                        <div className="pb-6 -mt-1 max-w-2xl">
                          <p className="text-stone-700 leading-relaxed">{note.summary}</p>
                          <Link
                            href={`/notes/${note.slug}`}
                            className="link-inline text-sm mt-2 inline-block"
                          >
                            Read the full note →
                          </Link>
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

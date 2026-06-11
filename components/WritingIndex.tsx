"use client";

/*
 * Writing index — client-side search and tag filtering over the essay
 * list. Labeled search input, pressable tag filters, grouped results.
 */

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Essay } from "@/lib/content";

export default function WritingIndex({ essays }: { essays: Essay[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const t = new Map<string, number>();
    essays.forEach((e) => {
      const k = e.tag?.trim() || "Notes";
      t.set(k, (t.get(k) ?? 0) + 1);
    });
    return [...t.entries()].sort((a, b) => b[1] - a[1]);
  }, [essays]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return essays.filter((e) => {
      const inTag = !tag || (e.tag?.trim() || "Notes") === tag;
      const inQuery =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.excerpt.toLowerCase().includes(q);
      return inTag && inQuery;
    });
  }, [essays, query, tag]);

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
        <div className="flex-1 max-w-md">
          <label htmlFor="writing-search" className="admin-label">
            Search essays
          </label>
          <input
            id="writing-search"
            type="search"
            placeholder="e.g. compounding, uranium, agents…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="admin-input"
          />
        </div>
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTag(null)}
            aria-pressed={tag === null}
            className={`border px-4 py-1.5 text-sm transition-colors cursor-pointer ${
              tag === null
                ? "bg-ink text-paper border-ink"
                : "border-ink/25 hover:bg-ivory"
            }`}
          >
            All ({essays.length})
          </button>
          {tags.map(([t, n]) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(tag === t ? null : t)}
              aria-pressed={tag === t}
              className={`border px-4 py-1.5 text-sm transition-colors cursor-pointer ${
                tag === t
                  ? "bg-ink text-paper border-ink"
                  : "border-ink/25 hover:bg-ivory"
              }`}
            >
              {t} ({n})
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-stone-600 py-12">
          Nothing matches — try a different word or clear the filter.
        </p>
      ) : (
        <ul className="border-t border-ink/15 list-none">
          {filtered.map((essay) => (
            <li key={essay.slug}>
              <Link
                href={`/writing/${essay.slug}`}
                className="group grid grid-cols-12 gap-4 items-baseline border-b border-ink/15 py-7 md:py-8 hover:bg-ivory/60 transition-colors px-2 -mx-2"
              >
                <div className="col-span-12 md:col-span-2 font-mono text-sm text-stone-500 tabular-nums">
                  {essay.date}
                </div>
                <div className="col-span-12 md:col-span-8">
                  <h2 className="font-serif text-2xl md:text-3xl tracking-tight leading-tight">
                    {essay.title}
                  </h2>
                  <p className="mt-2 text-stone-600 text-base max-w-2xl">{essay.excerpt}</p>
                </div>
                <div className="hidden md:flex col-span-2 justify-end items-center gap-4">
                  <span className="label text-stone-500">{essay.tag?.trim() || "Notes"}</span>
                  <span
                    aria-hidden
                    className="text-stone-500 transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

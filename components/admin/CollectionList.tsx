"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Entry = {
  slug: string;
  path: string;
  title: string;
  date: string | null;
  status: string | null;
};

export default function CollectionList({ collectionKey }: { collectionKey: string }) {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/content?collection=${collectionKey}`);
      const json = await res.json();
      if (res.ok) setEntries(json.entries);
      else setError(json.error ?? "Failed to load.");
    })();
  }, [collectionKey]);

  if (error) return <div className="text-terracotta text-sm">{error}</div>;
  if (!entries) return <div className="text-stone-500 text-sm">Loading…</div>;
  if (!entries.length)
    return <div className="text-stone-500 text-sm">Nothing here yet — create the first entry.</div>;

  return (
    <div className="border-t border-ink/10">
      {entries.map((e) => (
        <Link
          key={e.slug}
          href={`/admin/${collectionKey}/${e.slug}`}
          className="flex items-baseline justify-between gap-4 border-b border-ink/10 py-4 hover:bg-paper px-2 -mx-2 transition-colors"
        >
          <div>
            <span className="text-sm">{e.title}</span>
            <span className="ml-3 text-xs text-stone-400 font-mono">{e.slug}</span>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-xs text-stone-400">
            {e.status === "archive" && <span className="label">archived</span>}
            {e.date && <span className="tabular-nums">{String(e.date).slice(0, 10)}</span>}
          </div>
        </Link>
      ))}
    </div>
  );
}

// Shared entry-listing layer for the studio — used by the content API,
// the search API and the dashboard. Reads through lib/cms so it works in
// both local (filesystem) and github (Contents API) modes.

import matter from "gray-matter";
import { listContentFiles, readContentFile } from "./cms";
import { COLLECTIONS, type Collection } from "./cms-schema";

export type EntrySummary = {
  collection: string;
  collectionLabel: string;
  slug: string;
  path: string;
  title: string;
  date: string | null;
  updated: string | null;
  status: string | null;
  visibility: Visibility;
  excerpt: string;
};

// Status values vary per collection ("selected" vs "published", "archive"
// vs "archived") — normalize them into one visibility vocabulary.
export type Visibility = "published" | "draft" | "private" | "archived";

export function visibilityOf(status: unknown): Visibility {
  const s = String(status ?? "").toLowerCase();
  if (s === "draft") return "draft";
  if (s === "private") return "private";
  if (s === "archive" || s === "archived") return "archived";
  return "published";
}

function firstString(...vals: unknown[]): string {
  for (const v of vals) if (typeof v === "string" && v.trim()) return v.trim();
  return "";
}

export async function listEntries(col: Collection): Promise<EntrySummary[]> {
  const files = await listContentFiles(col.dir);
  const entries = await Promise.all(
    files.map(async (name) => {
      const raw = await readContentFile(`${col.dir}/${name}`);
      const { data } = raw ? matter(raw) : { data: {} as Record<string, unknown> };
      const status = (data.status as string) ?? null;
      return {
        collection: col.key,
        collectionLabel: col.label,
        slug: name.replace(/\.md$/, ""),
        path: `${col.dir}/${name}`,
        title: firstString(data.title) || name.replace(/\.md$/, ""),
        date: data.date ? String(data.date).slice(0, 10) : null,
        updated: data.updated ? String(data.updated) : null,
        status,
        visibility: visibilityOf(status),
        excerpt: firstString(data.summary, data.excerpt, data.caption).slice(0, 200),
      } satisfies EntrySummary;
    })
  );
  return entries.sort((a, b) =>
    String(b.updated ?? b.date ?? "").localeCompare(String(a.updated ?? a.date ?? ""))
  );
}

export async function listAllEntries(): Promise<EntrySummary[]> {
  const lists = await Promise.all(COLLECTIONS.map(listEntries));
  return lists.flat();
}

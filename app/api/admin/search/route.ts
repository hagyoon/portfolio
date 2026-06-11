import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import { listContentFiles, readContentFile } from "@/lib/cms";
import { COLLECTIONS } from "@/lib/cms-schema";
import { visibilityOf } from "@/lib/cms-list";

export const runtime = "nodejs";

export type SearchHit = {
  collection: string;
  collectionLabel: string;
  slug: string;
  title: string;
  visibility: string;
  snippet: string;
  // Higher = better. Title matches beat tag/topic matches beat body matches.
  score: number;
};

function snippetAround(text: string, q: string): string {
  const idx = text.toLowerCase().indexOf(q);
  if (idx < 0) return text.slice(0, 120);
  const start = Math.max(0, idx - 50);
  return (start > 0 ? "…" : "") + text.slice(start, idx + q.length + 70).trim() + "…";
}

// GET ?q=term → ranked hits across every collection (title, tags, topic,
// summary, body). Studio-only; protected by middleware like the rest of
// /api/admin.
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim().toLowerCase();
  if (q.length < 2) return NextResponse.json({ hits: [] });

  try {
    const hits: SearchHit[] = [];
    await Promise.all(
      COLLECTIONS.map(async (col) => {
        const files = await listContentFiles(col.dir);
        await Promise.all(
          files.map(async (name) => {
            const raw = await readContentFile(`${col.dir}/${name}`);
            if (!raw) return;
            const { data, content } = matter(raw);
            const slug = name.replace(/\.md$/, "");
            const title = String(data.title ?? slug);
            const meta = [data.tag, data.topic, data.domain, data.client]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
            const summary = String(data.summary ?? data.excerpt ?? data.caption ?? "");
            const body = content;

            let score = 0;
            let snippet = summary.slice(0, 120);
            if (title.toLowerCase().includes(q) || slug.includes(q)) {
              score = 3;
            } else if (meta.includes(q)) {
              score = 2;
              snippet = summary.slice(0, 120) || snippetAround(body, q);
            } else if (summary.toLowerCase().includes(q)) {
              score = 2;
              snippet = snippetAround(summary, q);
            } else if (body.toLowerCase().includes(q)) {
              score = 1;
              snippet = snippetAround(body, q);
            }
            if (!score) return;

            hits.push({
              collection: col.key,
              collectionLabel: col.label,
              slug,
              title,
              visibility: visibilityOf(data.status),
              snippet,
              score,
            });
          })
        );
      })
    );

    hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
    return NextResponse.json({ hits: hits.slice(0, 20) });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Search failed" },
      { status: 500 }
    );
  }
}

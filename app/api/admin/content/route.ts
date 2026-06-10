import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import {
  listContentFiles,
  readContentFile,
  writeContentFile,
  deleteContentFile,
  cmsMode,
} from "@/lib/cms";
import { getCollection } from "@/lib/cms-schema";

export const runtime = "nodejs";

// GET ?collection=projects            → list entries with parsed titles
// GET ?path=projects/foo.md           → single file, parsed
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const collection = searchParams.get("collection");
  const filePath = searchParams.get("path");

  try {
    if (filePath) {
      const raw = await readContentFile(filePath);
      if (raw === null) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      const { data, content } = matter(raw);
      return NextResponse.json({ path: filePath, frontmatter: data, body: content });
    }

    if (collection) {
      const col = getCollection(collection);
      if (!col) {
        return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
      }
      const files = await listContentFiles(col.dir);
      const entries = await Promise.all(
        files.map(async (name) => {
          const raw = await readContentFile(`${col.dir}/${name}`);
          const { data } = raw ? matter(raw) : { data: {} as Record<string, unknown> };
          return {
            slug: name.replace(/\.md$/, ""),
            path: `${col.dir}/${name}`,
            title: (data.title as string) ?? name,
            date: (data.date as string) ?? null,
            status: (data.status as string) ?? null,
          };
        })
      );
      return NextResponse.json({ entries, mode: cmsMode() });
    }

    return NextResponse.json({ error: "collection or path required" }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Read failed" },
      { status: 500 }
    );
  }
}

// PUT { path, frontmatter, body } — serialize and save (commits in prod)
export async function PUT(req: NextRequest) {
  try {
    const { path: filePath, frontmatter, body } = await req.json();
    if (typeof filePath !== "string" || !filePath.endsWith(".md")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    const raw = matter.stringify(body ?? "", frontmatter ?? {});
    await writeContentFile(filePath, raw);
    return NextResponse.json({ ok: true, mode: cmsMode() });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Save failed" },
      { status: 500 }
    );
  }
}

// DELETE ?path=projects/foo.md
export async function DELETE(req: NextRequest) {
  const filePath = req.nextUrl.searchParams.get("path");
  if (!filePath || !filePath.endsWith(".md")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  try {
    await deleteContentFile(filePath);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Delete failed" },
      { status: 500 }
    );
  }
}

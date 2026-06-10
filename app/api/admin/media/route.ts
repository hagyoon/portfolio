import { NextRequest, NextResponse } from "next/server";
import { listMedia, saveMedia, deleteMedia, isAllowedImageName, cmsMode } from "@/lib/cms";

export const runtime = "nodejs";

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB per file

export async function GET() {
  try {
    const items = await listMedia();
    return NextResponse.json({ items, mode: cmsMode() });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "List failed" },
      { status: 500 }
    );
  }
}

// POST multipart/form-data with one or more "file" entries
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const files = form.getAll("file").filter((f): f is File => f instanceof File);
    if (!files.length) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }
    const saved = [];
    for (const file of files) {
      if (!isAllowedImageName(file.name)) {
        return NextResponse.json(
          { error: `Unsupported format: ${file.name}. Allowed: jpg, png, webp, gif, svg, avif.` },
          { status: 415 }
        );
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json(
          { error: `${file.name} is over 20 MB.` },
          { status: 413 }
        );
      }
      const buf = Buffer.from(await file.arrayBuffer());
      saved.push(await saveMedia(file.name, buf));
    }
    return NextResponse.json({ items: saved });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  if (!name) {
    return NextResponse.json({ error: "name required" }, { status: 400 });
  }
  try {
    await deleteMedia(name);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Delete failed" },
      { status: 500 }
    );
  }
}

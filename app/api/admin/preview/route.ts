import { NextRequest, NextResponse } from "next/server";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export const runtime = "nodejs";

// POST { markdown } → { html } — used by the editor's live preview pane.
export async function POST(req: NextRequest) {
  const { markdown } = await req.json().catch(() => ({ markdown: "" }));
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(typeof markdown === "string" ? markdown : "");
  return NextResponse.json({ html: processed.toString() });
}

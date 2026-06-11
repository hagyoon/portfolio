"use client";

/*
 * Generic entry editor — schema-driven frontmatter fields, markdown body
 * with a live split-pane preview, image insert/upload at the cursor, and
 * one-click content blocks. Saves commit straight to GitHub in production
 * (vault first, then site repo → instant deploy). ⌘S saves.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Collection, Field } from "@/lib/cms-schema";
import { MediaPickerModal } from "@/components/admin/MediaGrid";

type Frontmatter = Record<string, any>;

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

const BLOCKS: { label: string; snippet: string }[] = [
  { label: "Quote", snippet: '> “The quote goes here.”\n> — Attribution\n' },
  { label: "Callout", snippet: "> **Note** — something worth pulling out of the flow.\n" },
  { label: "Image + caption", snippet: "![Alt text](/uploads/your-image.webp)\n*Caption for the image above.*\n" },
  { label: "Divider", snippet: "\n---\n" },
  {
    label: "Table",
    snippet: "| Column | Column |\n| --- | --- |\n| Cell | Cell |\n",
  },
  { label: "Link card", snippet: "[→ Title of the link](https://example.com)\n" },
];

export default function EntryEditor({
  collection,
  slug,
}: {
  collection: Collection;
  slug?: string; // undefined = new entry
}) {
  const router = useRouter();
  const isNew = !slug;
  const [fm, setFm] = useState<Frontmatter>({});
  const [body, setBody] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [split, setSplit] = useState(true);
  const [previewHtml, setPreviewHtml] = useState("");
  const [pickerFor, setPickerFor] = useState<string | null>(null); // field key or "__body__"
  const [blocksOpen, setBlocksOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const res = await fetch(
        `/api/admin/content?path=${encodeURIComponent(`${collection.dir}/${slug}.md`)}`
      );
      const json = await res.json();
      if (res.ok) {
        setFm(json.frontmatter ?? {});
        setBody(json.body ?? "");
      } else {
        setError(json.error ?? "Failed to load.");
      }
      setLoading(false);
    })();
  }, [collection.dir, slug, isNew]);

  // Live preview — debounce keystrokes, render through the same remark
  // pipeline the site uses, so what you see is what deploys.
  useEffect(() => {
    if (!split || !collection.hasBody) return;
    clearTimeout(previewTimer.current);
    previewTimer.current = setTimeout(async () => {
      const res = await fetch("/api/admin/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown: body }),
      });
      const json = await res.json().catch(() => ({ html: "" }));
      setPreviewHtml(json.html ?? "");
    }, 350);
    return () => clearTimeout(previewTimer.current);
  }, [body, split, collection.hasBody]);

  function set(key: string, value: any) {
    setFm((f) => ({ ...f, [key]: value }));
    if (isNew && key === "title" && !slugTouched) setNewSlug(slugify(value));
  }

  const insertAtCursor = useCallback((text: string) => {
    const ta = bodyRef.current;
    setBody((prev) => {
      if (!ta) return prev + "\n" + text;
      const start = ta.selectionStart ?? prev.length;
      const end = ta.selectionEnd ?? prev.length;
      const next = prev.slice(0, start) + text + prev.slice(end);
      requestAnimationFrame(() => {
        ta.focus();
        ta.selectionStart = ta.selectionEnd = start + text.length;
      });
      return next;
    });
  }, []);

  async function uploadAndInsert(files: FileList) {
    setUploading(true);
    setError(null);
    const form = new FormData();
    for (const f of Array.from(files)) form.append("file", f);
    const res = await fetch("/api/admin/media", { method: "POST", body: form });
    const json = await res.json().catch(() => ({}));
    setUploading(false);
    if (!res.ok) {
      setError(json.error ?? "Upload failed.");
      return;
    }
    for (const item of json.items ?? []) {
      insertAtCursor(`\n![${item.name.replace(/\.[a-z]+$/, "").replace(/-/g, " ")}](${item.path})\n`);
    }
  }

  const save = useCallback(async () => {
    const finalSlug = isNew ? newSlug : slug;
    if (!finalSlug) {
      setError("Set a slug first.");
      return;
    }
    setSaving(true);
    setError(null);
    setStatus(null);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: `${collection.dir}/${finalSlug}.md`,
        frontmatter: fm,
        body,
      }),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(json.error ?? "Save failed.");
      return;
    }
    setStatus(
      json.mode === "github"
        ? "Saved — committed to the vault and the site. Deploy is on its way."
        : "Saved locally."
    );
    if (isNew) router.replace(`/admin/${collection.key}/${finalSlug}`);
  }, [isNew, newSlug, slug, collection.dir, collection.key, fm, body, router]);

  // ⌘S / Ctrl+S anywhere in the editor
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        save();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save]);

  async function remove() {
    if (!slug) return;
    if (!confirm(`Delete “${fm.title ?? slug}”? This removes it from the vault too.`)) return;
    const res = await fetch(
      `/api/admin/content?path=${encodeURIComponent(`${collection.dir}/${slug}.md`)}`,
      { method: "DELETE" }
    );
    if (res.ok) router.push(`/admin/${collection.key}`);
    else {
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? "Delete failed.");
    }
  }

  if (loading) return <div className="text-stone-500 text-sm">Loading…</div>;

  return (
    <div className="space-y-6">
      <MediaPickerModal
        open={pickerFor !== null}
        onClose={() => setPickerFor(null)}
        onSelect={(p) => {
          if (!pickerFor) return;
          if (pickerFor === "__body__") insertAtCursor(`\n![](${p})\n`);
          else set(pickerFor, p);
        }}
      />

      {isNew && (
        <div>
          <label className="admin-label">Slug (filename / URL)</label>
          <input
            className="admin-input font-mono"
            value={newSlug}
            onChange={(e) => {
              setSlugTouched(true);
              setNewSlug(slugify(e.target.value));
            }}
            placeholder="my-new-entry"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {collection.fields.map((field) => (
          <FieldInput
            key={field.key}
            field={field}
            value={fm[field.key]}
            onChange={(v) => set(field.key, v)}
            onPickImage={() => setPickerFor(field.key)}
          />
        ))}
      </div>

      {collection.hasBody && (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <label className="admin-label mb-0">Body (markdown)</label>
            <div className="flex items-center gap-4 text-xs">
              <button
                type="button"
                onClick={() => setPickerFor("__body__")}
                className="text-stone-500 hover:text-ink cursor-pointer"
              >
                Insert image
              </button>
              <label className="text-stone-500 hover:text-ink cursor-pointer">
                {uploading ? "Uploading…" : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files?.length && uploadAndInsert(e.target.files)}
                />
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setBlocksOpen((o) => !o)}
                  className="text-stone-500 hover:text-ink cursor-pointer"
                >
                  Blocks ▾
                </button>
                {blocksOpen && (
                  <div className="absolute right-0 top-6 z-20 bg-ivory border border-ink/15 shadow-lg min-w-44">
                    {BLOCKS.map((b) => (
                      <button
                        key={b.label}
                        type="button"
                        onClick={() => {
                          insertAtCursor("\n" + b.snippet);
                          setBlocksOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-paper cursor-pointer"
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSplit((s) => !s)}
                className="text-stone-500 hover:text-ink cursor-pointer font-mono"
              >
                {split ? "Editor only" : "Split preview"}
              </button>
            </div>
          </div>

          <div className={split ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : ""}>
            <textarea
              ref={bodyRef}
              className="admin-input font-mono text-[13px] leading-relaxed min-h-[28rem]"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            {split && (
              <div
                className="prose-editorial bg-bone border border-ink/15 px-5 py-4 min-h-[28rem] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            )}
          </div>
        </div>
      )}

      {error && <div className="text-terracotta text-sm">{error}</div>}
      {status && <div className="text-moss text-sm">{status}</div>}

      <div className="flex items-center gap-4 pt-2">
        <button
          onClick={save}
          disabled={saving}
          className="bg-ink text-paper px-8 py-3 label hover:opacity-85 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <span className="font-mono text-[10px] text-stone-400">⌘S</span>
        {!isNew && (
          <button
            onClick={remove}
            className="text-sm text-stone-500 hover:text-terracotta transition-colors cursor-pointer ml-auto"
          >
            Delete entry
          </button>
        )}
        {fm.updated && (
          <span className={`text-xs text-stone-400 ${isNew ? "ml-auto" : ""}`}>
            Last edited {String(fm.updated).slice(0, 16).replace("T", " · ")}
          </span>
        )}
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  onPickImage,
}: {
  field: Field;
  value: any;
  onChange: (v: any) => void;
  onPickImage: () => void;
}) {
  const wide = field.type === "textarea" || field.type === "list";
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <label className="admin-label">
        {field.label}
        {field.hint && <span className="normal-case tracking-normal text-stone-400"> — {field.hint}</span>}
      </label>
      {field.type === "text" && (
        <input className="admin-input" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.type === "date" && (
        <input
          type="date"
          className="admin-input"
          value={value ? String(value).slice(0, 10) : ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.type === "textarea" && (
        <textarea
          className="admin-input min-h-[5rem]"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.type === "select" && (
        <select className="admin-input" value={value ?? field.options?.[0]} onChange={(e) => onChange(e.target.value)}>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
      {field.type === "list" && (
        <textarea
          className="admin-input min-h-[4rem] font-mono text-[13px]"
          value={Array.isArray(value) ? value.join("\n") : value ?? ""}
          onChange={(e) => onChange(e.target.value.split("\n").filter((l) => l.trim() !== ""))}
        />
      )}
      {field.type === "image" && (
        <div className="flex gap-2 items-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="w-10 h-10 object-cover border border-ink/10 bg-bone shrink-0" />
          ) : null}
          <input
            className="admin-input font-mono text-[13px]"
            value={value ?? ""}
            placeholder="/uploads/…"
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            onClick={onPickImage}
            className="shrink-0 border border-ink/20 px-4 py-2 text-xs hover:bg-paper transition-colors cursor-pointer"
          >
            Choose
          </button>
        </div>
      )}
    </div>
  );
}

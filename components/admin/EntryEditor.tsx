"use client";

/*
 * Generic entry editor — schema-driven frontmatter fields, markdown body
 * with live preview, image picker, save / delete. Saves commit straight to
 * GitHub in production (vault first, then site repo → instant deploy).
 */

import { useEffect, useState } from "react";
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
  const [preview, setPreview] = useState<string | null>(null);
  const [pickerFor, setPickerFor] = useState<string | null>(null);

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

  function set(key: string, value: any) {
    setFm((f) => ({ ...f, [key]: value }));
    if (isNew && key === "title" && !slugTouched) setNewSlug(slugify(value));
  }

  async function save() {
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
  }

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

  async function togglePreview() {
    if (preview !== null) {
      setPreview(null);
      return;
    }
    const res = await fetch("/api/admin/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markdown: body }),
    });
    const json = await res.json();
    setPreview(json.html ?? "");
  }

  if (loading) return <div className="text-stone-500 text-sm">Loading…</div>;

  return (
    <div className="space-y-6">
      <MediaPickerModal
        open={pickerFor !== null}
        onClose={() => setPickerFor(null)}
        onSelect={(p) => pickerFor && set(pickerFor, p)}
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
          <div className="flex items-center justify-between mb-1.5">
            <label className="admin-label mb-0">Body (markdown)</label>
            <button
              type="button"
              onClick={togglePreview}
              className="text-xs text-stone-500 hover:text-ink cursor-pointer"
            >
              {preview !== null ? "Edit" : "Preview"}
            </button>
          </div>
          {preview !== null ? (
            <div
              className="prose-editorial bg-bone border border-ink/15 px-5 py-4 min-h-[20rem]"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          ) : (
            <textarea
              className="admin-input font-mono text-[13px] leading-relaxed min-h-[20rem]"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          )}
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
          {saving ? "Publishing…" : "Save & publish"}
        </button>
        {!isNew && (
          <button
            onClick={remove}
            className="text-sm text-stone-500 hover:text-terracotta transition-colors cursor-pointer"
          >
            Delete entry
          </button>
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
        <div className="flex gap-2">
          <input
            className="admin-input font-mono text-[13px]"
            value={value ?? ""}
            placeholder="/uploads/…"
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            onClick={onPickImage}
            className="shrink-0 border border-ink/20 px-4 text-xs hover:bg-paper transition-colors cursor-pointer"
          >
            Choose
          </button>
        </div>
      )}
    </div>
  );
}

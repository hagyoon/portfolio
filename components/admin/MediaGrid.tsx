"use client";

/*
 * Media library grid — drag-drop / file-picker uploads, copy-path, delete.
 * Used full-page at /admin/media and inside the editor's image picker.
 */

import { useCallback, useEffect, useState } from "react";
import { IMAGE_EXTENSIONS } from "@/lib/cms-schema";

export type MediaItem = { name: string; path: string; size: number };

// Client-side compression — big JPEG/PNGs are downscaled to ≤2400px and
// re-encoded as WebP before they ever leave the browser, so the repo (and
// every visitor) gets a lean file. GIF/SVG/AVIF/WebP pass through as-is.
const COMPRESS_THRESHOLD = 600 * 1024;
const MAX_DIMENSION = 2400;

async function compressIfWorthIt(file: File): Promise<File> {
  if (!/\.(jpe?g|png)$/i.test(file.name) || file.size < COMPRESS_THRESHOLD) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", 0.84)
    );
    if (!blob || blob.size >= file.size) return file;
    const name = file.name.replace(/\.[a-z]+$/i, ".webp");
    return new File([blob], name, { type: "image/webp" });
  } catch {
    return file; // decode failed — upload the original
  }
}

export default function MediaGrid({
  onSelect,
  compact = false,
}: {
  onSelect?: (path: string) => void;
  compact?: boolean;
}) {
  const [items, setItems] = useState<MediaItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/media");
    const json = await res.json();
    if (res.ok) setItems(json.items);
    else setError(json.error ?? "Failed to load media.");
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function upload(files: FileList | File[]) {
    setBusy(true);
    setError(null);
    const form = new FormData();
    for (const f of Array.from(files)) form.append("file", await compressIfWorthIt(f));
    const res = await fetch("/api/admin/media", { method: "POST", body: form });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) setError(json.error ?? "Upload failed.");
    await load();
    setBusy(false);
  }

  async function remove(name: string) {
    if (!confirm(`Delete ${name}? Pages referencing it will show a blank.`)) return;
    const res = await fetch(`/api/admin/media?name=${encodeURIComponent(name)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? "Delete failed.");
    }
    await load();
  }

  function copy(path: string) {
    navigator.clipboard.writeText(path);
    setCopied(path);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
        }}
        className={`block border border-dashed px-6 py-8 text-center text-sm cursor-pointer transition-colors mb-6 ${
          dragging ? "border-ink bg-paper" : "border-ink/25 text-stone-500 hover:border-ink/50"
        }`}
      >
        <input
          type="file"
          multiple
          accept={IMAGE_EXTENSIONS.join(",")}
          className="hidden"
          onChange={(e) => e.target.files && upload(e.target.files)}
        />
        {busy
          ? "Uploading…"
          : "Drop images here or click to choose — jpg · png · webp · gif · svg · avif"}
      </label>

      {error && <div className="text-terracotta text-sm mb-4">{error}</div>}

      {items === null ? (
        <div className="text-stone-500 text-sm">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-stone-500 text-sm">No uploads yet.</div>
      ) : (
        <div
          className={`grid gap-4 ${
            compact ? "grid-cols-3 md:grid-cols-4" : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {items.map((item) => (
            <figure key={item.name} className="group border border-ink/10 bg-bone">
              <button
                type="button"
                onClick={() => (onSelect ? onSelect(item.path) : copy(item.path))}
                className="block w-full aspect-square overflow-hidden cursor-pointer"
                title={onSelect ? "Use this image" : "Copy path"}
              >
                {/* plain <img> — admin previews shouldn't go through the optimizer */}
                <img
                  src={item.path}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
              <figcaption className="px-2 py-1.5 flex items-center justify-between gap-1 text-[11px] text-stone-500">
                <span className="truncate" title={item.name}>
                  {copied === item.path ? "Copied!" : item.name}
                </span>
                {!onSelect && (
                  <span className="flex gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => copy(item.path)}
                      className="hover:text-ink cursor-pointer"
                    >
                      copy
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(item.name)}
                      className="hover:text-terracotta cursor-pointer"
                    >
                      delete
                    </button>
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}

export function MediaPickerModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-ivory w-full max-w-3xl max-h-[80svh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="font-serif text-xl">Choose an image</div>
          <button onClick={onClose} className="text-stone-500 hover:text-ink cursor-pointer">
            Close ✕
          </button>
        </div>
        <MediaGrid
          compact
          onSelect={(p) => {
            onSelect(p);
            onClose();
          }}
        />
      </div>
    </div>
  );
}

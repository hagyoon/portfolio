"use client";

/*
 * Site copy editor — structured form over content/site.md frontmatter:
 * identity, intro, about, manifesto, marquee, gallery, contact.
 */

import { useEffect, useState } from "react";
import { MediaPickerModal } from "@/components/admin/MediaGrid";

type Gallery = { src: string; caption?: string }[];

export default function SiteEditor() {
  const [fm, setFm] = useState<Record<string, any> | null>(null);
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pickerIndex, setPickerIndex] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/content?path=${encodeURIComponent("site.md")}`);
      const json = await res.json();
      if (res.ok) {
        setFm(json.frontmatter ?? {});
        setBody(json.body ?? "");
      } else {
        setError(json.error ?? "Failed to load site.md");
      }
    })();
  }, []);

  if (error && !fm) return <div className="text-terracotta text-sm">{error}</div>;
  if (!fm) return <div className="text-stone-500 text-sm">Loading…</div>;

  const gallery: Gallery = Array.isArray(fm.gallery)
    ? fm.gallery.map((g: any) => (typeof g === "string" ? { src: g } : g))
    : [];
  const contact = fm.contact ?? {};

  const set = (key: string, value: any) => setFm((f) => ({ ...f!, [key]: value }));
  const setContact = (key: string, value: string) =>
    set("contact", { ...contact, [key]: value });
  const setGallery = (g: Gallery) => set("gallery", g);

  async function save() {
    setSaving(true);
    setError(null);
    setStatus(null);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "site.md", frontmatter: fm, body }),
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
  }

  const text = (key: string, label: string) => (
    <div>
      <label className="admin-label">{label}</label>
      <input className="admin-input" value={fm![key] ?? ""} onChange={(e) => set(key, e.target.value)} />
    </div>
  );

  const lines = (key: string, label: string, hint: string) => (
    <div>
      <label className="admin-label">
        {label} <span className="normal-case tracking-normal text-stone-400">— {hint}</span>
      </label>
      <textarea
        className="admin-input min-h-[6rem]"
        value={Array.isArray(fm![key]) ? fm![key].join("\n") : fm![key] ?? ""}
        onChange={(e) => set(key, e.target.value.split("\n").filter((l) => l.trim() !== ""))}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <MediaPickerModal
        open={pickerIndex !== null}
        onClose={() => setPickerIndex(null)}
        onSelect={(p) => {
          if (pickerIndex === null) return;
          const g = [...gallery];
          g[pickerIndex] = { ...g[pickerIndex], src: p };
          setGallery(g);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        {text("name", "Name")}
        {text("location", "Location")}
        {text("tagline", "Tagline")}
        {text("description", "Meta description")}
      </div>

      <div>
        <label className="admin-label">Intro — the large scrolling statement</label>
        <textarea
          className="admin-input min-h-[4rem]"
          value={fm.intro ?? ""}
          onChange={(e) => set("intro", e.target.value)}
        />
      </div>

      <div>
        <label className="admin-label">About — paragraphs separated by blank lines</label>
        <textarea
          className="admin-input min-h-[14rem]"
          value={fm.about ?? ""}
          onChange={(e) => set("about", e.target.value)}
        />
      </div>

      {lines("manifesto", "Manifesto", "one line per credo")}
      {lines("marquee", "Marquee", "one word/phrase per line — also shown as Focus areas chips")}

      <div>
        <label className="admin-label">
          Timeline <span className="normal-case tracking-normal text-stone-400">— one entry per line: period | title | detail</span>
        </label>
        <textarea
          className="admin-input min-h-[6rem] font-mono text-[13px]"
          placeholder={"2024 — now | Independent AI builder | Agentic systems and data tooling"}
          value={(Array.isArray(fm.timeline) ? fm.timeline : [])
            .map((t: any) => [t.period, t.title, t.detail].filter(Boolean).join(" | "))
            .join("\n")}
          onChange={(e) =>
            set(
              "timeline",
              e.target.value
                .split("\n")
                .filter((l) => l.trim() !== "")
                .map((l) => {
                  const [period, title, detail] = l.split("|").map((s) => s.trim());
                  return { period: period ?? "", title: title ?? "", ...(detail ? { detail } : {}) };
                })
            )
          }
        />
      </div>

      <div>
        <label className="admin-label">Gallery — images for the horizontal glide section</label>
        <div className="space-y-2">
          {gallery.map((g, i) => (
            <div key={i} className="flex gap-2 items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt="" className="w-12 h-12 object-cover border border-ink/10 bg-bone" />
              <input
                className="admin-input font-mono text-[13px]"
                value={g.src}
                placeholder="/uploads/…"
                onChange={(e) => {
                  const next = [...gallery];
                  next[i] = { ...next[i], src: e.target.value };
                  setGallery(next);
                }}
              />
              <input
                className="admin-input"
                value={g.caption ?? ""}
                placeholder="Caption (optional)"
                onChange={(e) => {
                  const next = [...gallery];
                  next[i] = { ...next[i], caption: e.target.value };
                  setGallery(next);
                }}
              />
              <button
                type="button"
                onClick={() => setPickerIndex(i)}
                className="shrink-0 border border-ink/20 px-3 py-2 text-xs hover:bg-paper cursor-pointer"
              >
                Choose
              </button>
              <button
                type="button"
                onClick={() => setGallery(gallery.filter((_, j) => j !== i))}
                className="shrink-0 text-stone-400 hover:text-terracotta cursor-pointer"
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setGallery([...gallery, { src: "" }])}
            className="border border-ink/20 px-4 py-2 text-xs hover:bg-paper cursor-pointer"
          >
            + Add image
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <label className="admin-label">Contact email</label>
          <input className="admin-input" value={contact.email ?? ""} onChange={(e) => setContact("email", e.target.value)} />
        </div>
        <div>
          <label className="admin-label">LinkedIn URL</label>
          <input className="admin-input" value={contact.linkedin ?? ""} onChange={(e) => setContact("linkedin", e.target.value)} />
        </div>
        <div>
          <label className="admin-label">GitHub URL</label>
          <input className="admin-input" value={contact.github ?? ""} onChange={(e) => setContact("github", e.target.value)} />
        </div>
        <div>
          <label className="admin-label">Telegram</label>
          <input className="admin-input" value={contact.telegram ?? ""} onChange={(e) => setContact("telegram", e.target.value)} />
        </div>
      </div>

      {error && <div className="text-terracotta text-sm">{error}</div>}
      {status && <div className="text-moss text-sm">{status}</div>}

      <button
        onClick={save}
        disabled={saving}
        className="bg-ink text-paper px-8 py-3 label hover:opacity-85 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {saving ? "Publishing…" : "Save & publish"}
      </button>
    </div>
  );
}

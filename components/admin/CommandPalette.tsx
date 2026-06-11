"use client";

/*
 * Global studio command palette — ⌘K / Ctrl+K anywhere in the admin.
 * Static commands (new entry, navigation) filter as you type; two or more
 * characters also fan out to /api/admin/search so any project, essay or
 * note can be jumped to directly.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { COLLECTIONS } from "@/lib/cms-schema";

type Item = {
  id: string;
  group: "Actions" | "Go to" | "Content";
  label: string;
  detail?: string;
  badge?: string;
  href: string;
  external?: boolean;
};

const STATIC_ITEMS: Item[] = [
  ...COLLECTIONS.map<Item>((c) => ({
    id: `new-${c.key}`,
    group: "Actions",
    label: `New ${c.label.replace(/s$/i, "").toLowerCase()}`,
    href: `/admin/${c.key}/new`,
  })),
  { id: "upload", group: "Actions", label: "Upload images", href: "/admin/media" },
  { id: "dash", group: "Go to", label: "Dashboard", href: "/admin" },
  ...COLLECTIONS.map<Item>((c) => ({
    id: `go-${c.key}`,
    group: "Go to",
    label: c.label,
    href: `/admin/${c.key}`,
  })),
  { id: "site", group: "Go to", label: "Site copy", href: "/admin/site" },
  { id: "media", group: "Go to", label: "Media library", href: "/admin/media" },
  { id: "settings", group: "Go to", label: "Settings", href: "/admin/settings" },
  { id: "view", group: "Go to", label: "View live site ↗", href: "/", external: true },
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Item[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setHits([]);
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  // Content search, debounced
  useEffect(() => {
    clearTimeout(debounce.current);
    if (q.trim().length < 2) {
      setHits([]);
      return;
    }
    debounce.current = setTimeout(async () => {
      const res = await fetch(`/api/admin/search?q=${encodeURIComponent(q)}`);
      const json = await res.json().catch(() => ({ hits: [] }));
      setHits(
        (json.hits ?? []).map((h: any) => ({
          id: `hit-${h.collection}-${h.slug}`,
          group: "Content" as const,
          label: h.title,
          detail: h.snippet,
          badge: `${h.collectionLabel}${h.visibility !== "published" ? ` · ${h.visibility}` : ""}`,
          href: `/admin/${h.collection}/${h.slug}`,
        }))
      );
    }, 200);
    return () => clearTimeout(debounce.current);
  }, [q]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const statics = needle
      ? STATIC_ITEMS.filter((i) => i.label.toLowerCase().includes(needle))
      : STATIC_ITEMS;
    return [...hits, ...statics];
  }, [q, hits]);

  useEffect(() => setActive(0), [filtered.length, q]);

  const go = useCallback(
    (item: Item) => {
      setOpen(false);
      if (item.external) window.open(item.href, "_blank");
      else router.push(item.href);
    },
    [router]
  );

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      go(filtered[active]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-between gap-2 border border-ink/15 bg-ivory px-3 py-2 text-xs text-stone-500 hover:border-ink/40 transition-colors cursor-pointer"
      >
        <span>Search…</span>
        <kbd className="font-mono text-[10px] border border-ink/15 px-1.5 py-0.5">⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-ink/40 flex items-start justify-center pt-[14svh] px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-ivory border border-ink/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Type a command or search everything…"
              className="w-full bg-transparent px-5 py-4 text-[15px] outline-none border-b border-ink/10 placeholder:text-stone-400"
            />
            <div className="max-h-[50svh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="px-5 py-6 text-sm text-stone-500">No matches.</div>
              )}
              {(["Content", "Actions", "Go to"] as const).map((group) => {
                const items = filtered.filter((i) => i.group === group);
                if (!items.length) return null;
                return (
                  <div key={group} className="mb-1">
                    <div className="px-5 pt-2 pb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-stone-400">
                      {group}
                    </div>
                    {items.map((item) => {
                      const idx = filtered.indexOf(item);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => go(item)}
                          onMouseEnter={() => setActive(idx)}
                          className={`w-full text-left px-5 py-2.5 flex items-baseline gap-3 cursor-pointer ${
                            idx === active ? "bg-paper" : ""
                          }`}
                        >
                          <span className="text-sm shrink-0">{item.label}</span>
                          {item.detail && (
                            <span className="text-xs text-stone-400 truncate">{item.detail}</span>
                          )}
                          {item.badge && (
                            <span className="ml-auto shrink-0 font-mono text-[10px] uppercase tracking-wider text-stone-400">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="border-t border-ink/10 px-5 py-2 flex gap-4 font-mono text-[10px] text-stone-400">
              <span>↑↓ navigate</span>
              <span>↵ open</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

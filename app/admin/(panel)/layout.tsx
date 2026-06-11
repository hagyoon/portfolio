/*
 * Admin panel chrome — sidebar navigation. Access is enforced by
 * middleware.ts; anything rendered here is already authenticated.
 */

import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import CommandPalette from "@/components/admin/CommandPalette";
import { COLLECTIONS } from "@/lib/cms-schema";

export const metadata = { title: "Studio", robots: { index: false } };

// Admin pages are auth-gated and read live content — never prerender them.
export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-ivory flex">
      <aside className="w-56 shrink-0 border-r border-ink/10 bg-paper px-6 py-8 flex flex-col gap-1 sticky top-0 h-svh">
        <Link href="/admin" className="font-serif text-2xl tracking-tight mb-6 block">
          Studio
        </Link>
        <div className="mb-6">
          <CommandPalette />
        </div>
        <div className="admin-label">Content</div>
        <Link href="/admin/site" className="py-1.5 text-sm hover:opacity-60 transition-opacity">
          Site copy
        </Link>
        {COLLECTIONS.map((c) => (
          <Link
            key={c.key}
            href={`/admin/${c.key}`}
            className="py-1.5 text-sm hover:opacity-60 transition-opacity"
          >
            {c.label}
          </Link>
        ))}
        <div className="admin-label mt-6">Assets</div>
        <Link href="/admin/media" className="py-1.5 text-sm hover:opacity-60 transition-opacity">
          Media library
        </Link>
        <div className="admin-label mt-6">Account</div>
        <Link href="/admin/settings" className="py-1.5 text-sm hover:opacity-60 transition-opacity">
          Settings
        </Link>
        <div className="mt-auto space-y-3">
          <a
            href="/"
            target="_blank"
            className="block text-sm text-stone-500 hover:text-ink transition-colors"
          >
            View site ↗
          </a>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 px-8 md:px-12 py-10 max-w-5xl">{children}</main>
    </div>
  );
}

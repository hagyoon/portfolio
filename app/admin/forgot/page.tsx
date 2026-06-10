"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function request() {
    setBusy(true);
    setError(null);
    setStatus(null);
    const res = await fetch("/api/admin/auth/forgot", { method: "POST" });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) setStatus(json.message ?? "Reset link sent.");
    else setError(json.error ?? "Could not send the reset link.");
  }

  return (
    <div className="min-h-svh flex items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <div className="font-serif text-4xl tracking-tight mb-2">Locked out?</div>
        <p className="text-stone-500 text-sm mb-10">
          A reset link goes straight to the recovery email on file — no need
          to remember which address you signed up with.
        </p>
        <button
          onClick={request}
          disabled={busy}
          className="w-full bg-ink text-paper py-3 label hover:opacity-85 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          {busy ? "Sending…" : "Email me a reset link"}
        </button>
        {status && <div className="text-moss text-sm mt-5">{status}</div>}
        {error && <div className="text-terracotta text-sm mt-5">{error}</div>}
        <Link href="/admin/login" className="block mt-8 text-sm text-stone-500 hover:text-ink">
          ← Back to sign in
        </Link>
      </div>
    </div>
  );
}

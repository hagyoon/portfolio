"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetForm() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setBusy(true);
    const res = await fetch("/api/admin/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) setStatus(json.note ?? "Password updated.");
    else setError(json.error ?? "Reset failed.");
  }

  if (!token) {
    return (
      <p className="text-stone-500 text-sm">
        This page needs the link from the reset email.{" "}
        <Link href="/admin/forgot" className="underline">Request one →</Link>
      </p>
    );
  }

  if (status) {
    return (
      <div>
        <div className="text-moss text-sm mb-8">{status}</div>
        <Link href="/admin/login" className="label underline-grow">
          Go to sign in →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <label className="admin-label">New password (min 10 characters)</label>
      <input
        type="password"
        required
        minLength={10}
        autoComplete="new-password"
        className="admin-input mb-5"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="admin-label">Confirm new password</label>
      <input
        type="password"
        required
        autoComplete="new-password"
        className="admin-input mb-8"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      {error && <div className="text-terracotta text-sm mb-5">{error}</div>}
      <button
        type="submit"
        disabled={busy}
        className="w-full bg-ink text-paper py-3 label hover:opacity-85 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {busy ? "Updating…" : "Set new password"}
      </button>
    </form>
  );
}

export default function ResetPage() {
  return (
    <div className="min-h-svh flex items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <div className="font-serif text-4xl tracking-tight mb-10">New password</div>
        <Suspense>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}

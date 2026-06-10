"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.replace(params.get("from") ?? "/admin");
      router.refresh();
    } else {
      const json = await res.json().catch(() => ({}));
      setError(json.error ?? "Login failed.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <div className="font-serif text-4xl tracking-tight mb-2">Studio</div>
      <p className="text-stone-500 text-sm mb-10">
        Sign in to edit the site.
      </p>
      <label className="admin-label" htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        required
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="admin-input mb-5"
      />
      <label className="admin-label" htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="admin-input mb-8"
      />
      {error && <div className="text-terracotta text-sm mb-5">{error}</div>}
      <button
        type="submit"
        disabled={busy}
        className="w-full bg-ink text-paper py-3 label hover:opacity-85 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-svh flex items-center justify-center bg-paper px-6">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}

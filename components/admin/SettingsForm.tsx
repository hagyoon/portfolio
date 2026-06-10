"use client";

import { useEffect, useState } from "react";

export default function SettingsForm() {
  const [email, setEmail] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      if (res.ok) {
        setEmail(json.email);
        setRecoveryEmail(json.recoveryEmail);
        const w: string[] = [];
        if (!json.vercelConfigured)
          w.push(
            "Vercel API env vars missing (VERCEL_TOKEN / VERCEL_PROJECT_ID / VERCEL_TEAM_ID) — saving here won't work until they're set."
          );
        if (!json.resendConfigured)
          w.push("RESEND_API_KEY missing — “Forgot password” emails can't send until it's set.");
        setWarnings(w);
      }
      setLoaded(true);
    })();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus(null);
    if (newPassword && newPassword !== confirm) {
      setError("New password and confirmation don't match.");
      return;
    }
    setBusy(true);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword,
        email,
        recoveryEmail,
        ...(newPassword ? { newPassword } : {}),
      }),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(json.error ?? "Save failed.");
      return;
    }
    setStatus(json.note ?? "Saved.");
    setNewPassword("");
    setConfirm("");
    setCurrentPassword("");
  }

  if (!loaded) return <div className="text-stone-500 text-sm">Loading…</div>;

  return (
    <form onSubmit={save} className="max-w-lg space-y-6">
      {warnings.map((w, i) => (
        <div key={i} className="border border-terracotta/40 text-terracotta text-sm px-4 py-3">
          {w}
        </div>
      ))}

      <div>
        <label className="admin-label">Login email</label>
        <input
          type="email"
          className="admin-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="admin-label">
          Recovery email — reset links go here
        </label>
        <input
          type="email"
          className="admin-input"
          value={recoveryEmail}
          placeholder="Defaults to the login email"
          onChange={(e) => setRecoveryEmail(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="admin-label">New password (optional)</label>
          <input
            type="password"
            autoComplete="new-password"
            className="admin-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label className="admin-label">Confirm new password</label>
          <input
            type="password"
            autoComplete="new-password"
            className="admin-input"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </div>

      <div className="border-t border-ink/10 pt-6">
        <label className="admin-label">Current password — required to save</label>
        <input
          type="password"
          required
          autoComplete="current-password"
          className="admin-input"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      {error && <div className="text-terracotta text-sm">{error}</div>}
      {status && <div className="text-moss text-sm">{status}</div>}

      <button
        type="submit"
        disabled={busy}
        className="bg-ink text-paper px-8 py-3 label hover:opacity-85 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {busy ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

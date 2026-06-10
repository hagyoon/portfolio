import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, hashPassword } from "@/lib/auth";
import {
  updateAdminEnv,
  triggerRedeploy,
  vercelConfigured,
  resendConfigured,
} from "@/lib/admin-settings";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    email: process.env.ADMIN_EMAIL ?? "",
    recoveryEmail: process.env.RECOVERY_EMAIL ?? "",
    vercelConfigured: vercelConfigured(),
    resendConfigured: resendConfigured(),
  });
}

// PUT { currentPassword, email?, newPassword?, recoveryEmail? }
export async function PUT(req: NextRequest) {
  const { currentPassword, email, newPassword, recoveryEmail } = await req
    .json()
    .catch(() => ({}));

  if (typeof currentPassword !== "string" || !currentPassword) {
    return NextResponse.json(
      { error: "Current password is required to change account settings." },
      { status: 400 }
    );
  }
  if (!verifyCredentials(process.env.ADMIN_EMAIL ?? "", currentPassword)) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 403 });
  }

  const updates: Record<string, string> = {};
  if (typeof email === "string" && email.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Login email looks invalid." }, { status: 400 });
    }
    updates.ADMIN_EMAIL = email.trim();
  }
  if (typeof recoveryEmail === "string" && recoveryEmail.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryEmail.trim())) {
      return NextResponse.json({ error: "Recovery email looks invalid." }, { status: 400 });
    }
    updates.RECOVERY_EMAIL = recoveryEmail.trim();
  }
  if (typeof newPassword === "string" && newPassword) {
    if (newPassword.length < 10) {
      return NextResponse.json(
        { error: "New password must be at least 10 characters." },
        { status: 400 }
      );
    }
    updates.ADMIN_PASSWORD_HASH = hashPassword(newPassword);
  }

  if (!Object.keys(updates).length) {
    return NextResponse.json({ error: "Nothing to change." }, { status: 400 });
  }

  try {
    await updateAdminEnv(updates);
    const redeployed = await triggerRedeploy();
    return NextResponse.json({
      ok: true,
      redeployed,
      note: redeployed
        ? "Saved. The change goes live with the redeploy (~1 minute) — you'll need to sign in again with the new details."
        : "Saved to Vercel, but the automatic redeploy failed — trigger one manually (any content save also works).",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Update failed." },
      { status: 500 }
    );
  }
}

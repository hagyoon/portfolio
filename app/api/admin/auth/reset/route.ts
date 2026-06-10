import { NextRequest, NextResponse } from "next/server";
import { verifyResetToken, hashPassword } from "@/lib/auth";
import { updateAdminEnv, triggerRedeploy } from "@/lib/admin-settings";

export const runtime = "nodejs";

// POST { token, newPassword }
export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json().catch(() => ({}));
  if (typeof token !== "string" || typeof newPassword !== "string") {
    return NextResponse.json({ error: "Token and new password required." }, { status: 400 });
  }
  if (newPassword.length < 10) {
    return NextResponse.json(
      { error: "New password must be at least 10 characters." },
      { status: 400 }
    );
  }
  if (!(await verifyResetToken(token))) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired — request a new one." },
      { status: 403 }
    );
  }

  try {
    await updateAdminEnv({ ADMIN_PASSWORD_HASH: hashPassword(newPassword) });
    const redeployed = await triggerRedeploy();
    return NextResponse.json({
      ok: true,
      note: redeployed
        ? "Password updated — live after the redeploy (~1 minute). Sign in with the new password."
        : "Password saved to Vercel, but the automatic redeploy failed — it applies on the next deploy.",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Reset failed." },
      { status: 500 }
    );
  }
}

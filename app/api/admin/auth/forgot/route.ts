import { NextRequest, NextResponse } from "next/server";
import { createResetToken } from "@/lib/auth";
import { sendResetEmail, resendConfigured, vercelConfigured } from "@/lib/admin-settings";

export const runtime = "nodejs";

// Single-admin site: no email input needed — the reset link always goes to
// the configured recovery address, so a forgotten login email is also covered.
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX = 3;
const WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const now = Date.now();
  const entry = attempts.get(ip);
  if (entry && entry.resetAt > now && entry.count >= MAX) {
    return NextResponse.json(
      { error: "Too many reset requests. Try again in an hour." },
      { status: 429 }
    );
  }
  const e = entry && entry.resetAt > now ? entry : { count: 0, resetAt: now + WINDOW_MS };
  e.count += 1;
  attempts.set(ip, e);

  if (!resendConfigured() || !vercelConfigured()) {
    return NextResponse.json(
      {
        error:
          "Password recovery isn't fully configured yet (needs RESEND_API_KEY and Vercel API env vars).",
      },
      { status: 503 }
    );
  }

  try {
    const token = await createResetToken();
    const origin = req.nextUrl.origin;
    await sendResetEmail(`${origin}/admin/reset?token=${encodeURIComponent(token)}`);
    return NextResponse.json({
      ok: true,
      message: "Reset link sent to the recovery email. It works for 15 minutes.",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not send the reset email." },
      { status: 500 }
    );
  }
}

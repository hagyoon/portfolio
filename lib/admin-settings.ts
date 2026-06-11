/*
 * Admin account settings — credentials live in Vercel env vars, so changing
 * them means updating the vars through the Vercel API and triggering a
 * redeploy (the running lambdas only see env from build time).
 *
 * Required env (production): VERCEL_TOKEN, VERCEL_PROJECT_ID,
 * VERCEL_TEAM_ID. Without them, updates fail with a clear message.
 */

const API = "https://api.vercel.com";

function cfg() {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  return { token, projectId, teamId, ok: !!(token && projectId && teamId) };
}

export function vercelConfigured(): boolean {
  return cfg().ok;
}

export function resendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

async function vercel(path: string, init: RequestInit = {}): Promise<Response> {
  const { token, teamId } = cfg();
  const sep = path.includes("?") ? "&" : "?";
  return fetch(`${API}${path}${sep}teamId=${teamId}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
}

/** Upserts production env vars on the Vercel project. */
export async function updateAdminEnv(updates: Record<string, string>): Promise<void> {
  const { projectId, ok } = cfg();
  if (!ok) {
    throw new Error(
      "Vercel API access is not configured (VERCEL_TOKEN / VERCEL_PROJECT_ID / VERCEL_TEAM_ID)."
    );
  }
  const listRes = await vercel(`/v9/projects/${projectId}/env`);
  if (!listRes.ok) throw new Error(`Vercel env list failed (${listRes.status})`);
  const { envs } = await listRes.json();

  for (const [key, value] of Object.entries(updates)) {
    const existing = (envs as any[]).find(
      (e) => e.key === key && e.target?.includes("production")
    );
    if (existing) {
      const res = await vercel(`/v9/projects/${projectId}/env/${existing.id}`, {
        method: "PATCH",
        body: JSON.stringify({ value }),
      });
      if (!res.ok) throw new Error(`Vercel env update failed for ${key} (${res.status})`);
    } else {
      const res = await vercel(`/v10/projects/${projectId}/env`, {
        method: "POST",
        body: JSON.stringify({ key, value, type: "sensitive", target: ["production"] }),
      });
      if (!res.ok) throw new Error(`Vercel env create failed for ${key} (${res.status})`);
    }
  }
}

/** Redeploys the latest production deployment so new env takes effect. */
export async function triggerRedeploy(): Promise<boolean> {
  const { projectId } = cfg();
  const latest = await vercel(
    `/v6/deployments?projectId=${projectId}&target=production&state=READY&limit=1`
  );
  if (!latest.ok) return false;
  const { deployments } = await latest.json();
  const dpl = deployments?.[0];
  if (!dpl) return false;
  const res = await vercel(`/v13/deployments?forceNew=1`, {
    method: "POST",
    body: JSON.stringify({
      name: dpl.name,
      deploymentId: dpl.uid,
      target: "production",
    }),
  });
  return res.ok;
}

/** Sends the password-reset email via Resend. */
export async function sendResetEmail(resetUrl: string): Promise<void> {
  const to = process.env.RECOVERY_EMAIL || process.env.ADMIN_EMAIL;
  if (!to) throw new Error("No recovery email configured.");
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set.");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "hkryu.space <onboarding@resend.dev>",
      to,
      subject: "[hkryu.space] Reset your studio password",
      html: `
        <div style="font-family: 'Courier New', monospace; max-width: 520px; margin: 0 auto; padding: 40px; background: #f6f3ec; color: #272a22;">
          <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #6d6a5b; margin: 0 0 24px;">hkryu.space — studio</p>
          <p>Someone (hopefully you) asked to reset the studio password.</p>
          <p style="margin: 28px 0;">
            <a href="${resetUrl}" style="background: #ec8e3f; color: #272a22; padding: 12px 24px; text-decoration: none; font-weight: bold;">Reset password →</a>
          </p>
          <p style="color: #6d6a5b; font-size: 13px;">The link works for 15 minutes and dies after the password changes. If you didn't ask for this, ignore it — nothing happens without the link.</p>
        </div>`,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend failed (${res.status}): ${body.slice(0, 200)}`);
  }
}

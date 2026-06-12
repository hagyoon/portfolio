import { Resend } from "resend";
import { NextResponse } from "next/server";

/*
 * Contact intake → routes to Ryu via Email (Resend) + Telegram (bot).
 *
 * The visitor picks a preferred reply channel (email / telegram / instagram)
 * and leaves their handle there. Every message is delivered to BOTH of Ryu's
 * real inboxes (email always, Telegram if configured) with the chosen channel
 * tagged, so Ryu replies on the visitor's platform of choice.
 *
 * Required env (set in Vercel + .env.local):
 *   RESEND_API_KEY        — from resend.com
 *   CONTACT_TO_EMAIL      — defaults to ryuhakyun@gmail.com
 *   TELEGRAM_BOT_TOKEN    — optional; from @BotFather
 *   TELEGRAM_CHAT_ID      — optional; Ryu's chat id with that bot
 *
 * This handler ALWAYS returns JSON, even on failure, so the client never
 * hits "Unexpected end of JSON input".
 */

const CHANNEL_LABEL: Record<string, string> = {
  email: "Email",
  telegram: "Telegram",
  instagram: "Instagram",
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function sendEmail(opts: {
  name: string;
  channel: string;
  handle: string;
  message: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.CONTACT_TO_EMAIL || "ryuhakyun@gmail.com";
  const resend = new Resend(apiKey);
  const channelName = CHANNEL_LABEL[opts.channel] || opts.channel;

  // If they chose email, reply-to is their address. Otherwise unknown.
  const replyTo = opts.channel === "email" ? opts.handle : undefined;

  try {
    const result = await resend.emails.send({
      from: "hkryu.space <onboarding@resend.dev>",
      to,
      replyTo,
      subject: `[hkryu.space] ${opts.name} — reply via ${channelName}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; padding: 48px 40px; background: #efe7d6; color: #1e1a13;">
          <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #857562; margin: 0 0 32px;">
            hkryu.space — New message
          </p>
          <h1 style="font-size: 26px; font-weight: normal; font-style: italic; margin: 0 0 36px; line-height: 1.2;">
            ${escapeHtml(opts.name)} wants to talk.
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 36px;">
            <tr>
              <td style="padding: 12px 0; border-top: 1px solid #d3c4a6; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #857562; width: 130px; vertical-align: top;">Reply via</td>
              <td style="padding: 12px 0; border-top: 1px solid #d3c4a6;"><strong>${channelName}</strong></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-top: 1px solid #d3c4a6; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #857562; vertical-align: top;">Their handle</td>
              <td style="padding: 12px 0; border-top: 1px solid #d3c4a6;">${escapeHtml(opts.handle)}</td>
            </tr>
          </table>
          <div style="border-top: 1px solid #d3c4a6; padding-top: 28px;">
            <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #857562; margin: 0 0 16px;">Message</p>
            <p style="line-height: 1.8; white-space: pre-wrap; margin: 0;">${escapeHtml(opts.message)}</p>
          </div>
        </div>
      `,
    });
    return !result.error;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Could not read your message. Please try again." },
        { status: 400 }
      );
    }

    const name = String(body.name || "").trim();
    const channel = String(body.channel || "").trim().toLowerCase();
    const handle = String(body.handle || "").trim();
    const message = String(body.message || "").trim();

    // Validation
    if (!name) {
      return NextResponse.json({ error: "Please add your name." }, { status: 400 });
    }
    if (!CHANNEL_LABEL[channel]) {
      return NextResponse.json({ error: "Please choose how you'd like me to reply." }, { status: 400 });
    }
    if (!handle) {
      return NextResponse.json({ error: "Please add your contact handle." }, { status: 400 });
    }
    if (channel === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(handle)) {
      return NextResponse.json({ error: "That email doesn't look right — check for typos." }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "Say a little about what's on your mind." }, { status: 400 });
    }

    // Build the Telegram text
    const channelName = CHANNEL_LABEL[channel];
    const tgText = [
      `<b>New message — hkryu.space</b>`,
      ``,
      `<b>From:</b> ${escapeHtml(name)}`,
      `<b>Reply via:</b> ${channelName}`,
      `<b>Handle:</b> ${escapeHtml(handle)}`,
      ``,
      escapeHtml(message),
    ].join("\n");

    // Deliver to both rails in parallel
    const [emailOk, telegramOk] = await Promise.all([
      sendEmail({ name, channel, handle, message }),
      sendTelegram(tgText),
    ]);

    if (!emailOk && !telegramOk) {
      // Nothing configured or both failed
      return NextResponse.json(
        {
          error:
            "Delivery isn't configured yet. Please email me directly in the meantime.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, emailOk, telegramOk });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong on my end. Please email me directly." },
      { status: 500 }
    );
  }
}

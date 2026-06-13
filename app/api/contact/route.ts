import { NextResponse } from "next/server";

/*
 * Contact intake → routed entirely to Ryu's Telegram bot.
 *
 * The visitor picks a preferred reply channel (email / telegram / instagram)
 * and leaves their handle there. Every submission is delivered as a single
 * message to Ryu's Telegram, with the chosen channel + handle included so Ryu
 * replies on the visitor's platform of choice.
 *
 * Required env (set in Vercel + .env.local):
 *   TELEGRAM_BOT_TOKEN — from @BotFather (the token for your bot)
 *   TELEGRAM_CHAT_ID   — your personal chat id with that bot
 *
 * Always returns JSON, even on failure, so the client never hits
 * "Unexpected end of JSON input".
 */

const CHANNEL_LABEL: Record<string, string> = {
  email: "Email",
  telegram: "Telegram",
  instagram: "Instagram",
};

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      return NextResponse.json(
        { error: "Messaging isn't configured yet. Please reach me directly in the meantime." },
        { status: 503 }
      );
    }

    const text = [
      `📬 <b>New message — hkryu.space</b>`,
      ``,
      `<b>From:</b> ${escapeHtml(name)}`,
      `<b>Reply via:</b> ${CHANNEL_LABEL[channel]}`,
      `<b>Their handle:</b> ${escapeHtml(handle)}`,
      ``,
      `<b>Message</b>`,
      escapeHtml(message),
    ].join("\n");

    let tgRes: Response;
    try {
      tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });
    } catch {
      return NextResponse.json(
        { error: "Couldn't reach the messaging service. Please try again shortly." },
        { status: 502 }
      );
    }

    if (!tgRes.ok) {
      // Telegram rejected the request (bad token / chat id, etc.)
      console.error("Telegram sendMessage failed:", tgRes.status, await tgRes.text().catch(() => ""));
      return NextResponse.json(
        { error: "Couldn't deliver your message. Please reach me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong on my end. Please reach me directly." },
      { status: 500 }
    );
  }
}

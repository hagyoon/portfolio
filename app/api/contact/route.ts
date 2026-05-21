import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, phone, topic, message } = await request.json();

    // Required field validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "hkryu.space <onboarding@resend.dev>",
      to: "ryuhakyun@gmail.com",
      replyTo: email,
      subject: topic?.trim()
        ? `[hkryu.space] ${topic.trim()}`
        : `[hkryu.space] New message from ${name.trim()}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; padding: 48px 40px; background: #efe7d6; color: #1e1a13;">
          <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #857562; margin: 0 0 32px;">
            hkryu.space — New message
          </p>

          <h1 style="font-size: 28px; font-weight: normal; font-style: italic; margin: 0 0 40px; line-height: 1.2;">
            ${topic?.trim() || "New message"}
          </h1>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
            <tr>
              <td style="padding: 12px 0; border-top: 1px solid #d3c4a6; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #857562; width: 80px; vertical-align: top;">From</td>
              <td style="padding: 12px 0; border-top: 1px solid #d3c4a6;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-top: 1px solid #d3c4a6; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #857562; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-top: 1px solid #d3c4a6;">${email.trim()}</td>
            </tr>
            ${phone?.trim() ? `
            <tr>
              <td style="padding: 12px 0; border-top: 1px solid #d3c4a6; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #857562; vertical-align: top;">Phone</td>
              <td style="padding: 12px 0; border-top: 1px solid #d3c4a6;">${phone.trim()}</td>
            </tr>` : ""}
          </table>

          <div style="border-top: 1px solid #d3c4a6; padding-top: 32px;">
            <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #857562; margin: 0 0 16px;">Message</p>
            <p style="line-height: 1.8; white-space: pre-wrap; margin: 0;">${message.trim()}</p>
          </div>

          <p style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #d3c4a6; font-size: 11px; color: #857562; letter-spacing: 0.05em;">
            Reply to this email to respond directly to ${name.trim()}.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Failed to send. Please try again or email directly." },
      { status: 500 }
    );
  }
}

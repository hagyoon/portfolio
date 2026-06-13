"use client";

/*
 * ContactForm — composes a message and hands off to Telegram.
 *
 * No backend, no env vars: on submit it copies a formatted message to the
 * clipboard and opens a chat with @hagy00n so the visitor pastes and sends.
 * The message arrives in Ryu's Telegram from the visitor's own account.
 *
 * The visitor still picks a preferred reply channel (Email / Telegram /
 * Instagram) and leaves their handle, which is baked into the message so
 * Ryu knows where to reply.
 */

import { useState } from "react";

type Channel = "email" | "telegram" | "instagram";

type Fields = { name: string; channel: Channel; handle: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const CHANNELS: { id: Channel; label: string; hint: string; placeholder: string }[] = [
  { id: "email", label: "Email", hint: "reply to my inbox", placeholder: "you@email.com" },
  { id: "telegram", label: "Telegram", hint: "reply on Telegram", placeholder: "@yourhandle" },
  { id: "instagram", label: "Instagram", hint: "reply on Instagram", placeholder: "@yourhandle" },
];

const EMPTY: Fields = { name: "", channel: "email", handle: "", message: "" };

function compose(f: Fields): string {
  const channelLabel = CHANNELS.find((c) => c.id === f.channel)!.label;
  return [
    `Hi Hakyun — reaching out via hkryu.space.`,
    ``,
    `Name: ${f.name.trim()}`,
    `Preferred reply: ${channelLabel} (${f.handle.trim()})`,
    ``,
    f.message.trim(),
  ].join("\n");
}

export default function ContactForm({
  telegram = "@hagy00n",
  instagram,
}: {
  telegram?: string;
  instagram?: string;
}) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [composed, setComposed] = useState("");
  const [copied, setCopied] = useState(false);

  const tgHandle = telegram.replace(/^@/, "");
  const tgUrl = `https://t.me/${tgHandle}`;
  const active = CHANNELS.find((c) => c.id === fields.channel)!;

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [k]: e.target.value }));
      setErrors((er) => ({ ...er, [k]: undefined }));
    };

  const pickChannel = (channel: Channel) => {
    setFields((f) => ({ ...f, channel, handle: "" }));
    setErrors((er) => ({ ...er, handle: undefined }));
  };

  function validate(): boolean {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "Please add your name.";
    if (!fields.handle.trim()) {
      next.handle =
        fields.channel === "email"
          ? "Please add your email so I can reply."
          : `Please add your ${active.label} handle.`;
    } else if (
      fields.channel === "email" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.handle)
    ) {
      next.handle = "That email doesn't look right — check for typos.";
    }
    if (!fields.message.trim()) next.message = "Say a little about what's on your mind.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function copy(text: string) {
    try {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the readonly box below is the fallback */
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const text = compose(fields);
    setComposed(text);
    // Copy first (sync call keeps us inside the user gesture), then open.
    copy(text);
    window.open(tgUrl, "_blank", "noopener,noreferrer");
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-ink/15 bg-ivory p-8 text-left">
        <p className="font-serif text-2xl mb-2">Appreciate you reaching out!</p>
        <p className="text-stone-600">
          Telegram should have opened with my chat. Your message is copied —
          just <strong>paste</strong> it there and hit send.
        </p>

        {/* The composed message, ready to copy if the auto-copy was blocked */}
        <textarea
          readOnly
          value={composed}
          rows={6}
          className="admin-input mt-5 font-mono text-sm"
          onFocus={(e) => e.currentTarget.select()}
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => copy(composed)}
            className="border border-ink/25 px-5 py-2.5 label hover:border-ink/60 transition-colors cursor-pointer"
          >
            {copied ? "Copied ✓" : "Copy message"}
          </button>
          <a
            href={tgUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-ink !text-paper px-5 py-2.5 label inline-flex items-center gap-2 hover:opacity-85 transition-opacity"
          >
            Open Telegram ({telegram}) <span aria-hidden>→</span>
          </a>
        </div>

        <p className="text-stone-500 mt-5 text-sm">
          No Telegram? Reach me another way — the links are below
          {instagram ? `, including Instagram @${instagram.replace(/^@/, "")}` : ""}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="text-left space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="cf-name" className="admin-label">
          Name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={fields.name}
          onChange={set("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-err" : undefined}
          className="admin-input"
        />
        {errors.name && (
          <p id="cf-name-err" role="alert" className="mt-1.5 text-sm text-terracotta">
            {errors.name}
          </p>
        )}
      </div>

      {/* Channel picker */}
      <div>
        <span className="admin-label">How should I reply?</span>
        <div
          role="radiogroup"
          aria-label="Preferred reply channel"
          className="mt-1 flex flex-wrap gap-2"
        >
          {CHANNELS.map((c) => {
            const selected = fields.channel === c.id;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => pickChannel(c.id)}
                className={`px-5 py-2.5 label border transition-colors cursor-pointer ${
                  selected
                    ? "bg-ink !text-paper border-ink"
                    : "border-ink/25 text-stone-600 hover:border-ink/60"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Adaptive handle field */}
      <div>
        <label htmlFor="cf-handle" className="admin-label">
          {active.label}{" "}
          <span className="text-stone-400 normal-case">— I&apos;ll {active.hint}</span>
        </label>
        <input
          id="cf-handle"
          name="handle"
          type={fields.channel === "email" ? "email" : "text"}
          autoComplete={fields.channel === "email" ? "email" : "off"}
          required
          value={fields.handle}
          onChange={set("handle")}
          placeholder={active.placeholder}
          aria-invalid={!!errors.handle}
          aria-describedby={errors.handle ? "cf-handle-err" : undefined}
          className="admin-input"
        />
        {errors.handle && (
          <p id="cf-handle-err" role="alert" className="mt-1.5 text-sm text-terracotta">
            {errors.handle}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="admin-label">
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          value={fields.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          className="admin-input"
        />
        {errors.message && (
          <p id="cf-message-err" role="alert" className="mt-1.5 text-sm text-terracotta">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-ink !text-paper px-8 py-3.5 label inline-flex items-center gap-2 hover:opacity-85 active:opacity-70 transition-opacity cursor-pointer"
      >
        Send via Telegram <span aria-hidden>→</span>
      </button>
      <p className="text-stone-500 text-sm">
        Opens Telegram with your message ready to paste and send.
      </p>
    </form>
  );
}

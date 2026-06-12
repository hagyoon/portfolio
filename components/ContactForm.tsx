"use client";

/*
 * ContactForm — accessible contact form with a channel picker.
 *
 * The visitor chooses how they'd like to be reached (Email / Telegram /
 * Instagram), leaves their handle on that channel, and writes a message.
 * Posts to /api/contact, which routes to Ryu via Email + Telegram.
 *
 * Response parsing is defensive: it reads text first and only then tries
 * JSON, so a crashed/empty server response shows a friendly message
 * instead of "Unexpected end of JSON input".
 */

import { useState } from "react";

type Channel = "email" | "telegram" | "instagram";

type Fields = { name: string; channel: Channel; handle: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const CHANNELS: { id: Channel; label: string; hint: string; placeholder: string }[] = [
  { id: "email", label: "Email", hint: "I'll reply to your inbox", placeholder: "you@email.com" },
  { id: "telegram", label: "Telegram", hint: "I'll message you on Telegram", placeholder: "@yourhandle" },
  { id: "instagram", label: "Instagram", hint: "I'll DM you on Instagram", placeholder: "@yourhandle" },
];

const EMPTY: Fields = { name: "", channel: "email", handle: "", message: "" };

export default function ContactForm({ instagram }: { instagram?: string }) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const active = CHANNELS.find((c) => c.id === fields.channel)!;

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [k]: e.target.value }));
      setErrors((er) => ({ ...er, [k]: undefined }));
    };

  const pickChannel = (channel: Channel) => {
    setFields((f) => ({ ...f, channel, handle: "" }));
    setErrors((er) => ({ ...er, handle: undefined, channel: undefined }));
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

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      // Defensive parse: read text, then attempt JSON.
      const raw = await res.text();
      let data: { error?: string; success?: boolean } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong. Please email me directly."
        );
      }
      setStatus("sent");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-ink/15 bg-ivory p-8 text-left">
        <p className="font-serif text-2xl mb-2">Appreciate you reaching out!</p>
        <p className="text-stone-600">
          I read everything and usually reply within a day or two
          {fields.channel === "email" ? "" : ` on ${active.label}`}.
        </p>
        {fields.channel === "instagram" && instagram && (
          <p className="text-stone-600 mt-3 text-sm">
            Want to reach me first? DM{" "}
            <a
              href={`https://instagram.com/${instagram.replace(/^@/, "")}`}
              target="_blank"
              rel="noreferrer"
              className="link-inline"
            >
              @{instagram.replace(/^@/, "")}
            </a>
            .
          </p>
        )}
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
          <span className="text-stone-400 normal-case">— {active.hint}</span>
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

      {status === "error" && (
        <p role="alert" className="text-sm text-terracotta">
          {serverError} You can also email me directly — the address is below.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-ink !text-paper px-8 py-3.5 label inline-flex items-center gap-2 hover:opacity-85 active:opacity-70 transition-opacity disabled:opacity-50 cursor-pointer"
      >
        {status === "sending" ? "Sending…" : "Send message"} <span aria-hidden>→</span>
      </button>
    </form>
  );
}

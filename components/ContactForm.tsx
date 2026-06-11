"use client";

/*
 * ContactForm — inline, accessible contact form. Labeled inputs, inline
 * error messages tied via aria-describedby, keyboard navigable, posts to
 * /api/contact (Resend).
 */

import { useState } from "react";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((f) => ({ ...f, [k]: e.target.value }));
      setErrors((er) => ({ ...er, [k]: undefined }));
    };

  function validate(): boolean {
    const next: Errors = {};
    if (!fields.name.trim()) next.name = "Please add your name.";
    if (!fields.email.trim()) next.email = "Please add your email so I can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      next.email = "That email doesn't look right — check for typos.";
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
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-ink/15 bg-ivory p-8 text-left">
        <p className="font-serif text-2xl mb-2">Message sent — thank you.</p>
        <p className="text-stone-600">I read everything and usually reply within a day or two.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="text-left space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div>
          <label htmlFor="cf-email" className="admin-label">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "cf-email-err" : undefined}
            className="admin-input"
          />
          {errors.email && (
            <p id="cf-email-err" role="alert" className="mt-1.5 text-sm text-terracotta">
              {errors.email}
            </p>
          )}
        </div>
      </div>
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

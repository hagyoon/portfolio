/* ──────────────────────────────────────────────────────────────────────────
 * ContactModal — full-screen editorial contact form.
 *
 * Opens when "Begin a conversation →" is clicked anywhere on the site.
 * Sends to /api/contact → Resend → ryuhakyun@gmail.com.
 * Success state shows "Appreciate you reaching out!"
 *
 * Usage: <ContactModal open={open} onClose={() => setOpen(false)} />
 * ────────────────────────────────────────────────────────────────────────── */

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Field = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

const EMPTY: Field = { name: "", email: "", phone: "", topic: "", message: "" };

export default function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [fields, setFields] = useState<Field>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Focus first field on open, lock scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => firstRef.current?.focus(), 350);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset form when closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setFields(EMPTY);
        setStatus("idle");
        setErrorMsg("");
      }, 400);
    }
  }, [open]);

  const set = (k: keyof Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-paper overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* ── Close button ──────────────────────────────────────────────── */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="fixed top-6 right-6 md:top-10 md:right-10 label text-stone-400 hover:text-ink transition-colors duration-300 flex items-center gap-2 z-10"
          >
            <span>Close</span>
            <span className="text-base leading-none">×</span>
          </button>

          <div className="container-edge min-h-screen flex flex-col justify-center py-24">
            <AnimatePresence mode="wait">

              {/* ── Success state ────────────────────────────────────────── */}
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-2xl"
                >
                  <p className="label text-stone-400 mb-8">Message sent</p>
                  <h2
                    className="font-serif leading-[0.92] tracking-tightest text-ink"
                    style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
                  >
                    Appreciate you<br />
                    <em className="text-clay">reaching out!</em>
                  </h2>
                  <p className="mt-8 text-stone-500 text-base max-w-sm leading-relaxed">
                    I&apos;ll be in touch soon. If it&apos;s urgent, email directly at{" "}
                    <a href="mailto:ryuhakyun@gmail.com" className="underline-grow">
                      ryuhakyun@gmail.com
                    </a>
                    .
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-12 label underline-grow text-stone-500 hover:text-ink transition-colors duration-300"
                  >
                    Back to site →
                  </button>
                </motion.div>

              ) : (

                /* ── Form ─────────────────────────────────────────────────── */
                <motion.form
                  key="form"
                  onSubmit={submit}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-2xl"
                  noValidate
                >
                  <p className="label text-stone-400 mb-8">Get in touch</p>
                  <h2
                    className="font-serif italic leading-[0.92] tracking-tightest text-ink mb-14"
                    style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                  >
                    Begin a conversation.
                  </h2>

                  <div className="space-y-10">

                    {/* Topic */}
                    <FormField label="Topic" hint="optional">
                      <input
                        type="text"
                        value={fields.topic}
                        onChange={set("topic")}
                        placeholder="What&apos;s this about?"
                        className="input-line"
                      />
                    </FormField>

                    {/* Message */}
                    <FormField label="Message" hint="required">
                      <textarea
                        value={fields.message}
                        onChange={set("message")}
                        required
                        rows={4}
                        placeholder="What&apos;s on your mind?"
                        className="input-line resize-none"
                      />
                    </FormField>

                    {/* Name + Email side by side on md+ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <FormField label="Name" hint="required">
                        <input
                          ref={firstRef}
                          type="text"
                          value={fields.name}
                          onChange={set("name")}
                          required
                          placeholder="Your name"
                          className="input-line"
                        />
                      </FormField>

                      <FormField label="Email" hint="required">
                        <input
                          type="email"
                          value={fields.email}
                          onChange={set("email")}
                          required
                          placeholder="your@email.com"
                          className="input-line"
                        />
                      </FormField>
                    </div>

                    {/* Phone */}
                    <FormField label="Phone" hint="optional">
                      <input
                        type="tel"
                        value={fields.phone}
                        onChange={set("phone")}
                        placeholder="+65 ···"
                        className="input-line"
                      />
                    </FormField>

                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="mt-6 text-sm text-terracotta">{errorMsg}</p>
                  )}

                  {/* Submit */}
                  <div className="mt-14 flex items-center gap-8">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="font-serif italic text-xl md:text-2xl tracking-tight text-ink hover:text-clay transition-colors duration-300 disabled:opacity-40"
                    >
                      {status === "sending" ? "Sending···" : "Send message →"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Shared field wrapper ─────────────────────────────────────────────────── */
function FormField({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="label text-stone-500">{label}</span>
        <span className="text-stone-300 text-[10px] uppercase tracking-widest">{hint}</span>
      </div>
      {children}
    </div>
  );
}

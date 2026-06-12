/* ──────────────────────────────────────────────────────────────────────────
 * ContactModal — full-screen wrapper around the shared ContactForm.
 *
 * Opens when "Begin a conversation →" is clicked. The form itself (channel
 * picker, validation, delivery, success state) lives in ContactForm so there
 * is a single source of truth. This component only handles the overlay,
 * focus trap, scroll lock, and Escape-to-close.
 *
 * Usage: <ContactModal open={open} onClose={...} instagram={site.contact.instagram} />
 * ────────────────────────────────────────────────────────────────────────── */

"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

export default function ContactModal({
  open,
  onClose,
  instagram,
}: {
  open: boolean;
  onClose: () => void;
  instagram?: string;
}) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="fixed top-6 right-6 md:top-10 md:right-10 label text-stone-400 hover:text-ink transition-colors duration-300 flex items-center gap-2 z-10"
          >
            <span>Close</span>
            <span className="text-base leading-none">×</span>
          </button>

          <div className="container-edge min-h-screen flex flex-col justify-center py-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl mx-auto"
            >
              <p className="label text-stone-400 mb-8">Get in touch</p>
              <h2
                className="font-serif italic leading-[0.92] tracking-tightest text-ink mb-12"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
              >
                Begin a conversation.
              </h2>

              <ContactForm instagram={instagram} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 * Nav — minimal sticky header.
 *
 * Links scroll to anchor sections on the homepage. Sections are identified
 * by their `id` attribute in /app/page.tsx.
 *
 * To change link labels or order: edit the `links` array below.
 * To change the logo style: edit the JSX inside the <Link href="/"> tag.
 * ────────────────────────────────────────────────────────────────────────── */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

// Edit nav labels and anchor targets here.
const links = [
  { href: "#about",         label: "About" },
  { href: "#projects",      label: "Projects" },
  { href: "#explorations",  label: "Exploring" },
  { href: "#gallery",       label: "Gallery" },
  { href: "#writing",       label: "Writing" },
  { href: "#contact",       label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-[backdrop-filter,background-color,border-color,padding] duration-500 ease-editorial",
          scrolled
            ? "bg-paper/80 backdrop-blur-md border-b border-ink/10 py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="container-edge flex items-center justify-between">
          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="font-serif text-lg tracking-tight"
            aria-label="Home"
          >
            <span className="italic">Index</span>
            <span className="mx-2 text-stone-300">/</span>
            <span>Hakyun Ryu</span>
          </Link>

          {/* ── Desktop links ────────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="label text-stone-500 hover:text-ink transition-colors duration-500"
              >
                <span className="underline-grow">{l.label}</span>
              </a>
            ))}
          </nav>

          {/* ── Mobile hamburger ─────────────────────────────────────────── */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          >
            <span
              className={clsx(
                "block h-px w-6 bg-ink transition-transform duration-500",
                open && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "block h-px w-6 bg-ink transition-transform duration-500",
                open && "-translate-y-[3px] -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-paper md:hidden"
          >
            <div className="container-edge h-full flex flex-col justify-center gap-8 py-24">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.05,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-5xl tracking-tight block"
                  >
                    {l.label}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

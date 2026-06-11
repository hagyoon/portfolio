/*
 * Nav — minimal sticky header.
 *
 * Five anchor links (Exploring + Gallery merged under "Interests") plus
 * theme and motion toggles. All interactive elements have visible
 * keyboard-focus states (global :focus-visible in globals.css).
 */

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { ThemeToggle, MotionToggle } from "@/components/Preferences";

// Edit nav labels and anchor targets here. Keep it to six or fewer.
const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#explorations", label: "Interests" },
  { href: "/writing", label: "Writing" },
  { href: "/library", label: "Library" },
  { href: "/#contact", label: "Contact" },
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
          {/* Logo — two-tone serif wordmark */}
          <Link href="/" aria-label="Home" className="group">
            <span
              className="font-serif tracking-tight select-none"
              style={{ fontSize: "1.05rem", letterSpacing: "-0.02em" }}
            >
              <span className="italic text-clay transition-opacity duration-500 group-hover:opacity-70">H</span>
              <span className="text-ink transition-opacity duration-500 group-hover:opacity-70">Ryu</span>
            </span>
          </Link>

          {/* Desktop links + preference toggles */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="label text-stone-500 hover:text-ink transition-colors duration-500"
              >
                <span className="underline-grow">{l.label}</span>
              </a>
            ))}
            <span aria-hidden className="h-4 w-px bg-ink/15" />
            <ThemeToggle />
            <MotionToggle />
          </nav>

          {/* Mobile hamburger */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-paper md:hidden"
          >
            <nav
              aria-label="Primary"
              className="container-edge h-full flex flex-col justify-center gap-8 py-24"
            >
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
              <div className="flex gap-8 pt-6 border-t border-ink/10">
                <ThemeToggle />
                <MotionToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

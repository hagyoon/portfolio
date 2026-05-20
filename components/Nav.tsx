"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const links = [
  { href: "/", label: "Index" },
  { href: "/projects", label: "Projects" },
  { href: "/interests", label: "Interests" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
          <Link
            href="/"
            className="font-serif text-lg tracking-tight"
            aria-label="Home"
          >
            <span className="italic">Index</span>
            <span className="mx-2 text-stone-300">/</span>
            <span>Hakyun Ryu</span>
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {links.slice(1).map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={clsx(
                    "label hover:text-ink transition-colors duration-500",
                    active ? "text-ink" : "text-stone-500"
                  )}
                >
                  <span className="underline-grow">{l.label}</span>
                </Link>
              );
            })}
          </nav>

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
                  <Link
                    href={l.href}
                    className="font-serif text-5xl tracking-tight"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

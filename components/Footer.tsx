/* ──────────────────────────────────────────────────────────────────────────
 * Footer — closing strip.
 *
 * All copy comes from /content/about.ts.
 * Links use anchor scrolling to homepage sections.
 * ────────────────────────────────────────────────────────────────────────── */

import Link from "next/link";
import { about } from "@/content/about";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/15 mt-32">
      <div className="container-edge py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">

        {/* ── Closing statement ──────────────────────────────────────── */}
        <div className="md:col-span-5">
          <div className="font-serif text-4xl md:text-5xl tracking-tightest leading-[0.95]">
            <span className="italic">If something resonates,</span>
            <br />
            <span>let's build something</span>
            <br />
            <span className="italic text-clay">meaningful</span>
            <span> together.</span>
          </div>
          <Link
            href="#contact"
            className="inline-block mt-8 label underline-grow"
          >
            Begin a conversation →
          </Link>
        </div>

        {/* ── Index links ─────────────────────────────────────────────── */}
        <div className="md:col-span-3 md:col-start-7 space-y-3">
          <div className="label">Index</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="underline-grow">About</a></li>
            <li><a href="#projects" className="underline-grow">Projects</a></li>
            <li><a href="#explorations" className="underline-grow">Exploring</a></li>
            <li><a href="#gallery" className="underline-grow">Gallery</a></li>
            <li><a href="#writing" className="underline-grow">Writing</a></li>
          </ul>
        </div>

        {/* ── Elsewhere links ─────────────────────────────────────────── */}
        <div className="md:col-span-3 space-y-3">
          <div className="label">Elsewhere</div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={`mailto:${about.contact.email}`} className="underline-grow">
                {about.contact.email}
              </a>
            </li>
            <li>
              <a href={about.contact.linkedin} target="_blank" rel="noreferrer" className="underline-grow">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={about.contact.github} target="_blank" rel="noreferrer" className="underline-grow">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Copyright bar ─────────────────────────────────────────────── */}
      <div className="container-edge border-t border-ink/10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-stone-500 text-xs uppercase tracking-widest">
        <div>© {year} {about.name}. All rights reserved.</div>
        <div>{about.location} · {about.tagline}</div>
      </div>
    </footer>
  );
}

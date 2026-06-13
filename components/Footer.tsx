"use client";

/*
 * Footer — closing strip. Copy comes from content/site.md via props.
 * "Begin a conversation →" opens the ContactModal.
 */

import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import type { Site } from "@/lib/content";

export default function Footer({ site }: { site: Site }) {
  const year = new Date().getFullYear();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ContactModal open={open} onClose={() => setOpen(false)} telegram={site.contact.telegram} instagram={site.contact.instagram} />

      <footer className="border-t border-ink/15 mt-32">
        <div className="container-edge py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
          <div className="md:col-span-5">
            <div className="font-serif text-4xl md:text-5xl tracking-tightest leading-[0.95]">
              <span className="italic">If something resonates,</span>
              <br />
              <span>let&apos;s build something</span>
              <br />
              <span className="italic text-blush">meaningful</span>
              <span> together.</span>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="inline-block mt-8 label underline-grow cursor-pointer"
            >
              Begin a conversation →
            </button>
          </div>

          <div className="md:col-span-3 md:col-start-7 space-y-3">
            <div className="label">Index</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/#about" className="link-inline">About</a></li>
              <li><a href="/#projects" className="link-inline">Projects</a></li>
              <li><a href="/#explorations" className="link-inline">Exploring</a></li>
              <li><a href="/#gallery" className="link-inline">Gallery</a></li>
              <li><a href="/#writing" className="link-inline">Writing</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="label">Elsewhere</div>
            <ul className="space-y-2 text-sm">
              {site.contact.email && (
                <li>
                  <a href={`mailto:${site.contact.email}`} className="link-inline">
                    {site.contact.email}
                  </a>
                </li>
              )}
              {site.contact.linkedin && (
                <li>
                  <a href={site.contact.linkedin} target="_blank" rel="noreferrer" className="link-inline">
                    LinkedIn
                  </a>
                </li>
              )}
              {site.contact.github && (
                <li>
                  <a href={site.contact.github} target="_blank" rel="noreferrer" className="link-inline">
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="container-edge border-t border-ink/10 py-6 text-stone-500 text-xs uppercase tracking-widest">
          <div>© {year} {site.name}. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}

"use client";

/*
 * Contact — closing invitation with a magnetic CTA that opens the
 * contact modal.
 */

import { useState } from "react";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import ContactModal from "@/components/ContactModal";
import type { Site } from "@/lib/content";

export default function Contact({ site }: { site: Site }) {
  const [open, setOpen] = useState(false);

  return (
    <section id="contact" className="pt-32 md:pt-44">
      <ContactModal open={open} onClose={() => setOpen(false)} />

      <div className="wash-blush py-24 md:py-36">
        <div className="container-edge text-center">
          <Reveal>
            <div className="eyebrow mb-8">Get in touch</div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display-2 max-w-4xl mx-auto">
              If something here <em className="text-blush">resonates</em>, say hello.
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-12 flex justify-center">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => setOpen(true)}
                  className="border border-ink/30 px-10 py-5 label text-ink hover:bg-ink hover:text-paper transition-colors duration-500 ease-editorial cursor-pointer"
                >
                  Begin a conversation →
                </button>
              </Magnetic>
            </div>
          </Reveal>
          {site.contact.email && (
            <Reveal delay={0.26}>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-block mt-10 text-stone-500 text-sm underline-grow"
              >
                {site.contact.email}
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

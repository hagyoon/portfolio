"use client";

/*
 * Contact — closing invitation with an inline, accessible contact form
 * (labeled inputs, inline errors, keyboard navigable).
 */

import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import type { Site } from "@/lib/content";

export default function Contact({ site, index = "06" }: { site: Site; index?: string }) {
  return (
    <section id="contact" className="pt-40 md:pt-56">
      <div className="band-deep py-28 md:py-40">
        <div className="container-edge">
          <div className="max-w-3xl">
            <Reveal>
              <div className="index-num">{index}</div>
              <div className="mt-3 label">Get in touch</div>
              <div aria-hidden className="mt-6 h-px w-16 bg-rosegold" />
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-2 mt-10">
                If something here <em>resonates</em>, say hello.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="max-w-2xl mt-14">
              <ContactForm telegram={site.contact.telegram} instagram={site.contact.instagram} />
            </div>
          </Reveal>

          {site.contact.email && (
            <Reveal delay={0.24}>
              <p className="max-w-2xl mt-8 text-stone-500 text-sm">
                Prefer email?{" "}
                <a href={`mailto:${site.contact.email}`} className="link-inline">
                  {site.contact.email}
                </a>
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

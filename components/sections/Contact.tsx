"use client";

/*
 * Contact — closing invitation with an inline, accessible contact form
 * (labeled inputs, inline errors, keyboard navigable).
 */

import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import type { Site } from "@/lib/content";

export default function Contact({ site }: { site: Site }) {
  return (
    <section id="contact" className="pt-32 md:pt-44">
      <div className="wash-blush py-24 md:py-36">
        <div className="container-edge">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <p className="eyebrow mb-8">Get in touch</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="display-2">
                If something here <em className="text-blush">resonates</em>, say hello.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <div className="max-w-2xl mx-auto mt-14">
              <ContactForm telegram={site.contact.telegram} instagram={site.contact.instagram} />
            </div>
          </Reveal>

          {site.contact.email && (
            <Reveal delay={0.24}>
              <p className="max-w-2xl mx-auto mt-8 text-stone-600 text-sm">
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

/* ──────────────────────────────────────────────────────────────────────────
 * Contact — closing section.
 *
 * Pulls invitation copy, email, linkedin from /content/about.ts.
 * Minimal by design — no form, just a direct line.
 * ────────────────────────────────────────────────────────────────────────── */

import Reveal from "@/components/Reveal";
import { about } from "@/content/about";

export default function Contact() {
  return (
    <section
      id="contact"
      className="container-edge pt-40 md:pt-56 pb-16 md:pb-24"
    >
      <Reveal>
        <p className="label text-stone-500 mb-8">Contact</p>
        <h2 className="display-1 max-w-5xl">
          Begin a <em className="text-clay">conversation</em>.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-10 max-w-xl text-stone-600 text-base md:text-lg leading-relaxed">
          {about.contact.invitation}
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
          <ContactLine label="Email" href={`mailto:${about.contact.email}`} display={about.contact.email} />
          <ContactLine label="LinkedIn" href={about.contact.linkedin} display={about.contact.linkedin.replace("https://www.", "")} />
          <ContactLine label="GitHub" href={about.contact.github} display={about.contact.github.replace("https://", "")} />
        </div>
      </Reveal>
    </section>
  );
}

function ContactLine({
  label,
  href,
  display,
}: {
  label: string;
  href: string;
  display: string;
}) {
  return (
    <div>
      <div className="label text-stone-400 mb-2">{label}</div>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="font-serif text-lg md:text-xl tracking-tighter underline-grow inline-block"
      >
        {display}
      </a>
    </div>
  );
}

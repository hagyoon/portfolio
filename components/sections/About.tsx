/* ──────────────────────────────────────────────────────────────────────────
 * About / Philosophy — large editorial spread.
 *
 * Pulls bio and manifesto from /content/about.ts.
 * Optional portrait image at /public/images/portraits/portrait.jpg
 * If the portrait is missing, a typographic placeholder shows.
 * ────────────────────────────────────────────────────────────────────────── */

import Reveal from "@/components/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import { about } from "@/content/about";

export default function About() {
  return (
    <section id="about" className="container-edge pt-32 md:pt-48">

      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="label">Note 01</div>
            <div className="mt-3 text-stone-500 text-sm">Philosophy</div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h2 className="display-2 max-w-4xl">
              Same instinct that got me into watches got me into{" "}
              <em className="text-clay">AI</em>.
            </h2>
          </Reveal>
        </div>
      </div>

      {/* ── Body: 2-column with optional portrait on the right ──────────── */}
      <div className="grid grid-cols-12 gap-6 md:gap-12">

        {/* ── Bio paragraphs ─────────────────────────────────────────── */}
        <div className="col-span-12 md:col-span-7 space-y-6 text-stone-700 text-base md:text-lg leading-relaxed">
          {about.bio.map((para, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>

        {/* ── Right: portrait + manifesto strip ──────────────────────── */}
        <div className="col-span-12 md:col-span-5 md:pl-8 space-y-12">
          <Reveal delay={0.1}>
            <div className="relative w-full aspect-[4/5] bg-ivory">
              {/* Drop your portrait here:
                  /public/images/portraits/portrait.jpg
                  Recommended: 4:5 ratio, ~1200px wide. */}
              <SafeImage
                src="/images/portraits/portrait.jpg"
                alt="Hakyun Ryu, Singapore"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="space-y-5">
              {about.manifesto.map((line, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="label text-stone-400 mt-1 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-stone-700 text-sm md:text-base leading-relaxed">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

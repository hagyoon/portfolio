"use client";

/*
 * About — the intro line scrubs word-by-word with scroll (Apple style),
 * followed by bio paragraphs, a parallax portrait, and the manifesto.
 */

import Reveal from "@/components/Reveal";
import ScrubWords from "@/components/motion/ScrubWords";
import Guilloche from "@/components/graphics/Guilloche";
import type { Site } from "@/lib/content";

export default function About({ site }: { site: Site }) {
  const paragraphs = site.about
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="about" className="container-edge pt-40 md:pt-56">
      {/* Scrubbed intro statement */}
      <div className="grid grid-cols-12 gap-6 mb-20 md:mb-28">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="index-num">01</div>
            <div className="mt-3 label">Philosophy</div>
            <div aria-hidden className="mt-6 h-px w-16 bg-rosegold" />
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <ScrubWords
            text={site.intro}
            className="display-2 max-w-5xl"
          />
        </div>
      </div>

      {/* Bio + portrait + manifesto */}
      <div className="grid grid-cols-12 gap-6 md:gap-12">
        <div className="col-span-12 md:col-span-7">
          <div className="space-y-6 text-stone-600 text-base leading-[1.7] max-w-[62ch]">
            {paragraphs.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>

          {/* Skills / focus areas */}
          {site.marquee.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mt-12">
                <h3 className="label mb-4">Focus areas</h3>
                <ul className="flex flex-wrap gap-2.5">
                  {site.marquee.map((skill) => (
                    <li
                      key={skill}
                      className="border border-ink/20 px-3.5 py-1.5 label text-stone-500"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {/* Experience timeline — fill via /admin → Site copy → Timeline */}
          {site.timeline.length > 0 && (
            <Reveal delay={0.12}>
              <div className="mt-14">
                <h3 className="label mb-6">Timeline</h3>
                <ol className="border-l border-ink/25 space-y-8 pl-6">
                  {site.timeline.map((t, i) => (
                    <li key={i} className="relative">
                      <span
                        aria-hidden
                        className="absolute -left-[1.85rem] top-1.5 w-2.5 h-2.5 bg-rosegold"
                      />
                      <div className="font-mono text-sm text-stone-500">{t.period}</div>
                      <div className="text-base md:text-lg text-ink mt-0.5">{t.title}</div>
                      {t.detail && (
                        <p className="text-stone-600 text-sm md:text-base mt-1">{t.detail}</p>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          )}
        </div>

        <div className="col-span-12 md:col-span-5 md:pl-8 space-y-12">
          <Reveal delay={0.1}>
            {/* Engine-turned plate — stands in for a portrait until one is set */}
            <div className="relative w-full aspect-[4/5] overflow-hidden border border-ink/15 band-deep">
              <Guilloche
                variant="soleil"
                opacity={0.3}
                className="absolute inset-0 w-full h-full text-stone-200 dark:text-stone-300"
              />
              <div aria-hidden className="absolute inset-[10px] border border-rosegold/15" />
              <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="label">Fig. 01</span>
                  <span className="label">{site.location}</span>
                </div>
                <div>
                  <p className="font-serif font-light italic text-[2rem] md:text-[2.5rem] leading-[1.05] text-ink/90 tracking-tight">
                    Find what matters before it&apos;s mainstream. Figure it out. Bring others along.
                  </p>
                  <div aria-hidden className="mt-6 h-px w-12 bg-rosegold" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="space-y-5">
              {site.manifesto.map((line, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="label text-rosegold mt-1 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-stone-600 text-sm leading-relaxed">
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

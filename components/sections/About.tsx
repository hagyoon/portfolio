"use client";

/*
 * About — the intro line scrubs word-by-word with scroll (Apple style),
 * followed by bio paragraphs, a parallax portrait, and the manifesto.
 */

import Reveal from "@/components/Reveal";
import ScrubWords from "@/components/motion/ScrubWords";
import { ParallaxInner } from "@/components/motion/Parallax";
import SafeImage from "@/components/ui/SafeImage";
import type { Site } from "@/lib/content";

export default function About({ site }: { site: Site }) {
  const paragraphs = site.about
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="about" className="container-edge pt-32 md:pt-44">
      {/* Scrubbed intro statement */}
      <div className="grid grid-cols-12 gap-6 mb-20 md:mb-28">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="label">Note 01</div>
            <div className="mt-3 text-stone-500 text-sm">Philosophy</div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <ScrubWords
            text={site.intro}
            className="font-serif text-display-lg leading-[1.02] tracking-tighter max-w-5xl"
          />
        </div>
      </div>

      {/* Bio + portrait + manifesto */}
      <div className="grid grid-cols-12 gap-6 md:gap-12">
        <div className="col-span-12 md:col-span-7 space-y-6 text-stone-700 text-base md:text-lg leading-relaxed">
          {paragraphs.map((para, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p>{para}</p>
            </Reveal>
          ))}
        </div>

        <div className="col-span-12 md:col-span-5 md:pl-8 space-y-12">
          <Reveal delay={0.1}>
            <div className="relative w-full aspect-[4/5] bg-ivory overflow-hidden">
              <ParallaxInner amount={7}>
                <div className="relative w-full h-[114%]">
                  <SafeImage
                    src="/images/portraits/portrait.jpg"
                    alt={`${site.name}, ${site.location}`}
                    sizes="(min-width: 768px) 40vw, 100vw"
                  />
                </div>
              </ParallaxInner>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="space-y-5">
              {site.manifesto.map((line, i) => (
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

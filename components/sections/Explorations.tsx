/* ──────────────────────────────────────────────────────────────────────────
 * Explorations — "Currently Exploring" section.
 *
 * Reads from /content/explorations.ts.
 * Layout: 2-column grid on desktop, single column on mobile.
 * No images, pure typography.
 * ────────────────────────────────────────────────────────────────────────── */

import Reveal from "@/components/Reveal";
import { explorations } from "@/content/explorations";

export default function Explorations() {
  return (
    <section id="explorations" className="container-edge pt-32 md:pt-48">

      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="label">Currently Exploring</div>
            <div className="mt-3 text-stone-500 text-sm">Threads of thinking</div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h2 className="display-2">
              Questions I&rsquo;m{" "}
              <em className="text-clay">turning over</em>,
              <br className="hidden md:block" />
              not yet answers.
            </h2>
          </Reveal>
        </div>
      </div>

      {/* ── Grid of explorations ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-20">
        {explorations.map((item, i) => (
          <Reveal key={item.title} delay={(i % 2) * 0.08}>
            <article className="border-t border-ink/15 pt-6">
              <div className="flex items-baseline justify-between mb-4">
                <span className="label text-stone-400 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="label text-stone-400">In progress</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl tracking-tighter mb-4 leading-[1.15]">
                {item.title}
              </h3>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-md">
                {item.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

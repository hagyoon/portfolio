/* ──────────────────────────────────────────────────────────────────────────
 * Writing — list of recent essays (server component).
 *
 * Reads markdown files from /content/writing/ via the existing helpers
 * in /lib/content.ts. Shows the 5 most recent. Links to /writing/<slug>
 * for the full essay.
 *
 * To add new essays: create a new .md file in /content/writing/
 * with frontmatter (title, date, tag, excerpt). The list updates
 * automatically on next build.
 * ────────────────────────────────────────────────────────────────────────── */

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getEssays } from "@/lib/content";

export default async function Writing() {
  const essays = await getEssays();
  const recent = essays.slice(0, 5);

  if (recent.length === 0) return null;

  return (
    <section id="writing" className="container-edge pt-32 md:pt-48">

      {/* ── Section header ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-6 mb-16">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="label">Writing</div>
            <div className="mt-3 text-stone-500 text-sm">Long-form notes</div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h2 className="display-2">
              Thinking, in <em className="text-clay">long form</em>.
            </h2>
          </Reveal>
        </div>
      </div>

      {/* ── Essay list ─────────────────────────────────────────────────── */}
      <ul>
        {recent.map((e, i) => (
          <li key={e.slug} className="border-t border-ink/15">
            <Reveal>
              <Link
                href={`/writing/${e.slug}`}
                className="grid grid-cols-12 gap-6 py-8 md:py-10 group items-baseline"
              >
                <div className="col-span-2 md:col-span-1 label text-stone-400 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="col-span-10 md:col-span-8">
                  <div className="font-serif text-2xl md:text-4xl tracking-tighter group-hover:italic transition-all duration-500 ease-editorial">
                    {e.title}
                  </div>
                  {e.excerpt && (
                    <p className="mt-3 text-stone-600 text-sm md:text-base max-w-xl">
                      {e.excerpt}
                    </p>
                  )}
                </div>
                <div className="hidden md:block md:col-span-2 label text-stone-500">
                  {e.tag}
                </div>
                <div className="col-span-12 md:col-span-1 label text-stone-500 tabular-nums text-right">
                  {e.date?.slice(0, 4)}
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

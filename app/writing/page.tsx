import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getEssays } from "@/lib/content";

export const metadata = { title: "Writing" };

export default async function WritingPage() {
  const essays = await getEssays();

  const byYear = essays.reduce<Record<string, typeof essays>>((acc, e) => {
    const y = e.date?.slice(0, 4) || "—";
    (acc[y] = acc[y] || []).push(e);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => (a > b ? -1 : 1));

  return (
    <div className="container-edge pt-40 md:pt-56 pb-24">
      <div className="grid grid-cols-12 gap-6 mb-20 md:mb-32">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="label">Index 03</div>
            <div className="mt-3 text-stone-500 text-sm">
              ({String(essays.length).padStart(2, "0")})
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h1 className="display-1">Writing.</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-stone-600 text-base md:text-lg leading-relaxed">
              Essays, notes, and the occasional dispatch — on markets, design,
              philosophy, and the quieter mechanics of attention. Written
              slowly, published sparingly.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="space-y-20 md:space-y-32">
        {years.map((year) => (
          <section key={year}>
            <div className="grid grid-cols-12 gap-6 mb-6 md:mb-10 items-baseline">
              <div className="col-span-12 md:col-span-3">
                <Reveal>
                  <h2 className="font-serif text-6xl md:text-8xl tracking-tightest text-stone-400">
                    {year}
                  </h2>
                </Reveal>
              </div>
            </div>
            <ul>
              {byYear[year].map((e) => (
                <li key={e.slug} className="border-t border-ink/15">
                  <Link
                    href={`/writing/${e.slug}`}
                    className="grid grid-cols-12 gap-6 py-8 md:py-12 group"
                  >
                    <div className="col-span-12 md:col-span-3 label text-stone-500 tabular-nums">
                      {e.date}
                    </div>
                    <div className="col-span-12 md:col-span-7">
                      <div className="font-serif text-2xl md:text-4xl tracking-tighter leading-tight group-hover:italic transition-all duration-500 ease-editorial">
                        {e.title}
                      </div>
                      <p className="mt-3 text-stone-600 text-sm md:text-base max-w-2xl">
                        {e.excerpt}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-2 label text-stone-500 text-right">
                      {e.tag}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

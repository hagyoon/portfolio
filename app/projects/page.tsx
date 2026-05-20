import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getProjects } from "@/lib/content";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getProjects();
  const grouped = projects.reduce<Record<string, typeof projects>>(
    (acc, p) => {
      const key = p.year || "—";
      (acc[key] = acc[key] || []).push(p);
      return acc;
    },
    {}
  );
  const years = Object.keys(grouped).sort((a, b) => (a > b ? -1 : 1));

  return (
    <div className="container-edge pt-40 md:pt-56 pb-24">
      <div className="grid grid-cols-12 gap-6 mb-20 md:mb-32">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="label">Index 01</div>
            <div className="mt-3 text-stone-500 text-sm">
              ({String(projects.length).padStart(2, "0")})
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h1 className="display-1">
              Projects.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-stone-600 text-base md:text-lg leading-relaxed">
              An evolving index of work across data, business, and creative
              practice — each entered as a case study, not a thumbnail. Read
              slowly; the considered pieces sit lower on the page.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="space-y-24 md:space-y-32">
        {years.map((year, yi) => (
          <section key={year}>
            <div className="grid grid-cols-12 gap-6 mb-8 md:mb-10 items-baseline">
              <div className="col-span-12 md:col-span-3">
                <Reveal>
                  <h2 className="font-serif text-6xl md:text-8xl tracking-tightest text-stone-400">
                    {year}
                  </h2>
                </Reveal>
              </div>
              <div className="col-span-12 md:col-span-9 label text-stone-500">
                ({String(grouped[year].length).padStart(2, "0")})
              </div>
            </div>
            <ul>
              {grouped[year].map((p, i) => (
                <li key={p.slug} className="border-t border-ink/15">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="grid grid-cols-12 gap-6 py-10 md:py-14 items-start group"
                  >
                    <div className="col-span-2 md:col-span-1 label text-stone-500 tabular-nums">
                      {String(yi * 100 + i + 1).padStart(3, "0")}
                    </div>
                    <div className="col-span-10 md:col-span-7">
                      <div className="font-serif text-3xl md:text-5xl tracking-tightest leading-[1.02] group-hover:translate-x-2 transition-transform duration-700 ease-editorial">
                        {p.title}
                        {p.client && (
                          <span className="text-stone-400 italic ml-3">
                            — {p.client}
                          </span>
                        )}
                      </div>
                      <p className="mt-4 max-w-xl text-stone-600 text-sm md:text-base">
                        {p.summary}
                      </p>
                    </div>
                    <div className="hidden md:block md:col-span-2 label text-stone-500">
                      {p.domain}
                    </div>
                    <div className="col-span-12 md:col-span-2 label text-stone-500 text-right">
                      Read case →
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

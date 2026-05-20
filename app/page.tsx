import Hero from "@/components/Hero";
import SelectedProjects from "@/components/SelectedProjects";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { getSite, getProjects, getEssays, getInterests } from "@/lib/content";

export default async function HomePage() {
  const [site, projects, essays, interests] = await Promise.all([
    getSite(),
    getProjects(),
    getEssays(),
    getInterests(),
  ]);

  const selected = projects.filter((p) => p.status !== "archive").slice(0, 6);
  const recentEssays = essays.slice(0, 3);
  const featuredInterests = interests.slice(0, 4);

  return (
    <>
      <Hero
        name={site.name}
        tagline={site.tagline}
        location={site.location}
      />

      {site.marquee?.length > 0 && (
        <section className="border-y border-ink/10 py-6 md:py-7">
          <Marquee duration={48}>
            {site.marquee.map((word, i) => (
              <span
                key={i}
                className="font-serif italic text-2xl md:text-3xl text-stone-500 tracking-tight"
              >
                {word}
                <span className="mx-10 text-stone-300">◦</span>
              </span>
            ))}
          </Marquee>
        </section>
      )}

      <section className="container-edge pt-32 md:pt-48">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="label">Note 01</div>
              <div className="mt-3 text-stone-500 text-sm">Practice</div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <p className="font-serif text-3xl md:text-5xl leading-[1.12] tracking-tighter text-ink">
                {site.intro}
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl text-stone-600 text-base leading-relaxed">
                {site.manifesto.map((line, i) => (
                  <p key={i} className="flex gap-4">
                    <span className="label mt-1 text-stone-400 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{line}</span>
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SelectedProjects projects={selected} />

      {featuredInterests.length > 0 && (
        <section className="container-edge pt-32 md:pt-48">
          <div className="grid grid-cols-12 gap-6 mb-16 md:mb-24">
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <div className="label">Field Notes</div>
                <div className="mt-3 text-stone-500 text-sm">
                  Passions & study
                </div>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-9">
              <Reveal>
                <h2 className="display-2">
                  Interests carried <em className="text-clay">over</em>{" "}
                  from <br className="hidden md:block" />
                  rooms beyond the studio.
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
            {featuredInterests.map((i, idx) => (
              <Reveal key={i.slug} delay={idx * 0.05}>
                <Link
                  href={`/interests#${i.slug}`}
                  className="group block border-t border-ink/15 pt-6"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="label text-stone-500">
                      0{idx + 1}
                    </span>
                    <span className="label text-stone-400">{i.caption}</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl tracking-tighter group-hover:italic transition-all duration-500 ease-editorial">
                    {i.title}
                  </h3>
                  <div
                    className="mt-4 text-stone-600 text-sm leading-relaxed line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: i.bodyHtml,
                    }}
                  />
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex justify-end">
            <Link href="/interests" className="label underline-grow">
              All field notes →
            </Link>
          </div>
        </section>
      )}

      {recentEssays.length > 0 && (
        <section className="container-edge pt-32 md:pt-48">
          <div className="grid grid-cols-12 gap-6 mb-16">
            <div className="col-span-12 md:col-span-3">
              <Reveal>
                <div className="label">Writing</div>
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

          <ul>
            {recentEssays.map((e, i) => (
              <li
                key={e.slug}
                className="border-t border-ink/15"
              >
                <Link
                  href={`/writing/${e.slug}`}
                  className="grid grid-cols-12 gap-6 py-8 md:py-10 group"
                >
                  <div className="col-span-2 md:col-span-1 label text-stone-500 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-10 md:col-span-8">
                    <div className="font-serif text-2xl md:text-4xl tracking-tighter group-hover:italic transition-all duration-500 ease-editorial">
                      {e.title}
                    </div>
                    <p className="mt-3 text-stone-600 text-sm md:text-base max-w-xl">
                      {e.excerpt}
                    </p>
                  </div>
                  <div className="hidden md:block md:col-span-2 label text-stone-500">
                    {e.tag}
                  </div>
                  <div className="col-span-12 md:col-span-1 label text-stone-500 tabular-nums text-right">
                    {e.date?.slice(0, 4)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-ink/15 pt-10 flex justify-end">
            <Link href="/writing" className="label underline-grow">
              Read the archive →
            </Link>
          </div>
        </section>
      )}

      <section className="container-edge pt-40 md:pt-56 pb-16 md:pb-24">
        <Reveal>
          <p className="label text-stone-500 mb-8">Contact</p>
          <h2 className="display-1 max-w-5xl">
            Begin a <em className="text-clay">conversation</em>.
          </h2>
          <p className="mt-10 max-w-xl text-stone-600 text-base md:text-lg leading-relaxed">
            For projects, considered collaborations, or quieter exchanges of
            ideas. Email is read carefully and replied to in kind.
          </p>
          {site.contact?.email && (
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-12 inline-block font-serif text-3xl md:text-5xl tracking-tighter underline underline-offset-8 decoration-1 hover:decoration-2 transition-all"
            >
              {site.contact.email}
            </a>
          )}
        </Reveal>
      </section>
    </>
  );
}

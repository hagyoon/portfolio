import Reveal from "@/components/Reveal";
import { getInterests } from "@/lib/content";

export const metadata = { title: "Interests" };

export default async function InterestsPage() {
  const interests = await getInterests();

  return (
    <div className="pt-40 md:pt-56 pb-24">
      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6 mb-20 md:mb-32">
          <div className="col-span-12 md:col-span-3">
            <Reveal>
              <div className="label">Index 02</div>
              <div className="mt-3 text-stone-500 text-sm">
                Field notes & passions
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
              <h1 className="display-1">
                Interests.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl text-stone-600 text-base md:text-lg leading-relaxed">
                A small archive of pursuits that shape the practice: horology,
                macro markets, philosophy, travel, and the slow construction of
                a second brain. Not hobbies — preoccupations.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="space-y-32 md:space-y-48">
        {interests.map((i, idx) => {
          const reversed = idx % 2 === 1;
          return (
            <section
              key={i.slug}
              id={i.slug}
              className="container-edge scroll-mt-32"
            >
              <div className="grid grid-cols-12 gap-6 items-start">
                <div
                  className={
                    reversed
                      ? "col-span-12 md:col-span-5 md:order-2"
                      : "col-span-12 md:col-span-5"
                  }
                >
                  <Reveal>
                    <div className="label text-stone-500 mb-6">
                      {String(idx + 1).padStart(2, "0")} · {i.caption}
                    </div>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <h2 className="font-serif text-5xl md:text-7xl tracking-tightest leading-[1.0]">
                      {i.title}
                    </h2>
                  </Reveal>
                </div>
                <div
                  className={
                    reversed
                      ? "col-span-12 md:col-span-6 md:col-start-1 md:order-1"
                      : "col-span-12 md:col-span-6 md:col-start-7"
                  }
                >
                  <Reveal delay={0.1}>
                    <div
                      className="prose-editorial"
                      dangerouslySetInnerHTML={{ __html: i.bodyHtml }}
                    />
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

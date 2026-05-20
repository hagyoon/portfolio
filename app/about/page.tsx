import Reveal from "@/components/Reveal";
import { getSite } from "@/lib/content";

export const metadata = { title: "About" };

export default async function AboutPage() {
  const site = await getSite();
  return (
    <div className="container-edge pt-40 md:pt-56 pb-24">
      <div className="grid grid-cols-12 gap-6 mb-20 md:mb-28">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="label">Index 04</div>
            <div className="mt-3 text-stone-500 text-sm">Biographical</div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h1 className="display-1">About.</h1>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <Reveal>
            <div className="aspect-[4/5] bg-stone-200 border border-ink/10" />
            <p className="mt-4 label text-stone-500">
              Portrait — replace at content/about-portrait.jpg
            </p>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <Reveal>
            <p className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-tighter">
              {site.name}.
              <em className="text-stone-500"> {site.tagline}.</em>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="prose-editorial mt-12 text-stone-700 whitespace-pre-line">
              {site.about}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

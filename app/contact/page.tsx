import Reveal from "@/components/Reveal";
import { getSite } from "@/lib/content";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const site = await getSite();
  return (
    <div className="container-edge pt-40 md:pt-56 pb-32 min-h-[80vh] flex flex-col">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <div className="col-span-12 md:col-span-3">
          <Reveal>
            <div className="label">Index 05</div>
            <div className="mt-3 text-stone-500 text-sm">Correspondence</div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <h1 className="display-1">Contact.</h1>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-12 md:mt-24 flex-1">
        <div className="hidden md:block md:col-span-3" />
        <div className="col-span-12 md:col-span-9">
          <Reveal>
            <p className="font-serif text-3xl md:text-5xl leading-[1.15] tracking-tighter text-stone-600 max-w-3xl">
              For{" "}
              <em className="text-ink">considered work</em>, quieter
              collaborations, and conversations that don&rsquo;t need to be
              urgent.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-16 md:mt-24 space-y-10">
              {site.contact?.email && (
                <div>
                  <div className="label text-stone-500 mb-3">Email</div>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="font-serif text-3xl md:text-5xl tracking-tightest underline underline-offset-8 decoration-1 hover:decoration-2 transition-all"
                  >
                    {site.contact.email}
                  </a>
                </div>
              )}
              {site.contact?.linkedin && (
                <div>
                  <div className="label text-stone-500 mb-3">LinkedIn</div>
                  <a
                    href={site.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="font-serif text-2xl md:text-3xl tracking-tight underline underline-offset-8 decoration-1"
                  >
                    {site.contact.linkedin.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-20 max-w-md text-stone-500 text-sm leading-relaxed">
              Replies, when they come, come slowly. Worth the wait.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

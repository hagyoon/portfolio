import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getEssay, getEssays } from "@/lib/content";

export async function generateStaticParams() {
  const essays = await getEssays();
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) return {};
  return { title: essay.title, description: essay.excerpt };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) notFound();

  const essays = await getEssays();
  const idx = essays.findIndex((e) => e.slug === essay.slug);
  const next = essays[(idx + 1) % essays.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.excerpt,
    datePublished: essay.date,
    url: `https://hkryu.space/writing/${essay.slug}`,
    author: { "@type": "Person", name: "Hakyun Ryu", url: "https://hkryu.space" },
  };

  return (
    <article className="pt-40 md:pt-48 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="container-edge mb-20 md:mb-28">
        <Reveal>
          <Link href="/writing" className="label text-stone-500 underline-grow">
            ← Writing
          </Link>
        </Reveal>

        <div className="grid grid-cols-12 gap-6 mt-12">
          <div className="hidden md:block md:col-span-3">
            <Reveal delay={0.05}>
              <div className="label">Date</div>
              <div className="mt-2 text-stone-700 tabular-nums">
                {essay.date}
              </div>
              {essay.tag && (
                <div className="mt-8">
                  <div className="label">Section</div>
                  <div className="mt-2 text-stone-700">{essay.tag}</div>
                </div>
              )}
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Reveal>
              <h1 className="font-serif text-5xl md:text-7xl tracking-tightest leading-[1.02]">
                {essay.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 font-serif text-2xl md:text-3xl leading-snug tracking-tight text-stone-500">
                {essay.excerpt}
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-3" />
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <div
                className="prose-editorial"
                dangerouslySetInnerHTML={{ __html: essay.bodyHtml }}
              />
            </Reveal>
          </div>
        </div>
      </div>

      {next && next.slug !== essay.slug && (
        <div className="container-edge mt-32 pt-10 border-t border-ink/15">
          <Link
            href={`/writing/${next.slug}`}
            className="grid grid-cols-12 gap-6 group items-end"
          >
            <div className="col-span-12 md:col-span-3 label text-stone-500">
              Next essay →
            </div>
            <div className="col-span-12 md:col-span-9">
              <div className="font-serif text-4xl md:text-6xl tracking-tightest leading-[1.02] group-hover:translate-x-3 transition-transform duration-700 ease-editorial">
                {next.title}
              </div>
            </div>
          </Link>
        </div>
      )}
    </article>
  );
}

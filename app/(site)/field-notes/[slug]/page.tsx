import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { getFieldNote, getFieldNotes } from "@/lib/content";

export async function generateStaticParams() {
  const notes = await getFieldNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getFieldNote(slug);
  if (!note) return {};
  return { title: note.title, description: note.summary };
}

export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getFieldNote(slug);
  if (!note) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.summary,
    url: `https://hkryu.space/field-notes/${note.slug}`,
    author: { "@type": "Person", name: "Hakyun Ryu", url: "https://hkryu.space" },
  };

  return (
    <article className="pt-40 md:pt-48 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="container-edge mb-16 md:mb-20">
        <Reveal>
          <Link href="/library" className="label text-stone-500 underline-grow">
            ← Library
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="eyebrow mt-10 mb-3">{note.topic} · Field note</p>
          <h1 className="display-2">{note.title}</h1>
        </Reveal>
        {note.summary && (
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl font-serif text-2xl md:text-3xl leading-snug tracking-tight text-stone-600">
              {note.summary}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-sm text-stone-500">
            A working note — rougher than the essays, kept here for reference.
          </p>
        </Reveal>
      </header>

      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6">
          <div className="hidden md:block md:col-span-3" />
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <div
                className="prose-editorial"
                dangerouslySetInnerHTML={{ __html: note.bodyHtml }}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </article>
  );
}

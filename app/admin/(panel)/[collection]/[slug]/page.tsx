import { notFound } from "next/navigation";
import Link from "next/link";
import { getCollection } from "@/lib/cms-schema";
import EntryEditor from "@/components/admin/EntryEditor";

export default async function EditEntryPage({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const { collection, slug } = await params;
  const col = getCollection(collection);
  if (!col) notFound();

  return (
    <div>
      <div className="mb-10">
        <Link href={`/admin/${col.key}`} className="text-xs text-stone-500 hover:text-ink">
          ← {col.label}
        </Link>
        <h1 className="font-serif text-4xl tracking-tight mt-2">
          Edit <span className="font-mono text-2xl text-stone-500">{slug}</span>
        </h1>
      </div>
      <EntryEditor collection={col} slug={slug} />
    </div>
  );
}

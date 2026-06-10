import MediaGrid from "@/components/admin/MediaGrid";

export default function MediaPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl tracking-tight mb-2">Media library</h1>
      <p className="text-stone-500 text-sm mb-10">
        Upload images in any common format, click a thumbnail to copy its
        path, then reference it from any entry's cover field or markdown body.
      </p>
      <MediaGrid />
    </div>
  );
}

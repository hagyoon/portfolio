import SiteEditor from "@/components/admin/SiteEditor";

export default function SitePage() {
  return (
    <div>
      <h1 className="font-serif text-4xl tracking-tight mb-2">Site copy</h1>
      <p className="text-stone-500 text-sm mb-10">
        Name, tagline, intro, manifesto, marquee, gallery, and contact details.
      </p>
      <SiteEditor />
    </div>
  );
}

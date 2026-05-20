import Link from "next/link";
import { getSite } from "@/lib/content";

export default async function Footer() {
  const site = await getSite();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink/15 mt-32">
      <div className="container-edge py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6">
        <div className="md:col-span-5">
          <div className="font-serif text-4xl md:text-5xl tracking-tightest leading-[0.95]">
            <span className="italic">Available for</span>{" "}
            <span>considered work</span>
            <br />
            <span>and collaboration.</span>
          </div>
          <Link
            href="/contact"
            className="inline-block mt-8 label underline-grow"
          >
            Begin a conversation →
          </Link>
        </div>

        <div className="md:col-span-3 md:col-start-7 space-y-3">
          <div className="label">Index</div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/projects" className="underline-grow">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/writing" className="underline-grow">
                Writing
              </Link>
            </li>
            <li>
              <Link href="/interests" className="underline-grow">
                Interests
              </Link>
            </li>
            <li>
              <Link href="/about" className="underline-grow">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3 space-y-3">
          <div className="label">Elsewhere</div>
          <ul className="space-y-2 text-sm">
            {site.contact?.email && (
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="underline-grow"
                >
                  {site.contact.email}
                </a>
              </li>
            )}
            {site.contact?.linkedin && (
              <li>
                <a
                  href={site.contact.linkedin}
                  className="underline-grow"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            )}
            {site.contact?.x && (
              <li>
                <a
                  href={site.contact.x}
                  className="underline-grow"
                  target="_blank"
                  rel="noreferrer"
                >
                  X / Twitter
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container-edge border-t border-ink/10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-stone-500 text-xs uppercase tracking-widest">
        <div>© {year} {site.name}. All rights reserved.</div>
        <div>{site.location} · {site.tagline}</div>
      </div>
    </footer>
  );
}

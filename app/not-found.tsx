import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-edge pt-40 md:pt-56 pb-32 min-h-[80vh]">
      <div className="label text-stone-500 mb-8">404</div>
      <h1 className="display-1">
        Not <em className="text-clay">here.</em>
      </h1>
      <p className="mt-10 max-w-xl text-stone-600 text-base md:text-lg leading-relaxed">
        The page you were looking for has either moved, been retired, or
        never existed. The index remains.
      </p>
      <Link
        href="/"
        className="mt-12 inline-block font-serif text-2xl md:text-3xl tracking-tighter underline underline-offset-8 decoration-1"
      >
        Return to the index →
      </Link>
    </div>
  );
}

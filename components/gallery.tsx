import Image from "next/image";
import { gallery } from "@/lib/gallery";

export function Gallery() {
  const hasPlaceholders = gallery.some((img) => img.isPlaceholder);

  return (
    <div>
      {hasPlaceholders && (
        <p className="mb-6 rounded-2xl border border-terracotta-500/30 bg-terracotta-50 px-4 py-3 text-sm text-terracotta-700">
          Property photographs are being added. The images below are labelled placeholders, not photos of
          the property.
        </p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((img) => (
          <li key={img.id}>
            <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-ivory-deep">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/55 to-transparent px-3 pb-2.5 pt-8 text-sm font-medium text-white">
                <span>{img.caption}</span>
                {img.isPlaceholder && (
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-[0.7rem] font-semibold text-terracotta-700">
                    Placeholder
                  </span>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}

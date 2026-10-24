import { ExternalLink, MapPin } from "lucide-react";
import { fullAddress, mapsEmbedSrc, mapsLinkHref, site } from "@/lib/site";
import { buttonClass } from "./ui";

export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-ivory-deep">
      <div className="relative aspect-[4/3] sm:aspect-[16/10]">
        <iframe
          src={mapsEmbedSrc}
          title={`Map showing ${fullAddress}`}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export function AddressBlock() {
  return (
    <div>
      <address className="flex gap-3 not-italic leading-relaxed text-ink">
        <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-forest-600" />
        <span>
          <span className="block font-semibold text-forest-800">{site.name}</span>
          {site.address.line1},<br />
          {site.address.line2},<br />
          {site.address.locality}, {site.address.city},<br />
          {site.address.state} {site.address.postalCode}
        </span>
      </address>
      <a
        href={mapsLinkHref}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass("secondary", "mt-6")}
      >
        Open in Google Maps
        <ExternalLink aria-hidden="true" className="size-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      <p className="mt-3 text-sm text-muted">
        The map shows the street and society; the pin may not mark the exact building. Please call ahead for directions.
      </p>
    </div>
  );
}

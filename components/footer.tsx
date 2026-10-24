import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { fullAddress, mailtoHref, mapsLinkHref, navLinks, site, telHref } from "@/lib/site";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-forest-800 bg-forest-800 text-forest-50">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-xl font-semibold text-white">{site.name}</p>
          <p className="mt-3 max-w-sm leading-relaxed text-forest-100">
            Co-living accommodation for men and women in Madhapur, Hyderabad.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-terracotta-100">
            Explore
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-forest-50 underline-offset-4 hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-terracotta-100">
            Contact
          </h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={telHref} className="flex items-start gap-3 hover:text-white hover:underline underline-offset-4">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={mailtoHref} className="flex items-start gap-3 break-all hover:text-white hover:underline underline-offset-4">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={mapsLinkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-white hover:underline underline-offset-4"
              >
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <span>
                  {fullAddress}
                  <span className="sr-only"> (opens Google Maps in a new tab)</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-sm text-forest-100">
          <p>© {site.name}. Images marked “Placeholder” are not photographs of the property.</p>
        </Container>
      </div>
    </footer>
  );
}

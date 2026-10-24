import { facilities } from "@/lib/facilities";
import { site } from "@/lib/site";

/**
 * Local business structured data using only verified details.
 * Deliberately omits geo coordinates, opening hours, ratings, price range and
 * social profiles — none have been confirmed.
 */
export function LocalBusinessJsonLd() {
  const hasRealDomain = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

  const data = {
    "@context": "https://schema.org",
    "@type": "Hostel",
    name: site.name,
    telephone: site.phone.e164,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: `${site.address.locality}, ${site.address.city}`,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    amenityFeature: facilities.map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f.name,
      value: true,
    })),
    ...(hasRealDomain ? { url: site.url } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

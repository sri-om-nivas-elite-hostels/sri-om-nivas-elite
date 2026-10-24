/**
 * Central business and contact configuration.
 *
 * Every business fact shown on the site comes from this file (or rooms.ts /
 * facilities.ts / gallery.ts). Anything marked TODO is unverified and is
 * tracked in MANAGEMENT_CONFIRMATIONS.md.
 */

export const site = {
  name: "Sri Om Nivas Elite Hostels & Co-Living",
  shortName: "Sri Om Nivas Elite",
  accommodationFor: "Men and women",
  locality: "Madhapur, Hyderabad",

  address: {
    line1: "3-983, Road Number 49",
    line2: "Swamy Ayyappa Society, Mega Hills",
    locality: "Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500081",
    country: "IN",
  },

  phone: {
    display: "63004 37383",
    // Country code +91 added for international dialling; the number itself is as supplied.
    e164: "+916300437383",
  },

  email: "sriomnivaselitehostels@gmail.com",

  // TODO(management): confirm the phone number is registered with WhatsApp.
  // Keep `enabled: false` until verified; no WhatsApp link is rendered while disabled.
  whatsapp: {
    enabled: false,
    status: "pending-verification" as const,
    // E.164 digits without "+", e.g. "916300437383", set only after verification.
    number: null as string | null,
  },

  // TODO(management): domain not purchased. Set NEXT_PUBLIC_SITE_URL once a domain exists.
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3000",
} as const;

export const fullAddress = [
  site.address.line1,
  site.address.line2,
  site.address.locality,
  site.address.city,
  `${site.address.state} ${site.address.postalCode}`,
].join(", ");

export const telHref = `tel:${site.phone.e164}`;
export const mailtoHref = `mailto:${site.email}`;

export const whatsappHref =
  site.whatsapp.enabled && site.whatsapp.number
    ? `https://wa.me/${site.whatsapp.number}`
    : null;

/**
 * What Google Maps is asked to locate — kept separate from the displayed address.
 *
 * Google does not recognise house number 3-983 and snaps to a neighbouring
 * number (it showed "3-963"), so the house number is left out of the map
 * query; the displayed address above still shows 3-983.
 * TODO(management): replace with verified coordinates ("17.xxxxxx,78.xxxxxx")
 * taken from a pin dropped on the building, or the exact Google Business
 * Profile name if the property is listed. Do not guess coordinates.
 */
const mapQuery = [
  site.address.line1.replace(/^[\d-]+,\s*/, ""),
  site.address.line2,
  site.address.locality,
  site.address.city,
  `${site.address.state} ${site.address.postalCode}`,
].join(", ");

const encodedMapQuery = encodeURIComponent(mapQuery);
export const mapsLinkHref = `https://www.google.com/maps/search/?api=1&query=${encodedMapQuery}`;
export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodedMapQuery}&output=embed`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/rooms", label: "Rooms & Pricing" },
  { href: "/dining", label: "Dining" },
  { href: "/facilities", label: "Facilities" },
  { href: "/contact", label: "Contact" },
] as const;

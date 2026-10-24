import type { Metadata } from "next";
import { BedDouble, Users } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { FacilityGrid } from "@/components/facility-grid";
import { AddressBlock, MapEmbed } from "@/components/location";
import { Card, Container, PageHero, Section, SectionHeading } from "@/components/ui";
import { formatPrice, pricingBasisLabel, rooms } from "@/lib/rooms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Sri Om Nivas Elite Hostels & Co-Living: co-living accommodation for men and women in Mega Hills, Madhapur, Hyderabad.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Co-living accommodation in Madhapur"
        intro={`${site.name} provides shared and single room accommodation for men and women in Mega Hills, Madhapur, Hyderabad.`}
      />

      <Section aria-labelledby="intro-title">
        <Container className="grid gap-10 lg:grid-cols-2">
          <SectionHeading id="intro-title" eyebrow="The property" title="Somewhere comfortable to call home" />
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            <p>
              Located at Road Number 49 in Swamy Ayyappa Society, Mega Hills, the property offers a range of
              room types so residents can choose the arrangement and budget that suits them.
            </p>
            <p>
              Food is provided and served in an on-site dining hall. Residents also have access to Wi-Fi, a
              lift, parking, a washing machine, water supply and attached bathrooms.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-white" aria-labelledby="who-title">
        <Container className="grid gap-6 md:grid-cols-2">
          <Card className="bg-ivory p-8">
            <Users aria-hidden="true" className="size-8 text-forest-700" />
            <h2 id="who-title" className="mt-4 text-2xl font-semibold text-forest-800">
              Who we accommodate
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              Accommodation is available for both men and women. Please contact management for details of how
              accommodation is arranged.
            </p>
          </Card>
          <Card className="bg-ivory p-8">
            <BedDouble aria-hidden="true" className="size-8 text-forest-700" />
            <h2 className="mt-4 text-2xl font-semibold text-forest-800">Accommodation options</h2>
            <ul className="mt-4 divide-y divide-line">
              {rooms.map((room) => (
                <li key={room.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5">
                  <span className="font-medium text-ink">{room.name}</span>
                  <span className="text-sm text-muted">
                    <span className="font-semibold text-ink">{formatPrice(room.monthlyPrice)}</span>{" "}
                    {pricingBasisLabel(room)}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </Section>

      <Section aria-labelledby="facilities-title">
        <Container>
          <SectionHeading id="facilities-title" eyebrow="Facilities" title="Confirmed facilities" />
          <div className="mt-10">
            <FacilityGrid />
          </div>
        </Container>
      </Section>

      <Section className="bg-ivory-deep/60" aria-labelledby="location-title">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 id="location-title" className="mb-6 text-3xl font-semibold text-forest-800 sm:text-4xl">
              Location
            </h2>
            <AddressBlock />
          </div>
          <MapEmbed />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

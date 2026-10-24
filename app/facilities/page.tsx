import type { Metadata } from "next";
import { Info } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { FacilityGrid } from "@/components/facility-grid";
import { Container, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Facilities at Sri Om Nivas Elite Hostels & Co-Living, Madhapur: dining hall, food, washing machine, lift, parking, water supply, Wi-Fi and attached bathrooms.",
  alternates: { canonical: "/facilities" },
  openGraph: { url: "/facilities" },
};

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Facilities"
        title="Facilities for everyday living"
        intro="The facilities below have been confirmed as available at the property. Some details are still being confirmed and are marked accordingly."
      />

      <Section aria-labelledby="facilities-title">
        <Container>
          <h2 id="facilities-title" className="sr-only">
            Confirmed facilities
          </h2>
          <FacilityGrid showPending />

          <aside className="mt-10 flex gap-4 rounded-3xl border border-line bg-white p-6">
            <Info aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-forest-700" />
            <p className="leading-relaxed text-ink">
              Facilities may vary by room type, and some may have usage conditions or additional charges.
              Please confirm the details that matter to you with management before moving in.
            </p>
          </aside>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

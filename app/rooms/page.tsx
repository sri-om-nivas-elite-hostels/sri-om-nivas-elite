import type { Metadata } from "next";
import { Info } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/reveal";
import { RoomCard } from "@/components/room-card";
import { Container, PageHero, Pending, Section } from "@/components/ui";
import { capacitySummary, formatPrice, pricingDisclaimer, rooms } from "@/lib/rooms";

export const metadata: Metadata = {
  title: "Rooms & Pricing",
  description: `Room options from 6-sharing to single rooms in Madhapur, Hyderabad. Sharing rooms from ${formatPrice(
    Math.min(...rooms.filter((r) => r.pricingBasis === "per-person").map((r) => r.monthlyPrice)),
  )} per person per month.`,
  alternates: { canonical: "/rooms" },
  openGraph: { url: "/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Rooms & pricing"
        title="Choose the room that suits you"
        intro="Six room types, from 6-sharing to single rooms. Sharing-room prices are per person, per month."
      />

      <Section aria-labelledby="rooms-title">
        <Container>
          <h2 id="rooms-title" className="sr-only">
            Room categories
          </h2>

          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-white px-5 py-4">
            <span className="font-medium text-ink">Total capacity &amp; current availability:</span>
            {/* TODO(management): resolve bed-count discrepancy before showing totals (see MANAGEMENT_CONFIRMATIONS.md). */}
            {capacitySummary.confirmed ? null : <Pending>Please contact management</Pending>}
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, i) => (
              <li key={room.id}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <RoomCard room={room} headingLevel="h3" />
                </Reveal>
              </li>
            ))}
          </ul>

          <aside
            aria-labelledby="disclaimer-title"
            className="mt-10 flex gap-4 rounded-3xl border border-terracotta-500/30 bg-terracotta-50 p-6"
          >
            <Info aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-terracotta-700" />
            <div>
              <h2 id="disclaimer-title" className="font-display text-lg font-semibold text-terracotta-700">
                Pricing information
              </h2>
              <p className="mt-2 leading-relaxed text-ink">{pricingDisclaimer}</p>
              <p className="mt-2 leading-relaxed text-ink">
                Single-room pricing basis and the number of single rooms are awaiting confirmation. Room
                availability is not guaranteed; there is no online booking.
              </p>
            </div>
          </aside>
        </Container>
      </Section>

      <CtaBand title="Ask about availability" text="Get in touch to confirm which rooms are currently available." />
    </>
  );
}

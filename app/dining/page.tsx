import type { Metadata } from "next";
import Image from "next/image";
import { Soup, UtensilsCrossed } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { Card, Container, PageHero, Pending, Section, SectionHeading } from "@/components/ui";
import { gallery } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Food is provided for residents of Sri Om Nivas Elite Hostels & Co-Living, Madhapur, with an on-site dining hall.",
  alternates: { canonical: "/dining" },
  openGraph: { url: "/dining" },
};

// TODO(management): replace each "Awaiting confirmation" with confirmed details.
const pendingMealDetails = [
  { label: "Number of meals per day", note: "To be confirmed by management." },
  { label: "Meal timings", note: "To be confirmed by management." },
  { label: "Menu", note: "To be confirmed by management." },
  { label: "Vegetarian / non-vegetarian options", note: "To be confirmed by management." },
  { label: "Included in rent or charged separately", note: "To be confirmed by management." },
];

export default function DiningPage() {
  const diningImage = gallery.find((g) => g.id === "dining") ?? gallery[0];

  return (
    <>
      <PageHero
        eyebrow="Dining"
        title="Food provided, served in our dining hall"
        intro="Food is provided for residents, and the property has a dedicated dining hall."
      />

      <Section aria-labelledby="overview-title">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="overview-title" eyebrow="Overview" title="Meals at the property" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card className="p-6">
                <UtensilsCrossed aria-hidden="true" className="size-7 text-forest-700" />
                <h3 className="mt-3 text-lg font-semibold text-forest-800">Dining hall</h3>
                <p className="mt-1 text-muted">A shared space on the property for residents&apos; meals.</p>
              </Card>
              <Card className="p-6">
                <Soup aria-hidden="true" className="size-7 text-forest-700" />
                <h3 className="mt-3 text-lg font-semibold text-forest-800">Food provided</h3>
                <p className="mt-1 text-muted">Meals are provided for residents.</p>
              </Card>
            </div>
          </div>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line bg-ivory-deep">
              <Image
                src={diningImage.src}
                alt={diningImage.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            {diningImage.isPlaceholder && (
              <figcaption className="mt-3 text-center text-sm text-muted">
                Placeholder image — dining hall photograph coming soon.
              </figcaption>
            )}
          </figure>
        </Container>
      </Section>

      <Section className="border-y border-line bg-white" aria-labelledby="details-title">
        <Container>
          <SectionHeading
            id="details-title"
            eyebrow="Meal plan"
            title="Meal details"
            intro="We're confirming the details below with management. Please ask when you enquire."
          />
          <dl className="mt-10 grid gap-4 md:grid-cols-2">
            {pendingMealDetails.map((item) => (
              <div key={item.label} className="rounded-3xl border border-line bg-ivory p-6">
                <dt className="font-display text-lg font-semibold text-forest-800">{item.label}</dt>
                <dd className="mt-3 space-y-2">
                  <Pending />
                  <p className="text-muted">{item.note}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CtaBand title="Questions about food?" text="Call or send an enquiry and management can explain the current meal arrangements." />
    </>
  );
}

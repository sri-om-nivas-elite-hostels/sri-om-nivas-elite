import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm, EnquiryFormWithRoomParam } from "@/components/enquiry-form";
import { AddressBlock, MapEmbed } from "@/components/location";
import { Card, Container, PageHero, Pending, Section, buttonClass } from "@/components/ui";
import { mailtoHref, site, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sri Om Nivas Elite Hostels & Co-Living, Madhapur, Hyderabad. Call 63004 37383, email us, or send an enquiry.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us about a room"
        intro="Call, email or send an enquiry to ask about availability, pricing and what's included."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={telHref} className={buttonClass("primary")}>
            <Phone aria-hidden="true" className="size-4" />
            Call {site.phone.display}
          </a>
          <a href={mailtoHref} className={buttonClass("secondary")}>
            <Mail aria-hidden="true" className="size-4" />
            Email us
          </a>
        </div>
      </PageHero>

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-forest-800">Contact details</h2>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="text-sm text-muted">Phone</dt>
                  <dd>
                    <a href={telHref} className="font-semibold text-forest-700 underline-offset-4 hover:underline">
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Email</dt>
                  <dd>
                    <a
                      href={mailtoHref}
                      className="break-all font-semibold text-forest-700 underline-offset-4 hover:underline"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="flex items-center gap-1.5 text-sm text-muted">
                    <MessageCircle aria-hidden="true" className="size-4" />
                    WhatsApp
                  </dt>
                  <dd className="mt-1">
                    {/* TODO(management): enable in lib/site.ts once the number is verified on WhatsApp. */}
                    {whatsappHref ? (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-forest-700 underline-offset-4 hover:underline"
                      >
                        Message us on WhatsApp
                      </a>
                    ) : (
                      <Pending>Not yet available</Pending>
                    )}
                  </dd>
                </div>
              </dl>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold text-forest-800">Address</h2>
              <AddressBlock />
            </Card>
          </div>

          <Card className="scroll-mt-28 p-6 sm:p-8" id="enquiry">
            <h2 className="text-2xl font-semibold text-forest-800">Send an enquiry</h2>
            <p className="mt-2 text-muted">
              Tell us what you&apos;re looking for. Sending an enquiry does not reserve a room.
            </p>
            <div className="mt-6">
              <Suspense fallback={<EnquiryForm />}>
                <EnquiryFormWithRoomParam />
              </Suspense>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0" aria-labelledby="map-title">
        <Container>
          <h2 id="map-title" className="mb-6 text-2xl font-semibold text-forest-800">
            Map
          </h2>
          <MapEmbed />
        </Container>
      </Section>
    </>
  );
}

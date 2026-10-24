import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, UtensilsCrossed, Users } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { FacilityGrid } from "@/components/facility-grid";
import { Gallery } from "@/components/gallery";
import { AddressBlock, MapEmbed } from "@/components/location";
import { Reveal } from "@/components/reveal";
import { RoomCard } from "@/components/room-card";
import { ButtonLink, Card, Container, Eyebrow, Pending, Section, SectionHeading } from "@/components/ui";
import { gallery } from "@/lib/gallery";
import { pricingDisclaimer, rooms } from "@/lib/rooms";
import { fullAddress, mailtoHref, site, telHref } from "@/lib/site";

export default function HomePage() {
  const heroImage = gallery[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute -right-40 -top-40 size-[32rem] rounded-full bg-forest-100/60" />
        <div aria-hidden="true" className="absolute -bottom-24 left-1/3 size-72 rounded-full bg-terracotta-100/50" />
        <Container className="relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="hero-in">
            <p className="inline-flex items-center gap-2 rounded-full border border-forest-700/15 bg-white/80 px-3.5 py-1.5 text-sm font-medium text-forest-700">
              <Users aria-hidden="true" className="size-4" />
              Co-living for men &amp; women · Madhapur, Hyderabad
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-forest-800 sm:text-5xl lg:text-6xl">
              Your Space. Your Comfort.{" "}
              <span className="text-terracotta-700">Your Community.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Explore comfortable co-living accommodation for men and women in Madhapur, Hyderabad, with
              room options to suit different budgets and living preferences.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/rooms">
                Explore Rooms
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <ButtonLink href="/contact#enquiry" variant="secondary">
                Enquire Now
              </ButtonLink>
            </div>
            <p className="mt-8 flex items-start gap-2 text-sm text-muted">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-forest-600" />
              {fullAddress}
            </p>
          </div>

          <div className="hero-in [animation-delay:120ms]">
            <figure className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line bg-ivory-deep shadow-[0_30px_60px_-40px_rgba(31,77,58,0.6)]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              {heroImage.isPlaceholder && (
                <figcaption className="mt-3 text-center text-sm text-muted">
                  Placeholder image — property photographs coming soon.
                </figcaption>
              )}
            </figure>
          </div>
        </Container>
      </section>

      {/* Introduction */}
      <Section className="border-y border-line bg-white" aria-labelledby="intro-title">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <SectionHeading id="intro-title" eyebrow="Welcome" title={`About ${site.shortName}`} />
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            <p>
              {site.name} offers shared and single room accommodation for men and women at Road Number 49,
              Swamy Ayyappa Society, Mega Hills, Madhapur.
            </p>
            <p>
              Choose from six room types, from 6-sharing to single rooms. Residents have access to a dining
              hall with food provided, Wi-Fi, a lift, parking, a washing machine, water supply and attached
              bathrooms.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-semibold text-forest-700 underline-offset-4 hover:underline"
            >
              More about the property
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Rooms */}
      <Section aria-labelledby="rooms-title">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="rooms-title"
              eyebrow="Rooms & pricing"
              title="Room options for different budgets"
              intro="Sharing-room prices are per person, per month."
            />
            <ButtonLink href="/rooms" variant="secondary" className="shrink-0">
              View all room details
            </ButtonLink>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room, i) => (
              <li key={room.id}>
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <RoomCard room={room} />
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-2xl border border-line bg-white px-5 py-4 text-sm leading-relaxed text-muted">
            {pricingDisclaimer}
          </p>
        </Container>
      </Section>

      {/* Facilities */}
      <Section className="bg-ivory-deep/60" aria-labelledby="facilities-title">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading id="facilities-title" eyebrow="Facilities" title="What's available at the property" />
            <ButtonLink href="/facilities" variant="secondary" className="shrink-0">
              Facility details
            </ButtonLink>
          </div>
          <div className="mt-10">
            <FacilityGrid />
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section aria-labelledby="gallery-title">
        <Container>
          <SectionHeading id="gallery-title" eyebrow="Gallery" title="A look around" />
          <div className="mt-10">
            <Gallery />
          </div>
        </Container>
      </Section>

      {/* Dining */}
      <Section className="border-y border-line bg-white" aria-labelledby="dining-title">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="dining-title"
              eyebrow="Dining"
              title="Food provided, with a dedicated dining hall"
              intro="Meals are served for residents in the property's dining hall."
            />
            <ButtonLink href="/dining" variant="secondary" className="mt-8">
              About dining
            </ButtonLink>
          </div>
          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-terracotta-50 text-terracotta-700">
                <UtensilsCrossed aria-hidden="true" className="size-5" />
              </span>
              <h3 className="text-lg font-semibold text-forest-800">Meal details</h3>
            </div>
            <ul className="mt-6 divide-y divide-line">
              {["Meals per day", "Meal timings", "Menu", "Whether food is included in rent"].map((item) => (
                <li key={item} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <span className="text-ink">{item}</span>
                  <Pending />
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      </Section>

      {/* Location */}
      <Section aria-labelledby="location-title">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <Eyebrow>Location</Eyebrow>
            <h2 id="location-title" className="mt-2 mb-6 text-3xl font-semibold text-forest-800 sm:text-4xl">
              Find us in Madhapur
            </h2>
            <AddressBlock />
          </div>
          <MapEmbed />
        </Container>
      </Section>

      {/* Contact */}
      <Section className="pb-0 sm:pb-0" aria-labelledby="contact-title">
        <Container>
          <SectionHeading id="contact-title" eyebrow="Contact" title="Get in touch" align="center" />
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            <a
              href={telHref}
              className="flex items-center gap-4 rounded-3xl border border-line bg-white p-5 transition hover:border-forest-600/40"
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-forest-50 text-forest-700">
                <Phone aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">Phone</span>
                <span className="font-semibold text-forest-800">{site.phone.display}</span>
              </span>
            </a>
            <a
              href={mailtoHref}
              className="flex items-center gap-4 rounded-3xl border border-line bg-white p-5 transition hover:border-forest-600/40"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-forest-50 text-forest-700">
                <Mail aria-hidden="true" className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">Email</span>
                <span className="block break-all font-semibold text-forest-800">{site.email}</span>
              </span>
            </a>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

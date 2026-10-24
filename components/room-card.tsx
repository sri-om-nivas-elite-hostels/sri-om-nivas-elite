import Image from "next/image";
import Link from "next/link";
import { BedDouble, DoorOpen } from "lucide-react";
import { formatPrice, pricingBasisLabel, type RoomCategory } from "@/lib/rooms";
import { Pending, buttonClass } from "./ui";

export function RoomCard({ room, headingLevel = "h3" }: { room: RoomCategory; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const confirmed = room.pricingBasis === "per-person";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(31,77,58,0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-ivory-deep">
        <Image
          src={room.image.src}
          alt={room.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {room.image.isPlaceholder && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-terracotta-700 shadow-sm">
            Placeholder image
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Heading className="text-xl font-semibold text-forest-800">{room.name}</Heading>

        <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-3xl font-semibold text-ink">{formatPrice(room.monthlyPrice)}</span>
          <span className="text-sm text-muted">{pricingBasisLabel(room)}</span>
        </p>

        <dl className="mt-5 space-y-2.5 text-sm">
          <div className="flex items-center gap-2.5">
            <dt className="flex items-center gap-2 text-muted">
              <BedDouble aria-hidden="true" className="size-4 text-forest-600" />
              Occupancy:
            </dt>
            <dd className="font-medium">{room.sharing === 1 ? "1 person" : `${room.sharing} people per room`}</dd>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <dt className="flex items-center gap-2 text-muted">
              <DoorOpen aria-hidden="true" className="size-4 text-forest-600" />
              Rooms of this type:
            </dt>
            <dd className="font-medium">{room.roomCount ?? <Pending />}</dd>
          </div>
          {!confirmed && (
            <div className="flex flex-wrap items-center gap-2.5">
              <dt className="text-muted">Pricing basis:</dt>
              <dd>
                <Pending>Per room? Awaiting confirmation</Pending>
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-auto pt-6">
          <Link
            href={`/contact?room=${room.id}#enquiry`}
            className={buttonClass("secondary", "w-full")}
            aria-label={`Enquire about the ${room.name}`}
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
}

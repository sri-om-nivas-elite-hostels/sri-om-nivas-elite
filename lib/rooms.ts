/**
 * Room categories, inventory and advertised prices — the single source of truth.
 *
 * Figures are exactly as supplied by management. Do not derive totals from
 * this data for display: the supplied shared-room counts add up to 190 beds,
 * while management separately reported 184 beds / 184 capacity / 160 residents.
 * See MANAGEMENT_CONFIRMATIONS.md.
 */

export type PricingBasis = "per-person" | "awaiting-confirmation";

export type RoomCategory = {
  id: string;
  name: string;
  /** People per room. */
  sharing: number;
  /** Number of rooms of this type, or null if not yet supplied. */
  roomCount: number | null;
  /** Advertised monthly price in INR. */
  monthlyPrice: number;
  pricingBasis: PricingBasis;
  image: { src: string; alt: string; isPlaceholder: boolean };
};

const placeholderImage = (label: string) => ({
  src: "/images/placeholders/room.svg",
  alt: `Placeholder graphic for ${label} — not a photograph of the property`,
  isPlaceholder: true,
});

export const rooms: RoomCategory[] = [
  {
    id: "5-sharing",
    name: "5-Sharing Room",
    sharing: 5,
    roomCount: 6,
    monthlyPrice: 7500,
    pricingBasis: "per-person",
    image: placeholderImage("5-sharing room"),
  },
  {
    id: "4-sharing",
    name: "4-Sharing Room",
    sharing: 4,
    roomCount: 14,
    monthlyPrice: 8000,
    pricingBasis: "per-person",
    image: placeholderImage("4-sharing room"),
  },
  {
    id: "3-sharing",
    name: "3-Sharing Room",
    sharing: 3,
    roomCount: 20,
    monthlyPrice: 9000,
    pricingBasis: "per-person",
    image: placeholderImage("3-sharing room"),
  },
  {
    id: "2-sharing",
    name: "2-Sharing Room",
    sharing: 2,
    roomCount: 4,
    monthlyPrice: 12000,
    pricingBasis: "per-person",
    image: placeholderImage("2-sharing room"),
  },
  {
    id: "single",
    name: "Single Room",
    sharing: 1,
    // TODO(management): number of single rooms not supplied.
    roomCount: null,
    // TODO(management): confirm whether ₹21,000 is per room per month.
    monthlyPrice: 21000,
    pricingBasis: "awaiting-confirmation",
    image: placeholderImage("single room"),
  },
];

/**
 * Overall capacity / availability summary.
 * TODO(management): keep `confirmed: false` until the 190 vs 184 bed discrepancy
 * is resolved and current availability is confirmed. Nothing is shown publicly
 * beyond a placeholder while unconfirmed.
 */
export const capacitySummary = {
  confirmed: false,
  totalBeds: null as number | null,
  availableBeds: null as number | null,
};

export const roomTypeOptions = [
  ...rooms.map((r) => ({ value: r.id, label: r.name })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => inr.format(amount);

export const pricingBasisLabel = (room: RoomCategory) =>
  room.pricingBasis === "per-person"
    ? "per person / month"
    : "per month · basis awaiting confirmation";

export const pricingDisclaimer =
  "Prices shown are as currently advertised. Room availability, security deposit, what is included in the rent (including food) and any additional charges must be confirmed directly with management before you move in.";

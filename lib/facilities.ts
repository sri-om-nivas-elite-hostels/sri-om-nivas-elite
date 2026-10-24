import {
  Bath,
  Car,
  Droplets,
  UtensilsCrossed,
  Soup,
  WashingMachine,
  ArrowUpDown,
  Wifi,
  type LucideIcon,
} from "lucide-react";

/**
 * Facilities confirmed as available by management. Only add items here once
 * management has confirmed them — see MANAGEMENT_CONFIRMATIONS.md.
 */
export type Facility = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Open questions shown as "awaiting confirmation" on the facilities page. */
  pendingDetail?: string;
};

export const facilities: Facility[] = [
  {
    id: "dining-hall",
    name: "Dining hall",
    description: "A shared dining hall on the property for residents' meals.",
    icon: UtensilsCrossed,
    pendingDetail: "Seating arrangements and dining hours",
  },
  {
    id: "food",
    name: "Food provided",
    description: "Meals are provided for residents.",
    icon: Soup,
    pendingDetail: "Meal plan, timings, menu and whether food is included in rent",
  },
  {
    id: "washing-machine",
    name: "Washing machine",
    description: "Washing machine access for residents' laundry.",
    icon: WashingMachine,
    pendingDetail: "Usage terms and any charges",
  },
  {
    id: "lift",
    name: "Lift",
    description: "Lift access within the building.",
    icon: ArrowUpDown,
  },
  {
    id: "parking",
    name: "Parking",
    description: "Parking is available at the property.",
    icon: Car,
    pendingDetail: "Two-wheeler / four-wheeler availability and any charges",
  },
  {
    id: "water",
    name: "Water supply",
    description: "Water supply for residents.",
    icon: Droplets,
  },
  {
    id: "wifi",
    name: "Wi-Fi",
    description: "Wi-Fi internet access for residents.",
    icon: Wifi,
    pendingDetail: "Coverage, speed and whether it is included in rent",
  },
  {
    id: "attached-bathrooms",
    name: "Attached bathrooms",
    description: "Rooms come with attached bathrooms.",
    icon: Bath,
    pendingDetail: "Whether every room type has an attached bathroom",
  },
];

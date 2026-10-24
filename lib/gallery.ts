/**
 * Property photo gallery.
 *
 * TODO(management): replace placeholders with real property photographs.
 * 1. Add photos to public/images/property/ (e.g. exterior.jpg).
 * 2. Update `src`, write an accurate `alt`, and set `isPlaceholder: false`.
 * Placeholders are labelled on screen and must never be presented as real photos.
 */
export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  isPlaceholder: boolean;
};

const placeholder = (id: string, caption: string): GalleryImage => ({
  id,
  src: `/images/placeholders/${id}.svg`,
  alt: `Placeholder graphic: ${caption.toLowerCase()} photograph coming soon`,
  caption,
  isPlaceholder: true,
});

export const gallery: GalleryImage[] = [
  {
    id: "exterior",
    src: "/images/placeholders/exterior.jpeg",
    alt: "Multi-storey building exterior with a blue Sri Om Nivas Elite Hostels sign reading Co-Living, Men & Women",
    caption: "Building exterior",
    isPlaceholder: false,
  },
  placeholder("room", "Shared room"),
  placeholder("dining", "Dining hall"),
  placeholder("bathroom", "Attached bathroom"),
  placeholder("lift", "Lift"),
  placeholder("parking", "Parking"),
];

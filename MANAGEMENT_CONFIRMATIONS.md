# Management confirmations needed

Business details that are **unverified, missing or contradictory**. The website currently shows each of these as a placeholder ("Awaiting confirmation") or leaves it out. In the code they are marked with `TODO(management)`.

Once management answers, update the matching data file. Most changes need no page edits.

| Data | File |
| --- | --- |
| Contact, address, WhatsApp, domain | `lib/site.ts` |
| Room types, prices, counts, capacity | `lib/rooms.ts` |
| Facilities | `lib/facilities.ts` |
| Gallery photos | `lib/gallery.ts` + `public/images/property/` |
| Meal details | `app/dining/page.tsx` (`pendingMealDetails`) |

---

## 1. ⚠️ Bed-count discrepancy (highest priority)

The supplied shared-room figures do not match the reported capacity.

| Room type | Rooms | Sharing | Beds |
| --- | ---: | ---: | ---: |
| 6-sharing | 6 | 6 | 36 |
| 5-sharing | 6 | 5 | 30 |
| 4-sharing | 14 | 4 | 56 |
| 3-sharing | 20 | 3 | 60 |
| 2-sharing | 4 | 2 | 8 |
| **Shared rooms total** | **50** | | **190** |
| Single rooms | ? | 1 | ? |

Management separately reported:
- Total capacity: **184**
- Beds present: **184**
- Current residents: **160**

The shared rooms alone give 190 beds. That is 6 more than the reported 184, before any single rooms are counted.

**What the site does now:** it shows each room type's count and price exactly as supplied. It does **not** show total capacity, total beds, resident numbers or "24 beds available". The Rooms page shows "Total capacity & current availability: Please contact management" (`capacitySummary.confirmed = false` in `lib/rooms.ts`).

**Please confirm:**
- [ ] The correct number of rooms for each sharing type.
- [ ] Whether any rooms are used at a lower occupancy than their sharing type.
- [ ] The total number of beds and the total capacity.
- [ ] Whether you want to publish availability. If you do, decide who keeps it up to date. The site has no database or booking system.

## 2. Single room

- [ ] How many single rooms are there?
- [ ] Is ₹20,000 **per room per month**? The site currently says "per month · basis awaiting confirmation".

## 3. Pricing terms (not shown on the site)

- [ ] Security deposit amount, and whether it is refundable.
- [ ] What the rent includes: food, Wi-Fi, electricity, water, laundry.
- [ ] Any extra charges: electricity, maintenance, admission/registration fee.
- [ ] Minimum stay and notice period.
- [ ] Whether prices differ between men's and women's accommodation.

## 4. Food and dining

Confirmed: food is provided and there is a dining hall. Still unknown:

- [ ] Number of meals per day.
- [ ] Meal timings.
- [ ] Menu, or whether a sample menu can be published.
- [ ] Vegetarian / non-vegetarian options.
- [ ] Whether food is included in the rent or charged separately, and how much.

## 5. Facility details

Every facility listed below is shown as available. These details are still marked "Awaiting confirmation":

- [ ] Dining hall: dining hours and seating.
- [ ] Washing machine: usage terms and any charges.
- [ ] Parking: two-wheeler and/or four-wheeler, and any charges.
- [ ] Wi-Fi: coverage, and whether it is included in rent.
- [ ] Attached bathrooms: does **every** room type have one?
- [ ] Lift and water supply: anything residents should know?

These are **not** advertised anywhere on the site. Please tell us if any of them are available:

- [ ] CCTV / security staff
- [ ] Housekeeping / room cleaning
- [ ] Air conditioning
- [ ] Power backup
- [ ] Geysers / hot water
- [ ] Refrigerator
- [ ] Furnished rooms (what furniture is in each room)

## 6. Men and women accommodation

- [ ] How are men's and women's accommodation arranged: separate floors, separate blocks, or something else? The site currently only says accommodation is available for both.

## 7. Contact channels

- [ ] **WhatsApp:** can 6300437383 receive WhatsApp messages? Until confirmed, `site.whatsapp.enabled` stays `false` and no WhatsApp link is shown. The Contact page shows "Not yet available".
- [ ] **Enquiry inbox:** should website enquiries go to sriomnivaselitehostels@gmail.com? This is set as `CONTACT_TO_EMAIL`.
- [ ] **Phone format:** the site uses `+91 6300437383` for click-to-call. Is that correct?
- [ ] **Visiting hours / office hours:** not shown, and not included in the structured data.

## 8. Location

- [ ] **Exact map location.** Google Maps doesn't recognise house number 3-983: searching for the full address put the pin on **3-963** instead. For now the map searches for "Road Number 49, Swamy Ayyappa Society, Mega Hills, Madhapur…" without the house number, so it shows the area rather than the building. The address printed on the site still says 3-983. To fix this, please supply **one** of:
  - coordinates from a pin dropped on the building in Google Maps (long-press the building, then copy the `17.xxxx, 78.xxxx` numbers), or
  - the property's Google Business Profile, if it has one (name exactly as listed, or a share link).

  Then update `mapQuery` in `lib/site.ts`. Optionally, management can also suggest the correct number to Google Maps for the building.
- [ ] Optional: verified directions or nearby landmarks. None are mentioned on the site until verified.

## 9. Photographs

- [ ] Supply real property photographs: exterior, each room type, dining hall, bathrooms, lift, parking.
- [ ] Confirm the photos can be published, and whether residents need to be blurred or excluded.

Every image on the site is currently a labelled placeholder. Each one carries a "Placeholder" badge and alt text saying it is not a photograph of the property.

## 10. Domain, email sending and deployment

- [ ] Purchase a domain. Then set `NEXT_PUBLIC_SITE_URL`.
- [ ] Verify a sending domain in Resend, and choose the sender address for `CONTACT_FROM_EMAIL`. A Gmail address cannot be used as the sender.
- [ ] Approve going live on Vercel. Nothing has been deployed.

## 11. Privacy and branding

- [ ] Who handles enquiry data, and for how long it is kept. A short privacy notice may be needed; the consent checkbox wording should be reviewed.
- [ ] Logo or brand assets. The site currently uses a simple "SO" monogram placeholder.
- [ ] Social media profiles, if any. None are shown or included in structured data.

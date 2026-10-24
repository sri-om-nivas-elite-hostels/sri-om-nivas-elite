# Sri Om Nivas Elite Hostels & Co-Living — website

Marketing website for Sri Om Nivas Elite Hostels & Co-Living, Madhapur, Hyderabad.

Built with Next.js 16 (App Router), TypeScript (strict), Tailwind CSS v4, Lucide icons, and Resend for enquiry emails. It is designed to be deployed on Vercel. **It has not been deployed.**

> Business details awaiting confirmation are listed in [`MANAGEMENT_CONFIRMATIONS.md`](./MANAGEMENT_CONFIRMATIONS.md) and marked `TODO(management)` in the code.

## Requirements

- Node.js 20.9 or newer (developed on Node 22)
- npm

## Setup and run

```bash
npm install
cp .env.example .env.local   # optional — the site runs without it; enquiries stay disabled
npm run dev                  # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start                # http://localhost:3000
```

Checks:

```bash
npm run lint
npx tsc --noEmit             # run after `npm run dev` or `npm run build` (generates route types)
```

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, introduction, rooms & prices, facilities, gallery, dining, location, contact |
| `/about` | Property introduction, accommodation options, facilities, location |
| `/rooms` | Room cards for all six categories, pricing disclaimer |
| `/dining` | Dining hall and food overview, with meal details marked as pending |
| `/facilities` | Confirmed facilities, with pending details marked |
| `/contact` | Contact details, enquiry form, map, WhatsApp (pending) |

Also included: `/sitemap.xml`, `/robots.txt`, a generated Open Graph image, `Hostel` JSON-LD structured data, and a 404 page.

## Where to edit content

All business data is centralized. Pages read from these files:

- `lib/site.ts`: name, address, phone, email, WhatsApp switch, map URLs, navigation.
- `lib/rooms.ts`: room types, prices, room counts, pricing basis, capacity summary, pricing disclaimer.
- `lib/facilities.ts`: confirmed facilities, plus the detail still pending for each.
- `lib/gallery.ts`: gallery images.

### Replacing placeholder photos

1. Put the photos in `public/images/property/`. JPG or WebP, about 1600px wide, 4:3 ratio.
2. In `lib/gallery.ts`, change each item's `src` (e.g. `/images/property/exterior.jpg`), write an accurate `alt`, and set `isPlaceholder: false`.
3. For room photos, update `image` for each room in `lib/rooms.ts` the same way.

The "Placeholder" badges and notices disappear automatically once `isPlaceholder` is `false`.

### Enabling WhatsApp

Only do this after management confirms the number receives WhatsApp messages. In `lib/site.ts`, set `whatsapp.enabled: true` and `whatsapp.number: "91XXXXXXXXXX"` (digits only, with country code).

### Showing total capacity / availability

Only do this after the bed-count discrepancy is resolved. In `lib/rooms.ts`, set `capacitySummary.confirmed: true` and fill in the values. Then render them in `app/rooms/page.tsx`, where they currently show a placeholder.

## Enquiry form and email

`POST /api/enquiry` (`app/api/enquiry/route.ts`) validates the enquiry and emails it through Resend.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. Server-only. |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries. |
| `CONTACT_FROM_EMAIL` | Sender address on a domain **verified in Resend**, e.g. `Sri Om Nivas Website <enquiries@yourdomain>`. |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used for canonical URLs, sitemap and Open Graph. |

**Delivery is disabled until all three email variables are set and well-formed.** Until then the API returns `503 EMAIL_NOT_CONFIGURED`. The form tells the visitor that online enquiries aren't switched on yet and shows the phone number. A success message only appears when Resend returns a message ID.

**Live email delivery has not been tested.** No real credentials were available. To test after configuring, submit the form once and confirm the email arrives in `CONTACT_TO_EMAIL`.

Protections in place:

- The same validation runs on the client and the server (`lib/enquiry.ts`). Input is trimmed, control characters are stripped, and length limits are enforced. Room types must come from the allowed list.
- Requests over 8 KB are rejected. Only JSON is accepted, and only from the site's own origin.
- Spam checks: a hidden honeypot field, and a minimum time to fill in the form.
- Logs contain only error names. Enquiry contents are never logged.
- Secrets are read only in `lib/email-config.ts`, which is marked `server-only`.

### Rate limiting

`lib/rate-limit.ts` allows 5 requests per 10 minutes per IP. It stores counts **in memory, per server instance**. On Vercel, each serverless instance has its own memory and instances are recycled, so this only slows bursts. **It is not a reliable site-wide limit.** Before launch, add one of these:

- **Vercel Firewall rate limiting** (recommended, no code change): add a rule for `POST /api/enquiry`, e.g. 5 requests per 10 minutes per IP.
- Or a shared store such as Upstash Redis with `@upstash/ratelimit`, replacing the in-memory map.

## Deploying to Vercel (when approved)

1. Import the repository into Vercel. The framework is detected automatically.
2. Add the four environment variables above, for Production (and Preview if needed).
3. Add a Firewall rate-limit rule for `/api/enquiry`.
4. After the domain is connected, set `NEXT_PUBLIC_SITE_URL` and redeploy.

## Notes

- The Google Maps embed and link are built from the street address only. They need no API key and use no coordinates. The pin location has not been verified.
- Animations are pure CSS and are turned off when a visitor prefers reduced motion. Content is visible even without JavaScript.
- The site uses a light theme only.

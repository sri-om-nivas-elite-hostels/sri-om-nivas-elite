import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import "./globals.css";

const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const heading = Space_Grotesk({ variable: "--font-heading", subsets: ["latin"], display: "swap" });

const description =
  "Co-living accommodation for men and women in Madhapur, Hyderabad. Shared and single room options, dining hall, Wi-Fi, lift and parking.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Madhapur, Hyderabad`, template: `%s | ${site.shortName}` },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: site.name,
    description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.name, description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#faf6ee",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${body.variable} ${heading.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <a
          href="#main"
          className="sr-only z-[60] rounded-lg bg-forest-700 px-4 py-2 font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <LocalBusinessJsonLd />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileContactBar />
        <Analytics />
      </body>
    </html>
  );
}

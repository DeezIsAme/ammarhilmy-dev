/**
 * Root layout — fonts, metadata, JSON-LD, and the page shell.
 *
 * Fonts are self-hosted by next/font: no request ever leaves for Google Fonts,
 * and there is no layout shift while a font loads.
 *
 * The JSON-LD Person block intentionally omits `telephone`. The phone number is
 * available as a visible WhatsApp link only, so it cannot be harvested as
 * machine-readable data.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/profile";
import { site } from "@/data/site";
import { Topbar } from "@/components/layout/Topbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${profile.name}`,
  },
  description: site.description,
  authors: [{ name: profile.name }],
  creator: profile.name,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: `${profile.name} — Portfolio`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: site.url,
  image: `${site.url}/profile.png`,
  email: "ammarhilmy35@gmail.com",
  jobTitle: profile.headline,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tangerang Selatan",
    addressRegion: "Banten",
    addressCountry: "ID",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "UIN Syarif Hidayatullah Jakarta",
  },
  sameAs: [
    "https://linkedin.com/in/ammar-hilmy-ramzy-ab984424a/",
    "https://github.com/DeezIsAme",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-palette="sage" className={inter.variable}>
      <body className="min-h-screen bg-base">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-btn)] focus:border-2 focus:border-accent focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>

        <Topbar />

        <main id="main" className="mx-auto max-w-[1200px] px-5">
          {children}
        </main>

        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}

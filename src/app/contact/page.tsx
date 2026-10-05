import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { ContactCards } from "@/components/home/ContactCards";
import { SectionHeader } from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ammar Hilmy Ramzy — Web Developer based in Tangerang Selatan, Indonesia. Available by email, LinkedIn, GitHub, and WhatsApp.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Ammar Hilmy Ramzy",
    description: "Email, LinkedIn, GitHub, and WhatsApp.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <section className="pt-14">
      <SectionHeader number="—" label="Get in touch" />
      <h1 className="mb-3 text-[28px] font-bold tracking-tight text-text sm:text-[36px]">
        Let&rsquo;s work together
      </h1>
      <p className="mb-8 max-w-[62ch] text-[16px] leading-relaxed text-muted">
        {profile.availability}. Based in {profile.location} — open to on-site, hybrid, and remote
        arrangements.
      </p>
      <ContactCards />
    </section>
  );
}

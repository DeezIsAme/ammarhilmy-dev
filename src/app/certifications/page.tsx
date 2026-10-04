import type { Metadata } from "next";
import { certifications } from "@/data/certifications";
import { CertificationGroups } from "@/components/home/CertificationGroups";
import { SectionHeader } from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Verified credentials held by Ammar Hilmy Ramzy: IBM SkillsBuild AI and data courses, Cisco networking and security badges, Oracle Academy database certificates, and Red Hat system administration.",
  alternates: { canonical: "/certifications" },
  openGraph: {
    title: "Certifications — Ammar Hilmy Ramzy",
    description: "Verified credentials in AI, networking, security, and databases.",
    url: "/certifications",
  },
};

export default function CertificationsPage() {
  return (
    <section className="pt-14">
      <SectionHeader number="—" label={`${certifications.length} credentials`} />
      <h1 className="mb-3 text-[28px] font-bold tracking-tight text-text sm:text-[36px]">Certifications</h1>
      <p className="mb-8 max-w-[62ch] text-[16px] leading-relaxed text-muted">
        Each entry lists what the certificate actually proves. Course-completion certificates are
        labelled as such — they indicate completed coursework, not professional certification.
      </p>
      <CertificationGroups />
    </section>
  );
}

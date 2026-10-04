import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ExperienceList } from "@/components/home/ExperienceList";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ammar Hilmy Ramzy — Informatics Engineering graduate from UIN Syarif Hidayatullah Jakarta (GPA 3.70) with front-end development and language-testing operations experience.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Ammar Hilmy Ramzy",
    description:
      "Education and experience of Ammar Hilmy Ramzy, Front-End Developer from Tangerang Selatan, Indonesia.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <section className="pt-14">
      <SectionHeader number="—" label="About" />
      <h1 className="mb-3 text-[28px] font-bold tracking-tight text-text sm:text-[36px]">{profile.name}</h1>
      <p className="mb-10 max-w-[62ch] text-[16px] leading-relaxed text-muted">{profile.summary}</p>

      <h2 className="mb-4 font-mono text-[12px] uppercase tracking-widest text-accent">Education</h2>
      <Card className="mb-12 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-[20px] font-bold tracking-tight text-text">
            UIN Syarif Hidayatullah Jakarta
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Tangerang Selatan, Banten
          </span>
        </div>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-accent">
          September 2022 – August 2026 · GPA 3.70
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          Bachelor of Informatics Engineering. Final project: fine-tuning LLaMA 3.1 8B Instruct
          with Low-Rank Adaptation to generate English test simulation questions.
        </p>
      </Card>

      <h2 className="mb-4 font-mono text-[12px] uppercase tracking-widest text-accent">
        Experience — {experience.length} organisations
      </h2>
      <ExperienceList />
    </section>
  );
}

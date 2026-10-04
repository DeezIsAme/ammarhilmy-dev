import type { Metadata } from "next";
import { ProjectFilter } from "@/components/projects/ProjectFilter";
import { SectionHeader } from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Four source-verified projects by Ammar Hilmy Ramzy: an LLM fine-tuning thesis, a multi-step AI research agent, a cooperative financial system, and an ESP32 embedded prototype.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — Ammar Hilmy Ramzy",
    description:
      "Four source-verified projects spanning AI/LLM, web development, and embedded systems.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <section className="pt-14">
      <SectionHeader number="—" label="All projects" />
      <h1 className="mb-3 text-[28px] font-bold tracking-tight text-text sm:text-[36px]">Projects</h1>
      <p className="mb-8 max-w-[62ch] text-[16px] leading-relaxed text-muted">
        Everything below was verified against the source code or the project report. Role is stated
        honestly on each card: in both Laravel projects the backend was written by a teammate.
      </p>
      <ProjectFilter />
    </section>
  );
}

import type { Metadata } from "next";
import { FileText, Download, ExternalLink } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Curriculum vitae of Ammar Hilmy Ramzy, Web Developer — education, projects, experience, certifications, and skills. Tailored variants available on request.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume — Ammar Hilmy Ramzy",
    description: "Download the general CV, or request a variant tailored to a specific role.",
    url: "/resume",
  },
};

const CV_PATH = "/cv/ammar-hilmy-ramzy-cv.pdf";

export default function ResumePage() {
  return (
    <section className="pt-14">
      <SectionHeader number="—" label="Curriculum vitae" />
      <h1 className="mb-3 text-[28px] font-bold tracking-tight text-text sm:text-[36px]">
        Resume
      </h1>
      <p className="mb-8 max-w-[62ch] text-[16px] leading-relaxed text-muted">
        A general CV covering education, projects, experience, certifications, and skills. Applying
        for a specific role? A variant tailored to that role can be sent directly.
      </p>

      <Card className="p-5">
        <div className="flex flex-wrap items-start gap-4">
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-btn)] border-2 border-border text-accent"
            aria-hidden="true"
          >
            <FileText className="h-5 w-5" />
          </span>

          <div className="min-w-[16rem] flex-1">
            <h2 className="text-[20px] font-bold tracking-tight text-text">General CV</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Plain-text, ATS-readable: the work on this site, plus the certifications and skills
              behind it.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={CV_PATH}
                download
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-btn)] border-2 border-accent bg-accent px-5 py-2.5 text-[14px] font-semibold text-ink shadow-[4px_4px_0_0_var(--color-border)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-border)]"
              >
                Download CV
                <Download className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-btn)] border-2 border-border px-5 py-2.5 text-[14px] font-semibold text-text shadow-[4px_4px_0_0_var(--color-accent)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-accent)]"
              >
                Open in browser
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Card>

      <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-muted">
        Want a CV aimed at a particular role — data, backend, or a specific stack?{" "}
        <a href={`mailto:${profile.contacts[0].value}`} className="text-accent hover:underline">
          {profile.contacts[0].value}
        </a>{" "}
        and one can be prepared for that role.
      </p>
    </section>
  );
}

import type { Metadata } from "next";
import { FileText } from "@/components/ui/Icon";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/layout/SectionHeader";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Curriculum vitae of Ammar Hilmy Ramzy, Front-End Developer. Tailored variants available on request for specific roles.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume — Ammar Hilmy Ramzy",
    description: "Curriculum vitae and tailored variants.",
    url: "/resume",
  },
};

export default function ResumePage() {
  return (
    <section className="pt-14">
      <SectionHeader number="—" label="Curriculum vitae" />
      <h1 className="mb-3 text-[28px] font-bold tracking-tight text-text sm:text-[36px]">Resume</h1>
      <p className="mb-8 max-w-[62ch] text-[16px] leading-relaxed text-muted">
        The general CV is being prepared and will be published here shortly.
      </p>

      <Card className="p-5">
        <div className="flex items-start gap-4">
          <span
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-btn)] border-2 border-border text-muted"
            aria-hidden="true"
          >
            <FileText className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-[20px] font-bold tracking-tight text-text">
              General CV — coming soon
            </h2>
            {/* Stated plainly. This page must never present a download that
                does not resolve as if it worked. */}
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              A general CV covering education, experience, projects, and certifications is in
              preparation. In the meantime, everything the CV would contain is already on this
              site — see{" "}
              <a href="/about" className="text-accent hover:underline">
                About
              </a>
              ,{" "}
              <a href="/projects" className="text-accent hover:underline">
                Projects
              </a>
              , and{" "}
              <a href="/certifications" className="text-accent hover:underline">
                Certifications
              </a>
              .
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Applying for a specific role? Email{" "}
              <a href="mailto:ammarhilmy35@gmail.com" className="text-accent hover:underline">
                ammarhilmy35@gmail.com
              </a>{" "}
              and a CV tailored to that role can be sent directly.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "@/components/ui/Icon";
import { getAllCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/layout/SectionHeader";

/**
 * One static page per case study. generateStaticParams() is what makes this
 * work: Next.js renders all four at build time, so the deployed site serves
 * plain HTML and no function runs on a page view.
 */
export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Project not found" };

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/projects/${study.slug}` },
    openGraph: {
      title: `${study.title} — Ammar Hilmy Ramzy`,
      description: study.summary,
      url: `/projects/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <article className="pt-14">
      <Link
        href="/projects"
        className="mb-8 inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-muted hover:text-accent"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All projects
      </Link>

      <SectionHeader number="—" label={study.category} />

      <h1 className="max-w-[20ch] text-[28px] font-bold tracking-tight text-text sm:text-[36px]">
        {study.title}
      </h1>

      <p className="mt-3 font-mono text-[12px] uppercase tracking-wider text-accent">
        {study.period} · Role: {study.role}
      </p>

      <Card className="mt-8 p-5">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Period</dt>
            <dd className="mt-1 text-[15px] text-text">{study.period}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Category</dt>
            <dd className="mt-1 text-[15px] text-text">{study.category}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">My role</dt>
            <dd className="mt-1 text-[15px] text-text">{study.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">Stack</dt>
            <dd className="mt-1 flex flex-wrap gap-2">
              {study.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border-2 border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        {study.repo ? (
          <a
            href={study.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-accent hover:underline"
          >
            View repository
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : null}
      </Card>

      <div
        className="case-study-body mt-10 max-w-[68ch]"
        dangerouslySetInnerHTML={{ __html: study.body }}
      />
    </article>
  );
}

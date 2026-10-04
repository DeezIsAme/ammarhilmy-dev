/**
 * ProjectCard — one project, linking to its case study.
 * Reused by the homepage grid and the /projects page.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icon";
import type { Project } from "@/data/projects";
import { Card } from "@/components/ui/Card";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] w-full border-b-2 border-border bg-base">
        <Image
          src={project.image}
          alt={`${project.title} — project preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
          {project.period} · {project.category}
        </span>

        <h3 className="mt-2 text-[20px] font-bold tracking-tight text-text">{project.title}</h3>

        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
          Role: {project.role}
        </p>

        <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border-2 border-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted"
            >
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-accent hover:underline"
        >
          Read case study
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}

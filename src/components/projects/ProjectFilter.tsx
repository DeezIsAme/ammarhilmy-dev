/**
 * ProjectFilter — client-side category filter for the /projects page.
 *
 * Every project card is present in the static HTML; filtering only hides and
 * shows what is already rendered. That keeps the page readable with JavaScript
 * disabled and keeps the filter from being a dependency for content.
 */

"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

const CATEGORIES = ["All", "AI / LLM", "AI Agent · Web", "Web · Freelance", "Embedded"] as const;

export function ProjectFilter() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const visible: Project[] =
    active === "All" ? projects : projects.filter((project) => project.category === active);

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
        {CATEGORIES.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={isActive}
              className={[
                "min-h-[44px] rounded-[var(--radius-btn)] border-2 px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors",
                isActive
                  ? "border-accent bg-accent text-ink"
                  : "border-border text-muted hover:border-accent hover:text-accent",
              ].join(" ")}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} project{visible.length === 1 ? "" : "s"} shown
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}

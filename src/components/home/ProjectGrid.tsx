/**
 * ProjectGrid — all four projects, newest first as declared in data.
 */

import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function ProjectGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

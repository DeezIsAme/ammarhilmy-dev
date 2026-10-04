/**
 * TechStack — skill groups with honest proficiency labels.
 *
 * Deliberately a static grid rather than a marquee: it stays readable at any
 * moment, needs no animation, and cannot disorient a reader mid-scan. The
 * spec permits one marquee; it does not require one.
 */

import { skillGroups } from "@/data/skills";
import { Card } from "@/components/ui/Card";
import { TechChip } from "@/components/ui/TechChip";

export function TechStack() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {skillGroups.map((group) => (
        <Card key={group.group} className="p-5">
          <h3 className="mb-4 font-mono text-[12px] uppercase tracking-widest text-accent">
            {group.group}
          </h3>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <li key={skill.name}>
                <TechChip skill={skill} />
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

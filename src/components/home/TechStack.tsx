/**
 * TechStack — five groups of skills as tile grids.
 *
 * Layout: each group is a card; inside it, skills sit in a fixed grid so the
 * columns line up across every card. An earlier version used a wrapping flex
 * row, which left ragged right edges and cards of uneven rhythm — a grid keeps
 * the section symmetrical, which is the point of the reference layout.
 *
 * Column counts step up with the breakpoint, and `auto-rows-fr` keeps every
 * tile the same height whatever the label length.
 */

import { skillGroups } from "@/data/skills";
import { Card } from "@/components/ui/Card";
import { TechBadge } from "@/components/ui/TechBadge";

export function TechStack() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {skillGroups.map((group) => (
        <Card key={group.group} className="flex flex-col p-5">
          <h3 className="mb-5 font-mono text-[12px] uppercase tracking-widest text-accent">
            {group.group}
          </h3>

          <ul className="grid flex-1 auto-rows-fr grid-cols-3 gap-x-3 gap-y-5 sm:grid-cols-4">
            {group.items.map((skill) => (
              <TechBadge key={skill.name} skill={skill} />
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

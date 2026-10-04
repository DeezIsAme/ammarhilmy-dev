/**
 * TechChip — one skill: brand mark (when one exists) plus its name.
 *
 * No proficiency label. A chip with no icon renders as text only — several
 * entries here genuinely have no brand mark and inventing one would be
 * decoration, not information.
 */

import type { Skill } from "@/data/skills";
import { TechIcon } from "@/components/ui/TechIcon";

export function TechChip({ skill }: { skill: Skill }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border-2 border-border bg-base px-3 py-1.5">
      {skill.icon ? <TechIcon name={skill.icon} className="h-4 w-4 shrink-0" /> : null}
      <span className="text-[13px] text-text">{skill.name}</span>
    </span>
  );
}

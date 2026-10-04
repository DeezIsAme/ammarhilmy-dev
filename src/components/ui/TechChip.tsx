/**
 * TechChip — a technology label carrying an honest proficiency marker.
 * The level tag is the point: a bare icon grid tells a reader nothing.
 */

import type { Skill, SkillLevel } from "@/data/skills";

const LEVEL_STYLE: Record<SkillLevel, string> = {
  PRIMARY: "text-accent",
  WORKING: "text-muted",
  FAMILIAR: "text-muted/70",
};

export function TechChip({ skill }: { skill: Skill }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border-2 border-border bg-base px-3 py-1.5">
      <span className="text-[13px] text-text">{skill.name}</span>
      <span
        className={`font-mono text-[10px] uppercase tracking-wider ${LEVEL_STYLE[skill.level]}`}
      >
        {skill.level}
      </span>
    </span>
  );
}

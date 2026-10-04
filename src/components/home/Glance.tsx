/**
 * Glance — the introduction shown at the top of the "At a glance" section.
 *
 * Layout: the introduction sits above the stat cards, and the stat cards keep
 * their own full-width row below. Both are in this one component so the section
 * reads as a single block rather than two stacked sections.
 *
 * Content is factual rather than promotional: it states the role, names the
 * constraint (front-end, alongside a backend teammate), and points at the
 * projects as the evidence. See profile.glance in src/data/profile.ts.
 */

import { profile } from "@/data/profile";
import { stats } from "@/data/stats";
import { StatCard } from "@/components/ui/StatCard";
import { Pill } from "@/components/ui/Pill";

export function Glance() {
  const { glance } = profile;

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-[68ch]">
        <p className="text-[20px] font-bold tracking-tight text-text">{glance.lead}</p>

        <div className="mt-4 space-y-4">
          {glance.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {glance.tracks.map((track) => (
            <li key={track}>
              <Pill>{track}</Pill>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  );
}

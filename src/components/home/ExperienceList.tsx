/**
 * ExperienceList — exactly two organisations, three roles.
 * Responsibility bullets come from data; nothing is padded or invented.
 */

import { experience } from "@/data/experience";
import { Card } from "@/components/ui/Card";

export function ExperienceList() {
  return (
    <div className="grid gap-4">
      {experience.map((entry) => (
        <Card key={entry.org} className="p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-[20px] font-bold tracking-tight text-text">{entry.org}</h3>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {entry.location}
            </span>
          </div>

          {entry.context ? (
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-accent">
              {entry.context}
            </p>
          ) : null}

          <ul className="mt-4 flex flex-wrap gap-2">
            {entry.roles.map((role) => (
              <li
                key={role.title}
                className="inline-flex flex-wrap items-center gap-2 rounded-[var(--radius-btn)] border-2 border-border bg-base px-3 py-1.5"
              >
                <span className="text-[13px] text-text">{role.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {role.period}
                </span>
              </li>
            ))}
          </ul>

          <ul className="mt-5 space-y-2">
            {entry.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                <span aria-hidden="true" className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

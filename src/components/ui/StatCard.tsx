/**
 * StatCard — one figure from the credibility bento.
 * Figure in mono at 40px so the number, not the label, is what the eye lands on.
 */

import type { Stat } from "@/data/stats";

export function StatCard({ stat }: { stat: Stat }) {
  const accent = Boolean(stat.accent);

  return (
    <div
      className={[
        "flex flex-col justify-center rounded-[var(--radius-card)] border-2 border-border p-5",
        accent
          ? "bg-accent text-ink shadow-[4px_4px_0_0_var(--color-border)]"
          : "bg-surface shadow-[4px_4px_0_0_var(--color-accent)]",
      ].join(" ")}
    >
      <span className="font-mono text-[40px] leading-none font-bold">{stat.value}</span>
      <span
        className={[
          "mt-2 font-mono text-[11px] uppercase tracking-widest",
          accent ? "text-ink/80" : "text-muted",
        ].join(" ")}
      >
        {stat.label}
      </span>
    </div>
  );
}

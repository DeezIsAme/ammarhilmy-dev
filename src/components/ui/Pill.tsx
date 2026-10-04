/**
 * Pill — rounded-full label with a 2px border.
 * Used for status chips, category tags, and level markers.
 */

import type { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  /** "accent" fills the pill; "outline" is the default bordered style. */
  variant?: "outline" | "accent";
  className?: string;
}

export function Pill({ children, variant = "outline", className = "" }: PillProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 font-mono text-[11px] uppercase tracking-wider";
  const styles =
    variant === "accent"
      ? "border-accent bg-accent text-ink"
      : "border-border bg-transparent text-muted";

  return <span className={`${base} ${styles} ${className}`}>{children}</span>;
}

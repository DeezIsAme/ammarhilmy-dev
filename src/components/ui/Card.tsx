/**
 * Card — the single box primitive every section builds on.
 *
 * Style rule (WEB-PORTO-SPEC.md §4): 2px border, 12px radius, and a hard
 * 4px offset shadow in the ACCENT colour. Never a black shadow: pure black is
 * invisible against the dark base.
 */

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Set false for nested/subtle boxes that should not carry a shadow. */
  shadow?: boolean;
}

export function Card({ children, className = "", shadow = true }: CardProps) {
  return (
    <div
      className={[
        "rounded-[var(--radius-card)] border-2 border-border bg-surface",
        shadow ? "shadow-[4px_4px_0_0_var(--color-accent)]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

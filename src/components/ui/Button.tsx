/**
 * Button — link or button with a hard accent shadow that compresses on hover
 * (the "neo-press" feel). Minimum height 44px so touch targets stay compliant.
 */

import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const shared =
    "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--radius-btn)] border-2 px-5 py-2.5 text-[14px] font-semibold transition-transform";
  const styles =
    variant === "primary"
      ? "border-accent bg-accent text-ink shadow-[4px_4px_0_0_var(--color-border)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-border)]"
      : "border-border bg-transparent text-text shadow-[4px_4px_0_0_var(--color-accent)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-accent)]";

  const classes = `${shared} ${styles} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

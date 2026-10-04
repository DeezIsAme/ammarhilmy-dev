/**
 * RoleRotator — the homepage's only client component.
 *
 * Everything else on this site is a React Server Component, which is why the
 * JavaScript payload stays small. This file exists for exactly one reason:
 * cycling text needs state.
 *
 * Accessibility: the visible text cycles, so a screen reader would otherwise
 * hear a moving target. A static `sr-only` line carries the real role, and the
 * visible span is hidden from assistive tech.
 *
 * Motion: under `prefers-reduced-motion: reduce` the rotation never starts.
 */

"use client";

import { useEffect, useState } from "react";

export function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);

    if (query.matches) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2600);

    return () => window.clearInterval(id);
  }, [roles.length]);

  const current = reducedMotion ? roles[0] : roles[index];

  return (
    <p className="font-mono text-[14px]">
      <span aria-hidden="true" className="text-muted">
        {"// "}
      </span>
      <span aria-hidden="true" className="text-accent">
        {current}
      </span>
      <span
        aria-hidden="true"
        className="cursor-blink ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] bg-accent"
      />
      <span className="sr-only">{roles[0]}</span>
    </p>
  );
}

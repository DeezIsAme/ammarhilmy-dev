/**
 * RoleRotator — the homepage's only client component.
 *
 * Everything else on this site is a React Server Component, which is why the
 * JavaScript payload stays small. This file exists for exactly one reason:
 * animating text needs state.
 *
 * Effect: a typewriter. The role types itself in, holds, deletes itself, then
 * the next role types in. One setTimeout advances one step, so the state
 * machine stays readable and there is no interval drifting in the background.
 *
 * Layout stability: while the text is mid-delete the line is empty. Without a
 * reserved height the paragraph would collapse and shove the rest of the hero
 * up and down on every cycle, so the line carries a fixed min-height.
 *
 * Cursor: solid while characters are moving, blinking while idle — the same
 * thing a real terminal does.
 *
 * Accessibility: the visible line is `aria-hidden`, because characters
 * appearing one at a time would otherwise be announced one at a time. A static
 * `sr-only` line carries every role, so a screen reader hears the whole answer
 * once instead of a stream of fragments.
 *
 * Motion: under `prefers-reduced-motion: reduce` nothing animates — the first
 * role is rendered whole, and the setting is watched live, so toggling it
 * mid-session takes effect without a reload.
 */

"use client";

import { useEffect, useState } from "react";

/** ms per character while typing. */
const TYPE_MS = 70;
/** ms per character while deleting — faster, because deleting is not the point. */
const DELETE_MS = 35;
/** How long a finished role stays on screen before it starts deleting. */
const HOLD_MS = 1700;
/** The beat of empty space between one role leaving and the next arriving. */
const SWITCH_MS = 300;

type Phase = "typing" | "holding" | "deleting" | "switching";

export function RoleRotator({ roles }: { roles: string[] }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [index, setIndex] = useState(0);
  /** Number of characters currently shown. */
  const [length, setLength] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  // Track the preference live rather than reading it once on mount.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const word = roles[index] ?? "";

  useEffect(() => {
    if (reducedMotion) return;

    let timer: number;

    if (phase === "typing") {
      timer = window.setTimeout(
        length < word.length ? () => setLength(length + 1) : () => setPhase("holding"),
        TYPE_MS
      );
    } else if (phase === "holding") {
      timer = window.setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else if (phase === "deleting") {
      timer = window.setTimeout(
        length > 0 ? () => setLength(length - 1) : () => setPhase("switching"),
        DELETE_MS
      );
    } else {
      timer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % roles.length);
        setPhase("typing");
      }, SWITCH_MS);
    }

    return () => window.clearTimeout(timer);
  }, [phase, length, word.length, reducedMotion, roles.length]);

  const shown = reducedMotion ? word : word.slice(0, length);
  const cursorSolid = reducedMotion || phase === "typing" || phase === "deleting";

  return (
    <p className="min-h-[21px] font-mono text-[14px]">
      <span aria-hidden="true" className="text-muted">
        {"// "}
      </span>
      <span aria-hidden="true" className="text-accent">
        {shown}
      </span>
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] bg-accent ${
          cursorSolid ? "" : "cursor-blink"
        }`}
      />
      <span className="sr-only">{roles.join(", ")}</span>
    </p>
  );
}

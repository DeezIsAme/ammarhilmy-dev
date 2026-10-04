/**
 * TechBadge — one skill as a tile: mark on a plate, name underneath.
 *
 * Why the plate is LIGHT and the mark keeps its brand colour:
 *
 *   First attempt tinted the plate with the brand colour and left the mark in
 *   the same colour — the two merged and the icons vanished. Contrast has to
 *   come from the pair, not from either one.
 *
 *   So the plate is a near-white surface and the mark sits on it in its own
 *   brand colour. That is the pattern the reference site uses, and it solves the
 *   original problem: marks that ship dark (Next.js and Vercel are pure black,
 *   GitHub is #181717, PHP is a muted purple) are now unambiguous against the
 *   light plate, while the tile itself still reads against the dark page.
 *
 * A skill with no mark gets a monogram on the same light plate, so the grid
 * stays visually even instead of leaving a hole.
 */

import Image from "next/image";
import type { Skill } from "@/data/skills";
import { TECH_ICONS, TechIcon, type TechIconKey } from "@/components/ui/TechIcon";

/** Near-white plate. Kept as a literal because it is a fixed surface, not a
 *  palette role: it exists to make brand marks legible, in every palette. */
const PLATE_BG = "#F2F5F3";
/** Ink used for marks that ship black, and for monograms, on the light plate. */
const ON_PLATE_INK = "#101613";

/** "SQL & Relational DB" -> "SQL"; "Data Preprocessing" -> "DP". */
function monogram(name: string): string {
  const words = name.split(/[\s&/]+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function TechBadge({ skill }: { skill: Skill }) {
  const definition = skill.icon ? TECH_ICONS[skill.icon as TechIconKey] : undefined;
  /** Black brand marks, and items with no mark, need an explicit dark colour. */
  const useInkColour = !definition || definition.fill === "currentColor";

  return (
    <li className="flex flex-col items-center gap-2">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-[10px] border-2 border-border"
        style={{ backgroundColor: PLATE_BG }}
        aria-hidden="true"
      >
        {skill.image ? (
          <Image
            src={skill.image}
            alt=""
            width={64}
            height={64}
            /* Served at 64 for a 26px box: a clean 2x so the mark stays sharp
               on high-density screens instead of being downscaled to 32. */
            className="h-[26px] w-[26px] object-contain"
          />
        ) : definition ? (
          <TechIcon
            name={skill.icon as TechIconKey}
            className="h-[26px] w-[26px]"
            color={useInkColour ? ON_PLATE_INK : undefined}
          />
        ) : (
          <span
            className="font-mono text-[11px] font-bold"
            style={{ color: ON_PLATE_INK }}
          >
            {monogram(skill.name)}
          </span>
        )}
      </span>
      <span className="max-w-[8.5rem] text-center text-[13px] leading-snug text-text">
        {skill.name}
      </span>
    </li>
  );
}

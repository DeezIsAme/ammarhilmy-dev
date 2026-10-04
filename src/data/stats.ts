/**
 * Stats bento — four verified figures (WEB-PORTO-SPEC.md §6.2.1).
 *
 * Every value must stay in sync with its source:
 *   GPA            -> IDEA.md §2          final GPA 3.70
 *   Projects       -> IDEA.md §3.3        four source-verified projects
 *   Certifications -> certifications.ts   curated and excluded set (16)
 *   Experience     -> experience.ts       PPB UIN Jakarta + Comifuro (2)
 *
 * `value` is a string so "3.70" keeps its trailing zero.
 * No years-of-programming figure: unverifiable for a fresh graduate.
 */

export interface Stat {
  label: string;
  value: string;
  /** Renders on an accent-filled card. Exactly one stat should set this. */
  accent?: boolean;
}

export const stats: Stat[] = [
  { label: "GPA", value: "3.70", accent: true },
  { label: "Projects", value: "4" },
  { label: "Certifications", value: "16" },
  { label: "Experience", value: "2" },
];

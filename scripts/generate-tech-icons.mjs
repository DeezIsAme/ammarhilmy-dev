#!/usr/bin/env node
/**
 * Generates src/components/ui/TechIcon.tsx from the simple-icons package.
 *
 * Why generate instead of shipping simple-icons as a dependency: the package
 * carries ~3,400 icons. Bundling it to use twenty of them would add a permanent
 * dependency, a large install, and a licence surface for no benefit. The paths
 * are extracted once, inlined, and the package is never installed in this repo.
 *
 * Colour handling: brand hex is used as the fill EXCEPT for marks that ship
 * black (Next.js, Vercel, GitHub's #181717 is dark enough to survive). On a dark
 * canvas pure black is invisible, so those icons fall back to `currentColor`,
 * which inherits the surrounding text colour.
 *
 * Regenerate: node scripts/generate-tech-icons.mjs  (requires simple-icons on
 * hand — see the script header in the repo history for the install command)
 */

import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const require = createRequire(import.meta.url);

let si;
try {
  si = require("simple-icons");
} catch {
  console.error(
    "simple-icons not found. Install it in a scratch directory first:\n" +
      "  cd \"$LOCALAPPDATA/Temp/iconsrc\" && npm install simple-icons"
  );
  process.exit(1);
}

/** key in simple-icons -> [exported icon key on this site, brand title] */
const ICONS = {
  siHtml5: "html5",
  siCss: "css",
  siTailwindcss: "tailwindcss",
  siJavascript: "javascript",
  siTypescript: "typescript",
  siPhp: "php",
  siPython: "python",
  siC: "c",
  siMysql: "mysql",
  siLaravel: "laravel",
  siNextdotjs: "nextjs",
  siReact: "react",
  siNodedotjs: "nodejs",
  siGit: "git",
  siGithub: "github",
  siPostman: "postman",
  siFigma: "figma",
  siVercel: "vercel",
  siArduino: "arduino",
  siPytorch: "pytorch",
  siHuggingface: "huggingface",
};

/** Brand marks that ship as pure black — unusable on a dark canvas. */
const BLACK_MARKS = new Set(["siNextdotjs", "siVercel"]);

const entries = [];
const missing = [];

for (const [siKey, slug] of Object.entries(ICONS)) {
  const icon = si[siKey];
  if (!icon) {
    missing.push(siKey);
    continue;
  }
  const fill = BLACK_MARKS.has(siKey) ? "currentColor" : `#${icon.hex}`;
  entries.push({ slug, title: icon.title, path: icon.path, fill });
}

if (missing.length) {
  console.error("Missing from simple-icons:", missing.join(", "));
  process.exit(1);
}

const body = entries
  .map(
    (icon) => `  "${icon.slug}": {
    title: ${JSON.stringify(icon.title)},
    fill: ${JSON.stringify(icon.fill)},
    path: ${JSON.stringify(icon.path)},
  },`
  )
  .join("\n");

const out = `/**
 * TechIcon — brand marks for the tech stack.
 *
 * GENERATED FILE. Do not edit by hand; run scripts/generate-tech-icons.mjs.
 *
 * The SVG paths come from the simple-icons project (CC0 1.0 Universal, public
 * domain). They are inlined rather than imported so that the ~3,400-icon package
 * is not a dependency of this site.
 *
 * Colour: each mark uses its own brand hex, except marks that ship as pure black
 * (Next.js, Vercel) — those use \`currentColor\` because black is invisible on
 * this dark canvas.
 */

export type TechIconKey =
${entries.map((icon) => `  | "${icon.slug}"`).join("\n")};

interface IconDefinition {
  title: string;
  fill: string;
  path: string;
}

export const TECH_ICONS: Record<TechIconKey, IconDefinition> = {
${body}
};

export function TechIcon({
  name,
  className = "h-5 w-5",
}: {
  name: TechIconKey;
  className?: string;
}) {
  const icon = TECH_ICONS[name];
  if (!icon) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={icon.fill}
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}
`;

const target = "src/components/ui/TechIcon.tsx";
writeFileSync(target, out);
console.log(`wrote ${target} with ${entries.length} icons`);
for (const icon of entries) {
  console.log(`   ${icon.slug.padEnd(14)} ${icon.title.padEnd(22)} ${icon.fill}`);
}

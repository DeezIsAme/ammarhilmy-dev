import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Contrast gate.
 *
 * Computes WCAG contrast ratios for every palette in src/styles/palettes and
 * fails the build when a required pair drops below its threshold. This turns
 * "the accent must contrast in both themes" from a promise into a check.
 *
 * Thresholds: 4.5:1 for body text, 3:1 for large text, 4.5:1 for text placed
 * on top of the accent (button labels).
 */

const DIR = "src/styles/palettes";

/** [foreground token, background token, minimum ratio, what it is used for] */
const REQUIRED = [
  ["text", "base", 4.5, "body text on the page background"],
  ["text", "surface", 4.5, "body text inside cards"],
  ["muted", "base", 4.5, "muted text on the page background"],
  ["muted", "surface", 4.5, "muted text inside cards"],
  ["accent", "base", 3.0, "accent as large text / headings on the page background"],
  ["accent", "surface", 4.5, "accent links and labels inside cards"],
  ["ink", "accent", 4.5, "button label on an accent-filled button"],
  ["status", "base", 3.0, "availability dot vs page background (WCAG 1.4.11 non-text)"],
  ["status", "surface", 3.0, "availability dot vs card background (WCAG 1.4.11 non-text)"],
];

const hexToRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const luminance = (rgb) => {
  const channel = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channel[0] + 0.7152 * channel[1] + 0.0722 * channel[2];
};

const ratio = (a, b) => {
  const la = luminance(hexToRgb(a));
  const lb = luminance(hexToRgb(b));
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
};

let failures = 0;
let checks = 0;
const files = readdirSync(DIR).filter((f) => f.endsWith(".css"));

if (files.length === 0) {
  console.error(`No palette files found in ${DIR}`);
  process.exit(1);
}

for (const file of files) {
  const css = readFileSync(join(DIR, file), "utf8");
  const blocks = [...css.matchAll(/([^{}]+)\{([^}]+)\}/g)];

  for (const block of blocks) {
    const selector = block[1].trim().replace(/\s+/g, " ").split("\n").pop().trim();
    const tokens = Object.fromEntries(
      [...block[2].matchAll(/--p-([\w-]+):\s*(#[0-9A-Fa-f]{6})/g)].map((m) => [
        m[1],
        m[2].toLowerCase(),
      ])
    );

    if (!tokens.base) continue; // not a palette block

    const label = `${file} ${selector}`;
    for (const [fg, bg, min, purpose] of REQUIRED) {
      if (!tokens[fg] || !tokens[bg]) continue;
      checks++;
      const r = ratio(tokens[fg], tokens[bg]);
      const ok = r >= min;
      if (!ok) failures++;
      console.log(
        `${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(6)} (min ${min})  ${label}  ${fg} on ${bg}  — ${purpose}`
      );
    }
  }
}

console.log(`\n${checks} checks across ${files.length} palette files.`);

if (failures > 0) {
  console.error(`\n${failures} contrast failure(s). Fix the token values; do not relax the thresholds.`);
  process.exit(1);
}

console.log("All contrast checks passed.");

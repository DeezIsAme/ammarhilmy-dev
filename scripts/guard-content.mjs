/**
 * Content guard.
 *
 * Fails the build if a forbidden claim reaches the rendered HTML. This is the
 * executable form of the accuracy rules in IDEA.md §3.4/§3.5 and §4.1: rules
 * that live only in a document get forgotten, so they live in a script too.
 *
 * Run after `npm run build`.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = ".next/server/app";

/** [pattern, why it must not appear] */
const FORBIDDEN = [
  [/huawei certified|huawei certification/i, "HCIA-Datacom is a Course Certificate, never a Huawei certification"],
  [/ccna certification/i, "CCNAv7 is a Certificate of Course Completion, not the CCNA certification"],
  [/aws academy/i, "AWS Academy Cloud Foundation was permanently dropped"],
  [/ui\/ux designer/i, "GDSC UI/UX Designer was permanently dropped"],
  // The ban is on language-test SCORES, not on the thesis project's name (which is
  // legitimately "ETIC Question Generator"). Match score-shaped mentions only.
  [/\betic\b[^.;\n]{0,40}\b(470|score|scores|ept)\b/i, "ETIC test scores must not appear on the site"],
  [/\bept\s*470\b/i, "ETIC score (EPT 470) must not appear"],
  [/\btoafl\b/i, "TOAFL must not appear"],
  [/tableau|data science landscape/i, "IBM sub-certifications are never listed separately"],
  [/karang taruna/i, "Karang Taruna FORCA 22 is excluded"],
  [/40[,.]000\s*(visitor|attendee|orang)/i, "Comifuro 22 attendance figure is excluded"],
  [/full[- ]stack (developer|ownership|engineer)/i, "Full-stack ownership must never be claimed"],
  [/inertia\.?js|@inertiajs/i, "Sectors Copilot uses Blade + Alpine.js, not Inertia"],
  [/\bsoft ?skills?\b/i, "Soft skills are CV-only"],
];

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

if (!existsSync(ROOT)) {
  console.error(`Build output not found at ${ROOT}. Run "npm run build" first.`);
  process.exit(1);
}

const htmlFiles = walk(ROOT).filter((file) => file.endsWith(".html"));
let failures = 0;

for (const file of htmlFiles) {
  const text = readFileSync(file, "utf8");
  for (const [pattern, reason] of FORBIDDEN) {
    const match = text.match(pattern);
    if (match) {
      failures++;
      console.error(`FAIL  ${file}\n      found "${match[0]}"\n      ${reason}`);
    }
  }
}

console.log(`\nScanned ${htmlFiles.length} built HTML file(s).`);

if (failures > 0) {
  console.error(`\n${failures} content violation(s). Fix the content — not the pattern list.`);
  process.exit(1);
}

console.log("Content guard passed.");

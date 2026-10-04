/**
 * Measures the real payload of the production build.
 *
 * Next.js sends gzip-compressed assets, so the honest number is the gzipped
 * size, not the size on disk. Run against .next/static after `npm run build`.
 *
 * Run: node scripts/measure-payload.mjs
 */

import { readdirSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const ROOT = ".next/static";

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const files = walk(ROOT);
const groups = { js: [], css: [], font: [], other: [] };

for (const file of files) {
  const raw = readFileSync(file);
  const gz = gzipSync(raw, { level: 9 }).length;
  const entry = { file: file.replace(/\\/g, "/"), raw: raw.length, gz };
  if (file.endsWith(".js")) groups.js.push(entry);
  else if (file.endsWith(".css")) groups.css.push(entry);
  else if (/\.(woff2?|ttf|otf)$/.test(file)) groups.font.push(entry);
  else groups.other.push(entry);
}

const kb = (bytes) => (bytes / 1024).toFixed(1);
const sum = (list, key) => list.reduce((acc, item) => acc + item[key], 0);

console.log("Group      files   gzipped     raw");
console.log("-".repeat(46));
let totalGz = 0;
for (const [name, list] of Object.entries(groups)) {
  if (list.length === 0) continue;
  totalGz += sum(list, "gz");
  console.log(
    `${name.padEnd(10)} ${String(list.length).padStart(5)}  ${kb(sum(list, "gz")).padStart(8)} KB ${kb(sum(list, "raw")).padStart(8)} KB`
  );
}
console.log("-".repeat(46));
console.log(`${"TOTAL".padEnd(10)} ${String(files.length).padStart(5)}  ${kb(totalGz).padStart(8)} KB`);

console.log("\nLargest JavaScript chunks (gzipped):");
groups.js
  .sort((a, b) => b.gz - a.gz)
  .slice(0, 6)
  .forEach((item) => console.log(`  ${kb(item.gz).padStart(7)} KB  ${item.file.split("/").pop()}`));

// The homepage only loads the chunks its route references, so this total is an
// upper bound: not every chunk is fetched on every page.
console.log(
  `\nNote: ${files.length} static assets exist in total. A single page loads only the`,
  `\nsubset its route references, so per-page cost is below this figure.`
);

#!/usr/bin/env node
/**
 * Asset audit.
 *
 * Lists every image the built site references and whether a matching file
 * exists in public/. Run after `npm run build`.
 *
 * Run: node scripts/audit-assets.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const APP = ".next/server/app";
const PUBLIC = "public";

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });

const htmlFiles = walk(APP).filter((f) => f.endsWith(".html"));
const referenced = new Map(); // public path -> which pages

const PATTERNS = [
  /src="(\/[^"?]+\.(?:png|jpe?g|svg|gif|webp|avif))"/g,
  /src="\/_next\/image\?url=([^"&]+)/g,
  /content="https?:\/\/[^"]*?(\/[^"?]+\.(?:png|jpe?g|svg|webp))"/g,
];

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const page = file.replace(/\\/g, "/").replace(`${APP}/`, "").replace(".html", "") || "/";
  for (const pattern of PATTERNS) {
    for (const match of html.matchAll(pattern)) {
      const raw = decodeURIComponent(match[1]);
      if (!raw.startsWith("/")) continue;
      const existing = referenced.get(raw) ?? new Set();
      existing.add(page);
      referenced.set(raw, existing);
    }
  }
}

// what actually exists in public/
const onDisk = walk(PUBLIC).map((f) => "/" + f.replace(/\\/g, "/").replace(`${PUBLIC}/`, ""));

console.log("ASSETS IN public/");
for (const f of onDisk.sort()) {
  const size = statSync(join(PUBLIC, f.replace(/^\//, ""))).size;
  console.log(`  ${String(Math.round(size / 1024)).padStart(4)} KB  ${f}`);
}

console.log("\nREFERENCED BY THE BUILT SITE");
let missing = 0;
for (const [asset, pages] of [...referenced.entries()].sort()) {
  const found = onDisk.includes(asset);
  if (!found) missing++;
  console.log(`  ${found ? "OK     " : "MISSING"}  ${asset}`);
  console.log(`           used on: ${[...pages].slice(0, 4).join(", ")}`);
}

console.log("\nICONS");
const rootHtml = readFileSync(`${APP}/index.html`, "utf8");
const icons = [...rootHtml.matchAll(/<link[^>]*rel="[^"]*icon[^"]*"[^>]*>/g)].map((m) => m[0]);
console.log(`  icon links found: ${icons.length}`);
for (const i of icons) console.log("   ", i);

console.log(`\nRESULT: ${missing} referenced asset(s) missing from public/.`);
process.exit(missing > 0 ? 1 : 0);

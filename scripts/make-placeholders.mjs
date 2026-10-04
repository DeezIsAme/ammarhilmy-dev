/**
 * Generates placeholder project images.
 *
 * These exist so the layout is real before real screenshots arrive. They are
 * plain palette-coloured panels with a diagonal accent band — generated here,
 * not copied from anywhere, so there is no licensing question.
 *
 * Replace public/projects/<slug>.png with an actual screenshot when available;
 * nothing else needs to change.
 *
 * Run: node scripts/make-placeholders.mjs
 */

import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const WIDTH = 1600;
const HEIGHT = 1000;

const BASE = [0x0b, 0x0f, 0x0d];
const ACCENT = [0xa9, 0xdd, 0xbe];
const BORDER = [0x2a, 0x36, 0x30];

/** Minimal CRC32 for PNG chunks. */
const crcTable = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function encodePng(width, height, pixelAt) {
  const raw = Buffer.alloc(height * (width * 3 + 1));
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixelAt(x, y);
      raw[offset++] = r;
      raw[offset++] = g;
      raw[offset++] = b;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** Diagonal accent band with a thin border, on the base colour. */
function makePanel(variant) {
  return (x, y) => {
    const bandA = 0.62 + variant * 0.04;
    const d = y / HEIGHT - x / WIDTH;
    if (d > bandA - 0.055 && d < bandA) return ACCENT;

    const edge = 18;
    if (x < edge || y < edge || x > WIDTH - edge || y > HEIGHT - edge) return BORDER;

    // faint grid, 40px
    if (x % 40 === 0 || y % 40 === 0) return [16, 22, 19];
    return BASE;
  };
}

const slugs = [
  "etic-question-generator",
  "sectors-copilot",
  "koperasi-financial-system",
  "esp32-grain-dryer",
];

mkdirSync("public/projects", { recursive: true });

slugs.forEach((slug, index) => {
  const png = encodePng(WIDTH, HEIGHT, makePanel(index));
  const path = `public/projects/${slug}.png`;
  writeFileSync(path, png);
  console.log(`wrote ${path} (${Math.round(png.length / 1024)} KB)`);
});

console.log("\nPlaceholders written. Replace with real screenshots when available.");

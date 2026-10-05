/**
 * Typefaces.
 *
 * `zzz` — the primary face, "inpin hongmengti" (印品鸿蒙体). Body text and
 * headings. Subset to 8.7 KB; see the note below.
 *
 * `monogram` — "ZZZ System" from the HoYo-Glyphs release, cut down to three
 * letters (A, M, R) so the header monogram can spell "AMMAR". Kept in its own
 * file rather than reusing the full ZZZ System face because that face carries
 * only 30 glyphs and no punctuation at all — it is a display face, not a text
 * face, and loading it site-wide would push punctuation in real copy onto a
 * fallback. Scoped to the three letters the monogram actually renders, it
 * costs 472 bytes.
 *
 * ONE WEIGHT EACH. Both files carry a single 400 face, so `font-bold` and
 * `font-semibold` are synthesised by the browser.
 *
 * SUBSET, not the original file. The supplied TTF for the primary face is
 * 1.9 MB — it carries 7,767 glyphs because it is a Chinese typeface. Shipping
 * that to visitors would cost ~1.9 MB for a site whose entire payload is
 * ~200 KB. To regenerate after changing the original:
 *
 *   pyftsubset ZZZ.ttf ^
 *     --unicodes="U+0000-00FF,U+0100-017F,U+2000-206F,U+2070-209F,U+20AC,U+2122,U+2248" ^
 *     --layout-features='*' --flavor=woff2 --output-file=src/fonts/zzz.woff2
 *
 *   pyftsubset ZZZSystem-Regular.ttf --text="AMR" --flavor=woff2 ^
 *     --output-file=src/fonts/zzz-system-monogram.woff2
 *
 * Licence: both originals declare OS/2 fsType 0 — installable embedding, no
 * restriction on how they are embedded or served.
 */

import localFont from "next/font/local";

export const zzz = localFont({
  src: "./zzz.woff2",
  variable: "--font-zzz",
  display: "swap",
  weight: "400",
  style: "normal",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
});

export const monogram = localFont({
  src: "./zzz-system-monogram.woff2",
  variable: "--font-monogram",
  display: "swap",
  weight: "400",
  style: "normal",
  preload: true,
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});

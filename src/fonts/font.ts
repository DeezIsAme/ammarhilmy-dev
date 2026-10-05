/**
 * Primary typeface — "inpin hongmengti" (印品鸿蒙体), supplied by the site owner.
 *
 * Self-hosted via next/font/local, same as before: no request leaves for a font
 * CDN, and there is no flash of unstyled text while it loads.
 *
 * ONE WEIGHT ONLY. The file carries a single 400 face, so `font-bold` and
 * `font-semibold` (used 21 times across the site) are synthesised by the
 * browser. That is deliberate and acceptable here: the face is already heavy
 * and wide, so the synthetic bold reads as emphasis rather than as a mistake.
 *
 * SUBSET, not the original file. The supplied TTF is 1.9 MB — it carries 7,767
 * glyphs because it is a Chinese typeface. Shipping that to visitors would cost
 * ~1.9 MB for a site whose entire payload is currently ~407 KB. The subset in
 * this directory was cut from it with pyftsubset down to 8.7 KB, keeping only
 * Latin, Latin-1 Supplement, Latin Extended-A, punctuation (including en/em
 * dashes), superscripts, the euro sign, and the trademark sign — nothing the
 * site does not render.
 *
 * To regenerate after changing the original, run:
 *   pyftsubset ZZZ.ttf ^
 *     --unicodes="U+0000-00FF,U+0100-017F,U+2000-206F,U+2070-209F,U+20AC,U+2122,U+2248" ^
 *     --layout-features='*' --flavor=woff2 --output-file=src/fonts/zzz.woff2
 *
 * Licence: the file declares OS/2 fsType 0 — installable embedding, no
 * restriction on how it is embedded or served.
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

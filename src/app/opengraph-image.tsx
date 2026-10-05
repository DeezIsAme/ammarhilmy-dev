/**
 * Open Graph image — generated at build time, 1200x630.
 *
 * Both weaker reference sites failed here: one had no Open Graph tags at all,
 * so sharing its link produced an empty preview. This file exists so a shared
 * link renders a real card.
 *
 * Colours are duplicated from the ACTIVE palette (retro.css) because
 * ImageResponse cannot read CSS custom properties. This is the one place a
 * palette value is copied rather than imported — update it whenever the
 * active palette in src/app/layout.tsx changes.
 */

import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { site } from "@/data/site";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BASE = "#1A1A1A";
const SURFACE = "#232323";
const BORDER = "#4B607F";
const TEXT = "#E8D8C9";
const MUTED = "#A89A8C";
const ACCENT = "#F3701E";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BASE,
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ color: TEXT, fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>
            AH
          </span>
          <span style={{ color: ACCENT, fontSize: 34, fontWeight: 700 }}>_</span>
          <span
            style={{
              marginLeft: "auto",
              color: MUTED,
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {profile.availability}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              color: ACCENT,
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {profile.headline}
          </span>
          <span
            style={{
              color: TEXT,
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {profile.name}
          </span>
          <span style={{ color: MUTED, fontSize: 26, maxWidth: "900px", lineHeight: 1.4 }}>
            Informatics Engineering graduate building accessible, responsive web interfaces.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `2px solid ${BORDER}`,
            paddingTop: "28px",
          }}
        >
          <span style={{ color: MUTED, fontSize: 22 }}>{profile.location}</span>
          <span style={{ color: SURFACE, background: ACCENT, padding: "10px 22px", fontSize: 20 }}>
            {site.url.replace("https://", "")}
          </span>
        </div>
      </div>
    ),
    size
  );
}

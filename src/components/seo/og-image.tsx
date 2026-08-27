import { ImageResponse } from "next/og";

import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";

/** The size every platform crops from; 1200x630 is the safe common ground. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#f9f8f6";
const INK = "#1a1a1a";
const MUTED = "#676561";
const ACCENT = "#0047ff";

/**
 * The share card. Rendered from the same palette and the same approved headline
 * as the hero, so a link pasted into WhatsApp or LinkedIn looks like the site it
 * points at instead of showing nothing at all.
 *
 * Satori (behind ImageResponse) supports flexbox only -- no grid, and every
 * element with more than one child needs an explicit display.
 */
export function renderOgImage(locale: Locale) {
  const content = getContent(locale);
  const { hero } = content.home;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: 12,
            }}
          >
            SILVAN
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              color: MUTED,
              marginTop: 6,
            }}
          >
            DIGITAL STUDIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.02,
              maxWidth: 940,
            }}
          >
            {hero.headline}
          </div>
          <div
            style={{
              fontSize: 30,
              color: MUTED,
              marginTop: 26,
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            {hero.serviceLine.replaceAll(" ", " ")}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{ width: 120, height: 8, background: ACCENT, borderRadius: 4 }}
          />
        </div>
      </div>
    ),
    OG_SIZE,
  );
}

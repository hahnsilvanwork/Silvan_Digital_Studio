import { ImageResponse } from "next/og";

/**
 * The browser-tab icon, drawn from the same wordmark and palette as the site.
 *
 * Ink ground with a paper letter rather than the page's own paper ground: a
 * favicon sits on browser chrome that may be light or dark, and the dark square
 * is the one that stays legible against both. Generated through ImageResponse
 * for the same reason the share card is -- one source of truth for the brand,
 * and no binary asset to keep in sync by hand.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1a1a1a",
          color: "#f9f8f6",
          fontSize: 46,
          fontWeight: 600,
          letterSpacing: -2,
          fontFamily: "sans-serif",
        }}
      >
        S
      </div>
    ),
    size,
  );
}

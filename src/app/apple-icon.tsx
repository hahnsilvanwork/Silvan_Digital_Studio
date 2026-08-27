import { ImageResponse } from "next/og";

/**
 * The home-screen icon. iOS does not round-trip transparency well and crops to
 * its own mask, so this is a filled square with generous margin around the
 * letter rather than a scaled-up favicon.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          fontSize: 118,
          fontWeight: 600,
          letterSpacing: -5,
          fontFamily: "sans-serif",
        }}
      >
        S
      </div>
    ),
    size,
  );
}

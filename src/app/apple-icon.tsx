import { ImageResponse } from "next/og";
import { brandImageData } from "../components/seo/brand-data";

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
      // eslint-disable-next-line @next/next/no-img-element
      <img alt="SILVAN" src={brandImageData('silvan-symbol-180.png')} width={180} height={180} />
    ),
    size,
  );
}

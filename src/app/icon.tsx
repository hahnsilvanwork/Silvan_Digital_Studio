import { ImageResponse } from "next/og";
import { brandImageData } from "../components/seo/brand-data";

/**
 * The approved S outline on navy, shared with the favicon and home-screen icon.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse renders a PNG from this embedded asset, without a web request.
      // eslint-disable-next-line @next/next/no-img-element
      <img alt="SILVAN" src={brandImageData('silvan-symbol-64.png')} width={64} height={64} />
    ),
    size,
  );
}

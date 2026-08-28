import { renderOgImage } from "../../../components/seo/og-image";
import { isLocale, SUPPORTED_LOCALES } from "../../../lib/locales";

/**
 * The share card lives at a stable path rather than under the
 * `opengraph-image` file convention. That convention attaches the image at one
 * segment, and any page that declares its own `openGraph` object replaces the
 * parent's entirely -- which silently dropped the image from every page except
 * the home page. A fixed route can be referenced explicitly from the metadata
 * builder, so all 22 routes carry it.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  // An unknown segment is a 404, not the German card. Falling back meant every
  // string under /og/ answered 200 with an image, so the route advertised an
  // unbounded set of URLs that all returned the same body.
  if (!isLocale(locale)) {
    return new Response(null, { status: 404 });
  }

  return renderOgImage(locale);
}

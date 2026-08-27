import type { Locale, RouteKey } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";
import { getSiteOrigin } from "../../lib/site-url";

/**
 * Identity and offer markup for the studio.
 *
 * What is claimed here is exactly what the site itself publishes and can stand
 * behind: the person, the postal address that the imprint is legally required
 * to carry anyway, the contact routes, and the four services with the same
 * starting prices that are printed on the pages.
 *
 * What is deliberately absent stays absent: no `aggregateRating` and no
 * `review`, because no client review exists to aggregate; no `openingHours`,
 * because this is a service-area business with no counter to walk up to. Rating
 * markup invented to win a star in the search results is the fastest way to
 * lose the listing entirely -- and an odd thing to do on the site of a studio
 * that sells honest review collection.
 */

interface ServiceOffer {
  readonly route: RouteKey;
  /** Starting price in CHF, or null where the page states "on request". */
  readonly price: number | null;
}

/**
 * Kept next to the content rather than parsed out of strings like "ab CHF 300":
 * a price format change should not silently produce wrong structured data.
 * These must stay in step with `home.services` in the content files.
 */
const OFFERS: readonly ServiceOffer[] = [
  { route: "/websites", price: 300 },
  { route: "/reviews", price: 49 },
  { route: "/presence", price: 249 },
  { route: "/automation", price: null },
];

export function PersonSchema({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const { details } = content.contact;
  const { base } = getSiteOrigin();

  const absolute = (path: string) => new URL(path, base).toString();
  const telephone = details.phoneHref.replace("tel:", "");
  const address = {
    "@type": "PostalAddress",
    streetAddress: "Regensbergstrasse 23",
    postalCode: "8113",
    addressLocality: "Boppelsen",
    addressRegion: "ZH",
    addressCountry: "CH",
  };

  const personId = absolute("/#person");
  const businessId = absolute("/#studio");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Silvan Hahn",
        url: base.toString(),
        // about.intro is a sentence, which is a description and not a job title.
        description: content.about.intro,
        email: `mailto:${details.email}`,
        telephone,
        address,
        sameAs: [details.linkedIn],
        knowsAbout: content.home.services.map((service) => service.title),
        worksFor: { "@id": businessId },
      },
      {
        "@type": "ProfessionalService",
        "@id": businessId,
        name: `${content.brand.name} ${content.brand.descriptor}`,
        url: base.toString(),
        description: content.seo.home.description,
        email: `mailto:${details.email}`,
        telephone,
        address,
        founder: { "@id": personId },
        // A service-area business, not a shop: the work reaches clients across
        // Switzerland rather than at this address.
        areaServed: { "@type": "Country", name: "Switzerland" },
        priceRange: "CHF",
        currenciesAccepted: "CHF",
        sameAs: [details.linkedIn],
        makesOffer: OFFERS.map(({ route, price }) => {
          const service = content.home.services.find(
            (entry) => entry.href === route,
          );

          return {
            "@type": "Offer",
            url: absolute(localizePath(route, locale)),
            itemOffered: {
              "@type": "Service",
              name: service?.title ?? route,
              description: service?.description,
              provider: { "@id": businessId },
              areaServed: { "@type": "Country", name: "Switzerland" },
            },
            ...(price === null
              ? {}
              : {
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    price,
                    priceCurrency: "CHF",
                    valueAddedTaxIncluded: true,
                    // The pages read "from CHF x", so the number is a floor.
                    minPrice: price,
                  },
                }),
          };
        }),
      },
    ],
  };

  return (
    <script
      // Serialized with JSON.stringify and escaped, so no content string can
      // break out of the script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replaceAll("<", "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}

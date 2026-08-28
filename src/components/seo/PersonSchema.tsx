import type { Locale, RouteKey } from "../../content/types";
import { getContent } from "../../lib/locales";
import { PORTRAIT } from "../../lib/portrait";
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
  const portraitId = absolute("/#portrait");

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
        // The same photograph the about page shows. It stays on the Person and
        // off the ProfessionalService: a headshot is not a picture of the
        // business, and claiming it as one is the kind of small overstatement
        // this markup avoids everywhere else.
        image: { "@id": portraitId },
        email: `mailto:${details.email}`,
        telephone,
        address,
        sameAs: [details.linkedIn],
        knowsAbout: content.home.services.map((service) => service.title),
        worksFor: { "@id": businessId },
      },
      {
        // Declared as a node rather than a bare URL so the dimensions travel
        // with it: a crawler that wants a 1:1 or 4:3 crop can tell from the
        // markup whether this file can supply one.
        "@type": "ImageObject",
        "@id": portraitId,
        contentUrl: absolute(PORTRAIT.src),
        url: absolute(PORTRAIT.src),
        width: PORTRAIT.width,
        height: PORTRAIT.height,
        caption: content.about.portraitCaption,
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
        // The wordmark, not the portrait: a headshot is the person, and the
        // business node needs a mark of its own.
        logo: {
          "@type": "ImageObject",
          url: absolute("/icon"),
          width: 64,
          height: 64,
        },
        // A service-area business, not a shop: the work reaches clients across
        // Switzerland rather than at this address. The canton is named too --
        // country alone is the wrong granularity for a studio whose customers
        // are local businesses.
        areaServed: [
          { "@type": "AdministrativeArea", name: "Kanton Zürich" },
          { "@type": "Country", name: "Switzerland" },
        ],
        // A range, not a currency code: the published tiers run from the CHF 49
        // review card to custom projects above CHF 5'000.
        priceRange: "CHF 49-5000+",
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
                    // The pages read "ab CHF x", so the number is a floor and
                    // only minPrice can carry it. `price` states a definite
                    // amount, which contradicted the tiers running above it.
                    minPrice: price,
                    priceCurrency: "CHF",
                    valueAddedTaxIncluded: true,
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

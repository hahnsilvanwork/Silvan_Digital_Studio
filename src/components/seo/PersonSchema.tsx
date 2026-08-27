import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { getSiteOrigin } from "../../lib/site-url";

/**
 * Spec 9 allows `Person` and valid service information only. So this carries
 * the identity and the contact routes that are already published on the site,
 * plus the subjects actually offered -- and deliberately no `LocalBusiness`, no
 * street address, no opening hours, no ratings and no review counts, none of
 * which exist to be claimed truthfully.
 */
export function PersonSchema({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const { details } = content.contact;
  const { base } = getSiteOrigin();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Silvan Hahn",
    url: base.toString(),
    // about.intro is a sentence, which is a description and not a job title.
    description: content.about.intro,
    email: `mailto:${details.email}`,
    telephone: details.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      addressCountry: "CH",
    },
    sameAs: [details.linkedIn],
    knowsAbout: content.home.services.map((service) => service.title),
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

import type { FaqItem } from "../../content/types";

interface FaqSchemaProps {
  readonly items: readonly FaqItem[];
}

/**
 * FAQPage structured data for a page whose questions are all visibly rendered.
 *
 * Google requires that every question and answer in this markup also appears on
 * the page itself. That holds here because `FaqList` renders the same array as
 * plain text with nothing collapsed, so the markup can never drift from what a
 * visitor actually sees.
 */
export function FaqSchema({ items }: FaqSchemaProps) {
  if (items.length === 0) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      // Same escaping as PersonSchema: no content string can close the element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replaceAll("<", "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}

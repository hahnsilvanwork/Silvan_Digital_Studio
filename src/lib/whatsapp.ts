import type { Locale } from "../content/types";
import { getContent } from "./locales";
import {
  trimInquiry,
  visibleInquiryFields,
  type ReviewInquiryValues,
} from "./validation";

/**
 * Builds the wa.me deep link for a Review Card enquiry.
 *
 * The message is assembled from the localized field labels so the recipient
 * reads it in the same language the visitor filled it in, and it always ends
 * with the non-binding statement.
 */
export function buildReviewInquiryUrl(
  values: ReviewInquiryValues,
  locale: Locale,
): string {
  const content = getContent(locale);
  const { inquiry } = content.reviews;
  const trimmed = trimInquiry(values);

  // Derived from the same field list the form renders and the confirmation
  // screen summarises, so a new field cannot appear on screen and go missing
  // from the message.
  const lines = [inquiry.messageIntro, ""];
  const visible = new Set(visibleInquiryFields(trimmed));
  const optionGroups = {
    destination: inquiry.destinationOptions,
    product: inquiry.productOptions,
    shape: inquiry.shapeOptions,
    size: inquiry.sizeOptions,
    setup: inquiry.setupOptions,
  } as const;

  for (const field of inquiry.fields) {
    if (!visible.has(field.name)) continue;
    const value = trimmed[field.name];
    if (value === "") continue;
    const options = optionGroups[field.name as keyof typeof optionGroups];
    const displayed = options?.find((option) => option.value === value)?.label ?? value;
    lines.push(`${field.label}: ${displayed}`);
  }

  lines.push("", content.reviews.quantityDiscount, inquiry.nonBindingNotice);

  return `${content.contact.details.whatsappHref}?text=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}

import type { Locale } from "../content/types";
import { getContent } from "./locales";
import { trimInquiry, type ReviewInquiryValues } from "./validation";

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

  for (const field of inquiry.fields) {
    const value = trimmed[field.name];
    if (value === "") continue;
    lines.push(`${field.label}: ${value}`);
  }

  lines.push("", inquiry.nonBindingNotice);

  return `${content.contact.details.whatsappHref}?text=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}

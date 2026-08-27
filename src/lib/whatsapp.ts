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
  const labelFor = (name: string) =>
    inquiry.fields.find((field) => field.name === name)?.label ?? name;

  const lines = [
    inquiry.messageIntro,
    "",
    `${labelFor("product")}: ${trimmed.product}`,
    `${labelFor("quantity")}: ${trimmed.quantity}`,
    `${labelFor("variant")}: ${trimmed.variant}`,
    `${labelFor("businessName")}: ${trimmed.businessName}`,
    `${labelFor("contactPerson")}: ${trimmed.contactPerson}`,
    `${labelFor("googleUrl")}: ${trimmed.googleUrl}`,
    `${labelFor("street")}: ${trimmed.street}`,
    `${labelFor("postalCode")}: ${trimmed.postalCode}`,
    `${labelFor("city")}: ${trimmed.city}`,
  ];

  if (trimmed.note !== "") {
    lines.push(`${labelFor("note")}: ${trimmed.note}`);
  }

  lines.push("", inquiry.nonBindingNotice);

  return `${content.contact.details.whatsappHref}?text=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}

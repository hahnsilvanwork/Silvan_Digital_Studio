import type { Locale } from "../content/types";
import { getContent } from "./locales";
import { inquiryCopy } from "../content/inquiry-copy";
import { productPriceSummary } from './product-pricing';
import {
  trimInquiry,
  isPositiveInteger,
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
export function inquiryDisplayValue(values: ReviewInquiryValues, field: keyof ReviewInquiryValues, locale: Locale): string {
  if (field === "size" && values.shape === "round" && ["80", "100"].includes(values.size)) return `Ø ${values.size} mm`;
  const { inquiry } = getContent(locale).reviews;
  const groups = { destination: inquiry.destinationOptions, product: inquiry.productOptions, shape: inquiry.shapeOptions, size: inquiry.sizeOptions, setup: inquiry.setupOptions };
  const value = values[field].trim();
  if (field === "quantity" && values.product === "standard-pair" && isPositiveInteger(value)) {
    const count = Number(value);
    return locale === "de"
      ? `${count} ${count === 1 ? "Paket" : "Pakete"} (${count * 2} Karten)`
      : `${count} ${count === 1 ? "pack" : "packs"} (${count * 2} cards)`;
  }
  return groups[field as keyof typeof groups]?.find((option) => option.value === value)?.label ?? value;
}

export function buildReviewInquiryMessage(
  values: ReviewInquiryValues,
  locale: Locale,
  model?: string,
): string {
  const content = getContent(locale);
  const { inquiry } = content.reviews;
  const trimmed = trimInquiry(values);

  // Derived from the same field list the form renders and the confirmation
  // screen summarises, so a new field cannot appear on screen and go missing
  // from the message.
  const lines = [inquiry.messageIntro, ""];
  if (model) lines.push(`${inquiryCopy[locale].model}: ${model}`);
  const visible = new Set(visibleInquiryFields(trimmed));

  for (const field of inquiry.fields) {
    if (!visible.has(field.name)) continue;
    const value = trimmed[field.name];
    if (value === "") continue;
    const displayed = inquiryDisplayValue(trimmed, field.name, locale);
    lines.push(`${field.label}: ${displayed}`);
  }

  if (trimmed.product === "standard-pair") lines.push(inquiryCopy[locale].bundleHint);
  const pricing = productPriceSummary(trimmed.product, trimmed.quantity, locale);
  if (pricing) lines.push(pricing);

  lines.push("", content.reviews.quantityDiscount, inquiry.nonBindingNotice);

  return lines.join("\n");
}

export function buildReviewInquiryUrl(values: ReviewInquiryValues, locale: Locale, model?: string): string {
  return `${getContent(locale).contact.details.whatsappHref}?text=${encodeURIComponent(buildReviewInquiryMessage(values, locale, model))}`;
}

export function buildReviewInquiryEmail(values: ReviewInquiryValues, locale: Locale, model?: string): string {
  return `mailto:${getContent(locale).contact.details.email}?subject=${encodeURIComponent(inquiryCopy[locale].subject)}&body=${encodeURIComponent(buildReviewInquiryMessage(values, locale, model))}`;
}

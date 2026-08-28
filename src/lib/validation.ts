import type { ReviewInquiryFieldName } from "../content/types";

export type ReviewInquiryValues = Record<ReviewInquiryFieldName, string>;

export type ReviewInquiryErrorKind = "required" | "quantity" | "url";

export type ReviewInquiryErrors = Partial<
  Record<ReviewInquiryFieldName, ReviewInquiryErrorKind>
>;

/**
 * `variant` is deliberately absent: the page prices the products but never says
 * which colours or variants exist, so demanding one only forces a guess. It is
 * asked for as an optional preference instead.
 */
export const REQUIRED_FIELDS: readonly ReviewInquiryFieldName[] = [
  "product",
  "quantity",
  "businessName",
  "contactPerson",
  "googleUrl",
  "street",
  "postalCode",
  "city",
];

export const EMPTY_REVIEW_INQUIRY: ReviewInquiryValues = {
  product: "",
  quantity: "",
  variant: "",
  businessName: "",
  contactPerson: "",
  googleUrl: "",
  street: "",
  postalCode: "",
  city: "",
  note: "",
};

export function isPositiveInteger(value: string): boolean {
  return /^\d+$/.test(value.trim()) && Number.parseInt(value.trim(), 10) >= 1;
}

/**
 * Only https URLs are accepted. A javascript: or data: value would otherwise be
 * carried verbatim into a message that someone is expected to act on.
 */
export function isValidGoogleUrl(value: string): boolean {
  try {
    return new URL(value.trim()).protocol === "https:";
  } catch {
    return false;
  }
}

export function trimInquiry(values: ReviewInquiryValues): ReviewInquiryValues {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()]),
  ) as ReviewInquiryValues;
}

export function validateReviewInquiry(
  values: ReviewInquiryValues,
): ReviewInquiryErrors {
  const trimmed = trimInquiry(values);
  const errors: ReviewInquiryErrors = {};

  for (const field of REQUIRED_FIELDS) {
    if (trimmed[field] === "") {
      errors[field] = "required";
    }
  }

  if (errors.quantity === undefined && !isPositiveInteger(trimmed.quantity)) {
    errors.quantity = "quantity";
  }

  if (errors.googleUrl === undefined && !isValidGoogleUrl(trimmed.googleUrl)) {
    errors.googleUrl = "url";
  }

  return errors;
}

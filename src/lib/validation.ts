import type { ReviewInquiryFieldName } from "../content/types";

export type ReviewInquiryValues = Record<ReviewInquiryFieldName, string>;

export type ReviewInquiryErrorKind = "required" | "quantity" | "url";

export type ReviewInquiryErrors = Partial<
  Record<ReviewInquiryFieldName, ReviewInquiryErrorKind>
>;

const BASE_REQUIRED_FIELDS: readonly ReviewInquiryFieldName[] = [
  "destination",
  "product",
  "shape",
  "size",
  "quantity",
  "businessName",
  "contactPerson",
  "setup",
];

export const EMPTY_REVIEW_INQUIRY: ReviewInquiryValues = {
  destination: "",
  product: "",
  shape: "",
  size: "",
  quantity: "",
  businessName: "",
  contactPerson: "",
  setup: "",
  destinationUrl: "",
  note: "",
};

export function isPositiveInteger(value: string): boolean {
  return /^\d+$/.test(value.trim()) && Number.parseInt(value.trim(), 10) >= 1;
}

/**
 * Only https URLs are accepted. A javascript: or data: value would otherwise be
 * carried verbatim into a message that someone is expected to act on.
 */
export function isValidHttpsUrl(value: string): boolean {
  try {
    return new URL(value.trim()).protocol === "https:";
  } catch {
    return false;
  }
}

export function isValidGoogleUrl(value: string): boolean {
  if (!isValidHttpsUrl(value)) return false;

  const hostname = new URL(value.trim()).hostname.toLowerCase();
  return (
    hostname === "g.page" ||
    hostname === "maps.app.goo.gl" ||
    hostname === "google.com" ||
    hostname.endsWith(".google.com") ||
    hostname === "google.ch" ||
    hostname.endsWith(".google.ch")
  );
}

export function visibleInquiryFields(
  values: ReviewInquiryValues,
): readonly ReviewInquiryFieldName[] {
  return (Object.keys(EMPTY_REVIEW_INQUIRY) as ReviewInquiryFieldName[]).filter(
    (name) => {
      if (name === "shape" || name === "size") {
        return values.product !== "standard-stand";
      }
      if (name === "destinationUrl") return values.setup === "ready";
      return true;
    },
  );
}

export function requiredInquiryFields(
  values: ReviewInquiryValues,
): readonly ReviewInquiryFieldName[] {
  return BASE_REQUIRED_FIELDS.filter(
    (name) =>
      !(["shape", "size"] as ReviewInquiryFieldName[]).includes(name) ||
      values.product !== "standard-stand",
  ).concat(
    values.destination === "reviews" && values.setup === "ready"
      ? ["destinationUrl"]
      : [],
  );
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

  for (const field of requiredInquiryFields(trimmed)) {
    if (trimmed[field] === "") {
      errors[field] = "required";
    }
  }

  if (errors.quantity === undefined && !isPositiveInteger(trimmed.quantity)) {
    errors.quantity = "quantity";
  }

  if (
    trimmed.destinationUrl !== "" &&
    !(trimmed.destination === "reviews"
      ? isValidGoogleUrl(trimmed.destinationUrl)
      : isValidHttpsUrl(trimmed.destinationUrl))
  ) {
    errors.destinationUrl = "url";
  }

  return errors;
}

export const serviceChoices = [
  "Renovationen",
  "Malerarbeiten",
  "Bodenbeläge",
  "Fassade & Aussen",
  "Noch offen",
] as const;

export type InquiryDraft = {
  name: string;
  email: string;
  message: string;
  location: string;
  timeframe: string;
};
export type InquiryErrors = Partial<Record<keyof InquiryDraft, string>>;
export const emptyDraft: InquiryDraft = {
  name: "",
  email: "",
  message: "",
  location: "",
  timeframe: "",
};
export const fieldLimits = {
  name: 100,
  email: 254,
  message: 2000,
  location: 150,
  timeframe: 150,
} as const;

export function normalizeInquiry(draft: InquiryDraft): InquiryDraft {
  return {
    name: draft.name.trim(),
    email: draft.email.trim(),
    message: draft.message.trim(),
    location: draft.location.trim(),
    timeframe: draft.timeframe.trim(),
  };
}

export function validateInquiry(draft: InquiryDraft): InquiryErrors {
  const values = normalizeInquiry(draft);
  const errors: InquiryErrors = {};
  for (const field of ["name", "email", "message"] as const) {
    if (!values[field])
      errors[field] = "Bitte füllen Sie dieses Pflichtfeld aus.";
  }
  for (const field of Object.keys(fieldLimits) as (keyof InquiryDraft)[]) {
    if (values[field].length > fieldLimits[field])
      errors[field] =
        `Bitte verwenden Sie höchstens ${fieldLimits[field]} Zeichen.`;
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  return errors;
}

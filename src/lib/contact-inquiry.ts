import type { SiteContent } from "../content/types";

export const serviceReasons = ["websites", "presence", "automation"] as const;
export type ServiceReason = (typeof serviceReasons)[number];

export const websiteTiers = ['simple', 'standard', 'premium', 'custom'] as const;
export type WebsiteTier = (typeof websiteTiers)[number];

export function getWebsiteTier(params: URLSearchParams): WebsiteTier | null {
  const values = params.getAll('tier');
  return getServiceReason(params) === 'websites' && values.length === 1 && websiteTiers.some(tier => tier === values[0])
    ? values[0] as WebsiteTier : null;
}

export function getServiceReason(params: URLSearchParams): ServiceReason | null {
  const values = params.getAll("service");
  return values.length === 1 && serviceReasons.some((reason) => reason === values[0])
    ? values[0] as ServiceReason
    : null;
}

export function createContactVCard(contact: SiteContent["contact"]): string {
  const escape = (value: string) => value.replace(/\\/g, "\\\\").replace(/\r\n|\r|\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");
  return ["BEGIN:VCARD", "VERSION:4.0", `FN:${escape(contact.address[0])}`, `TEL;VALUE=uri:${contact.details.phoneHref}`, `EMAIL:${escape(contact.details.email)}`, "END:VCARD", ""].join("\r\n");
}

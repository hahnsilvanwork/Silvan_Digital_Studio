"use client";

import { track } from "@vercel/analytics";
import { sanitizeTelemetryUrl } from "./telemetry";

const EVENTS = ["inquiry_reviewed", "inquiry_whatsapp_opened", "inquiry_email_opened", "inquiry_copied", "contact_email_opened", "contact_phone_opened", "contact_whatsapp_opened"] as const;
export type InquiryEvent = (typeof EVENTS)[number];

export function measurementEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MEASUREMENT_ENABLED === "true" && typeof window !== "undefined"
    && navigator.doNotTrack !== "1"
    && !(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
}

/** No form values, destination URL, DOM text or free-form properties accepted. */
export function trackInquiryEvent(event: InquiryEvent): void {
  if (!measurementEnabled() || !EVENTS.includes(event) || !sanitizeTelemetryUrl(window.location.href)) return;
  track(event);
}

"use client";

import { Analytics, type BeforeSend } from "@vercel/analytics/react";
import { track } from "@vercel/analytics";
import { useReportWebVitals } from "next/web-vitals";
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { sanitizeTelemetryUrl } from "../../lib/telemetry";
import { measurementEnabled, trackInquiryEvent } from "../../lib/telemetry-client";

const beforeSend: BeforeSend = (event) => {
  if (!measurementEnabled()) return null;
  const url = sanitizeTelemetryUrl(event.url);
  return url ? { ...event, url } : null;
};

const reportVital: Parameters<typeof useReportWebVitals>[0] = (metric) => {
  if (!measurementEnabled() || !sanitizeTelemetryUrl(window.location.href)) return;
  if (!["LCP", "INP", "CLS"].includes(metric.name) || !Number.isFinite(metric.value)) return;
  // Never send metric IDs, entries, DOM selectors, resource URLs or attribution.
  track(`web_vital_${metric.name.toLowerCase()}`, { value: Math.round(metric.value * 1000) / 1000 });
};

function EnabledTelemetry() {
  const path = usePathname();
  useReportWebVitals(reportVital);
  useEffect(() => {
    const contact = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      // The configurator records its own more precise events.
      if (!anchor || anchor.closest("form") || anchor.closest("[data-inquiry-summary]")) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) trackInquiryEvent("contact_email_opened");
      else if (href.startsWith("tel:")) trackInquiryEvent("contact_phone_opened");
      else if (/^https:\/\/wa\.me\//.test(href)) trackInquiryEvent("contact_whatsapp_opened");
    };
    document.addEventListener("click", contact);
    return () => document.removeEventListener("click", contact);
  }, []);
  return <Analytics beforeSend={beforeSend} path={path} route={path} debug={false}
    framework="next"
    basePath={process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH}
    configString={process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG} />;
}

const subscribe = () => () => {};
const serverSnapshot = () => false;

export function PrivacySafeTelemetry() {
  const enabled = useSyncExternalStore(subscribe, measurementEnabled, serverSnapshot);
  return enabled ? <EnabledTelemetry /> : null;
}

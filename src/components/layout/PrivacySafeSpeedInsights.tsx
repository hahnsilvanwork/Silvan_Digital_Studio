"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { useSyncExternalStore } from "react";
import type { ComponentProps } from "react";
import { sanitizeTelemetryUrl } from "../../lib/telemetry";
import { browserAllowsMeasurement } from "../../lib/telemetry-client";

const enabled = () => process.env.NEXT_PUBLIC_SPEED_INSIGHTS_ENABLED === "true" && browserAllowsMeasurement();
const subscribe = () => () => {};
const serverSnapshot = () => false;

const beforeSend: NonNullable<ComponentProps<typeof SpeedInsights>["beforeSend"]> = (event) => {
  if (!enabled()) return null;
  const url = sanitizeTelemetryUrl(event.url);
  // Replace inferred routes too: query values must never become route labels.
  return url ? { ...event, url, route: new URL(url).pathname } : null;
};

export function PrivacySafeSpeedInsights() {
  const active = useSyncExternalStore(subscribe, enabled, serverSnapshot);
  return active ? <SpeedInsights beforeSend={beforeSend} debug={false} /> : null;
}

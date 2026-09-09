"use client";

import { useSyncExternalStore } from "react";
import { getServiceReason, getWebsiteTier } from "../../lib/contact-inquiry";

const subscribe = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  return () => window.removeEventListener("popstate", notify);
};
const snapshot = () => getServiceReason(new URLSearchParams(window.location.search));
const serverSnapshot = () => null;

export function useServiceReason() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

const tierSnapshot = () => getWebsiteTier(new URLSearchParams(window.location.search));
export function useWebsiteTier() {
  return useSyncExternalStore(subscribe, tierSnapshot, serverSnapshot);
}

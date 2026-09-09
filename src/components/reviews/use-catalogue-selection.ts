"use client";

import { useSyncExternalStore } from "react";
import type { ProductCategory } from "../../content/types";

const EVENT = "silvan:catalogue-selection";
function subscribe(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener("hashchange", listener);
  window.addEventListener(EVENT, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener("hashchange", listener);
    window.removeEventListener(EVENT, listener);
  };
}

export function useCatalogueSelection() {
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const hash = useSyncExternalStore(subscribe, () => window.location.hash, () => "");
  const params = new URLSearchParams(search);
  return { category: params.get("category"), modelId: params.get("model") ?? "", hash };
}

/** Only public catalogue identifiers belong in the URL; form data stays in memory. */
export function setCatalogueSelection(category: ProductCategory, model?: string, inquiry = false) {
  const url = new URL(window.location.href);
  url.searchParams.set("category", category);
  if (model) url.searchParams.set("model", model);
  else url.searchParams.delete("model");
  if (inquiry) url.hash = 'inquiry';
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { focusInquiry: Boolean(model) } }));
}

/** Set the full destination before notifying the form, including repeated model requests. */
export function requestCatalogueModel(category: ProductCategory, model: string) {
  setCatalogueSelection(category, model, true);
  document.getElementById('inquiry')?.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

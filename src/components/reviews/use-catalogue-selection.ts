"use client";

import { useSyncExternalStore } from "react";
import type { ProductCategory } from "../../content/types";

const EVENT = "silvan:catalogue-selection";
function subscribe(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener(EVENT, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(EVENT, listener);
  };
}

export function useCatalogueSelection() {
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const params = new URLSearchParams(search);
  return { category: params.get("category"), modelId: params.get("model") ?? "" };
}

/** Only public catalogue identifiers belong in the URL; form data stays in memory. */
export function setCatalogueSelection(category: ProductCategory, model?: string) {
  const url = new URL(window.location.href);
  url.searchParams.set("category", category);
  if (model) url.searchParams.set("model", model);
  else url.searchParams.delete("model");
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { focusInquiry: Boolean(model) } }));
}

import { de } from "../content/de";
import { en } from "../content/en";
import type { DeepReadonly, Locale, SiteContent } from "../content/types";

export const DEFAULT_LOCALE: Locale = "de";
export const SUPPORTED_LOCALES = ["de", "en"] as const satisfies readonly Locale[];

function deepFreeze<T>(value: T): DeepReadonly<T> {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const nestedValue of Object.values(value)) {
      deepFreeze(nestedValue);
    }

    Object.freeze(value);
  }

  return value as DeepReadonly<T>;
}

const contentByLocale = deepFreeze({ de, en });

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && SUPPORTED_LOCALES.includes(value as Locale);
}

export function getContent(locale: Locale = DEFAULT_LOCALE): SiteContent {
  return contentByLocale[locale];
}

export type { Locale, SiteContent };

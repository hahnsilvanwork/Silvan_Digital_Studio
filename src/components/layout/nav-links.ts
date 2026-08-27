import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { localizePath } from "../../lib/routes";

export interface PrimaryLink {
  readonly label: string;
  readonly href: string;
  readonly isCurrent: boolean;
}

function normalizePath(path: string): string {
  const [pathname] = path.split(/[?#]/, 1);
  return pathname.replace(/\/+$/, "") || "/";
}

/**
 * Builds the primary navigation for a locale and marks the entry the visitor is
 * currently under. A project detail route keeps the Work entry marked so the
 * navigation never loses the visitor's place.
 */
export function getPrimaryLinks(
  locale: Locale,
  currentPath: string,
): PrimaryLink[] {
  const current = normalizePath(currentPath);
  const homeHref = localizePath("/", locale);

  return getContent(locale).navigation.primary.map((item) => {
    const href = localizePath(item.href, locale);

    return {
      label: item.label,
      href,
      isCurrent:
        current === href ||
        (href !== homeHref && current.startsWith(`${href}/`)),
    };
  });
}

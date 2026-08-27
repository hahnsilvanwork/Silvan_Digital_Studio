import type { ReactNode } from "react";

import type { Locale } from "../../content/types";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { MAIN_CONTENT_ID, SITE_CONTENT_ID } from "./site-regions";

interface SiteShellProps {
  readonly locale: Locale;
  readonly currentPath: string;
  readonly children: ReactNode;
}

/**
 * The global chrome around every page. Navigation sits outside the content
 * region so the mobile drawer can mark everything else inert without removing
 * itself from the accessibility tree.
 */
export function SiteShell({ locale, currentPath, children }: SiteShellProps) {
  return (
    <>
      <Navigation currentPath={currentPath} locale={locale} />
      <div id={SITE_CONTENT_ID}>
        <main id={MAIN_CONTENT_ID}>{children}</main>
        <Footer locale={locale} />
      </div>
    </>
  );
}

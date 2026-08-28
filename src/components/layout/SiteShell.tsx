import type { ReactNode } from "react";

import type { Locale } from "../../content/types";
import { ScrollReveal } from "../motion/ScrollReveal";
import { Footer } from "./Footer";
import { Navigation } from "./Navigation";
import { RouteFocus } from "./RouteFocus";
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
      <ScrollReveal />
      <RouteFocus />
      <Navigation currentPath={currentPath} locale={locale} />
      <div id={SITE_CONTENT_ID}>
        {/* tabIndex -1 so the skip link actually moves focus here. Without it
            activeElement stays on <body> and some screen readers leave their
            virtual cursor at the top of the page, which is the one thing the
            skip link exists to prevent. */}
        <main id={MAIN_CONTENT_ID} tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
      </div>
    </>
  );
}

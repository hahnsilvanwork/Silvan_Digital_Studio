import type { ReactNode } from "react";

import type { Locale } from "../../content/types";
import { MOTION_FLAG_SCRIPT } from "../motion/motion-flag";
import { rootFontVariables } from "../../app/fonts";

interface RootDocumentProps {
  readonly locale: Locale;
  readonly children: ReactNode;
}

/**
 * The shared HTML document. German and English each have their own root layout
 * so `<html lang>` actually matches the language of the page.
 */
export function RootDocument({ locale, children }: RootDocumentProps) {
  return (
    <html lang={locale}>
      <body className={rootFontVariables}>
        <script
          dangerouslySetInnerHTML={{ __html: MOTION_FLAG_SCRIPT }}
          // Must run before the first paint, so it cannot be deferred.
          id="silvan-motion-flag"
        />
        {children}
      </body>
    </html>
  );
}

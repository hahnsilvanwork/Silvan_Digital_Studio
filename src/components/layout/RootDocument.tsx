import { PrivacySafeTelemetry } from "./PrivacySafeTelemetry";
import type { ReactNode } from "react";

import type { Locale } from "../../content/types";
import { PersonSchema } from "../seo/PersonSchema";
import { MOTION_FLAG_SCRIPT } from "../motion/motion-flag";
import { rootFontVariables } from "../../app/fonts";
import { errorPageCsp } from '../../lib/error-page-csp';

interface RootDocumentProps {
  readonly locale: Locale;
  readonly children: ReactNode;
  readonly nonce?: string;
}

/**
 * The shared HTML document. German and English each have their own root layout
 * so `<html lang>` actually matches the language of the page.
 */
export function RootDocument({ locale, children, nonce }: RootDocumentProps) {
  return (
    // The font variables must be declared on :root itself. globals.css builds
    // --font-sans from --font-geist-sans on :root, and a custom property
    // declared further down on <body> is invisible to that -- which made the
    // whole font-family invalid and dropped the page to the browser serif.
    // The inline script below stamps data-motion onto this element before
    // React hydrates, so the server markup and the live DOM differ here by
    // design. The suppression covers this element's own attributes only.
    <html
      className={rootFontVariables}
      lang={locale}
      suppressHydrationWarning
    >
      {/* A complete App Router document needs the policy before body scripts. */}
      {/* eslint-disable-next-line @next/next/no-head-element -- next/head is for the Pages Router. */}
      {nonce ? <head><meta data-nonce-csp="true" httpEquiv="Content-Security-Policy" content={errorPageCsp(nonce)} /></head> : null}
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: MOTION_FLAG_SCRIPT }}
          // Must run before the first paint, so it cannot be deferred.
          id="silvan-motion-flag"
          nonce={nonce}
        />
        <PersonSchema locale={locale} nonce={nonce} />
        {children}
        <PrivacySafeTelemetry />
      </body>
    </html>
  );
}

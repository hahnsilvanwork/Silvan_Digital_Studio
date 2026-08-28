import type { Metadata } from "next";

import "./globals.css";
import { RootDocument } from "../components/layout/RootDocument";
import { NotFoundPage } from "../features/pages/NotFoundPage";

/**
 * The 404 for URLs that match no route group at all -- a mistyped path, a stale
 * inbound link, an old URL from before a rename.
 *
 * The `(de)` and `(en)` groups each carry their own not-found, but those only
 * cover paths that already resolved into a group; `/gibt-es-nicht` reached
 * neither and fell through to the framework's own untranslated error page, with
 * no header, no footer, no way back into the site and no `lang` for a screen
 * reader to switch voice on.
 *
 * This is `global-not-found` rather than `not-found` because the two locale
 * groups are separate root layouts: there is no shared layout to inherit, so
 * the file has to render the document itself. A plain `not-found` here got
 * wrapped in the framework's own `<html>`, which nested two documents and left
 * the outer, attribute-less one as the real root.
 *
 * German, because that is the default locale an unprefixed path belongs to.
 */
export const metadata: Metadata = {
  title: "Seite nicht gefunden | SILVAN Digital Studio",
  // A 404 must never be indexed, and must not hand its canonical to another
  // page: the parent metadata would otherwise point this at the home page.
  alternates: { canonical: undefined },
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <RootDocument locale="de">
      <NotFoundPage locale="de" />
    </RootDocument>
  );
}

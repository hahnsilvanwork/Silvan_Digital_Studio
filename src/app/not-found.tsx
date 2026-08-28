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
 * no header, no footer and no way back into the site. Since the two groups are
 * separate root layouts, there is no shared layout to inherit here: this file
 * renders the document itself.
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

export default function NotFound() {
  return (
    <RootDocument locale="de">
      <NotFoundPage locale="de" />
    </RootDocument>
  );
}

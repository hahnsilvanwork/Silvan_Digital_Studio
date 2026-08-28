import type { Metadata } from "next";

import { HelloPage } from "../../../features/pages/HelloPage";
import { buildPageMetadata } from "../../../lib/page-metadata";

export const metadata: Metadata = {
  ...buildPageMetadata({ locale: "de", page: "hello", route: "/hello" }),
  // The page a tapped NFC card opens. It repeats the navigation and nothing
  // links to it, so indexing it only spends crawl budget on a duplicate of the
  // home page -- while the card itself keeps working exactly as before.
  robots: { index: false, follow: true },
};

export default function Page() {
  return <HelloPage locale="de" />;
}

import type { Metadata } from "next";

import { HelloPage } from "../../../features/pages/HelloPage";
import { buildPageMetadata } from "../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  page: "hello",
  route: "/hello",
});

export default function Page() {
  return <HelloPage locale="de" />;
}

import type { Metadata } from "next";

import { ReviewsPage } from "../../../../features/pages/ReviewsPage";
import { buildPageMetadata } from "../../../../lib/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  page: "reviews",
  route: "/reviews",
});

export default function Page() {
  return <ReviewsPage locale="en" />;
}

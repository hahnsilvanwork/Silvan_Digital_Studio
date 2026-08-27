import type { Metadata } from "next";

import { ReviewsPage } from "../../../features/pages/ReviewsPage";
import { getContent } from "../../../lib/locales";

const content = getContent("de");

export const metadata: Metadata = {
  title: content.seo.reviews.title,
  description: content.seo.reviews.description,
};

export default function Page() {
  return <ReviewsPage locale="de" />;
}

import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { ServicePage } from "./ServicePage";

interface WebsitesPageProps {
  readonly locale: Locale;
}

export function WebsitesPage({ locale }: WebsitesPageProps) {
  return (
    <ServicePage
      locale={locale}
      route="/websites"
      service={getContent(locale).websites}
    />
  );
}

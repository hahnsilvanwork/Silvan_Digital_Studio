import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { ServicePage } from "./ServicePage";

interface AutomationPageProps {
  readonly locale: Locale;
}

export function AutomationPage({ locale }: AutomationPageProps) {
  return (
    <ServicePage
      locale={locale}
      route="/automation"
      service={getContent(locale).automation}
    />
  );
}

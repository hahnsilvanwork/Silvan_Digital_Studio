import type { Locale } from "../../content/types";
import { getContent } from "../../lib/locales";
import { ServicePage } from "./ServicePage";

interface PresencePageProps {
  readonly locale: Locale;
}

export function PresencePage({ locale }: PresencePageProps) {
  return (
    <ServicePage
      locale={locale}
      route="/presence"
      service={getContent(locale).presence}
    />
  );
}

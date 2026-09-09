"use client";

import type { Locale } from "../../content/types";
import { contactCopy } from "../../content/contact-copy";
import { getServiceReason, getWebsiteTier, serviceReasons } from "../../lib/contact-inquiry";
import { useServiceReason, useWebsiteTier } from "./use-service-reason";
import { getContent } from '../../lib/locales';
import { ContactActions } from "./ContactActions";
import styles from "./entry.module.css";

export function ContactInquiry({ locale }: { readonly locale: Locale }) {
  const reason = useServiceReason();
  const tier = useWebsiteTier();
  const copy = contactCopy[locale];
  return <>
    <div className={styles.reason}>
      <label htmlFor="contact-reason">{copy.reason}</label>
      <select id="contact-reason" value={reason ?? ""} onChange={(event) => {
        const next = getServiceReason(new URLSearchParams({ service: event.target.value }));
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${next ? `?service=${next}` : ""}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }}>
        <option value="">{copy.general}</option>
        {serviceReasons.map((id) => <option key={id} value={id}>{copy.reasons[id]}</option>)}
      </select>
      {reason === 'websites' ? <>
        <label htmlFor="contact-tier">{locale === 'de' ? 'Website-Umfang' : 'Website scope'}</label>
        <select id="contact-tier" value={tier ?? ''} onChange={event => {
          const params = new URLSearchParams({service: 'websites', tier: event.target.value});
          const next = getWebsiteTier(params);
          window.history.replaceState(window.history.state, '', `${window.location.pathname}?service=websites${next ? `&tier=${next}` : ''}`);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }}>
          <option value="">{locale === 'de' ? 'Gemeinsam klären' : 'Help me choose'}</option>
          {getContent(locale).websites.priceTiers.map(item => <option value={item.id} key={item.id}>{item.name} · {item.price}</option>)}
        </select>
      </> : null}
      {reason ? <p className={styles.prompt}>{copy.prompts[reason]}</p> : null}
      <p className={styles.notice}>{copy.notice}</p>
    </div>
    <ContactActions locale={locale} reason={reason ?? undefined} tier={tier ?? undefined} immediate />
  </>;
}

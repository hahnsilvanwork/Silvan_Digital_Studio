"use client";

import { useState } from "react";
import type { Locale } from "../../content/types";
import { contactCopy } from "../../content/contact-copy";
import { getServiceReason, getWebsiteTier, serviceReasons } from "../../lib/contact-inquiry";
import { useServiceReason, useWebsiteTier } from "./use-service-reason";
import { getContent } from '../../lib/locales';
import { ContactActions } from "./ContactActions";
import styles from "./entry.module.css";
import { buildContactMessage, CONTACT_BRIEF_LIMIT } from "../../lib/contact-message";

export function ContactInquiry({ locale }: { readonly locale: Locale }) {
  const reason = useServiceReason();
  const tier = useWebsiteTier();
  const copy = contactCopy[locale];
  const [brief, setBrief] = useState('');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'fallback'>('idle');
  const message = buildContactMessage(locale, reason ?? undefined, tier ?? undefined, brief);
  async function copyMessage() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(message);
      setCopyState('copied');
    } catch { setCopyState('fallback'); }
  }
  return <>
    <div className={styles.reason}>
      <label htmlFor="contact-reason">{copy.reason}</label>
      <select id="contact-reason" value={reason ?? ""} onChange={(event) => {
        setCopyState('idle');
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
          setCopyState('idle');
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
      <details className={styles.briefDisclosure}>
      <summary>{copy.briefLabel}</summary>
      <label className="visually-hidden" htmlFor="contact-brief">{copy.briefLabel}</label>
      <textarea id="contact-brief" rows={4} value={brief} maxLength={CONTACT_BRIEF_LIMIT}
        placeholder={copy.briefPlaceholder} aria-describedby="contact-brief-hint"
        onChange={event => { setBrief(event.target.value); setCopyState('idle'); }} />
      <p id="contact-brief-hint" className={styles.notice}>{copy.briefHint}</p>
      </details>
      <p className={styles.notice}>{copy.notice}</p>
    </div>
    <ContactActions locale={locale} reason={reason ?? undefined} tier={tier ?? undefined} brief={brief} emphasize immediate />
    <div className={styles.copyBlock}>
      <button className={styles.copyButton} type="button" onClick={copyMessage}>{copy.copyAction}</button>
      {copyState !== 'idle' ? <p className={styles.notice} role="status">{copyState === 'copied' ? copy.copied : copy.copyFallback}</p> : null}
      {copyState === 'fallback' ? <>
        <label htmlFor="contact-draft">{copy.draftLabel}</label>
        <textarea id="contact-draft" value={message} readOnly rows={8} onFocus={event => event.currentTarget.select()} />
      </> : null}
    </div>
  </>;
}

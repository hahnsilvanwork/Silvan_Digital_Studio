"use client";

import { useEffect, useRef, type ReactNode } from 'react';
import type { Locale } from '../../content/types';
import styles from './review-inquiry.module.css';

/** Keep the form mounted so selections and language transfers are preserved. */
export function InquiryDisclosure({ locale, children }: { locale: Locale; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const openForRequest = () => {
      if (window.location.hash === '#inquiry' && ref.current) ref.current.open = true;
    };
    openForRequest();
    window.addEventListener('hashchange', openForRequest);
    window.addEventListener('popstate', openForRequest);
    window.addEventListener('silvan:catalogue-selection', openForRequest);
    return () => {
      window.removeEventListener('hashchange', openForRequest);
      window.removeEventListener('popstate', openForRequest);
      window.removeEventListener('silvan:catalogue-selection', openForRequest);
    };
  }, []);
  return <details ref={ref} className={styles.disclosure} data-inquiry-disclosure>
    <summary>{locale === 'de' ? 'Modell und Menge für Ihre Anfrage auswählen' : 'Choose a model and quantity for your enquiry'}</summary>
    {children}
  </details>;
}

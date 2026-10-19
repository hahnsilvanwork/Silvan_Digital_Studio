import type { Locale } from '../../content/types';
import { createContactVCard } from '../../lib/contact-inquiry';
import { getContent } from '../../lib/locales';
import styles from './save-contact.module.css';

/** Reuses the same contact data as the telephone and email links. No JS required. */
export function SaveContact({ locale }: { readonly locale: Locale }) {
  const card = createContactVCard(getContent(locale).contact);
  return <div className={styles.saveContact}>
    <a download="silvan-hahn.vcf" href={`data:text/vcard;charset=utf-8,${encodeURIComponent(card)}`}>
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4" /></svg>
      {locale === 'de' ? 'Silvans Kontaktdaten speichern' : 'Save Silvan’s contact details'}
    </a>
    <p>{locale === 'de' ? 'Öffnen Sie die heruntergeladene Kontaktdatei und speichern Sie meinen Namen, meine Nummer und meine E-Mail-Adresse in Ihren Kontakten.' : 'Open the downloaded contact file to add my name, phone number and email address to your contacts.'}</p>
  </div>;
}

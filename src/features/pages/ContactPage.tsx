import Image from 'next/image';
import { ContactInquiry } from '../../components/contact/ContactInquiry';
import { EditorialPage, RuledList, Section, SectionHead, Steps, editorialStyles } from '../../components/editorial/Sections';
import { SiteShell } from '../../components/layout/SiteShell';
import type { Locale } from '../../content/types';
import { getContent } from '../../lib/locales';
import { PORTRAIT } from '../../lib/portrait';
import { localizePath } from '../../lib/routes';
import styles from '../../components/contact/entry.module.css';

const copy = {
  de: {
    title: 'Rufen Sie an oder schreiben Sie mir.',
    lead: 'Das Erstgespräch ist kostenlos und unverbindlich. Ich antworte innert 24 Stunden.',
    byline: 'Silvan Hahn · Boppelsen bei Zürich',
    bylineRole: 'Für Betriebe in der ganzen Schweiz',
    nextTitle: 'So geht es weiter',
    nextIntro: 'Bei jedem Schritt wissen Sie, was als Nächstes passiert.',
    steps: [
      { title: 'Sie melden sich', description: 'Per Telefon, E-Mail, WhatsApp oder mit der vorbereiteten Anfrage. Ich antworte innert 24 Stunden.' },
      { title: 'Kostenloses Erstgespräch', description: 'Am Telefon, per Video oder nach Vereinbarung vor Ort. Wir klären, was Ihr Betrieb braucht.' },
      { title: 'Offerte mit Fixpreis', description: 'Sie erhalten eine schriftliche Offerte, alle Preise inkl. MWST. Erst wenn Sie zusagen, beginne ich.' },
    ],
    findTitle: 'So finden Sie mich',
    meet: 'Treffen vor Ort nach Vereinbarung',
  },
  en: {
    title: 'Call me or send me a message.',
    lead: 'The first consultation is free and without obligation. I reply within 24 hours.',
    byline: 'Silvan Hahn · Boppelsen, near Zurich',
    bylineRole: 'For businesses across Switzerland',
    nextTitle: 'What happens next',
    nextIntro: 'At every step you know what happens next.',
    steps: [
      { title: 'You get in touch', description: 'By phone, email, WhatsApp or with the prepared enquiry. I reply within 24 hours.' },
      { title: 'Free first consultation', description: 'By phone, by video or in person by arrangement. We work out what your business needs.' },
      { title: 'Quote with a fixed price', description: 'You receive a written quote, all prices incl. VAT. I only start once you accept.' },
    ],
    findTitle: 'Where to find me',
    meet: 'Meetings in person by arrangement',
  },
} as const;

export function ContactPage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const c = copy[locale];
  return <SiteShell currentPath={localizePath('/contact', locale)} locale={locale}>
    <EditorialPage>
      <section className={styles.contactPage} aria-labelledby="contact-title">
        <div className={styles.contactHead}>
          <div>
            <p className={editorialStyles.eyebrow}>{locale === 'de' ? 'Kontakt' : 'Contact'}</p>
            <h1 id="contact-title" className={editorialStyles.pageTitle}>{c.title}</h1>
          </div>
          <p className={editorialStyles.pageLead}>{c.lead}</p>
          <p className={styles.personBlock}>
            <Image className={styles.avatar} src={PORTRAIT.src} width={PORTRAIT.width} height={PORTRAIT.height} sizes="48px" alt="" />
            <span><strong>{c.byline}</strong><span>{c.bylineRole}</span></span>
          </p>
        </div>
        <div className={styles.contactSide}>
          <h2 className="visually-hidden">{content.contact.eyebrow}</h2>
          <ContactInquiry locale={locale} />
        </div>
      </section>

      <Section id="next" labelledBy="contact-next-title" band>
        <SectionHead id="contact-next-title" title={c.nextTitle} intro={c.nextIntro} />
        <Steps steps={c.steps} />
      </Section>

      <Section id="address" labelledBy="contact-address-title">
        <SectionHead id="contact-address-title" title={c.findTitle} />
        <RuledList items={[
          { title: content.contact.address.join(', '), text: c.meet },
          { title: 'LinkedIn', text: 'silvan-hahn-dev' },
        ]} />
      </Section>
    </EditorialPage>
  </SiteShell>;
}

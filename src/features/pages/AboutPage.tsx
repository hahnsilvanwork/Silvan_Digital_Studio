import Image from 'next/image';
import Link from 'next/link';
import { Arrow, PhoneIcon, localPhone } from '../../components/editorial/icons';
import { ContactCall, EditorialPage, RuledList, Section, SectionHead, TextLink, editorialStyles } from '../../components/editorial/Sections';
import { SiteShell } from '../../components/layout/SiteShell';
import type { Locale } from '../../content/types';
import { getContent } from '../../lib/locales';
import { PORTRAIT } from '../../lib/portrait';
import { localizePath } from '../../lib/routes';
import styles from '../../styles/about.module.css';

const copy = {
  de: {
    eyebrow: 'Über mich',
    primary: 'Kostenloses Erstgespräch',
    callLabel: 'Anrufen',
    promisesTitle: 'Was Sie von mir erwarten können',
    promisesIntro: 'Bei mir gibt es keine Weiterleitung an andere. Wer mit Ihnen spricht, macht auch die Arbeit.',
    promises: [
      { title: 'Ein Ansprechpartner', text: 'Vom ersten Gespräch bis nach dem Start sprechen Sie mit mir. Ich plane, gestalte und setze alles selbst um.' },
      { title: 'Einfache Sprache', text: 'Ich erkläre alles ohne Fachwörter. Sie entscheiden, ich kümmere mich um die Technik.' },
      { title: 'Fester Preis', text: 'Sie erhalten eine schriftliche Offerte mit Fixpreis, inkl. MWST. Erst wenn Sie zusagen, beginne ich.' },
      { title: 'Schnelle Antwort', text: 'Ich antworte innert 24 Stunden. Wir sprechen am Telefon, per Video oder nach Vereinbarung bei Ihnen vor Ort.' },
    ],
    standardsTitle: 'So arbeite ich',
    standardsIntro: 'Das gilt für Websites, Google-Unternehmensprofile, NFC- und QR-Karten und Automationen gleichermassen.',
    standards: [
      { title: 'Erst verstehen, dann vorschlagen', text: 'Ich frage nach, wie Ihr Betrieb arbeitet und was Ihre Kunden brauchen, bevor ich etwas vorschlage.' },
      { title: 'Ehrlich, wenn es sich nicht lohnt', text: 'Bringt eine Lösung Ihrem Betrieb wenig, sage ich Ihnen das offen.' },
      { title: 'Ihre Zugänge bleiben Ihre', text: 'Ich arbeite nur mit dem Zugriff, den Sie mir geben. Passwörter behalten Sie für sich.' },
      { title: 'Nichts ohne Ihre Freigabe', text: 'Sie prüfen alles in Ruhe. Erst nach Ihrer Freigabe geht etwas online oder in Betrieb.' },
    ],
    examplesTitle: 'Wie das aussieht',
    examplesText: 'Ich habe Beispiel-Websites für erfundene Betriebe gebaut. Sie können sie ansehen und ausprobieren.',
    examplesLink: 'Beispiele ansehen',
    contactTitle: 'Lernen wir uns kennen',
    contactIntro: 'Rufen Sie an oder schreiben Sie mir. Das Erstgespräch ist kostenlos und unverbindlich.',
    contactLink: 'Anfrage schreiben',
  },
  en: {
    eyebrow: 'About me',
    primary: 'Free first consultation',
    callLabel: 'Call',
    promisesTitle: 'What you can expect from me',
    promisesIntro: 'Nobody else takes over. The person you talk to also does the work.',
    promises: [
      { title: 'One contact', text: 'From the first conversation until after launch, you speak to me. I plan, design and build everything myself.' },
      { title: 'Plain language', text: 'I explain everything without jargon. You decide, I take care of the technology.' },
      { title: 'Fixed price', text: 'You receive a written quote with a fixed price, incl. VAT. I only start once you accept.' },
      { title: 'Quick reply', text: 'I reply within 24 hours. We talk by phone, by video or in person by arrangement.' },
    ],
    standardsTitle: 'How I work',
    standardsIntro: 'This applies equally to websites, Google Business Profiles, NFC and QR cards and automations.',
    standards: [
      { title: 'Understand first, then suggest', text: 'I ask how your business works and what your customers need before I suggest anything.' },
      { title: 'Honest if it is not worth it', text: 'If a solution would do little for your business, I tell you openly.' },
      { title: 'Your access stays yours', text: 'I only work with the access you give me. You keep your passwords to yourself.' },
      { title: 'Nothing without your approval', text: 'You review everything at your own pace. Nothing goes live or into use until you approve it.' },
    ],
    examplesTitle: 'What this looks like',
    examplesText: 'I built example websites for fictional businesses. You can view them and try them out.',
    examplesLink: 'View examples',
    contactTitle: 'Let’s get to know each other',
    contactIntro: 'Call or write to me. The first consultation is free and without obligation.',
    contactLink: 'Send an enquiry',
  },
} as const;

export function AboutPage({ locale }: { readonly locale: Locale }) {
  const content = getContent(locale);
  const c = copy[locale];
  const { phoneDisplay, phoneHref } = content.contact.details;
  const contactHref = localizePath('/contact', locale);

  return <SiteShell currentPath={localizePath('/about', locale)} locale={locale}>
    <EditorialPage>
      <section className={styles.intro} aria-labelledby="about-title">
        <div className={styles.introText}>
          <div className={styles.introTop}>
            <p className={editorialStyles.eyebrow}>{c.eyebrow}</p>
            <h1 id="about-title" className={editorialStyles.pageTitle}>{content.about.title}</h1>
          </div>
          <div className={styles.introBottom}>
          <p className={editorialStyles.pageLead}>{content.about.intro}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href={contactHref}>{c.primary}<Arrow /></Link>
            <a className={styles.call} href={phoneHref} aria-label={`${c.callLabel}: ${localPhone(phoneDisplay, locale)}`}><PhoneIcon /><span>{localPhone(phoneDisplay, locale)}</span></a>
          </div>
          </div>
        </div>
        <figure className={styles.portrait}>
          <Image {...PORTRAIT} alt={content.about.portraitAlt} priority sizes="(min-width: 48rem) 40vw, 90vw" />
          <figcaption>{content.about.portraitCaption}</figcaption>
        </figure>
      </section>

      <Section id="promises" labelledBy="about-promises-title" band>
        <SectionHead id="about-promises-title" title={c.promisesTitle} intro={c.promisesIntro} />
        <RuledList items={c.promises} />
      </Section>

      <Section id="standards" labelledBy="about-standards-title">
        <SectionHead id="about-standards-title" title={c.standardsTitle} intro={c.standardsIntro} />
        <RuledList items={c.standards} />
        <div className={editorialStyles.after}>
          <p className={editorialStyles.note}>{c.examplesText}</p>
          <TextLink href={localizePath('/work', locale)}>{c.examplesLink}</TextLink>
        </div>
      </Section>

      <ContactCall locale={locale} id="about-contact" title={c.contactTitle} intro={c.contactIntro} link={{ href: contactHref, label: c.contactLink }} />
    </EditorialPage>
  </SiteShell>;
}

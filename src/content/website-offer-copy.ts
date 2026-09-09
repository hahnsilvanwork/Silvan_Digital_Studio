import type { Locale } from './types';
import type { WebsiteTier } from '../lib/contact-inquiry';

export const websiteExamples: Record<Locale, Record<WebsiteTier, string>> = {
  de: {
    simple: 'Zum Beispiel: ein kleiner Betrieb mit Angebot, Öffnungszeiten und Kontakt auf einer Seite.',
    standard: 'Zum Beispiel: ein Handwerksbetrieb mit eigenen Seiten für Leistungen, Arbeiten und Kontakt.',
    premium: 'Zum Beispiel: ein Unternehmen mit mehreren Leistungsbereichen und umfangreichen Projektinhalten.',
    custom: 'Zum Beispiel: eine Website mit besonderen Abläufen oder einer individuellen Anbindung an bestehende Systeme.',
  },
  en: {
    simple: 'For example: a small business with its offer, opening hours and contact details on one page.',
    standard: 'For example: a trades business with dedicated services, work and contact pages.',
    premium: 'For example: a company with several service areas and an extensive project portfolio.',
    custom: 'For example: a website with specific workflows or a tailored connection to existing systems.',
  },
};

export const websiteComparison = {
  de: {
    title: 'Was Sie vor dem Start wissen sollten',
    intro: 'Die Beispiele helfen bei der Einordnung. Verbindlich wird der Umfang erst mit Ihrer individuellen Offerte.',
    rows: [
      ['Inhalte', 'Eine Seite', 'Eigene Inhaltsseiten', 'Mehrere Themenbereiche', 'Individuelle Struktur'],
      ['Gestaltung', 'Kompakter Auftritt', 'Individuelles Layout', 'Vertiefte Gestaltung und Interaktion', 'Eigenes Konzept'],
      ['Texte und Bilder', 'Lieferumfang gemeinsam festlegen', 'Lieferumfang gemeinsam festlegen', 'Lieferumfang gemeinsam festlegen', 'Lieferumfang gemeinsam festlegen'],
      ['Selbst bearbeiten', 'Auf Wunsch separat planen', 'Auf Wunsch separat planen', 'Auf Wunsch separat planen', 'Teil der Anforderungsplanung'],
    ],
    shared: 'Korrekturrunden, Termine, Einführung und Betreuung werden für Ihr Vorhaben vereinbart. Domain, Hosting und laufende Pflege sind separat. Kein Paket setzt automatisch ein CMS oder eine bestimmte Integration voraus.',
  },
  en: {
    title: 'What to know before you start',
    intro: 'These examples help you choose. Your individual quote defines the agreed scope.',
    rows: [
      ['Content', 'One page', 'Dedicated content pages', 'Several subject areas', 'Individual structure'],
      ['Design', 'Compact presence', 'Individual layout', 'More detailed design and interaction', 'Dedicated concept'],
      ['Text and images', 'Scope agreed together', 'Scope agreed together', 'Scope agreed together', 'Scope agreed together'],
      ['Editing yourself', 'Planned separately if needed', 'Planned separately if needed', 'Planned separately if needed', 'Part of requirements planning'],
    ],
    shared: 'Revision rounds, dates, training and support are agreed for your project. Domain, hosting and ongoing maintenance are separate. A CMS or a specific integration is not automatically included in any package.',
  },
} as const;

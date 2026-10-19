import type { Locale } from './types';
import type { WebsiteTier } from '../lib/contact-inquiry';

export const websiteExamples: Record<Locale, Record<WebsiteTier, string>> = {
  de: {
    simple: 'Zum Beispiel für ein kleines Café, einen Coiffeursalon oder eine selbstständige Fachperson.',
    standard: 'Zum Beispiel für einen Handwerksbetrieb mit eigenen Seiten für Leistungen, ausgeführte Arbeiten und Kontakt.',
    premium: 'Zum Beispiel für ein Unternehmen mit mehreren Abteilungen oder einem umfangreichen Projektarchiv.',
    custom: 'Zum Beispiel für einen geschützten Kundenbereich oder eine Verbindung zu Ihrer bestehenden Verwaltungssoftware.',
  },
  en: {
    simple: 'For example, a small café, a hair salon or a self-employed professional.',
    standard: 'For a trades business with separate pages for services, completed work and contact details.',
    premium: 'For example, a company with several departments or a large archive of completed projects.',
    custom: 'For example, a secure customer area or a connection to the software you use to manage your business.',
  },
};

export const websiteComparison = {
  de: {
    title: 'Die Angebote im Vergleich',
    intro: 'Hier sehen Sie die wichtigsten Unterschiede. Was Ihre Website genau enthält und kostet, halten wir in Ihrer schriftlichen Offerte fest.',
    rows: [
      ['Inhalte', 'Alles auf einer Seite', 'Eigene Seiten für Ihre Themen', 'Mehrere Inhaltsbereiche', 'Aufbau nach Ihren Anforderungen'],
      ['Gestaltung', 'Kompakt und übersichtlich', 'Auf Ihren Betrieb abgestimmt', 'Mehr Planung für Gestaltung und Bedienung', 'Eigenes Konzept für Ihr Vorhaben'],
      ['Texte und Bilder', 'Gemeinsam klären, wer was liefert', 'Gemeinsam klären, wer was liefert', 'Gemeinsam klären, wer was liefert', 'Gemeinsam klären, wer was liefert'],
      ['Inhalte selbst ändern', 'Bei Bedarf separat vereinbaren', 'Bei Bedarf separat vereinbaren', 'Bei Bedarf separat vereinbaren', 'In der Planung gemeinsam festlegen'],
    ],
    shared: 'Wir vereinbaren vorab, wie viele Korrekturrunden vorgesehen sind, wann die Website fertig sein soll und welche Einführung oder Betreuung Sie brauchen. Internetadresse, Hosting und laufende Pflege kosten separat. Wenn Sie Inhalte selbst ändern oder andere Software anbinden möchten, planen und vereinbaren wir das ausdrücklich.',
  },
  en: {
    title: 'Compare the website options',
    intro: 'See the main differences at a glance. Your written quote sets out exactly what your website will include and what it will cost.',
    rows: [
      ['Content', 'Everything on one page', 'Separate pages for your topics', 'Several content sections', 'Structure based on your requirements'],
      ['Design', 'Compact and easy to follow', 'Designed around your business', 'More planning for design and usability', 'A concept tailored to your project'],
      ['Text and images', 'We agree who provides what', 'We agree who provides what', 'We agree who provides what', 'We agree who provides what'],
      ['Editing content yourself', 'Agreed separately if needed', 'Agreed separately if needed', 'Agreed separately if needed', 'Agreed during project planning'],
    ],
    shared: 'Before work begins, we agree on revision rounds, the schedule, any training and support. Your web address, hosting and ongoing maintenance cost extra. If you want to edit content yourself or connect the website to other software, we plan and agree that separately.',
  },
} as const;

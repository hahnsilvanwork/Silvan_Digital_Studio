import type { Locale } from './types';

interface TitledText { readonly title: string; readonly text: string }
interface Fact { readonly value: string; readonly label: string }

/** Shared wording for the navy opening and closing contact on service pages. */
export const serviceCommon = {
  de: {
    callLabel: 'Anrufen',
    bylineName: 'Silvan Hahn · Boppelsen bei Zürich',
    bylineRole: 'Persönlich erreichbar, Antwort innert 24 Stunden',
    contactIntro: 'Erstgespräch kostenlos und unverbindlich. Antwort innert 24 Stunden.',
    contactLink: 'Anfrage schreiben',
    stickyCall: 'Anrufen',
    stickyEnquiry: 'Anfrage schreiben',
    exampleAction: 'Beispiel ansehen',
    allExamples: 'Alle Beispiele ansehen',
  },
  en: {
    callLabel: 'Call',
    bylineName: 'Silvan Hahn · Boppelsen, near Zurich',
    bylineRole: 'Personally available, reply within 24 hours',
    contactIntro: 'Free first consultation, no obligation. Reply within 24 hours.',
    contactLink: 'Send an enquiry',
    stickyCall: 'Call',
    stickyEnquiry: 'Send enquiry',
    exampleAction: 'View example',
    allExamples: 'See all examples',
  },
} as const satisfies Record<Locale, Record<string, string>>;

interface WebsitesPageCopy {
  readonly facts: readonly Fact[];
  readonly includedTitle: string;
  readonly includedIntro: string;
  readonly included: readonly TitledText[];
  readonly packagesIntro: string;
  readonly vat: string;
  readonly fitLabel: string;
  readonly includesLabel: string;
  readonly fits: Readonly<Record<'simple' | 'standard' | 'premium' | 'custom', string>>;
  readonly packageLink: string;
  readonly runningTitle: string;
  readonly runningText: string;
  readonly processIntro: string;
  readonly examplesTitle: string;
  readonly examplesIntro: string;
  readonly contactTitle: string;
}

export const websitesPageCopy = {
  de: {
    facts: [{ value: 'ab CHF 300', label: 'einmalig, inkl. MWST' }, { value: '2–4 Wochen', label: 'für eine kompakte Website, sobald Texte und Bilder bereit sind' }],
    includedTitle: 'Das ist bei jeder Website dabei',
    includedIntro: 'Egal welches Paket: Diese vier Dinge sind immer Teil der Arbeit.',
    included: [
      { title: 'Aufbau und Gestaltung', text: 'Ich plane, welche Inhalte wohin gehören, und gestalte die Website passend zu Ihrem Betrieb.' },
      { title: 'Gemacht fürs Handy', text: 'Ich teste jede Seite auf dem Handy und am Computer. Texte, Menü und Kontakt sind gut lesbar und einfach zu bedienen.' },
      { title: 'Direkter Weg zu Ihnen', text: 'Kunden rufen Sie mit einem Antippen an oder schreiben Ihnen direkt.' },
      { title: 'Erst prüfen, dann online', text: 'Sie sehen sich alles in Ruhe an. Erst nach Ihrer Freigabe stelle ich die Website online.' },
    ],
    packagesIntro: 'Einmalig, als Fixpreis in Ihrer Offerte.',
    vat: 'Alle Preise inkl. MWST.',
    fitLabel: 'Passt zum Beispiel für',
    includesLabel: 'Enthalten',
    fits: {
      simple: 'ein Café, einen Coiffeursalon oder eine selbständige Fachperson.',
      standard: 'einen Handwerksbetrieb mit Seiten für Leistungen, ausgeführte Arbeiten und Kontakt.',
      premium: 'ein Unternehmen mit mehreren Abteilungen oder vielen ausgeführten Projekten.',
      custom: 'einen geschützten Kundenbereich oder eine Verbindung zu Ihrer Verwaltungssoftware.',
    },
    packageLink: 'Dieses Paket besprechen',
    runningTitle: 'Was jedes Jahr dazukommt',
    runningText: 'Internetadresse und Hosting kosten jährlich zusätzlich, je nach Grösse. Der Betrag steht in Ihrer Offerte.',
    processIntro: 'Sie kennen Ihren Betrieb, ich kümmere mich um die Technik. Bei jedem Schritt wissen Sie, was als Nächstes kommt.',
    examplesTitle: 'Beispiele zum Ausprobieren',
    examplesIntro: 'Diese Websites habe ich für erfundene Betriebe entwickelt. Klicken Sie sich durch und sehen Sie, wie Kunden ein Angebot finden und eine Anfrage vorbereiten.',
    contactTitle: 'Sprechen wir über Ihre Website',
  },
  en: {
    facts: [{ value: 'from CHF 300', label: 'one-off, incl. VAT' }, { value: '2–4 weeks', label: 'for a compact website, once text and images are ready' }],
    includedTitle: 'Included with every website',
    includedIntro: 'Whichever package you choose, these four things are always part of the work.',
    included: [
      { title: 'Structure and design', text: 'I plan where each piece of content belongs and design the website to suit your business.' },
      { title: 'Made for phones', text: 'I test every page on phones and computers. Text, menu and contact details are easy to read and use.' },
      { title: 'A direct way to reach you', text: 'Customers can call you with one tap or write to you directly.' },
      { title: 'Check first, then go live', text: 'You review everything at your own pace. I only publish the website once you approve it.' },
    ],
    packagesIntro: 'One-off, as a fixed price in your quote.',
    vat: 'All prices include VAT.',
    fitLabel: 'Suits, for example',
    includesLabel: 'Included',
    fits: {
      simple: 'a café, a hair salon or a self-employed professional.',
      standard: 'a trades business with pages for services, completed work and contact.',
      premium: 'a company with several departments or many completed projects.',
      custom: 'a secure customer area or a connection to the software you run your business with.',
    },
    packageLink: 'Discuss this package',
    runningTitle: 'What you pay each year',
    runningText: 'Web address and hosting cost extra each year, depending on size. The amount is in your quote.',
    processIntro: 'You know your business, I take care of the technology. At every step you know what comes next.',
    examplesTitle: 'Examples you can try',
    examplesIntro: 'I built these websites for fictional businesses. Click through them and see how customers find a service and prepare an enquiry.',
    contactTitle: "Let's talk about your website",
  },
} as const satisfies Record<Locale, WebsitesPageCopy>;

interface PresencePageCopy {
  readonly facts: readonly Fact[];
  readonly listingTitle: string;
  readonly listing: readonly string[];
  readonly packagesTitle: string;
  readonly packagesIntro: string;
  readonly vat: string;
  readonly box: TitledText;
  readonly packageLink: string;
  readonly exampleLabel: string;
  readonly exampleTitle: string;
  readonly exampleIntro: string;
  readonly exampleNote: string;
  readonly processIntro: string;
  readonly ownershipTitle: string;
  readonly ownershipIntro: string;
  readonly ownership: readonly TitledText[];
  readonly googleLinksLabel: string;
  readonly contactTitle: string;
}

export const presencePageCopy = {
  de: {
    facts: [{ value: 'ab CHF 249', label: 'für meine Arbeit, inkl. MWST' }, { value: 'Kostenlos', label: 'ist das Profil selbst bei Google' }],
    listingTitle: 'Das sehen Ihre Kunden in Ihrem Eintrag',
    listing: ['Adresse und Weg auf Google Maps', 'Öffnungszeiten', 'Telefonnummer und Website', 'Fotos und Leistungen', 'Bewertungen Ihrer Kunden'],
    packagesTitle: 'Was ich für Sie mache',
    packagesIntro: 'Für einen neuen oder einen vorhandenen Eintrag.',
    vat: 'Fixpreis in der schriftlichen Offerte, inkl. MWST.',
    box: { title: 'Was niemand versprechen kann', text: 'Die Reihenfolge in der Google-Suche bestimmt Google. Ich sorge dafür, dass Ihre Angaben stimmen.' },
    packageLink: 'Dieses Angebot besprechen',
    exampleLabel: 'Fiktives Beispiel, kein Kundenprojekt',
    exampleTitle: 'Welche Öffnungszeiten stimmen?',
    exampleIntro: 'Eine erfundene Velowerkstatt: Google zeigt am Samstag 09–16 Uhr, die eigene Website 09–12 Uhr. Kunden wissen nicht, was gilt. Nach dem Abgleich zeigen beide dasselbe.',
    exampleNote: 'Das Beispiel zeigt, wie falsche Angaben korrigiert werden. Es zeigt nicht, dass ein Betrieb danach weiter oben erscheint oder mehr Anfragen erhält.',
    processIntro: 'Sie bestätigen die Angaben, ich trage sie ein. Bei jedem Schritt wissen Sie, was als Nächstes kommt.',
    ownershipTitle: 'Ihr Profil bleibt Ihres',
    ownershipIntro: 'Ich arbeite nur mit dem Zugriff, den Sie mir geben.',
    ownership: [
      { title: 'Sie bleiben Inhaber', text: 'Das Profil gehört Ihnen. Sie laden mich als Administrator ein, also als Person, die bearbeiten darf. Haben Sie selbst keinen Zugang, klären wir zuerst, wem das Profil gehört.' },
      { title: 'Ihr Passwort bleibt bei Ihnen', text: 'Sie geben mir kein Passwort. Meinen Zugriff können Sie jederzeit selbst wieder entfernen.' },
      { title: 'Wenn Google nachfragt', text: 'Manchmal will Google prüfen, ob der Betrieb wirklich Ihnen gehört. Ich begleite Sie dabei. Den Code geben Sie selbst bei Google ein. Wann Google das Profil freigibt, entscheidet Google.' },
    ],
    googleLinksLabel: 'Mehr dazu direkt bei Google:',
    contactTitle: 'Sprechen wir über Ihren Google-Eintrag',
  },
  en: {
    facts: [{ value: 'from CHF 249', label: 'for my work, incl. VAT' }, { value: 'Free', label: 'is the profile itself on Google' }],
    listingTitle: 'What customers see in your listing',
    listing: ['Address and directions on Google Maps', 'Opening hours', 'Phone number and website', 'Photos and services', 'Reviews from your customers'],
    packagesTitle: 'What I do for you',
    packagesIntro: 'For a new or an existing listing.',
    vat: 'Fixed price in a written quote, incl. VAT.',
    box: { title: 'What nobody can promise', text: 'Google decides the order in search. I make sure your details are correct.' },
    packageLink: 'Discuss this service',
    exampleLabel: 'Fictional example, not a client project',
    exampleTitle: 'Which opening hours are correct?',
    exampleIntro: 'A fictional bicycle workshop: Google shows Saturday hours of 09:00–16:00, its own website 09:00–12:00. Customers cannot tell which is right. After the check, both show the same hours.',
    exampleNote: 'This example shows how wrong details are corrected. It does not show that a business then ranks higher or receives more enquiries.',
    processIntro: 'You confirm the details, I enter them. At every step you know what comes next.',
    ownershipTitle: 'Your profile stays yours',
    ownershipIntro: 'I only work with the access you give me.',
    ownership: [
      { title: 'You remain the owner', text: 'The profile belongs to you. You invite me as a manager, which means someone who is allowed to make changes. If you cannot access it yourself, we first find out who owns it.' },
      { title: 'Your password stays with you', text: 'You never give me a password. You can remove my access yourself at any time.' },
      { title: 'If Google asks for verification', text: 'Sometimes Google checks that the business really is yours. I guide you through it. You enter the code at Google yourself. Google decides when the profile is approved.' },
    ],
    googleLinksLabel: 'More from Google:',
    contactTitle: "Let's talk about your Google listing",
  },
} as const satisfies Record<Locale, PresencePageCopy>;

interface AutomationCase { readonly title: string; readonly today: string; readonly automated: string }
interface AutomationPageCopy {
  readonly facts: readonly Fact[];
  readonly visualTitle: string;
  readonly visualCaption: string;
  readonly casesIntro: string;
  readonly todayLabel: string;
  readonly automatedLabel: string;
  readonly cases: readonly AutomationCase[];
  readonly moreLabel: string;
  readonly more: readonly string[];
  readonly casesNote: string;
  readonly demoTitle: string;
  readonly demoIntro: string;
  readonly demoSteps: readonly { readonly title: string; readonly description: string }[];
  readonly fitTitle: string;
  readonly fitIntro: string;
  readonly fitQuestions: readonly string[];
  readonly fitNote: string;
  readonly processIntro: string;
  readonly cost: TitledText;
  readonly contactTitle: string;
}

export const automationPageCopy = {
  de: {
    facts: [{ value: 'Kostenlos', label: 'ist das Erstgespräch' }, { value: 'Fixpreis', label: 'in der schriftlichen Offerte' }],
    visualTitle: 'Zum Beispiel',
    visualCaption: 'Mit Ihren Programmen, wo immer möglich',
    casesIntro: 'So sieht eine Automation im Alltag aus.',
    todayLabel: 'Heute',
    automatedLabel: 'Mit Automation',
    cases: [
      { title: 'Anfragen landen von selbst in Ihrer Liste', today: 'Sie kopieren Name, Telefon und Anliegen aus jeder Anfrage von Hand in eine Liste.', automated: 'Jede neue Anfrage über Ihr Formular erscheint als neue Zeile in Ihrer Liste. Sie sehen auf einen Blick, wer noch auf eine Antwort wartet.' },
      { title: 'Der Wochenbericht entsteht von selbst', today: 'Sie gehen jeden Freitag Ihre Aufgaben durch und schreiben auf, was erledigt und was offen ist.', automated: 'Der Bericht wird aus Ihrer Aufgabenliste erstellt. Sie lesen ihn nur noch durch und geben ihn frei.' },
    ],
    moreLabel: 'Weitere Möglichkeiten, zum Beispiel:',
    more: ['eine Eingangsbestätigung an alle, die Ihr Kontaktformular ausfüllen', 'eine Erinnerung an Sie, wenn eine Offerte seit einer Woche offen ist', 'neue Termine aus dem Kalender in eine Übersicht übernehmen'],
    casesNote: 'Ob das bei Ihnen geht, hängt von Ihren Programmen ab. Das kläre ich, bevor Sie eine Offerte erhalten.',
    demoTitle: 'Probieren Sie es aus: der Wochenbericht',
    demoIntro: 'Ein Beispiel mit erfundenen Aufgaben. Ändern Sie den Stand einer Aufgabe und klicken Sie auf «Bericht erstellen».',
    demoSteps: [
      { title: 'Aufgaben ändern', description: 'Setzen Sie eine Aufgabe auf «Offen» oder «Erledigt».' },
      { title: 'Bericht erstellen', description: 'Ein Klick zählt, was erledigt und was offen ist, und schreibt den Bericht.' },
      { title: 'Prüfen und freigeben', description: 'Sie lesen den Bericht und geben ihn frei. Fehlt eine Angabe, weist der Bericht darauf hin.' },
    ],
    fitTitle: 'Passt eine Automation zu Ihrem Betrieb?',
    fitIntro: 'Beantworten Sie diese Fragen für sich. Die Antworten reichen für unser erstes Gespräch.',
    fitQuestions: ['Welche Arbeit wiederholt sich jede Woche?', 'Wo tippen Sie dieselben Angaben zweimal ab?', 'Mit welchen Programmen arbeiten Sie dabei, zum Beispiel E-Mail, Excel oder Kalender?', 'Wie viel Zeit kostet Sie das pro Woche?', 'Was passiert, wenn es einmal vergessen geht?'],
    fitNote: 'Lohnt sich eine Automation absehbar nicht, sage ich Ihnen das ehrlich.',
    processIntro: 'Sie kennen Ihre Arbeit, ich kümmere mich um die Technik. Sie wissen bei jedem Schritt, was als Nächstes passiert.',
    cost: { title: 'Was eine Automation kostet', text: 'Je nach Aufgabe. Vor dem Start erhalten Sie einen Fixpreis in der Offerte, inkl. MWST.' },
    contactTitle: 'Erzählen Sie mir, welche Arbeit sich wiederholt',
  },
  en: {
    facts: [{ value: 'Free', label: 'first consultation' }, { value: 'Fixed price', label: 'in a written quote' }],
    visualTitle: 'For example',
    visualCaption: 'With your programs, wherever possible',
    casesIntro: 'This is what an automation looks like day to day.',
    todayLabel: 'Today',
    automatedLabel: 'With an automation',
    cases: [
      { title: 'Enquiries go into your list on their own', today: 'You copy the name, phone number and request from every enquiry into a list by hand.', automated: 'Every new enquiry from your form appears as a new row in your list. You see at a glance who is still waiting for a reply.' },
      { title: 'The weekly report writes itself', today: 'Every Friday you go through your tasks and note what is done and what is still open.', automated: 'The report is created from your task list. You just read it and approve it.' },
    ],
    moreLabel: 'Other possibilities, for example:',
    more: ['a confirmation email to everyone who fills in your contact form', 'a reminder to you when a quote has been open for a week', 'new calendar appointments copied into an overview'],
    casesNote: 'Whether this works for you depends on your software. I check that before you receive a quote.',
    demoTitle: 'Try it: the weekly report',
    demoIntro: 'An example with made-up tasks. Change the status of a task and click “Create report”.',
    demoSteps: [
      { title: 'Change tasks', description: 'Set a task to “Open” or “Done”.' },
      { title: 'Create the report', description: 'One click counts what is done and what is open, and writes the report.' },
      { title: 'Check and approve', description: 'You read the report and approve it. If something is missing, the report points it out.' },
    ],
    fitTitle: 'Is an automation right for your business?',
    fitIntro: 'Answer these questions for yourself. Your answers are enough for our first conversation.',
    fitQuestions: ['Which work repeats every week?', 'Where do you type the same details twice?', 'Which programs do you use for it, for example email, Excel or a calendar?', 'How much time does it take each week?', 'What happens if it gets forgotten?'],
    fitNote: 'If an automation is clearly not worth it, I will tell you honestly.',
    processIntro: 'You know your work, I take care of the technology. At every step you know what happens next.',
    cost: { title: 'What an automation costs', text: 'It depends on the task. Before we start you receive a fixed price in your quote, incl. VAT.' },
    contactTitle: 'Tell me which work keeps repeating',
  },
} as const satisfies Record<Locale, AutomationPageCopy>;

interface ReviewsPageCopy {
  readonly primaryCta: string;
  readonly facts: readonly Fact[];
  readonly howTitle: string;
  readonly howIntro: string;
  readonly usesIntro: string;
  readonly catalogueTitle: string;
  readonly catalogueIntro: string;
  readonly pricesTitle: string;
  readonly pricesIntro: string;
  readonly vat: string;
  readonly deliveryTitle: string;
  readonly deliveryText: string;
  readonly inquiryIntro: string;
  readonly inquiryNote: string;
  readonly stickyEnquiry: string;
}

export const reviewsPageCopy = {
  de: {
    primaryCta: 'Karte anfragen',
    facts: [{ value: 'ab CHF 29', label: 'Karte, inkl. MWST und Einrichtung' }, { value: 'Einzeln', label: 'bestellbar, auch ohne Website' }],
    howTitle: 'So einfach geht es für Ihre Kunden',
    howIntro: 'Bei den meisten Karten ist auch ein QR-Code aufgedruckt. Dann klappt es auch mit der Handykamera.',
    usesIntro: 'Jede Karte öffnet eine Seite. Welche das ist, legen wir zusammen fest.',
    catalogueTitle: 'Modelle ansehen',
    catalogueIntro: 'Wählen Sie eine Anwendung. Viele Modelle können Sie in 3D drehen. Mit «Anfragen» übernehmen Sie das Modell direkt in Ihre Anfrage.',
    pricesTitle: 'Was kostet eine Karte?',
    pricesIntro: 'Einmal bezahlt, Einrichtung inbegriffen.',
    vat: 'Preise pro Stück, einmalig und inkl. MWST.',
    deliveryTitle: 'Lieferung und Versand',
    deliveryText: 'Versandkosten und Liefertermin stehen in der Offerte, bevor Sie bestellen.',
    inquiryIntro: 'Sie wissen schon, welches Modell Sie möchten? Wählen Sie es unten aus. Sie sind unsicher? Rufen Sie mich an, ich helfe Ihnen bei der Auswahl. Ich antworte innert 24 Stunden.',
    inquiryNote: 'Ihre Anfrage ist unverbindlich. Den Gesamtpreis erhalten Sie in der Offerte, bevor Sie bestellen.',
    stickyEnquiry: 'Karte anfragen',
  },
  en: {
    primaryCta: 'Enquire about a card',
    facts: [{ value: 'from CHF 29', label: 'card, incl. VAT and setup' }, { value: 'On their own', label: 'no website needed' }],
    howTitle: 'This is how easy it is for your customers',
    howIntro: 'Most cards also carry a printed QR code. Then the phone camera works too.',
    usesIntro: 'Each card opens one page. We decide together which one.',
    catalogueTitle: 'Browse the models',
    catalogueIntro: 'Choose a use. Many models can be turned in 3D. “Enquire” adds the model straight to your enquiry.',
    pricesTitle: 'What does a card cost?',
    pricesIntro: 'Paid once, setup included.',
    vat: 'Prices per item, one-off and incl. VAT.',
    deliveryTitle: 'Delivery and shipping',
    deliveryText: 'Shipping costs and the delivery date are in your quote before you order.',
    inquiryIntro: 'Already know which model you want? Choose it below. Not sure? Call me and I will help you choose. I reply within 24 hours.',
    inquiryNote: 'Your enquiry carries no obligation. You receive the total price in your quote before you order.',
    stickyEnquiry: 'Enquire',
  },
} as const satisfies Record<Locale, ReviewsPageCopy>;

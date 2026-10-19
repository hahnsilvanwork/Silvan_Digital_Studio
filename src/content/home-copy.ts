import type { FaqItem, Locale } from './types';

type ServiceHref = '/websites' | '/presence' | '/reviews' | '/automation';

interface HomeCopy {
  readonly eyebrow: string;
  readonly headline: string;
  readonly intro: string;
  readonly heroServices: readonly { name: string; text: string }[];
  readonly primaryCta: string;
  /** Kept for the shared hero content (`home.hero.secondaryCta`). */
  readonly secondaryCta: string;
  readonly callLabel: string;
  readonly facts: readonly { value: string; label: string }[];
  readonly demoLabel: string;
  readonly exampleCta: string;
  readonly byline: string;
  readonly bylineRole: string;
  readonly servicesTitle: string;
  readonly servicesIntro: string;
  readonly services: readonly { href: ServiceHref; name: string; text: string; action: string; price?: string }[];
  readonly processTitle: string;
  readonly processIntro: string;
  readonly steps: readonly { title: string; description: string }[];
  readonly costTitle: string;
  readonly costIntro: string;
  readonly costVat: string;
  readonly runningTitle: string;
  readonly runningText: string;
  readonly costCta: string;
  readonly allWork: string;
  readonly faqHint: string;
  readonly workTitle: string;
  readonly workIntro: string;
  readonly projectCta: string;
  readonly studioTitle: string;
  readonly studioCopy: string;
  readonly studioPoints: readonly string[];
  readonly studioCta: string;
  readonly faqTitle: string;
  readonly faq: readonly FaqItem[];
  readonly contactTitle: string;
  readonly contactIntro: string;
  readonly contactCta: string;
  readonly stickyCall: string;
  readonly stickyEnquiry: string;
}

export const homeCopy = {
  de: {
    eyebrow: 'Für kleine Betriebe in der ganzen Schweiz',
    headline: 'Mehr Kunden. Weniger Büroarbeit.',
    intro: 'Ich erstelle Ihre Website, sorge dafür, dass man Sie auf Google findet, und nehme Ihnen wiederkehrende Büroarbeit ab. Persönlich, verständlich und zum festen Preis.',
    heroServices: [
      { name: 'Websites', text: 'klar, modern und fürs Handy gemacht' },
      { name: 'Google-Unternehmensprofil', text: 'gefunden werden auf Google und Maps' },
      { name: 'NFC- und QR-Karten', text: 'Google-Bewertungen mit einem Antippen' },
      { name: 'Automationen', text: 'weniger wiederkehrende Büroarbeit' },
    ],
    primaryCta: 'Kostenloses Erstgespräch',
    secondaryCta: 'Beispiele ansehen',
    callLabel: 'Anrufen',
    facts: [{ value: 'ab CHF 300', label: 'Website inkl. MWST' }, { value: 'Fixpreis', label: 'in der schriftlichen Offerte' }],
    demoLabel: 'Fiktives Beispielprojekt',
    exampleCta: 'Beispiel ansehen',
    byline: 'Silvan Hahn · Boppelsen bei Zürich',
    bylineRole: 'Persönlich erreichbar, Antwort innert 24 Stunden',
    servicesTitle: 'Was ich für Ihren Betrieb mache',
    servicesIntro: 'Sie können jede Leistung einzeln buchen oder mehrere kombinieren.',
    services: [
      { href: '/websites', name: 'Websites', text: 'Ihr Betrieb klar im Netz, gemacht fürs Handy.', action: 'Pakete und Preise' },
      { href: '/presence', name: 'Google-Unternehmensprofil', text: 'Richtige Öffnungszeiten, Adresse und Fotos auf Google und Maps.', action: 'Mehr zu Google' },
      { href: '/reviews', name: 'NFC- und QR-Karten', text: 'Handy hinhalten, Google-Bewertung schreiben. Auch ohne Website.', action: 'Karten ansehen', price: 'Sticker ab CHF 15 · Karten ab CHF 29' },
      { href: '/automation', name: 'Automationen', text: 'Wiederkehrende Büroarbeit läuft von selbst.', action: 'Beispiele für Automationen' },
    ],
    processTitle: 'So läuft die Zusammenarbeit ab',
    processIntro: 'Sie kennen Ihren Betrieb, ich kümmere mich um die Technik. Sie wissen bei jedem Schritt, was als Nächstes passiert.',
    steps: [
      { title: 'Kostenloses Erstgespräch', description: 'Am Telefon, per Video oder vor Ort.' },
      { title: 'Offerte mit Fixpreis', description: 'Erst nach Ihrer Zusage geht es los.' },
      { title: 'Online in 2–4 Wochen', description: 'Sobald Texte und Bilder bereit sind.' },
    ],
    costTitle: 'Was kostet eine Website?',
    costIntro: 'Einmalig, als Fixpreis in Ihrer Offerte. Internetadresse und Hosting kosten jährlich zusätzlich, je nach Grösse.',
    costVat: 'Alle Preise inkl. MWST.',
    runningTitle: 'Was jedes Jahr dazukommt',
    runningText: 'Für Ihre Internetadresse (zum Beispiel www.ihr-betrieb.ch) und das Hosting, das Ihre Website online hält, kommen jährliche Kosten dazu. Der Betrag hängt von Grösse und Wünschen ab. Sie sehen ihn in Ihrer Offerte, bevor Sie zusagen.',
    costCta: 'Alle Pakete im Detail',
    allWork: 'Alle Beispiele ansehen',
    faqHint: 'Ihre Frage ist nicht dabei? Rufen Sie mich an:',
    workTitle: 'Beispiele zum Ausprobieren',
    workIntro: 'Diese Websites habe ich für erfundene Betriebe entwickelt. Klicken Sie sich durch und sehen Sie, wie Ihre Kunden ein Angebot finden und eine Anfrage vorbereiten.',
    projectCta: 'Beispiel ansehen',
    studioTitle: 'Ihr Ansprechpartner: Silvan Hahn',
    studioCopy: 'Von der ersten Frage bis nach dem Start sprechen Sie immer mit mir. Verständlich erklärt, auch ohne Technikwissen.',
    studioPoints: ['Boppelsen bei Zürich', 'Treffen vor Ort möglich', 'Ganze Schweiz'],
    studioCta: 'Mehr über mich',
    faqTitle: 'Häufige Fragen',
    faq: [
      { question: 'Brauche ich technisches Wissen?', answer: 'Nein. Ich übernehme die Technik und erkläre Ihnen alles in einfachen Worten. Sie entscheiden, wie Ihr Betrieb gezeigt wird.' },
      { question: 'Muss ich Texte und Bilder selbst liefern?', answer: 'Nicht unbedingt. Im Erstgespräch klären wir, was schon da ist und was noch fehlt. In der Offerte steht, welche Inhalte Sie liefern und welche ich erstelle.' },
      { question: 'Wie lange dauert es?', answer: 'Eine kompakte Website ist in der Regel nach 2–4 Wochen online, sobald Texte und Bilder bereit sind. Grössere Projekte planen wir gemeinsam. Den Zeitplan halten wir in der Offerte fest.' },
      { question: 'Kann ich später etwas ändern lassen?', answer: 'Ja. Änderungen und Betreuung nach dem Start vereinbaren wir nach Ihrem Bedarf. Wenn Sie Inhalte selbst bearbeiten möchten, planen wir das von Anfang an mit ein.' },
    ],
    contactTitle: 'Erzählen Sie mir von Ihrem Betrieb',
    contactIntro: 'Erstgespräch kostenlos und unverbindlich. Antwort innert 24 Stunden.',
    contactCta: 'Anfrage schreiben',
    stickyCall: 'Anrufen',
    stickyEnquiry: 'Anfrage schreiben',
  },
  en: {
    eyebrow: 'For small businesses across Switzerland',
    headline: 'More customers. Less office work.',
    intro: 'I build your website, make sure people find you on Google and take repetitive office work off your hands. Personal, clear and at a fixed price.',
    heroServices: [
      { name: 'Websites', text: 'clear, modern and made for phones' },
      { name: 'Google Business Profile', text: 'get found on Google and Maps' },
      { name: 'NFC and QR cards', text: 'Google reviews with a single tap' },
      { name: 'Automations', text: 'less repetitive office work' },
    ],
    primaryCta: 'Free first consultation',
    secondaryCta: 'View examples',
    callLabel: 'Call',
    facts: [{ value: 'from CHF 300', label: 'Website incl. VAT' }, { value: 'Fixed price', label: 'in a written quote' }],
    demoLabel: 'Fictional example project',
    exampleCta: 'View example',
    byline: 'Silvan Hahn · Boppelsen, near Zurich',
    bylineRole: 'Personally available, reply within 24 hours',
    servicesTitle: 'What I do for your business',
    servicesIntro: 'Book any service on its own or combine several.',
    services: [
      { href: '/websites', name: 'Websites', text: 'Your business clearly online, made for phones.', action: 'Packages and prices' },
      { href: '/presence', name: 'Google Business Profile', text: 'Correct opening hours, address and photos on Google and Maps.', action: 'More about Google' },
      { href: '/reviews', name: 'NFC and QR cards', text: 'Tap the card, leave a Google review. No website needed.', action: 'View the cards', price: 'Stickers from CHF 15 · cards from CHF 29' },
      { href: '/automation', name: 'Automations', text: 'Repetitive office work runs on its own.', action: 'Automation examples' },
    ],
    processTitle: 'How we work together',
    processIntro: 'You know your business, I take care of the technology. At every step you know what happens next.',
    steps: [
      { title: 'Free first consultation', description: 'By phone, by video or in person.' },
      { title: 'Quote with a fixed price', description: 'Work only starts once you accept.' },
      { title: 'Online in 2–4 weeks', description: 'Once text and images are ready.' },
    ],
    costTitle: 'What does a website cost?',
    costIntro: 'One-off, as a fixed price in your quote. Web address and hosting cost extra each year, depending on size.',
    costVat: 'All prices include VAT.',
    runningTitle: 'What you pay each year',
    runningText: 'Your web address (for example www.your-business.ch) and the hosting that keeps your website online come with a yearly fee. The amount depends on size and what you need. You see it in your quote before you agree.',
    costCta: 'All packages in detail',
    allWork: 'See all examples',
    faqHint: 'Your question is not listed? Call me:',
    workTitle: 'Examples you can try',
    workIntro: 'I built these websites for fictional businesses. Click through them and see how your customers find a service and prepare an enquiry.',
    projectCta: 'View example',
    studioTitle: 'Your contact: Silvan Hahn',
    studioCopy: 'From your first question until after launch, you always speak to me. Explained clearly, no technical knowledge needed.',
    studioPoints: ['Boppelsen, near Zurich', 'Meetings in person possible', 'All of Switzerland'],
    studioCta: 'More about me',
    faqTitle: 'Frequently asked questions',
    faq: [
      { question: 'Do I need technical knowledge?', answer: 'No. I take care of the technology and explain everything in plain language. You decide how your business is presented.' },
      { question: 'Do I have to provide text and images?', answer: 'Not necessarily. In our first conversation we look at what you already have and what is missing. The quote states which content you provide and which I create.' },
      { question: 'How long does it take?', answer: 'A compact website is usually online within 2–4 weeks once text and images are ready. We plan larger projects together. The schedule is part of your quote.' },
      { question: 'Can I have changes made later?', answer: 'Yes. We agree on changes and support after launch to suit your needs. If you want to edit content yourself, we plan for that from the start.' },
    ],
    contactTitle: 'Tell me about your business',
    contactIntro: 'Free first consultation, no obligation. Reply within 24 hours.',
    contactCta: 'Send an enquiry',
    stickyCall: 'Call',
    stickyEnquiry: 'Send enquiry',
  },
} as const satisfies Record<Locale, HomeCopy>;

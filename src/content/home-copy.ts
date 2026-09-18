import type { FaqItem, Locale } from './types';

interface HomeCopy {
  readonly headline: string;
  readonly intro: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly byline: string;
  readonly featuredProof: string;
  readonly offerTitle: string;
  readonly offerIntro: string;
  readonly offerPoints: readonly string[];
  readonly priceNote: string;
  readonly pricesCta: string;
  readonly workTitle: string;
  readonly workIntro: string;
  readonly challenge: string;
  readonly outcome: string;
  readonly projectCta: string;
  readonly demoCta: string;
  readonly processTitle: string;
  readonly processIntro: string;
  readonly steps: readonly { title: string; description: string }[];
  readonly servicesTitle: string;
  readonly servicesIntro: string;
  readonly faqTitle: string;
  readonly faq: readonly FaqItem[];
  readonly contactTitle: string;
  readonly contactIntro: string;
  readonly contactCta: string;
}

export const homeCopy = {
  de: {
    headline: 'Websites für kleine Unternehmen.',
    intro: 'Ihr Angebot verständlich zeigen. Den Kontakt einfach machen. Ich plane, gestalte und entwickle Ihre Website – direkt mit Ihnen, von der ersten Idee bis zur Veröffentlichung.',
    primaryCta: 'Website besprechen', secondaryCta: 'Arbeiten ansehen',
    byline: 'Silvan Hahn · Ihr Webentwickler aus Boppelsen bei Zürich',
    featuredProof: 'Drei Geschäftsbereiche, ein gemeinsamer Auftritt. Die Demo übernimmt ein gewähltes Immobilienangebot direkt in die Anfrage – auf Deutsch und Englisch.',
    offerTitle: 'So viel Website, wie Sie brauchen.',
    offerIntro: 'Eine kompakte Seite für den Einstieg oder ein mehrseitiger Auftritt für Ihren Betrieb: Wir legen den Umfang fest, bevor die Umsetzung beginnt.',
    offerPoints: ['Gestaltung passend zu Ihrem Unternehmen', 'Gut bedienbar auf Smartphone und Computer', 'Umfang und Preis vorab in einer schriftlichen Offerte'],
    priceNote: 'Einmalige Umsetzung. Domain und Hosting separat.',
    pricesCta: 'Pakete und Preise vergleichen',
    workTitle: 'Nicht nur ansehen. Ausprobieren.',
    workIntro: 'Diese selbst entwickelten Konzeptprojekte zeigen Gestaltung und funktionierende Abläufe. Fiktive Unternehmen, keine Kundenaufträge.',
    challenge: 'Die Aufgabe', outcome: 'In der Demo umgesetzt',
    projectCta: 'Konzept im Detail', demoCta: 'Demo ausprobieren',
    processTitle: 'Vom ersten Gespräch zur fertigen Website.',
    processIntro: 'Sie bringen Ihr Unternehmen ein. Ich kümmere mich um Gestaltung und Entwicklung. Entscheidungen treffen wir gemeinsam.',
    steps: [
      { title: 'Ziel und Umfang klären', description: 'Wir besprechen Ihr Angebot, vorhandene Inhalte und die gewünschten Funktionen. Sie erhalten eine Offerte mit Umfang, Preis und Zeitplan.' },
      { title: 'Gestalten und umsetzen', description: 'Ich entwickle die Seitenstruktur und das Design. Ihr Feedback fliesst in die vereinbarten Korrekturrunden ein.' },
      { title: 'Gemeinsam prüfen und starten', description: 'Wir prüfen Inhalte, Darstellung und Kontaktwege. Danach geht die Website online. Pflege und spätere Änderungen vereinbaren wir passend zu Ihrem Bedarf.' },
    ],
    servicesTitle: 'Wenn Sie mehr als eine Website brauchen.',
    servicesIntro: 'Ergänzende Lösungen für den Kontakt zu Ihren Kunden und für wiederkehrende Aufgaben im Betrieb.',
    faqTitle: 'Vor dem ersten Gespräch.',
    faq: [
      { question: 'Mit welchen Kosten muss ich rechnen?', answer: 'Eine kompakte Seite beginnt bei CHF 300. Mehrseitige Business-Websites liegen zwischen CHF 700 und CHF 1’999. Der genaue Preis richtet sich nach dem vereinbarten Umfang. Domain und Hosting kommen separat dazu.', link: { href: '/websites', label: 'Alle Pakete und Leistungen ansehen' } },
      { question: 'Muss ich Texte und Bilder schon fertig haben?', answer: 'Nein. Wir klären zuerst, was vorhanden ist und was noch fehlt. In der Offerte halten wir fest, welche Inhalte Sie liefern und welche ich erstelle.' },
      { question: 'Kann ich später selbst etwas ändern?', answer: 'Wenn Sie Inhalte selbst pflegen möchten, planen wir eine passende Bearbeitungslösung. Sie ist nicht automatisch in jedem Paket enthalten. Einrichtung, Einführung und laufende Kosten vereinbaren wir vorab.' },
      { question: 'Ist die erste Anfrage verbindlich?', answer: 'Nein. Beschreiben Sie kurz Ihr Vorhaben. Wir klären gemeinsam, ob und wie ich Sie unterstützen kann. Bevor die Umsetzung beginnt, erhalten Sie eine schriftliche Offerte.' },
    ],
    contactTitle: 'Was soll Ihre Website leisten?',
    contactIntro: 'Erzählen Sie mir kurz von Ihrem Betrieb und Ihrer Idee. Gemeinsam klären wir den nächsten sinnvollen Schritt. Ihre Anfrage ist unverbindlich.',
    contactCta: 'Vorhaben kurz beschreiben',
  },
  en: {
    headline: 'Websites for small businesses.',
    intro: 'Make your offer clear. Make getting in touch easy. I plan, design and build your website – working directly with you, from the first idea to launch.',
    primaryCta: 'Discuss your website', secondaryCta: 'Explore my work',
    byline: 'Silvan Hahn · Your web developer in Boppelsen near Zurich',
    featuredProof: 'Three divisions, one coherent site. The demo carries a selected property straight into the enquiry – in German and English.',
    offerTitle: 'The website your business needs.',
    offerIntro: 'A compact page to get started or a multi-page site for your business: we agree on the scope before development begins.',
    offerPoints: ['Design that fits your business', 'Easy to use on phones and computers', 'Scope and price agreed in a written quote'],
    priceNote: 'One-time build. Domain and hosting are separate.',
    pricesCta: 'Compare packages and prices',
    workTitle: 'More than a preview. Try it out.',
    workIntro: 'These self-initiated concept projects demonstrate design and working user journeys. Fictional businesses, not client commissions.',
    challenge: 'The task', outcome: 'Implemented in the demo',
    projectCta: 'Explore the concept', demoCta: 'Try the demo',
    processTitle: 'From our first conversation to launch.',
    processIntro: 'You know your business. I handle design and development. We make decisions together.',
    steps: [
      { title: 'Agree on goals and scope', description: 'We discuss your offer, existing content and required features. You receive a quote with the scope, price and schedule.' },
      { title: 'Design and build', description: 'I develop the structure and visual design. Your feedback shapes the work through the agreed revision rounds.' },
      { title: 'Review and launch together', description: 'We check the content, layout and contact journeys before launch. Maintenance and future changes are agreed around your needs.' },
    ],
    servicesTitle: 'When you need more than a website.',
    servicesIntro: 'Additional ways to connect with your customers and simplify recurring tasks in your business.',
    faqTitle: 'Before we talk.',
    faq: [
      { question: 'How much should I budget?', answer: 'A compact page starts at CHF 300. Multi-page business websites range from CHF 700 to CHF 1,999. The final price depends on the agreed scope. Domain and hosting are separate.', link: { href: '/websites', label: 'Explore all packages and services' } },
      { question: 'Do I need finished text and images?', answer: 'No. We first establish what you have and what is missing. The quote specifies which content you provide and which I create.' },
      { question: 'Can I make updates myself?', answer: 'If you want to manage your content, we plan a suitable editing solution. It is not automatically included in every package. Setup, training and ongoing costs are agreed in advance.' },
      { question: 'Does an enquiry commit me to anything?', answer: 'No. Briefly describe your project and we discuss whether and how I can help. You receive a written quote before any implementation begins.' },
    ],
    contactTitle: 'What should your website do?',
    contactIntro: 'Tell me a little about your business and your idea. We will work out a sensible next step together. Your enquiry is non-binding.',
    contactCta: 'Describe your project',
  },
} as const satisfies Record<Locale, HomeCopy>;

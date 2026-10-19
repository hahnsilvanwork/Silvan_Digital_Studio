import type { Locale } from "./types";

interface AuditCopy {
  readonly home: Readonly<Record<"heroProjectLabel" | "viewProject" | "intro" | "servicesIntro" | "workIntro" | "productTitle" | "productIntro" | "productCta" | "productAlt", string>>;
  readonly websiteScope: {
    readonly beforePackages: string;
    readonly title: string;
    readonly costs: string;
    readonly agreement: string;
    readonly maintenanceTitle: string;
    readonly maintenanceIntro: string;
    readonly maintenanceAgreement: string;
  };
  readonly nfcConditions: {
    readonly title: string;
    readonly items: readonly { readonly question: string; readonly answer: string }[];
  };
}

export const auditCopy = {
  de: {
    home: {
      heroProjectLabel: "Falkenried-Konzept ansehen",
      viewProject: "Projekt ansehen",
      intro: "Websites und digitale Lösungen für Ihren Betrieb. Persönlich entwickelt von Silvan Hahn aus Boppelsen bei Zürich, für Betriebe in der ganzen Schweiz.",
      servicesIntro: "Ihre Angebote verständlich zeigen und die Arbeit im Büro erleichtern. Finden Sie die passende Unterstützung für Ihren Betrieb.",
      workIntro: "Selbst entwickelte Beispielwebsites für erfundene Unternehmen. Sehen Sie sich die Gestaltung an und probieren Sie die Abläufe aus.",
      productTitle: "Ein kleines Produkt. Ein direkter Weg zu Ihnen.",
      productIntro: "Bewertungen, Speisekarten oder Buchungen: Ihre Kunden halten ihr Handy an die Karte und öffnen den angezeigten Link. Bei Modellen mit QR-Code können sie diesen stattdessen scannen.",
      productCta: "NFC & QR entdecken",
      productAlt: "NFC-Karten und Aufsteller für Google-Bewertungen und digitale Speisekarten",
    },
    websiteScope: {
      "beforePackages": "Die Paketpreise gelten für die einmalige Umsetzung. Internetadresse, Hosting und laufende Betreuung kosten separat. Den genauen Umfang und wer Texte und Bilder liefert, halten wir vor dem Start in Ihrer Offerte fest.",
      "title": "Was einmalig und laufend kostet",
      "costs": "Die angegebenen Preise sind Richtwerte für die einmalige Umsetzung. Ihre Domain, also die Internetadresse, und das Hosting, das Ihre Website online hält, bezahlen Sie separat. Dafür fallen laufende Kosten an.",
      "agreement": "Vor dem Start halten wir alles in Ihrer schriftlichen Offerte fest: Seiten, Funktionen, Korrekturrunden und Zeitplan. Wir klären auch, wer Texte und Bilder liefert oder erstellt und welche Betreuung Sie später brauchen. Zusätzliche Leistungen und laufende Kosten werden separat aufgeführt.",
      "maintenanceTitle": "Wer ändert später Ihre Inhalte?",
      "maintenanceIntro": "Neue Öffnungszeiten, ein zusätzliches Angebot oder aktuelle Bilder: Wir besprechen schon bei der Planung, wie oft Sie Inhalte ändern möchten und wer das übernimmt.",
      "maintenanceAgreement": "Möchten Sie Texte und Bilder selbst ändern, planen wir bei Bedarf ein einfaches Bearbeitungssystem. Die Offerte hält fest, was Sie damit bearbeiten können, welche Einführung Sie erhalten und was Einrichtung und Betrieb kosten. Änderungen durch mich und technische Wartung vereinbaren wir ebenfalls ausdrücklich."
    },
    nfcConditions: {
      title: "Einrichtung, Nutzung und Lieferung",
      items: [
        { question: "Was wird eingerichtet?", answer: "Die Produktpreise enthalten die Programmierung und Einrichtung des vereinbarten Links. Geben Sie den vorhandenen Link an oder wählen Sie «Ich brauche Hilfe bei der Einrichtung». Eine neue Website, Speisekarte oder ein Buchungsdienst können zusätzliche Leistungen erfordern. Den Umfang und die Kosten halten wir in der schriftlichen Offerte fest. Direkten WLAN-Zugang vereinbaren wir persönlich." },
        { question: "Welche Smartphones funktionieren?", answer: "Das Handy muss NFC-Links lesen können. Bei manchen Geräten müssen Sie NFC zuerst einschalten. Bei Produkten mit QR-Code lässt sich der Code mit der Handykamera scannen. Zum Öffnen einer verlinkten Webseite ist eine Internetverbindung nötig. Besondere Geräteanforderungen besprechen wir vor Ihrer Bestellung." },
        { question: "Kann ich die verlinkte Seite später ändern?", answer: "Texte oder Bilder auf derselben Webseite lassen sich im jeweiligen Dienst ändern. Soll eine andere Webadresse geöffnet werden, kann eine Weiterleitung oder neue Programmierung nötig sein. Ein gedruckter QR-Code bleibt unverändert. Vor Ihrer Bestellung klären wir, wie spätere Änderungen möglich sind und welche Kosten dafür anfallen." },
        { question: "Wann erhalte ich mein Produkt und was gilt bei einem Defekt?", answer: "Standardprodukte ohne Ihr Logo oder Ihren Firmennamen sind bei mir an Lager. Modell, Menge und Versandtermin bestätige ich vor Ihrer Bestellung. Produkte mit Ihrem Logo oder individuellem Design erhalten Sie nach Absprache in der Regel innerhalb von 3–5 Wochen fertig eingerichtet. Versandkosten, Liefertermin und das Vorgehen bei Schäden oder Defekten halten wir in der Offerte fest." },
        { question: "Ist laufende Betreuung enthalten?", answer: "Google-Bewertungskarten benötigen keine laufende Betreuung durch mich. Eine solche ist im Produktpreis nicht enthalten. Spätere Änderungen oder zusätzliche Unterstützung vereinbaren wir bei Bedarf separat. Bei Websites besprechen wir Pflege, Unterstützung und Kosten vorab und halten sie schriftlich fest." },
      ],
    },
  },
  en: {
    home: {
      heroProjectLabel: "Explore the Falkenried concept",
      viewProject: "View project",
      intro: "Websites and practical digital support for your business. Created by Silvan Hahn, based near Zurich and working with businesses across Switzerland.",
      servicesIntro: "Show customers what you offer and make everyday work easier. Find the right support for your business.",
      workIntro: "Demo websites I created for fictional businesses. Explore the designs and try the enquiry process.",
      productTitle: "A small product. A direct connection to you.",
      productIntro: "Reviews, menus or bookings: customers hold their phone near the card, then open the link that appears. On models with a QR code, they can scan it instead.",
      productCta: "Explore NFC & QR",
      productAlt: "NFC cards and stands for Google reviews and digital menus",
    },
    websiteScope: {
      "beforePackages": "Package prices cover the one-off build. Your web address, hosting and ongoing support cost extra. Before work begins, your quote sets out the exact scope and who provides the text and images.",
      "title": "One-off and ongoing costs",
      "costs": "The prices shown are estimates for the one-off build. Your domain, which is your web address, and hosting, which keeps your website online, are paid for separately. These have ongoing costs.",
      "agreement": "Before work begins, your written quote sets out the pages, features, revision rounds and schedule. We also agree on who provides or creates the text and images, and what support you may need later. Additional services and ongoing costs are listed separately.",
      "maintenanceTitle": "Who will update your content later?",
      "maintenanceIntro": "New opening hours, an extra service or recent photographs: we discuss how often your content will change and who will update it while planning your website.",
      "maintenanceAgreement": "If you want to change text and images yourself, we can plan a suitable editing tool. Your quote states what you will be able to edit, the training you will receive and the setup and running costs. Updates by me and technical maintenance are also agreed separately."
    },
    nfcConditions: {
      title: "Setup, use and delivery",
      items: [
        { question: "What does setup include?", answer: "The product price includes programming and setting up the agreed link. Provide an existing link or choose “I need help with setup”. A new website, menu or booking service may involve additional work. The written quote sets out the scope and costs. Direct Wi-Fi access is arranged individually." },
        { question: "Which smartphones work?", answer: "The phone must support NFC links. On some devices, NFC needs to be switched on first. On products with a QR code, customers can scan it with their phone camera. An internet connection is needed to open linked web pages. We discuss any specific device requirements before you order." },
        { question: "Can I change the linked page later?", answer: "Text or images at the same web address can be changed in the relevant service. Opening a different web address may require a redirect or reprogramming. A printed QR code stays unchanged. Before you order, we agree how later changes can be made and what they will cost." },
        { question: "When will my product arrive, and what happens if it is faulty?", answer: "Standard products without your logo or business name are held in stock. I confirm the model, quantity and dispatch date before you order. Products with your logo or a custom design are normally delivered ready to use within 3–5 weeks, as agreed. Your quote records shipping costs, the delivery date and what happens if a product is damaged or faulty." },
        { question: "Is ongoing support included?", answer: "Google review cards do not need ongoing support from me. Ongoing support is not included in the product price. Later changes or additional support can be agreed separately if needed. For websites, maintenance, support and costs are discussed beforehand and recorded in writing." },
      ],
    },
  },
} as const satisfies Record<Locale, AuditCopy>;

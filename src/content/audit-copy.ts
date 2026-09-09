import type { Locale } from "./types";

interface AuditCopy {
  readonly home: Readonly<Record<"heroProjectLabel" | "viewProject" | "intro" | "servicesIntro" | "workIntro" | "productTitle" | "productIntro" | "productCta" | "productAlt", string>>;
  readonly websiteScope: {
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
      intro: "Websites und digitale Lösungen für Schweizer KMU. Von Silvan Hahn in Boppelsen bei Zürich – persönlich gestaltet, einfach zu bedienen.",
      servicesIntro: "Ein klarer Auftritt. Einfachere Abläufe. Finden Sie den passenden Einstieg für Ihr Unternehmen.",
      workIntro: "Eigene Konzepte. Von der ersten Idee bis ins Detail.",
      productTitle: "Ein kleines Produkt. Ein direkter Weg zu Ihnen.",
      productIntro: "Bewertungen, Speisekarten oder Buchungen: Ihre Kunden halten das Handy an die Karte oder scannen den QR-Code. Das richtige Ziel öffnet sich direkt.",
      productCta: "NFC & QR entdecken",
      productAlt: "NFC-Karten und Aufsteller für Google-Bewertungen und digitale Speisekarten",
    },
    websiteScope: {
      title: "Umfang und laufende Kosten",
      costs: "Die Paketpreise sind Richtwerte für die einmalige Umsetzung. Domain und Hosting sind nicht enthalten und verursachen separate, laufende Kosten.",
      agreement: "Seitenanzahl, Funktionen, Korrekturrunden, Texte und Bilder, Zeitplan sowie Wartung und Support nach dem Start halten wir vor Projektbeginn in der schriftlichen Offerte fest. Darin steht auch, welche Inhalte Sie liefern und welche ich erstelle. Zusätzliche Leistungen und allfällige laufende Kosten werden dort separat ausgewiesen.",
      maintenanceTitle: "Wie ändern Sie später Ihre Inhalte?",
      maintenanceIntro: "Öffnungszeiten gelegentlich anpassen oder regelmässig neue Angebote veröffentlichen: Wie oft sich Ihre Inhalte ändern und wer sie pflegt, gehört zur Planung Ihrer Website.",
      maintenanceAgreement: "Wenn Sie Texte und Bilder selbst bearbeiten möchten, klären wir vorab die passende Bearbeitungslösung, etwa ein Content-Management-System (CMS). Ob und welche Lösung umgesetzt wird, welche Inhalte damit bearbeitbar sind und welche Einführung nötig ist, steht in der Offerte. Auch Aktualisierungen durch mich, technische Wartung und deren Kosten vereinbaren wir dort ausdrücklich.",
    },
    nfcConditions: {
      title: "Einrichtung, Nutzung und Lieferung",
      items: [
        { question: "Was wird eingerichtet?", answer: "Die Designstufen enthalten die Einrichtung des vereinbarten Links. Geben Sie ein vorhandenes Ziel an oder wählen Sie in der Anfrage, dass es noch eingerichtet werden muss. Ob dafür eine neue Website, ein Menü oder ein Buchungsdienst nötig ist und was dies kostet, klären wir in der schriftlichen Offerte." },
        { question: "Welche Smartphones funktionieren?", answer: "Für NFC muss das Smartphone NFC-Links lesen können; je nach Gerät muss NFC aktiviert sein. Alternativ lässt sich der QR-Code mit einer geeigneten Kamera- oder Scanner-App öffnen. Zum Aufrufen der verlinkten Website ist eine Internetverbindung nötig. Nennen Sie besondere Geräteanforderungen in Ihrer Anfrage." },
        { question: "Kann ich das Ziel später ändern?", answer: "Das hängt von der Einrichtung ab: Inhalte unter derselben Webadresse können Sie im jeweiligen Dienst ändern. Eine andere Zieladresse kann eine Weiterleitung oder eine neue Programmierung erfordern; ein gedruckter QR-Code bleibt unverändert. Wir klären vorab, welche Lösung zu Ihnen passt und welche Folgekosten entstehen." },
        { question: "Wie sind Lieferung und Ersatz geregelt?", answer: "Standardprodukte ohne Personalisierung sind bei mir vor Ort verfügbar; Modell, Menge und Versandtermin bestätigen wir vor der Bestellung. Produkte mit Logo oder vollständiger Personalisierung sind nach Absprache in der Regel innerhalb von 3–5 Wochen eingerichtet bei Ihnen. Versandkosten, Liefertermin und das Vorgehen bei beschädigten oder defekten Produkten halten wir in der Offerte fest." },
        { question: "Ist laufende Betreuung enthalten?", answer: "Google-Bewertungskarten benötigen keine laufende Betreuung durch mich; eine solche ist nicht enthalten. Besondere Anpassungen oder weitere Betreuung vereinbaren wir bei Bedarf ausdrücklich. Bei Websites werden Pflege, Support und Kosten vorab besprochen und schriftlich festgehalten." },
      ],
    },
  },
  en: {
    home: {
      heroProjectLabel: "Explore the Falkenried concept",
      viewProject: "View project",
      intro: "Websites and digital solutions for Swiss small businesses. By Silvan Hahn in Boppelsen near Zurich – personally designed, easy to use.",
      servicesIntro: "A clearer presence. Simpler workflows. Find the right starting point for your business.",
      workIntro: "Self-initiated concepts. From the first idea to the finest detail.",
      productTitle: "A small product. A direct connection to you.",
      productIntro: "Reviews, menus or bookings: your customers tap the card or scan the QR code. The right destination opens straight away.",
      productCta: "Explore NFC & QR",
      productAlt: "NFC cards and stands for Google reviews and digital menus",
    },
    websiteScope: {
      title: "Scope and ongoing costs",
      costs: "Package prices are estimates for the one-time build. Domain and hosting are excluded and incur separate, ongoing costs.",
      agreement: "Before the project starts, the written quote sets out the page count, features, revision rounds, text and images, schedule, and maintenance and support after launch. It also specifies which content you provide and which I create. Additional services and any ongoing costs are listed separately.",
      maintenanceTitle: "How will you update your content?",
      maintenanceIntro: "Occasional opening-hours changes or regular new offers: how often your content changes and who updates it are part of planning your website.",
      maintenanceAgreement: "If you want to edit text and images yourself, we first discuss a suitable editing solution, such as a content management system (CMS). The quote specifies whether and which solution will be built, which content it can edit and what introduction you need. Updates by me, technical maintenance and their costs are also explicitly agreed in the quote.",
    },
    nfcConditions: {
      title: "Setup, use and delivery",
      items: [
        { question: "What does setup include?", answer: "The design tiers include setting up the agreed link. Provide an existing destination or indicate in your inquiry that it still needs to be set up. The written quote will clarify whether a new website, menu or booking service is needed and what it costs." },
        { question: "Which smartphones work?", answer: "For NFC, the smartphone must support reading NFC links; some devices require NFC to be enabled. Alternatively, the QR code can be opened with a suitable camera or scanner app. An internet connection is needed to open the linked website. Mention any specific device requirements in your inquiry." },
        { question: "Can I change the destination later?", answer: "This depends on the setup: content at the same web address can be changed in the relevant service. A different destination address may require a redirect or reprogramming; a printed QR code stays unchanged. We will agree on a suitable setup and any ongoing costs beforehand." },
        { question: "What are the delivery and replacement terms?", answer: "Standard products without personalisation are held locally; we confirm the model, quantity and dispatch date before ordering. Products with a logo or fully custom designs are normally delivered set up and ready within 3–5 weeks, as agreed. Shipping costs, the delivery date and the process for damaged or faulty products are recorded in your quote." },
        { question: "Is ongoing support included?", answer: "Google review cards do not require ongoing support from me; it is not included. Special changes or further support are expressly agreed if needed. Website maintenance, support and costs are discussed and recorded in writing beforehand." },
      ],
    },
  },
} as const satisfies Record<Locale, AuditCopy>;

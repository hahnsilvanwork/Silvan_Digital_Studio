import type { Locale } from "./types";

interface AuditCopy {
  readonly home: Readonly<Record<"heroProjectLabel" | "viewProject" | "intro" | "servicesIntro" | "workIntro" | "productTitle" | "productIntro" | "productCta" | "productAlt", string>>;
  readonly websiteScope: {
    readonly title: string;
    readonly costs: string;
    readonly agreement: string;
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
    },
    nfcConditions: {
      title: "Einrichtung, Nutzung und Lieferung",
      items: [
        { question: "Was wird eingerichtet?", answer: "Die Designstufen enthalten die Einrichtung des vereinbarten Links. Geben Sie ein vorhandenes Ziel an oder wählen Sie in der Anfrage, dass es noch eingerichtet werden muss. Ob dafür eine neue Website, ein Menü oder ein Buchungsdienst nötig ist und was dies kostet, klären wir in der schriftlichen Offerte." },
        { question: "Welche Smartphones funktionieren?", answer: "Für NFC muss das Smartphone NFC-Links lesen können; je nach Gerät muss NFC aktiviert sein. Alternativ lässt sich der QR-Code mit einer geeigneten Kamera- oder Scanner-App öffnen. Zum Aufrufen der verlinkten Website ist eine Internetverbindung nötig. Nennen Sie besondere Geräteanforderungen in Ihrer Anfrage." },
        { question: "Kann ich das Ziel später ändern?", answer: "Das hängt von der Einrichtung ab: Inhalte unter derselben Webadresse können Sie im jeweiligen Dienst ändern. Eine andere Zieladresse kann eine Weiterleitung oder eine neue Programmierung erfordern; ein gedruckter QR-Code bleibt unverändert. Wir klären vorab, welche Lösung zu Ihnen passt und welche Folgekosten entstehen." },
        { question: "Wie sind Lieferung und Ersatz geregelt?", answer: "Lieferzeit, Versandgebiet, Versandkosten und Vorgehen bei beschädigten oder defekten Produkten werden vor der Bestellung in der schriftlichen Offerte geklärt. Teilen Sie uns den gewünschten Termin und Lieferort in der Anfrage mit." },
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
    },
    nfcConditions: {
      title: "Setup, use and delivery",
      items: [
        { question: "What does setup include?", answer: "The design tiers include setting up the agreed link. Provide an existing destination or indicate in your inquiry that it still needs to be set up. The written quote will clarify whether a new website, menu or booking service is needed and what it costs." },
        { question: "Which smartphones work?", answer: "For NFC, the smartphone must support reading NFC links; some devices require NFC to be enabled. Alternatively, the QR code can be opened with a suitable camera or scanner app. An internet connection is needed to open the linked website. Mention any specific device requirements in your inquiry." },
        { question: "Can I change the destination later?", answer: "This depends on the setup: content at the same web address can be changed in the relevant service. A different destination address may require a redirect or reprogramming; a printed QR code stays unchanged. We will agree on a suitable setup and any ongoing costs beforehand." },
        { question: "What are the delivery and replacement terms?", answer: "Lead time, shipping area, shipping costs and the process for damaged or faulty products are clarified in the written quote before ordering. Include your preferred date and delivery location in your inquiry." },
      ],
    },
  },
} as const satisfies Record<Locale, AuditCopy>;

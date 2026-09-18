import { productTierSummary } from "../lib/product-pricing";
import { mergePhotoProducts } from "./photo-products";
import { imprintContent, privacyContent } from "./legal-content";
import type { SiteContent } from "./types";
import { homeCopy } from './home-copy';

export const de = {
  brand: {
    name: "SILVAN",
    descriptor: "Digital Studio",
  },
  navigation: {
    primary: [
      { label: "Websites", href: "/websites" },
      { label: "NFC & QR", href: "/reviews" },
      { label: "Online-Präsenz", href: "/presence" },
      { label: "Automation", href: "/automation" },
      { label: "Arbeiten", href: "/work" },
      { label: "Über mich", href: "/about" },
      { label: "Kontakt", href: "/contact" },
    ],
    primaryLabel: "Hauptnavigation",
    menuLabel: "Menü",
    languageLabel: "Sprache wählen",
    germanLabel: "Deutsch",
    englishLabel: "Englisch",
    openMenuLabel: "Menü öffnen",
    closeMenuLabel: "Menü schliessen",
  },
  a11y: {
    skipToContent: "Zum Inhalt springen",
    currentPage: "Aktuelle Seite",
    externalLink: "Öffnet einen externen Link",
    previousProject: "Vorheriges Projekt",
    nextProject: "Nächstes Projekt",
  },
  common: {
    learnMore: "Mehr erfahren",
    viewWork: "Arbeiten ansehen",
    getInTouch: "Kontakt aufnehmen",
    from: "ab",
    onRequest: "Auf Anfrage",
    recommended: "Für mehrseitige Websites",
  },
  home: {
    hero: {
      serviceLine: "Websites und digitale Lösungen für Schweizer KMU",
      headline: homeCopy.de.headline,
      supporting:
        "Ich bin Silvan Hahn. Ich entwickle Websites, mache Ihr Unternehmen online sichtbar und vereinfache wiederkehrende Aufgaben. Direkt mit Ihnen, von der Idee bis zum Start.",
      primaryCta: homeCopy.de.primaryCta,
      secondaryCta: homeCopy.de.secondaryCta,
    },
    servicesTitle: "Was möchten Sie verbessern?",
    services: [
      {
        title: "Websites",
        description: "Klare, schnelle Websites, die Ihr Angebot auf den Punkt bringen.",
        price: "ab CHF 300",
        href: "/websites",
      },
      {
        title: "Bewertungen und digitale Menüs",
        description: "Karten und Aufsteller für Bewertungen, Menüs, Buchungen und individuelle Ziele.",
        price: "Chips ab CHF 15 · Karten ab CHF 49",
        href: "/reviews",
      },
      {
        title: "Lokal gefunden werden",
        description: "Google-Unternehmensprofil und ein einheitlicher Auftritt für Ihren Betrieb.",
        price: "ab CHF 249",
        href: "/presence",
      },
      {
        title: "Wiederkehrende Aufgaben vereinfachen",
        description: "Zum Beispiel Anfragen erfassen und Daten übertragen. Wir prüfen, welche Abläufe sich automatisieren lassen.",
        price: "Auf Anfrage",
        href: "/automation",
      },
    ],
    workTitle: "Ausgewählte Arbeiten",
    studioTitle: "Direkt mit dem Entwickler arbeiten",
    studioCopy:
      "Ich bin Silvan Hahn, unabhängiger Webentwickler aus Boppelsen bei Zürich. Sie sprechen direkt mit der Person, die Ihre Website plant, gestaltet und entwickelt.",
    testimonialsTitle: "Was Kunden sagen",
    // Bleibt leer, bis eine echte, namentlich freigegebene Kundenstimme
    // vorliegt. Die Sektion rendert erst, wenn dieses Array Einträge hat --
    // eine erfundene Empfehlung auf der Seite eines Studios, das Google
    // Reviews verkauft, wäre der teuerste denkbare Fehler.
    testimonials: [],
  },
  websites: {
    eyebrow: "Websites",
    title: "Eine Website, die Ihr Unternehmen klar verkauft.",
    intro:
      "Von einer kompakten Seite mit Kontaktinformationen bis zum individuellen grossen Auftritt: Wir planen Ihre Website nach Ihren Inhalten, Funktionen und der späteren Pflege.",
    priceLabel: "Preisrahmen · CHF 300–5'000+",
    priceTiers: [
      {
        id: "simple",
        name: "Kompakter Webauftritt",
        price: "CHF 300–699",
        description: "Wenn Ihr Angebot und Ihre Kontaktdaten auf einer einzigen Seite Platz finden.",
        features: ["Eine kompakte Seite", "Mobil optimiert", "Direkte Kontaktwege"],
      },
      {
        id: "standard",
        name: "Business-Website",
        price: "CHF 700–1'999",
        recommended: true,
        description: "Wenn Kunden Ihre Leistungen, Ihr Unternehmen und den Kontakt auf eigenen Seiten finden sollen.",
        features: ["Mehrere Inhaltsseiten", "Individuelles Layout", "Grundlagen für Suchmaschinen"],
      },
      {
        id: "premium",
        name: "Umfangreiche Website",
        price: "CHF 2'000–4'999",
        description: "Wenn viele Inhalte in Bereiche gegliedert werden und Gestaltung sowie Interaktionen mehr Planung brauchen.",
        features: ["Seitenstruktur für mehrere Bereiche", "Individuell gestaltete Interaktionen", "Flexible Bausteine für Seiteninhalte"],
      },
      {
        id: "custom",
        name: "Individuelles Projekt",
        price: "ab CHF 5'000",
        description: "Wenn besondere Anforderungen zuerst ein eigenes Konzept und eine technische Planung brauchen.",
        features: ["Massgeschneidertes Konzept", "Technische Planung", "Projektbezogene Umsetzung"],
      },
    ],
    benefitsTitle: "Welcher Umfang passt zu Ihnen?",
    benefits: [
      "Eine klare Struktur für Kunden und Suchmaschinen",
      "Ein responsives Erlebnis auf jedem Bildschirm",
      "Eine technische Grundlage für nachvollziehbare spätere Anpassungen",
    ],
    processTitle: "So entsteht Ihre Website",
    process: [
      { id: "understand", label: "01", title: "Verstehen", description: "Wir klären Ziele, Zielgruppen, Inhalte und den passenden Umfang." },
      { id: "design", label: "02", title: "Gestalten", description: "Ich entwickle eine klare visuelle Richtung und Seitenstruktur." },
      { id: "build", label: "03", title: "Umsetzen", description: "Design und Inhalte werden schnell, responsiv und zugänglich umgesetzt." },
      { id: "launch", label: "04", title: "Veröffentlichen", description: "Nach der gemeinsamen Prüfung geht die Website sauber online." },
    ],
    ctaLabel: "Website unverbindlich besprechen",
    ctaHref: "/contact",
    faq: {
      title: "Häufige Fragen zu Websites",
      items: [
        {
          question: "Was kostet eine Website?",
          answer:
            "Eine kompakte Informationsseite beginnt bei CHF 300. Eine mehrseitige Business-Website liegt zwischen CHF 700 und CHF 1'999, umfangreichere Auftritte zwischen CHF 2'000 und CHF 4'999. Individuelle Projekte starten bei CHF 5'000. Die Stufe ergibt sich aus dem Umfang, den wir vorher gemeinsam festlegen.",
        },
        {
          question: "Was ist im Preis enthalten?",
          answer:
            "Konzept, Gestaltung, Umsetzung und die Veröffentlichung im Umfang der gewählten Stufe. Domain und Hosting sind nicht Teil des Preises. Welche Variante für Sie sinnvoll ist, klären wir im Gespräch.",
        },
        {
          question: "Kann ich Texte und Bilder selbst ändern?",
          answer:
            "Das hängt von der vereinbarten Bearbeitungslösung ab. Ein Content-Management-System (CMS) ist nicht automatisch Teil einer Preisstufe. Vor Projektbeginn klären wir, was Sie selbst bearbeiten möchten, wie häufig Änderungen nötig sind und wer sie übernimmt. Die Offerte hält die Lösung, eine allfällige Einführung sowie Kosten für Einrichtung, Pflege und Wartung fest.",
        },
        {
          question: "Wie läuft ein Projekt ab?",
          answer:
            "In vier Schritten: Wir klären Ziele und Umfang, ich entwickle eine visuelle Richtung und die Seitenstruktur, setze Design und Inhalte um, und nach der gemeinsamen Prüfung geht die Website online.",
        },
        {
          question: "Funktioniert die Website auf dem Smartphone?",
          answer:
            "Ja. Jede Stufe wird für Mobilgeräte gestaltet und getestet, nicht nachträglich angepasst. Der schmale Bildschirm ist der Ausgangspunkt, nicht der Sonderfall.",
        },
        {
          question: "Mit wem arbeite ich zusammen?",
          answer:
            "Direkt mit mir. Es gibt keine Übergabe zwischen Verkauf, Design und Entwicklung. Die Person, die Ihr Projekt plant, setzt es auch um.",
        },
      ],
    },
  },
  reviews: {
    eyebrow: "NFC & QR Lösungen",
    title: "Ein Tap. Genau die richtige Aktion.",
    intro:
      "Mit einer NFC-Karte oder einem QR-Aufsteller gelangen Ihre Kunden direkt zu Bewertungen, Speisekarten oder Buchungen. Einfach das Handy hinhalten oder den QR-Code scannen.",
    priceLabel: "Designstufen inklusive Einrichtung",
    products: [
      {
        id: "nfc-chip",
        name: "NFC-Sticker",
        price: "CHF 15.–",
        description: "Ein Klebechip für den vereinbarten digitalen Link.",
        features: [productTierSummary("nfc-chip", "de"), "Zum Aufkleben", "Programmierung inklusive"],
      },
      {
        id: "standard-card",
        name: "Standard Card",
        price: "CHF 49.–",
        description: "Eine Standard Card im fixen Design.",
        features: [productTierSummary("standard-card", "de"), "Ohne Personalisierung · NFC und QR", "Programmierung inklusive"],
      },
      {
        id: "personalized-card",
        name: "Personalized Card",
        price: "CHF 69.–",
        description: "Ein bestehendes Design mit Ihrem Logo oder Firmennamen.",
        features: [productTierSummary("personalized-card", "de"), "Form und Grösse modellabhängig", "Logo und Firmenname"],
      },
      {
        id: "fully-custom-card",
        name: "Fully Customized Card",
        price: "CHF 99.–",
        description: "Ein komplett eigenes Design passend zu Ihrer Firmen-CI.",
        features: [productTierSummary("fully-custom-card", "de"), "Freie Gestaltung und digitales Ziel", "Designservice inklusive"],
      },
    ],
    quantityDiscount: "Über 10 Stück: zusätzliche Mengenrabatte nach Absprache.",
    processTitle: "Drei einfache Schritte",
    process: [
      { id: "tap", label: "TAP", title: "Berühren", description: "Der Kunde berührt die NFC-Karte oder den Aufsteller mit dem Smartphone." },
      { id: "open", label: "OPEN", title: "Öffnen", description: "Ein NFC-fähiges Smartphone öffnet den hinterlegten Link ohne zusätzliche NFC-App. Für die Zielaktion gelten die Voraussetzungen des jeweiligen Dienstes." },
      { id: "act", label: "ACT", title: "Handeln", description: "Der Gast bewertet, liest das Menü, reserviert oder speichert Ihre Kontaktdaten." },
    ],
    ctaLabel: "Unverbindlich anfragen",
    heroImages: [
      {
        src: "/images/products/catalog/review-round-black.webp",
        alt: "Schwarze runde NFC-Karte für Google-Bewertungen",
      },
      {
        src: "/images/products/catalog/all-products.webp",
        alt: "Übersicht verschiedener NFC-Karten und Aufsteller",
        fit: "contain",
      },
      {
        src: "/images/products/catalog/menu-personalized-white.webp",
        alt: "Weisse personalisierte NFC-Menükarte mit SilvanDigital-Logo",
      },
    ],
    heroIndicatorLabel: "Gezeigtes Produktbild",
    heroPauseLabel: "Bildwechsel pausieren",
    heroResumeLabel: "Bildwechsel fortsetzen",
    categories: [
      { id: "reviews", label: "Google Reviews" },
      { id: "tripadvisor", label: "Tripadvisor" },
      { id: "social", label: "Social Media" },
      { id: "contact", label: "WhatsApp" },
      { id: "chips", label: "NFC-Chips" },
      { id: "menu", label: "Menü" },
      { id: "custom", label: "Individuell" },
    ],
    catalogLabel: "Produktkategorie wählen",
    categoryPrompt: "Wählen Sie eine Anwendung",
    productSingular: "Produkt",
    productPlural: "Produkte",
    previousProductLabel: "Vorheriges Produkt",
    nextProductLabel: "Nächstes Produkt",
    productPositionLabel: "Produkt",
    productPositionOfLabel: "von",
    forms: ["Rund", "Quadratisch", "Rechteckig"],
    sizes: ["80 × 80 mm", "100 × 100 mm", "Weitere Formate nach Absprache"],
    view3dLabel: "In 3D ansehen",
    comingSoonLabel: "3D-Modell folgt",
    close3dLabel: "3D-Ansicht schliessen",
    loading3dLabel: "3D-Modell wird geladen …",
    error3dLabel: "Das 3D-Modell konnte nicht geladen werden.",
    retry3dLabel: "Erneut versuchen",
    interact3dLabel: "Mit einem Finger oder der Maus drehen",
    catalog: mergePhotoProducts("de", [
      {
        id: "review-round-black",
        category: "reviews",
        title: "Standard Card · Rund Schwarz",
        price: "CHF 49.–",
        description: "Fixes Google-Review-Design für einen direkten Weg zu ehrlichem Feedback.",
        image: { src: "/images/products/catalog/review-round-black.webp", alt: "Schwarze runde Google-Review-NFC-Karte" },
        details: ["Rund", "80 × 80 oder 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/k2oyfSvDdVisnlUw/scene.splinecode", fallbackImage: "/images/products/round-nfc-black.webp", ariaLabel: "Interaktives 3D-Modell einer schwarzen runden Google-Review-NFC-Karte" },
      },
      {
        id: "review-round-white",
        category: "reviews",
        title: "Standard Card · Rund Weiss",
        price: "CHF 49.–",
        description: "Helles Google-Review-Design mit NFC-Hinweis und fünf Sternen.",
        image: { src: "/images/products/catalog/review-round-white.webp", alt: "Weisse runde Google-Review-NFC-Karte" },
        details: ["Rund", "80 × 80 oder 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode", fallbackImage: "/images/products/round-nfc-white.webp", ariaLabel: "Interaktives 3D-Modell einer weissen runden Google-Review-NFC-Karte" },
      },
      {
        id: "review-square-blue",
        category: "reviews",
        title: "Standard Card · Blau",
        price: "CHF 49.–",
        description: "Quadratisches Google-Review-Design mit klarer Tap-Aufforderung.",
        image: { src: "/images/products/catalog/review-square-blue.webp", alt: "Blaue quadratische Google-Review-NFC-Karte" },
        details: ["Quadratisch", "80 × 80 oder 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/fttoKfHSbrqCbrUd/scene.splinecode", fallbackImage: "/images/products/stand-blue.webp", ariaLabel: "Interaktives 3D-Modell einer blauen Google-Review-NFC-Karte" },
      },
      {
        id: "review-stand-white",
        category: "reviews",
        title: "Standard Stand · Weiss",
        price: "CHF 49.–",
        description: "Sichtbarer Aufsteller für Empfang, Kasse oder Tisch.",
        image: { src: "/images/products/catalog/review-stand-white.webp", alt: "Weisser Google-Review-NFC-Aufsteller" },
        details: ["Aufsteller", "Standarddesign ohne Personalisierung"],
        scene: { url: "https://prod.spline.design/9R8JSb5RsHstdJxk/scene.splinecode", fallbackImage: "/images/products/card-stand-white.webp", ariaLabel: "Interaktives 3D-Modell eines weissen Google-Review-Aufstellers" },
      },
      {
        id: "review-personalized-black",
        category: "reviews",
        title: "Personalized · Rund Schwarz",
        price: "CHF 69.–",
        description: "Google-Review-Design mit Ihrem Logo und Firmennamen.",
        image: { src: "/images/products/catalog/review-personalized-black.webp", alt: "Personalisierte schwarze Google-Review-Karte mit SilvanDigital-Logo" },
        details: ["Rund oder quadratisch", "80 × 80 oder 100 × 100 mm"],
      },
      {
        id: "menu-round-black",
        category: "menu",
        title: "Standard Menü · Rund Schwarz",
        price: "CHF 49.–",
        description: "Öffnet Ihre digitale Speise- und Getränkekarte mit einem Tap.",
        image: { src: "/images/products/catalog/menu-round-black.webp", alt: "Schwarze runde NFC-Menükarte" },
        details: ["Rund", "80 × 80 oder 100 × 100 mm"],
      },
      {
        id: "menu-square-black",
        category: "menu",
        title: "Standard Menü · Quadratisch",
        price: "CHF 49.–",
        description: "Klares schwarzes Standarddesign für Ihre digitale Menüseite.",
        image: { src: "/images/products/catalog/menu-square-black.webp", alt: "Schwarze quadratische NFC-Menükarte" },
        details: ["Quadratisch", "80 × 80 oder 100 × 100 mm"],
      },
      {
        id: "menu-personalized-white",
        category: "menu",
        title: "Personalized Menü · Weiss",
        price: "CHF 69.–",
        description: "Menü-Design mit Ihrem Logo und Firmennamen.",
        image: { src: "/images/products/catalog/menu-personalized-white.webp", alt: "Weisse personalisierte runde NFC-Menükarte" },
        details: ["Rund oder quadratisch", "80 × 80 oder 100 × 100 mm"],
      },
      {
        id: "booking-custom-blue",
        category: "custom",
        title: "Fully Customized · Booking",
        price: "CHF 99.–",
        description: "Komplett eigenes Design in Ihrer Firmen-CI für Buchungen oder Reservationen.",
        image: { src: "/images/products/catalog/booking-custom-blue.webp", alt: "Blaue individuell gestaltete NFC-Booking-Karte" },
        details: ["Rund oder quadratisch", "80 × 80 oder 100 × 100 mm", "Freies Design und digitales Ziel"],
      },
    ]),
    useCasesTitle: "Ein Produkt, viele Möglichkeiten",
    useCases: [
      { title: "Google Reviews", description: "Öffnet Ihre Bewertungsseite direkt." },
      { title: "Digitales Menü", description: "Zeigt Speisen und Getränke ohne gedruckte Karte." },
      { title: "Booking & Reservation", description: "Führt Gäste direkt zur Buchung oder Tischreservation." },
      { title: "WLAN-Zugang", description: "Vereinfacht den Zugang zum Gäste-WLAN." },
      { title: "Digitale Visitenkarte", description: "Speichert Kontakt- und Unternehmensdaten schnell." },
    ],
    inquiry: {
      title: "NFC & QR Lösung anfragen",
      intro: "Produkt und Anwendung wählen, Menge angeben und Grundkosten sehen. Form und Grösse sind Wünsche; Details bestätigen wir in der Offerte. Danach wählen Sie den Kontaktweg.",
      fields: [
        { name: "destination", label: "Ziel oder Anwendung", placeholder: "Anwendung wählen", required: true },
        { name: "product", label: "Produkt", placeholder: "Produkt wählen", required: true },
        { name: "shape", label: "Form", placeholder: "Form wählen", required: true },
        { name: "size", label: "Grösse", placeholder: "Grösse wählen", required: true },
        { name: "quantity", label: "Menge", placeholder: "Zum Beispiel 2", required: true },
        { name: "setup", label: "Zielseite", placeholder: "Stand der Zielseite wählen", required: true },
        { name: "destinationUrl", label: "Link zur Zielseite", placeholder: "https://…", required: false, autoComplete: "url" },
        { name: "businessName", label: "Unternehmen (optional)", placeholder: "Name Ihres Unternehmens", required: false, autoComplete: "organization" },
        { name: "contactPerson", label: "Kontaktperson (optional)", placeholder: "Vor- und Nachname", required: false, autoComplete: "name" },
        { name: "note", label: "Design, Farbe oder Nachricht (optional)", placeholder: "Logo, CI-Farben oder weitere Wünsche", required: false },
      ],
      destinationOptions: [
        { value: "reviews", label: "Google Reviews" },
        { value: "tripadvisor", label: "Tripadvisor" },
        { value: "instagram", label: "Instagram" },
        { value: "tiktok", label: "TikTok" },
        { value: "facebook", label: "Facebook" },
        { value: "youtube", label: "YouTube" },
        { value: "whatsapp", label: "WhatsApp" },
        { value: "menu", label: "Digitales Menü" },
        { value: "booking", label: "Booking & Reservation" },
        { value: "airbnb", label: "Airbnb" },
        { value: "wifi", label: "Gäste-WLAN" },
        { value: "contact", label: "Digitale Visitenkarte" },
        { value: "other", label: "Anderes Ziel" },
      ],
      productOptions: [
        { value: "nfc-chip", label: "NFC-Sticker · 1 Stück CHF 15.–" },
        { value: "standard-card", label: "Standard Card · CHF 49.–" },
        { value: "standard-stand", label: "Standard Stand · CHF 49.–" },
        { value: "personalized-card", label: "Personalized Card · CHF 69.–" },
        { value: "fully-custom-card", label: "Fully Customized Card · CHF 99.–" },
      ],
      shapeOptions: [{ value: "round", label: "Rund" }, { value: "square", label: "Quadratisch" }, { value: "rectangle", label: "Rechteckig" }],
      sizeOptions: [{ value: "80", label: "80 × 80 mm" }, { value: "100", label: "100 × 100 mm" }, { value: "confirm", label: "Grösse nach Absprache" }],
      setupOptions: [
        { value: "ready", label: "Link ist vorhanden" },
        { value: "needs-setup", label: "Ziel muss noch eingerichtet werden" },
      ],
      submitLabel: "Anfrage in WhatsApp öffnen",
      editLabel: "Angaben bearbeiten",
      requiredError: "Bitte füllen Sie dieses Feld aus.",
      errorSummary: (count: number) =>
        count === 1
          ? "Ein Feld muss noch ausgefüllt oder korrigiert werden."
          : `${count} Felder müssen noch ausgefüllt oder korrigiert werden.`,
      quantityError: "Bitte geben Sie eine ganze Menge von 1 bis 999 ein. Grössere Mengen können Sie in der Nachricht anfragen.",
      urlError: "Bitte geben Sie einen gültigen HTTPS-Link ein; für Reviews einen Google-Link.",
      confirmTitle: "Bitte prüfen Sie Ihre Angaben",
      nonBindingNotice: "Diese Anfrage ist unverbindlich. Ein Auftrag entsteht erst, wenn beide Seiten die Offerte mit Leistungsumfang und Gesamtpreis angenommen haben.",
      privacyNotice: "Ihre Angaben bleiben in diesem Browser-Tab. Beim Sprachwechsel wird die Anfrage für höchstens zwei Minuten zwischengespeichert und nach der Übernahme gelöscht. Ohne Ihre gewählte Übergabe wird nichts an uns gesendet.",
      messageIntro: "Hallo Silvan, ich möchte unverbindlich eine NFC & QR Lösung anfragen.",
    },
    faq: {
      title: "Häufige Fragen zu NFC & QR Lösungen",
      items: [
        {
          question: "Wie funktioniert eine NFC & QR Lösung?",
          answer:
            "Ihr Gast hält ein geeignetes Smartphone an die Karte, den Aufsteller oder den NFC-Chip. Ein vorhandener QR-Code lässt sich alternativ scannen. Zum Öffnen des NFC-Links ist keine zusätzliche NFC-App nötig; der Zieldienst kann eine Anmeldung oder eine eigene App voraussetzen.",
        },
        {
          question: "Funktioniert das mit jedem Smartphone?",
          answer:
            "Das Smartphone muss NFC-Links lesen können; je nach Gerät muss NFC aktiviert sein. Ein vorhandener QR-Code bietet eine Alternative. Der einzelne Klebechip hat keinen aufgedruckten QR-Code. Für verlinkte Websites ist eine Internetverbindung nötig.",
        },
        {
          question: "Kann ich damit Bewertungen kaufen oder beeinflussen?",
          answer:
            "Nein, und das ist beabsichtigt. Die Karte verkürzt nur den Weg zur Bewertungsseite. Was Ihr Kunde dort schreibt, entscheidet er selbst. Alles andere verstösst gegen die Richtlinien von Google und schadet Ihrem Profil mehr, als es nützt.",
        },
        {
          question: "Welche Ziele kann die Karte öffnen?",
          answer:
            "Neben Google Reviews sind digitale Menüs, Booking und Reservationen, Gäste-WLAN, Kontaktdaten und weitere HTTPS-Ziele möglich. Falls Ihr Google-Profil noch fehlt, kann ich es ebenfalls einrichten.",
          link: { label: "Google-Unternehmensprofil einrichten", href: "/presence" },
        },
        {
          question: "Welche Designs und Grössen sind möglich?",
          answer:
            "Der Katalog enthält runde, quadratische und rechteckige Karten sowie Aufsteller und Klebechips. Form und Grösse hängen vom Modell ab. Wo keine Masse bestätigt sind, steht «Grösse nach Absprache». Die Anfrageoptionen 80 × 80 mm und 100 × 100 mm sind Grössenwünsche für passende Karten, keine Zusage für jedes Modell. Bei Personalized ergänze ich Logo oder Firmenname; Fully Customized wird komplett in Ihrer Firmen-CI gestaltet.",
        },
        {
          question: "Was kostet es und was ist inbegriffen?",
          answer:
            "Standard Card: 1 Stück CHF 49, 2 zusammen CHF 80, jedes weitere CHF 20. NFC-Sticker: 1 Stück CHF 15, 2 zusammen CHF 25, jeder weitere CHF 5. Personalized Card: 1 Stück CHF 69, 2 zusammen CHF 100, jede weitere CHF 25. Fully Customized Card: 1 Stück CHF 99, 2 zusammen CHF 150, jede weitere CHF 30. Ein Standard Stand kostet CHF 49; mehrere Aufsteller nach Absprache. Über 10 Stück gibt es weitere Rabatte nach Absprache. Programmierung und Einrichtung des vereinbarten Links sind enthalten. Versand und zusätzliche Leistungen werden separat in der Offerte ausgewiesen.",
        },
      ],
    },
  },
  presence: {
    eyebrow: "Online-Präsenz",
    title: "Klare Angaben auf Google und Maps.",
    intro:
      "Ich prüfe, erstelle oder überarbeite Ihr Google-Unternehmensprofil: Öffnungszeiten, Kontaktwege und Leistungen, mit Ihnen abgestimmt.",
    priceLabel: "ab CHF 249",
    startingPrice: "ab CHF 249",
    priceTiers: [
      {
        id: "profile",
        name: "Google Business Profile Basis",
        price: "ab CHF 249",
        description: "Prüfung, Einrichtung oder Überarbeitung Ihres Google-Profils. Profile, Standorte und genaue Leistungen legt die Offerte fest; laufende Pflege wird separat vereinbart.",
        features: ["Profilprüfung oder Einrichtung", "Abgleich Ihrer Geschäftsdaten", "Leistungsangaben und Übergabeübersicht"],
      },
    ],
    benefitsTitle: "Für einen verlässlichen lokalen Auftritt",
    benefits: [
      "Widersprüche bei Öffnungszeiten und Kontaktwegen erkennen",
      "Leistungen mit Ihren tatsächlichen Angeboten abgleichen",
      "Umgesetzte Änderungen und offene Punkte nachvollziehen",
    ],
    processTitle: "So gehen wir vor",
    process: [
      { id: "audit", label: "01", title: "Profil prüfen", description: "Wir prüfen vorhandene Angaben, Inhaberschaft und Zugang und legen den Umfang in der Offerte fest." },
      { id: "align", label: "02", title: "Daten bestätigen", description: "Sie bestätigen Öffnungszeiten, Kontaktwege und Leistungen. Einen nötigen Bestätigungsprozess bei Google begleiten wir gemeinsam." },
      { id: "optimize", label: "03", title: "Angaben bearbeiten", description: "Nach Ihrer Freigabe bearbeite ich die vereinbarten Profilangaben über den eingerichteten Zugriff." },
      { id: "handover", label: "04", title: "Stand übergeben", description: "Sie erhalten eine Übersicht der Änderungen, noch offener Prüfungen und nächster Schritte. Wir klären den weiteren Zugriff und die künftige Pflege." },
    ],
    ctaLabel: "Online-Präsenz besprechen",
    ctaHref: "/contact",
    faq: {
      title: "Häufige Fragen zur Online-Präsenz",
      items: [
        {
          question: "Was ist ein Google-Unternehmensprofil?",
          answer:
            "Der Eintrag, der bei Google und in Google Maps erscheint, wenn jemand nach Ihrem Unternehmen oder nach Ihrer Leistung in der Nähe sucht. Er zeigt Adresse, Öffnungszeiten, Kontaktwege und Bewertungen.",
        },
        {
          question: "Ich habe schon ein Profil. Bringt das trotzdem etwas?",
          answer:
            "Eine Prüfung kann fehlende oder widersprüchliche Angaben sichtbar machen. Wir gleichen das Google-Profil mit Ihren bestätigten Geschäftsdaten ab. Änderungen an weiteren Plattformen oder Standorten sind nur enthalten, wenn sie in der Offerte vereinbart sind.",
        },
        {
          question: "Garantiert das ein besseres Ranking bei Google?",
          answer:
            "Nein. Ich verspreche weder eine Position bei Google noch zusätzliche Anfragen. Ziel sind nachvollziehbare, mit Ihnen abgestimmte Geschäftsinformationen.",
        },
        {
          question: "Was erhalte ich am Ende?",
          answer:
            "Die vereinbarten Profilarbeiten und eine Übersicht der Änderungen, offenen Punkte und nächsten Schritte. Ausstehende Google-Bestätigungen werden als offen ausgewiesen. Laufende Pflege ist nur bei separater Vereinbarung enthalten; die Inhaberschaft bleibt bei Ihnen.",
        },
      ],
    },
  },
  automation: {
    eyebrow: "Automation",
    title: "Wiederkehrende Arbeit auf einen klaren Ablauf bringen.",
    intro:
      "Ich untersuche manuelle Routinen und entwickle passende Automationen für E-Mails, Berichte, Informationsübergaben und interne Abläufe.",
    priceLabel: "Auf Anfrage",
    priceTiers: [
      {
        id: "custom-automation",
        name: "Individuelle Automation",
        price: "Auf Anfrage",
        description: "Umfang und Lösung richten sich nach Ihrem bestehenden Prozess und den technisch sinnvollen Möglichkeiten.",
        features: ["Machbarkeitsprüfung", "Gezielte Umsetzung", "Dokumentierte Übergabe"],
      },
    ],
    benefitsTitle: "Geeignete Aufgaben",
    benefits: [
      "Wiederkehrende E-Mails und Benachrichtigungen",
      "Regelmässige Berichte und Datenaufbereitung",
      "Informationsübergaben und wiederholbare interne Workflows",
    ],
    processTitle: "Vom Engpass zur Lösung",
    process: [
      { id: "discover", label: "01", title: "Entdecken", description: "Wir machen den heutigen Ablauf und seinen Zeitaufwand sichtbar." },
      { id: "assess", label: "02", title: "Prüfen", description: "Ich beurteile Machbarkeit, Risiken und den erwartbaren Nutzen." },
      { id: "implement", label: "03", title: "Umsetzen", description: "Die passende Lösung wird schrittweise eingerichtet und getestet." },
      { id: "handover", label: "04", title: "Übergeben", description: "Sie erhalten eine verständliche Einführung und Dokumentation." },
    ],
    ctaLabel: "Ablauf unverbindlich besprechen",
    ctaHref: "/contact",
    faq: {
      title: "Häufige Fragen zur Automation",
      items: [
        {
          question: "Welche Aufgaben lassen sich automatisieren?",
          answer:
            "Geeignet sind wiederkehrende Aufgaben mit klaren Regeln, etwa Berichte, Benachrichtigungen oder Informationsübergaben. Ob eine Umsetzung möglich und sinnvoll ist, hängt von Datenqualität, verfügbaren Schnittstellen, Zugriffsrechten und Ausnahmen im Ablauf ab.",
        },
        {
          question: "Warum steht kein Preis auf dieser Seite?",
          answer:
            "Der Aufwand hängt von Ihrem Prozess und den beteiligten Systemen ab. Die erste Anfrage ist unverbindlich. Umfang und Preis einer vertieften Analyse werden vor deren Beauftragung vereinbart; die Umsetzung und mögliche laufende Kosten werden in der jeweiligen Offerte festgehalten.",
        },
        {
          question: "Was passiert, wenn sich eine Automation nicht lohnt?",
          answer:
            "Dann sage ich das. Eine Automation, die mehr Pflege verursacht als sie an Zeit spart, ist kein Fortschritt. Die Machbarkeitsprüfung darf auch zum Ergebnis kommen, dass der heutige Ablauf der bessere ist.",
        },
        {
          question: "Was passiert nach der Umsetzung?",
          answer:
            "Sie erhalten eine verständliche Einführung und Dokumentation. Wer den Ablauf betreut, wer bei Fehlern benachrichtigt wird und welche Wartung vorgesehen ist, wird vereinbart. Laufende Betreuung sowie nötige externe Abos oder Nutzungsgebühren sind vom konkreten Angebot abhängig und nicht pauschal enthalten.",
        },
      ],
    },
  },
  work: {
    eyebrow: "Arbeiten",
    title: "Digitale Konzepte mit klarer Funktion.",
    intro: "Vier Beispiel-Websites, die Sie selbst erkunden können. Eigeninitiierte Konzepte für fiktive Unternehmen. Von der Gestaltung bis zur Umsetzung.",
    conceptLabel: "Konzeptprojekt",
    projectInfoLabel: "Projektinformationen",
    categoryLabel: "Kategorie",
    yearLabel: "Jahr",
    typeLabel: "Art",
    challengeLabel: "Aufgabe",
    approachLabel: "Ansatz",
    outcomeLabel: "Beabsichtigtes Ergebnis",
    ctaLabel: "Ihr Projekt besprechen",
  },
  about: {
    eyebrow: "Über mich",
    title: "Direkte Zusammenarbeit, sorgfältig umgesetzt.",
    intro: "Ich bin Silvan Hahn, unabhängiger Webentwickler in Boppelsen im Kanton Zürich.",
    body: [
      "Ich verbinde klare Gestaltung mit wartbarer Entwicklung und konzentriere mich auf digitale Lösungen, die im Alltag tatsächlich helfen.",
      "Sie sprechen direkt mit der Person, die Ihr Projekt plant und umsetzt. So bleiben Entscheidungen verständlich, Wege kurz und der Umfang realistisch.",
    ],
    valuesTitle: "Arbeitsweise",
    values: [
      { title: "Klar", description: "Ziele, Umfang und Entscheidungen bleiben nachvollziehbar." },
      { title: "Direkt", description: "Sie arbeiten ohne Übergaben zwischen Verkauf, Design und Entwicklung." },
      { title: "Praktisch", description: "Die Lösung orientiert sich an Ihrem Betrieb, nicht an kurzlebigen Trends." },
    ],
    // Bewusst nur nachprüfbare Aussagen: jeder Punkt gilt für diese Website
    // selbst und kann an ihr überprüft werden. Formulierung gerne
    // anpassen -- aber keine Behauptung aufnehmen, die ein Besucher
    // nicht an einem gelieferten Projekt nachmessen könnte.
    standardsTitle: "Worauf Sie sich verlassen können",
    standards: [
      "Ihre Besucher sollen schnell zu den wichtigen Inhalten kommen. Dafür prüfe ich Ladezeiten und halte die Seiten technisch schlank.",
      "Ihre Website soll auch mit der Tastatur gut bedienbar sein. Klare Struktur, lesbare Kontraste und verständliche Hinweise gehören zu meinen Prüfungen.",
      "Für den schmalen Bildschirm entworfen, nicht nachträglich dafür angepasst.",
      "Bei späteren Änderungen prüfe ich die wichtigen Abläufe erneut. Automatisierte Tests helfen, Fehler früh zu erkennen.",
    ],
    portraitAlt: "Silvan Hahn, Porträtaufnahme in einem Innenraum",
    portraitCaption: "Silvan Hahn, unabhängiger Webentwickler",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Lassen Sie uns Ihr Vorhaben besprechen.",
    intro: "Schreiben Sie mir direkt per E-Mail oder WhatsApp. Telefon und LinkedIn sind ebenfalls erreichbar.",
    addressLabel: "Adresse",
    address: ["Silvan Hahn", "Regensbergstrasse 23", "8113 Boppelsen", "Schweiz"],
    emailLabel: "E-Mail",
    phoneLabel: "Telefon",
    whatsappLabel: "WhatsApp",
    linkedInLabel: "LinkedIn",
    details: {
      email: "hahn.silvan.work@gmail.com",
      // One canonical, international format everywhere: it matches the tel:
      // href and the telephone in the structured data, and a business listing
      // is matched against citations as a string.
      phoneDisplay: "+41 78 900 85 00",
      phoneHref: "tel:+41789008500",
      whatsappNumber: "+41 78 900 85 00",
      whatsappHref: "https://wa.me/41789008500",
      linkedIn: "https://www.linkedin.com/in/silvan-hahn-dev",
    },
  },
  footer: {
    navLabel: "Fussbereich-Navigation",
    legalNavLabel: "Rechtliches",
    contactTitle: "Direkt erreichbar",
    rights: "Alle Rechte vorbehalten.",
    legal: [
      { label: "Impressum", href: "/imprint" },
      { label: "Datenschutz", href: "/privacy" },
    ],
  },
  hello: {
    eyebrow: "SILVAN Digital Studio",
    title: "Hallo, ich bin Silvan.",
    intro: "Websites, lokale Sichtbarkeit und praktische Automationen für Schweizer Unternehmen.",
    links: [
      { label: "Websites", href: "/websites" },
      { label: "NFC & QR", href: "/reviews" },
      { label: "Online-Präsenz", href: "/presence" },
      { label: "Arbeiten", href: "/work" },
      { label: "Über mich", href: "/about" },
      { label: "Kontakt", href: "/contact" },
    ],
    directContactTitle: "Direkt erreichen",
  },
  imprint: imprintContent.de,
  privacy: privacyContent.de,
  notFound: {
    eyebrow: "404",
    title: "Diese Seite wurde nicht gefunden.",
    description: "Der Link ist möglicherweise veraltet oder die Adresse wurde falsch eingegeben.",
    homeLabel: "Zur Startseite",
  },
  // Titles lead with the words a customer types, not with the brand. "SILVAN"
  // has no search demand on a domain this young, and putting it first spent the
  // most valuable characters in the result on a string nobody looks for -- and
  // pushed the home page over the truncation width at the same time.
  //
  // Every claim here has to be checkable on the page it describes. Prices match
  // the tiers, the location matches the imprint, and nothing promises delivery
  // terms or turnaround that the site does not state.
  seo: {
    home: { title: "Webdesign für KMU im Kanton Zürich | SILVAN", description: "Websites, Google-Bewertungen, lokale Sichtbarkeit und Automation für Schweizer KMU. Direkt vom Entwickler aus Boppelsen ZH, Websites ab CHF 300." },
    websites: { title: "Website erstellen lassen, Kanton Zürich | ab CHF 300", description: "Schnelle, mobil gestaltete Websites für Schweizer KMU ab CHF 300. Preisrahmen zur Orientierung, genauer Umfang und Preis in der schriftlichen Offerte." },
    reviews: { title: "NFC & QR Lösungen für Unternehmen | SILVAN", description: "NFC-Karten und Aufsteller ab CHF 49, Klebechips ab CHF 15. Für Bewertungen, Menüs und Buchungen. Programmierung und Einrichtung des Links inklusive." },
    presence: { title: "Google Unternehmensprofil einrichten im Kanton Zürich", description: "Google-Unternehmensprofil einrichten oder optimieren, Geschäftsdaten konsistent halten, lokal leichter gefunden werden. Für Schweizer KMU ab CHF 249." },
    automation: { title: "Abläufe automatisieren für KMU | SILVAN Digital Studio", description: "Wiederkehrende E-Mails, Berichte und interne Abläufe automatisieren, ohne grosse Software-Einführung. Für Schweizer KMU, Umfang auf Anfrage." },
    work: { title: "Arbeiten: Website-Konzepte aus der Schweiz | SILVAN", description: "Vier erkundbare Demo-Websites für Handwerk, Café, Salon und eine Unternehmensgruppe. Mit echten Screenshots und Einblicken in Struktur und Gestaltung." },
    about: { title: "Silvan Hahn, Webentwickler im Kanton Zürich", description: "Ich bin Silvan Hahn, unabhängiger Webentwickler in Boppelsen ZH. Sie arbeiten direkt mit der Person, die Ihr Projekt plant, gestaltet und umsetzt." },
    contact: { title: "Kontakt: Webdesign-Anfrage Kanton Zürich | SILVAN", description: "Besprechen Sie Ihr Vorhaben direkt mit Silvan Hahn, per E-Mail, WhatsApp, Telefon oder LinkedIn. Standort Boppelsen ZH. Anfragen sind unverbindlich." },
    hello: { title: "Hallo, ich bin Silvan | SILVAN Digital Studio", description: "Der direkte Einstieg zu Websites, Google-Bewertungen, Online-Präsenz, Arbeiten und Kontakt." },
    imprint: { title: "Impressum | SILVAN Digital Studio", description: "Verantwortlich für diese Website: Silvan Hahn, Boppelsen. Angaben zu Rechtsform, Kontakt und Urheberrecht." },
    privacy: { title: "Datenschutz | SILVAN Digital Studio", description: "Datenschutz zu Website, Demos, Hosting, Kontaktaufnahme und optionaler cookieloser Reichweitenmessung. Verantwortlich: Silvan Hahn, Boppelsen, Schweiz." },
  },
} as const satisfies SiteContent;

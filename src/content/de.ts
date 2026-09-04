import type { SiteContent } from "./types";

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
    recommended: "Am häufigsten gewählt",
  },
  home: {
    hero: {
      serviceLine: "Websites · Google Reviews · Online-Präsenz · Automation",
      headline: "Mehr Kunden. Weniger Aufwand.",
      supporting:
        "Ich entwickle digitale Lösungen für KMU in der Schweiz, die Ihr Unternehmen sichtbar machen und wiederkehrende Arbeit reduzieren.",
      primaryCta: "Projekt besprechen",
      secondaryCta: "Leistungen ansehen",
    },
    servicesTitle: "Digitale Lösungen für Ihr Unternehmen",
    services: [
      {
        title: "Websites",
        description: "Klare, schnelle Websites, die Ihr Angebot auf den Punkt bringen.",
        price: "ab CHF 300",
        href: "/websites",
      },
      {
        title: "NFC & QR Lösungen",
        description: "Karten und Aufsteller für Bewertungen, Menüs, Buchungen und individuelle Ziele.",
        price: "ab CHF 49",
        href: "/reviews",
      },
      {
        title: "Online-Präsenz",
        description: "Ein konsistenter Auftritt, damit Ihr Unternehmen lokal leichter gefunden wird.",
        price: "ab CHF 249",
        href: "/presence",
      },
      {
        title: "Automation",
        description: "Praktische Abläufe, die wiederkehrende Aufgaben zuverlässig reduzieren.",
        price: "Auf Anfrage",
        href: "/automation",
      },
    ],
    workTitle: "Ausgewählte Arbeiten",
    studioTitle: "Direkt mit dem Entwickler arbeiten",
    studioCopy:
      "SILVAN ist das unabhängige Digital Studio von Silvan Hahn in Boppelsen im Kanton Zürich. Ich gestalte und entwickle Websites für kleine und mittlere Unternehmen in der ganzen Schweiz – Sie erhalten Beratung, Design und Umsetzung aus einer Hand.",
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
      "Von der kompakten Informationsseite bis zum individuellen grossen Auftritt: Sie erhalten eine schnelle, zugängliche und leicht pflegbare Website.",
    priceLabel: "CHF 300–5'000+",
    priceTiers: [
      {
        id: "simple",
        name: "Simple Info Website",
        price: "CHF 300–699",
        description: "Für einen fokussierten ersten Auftritt mit den wichtigsten Informationen.",
        features: ["Eine kompakte Seite", "Mobil optimiert", "Direkte Kontaktwege"],
      },
      {
        id: "standard",
        name: "Standard Business Website",
        price: "CHF 700–1'999",
        recommended: true,
        description: "Für Unternehmen, die Leistungen, Vertrauen und Kontakt klar strukturieren möchten.",
        features: ["Mehrere Inhaltsseiten", "Individuelles Layout", "Grundlegende Suchmaschinen-Basis"],
      },
      {
        id: "premium",
        name: "Premium Large Website",
        price: "CHF 2'000–4'999",
        description: "Für umfangreiche Inhalte, anspruchsvolle Gestaltung und besondere Funktionen.",
        features: ["Erweiterte Seitenstruktur", "Hochwertige Interaktionen", "Flexible Inhaltsmodule"],
      },
      {
        id: "custom",
        name: "Custom Large Project",
        price: "ab CHF 5'000",
        description: "Für individuelle digitale Projekte mit gemeinsam definiertem Umfang.",
        features: ["Massgeschneidertes Konzept", "Technische Planung", "Projektbezogene Umsetzung"],
      },
    ],
    benefitsTitle: "Was Sie erhalten",
    benefits: [
      "Eine klare Struktur für Kunden und Suchmaschinen",
      "Ein responsives Erlebnis auf jedem Bildschirm",
      "Wartbaren Code ohne unnötige technische Last",
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
            "Konzept, Gestaltung, Umsetzung und die Veröffentlichung im Umfang der gewählten Stufe. Domain und Hosting sind nicht Teil des Preises – welche Variante für Sie sinnvoll ist, klären wir im Gespräch.",
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
            "Direkt mit mir. Es gibt keine Übergabe zwischen Verkauf, Design und Entwicklung – die Person, die Ihr Projekt plant, setzt es auch um.",
        },
      ],
    },
  },
  reviews: {
    eyebrow: "NFC & QR Lösungen",
    title: "Ein Tap. Genau die richtige Aktion.",
    intro:
      "Google-Bewertungen, digitale Menüs und individuelle Lösungen für Booking, Reservation und mehr – programmiert und sofort einsatzbereit.",
    priceLabel: "Designstufen inklusive Einrichtung",
    products: [
      {
        id: "standard-card",
        name: "Standard Card oder Standard Stand",
        price: "CHF 49.–",
        description: "Eine Standard Card im fixen Design oder ein sichtbarer Standard-Aufsteller.",
        features: ["Ohne Personalisierung", "NFC und QR", "Programmierung inklusive"],
      },
      {
        id: "standard-pair",
        name: "Zwei Standard Cards",
        price: "CHF 80.–",
        description: "Zwei Standard Cards für mehrere Kontaktpunkte.",
        features: ["Freie Formwahl", "Beide Grössen möglich", "Einrichtung inklusive"],
      },
      {
        id: "personalized-card",
        name: "Personalized Card",
        price: "CHF 69.–",
        description: "Ein bestehendes Design mit Ihrem Logo oder Firmennamen.",
        features: ["Rund oder quadratisch", "Beide Grössen", "Logo und Firmenname"],
      },
      {
        id: "fully-custom-card",
        name: "Fully Customized Card",
        price: "CHF 99.–",
        description: "Ein komplett eigenes Design passend zu Ihrer Firmen-CI.",
        features: ["Freie Gestaltung", "Freies digitales Ziel", "Designservice inklusive"],
      },
    ],
    quantityDiscount: "Für grössere Mengen gibt es einen Mengenrabatt. Den Preis für Ihre Menge nenne ich Ihnen in meiner Antwort auf Ihre Anfrage – vor jeder Verbindlichkeit.",
    processTitle: "Drei einfache Schritte",
    process: [
      { id: "tap", label: "TAP", title: "Berühren", description: "Der Kunde berührt die NFC-Karte oder den Aufsteller mit dem Smartphone." },
      { id: "open", label: "OPEN", title: "Öffnen", description: "Das hinterlegte Ziel öffnet sich direkt – ohne App und ohne Suchen." },
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
      { id: "menu", label: "Menü" },
      { id: "custom", label: "Individuell" },
    ],
    catalogLabel: "Produktkategorie wählen",
    categoryPrompt: "Wählen Sie eine Anwendung",
    productSingular: "Produkt",
    productPlural: "Produkte",
    forms: ["Rund", "Quadratisch"],
    sizes: ["80 × 80 mm", "100 × 100 mm"],
    view3dLabel: "In 3D ansehen",
    comingSoonLabel: "3D-Modell folgt",
    close3dLabel: "3D-Ansicht schliessen",
    loading3dLabel: "3D-Modell wird geladen …",
    error3dLabel: "Das 3D-Modell konnte nicht geladen werden.",
    retry3dLabel: "Erneut versuchen",
    interact3dLabel: "Mit Maus oder Finger drehen",
    catalog: [
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
        details: ["Rund", "Beispiel mit Logo und Firmenname"],
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
        details: ["Rund", "Beispiel mit Logo und Firmenname"],
      },
      {
        id: "booking-custom-blue",
        category: "custom",
        title: "Fully Customized · Booking",
        price: "CHF 99.–",
        description: "Komplett eigenes Design in Ihrer Firmen-CI für Buchungen oder Reservationen.",
        image: { src: "/images/products/catalog/booking-custom-blue.webp", alt: "Blaue individuell gestaltete NFC-Booking-Karte" },
        details: ["Quadratisch", "Freies Design und digitales Ziel"],
      },
    ],
    useCasesTitle: "Ein Produkt, viele Möglichkeiten",
    useCases: [
      { title: "Google Reviews", description: "Öffnet Ihre Bewertungsseite direkt." },
      { title: "Digitales Menü", description: "Zeigt Speisen und Getränke ohne gedruckte Karte." },
      { title: "Booking & Reservation", description: "Führt Gäste direkt zur Buchung oder Tischreservation." },
      { title: "WLAN-Zugang", description: "Vereinfacht den Zugang zum Gäste-WLAN." },
      { title: "Digitale Visitenkarte", description: "Speichert Kontakt- und Unternehmensdaten schnell." },
    ],
    productSelectorLabel: "Google-Review-Produkt wählen",
    menuSelectorLabel: "Menü-Produkt wählen",
    productVisualizations: [
      {
        id: "round-nfc-white",
        fallbackImage: "/images/products/round-nfc-white.webp",
        title: "Rund Weiss",
        sceneUrl:
          "https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode",
        ariaLabel:
          "Sich langsam drehendes 3D-Modell eines weissen runden Google Review NFC-Tags",
      },
      {
        id: "round-nfc-black",
        fallbackImage: "/images/products/round-nfc-black.webp",
        title: "Rund Schwarz",
        sceneUrl:
          "https://prod.spline.design/k2oyfSvDdVisnlUw/scene.splinecode",
        ariaLabel:
          "Sich langsam drehendes 3D-Modell eines schwarzen runden Google Review NFC-Tags",
      },
      {
        id: "stand-blue",
        fallbackImage: "/images/products/stand-blue.webp",
        title: "Aufsteller Blau",
        sceneUrl:
          "https://prod.spline.design/fttoKfHSbrqCbrUd/scene.splinecode",
        ariaLabel:
          "Sich langsam drehendes 3D-Modell eines blauen Google-Review-Aufstellers für den Tisch",
      },
      {
        id: "card-white-qr",
        fallbackImage: "/images/products/card-white-qr.webp",
        title: "Karte Weiss",
        sceneUrl:
          "https://prod.spline.design/VXtEe7dRfsZEicnw/scene.splinecode",
        ariaLabel:
          "Sich langsam drehendes 3D-Modell einer weissen Google-Review-Karte mit NFC und QR-Code",
      },
      {
        id: "card-stand-white",
        fallbackImage: "/images/products/card-stand-white.webp",
        title: "Kartenständer Weiss",
        sceneUrl:
          "https://prod.spline.design/9R8JSb5RsHstdJxk/scene.splinecode",
        ariaLabel:
          "Sich langsam drehendes 3D-Modell eines weissen Google-Review-Kartenständers für den Tisch",
      },
    ],
    menuVisualizations: [],
    secondaryProductImage: {
      src: "/images/products/review-stands.png",
      alt: "NFC Aufsteller für Tisch oder Kasse mit der Aufforderung, das Unternehmen auf Google zu bewerten",
    },
    inquiry: {
      title: "NFC & QR Lösung anfragen",
      intro: "Konfigurieren Sie Ihre Lösung. Die Angaben werden als unverbindliche Anfrage in WhatsApp vorbereitet.",
      fields: [
        { name: "destination", label: "Ziel oder Anwendung", placeholder: "Anwendung wählen", required: true },
        { name: "product", label: "Produkt", placeholder: "Produkt wählen", required: true },
        { name: "shape", label: "Form", placeholder: "Form wählen", required: true },
        { name: "size", label: "Grösse", placeholder: "Grösse wählen", required: true },
        { name: "quantity", label: "Menge", placeholder: "Zum Beispiel 2", required: true },
        { name: "businessName", label: "Unternehmen", placeholder: "Name Ihres Unternehmens", required: true, autoComplete: "organization" },
        { name: "contactPerson", label: "Kontaktperson", placeholder: "Vor- und Nachname", required: true, autoComplete: "name" },
        { name: "setup", label: "Zielseite", placeholder: "Stand der Zielseite wählen", required: true },
        { name: "destinationUrl", label: "Link zur Zielseite", placeholder: "https://…", required: false, autoComplete: "url" },
        { name: "note", label: "Design, Farbe oder Nachricht (optional)", placeholder: "Logo, CI-Farben oder weitere Wünsche", required: false },
      ],
      destinationOptions: [
        { value: "reviews", label: "Google Reviews" },
        { value: "menu", label: "Digitales Menü" },
        { value: "booking", label: "Booking & Reservation" },
        { value: "wifi", label: "Gäste-WLAN" },
        { value: "contact", label: "Digitale Visitenkarte" },
        { value: "other", label: "Anderes Ziel" },
      ],
      productOptions: [
        { value: "standard-card", label: "Standard Card · CHF 49.–" },
        { value: "standard-pair", label: "Zwei Standard Cards · CHF 80.–" },
        { value: "standard-stand", label: "Standard Stand · CHF 49.–" },
        { value: "personalized-card", label: "Personalized Card · CHF 69.–" },
        { value: "fully-custom-card", label: "Fully Customized Card · CHF 99.–" },
      ],
      shapeOptions: [{ value: "round", label: "Rund" }, { value: "square", label: "Quadratisch" }],
      sizeOptions: [{ value: "80", label: "80 × 80 mm" }, { value: "100", label: "100 × 100 mm" }],
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
      quantityError: "Bitte geben Sie eine gültige Menge ab 1 ein.",
      urlError: "Bitte geben Sie einen gültigen HTTPS-Link ein; für Reviews einen Google-Link.",
      confirmTitle: "Bitte prüfen Sie Ihre Angaben",
      nonBindingNotice: "Dies ist eine unverbindliche Anfrage. Sie wird erst nach meiner persönlichen Bestätigung verbindlich.",
      privacyNotice: "Ihre Angaben werden nicht auf dieser Website gespeichert, sondern nur in die WhatsApp-Nachricht eingefügt.",
      messageIntro: "Hallo Silvan, ich möchte unverbindlich eine NFC & QR Lösung anfragen.",
    },
    faq: {
      title: "Häufige Fragen zu NFC & QR Lösungen",
      items: [
        {
          question: "Wie funktioniert eine NFC & QR Lösung?",
          answer:
            "Ihr Gast hält das Smartphone an die Karte oder scannt den QR-Code. Das hinterlegte Ziel öffnet sich direkt – ohne Suche, zusätzliche App oder abgetippten Link.",
        },
        {
          question: "Funktioniert das mit jedem Smartphone?",
          answer:
            "Aktuelle iPhones und Android-Geräte lesen NFC-Tags ohne zusätzliche App. Für ältere Geräte lässt sich zusätzlich ein QR-Code auf der Karte nutzen.",
        },
        {
          question: "Kann ich damit Bewertungen kaufen oder beeinflussen?",
          answer:
            "Nein, und das ist beabsichtigt. Die Karte verkürzt nur den Weg zur Bewertungsseite. Was Ihr Kunde dort schreibt, entscheidet er selbst – alles andere verstösst gegen die Richtlinien von Google und schadet Ihrem Profil mehr, als es nützt.",
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
            "Standard und personalisierte Karten sind rund oder quadratisch in 80 × 80 mm oder 100 × 100 mm möglich. Bei Personalized ergänze ich Logo oder Firmenname; Fully Customized wird komplett in Ihrer Firmen-CI gestaltet.",
        },
        {
          question: "Was kostet es und was ist inbegriffen?",
          answer:
            "Eine Standard Card oder ein Standard Stand kostet CHF 49, zwei Standard Cards CHF 80, Personalized CHF 69 und Fully Customized CHF 99. Programmierung und Einrichtung sind enthalten; für grössere Mengen gibt es einen Mengenrabatt.",
        },
      ],
    },
  },
  presence: {
    eyebrow: "Online-Präsenz",
    title: "Damit Ihr Unternehmen dort stimmt, wo Kunden suchen.",
    intro:
      "Ich richte Ihr Google-Unternehmensprofil ein oder optimiere es und sorge für konsistente, verständliche Geschäftsinformationen.",
    priceLabel: "ab CHF 249",
    startingPrice: "ab CHF 249",
    priceTiers: [
      {
        id: "profile",
        name: "Google Business Profile Basis",
        price: "ab CHF 249",
        description: "Ein sauber eingerichtetes Profil als Grundlage für Ihre lokale Sichtbarkeit.",
        features: ["Profilprüfung oder Einrichtung", "Konsistente Geschäftsdaten", "Klare Leistungsinformationen"],
      },
    ],
    benefitsTitle: "Für einen verlässlichen lokalen Auftritt",
    benefits: [
      "Ihr Unternehmen ist mit korrekten Angaben auffindbar",
      "Öffnungszeiten und Kontaktwege sind konsistent",
      "Kunden verstehen schneller, was Sie anbieten",
    ],
    processTitle: "So gehen wir vor",
    process: [
      { id: "audit", label: "01", title: "Prüfen", description: "Ich prüfe den aktuellen Auftritt und erkennbare Lücken." },
      { id: "align", label: "02", title: "Abgleichen", description: "Wir klären Leistungen, Zielgebiet und korrekte Geschäftsdaten." },
      { id: "optimize", label: "03", title: "Optimieren", description: "Profil und Informationen werden nachvollziehbar verbessert." },
      { id: "handover", label: "04", title: "Übergeben", description: "Sie erhalten einen klaren Überblick und die nächsten sinnvollen Schritte." },
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
            "Meistens ja. Ich prüfe den bestehenden Eintrag auf fehlende oder widersprüchliche Angaben, ergänze Leistungen und Zielgebiet und sorge dafür, dass Ihre Geschäftsdaten überall gleich lauten.",
        },
        {
          question: "Garantiert das ein besseres Ranking bei Google?",
          answer:
            "Nein. Niemand kann eine Position bei Google garantieren, und wer das verspricht, sollte Sie misstrauisch machen. Ein vollständiges, konsistentes Profil ist die Grundlage, auf der lokale Sichtbarkeit überhaupt entstehen kann.",
        },
        {
          question: "Was erhalte ich am Ende?",
          answer:
            "Ein eingerichtetes oder überarbeitetes Profil, konsistente Geschäftsdaten und einen verständlichen Überblick über den Stand und die nächsten sinnvollen Schritte.",
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
    ctaLabel: "Ablauf unverbindlich prüfen",
    ctaHref: "/contact",
    faq: {
      title: "Häufige Fragen zur Automation",
      items: [
        {
          question: "Welche Aufgaben lassen sich automatisieren?",
          answer:
            "Alles, was regelmässig nach denselben Regeln abläuft: wiederkehrende E-Mails und Benachrichtigungen, regelmässige Berichte und Datenaufbereitung, Informationsübergaben zwischen Systemen und wiederholbare interne Workflows.",
        },
        {
          question: "Warum steht kein Preis auf dieser Seite?",
          answer:
            "Weil der Aufwand vollständig von Ihrem bestehenden Prozess abhängt. Ich beurteile zuerst Machbarkeit, Risiken und den erwartbaren Nutzen – erst danach lässt sich ein ehrlicher Preis nennen.",
        },
        {
          question: "Was passiert, wenn sich eine Automation nicht lohnt?",
          answer:
            "Dann sage ich das. Eine Automation, die mehr Pflege verursacht als sie an Zeit spart, ist kein Fortschritt. Die Machbarkeitsprüfung darf auch zum Ergebnis kommen, dass der heutige Ablauf der bessere ist.",
        },
        {
          question: "Was passiert nach der Umsetzung?",
          answer:
            "Sie erhalten eine verständliche Einführung und eine Dokumentation, damit der Ablauf nachvollziehbar bleibt und nicht von einer einzelnen Person abhängt.",
        },
      ],
    },
  },
  work: {
    eyebrow: "Arbeiten",
    title: "Digitale Konzepte mit klarer Funktion.",
    intro: "Ausgewählte Gestaltungskonzepte zeigen, wie Strategie, Inhalt und Entwicklung zusammenwirken können.",
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
    standardsTitle: "Was ich voraussetze",
    standards: [
      "Jede Seite wird als fertiges HTML ausgeliefert und ist sofort da – auch bei langsamer Verbindung.",
      "Bedienbar mit Tastatur und Screenreader, mit geprüften Farbkontrasten.",
      "Für den schmalen Bildschirm entworfen, nicht nachträglich dafür angepasst.",
      "Automatisch getestet, damit eine spätere Änderung nichts Bestehendes still zerstört.",
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
      email: "kontakt@silvandigital.ch",
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
  imprint: {
    eyebrow: "Impressum",
    title: "Wer hinter dieser Website steht.",
    intro:
      "Angaben gemäss Art. 3 Abs. 1 lit. s des Bundesgesetzes gegen den unlauteren Wettbewerb (UWG).",
    updatedLabel: "Stand",
    updated: "August 2026",
    sections: [
      {
        title: "Verantwortlich für diese Website",
        body: [
          "Silvan Hahn",
          "Regensbergstrasse 23",
          "8113 Boppelsen",
          "Schweiz",
        ],
      },
      {
        title: "Kontakt",
        body: [
          "E-Mail: kontakt@silvandigital.ch",
          "Telefon: +41 78 900 85 00",
          "Sämtliche Kontaktwege sind auch auf der Kontaktseite aufgeführt.",
        ],
      },
      {
        title: "Rechtsform und Mehrwertsteuer",
        body: [
          "SILVAN Digital Studio ist die Geschäftsbezeichnung der Einzelunternehmung von Silvan Hahn. Es besteht kein Eintrag im Handelsregister.",
          "Es besteht keine Mehrwertsteuerpflicht. Auf Rechnungen wird deshalb keine Mehrwertsteuer ausgewiesen, und die auf dieser Website genannten Preise sind Endpreise.",
        ],
      },
      {
        title: "Zu den gezeigten Arbeiten",
        body: [
          "Die unter «Arbeiten» gezeigten Projekte sind eigeninitiierte Gestaltungskonzepte und werden auf jeder Ansicht als «Konzeptprojekt» gekennzeichnet. Sie stellen keine abgeschlossenen Kundenaufträge dar, und es werden weder Auftraggeber noch erzielte Ergebnisse behauptet.",
        ],
      },
      {
        title: "Haftung für Inhalte",
        body: [
          "Die Inhalte dieser Website werden mit Sorgfalt erstellt. Für ihre Richtigkeit, Vollständigkeit und Aktualität wird jedoch keine Gewähr übernommen. Preisangaben sind Richtwerte und werden erst mit einer schriftlichen Bestätigung verbindlich.",
          "Anfragen über diese Website sind unverbindlich. Ein Vertrag kommt erst durch eine ausdrückliche Bestätigung zustande.",
        ],
      },
      {
        title: "Haftung für Links",
        body: [
          "Diese Website verweist auf externe Websites Dritter, auf deren Inhalte kein Einfluss besteht. Für diese Inhalte ist ausschliesslich der jeweilige Anbieter verantwortlich.",
        ],
      },
      {
        title: "Urheberrecht",
        body: [
          "Die auf dieser Website veröffentlichten Inhalte, Gestaltungen und Bilder unterliegen dem schweizerischen Urheberrecht. Eine Vervielfältigung oder Verwendung ausserhalb der gesetzlich zulässigen Fälle bedarf der vorherigen schriftlichen Zustimmung.",
        ],
      },
    ],
  },
  privacy: {
    eyebrow: "Datenschutz",
    title: "Welche Daten diese Website bearbeitet.",
    intro:
      "Diese Erklärung beschreibt, welche Personendaten beim Besuch dieser Website bearbeitet werden, nach dem revidierten Schweizer Datenschutzgesetz (revDSG).",
    updatedLabel: "Stand",
    updated: "August 2026",
    sections: [
      {
        title: "Verantwortliche Person",
        body: [
          "Silvan Hahn, Regensbergstrasse 23, 8113 Boppelsen, Schweiz",
          "E-Mail: kontakt@silvandigital.ch",
        ],
      },
      {
        title: "Grundsatz",
        body: [
          "Diese Website ist so gebaut, dass sie so wenig Personendaten wie möglich bearbeitet. Sie enthält kein Kontaktformular, das an einen Server sendet, keine Benutzerkonten und keine Kommentarfunktion.",
        ],
      },
      {
        title: "Reichweitenmessung ohne Cookies",
        body: [
          "Diese Website nutzt Vercel Analytics, um zu zählen, welche Seiten aufgerufen werden. Dabei werden keine Cookies gesetzt und keine dauerhaften Kennungen gespeichert. Es findet keine Profilbildung statt, Sie werden über mehrere Besuche hinweg nicht wiedererkannt, und über andere Websites hinweg wird nichts verfolgt.",
          "Erhoben werden die aufgerufene Seite, die verweisende Adresse, die ungefähre Herkunft auf Länderebene sowie Gerätetyp und Browser. Daraus wird ein täglich wechselnder, nicht umkehrbarer Wert gebildet, der ausschliesslich verhindert, dass Aufrufe derselben Sitzung doppelt gezählt werden. Dieser Wert wird nicht gespeichert und lässt keinen Rückschluss auf Ihre Person zu.",
          "Es werden keine Werbedienste eingebunden, und es werden keine Daten zu Werbezwecken an Dritte weitergegeben. Weil dabei keine Cookies gesetzt und keine Personendaten zur Wiedererkennung bearbeitet werden, ist für diese Messung keine Einwilligung erforderlich.",
        ],
      },
      {
        title: "Server-Logdateien",
        body: [
          "Beim Abruf dieser Website werden durch den Hosting-Anbieter technisch notwendige Daten verarbeitet: IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Adresse, der verweisende Link sowie Angaben zu Browser und Betriebssystem.",
          "Diese Bearbeitung ist für den sicheren und stabilen Betrieb der Website erforderlich. Die Daten werden nicht mit anderen Datenquellen zusammengeführt und nicht zur Identifikation einzelner Personen verwendet.",
        ],
      },
      {
        title: "Hosting",
        body: [
          "Diese Website wird bei Vercel Inc. gehostet. Dabei können Daten auch auf Servern ausserhalb der Schweiz bearbeitet werden. Der Anbieter ist vertraglich zur Einhaltung eines angemessenen Datenschutzniveaus verpflichtet.",
        ],
      },
      {
        title: "Schriften",
        body: [
          "Die verwendete Schrift wird beim Erstellen der Website heruntergeladen und von dieser Website selbst ausgeliefert. Ihr Browser stellt dafür keine Verbindung zu einem externen Schriftenanbieter her, und es werden keine Daten an Dritte übermittelt.",
        ],
      },
      {
        title: "Anfrage für Review Cards",
        body: [
          "Auf der Seite «Google Reviews» können Sie die Eckdaten einer Anfrage erfassen. Diese Angaben werden ausschliesslich in Ihrem Browser zu einer WhatsApp-Nachricht zusammengesetzt. Sie werden nicht an diese Website übermittelt und dort auch nicht gespeichert.",
          "Erst wenn Sie die vorbereitete Nachricht in WhatsApp abschicken, gelangen die Angaben zu WhatsApp und zu mir. Es gelten dann zusätzlich die Datenschutzbestimmungen von WhatsApp.",
        ],
      },
      {
        title: "Kontaktaufnahme",
        body: [
          "Wenn Sie mich per E-Mail, Telefon, WhatsApp oder LinkedIn kontaktieren, werden Ihre Angaben zur Bearbeitung Ihres Anliegens verwendet und so lange aufbewahrt, wie es dafür und für allfällige gesetzliche Aufbewahrungspflichten nötig ist.",
          "WhatsApp und LinkedIn sind Dienste Dritter. Wenn Sie diese Wege nutzen, werden Daten auch durch die jeweiligen Anbieter bearbeitet – WhatsApp durch Meta Platforms Ireland Ltd., LinkedIn durch LinkedIn Ireland Unlimited Company.",
        ],
      },
      {
        title: "Externe Links",
        body: [
          "Diese Website verlinkt auf externe Angebote, etwa auf LinkedIn oder auf Google-Unternehmensprofile. Für die Datenbearbeitung auf diesen Websites ist der jeweilige Anbieter verantwortlich.",
        ],
      },
      {
        title: "Ihre Rechte",
        body: [
          "Sie haben das Recht auf Auskunft über die zu Ihrer Person bearbeiteten Daten sowie auf deren Berichtigung, Löschung oder Herausgabe. Sie können einer Bearbeitung widersprechen und eine erteilte Einwilligung jederzeit widerrufen.",
          "Wenden Sie sich dafür an die oben genannte Adresse. Sie haben zudem das Recht, sich beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) zu beschweren.",
        ],
      },
      {
        title: "Datensicherheit",
        body: [
          "Diese Website wird ausschliesslich verschlüsselt über HTTPS ausgeliefert. Damit sind die zwischen Ihrem Browser und dem Server übertragenen Daten gegen Mitlesen geschützt.",
        ],
      },
      {
        title: "Änderungen",
        body: [
          "Diese Datenschutzerklärung kann angepasst werden, wenn sich die Website oder die rechtlichen Anforderungen ändern. Massgebend ist die jeweils auf dieser Seite veröffentlichte Fassung.",
        ],
      },
    ],
  },
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
    home: { title: "Webdesign für KMU im Kanton Zürich | SILVAN", description: "Websites, Google-Bewertungen, lokale Sichtbarkeit und Automation für Schweizer KMU. Direkt vom Entwickler aus Boppelsen ZH – Websites ab CHF 300." },
    websites: { title: "Website erstellen lassen – Kanton Zürich | ab CHF 300", description: "Schnelle, mobil gestaltete Business-Websites für Schweizer KMU – von der kompakten Info-Seite ab CHF 300 bis zum individuellen Projekt. Feste Preisstufen." },
    reviews: { title: "NFC & QR Lösungen für Unternehmen | ab CHF 49", description: "NFC-Karten und Aufsteller für Google-Bewertungen, digitale Menüs, Buchungen und individuelle Ziele. Programmierung und Einrichtung inklusive." },
    presence: { title: "Google Unternehmensprofil einrichten – Kanton Zürich", description: "Google-Unternehmensprofil einrichten oder optimieren, Geschäftsdaten konsistent halten, lokal leichter gefunden werden. Für Schweizer KMU ab CHF 249." },
    automation: { title: "Abläufe automatisieren für KMU | SILVAN Digital Studio", description: "Wiederkehrende E-Mails, Berichte und interne Abläufe automatisieren – ohne grosse Software-Einführung. Für Schweizer KMU, Umfang auf Anfrage." },
    work: { title: "Arbeiten: Website-Konzepte aus der Schweiz | SILVAN", description: "Vier eigeninitiierte Gestaltungskonzepte – Markenauftritt, Online-Shop, Studio-Website und Handel – die zeigen, wie ich Struktur, Text und Gestaltung angehe." },
    about: { title: "Silvan Hahn – Webentwickler im Kanton Zürich", description: "Ich bin Silvan Hahn, unabhängiger Webentwickler in Boppelsen ZH. Sie arbeiten direkt mit der Person, die Ihr Projekt plant, gestaltet und umsetzt." },
    contact: { title: "Kontakt – Webdesign-Anfrage Kanton Zürich | SILVAN", description: "Besprechen Sie Ihr Vorhaben direkt mit Silvan Hahn – per E-Mail, WhatsApp, Telefon oder LinkedIn. Standort Boppelsen ZH. Anfragen sind unverbindlich." },
    hello: { title: "Hallo, ich bin Silvan | SILVAN Digital Studio", description: "Der direkte Einstieg zu Websites, Google-Bewertungen, Online-Präsenz, Arbeiten und Kontakt." },
    imprint: { title: "Impressum | SILVAN Digital Studio", description: "Verantwortlich für diese Website: Silvan Hahn, Boppelsen. Angaben zu Rechtsform, Kontakt und Urheberrecht." },
    privacy: { title: "Datenschutz | SILVAN Digital Studio", description: "Keine Cookies, keine Profilbildung, kein Wiedererkennen über Besuche hinweg – nur eine cookielose Reichweitenmessung. Datenschutzerklärung nach revDSG." },
  },
} as const satisfies SiteContent;

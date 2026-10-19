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
      { label: "Google-Unternehmensprofil", href: "/presence" },
      { label: "NFC- und QR-Karten", href: "/reviews" },
      { label: "Automationen", href: "/automation" },
      { label: "Beispiele", href: "/work" },
      { label: "Preise", href: "/#prices" },
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
      serviceLine: "Websites, Google-Unternehmensprofil, NFC- und QR-Karten und Automationen",
      headline: homeCopy.de.headline,
      supporting:
        "Ich bin Silvan Hahn. Ich entwickle Websites, unterstütze Ihren Auftritt auf Google und vereinfache wiederkehrende Aufgaben. Aus Boppelsen bei Zürich, für Betriebe in der ganzen Schweiz.",
      primaryCta: homeCopy.de.primaryCta,
      secondaryCta: homeCopy.de.secondaryCta,
    },
    servicesTitle: "Was möchten Sie verbessern?",
    services: [
      {
        title: "Websites",
        description: "Zeigen Sie, was Ihr Betrieb bietet. Mit verständlichen Informationen und einfachen Kontaktmöglichkeiten.",
        price: "ab CHF 300",
        href: "/websites",
      },
      {
        title: "NFC- und QR-Karten",
        description: "Mit einer Karte oder einem QR-Code öffnen Ihre Kunden die passende Seite auf dem Handy, etwa Ihre Speisekarte oder Google-Bewertungen.",
        price: "Klebechips ab CHF 15 · Karten ab CHF 29",
        href: "/reviews",
      },
      {
        title: "Google-Unternehmensprofil",
        description: "Öffnungszeiten, Adresse und Telefonnummer: Helfen Sie Kunden, Ihren Betrieb auf Google und Google Maps zu finden.",
        price: "ab CHF 249",
        href: "/presence",
      },
      {
        title: "Automationen",
        description: "Weniger doppelte Arbeit im Büro, etwa beim Sammeln von Anfragen oder Übertragen von Daten.",
        price: "Auf Anfrage",
        href: "/automation",
      },
    ],
    workTitle: "Ausgewählte Arbeiten",
    studioTitle: "Ihr Ansprechpartner von Anfang bis Ende",
    studioCopy:
      "Ich bin Silvan Hahn aus Boppelsen bei Zürich. Ich unterstütze Sie bei Ihrem digitalen Auftritt und einfacheren Abläufen im Alltag. Für Betriebe in der ganzen Schweiz. Sie arbeiten direkt mit mir.",
    testimonialsTitle: "Was Kunden sagen",
    // Bleibt leer, bis eine echte, namentlich freigegebene Kundenstimme
    // vorliegt. Die Sektion rendert erst, wenn dieses Array Einträge hat --
    // eine erfundene Empfehlung auf der Seite eines Studios, das Google
    // Reviews verkauft, wäre der teuerste denkbare Fehler.
    testimonials: [],
  },
  websites: {
    "eyebrow": "Websites für kleine Betriebe",
    "title": "Eine Website, die Ihre Kunden sofort verstehen.",
    "intro": "Ihre Kunden sehen auf einen Blick, was Sie anbieten und wie sie Sie erreichen. Ich übernehme Gestaltung und Technik, zum festen Preis.",
    "priceLabel": "Preisrahmen · CHF 300–5'000+",
    "priceTiers": [
      {
        "id": "simple",
        "name": "Kompakte Website",
        "price": "CHF 300–699",
        "description": "Für Betriebe, die ihr Angebot, Öffnungszeiten und Kontakt auf einer übersichtlichen Seite zeigen möchten.",
        "features": [
          "Eine Seite mit Angebot, Öffnungszeiten und Kontakt",
          "Gut bedienbar auf dem Handy",
          "Anrufen oder schreiben mit einem Antippen"
        ]
      },
      {
        "id": "standard",
        "name": "Business-Website",
        "price": "CHF 700–1'999",
        "recommended": true,
        "description": "Für Betriebe, die ihre Leistungen, ihr Unternehmen und den Kontakt auf eigenen Seiten vorstellen möchten.",
        "features": [
          "Eigene Seiten, zum Beispiel für Leistungen, Betrieb und Kontakt",
          "Gestaltung passend zu Ihrem Betrieb",
          "Grundlagen, damit Suchmaschinen wie Google Ihre Seiten finden"
        ]
      },
      {
        "id": "premium",
        "name": "Umfangreiche Website",
        "price": "CHF 2'000–4'999",
        "description": "Für Unternehmen mit mehreren Leistungsbereichen oder vielen Inhalten, die eine sorgfältige Gliederung und Gestaltung brauchen.",
        "features": [
          "Klare Gliederung für mehrere Bereiche",
          "Menü und Seiten passend zu vielen Inhalten",
          "Einheitlicher Aufbau für ähnliche Seiten"
        ]
      },
      {
        "id": "custom",
        "name": "Individuelles Projekt",
        "price": "ab CHF 5'000",
        "description": "Für besondere Funktionen oder Verbindungen zu bestehender Software. Wir klären zuerst, was Ihre Website leisten soll.",
        "features": [
          "Eigenes Konzept für Ihr Vorhaben",
          "Planung der Technik gemeinsam mit Ihnen",
          "Umsetzung der vereinbarten Funktionen"
        ]
      }
    ],
    "benefitsTitle": "Welche Website passt zu Ihnen?",
    "benefits": [
      "Aufbau und Gestaltung passend zu Ihrem Betrieb",
      "Gut lesbar auf Handy und Computer",
      "Erst nach Ihrer Freigabe online"
    ],
    "processTitle": "So entsteht Ihre Website",
    "process": [
      {
        "id": "consult",
        "label": "01",
        "title": "Kostenloses Erstgespräch",
        "description": "Am Telefon, per Video oder vor Ort."
      },
      {
        "id": "quote",
        "label": "02",
        "title": "Offerte mit Fixpreis",
        "description": "Erst nach Ihrer Zusage geht es los."
      },
      {
        "id": "build",
        "label": "03",
        "title": "Online in 2–4 Wochen",
        "description": "Sobald Texte und Bilder bereit sind."
      }
    ],
    "ctaLabel": "Kostenloses Erstgespräch",
    "ctaHref": "/contact",
    "faq": {
      "title": "Häufige Fragen zu Websites",
      "items": [
        {
          "question": "Was kostet eine Website insgesamt?",
          "answer": "Einmalig CHF 300 bis 699 für eine kompakte Website, CHF 700 bis 1'999 für eine Website mit mehreren Seiten, CHF 2'000 bis 4'999 für eine umfangreiche Website und ab CHF 5'000 für ein individuelles Projekt. Dazu kommen jährliche Kosten für Ihre Internetadresse und das Hosting. Alle Beträge stehen vorher in Ihrer Offerte und verstehen sich inkl. MWST."
        },
        {
          "question": "Was ist im Preis enthalten?",
          "answer": "Planung, Gestaltung, Umsetzung und das Online-Stellen im vereinbarten Umfang. In der Offerte steht auch, wie viele Korrekturrunden dabei sind. Nicht enthalten sind die jährlichen Kosten für Internetadresse und Hosting sowie spätere Änderungen. Diese stehen separat in der Offerte."
        },
        {
          "question": "Was sind Internetadresse und Hosting?",
          "answer": "Die Internetadresse ist der Name Ihrer Website, zum Beispiel www.ihr-betrieb.ch. Das Hosting ist der Speicherplatz im Internet, der Ihre Website online hält. Für beides fallen jährliche Kosten an. Der Betrag hängt von Grösse und Wünschen ab und steht in Ihrer Offerte, bevor Sie zusagen."
        },
        {
          "question": "Muss ich Texte und Bilder selbst liefern?",
          "answer": "Nicht unbedingt. Im Erstgespräch klären wir, was schon da ist und was noch fehlt. In der Offerte steht, welche Inhalte Sie liefern und welche ich erstelle."
        },
        {
          "question": "Wie lange dauert es?",
          "answer": "Eine kompakte Website ist in der Regel nach 2–4 Wochen online, sobald Texte und Bilder bereit sind. Grössere Projekte planen wir gemeinsam. Den Zeitplan halten wir in der Offerte fest."
        },
        {
          "question": "Kann ich später selbst etwas ändern?",
          "answer": "Ja, wenn Sie das möchten. Wir besprechen schon bei der Planung, was Sie selbst ändern möchten, zum Beispiel Öffnungszeiten oder Bilder. Dafür richte ich bei Bedarf ein einfaches Bearbeitungssystem ein und zeige Ihnen, wie es funktioniert. Die Kosten dafür stehen in der Offerte. Sie können Änderungen auch mir überlassen. Das vereinbaren wir separat."
        }
      ]
    }
  },
  reviews: {
    eyebrow: "NFC- und QR-Karten",
    title: "Handy hinhalten. Bewertung schreiben.",
    intro:
      "Ihre Kunden halten das Handy an die Karte oder scannen den Code. Schon ist Ihre Google-Bewertung, Speisekarte oder Buchung offen.",
    priceLabel: "Modelle und Gestaltung inklusive Link-Einrichtung",
    products: [
      {
        id: "nfc-chip",
        name: "NFC-Klebechip",
        price: "CHF 15.–",
        description: "Selbstklebender NFC-Chip. Er öffnet den vereinbarten Link und lässt sich auf vorhandene Produkte kleben.",
        features: [productTierSummary("nfc-chip", "de"), "Zum Aufkleben", "Programmierung inklusive"],
      },
      {
        id: "compact-card",
        name: "NFC-Kompaktkarte",
        price: "CHF 29.–",
        description: "Flache, rechteckige Karte zum Vorzeigen. Erhältlich in Weiss oder Schwarz, ohne Aufsteller.",
        features: [productTierSummary("compact-card", "de"), "Weiss oder Schwarz", "Programmierung inklusive"],
      },
      {
        id: "standard-card",
        name: "Standardkarte",
        price: "CHF 49.–",
        description: "Eine Karte im bestehenden Standarddesign, ohne Ihr Logo oder Ihren Firmennamen.",
        features: [productTierSummary("standard-card", "de"), "Bestehendes Design · NFC und QR", "Programmierung inklusive"],
      },
      {
        id: "personalized-card",
        name: "Karte mit Ihrem Logo",
        price: "CHF 69.–",
        description: "Ein bestehendes Design mit Ihrem Logo oder Firmennamen.",
        features: [productTierSummary("personalized-card", "de"), "Form und Grösse modellabhängig", "Logo und Firmenname"],
      },
      {
        id: "fully-custom-card",
        name: "Karte mit individuellem Design",
        price: "CHF 99.–",
        description: "Ein individuelles Design mit Ihren Farben, Ihrem Logo und Ihrer gewünschten Gestaltung.",
        features: [productTierSummary("fully-custom-card", "de"), "Freie Gestaltung und Einrichtung des vereinbarten Links", "Designservice inklusive"],
      },
    ],
    quantityDiscount: "Über 10 Stück: zusätzliche Mengenrabatte nach Absprache.",
    processTitle: "Drei einfache Schritte",
    process: [
      { id: "tap", label: "TAP", title: "Handy an die Karte halten", description: "Ihr Kunde hält sein Handy kurz an die Karte. Oder er scannt den QR-Code mit der Kamera." },
      { id: "open", label: "OPEN", title: "Auf den Hinweis tippen", description: "Auf dem Handy erscheint ein Hinweis mit Ihrem Link. Ein Tippen genügt. Eine zusätzliche App braucht es nicht." },
      { id: "act", label: "ACT", title: "Bewerten, lesen, reservieren", description: "Ihre Seite ist offen. Ihr Kunde schreibt eine Bewertung, liest die Speisekarte oder reserviert einen Tisch." },
    ],
    ctaLabel: "Karte anfragen",
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
      { id: "reviews", label: "Google-Bewertungen" },
      { id: "social", label: "Instagram" },
      { id: "chips", label: "Klebechips" },
      { id: "menu", label: "Speisekarten" },
      { id: "custom", label: "Individuelles Design und weitere Anwendungen" },
    ],
    catalogLabel: "Anwendung",
    categoryPrompt: "Welche Produktbeispiele möchten Sie sehen?",
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
    interact3dLabel: "Ziehen Sie mit dem Finger oder der Maus, um das Produkt zu drehen.",
    catalog: mergePhotoProducts("de", [
      {
        id: "review-round-black",
        category: "reviews",
        title: "Standardkarte · Rund, Schwarz",
        price: "CHF 49.–",
        description: "Ihre Kunden gelangen direkt zu Ihrer Google-Bewertungsseite. Schwarzes Standarddesign.",
        image: { src: "/images/products/catalog/review-round-black.webp", alt: "Schwarze runde Google-Bewertungs-NFC-Karte" },
        details: ["Rund", "80 × 80 oder 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/k2oyfSvDdVisnlUw/scene.splinecode", fallbackImage: "/images/products/round-nfc-black.webp", ariaLabel: "Interaktives 3D-Modell einer schwarzen runden Google-Bewertungs-NFC-Karte" },
      },
      {
        id: "review-round-white",
        category: "reviews",
        title: "Standardkarte · Rund, Weiss",
        price: "CHF 49.–",
        description: "Ihre Kunden gelangen direkt zu Ihrer Google-Bewertungsseite. Weisses Standarddesign mit fünf aufgedruckten Sternen.",
        image: { src: "/images/products/catalog/review-round-white.webp", alt: "Weisse runde Google-Bewertungs-NFC-Karte" },
        details: ["Rund", "80 × 80 oder 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode", fallbackImage: "/images/products/round-nfc-white.webp", ariaLabel: "Interaktives 3D-Modell einer weissen runden Google-Bewertungs-NFC-Karte" },
      },
      {
        id: "review-square-blue",
        category: "reviews",
        title: "Standardkarte · Blau",
        price: "CHF 49.–",
        description: "Blaue, quadratische Karte mit Standarddesign für Ihre Google-Bewertungsseite.",
        image: { src: "/images/products/catalog/review-square-blue.webp", alt: "Blaue quadratische Google-Bewertungs-NFC-Karte" },
        details: ["Quadratisch", "80 × 80 oder 100 × 100 mm"],
        scene: { url: "https://prod.spline.design/fttoKfHSbrqCbrUd/scene.splinecode", fallbackImage: "/images/products/stand-blue.webp", ariaLabel: "Interaktives 3D-Modell einer blauen Google-Bewertungs-NFC-Karte" },
      },
      {
        id: "review-stand-white",
        category: "reviews",
        title: "Standardaufsteller · Weiss",
        price: "CHF 49.–",
        description: "Aufsteller im Standarddesign für Ihre Google-Bewertungsseite. Für Empfang, Kasse oder Tisch.",
        image: { src: "/images/products/catalog/review-stand-white.webp", alt: "Weisser Google-Bewertungs-NFC-Aufsteller" },
        details: ["Aufsteller", "Standarddesign ohne Personalisierung"],
        scene: { url: "https://prod.spline.design/9R8JSb5RsHstdJxk/scene.splinecode", fallbackImage: "/images/products/card-stand-white.webp", ariaLabel: "Interaktives 3D-Modell eines weissen Google-Bewertungs-Aufstellers" },
      },
      {
        id: "review-personalized-black",
        category: "reviews",
        title: "Mit Ihrem Logo · Rund, Schwarz",
        price: "CHF 69.–",
        description: "Karte für Ihre Google-Bewertungsseite. Das bestehende Design ergänze ich mit Ihrem Logo und Firmennamen.",
        image: { src: "/images/products/catalog/review-personalized-black.webp", alt: "Personalisierte schwarze Google-Bewertungs-Karte mit SilvanDigital-Logo" },
        details: ["Rund oder quadratisch", "80 × 80 oder 100 × 100 mm"],
      },
      {
        id: "menu-round-black",
        category: "menu",
        title: "Speisekarte · Rund, Schwarz",
        price: "CHF 49.–",
        description: "Ihre Gäste öffnen die Speise- und Getränkekarte direkt auf dem Handy.",
        image: { src: "/images/products/catalog/menu-round-black.webp", alt: "Schwarze runde NFC-Menükarte" },
        details: ["Rund", "80 × 80 oder 100 × 100 mm"],
      },
      {
        id: "menu-square-black",
        category: "menu",
        title: "Speisekarte · Quadratisch",
        price: "CHF 49.–",
        description: "Schwarze Karte im Standarddesign für Ihre Speise- und Getränkekarte.",
        image: { src: "/images/products/catalog/menu-square-black.webp", alt: "Schwarze quadratische NFC-Menükarte" },
        details: ["Quadratisch", "80 × 80 oder 100 × 100 mm"],
      },
      {
        id: "menu-personalized-white",
        category: "menu",
        title: "Speisekarte · Mit Ihrem Logo, Weiss",
        price: "CHF 69.–",
        description: "Karte für Ihre Speisekarte. Das bestehende Design ergänze ich mit Ihrem Logo und Firmennamen.",
        image: { src: "/images/products/catalog/menu-personalized-white.webp", alt: "Weisse personalisierte runde NFC-Menükarte" },
        details: ["Rund oder quadratisch", "80 × 80 oder 100 × 100 mm"],
      },
      {
        id: "booking-custom-blue",
        category: "custom",
        title: "Buchungen · Individuelles Design",
        price: "CHF 99.–",
        description: "Designbeispiel für Buchungen und Reservationen. Farben, Logo und Gestaltung legen Sie selbst fest oder ich entwerfe die Karte für Sie.",
        image: { src: "/images/products/catalog/booking-custom-blue.webp", alt: "Blaue individuell gestaltete NFC-Karte für Buchungen" },
        details: ["Rund oder quadratisch", "80 × 80 oder 100 × 100 mm", "Freie Gestaltung und Einrichtung des vereinbarten Links"],
      },
    ]),
    useCasesTitle: "Wofür Sie die Karten nutzen können",
    useCases: [
      { title: "Google-Bewertungen", description: "Ihre Kunden gelangen direkt zu Ihrer Google-Bewertungsseite." },
      { title: "Digitale Speisekarte", description: "Ihre Gäste öffnen die aktuelle Speise- und Getränkekarte auf ihrem Handy." },
      { title: "Buchungen und Reservationen", description: "Ihre Kunden gelangen direkt zur Terminbuchung oder Tischreservation." },
      { title: "WLAN-Zugang", description: "NFC oder QR-Code erleichtern den Zugang zu Ihrem Gäste-WLAN. Die Einrichtung und Geräteanforderungen klären wir persönlich." },
      { title: "Digitale Visitenkarte", description: "Ihre Kunden öffnen Ihre Kontaktdaten und können sie auf ihrem Handy speichern." },
    ],
    inquiry: {
      title: "Karte anfragen",
      intro: "Wählen Sie Produkt und Anwendung und geben Sie die Menge an. Der voraussichtliche Produktpreis erscheint unten. Form und Grösse bestätigen wir in der Offerte. Für direkten WLAN-Zugang wählen Sie «Ich brauche Hilfe bei der Einrichtung» und beschreiben Ihren Wunsch im Nachrichtenfeld. Anschliessend prüfen Sie die Anfrage und wählen WhatsApp oder E-Mail.",
      fields: [
        { name: "destination", label: "Wofür möchten Sie das Produkt nutzen?", placeholder: "Anwendung wählen", required: true },
        { name: "product", label: "Produkt", placeholder: "Produkt wählen", required: true },
        { name: "shape", label: "Form", placeholder: "Form wählen", required: true },
        { name: "size", label: "Grösse", placeholder: "Grösse wählen", required: true },
        { name: "quantity", label: "Anzahl Stück", placeholder: "Zum Beispiel 2", required: true },
        { name: "setup", label: "Haben Sie bereits den passenden Link?", placeholder: "Bitte wählen", required: true },
        { name: "destinationUrl", label: "Link zur gewünschten Seite", placeholder: "https://…", required: false, autoComplete: "url" },
        { name: "businessName", label: "Unternehmen (optional)", placeholder: "Name Ihres Unternehmens", required: false, autoComplete: "organization" },
        { name: "contactPerson", label: "Kontaktperson (optional)", placeholder: "Vor- und Nachname", required: false, autoComplete: "name" },
        { name: "note", label: "Design, Farbe oder Nachricht (optional)", placeholder: "Zum Beispiel Ihr Logo, Ihre Firmenfarben oder ein gewünschter WLAN-Zugang", required: false },
      ],
      destinationOptions: [
        { value: "reviews", label: "Google-Bewertungen" },
        { value: "tripadvisor", label: "Tripadvisor" },
        { value: "instagram", label: "Instagram" },
        { value: "tiktok", label: "TikTok" },
        { value: "facebook", label: "Facebook" },
        { value: "youtube", label: "YouTube" },
        { value: "whatsapp", label: "WhatsApp" },
        { value: "menu", label: "Digitale Speisekarte" },
        { value: "booking", label: "Buchungen und Reservationen" },
        { value: "airbnb", label: "Airbnb" },
        { value: "wifi", label: "Gäste-WLAN" },
        { value: "contact", label: "Digitale Visitenkarte" },
        { value: "other", label: "Andere Anwendung" },
      ],
      productOptions: [
        { value: "nfc-chip", label: "NFC-Klebechip · 1 Stück CHF 15.–" },
        { value: "compact-card", label: "NFC-Kompaktkarte · CHF 29.–" },
        { value: "standard-card", label: "Standardkarte · CHF 49.–" },
        { value: "standard-stand", label: "Standardaufsteller · CHF 49.–" },
        { value: "personalized-card", label: "Karte mit Ihrem Logo · CHF 69.–" },
        { value: "fully-custom-card", label: "Karte mit individuellem Design · CHF 99.–" },
      ],
      shapeOptions: [{ value: "round", label: "Rund" }, { value: "square", label: "Quadratisch" }, { value: "rectangle", label: "Rechteckig" }],
      sizeOptions: [{ value: "80", label: "80 × 80 mm" }, { value: "100", label: "100 × 100 mm" }, { value: "confirm", label: "Grösse nach Absprache" }],
      setupOptions: [
        { value: "ready", label: "Ich habe den passenden Link" },
        { value: "needs-setup", label: "Ich brauche Hilfe bei der Einrichtung" },
      ],
      submitLabel: "Anfrage in WhatsApp öffnen",
      editLabel: "Angaben bearbeiten",
      requiredError: "Bitte füllen Sie dieses Feld aus.",
      errorSummary: (count: number) =>
        count === 1
          ? "Ein Feld muss noch ausgefüllt oder korrigiert werden."
          : `${count} Felder müssen noch ausgefüllt oder korrigiert werden.`,
      quantityError: "Bitte geben Sie eine ganze Zahl von 1 bis 999 ein. Grössere Mengen können Sie im Nachrichtenfeld anfragen.",
      urlError: "Bitte geben Sie einen vollständigen Link ein, der mit https:// beginnt. Für Google-Bewertungen benötigen Sie einen Google-Link.",
      confirmTitle: "Bitte prüfen Sie Ihre Angaben",
      nonBindingNotice: "Ihre Anfrage ist unverbindlich. Ein Auftrag entsteht erst, wenn Sie und ich die Offerte mit den vereinbarten Leistungen und dem Gesamtpreis angenommen haben.",
      privacyNotice: "Ihre Angaben bleiben in diesem Browser-Tab. Beim Sprachwechsel wird die Anfrage höchstens zwei Minuten zwischengespeichert und nach dem Übernahmeversuch gelöscht. An mich wird nichts gesendet, solange Sie die Nachricht nicht selbst abschicken.",
      messageIntro: "Hallo Silvan, ich möchte unverbindlich ein NFC- oder QR-Produkt anfragen.",
    },
    faq: {
      title: "Häufige Fragen zu NFC- und QR-Karten",
      items: [
        {
          question: "Wie funktionieren NFC und QR?",
          answer:
            "Ihre Kunden halten ein geeignetes Handy an die Karte, den Aufsteller oder den Klebechip und tippen auf den angezeigten Link. Bei Produkten mit QR-Code können sie stattdessen den Code scannen. Zum Öffnen des NFC-Links ist keine zusätzliche NFC-App nötig. Die verlinkte Seite kann eine Anmeldung oder eine eigene App verlangen.",
        },
        {
          question: "Funktioniert das mit jedem Smartphone?",
          answer:
            "Das Handy muss NFC-Links lesen können. Bei manchen Geräten müssen Sie NFC zuerst einschalten. Bei Produkten mit QR-Code können Sie stattdessen die Handykamera nutzen. Der einzelne Klebechip hat keinen aufgedruckten QR-Code. Zum Öffnen der verlinkten Seite braucht das Handy eine Internetverbindung. Besondere Geräteanforderungen besprechen wir vor Ihrer Bestellung.",
        },
        {
          question: "Führt die Karte automatisch zu guten Bewertungen?",
          answer:
            "Nein. Die Karte macht es Ihren Kunden leichter, die Bewertungsseite zu finden. Sie entscheiden selbst, ob sie eine Bewertung abgeben, was sie schreiben und wie viele Sterne sie vergeben. Die Karte kauft keine Bewertungen und garantiert keine bestimmte Bewertung.",
        },
        {
          question: "Welche Seiten oder Anwendungen sind möglich?",
          answer:
            "Zum Beispiel Ihre Google-Bewertungsseite, Speisekarte, Buchungsseite, Social-Media-Profile oder Kontaktdaten. Auch ein direkter Zugang zum Gäste-WLAN ist nach persönlicher Absprache möglich. Wählen Sie dafür in der Anfrage «Ich brauche Hilfe bei der Einrichtung» und beschreiben Sie den Wunsch im Nachrichtenfeld oder kontaktieren Sie mich direkt. Ein fehlendes Google-Unternehmensprofil kann ich ebenfalls einrichten.",
          link: { label: "Google-Unternehmensprofil einrichten", href: "/presence" },
        },
        {
          question: "Welche Designs und Grössen sind möglich?",
          answer:
            "Sie finden runde, quadratische und rechteckige Karten, Aufsteller und Klebechips. Form und Grösse hängen vom Modell ab. Runde Karten können wahlweise einen Durchmesser von 80 oder 100 mm haben; quadratische Karten 80 × 80 oder 100 × 100 mm. Wo noch keine Masse bestätigt sind, steht «Grösse nach Absprache». Die Anfrage legt Ihre Wünsche fest; die Verfügbarkeit bestätige ich in der Offerte. Bei der Variante mit Ihrem Logo ergänze ich ein bestehendes Design. Bei der individuellen Variante bestimmen Sie die gesamte Gestaltung.",
        },
        {
          question: "Was kostet es und was ist inbegriffen?",
          answer:
            "NFC-Kompaktkarte: 1 Stück CHF 29, 2 zusammen CHF 40, jede weitere CHF 15. Standardkarte: 1 Stück CHF 49, 2 zusammen CHF 80, jedes weitere CHF 20. NFC-Klebechip: 1 Stück CHF 15, 2 zusammen CHF 25, jeder weitere CHF 5. Karte mit Ihrem Logo: 1 Stück CHF 69, 2 zusammen CHF 100, jede weitere CHF 25. Karte mit individuellem Design: 1 Stück CHF 99, 2 zusammen CHF 150, jede weitere CHF 30. Ein Standardaufsteller kostet CHF 49; mehrere Aufsteller nach Absprache. Über 10 Stück gibt es weitere Rabatte nach Absprache. Programmierung und Einrichtung des vereinbarten Links sind enthalten. Versand und zusätzliche Leistungen werden separat in der Offerte ausgewiesen.",
        },
      ],
    },
  },
  presence: {
    "eyebrow": "Google-Unternehmensprofil",
    "title": "Ihr Betrieb auf Google. Mit den richtigen Angaben.",
    "intro": "Wer Sie auf Google oder Google Maps sucht, sieht Ihren Eintrag. Ich richte ihn ein oder bringe ihn auf den neusten Stand.",
    "priceLabel": "ab CHF 249",
    "startingPrice": "ab CHF 249",
    "priceTiers": [
      {
        "id": "profile",
        "name": "Google-Unternehmensprofil",
        "price": "ab CHF 249",
        "description": "Einen vorhandenen Eintrag prüfen und überarbeiten oder einen neuen einrichten. In der Offerte steht, welche Standorte dazugehören.",
        "features": [
          "Vorhandenen Eintrag prüfen oder neu einrichten",
          "Öffnungszeiten, Adresse und Telefon mit Ihnen abgleichen",
          "Leistungen und Fotos ergänzen, Änderungen festhalten"
        ]
      }
    ],
    "benefitsTitle": "Was ich für Sie mache",
    "benefits": [
      "Angaben auf Widersprüche prüfen",
      "Leistungen verständlich beschreiben",
      "Übersicht, was geändert wurde"
    ],
    "processTitle": "So bringen wir Ihren Eintrag auf den neusten Stand",
    "process": [
      {
        "id": "consult",
        "label": "01",
        "title": "Kostenloses Erstgespräch",
        "description": "Wir schauen Ihren Eintrag gemeinsam an."
      },
      {
        "id": "quote",
        "label": "02",
        "title": "Offerte mit Fixpreis",
        "description": "Sie bestätigen mir Ihre Angaben."
      },
      {
        "id": "update",
        "label": "03",
        "title": "Eintragen und Übersicht",
        "description": "Mit Übersicht, was geändert wurde."
      }
    ],
    "ctaLabel": "Kostenloses Erstgespräch",
    "ctaHref": "/contact",
    "faq": {
      "title": "Häufige Fragen zum Google-Unternehmensprofil",
      "items": [
        {
          "question": "Was ist ein Google-Unternehmensprofil?",
          "answer": "Das ist der Eintrag Ihres Betriebs auf Google und Google Maps. Dort sehen Kunden Ihre Adresse, Öffnungszeiten, Telefonnummer, Fotos und Bewertungen. Der Eintrag ist bei Google kostenlos. Sie bezahlen nur meine Arbeit."
        },
        {
          "question": "Ich habe schon einen Eintrag. Lohnt sich eine Prüfung?",
          "answer": "Ja, wenn Angaben fehlen, veraltet sind oder nicht mit Ihrer Website übereinstimmen. Wir vergleichen den Eintrag mit den Angaben, die Sie mir bestätigen."
        },
        {
          "question": "Erscheine ich danach weiter oben bei Google?",
          "answer": "Das kann niemand versprechen. Google entscheidet über die Reihenfolge. Ich sorge dafür, dass Ihre Angaben richtig und vollständig sind. Eine bestimmte Position oder mehr Anfragen verspreche ich nicht."
        },
        {
          "question": "Was kostet es genau?",
          "answer": "Ab CHF 249 inkl. MWST für meine Arbeit. Der genaue Fixpreis steht in Ihrer Offerte, zum Beispiel je nachdem, wie viele Standorte Sie haben. Eine laufende Pflege oder Arbeiten auf anderen Plattformen vereinbaren wir nur, wenn Sie das möchten."
        },
        {
          "question": "Was erhalte ich am Ende?",
          "answer": "Ihren überarbeiteten Eintrag und eine Übersicht, was geändert wurde. Was Google noch prüft, ist darin klar als offen markiert."
        },
        {
          "question": "Wie bekomme ich mehr Bewertungen?",
          "answer": "Mit einer NFC- oder QR-Karte. Ihre Kunden halten das Handy an die Karte oder scannen den Code und können Sie direkt auf Google bewerten. Die Karten sind auch einzeln bestellbar.",
          "link": {"href": "/reviews", "label": "NFC- und QR-Karten ansehen"}
        }
      ]
    }
  },
  automation: {
    "eyebrow": "Automationen",
    "title": "Einmal einrichten. Jede Woche Zeit sparen.",
    "intro": "Sie tippen Angaben ab oder schreiben jeden Freitag denselben Bericht? Das kann ein Programm für Sie erledigen.",
    "priceLabel": "Auf Anfrage",
    "priceTiers": [
      {
        "id": "custom-automation",
        "name": "Automation nach Ihrem Bedarf",
        "price": "Auf Anfrage",
        "description": "Wir gehen von einer Arbeit aus, die Sie heute von Hand erledigen. Daraus ergibt sich, was möglich ist und ob es sich lohnt.",
        "features": [
          "Prüfen, ob sich die Arbeit vereinfachen lässt",
          "Automation einrichten und mit Ihnen testen",
          "Kurze Anleitung in einfachen Worten"
        ]
      }
    ],
    "benefitsTitle": "Zwei Beispiele aus dem Büroalltag",
    "benefits": [
      "Anfragen landen von selbst in Ihrer Liste",
      "Der Wochenbericht entsteht von selbst",
      "Eine Eingangsbestätigung an jede Anfrage"
    ],
    "processTitle": "So läuft es ab",
    "process": [
      {
        "id": "consult",
        "label": "01",
        "title": "Kostenloses Erstgespräch",
        "description": "Sie erzählen, was sich wiederholt."
      },
      {
        "id": "quote",
        "label": "02",
        "title": "Offerte mit Fixpreis",
        "description": "Laufende Kosten stehen separat darin."
      },
      {
        "id": "setup",
        "label": "03",
        "title": "Einrichten und erklären",
        "description": "Getestet, mit kurzer Anleitung."
      }
    ],
    "ctaLabel": "Kostenloses Erstgespräch",
    "ctaHref": "/contact",
    "faq": {
      "title": "Häufige Fragen zu Automationen",
      "items": [
        {
          "question": "Welche Arbeit eignet sich?",
          "answer": "Arbeit, die sich regelmässig wiederholt und immer gleich abläuft. Zum Beispiel Angaben aus Anfragen in eine Liste übernehmen oder aus offenen Aufgaben einen Wochenbericht erstellen. Gibt es viele Ausnahmen, ist Handarbeit oft einfacher."
        },
        {
          "question": "Was kostet eine Automation?",
          "answer": "Das hängt von der Aufgabe und Ihren Programmen ab. Das Erstgespräch ist kostenlos. Danach erhalten Sie eine schriftliche Offerte mit Fixpreis, inkl. MWST. Braucht es eine ausführlichere Prüfung, steht auch diese mit Preis in der Offerte. Abos anderer Anbieter und Gebühren pro Nutzung führe ich separat auf."
        },
        {
          "question": "Brauche ich neue Programme?",
          "answer": "Nicht unbedingt. Wenn möglich arbeite ich mit den Programmen, die Sie schon nutzen. Braucht es ein zusätzliches Abo, steht das mit den Kosten in der Offerte."
        },
        {
          "question": "Was ist, wenn sich das nicht lohnt?",
          "answer": "Dann sage ich Ihnen das. Wenn die Betreuung mehr Aufwand macht, als die Automation spart, behalten Sie besser den bisherigen Ablauf."
        },
        {
          "question": "Was passiert, wenn etwas nicht funktioniert?",
          "answer": "Wir legen vorher fest, wer bei einem Fehler benachrichtigt wird und wie Sie in der Zwischenzeit weiterarbeiten. Betreuung und Wartung vereinbaren wir nach Ihrem Bedarf."
        },
        {
          "question": "Was geschieht mit meinen Daten?",
          "answer": "Wir klären vor dem Start, welche Angaben verarbeitet werden, wer Zugriff hat und wo sie gespeichert sind. Ich nutze nur die Zugänge, die Sie mir dafür geben."
        },
        {
          "question": "Was erhalte ich am Ende?",
          "answer": "Eine eingerichtete und getestete Automation, eine kurze Anleitung in einfachen Worten und eine Übersicht, wer was betreut."
        }
      ]
    }
  },
  work: {
    "eyebrow": "Arbeiten",
    "title": "So könnte Ihre Website aussehen.",
    "intro": "Diese vier Websites habe ich für erfundene Betriebe gebaut. Klicken Sie sich durch und probieren Sie aus, wie Kunden ein Angebot finden und eine Anfrage vorbereiten.",
    "conceptLabel": "Fiktives Beispielprojekt",
    "projectInfoLabel": "Zum Projekt",
    "categoryLabel": "Bereich",
    "yearLabel": "Jahr",
    "typeLabel": "Projektart",
    "challengeLabel": "Die Aufgabe",
    "approachLabel": "Gestaltung und Aufbau",
    "outcomeLabel": "Das können Besucher ausprobieren",
    "ctaLabel": "Ihre Website besprechen"
  },
  about: {
    "eyebrow": "Über mich",
    "title": "Sie sprechen immer direkt mit mir.",
    "intro": "Ich bin Silvan Hahn und arbeite selbständig in Boppelsen bei Zürich. Ich erstelle Websites, richte Google-Unternehmensprofile ein, liefere NFC- und QR-Karten und baue Automationen. Für kleine Betriebe in der ganzen Schweiz.",
    "body": [
      "Sie arbeiten direkt mit mir, von der Planung bis zur Umsetzung. Ich gestalte Websites und digitale Lösungen so, dass Ihre Kunden wichtige Informationen finden und Sie im Alltag damit arbeiten können.",
      "Wir können uns per E-Mail, Telefon oder Videogespräch austauschen. Persönliche Treffen vereinbaren wir gemeinsam."
    ],
    "valuesTitle": "So arbeite ich",
    "values": [
      {
        "title": "Verständlich",
        "description": "Ich erkläre Ziele, Umfang und Entscheidungen so, dass Sie wissen, was wir planen und warum."
      },
      {
        "title": "Persönlich",
        "description": "Ihr Ansprechpartner plant, gestaltet und entwickelt Ihr Projekt selbst."
      },
      {
        "title": "Alltagstauglich",
        "description": "Die Lösung richtet sich nach dem, was Ihr Betrieb braucht und im Alltag nutzen kann."
      }
    ],
    "standardsTitle": "Worauf ich bei Ihrem Projekt achte",
    "standards": [
      "Ihre Kunden sollen wichtige Informationen schnell finden. Ich prüfe die Ladezeiten und vermeide unnötig aufwendige Seiten.",
      "Gut lesbare Texte, klare Kontraste und verständliche Hinweise erleichtern die Bedienung. Ich prüfe auch, ob sich die Website mit der Tastatur nutzen lässt.",
      "Auf dem Handy sind Texte gut lesbar und wichtige Funktionen einfach zu bedienen.",
      "Bei Änderungen prüfe ich wichtige Wege, etwa vom Angebot zum Kontakt, erneut. Automatisierte Prüfungen helfen, Fehler früh zu erkennen."
    ],
    "portraitAlt": "Porträt von Silvan Hahn in einem Innenraum",
    "portraitCaption": "Silvan Hahn in Boppelsen bei Zürich"
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Besprechen wir, was Sie brauchen.",
    intro: "Das Erstgespräch ist kostenlos und unverbindlich. Ich antworte innert 24 Stunden.",
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
    navLabel: "Seitenübersicht",
    legalNavLabel: "Rechtliches",
    contactTitle: "Direkt erreichbar",
    rights: "Alle Rechte vorbehalten.",
    legal: [
      { label: "Impressum", href: "/imprint" },
      { label: "Datenschutz", href: "/privacy" },
    ],
  },
  hello: {
    "eyebrow": "SILVAN Digital Studio · Boppelsen bei Zürich",
    "title": "Hallo, ich bin Silvan.",
    "intro": "Ich helfe kleinen Betrieben in der ganzen Schweiz: mit Websites, dem Google-Unternehmensprofil, NFC- und QR-Karten und Automationen. Antwort innert 24 Stunden, Erstgespräch kostenlos.",
    "links": [
      {
        "label": "Websites",
        "href": "/websites"
      },
      {
        "label": "NFC- und QR-Karten",
        "href": "/reviews"
      },
      {
        "label": "Google-Unternehmensprofil",
        "href": "/presence"
      },
      {
        "label": "Automationen",
        "href": "/automation"
      },
      {
        "label": "Beispiele zum Ausprobieren",
        "href": "/work"
      },
      {
        "label": "Über mich",
        "href": "/about"
      },
      {
        "label": "Kontakt",
        "href": "/contact"
      }
    ],
    "directContactTitle": "So erreichen Sie mich"
  },
  imprint: imprintContent.de,
  privacy: privacyContent.de,
  notFound: {
    "eyebrow": "404",
    "title": "Diese Seite wurde nicht gefunden.",
    "description": "Vielleicht ist der Link veraltet oder die Adresse wurde falsch eingegeben. Auf der Startseite finden Sie das Angebot und alle Kontaktwege.",
    "homeLabel": "Zur Startseite"
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
    home: {"title":"Websites, Google-Profil, NFC-Karten und Automationen | SILVAN","description":"Mehr Kunden, weniger Büroarbeit: Websites, Google-Unternehmensprofil, NFC- und QR-Karten und Automationen für kleine Betriebe. Fixpreis, Antwort innert 24 Stunden."},
    websites: {"title":"Website erstellen lassen | ab CHF 300 | SILVAN","description":"Eine Website passend zu Ihrem Betrieb, gut lesbar auf Handy und Computer. Ab CHF 300. Leistungen und Preis vorab in einer schriftlichen Offerte."},
    reviews: {"title":"NFC-Karten und QR-Codes für Unternehmen | SILVAN","description":"Für Bewertungen, Speisekarten und Buchungen. NFC-Kompaktkarten ab CHF 29, Klebechips ab CHF 15, Standardkarten und Aufsteller ab CHF 49. Linkeinrichtung inklusive."},
    presence: {"title":"Google-Unternehmensprofil einrichten | ab CHF 249","description":"Kunden finden Ihre Öffnungszeiten, Adresse und Leistungen auf Google und Google Maps. Prüfung und Einrichtung ab CHF 249. Das Google-Profil selbst ist kostenlos."},
    automation: {"title":"Automationen für kleine Betriebe | SILVAN","description":"Weniger wiederkehrende Büroarbeit: Anfragen landen von selbst in Ihrer Liste, der Wochenbericht entsteht von selbst. Kostenloses Erstgespräch, Fixpreis in der Offerte."},
    work: {"title":"Website-Beispiele zum Ausprobieren | SILVAN","description":"Vier Beispiel-Websites für fiktive Betriebe: Café, Salon, Veloatelier und Unternehmensgruppe. Ansehen und Anfragen ausprobieren."},
    about: {"title":"Über mich | Silvan Hahn, Boppelsen bei Zürich | SILVAN","description":"Ich bin Silvan Hahn und arbeite selbständig in Boppelsen bei Zürich. Websites, Google-Unternehmensprofile, NFC- und QR-Karten und Automationen für kleine Betriebe."},
    contact: {"title":"Kontakt | Kostenloses Erstgespräch | SILVAN","description":"Rufen Sie an oder schreiben Sie mir. Das Erstgespräch ist kostenlos, ich antworte innert 24 Stunden. Boppelsen bei Zürich, für Betriebe in der ganzen Schweiz."},
    hello: {"title":"Hallo, ich bin Silvan | SILVAN Digital Studio","description":"Silvan Hahn auf einen Blick: anrufen, Kontakt speichern oder Leistungen ansehen. Websites, Google-Unternehmensprofil, NFC- und QR-Karten, Automationen."},
    imprint: {"title":"Impressum | SILVAN Digital Studio","description":"Anbieter und Kontakt: Silvan Hahn, Boppelsen. Informationen zu Leistungen, Preisen, Anfragen, Beispielprojekten und Urheberrechten."},
    privacy: {"title":"Datenschutz | SILVAN Digital Studio","description":"Wie diese Website und ihre Demos Daten verarbeiten. Informationen zu Kontaktaufnahme, Hosting, gespeicherten Angaben und Website-Messungen."},
  },
} as const satisfies SiteContent;

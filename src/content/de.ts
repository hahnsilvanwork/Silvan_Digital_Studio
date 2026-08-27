import type { SiteContent } from "./types";

export const de = {
  brand: {
    name: "SILVAN",
    descriptor: "Digital Studio",
  },
  navigation: {
    primary: [
      { label: "Websites", href: "/websites" },
      { label: "Google Reviews", href: "/reviews" },
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
        "Ich entwickle digitale Lösungen, die Ihr Unternehmen sichtbar machen und wiederkehrende Arbeit reduzieren.",
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
        title: "Google Reviews",
        description: "NFC-Karten und Aufsteller für einen einfachen Weg zu echtem Feedback.",
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
      "SILVAN ist das unabhängige Digital Studio von Silvan Hahn in der Schweiz. Sie erhalten klare Beratung, sorgfältiges Design und eine verlässliche Umsetzung aus einer Hand.",
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
    eyebrow: "Google Reviews",
    title: "Der direkte Weg von Ihrem Standort zu echtem Feedback.",
    intro:
      "Mit einer programmierten NFC-Karte oder einem Aufsteller öffnen Ihre Kunden Ihre Google-Bewertungsseite mit einer Berührung.",
    priceLabel: "Produkte inklusive Einrichtung",
    products: [
      {
        id: "card",
        name: "NFC Review Card",
        price: "CHF 49",
        description: "Eine Karte inklusive Programmierung und Einrichtung.",
        features: ["NFC-fähig", "Eingerichtet für Ihr Profil", "Sofort einsatzbereit"],
      },
      {
        id: "stand",
        name: "NFC Stand",
        price: "CHF 69",
        description: "Ein sichtbarer Aufsteller für Empfang, Kasse oder Tisch.",
        features: ["NFC-fähig", "Stabiler Aufsteller", "Inklusive Einrichtung"],
      },
      {
        id: "two-cards",
        name: "Zwei NFC Review Cards",
        price: "CHF 80",
        description: "Zwei eingerichtete Karten für mehrere Kontaktpunkte.",
        features: ["Zwei Karten", "Ein Google-Profil", "Inklusive Einrichtung"],
      },
    ],
    quantityDiscount: "Für grössere Mengen ist ein Mengenrabatt verfügbar.",
    processTitle: "Drei einfache Schritte",
    process: [
      { id: "tap", label: "TAP", title: "Berühren", description: "Der Kunde berührt die NFC-Karte oder den Aufsteller mit dem Smartphone." },
      { id: "open", label: "OPEN", title: "Öffnen", description: "Die Google-Bewertungsseite Ihres Unternehmens öffnet sich direkt." },
      { id: "review", label: "REVIEW", title: "Bewerten", description: "Der Kunde hinterlässt freiwillig sein ehrliches Feedback." },
    ],
    ctaLabel: "Unverbindlich anfragen",
    productImageAlt: "NFC Review Card und Aufsteller für Google-Bewertungen",
    inquiry: {
      title: "Review Card anfragen",
      intro: "Senden Sie die Eckdaten direkt per WhatsApp. Ich melde mich persönlich bei Ihnen.",
      fields: [
        { name: "product", label: "Produkt", placeholder: "Produkt wählen", required: true },
        { name: "quantity", label: "Menge", placeholder: "Zum Beispiel 2", required: true },
        { name: "variant", label: "Farbe oder Variante", placeholder: "Gewünschte Variante", required: true },
        { name: "businessName", label: "Unternehmen", placeholder: "Name Ihres Unternehmens", required: true },
        { name: "contactPerson", label: "Kontaktperson", placeholder: "Vor- und Nachname", required: true },
        { name: "googleUrl", label: "Google-Unternehmensprofil oder Bewertungslink", placeholder: "https://…", required: true },
        { name: "street", label: "Strasse", placeholder: "Strasse und Hausnummer", required: true },
        { name: "postalCode", label: "PLZ", placeholder: "8000", required: true },
        { name: "city", label: "Ort", placeholder: "Zürich", required: true },
        { name: "note", label: "Optionale Nachricht", placeholder: "Was sollte ich noch wissen?", required: false },
      ],
      productOptions: { card: "NFC Review Card", stand: "NFC Stand" },
      submitLabel: "Anfrage in WhatsApp öffnen",
      editLabel: "Angaben bearbeiten",
      requiredError: "Bitte füllen Sie dieses Feld aus.",
      quantityError: "Bitte geben Sie eine gültige Menge ab 1 ein.",
      urlError: "Bitte geben Sie einen gültigen Google-Link ein.",
      nonBindingNotice: "Dies ist eine unverbindliche Anfrage. Sie wird erst nach meiner persönlichen Bestätigung verbindlich.",
      privacyNotice: "Ihre Angaben werden nicht auf dieser Website gespeichert, sondern nur in die WhatsApp-Nachricht eingefügt.",
      messageIntro: "Hallo Silvan, ich möchte unverbindlich NFC Review Cards anfragen.",
    },
    faq: {
      title: "Häufige Fragen zu Review Cards",
      items: [
        {
          question: "Wie funktioniert eine NFC Review Card?",
          answer:
            "Ihr Kunde hält sein Smartphone an die Karte oder den Aufsteller. Die Google-Bewertungsseite Ihres Unternehmens öffnet sich direkt – ohne Suche, ohne App und ohne abgetippten Link.",
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
          question: "Brauche ich ein Google-Unternehmensprofil?",
          answer:
            "Ja, die Karte verweist darauf. Falls Sie noch keines haben oder es unvollständig ist, richte ich es unter Online-Präsenz ein.",
        },
        {
          question: "Was kostet es und was ist inbegriffen?",
          answer:
            "Eine Karte kostet CHF 49, ein Aufsteller CHF 69, zwei Karten CHF 80. Die Programmierung und die Einrichtung auf Ihr Google-Profil sind jeweils enthalten. Für grössere Mengen gibt es einen Mengenrabatt.",
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
    challengeLabel: "Aufgabe",
    approachLabel: "Ansatz",
    outcomeLabel: "Beabsichtigtes Ergebnis",
  },
  about: {
    eyebrow: "Über mich",
    title: "Direkte Zusammenarbeit, sorgfältig umgesetzt.",
    intro: "Ich bin Silvan Hahn, unabhängiger Digital Developer in der Schweiz.",
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
    portraitAlt: "Platzhalter für ein zukünftiges Porträt von Silvan Hahn",
    portraitStatus: "Ersetzbarer Bildplatzhalter – kein Foto von Silvan Hahn",
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
      phoneDisplay: "078 900 85 00",
      phoneHref: "tel:+41789008500",
      whatsappNumber: "+41789008500",
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
      { label: "Google Reviews", href: "/reviews" },
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
          "Telefon: 078 900 85 00",
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
  seo: {
    home: { title: "SILVAN Digital Studio | Digitale Lösungen für Schweizer Unternehmen", description: "Websites, Google Reviews, Online-Präsenz und Automation – klar entwickelt für Schweizer Unternehmen." },
    websites: { title: "Websites für Schweizer Unternehmen | SILVAN", description: "Schnelle, klare Business-Websites von CHF 300 bis zum individuellen grossen Projekt." },
    reviews: { title: "NFC Google Review Cards | SILVAN", description: "NFC Review Cards und Aufsteller inklusive Einrichtung ab CHF 49 für einen einfachen Weg zu ehrlichem Kundenfeedback." },
    presence: { title: "Online-Präsenz & Google Business Profile | SILVAN", description: "Google-Unternehmensprofil, konsistente Geschäftsdaten und lokale Sichtbarkeit ab CHF 249." },
    automation: { title: "Praktische Business-Automation | SILVAN", description: "Wiederkehrende E-Mails, Berichte und interne Abläufe sinnvoll automatisieren." },
    work: { title: "Arbeiten & digitale Konzepte | SILVAN", description: "Ausgewählte Website- und Digitalkonzepte von SILVAN Digital Studio." },
    about: { title: "Über Silvan Hahn | SILVAN Digital Studio", description: "Lernen Sie Silvan Hahn kennen, unabhängiger Digital Developer in der Schweiz." },
    contact: { title: "Kontakt | SILVAN Digital Studio", description: "Kontaktieren Sie Silvan Hahn direkt per E-Mail, WhatsApp, Telefon oder LinkedIn." },
    hello: { title: "Hallo, ich bin Silvan | SILVAN Digital Studio", description: "Der direkte Einstieg zu Websites, Google Reviews, Online-Präsenz, Arbeiten und Kontakt." },
    imprint: { title: "Impressum | SILVAN Digital Studio", description: "Verantwortlich für diese Website: Silvan Hahn, Boppelsen. Angaben zu Rechtsform, Kontakt und Urheberrecht." },
    privacy: { title: "Datenschutz | SILVAN Digital Studio", description: "Diese Website setzt keine Cookies und bindet kein Tracking ein. Datenschutzerklärung nach revDSG." },
  },
} as const satisfies SiteContent;

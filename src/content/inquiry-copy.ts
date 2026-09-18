import type { Locale } from "./types";



export const inquiryCopy = {

  de: {

    selectionRestored: "Auswahl wiederhergestellt. Persönliche Angaben, Links und Bemerkungen bitte erneut eingeben.",
    restart: "Neu beginnen",
    draftNotice: "Produktauswahl, Masse, Menge und Ziel-Status werden bei erlaubtem Browserspeicher in diesem Tab gespeichert und nach dem Neuladen bis zu acht Stunden nach der letzten Speicherung wiederhergestellt. Persönliche Angaben, Links und Bemerkungen werden dabei nicht wiederhergestellt. Beim Sprachwechsel wird die Anfrage für höchstens zwei Minuten zwischengespeichert und nach der Übernahme gelöscht. Ohne Ihre gewählte Übergabe wird nichts an uns gesendet.",

    suggestions: "Passende Modelle", matches: "Modelle passen zu Ihrer Auswahl. Übernehmen Sie eines oder fahren Sie mit einer individuellen Anfrage fort.",

    noMatches: "Für diese Kombination gibt es aktuell kein fertiges Katalogmodell. Sie können die Auswahl ändern oder Ihr Wunschprodukt individuell anfragen.",

    chooseModel: "Dieses Modell übernehmen", allMatches: "Alle passenden Modelle zeigen",

    review: "Angaben prüfen", email: "Per E-Mail anfragen", copy: "Anfrage kopieren",

    copied: "Anfrage kopiert. Sie können sie jetzt in eine Nachricht einfügen.",

    copyFailed: "Kopieren ist hier nicht möglich. Markieren und kopieren Sie den Text unten.",

    text: "Text Ihrer Anfrage", model: "Gewähltes Modell", requestModel: "Dieses Modell anfragen",

    selected: "Diese Angaben stammen aus dem gewählten Modell. Die verfügbaren Masse bestätigen wir in der Offerte.",

    remaining: "Modell gewählt. Ergänzen Sie die noch offenen Angaben – danach prüfen Sie Ihre unverbindliche Anfrage.",

    modelDetails: "Modelldetails ansehen",

    adjustSelection: "Auswahl anpassen",

    modelPriceHint: "Für 1 Stück. Versand separat; Gesamtpreis gemäss Offerte.",

    chipPriceHint: "Für den ersten Chip. Den Mengenpreis sehen Sie bei der Menge; Versand separat.",

    lengthError: "Bitte kürzen Sie die Eingabe auf die angezeigte Zeichenanzahl.",

    characters: "Zeichen", optional: "optional",

    quantityHint: "Anzahl Stück, kein Paket. Grundkosten werden unten berechnet.",

    bundleHint: "Anzahl Zweierpakete: 1 Paket enthält 2 Karten. Der Paketpreis beträgt CHF 80.–.",

    external3d: "Mit Ihrem Klick laden Spline und Google die 3D-Dateien und erhalten Ihre IP-Adresse (Bearbeitung in den USA möglich). Die Anfrage funktioniert auch ohne 3D. Details unter Datenschutz.",

    transfer: "Beim Öffnen von WhatsApp wird der Anfragetext an WhatsApp übergeben. E-Mail öffnet Ihr Mailprogramm. Sie senden die Nachricht dort selbst ab.",

    subject: "Unverbindliche NFC & QR Anfrage", details: "Anwendungen und Ablauf", packages: "Pakete vergleichen",

  },

  en: {

    selectionRestored: "Selection restored. Please re-enter personal details, links and notes.",
    restart: "Start again",
    draftNotice: "With browser storage available, product choices, dimensions, quantity and destination status are saved in this tab and restored after a reload for up to eight hours after the last save. Personal details, links and notes are not restored. When changing language, the enquiry is held for up to two minutes and deleted after transfer. Nothing is sent to us until you choose to pass it on.",

    suggestions: "Matching models", matches: "models match your selection. Choose one or continue with an individual enquiry.",

    noMatches: "There is no ready-made catalogue model for this combination. Change your selection or continue with an individual enquiry.",

    chooseModel: "Choose this model", allMatches: "Show all matching models",

    review: "Review details", email: "Enquire by email", copy: "Copy enquiry",

    copied: "Enquiry copied. You can now paste it into a message.",

    copyFailed: "Copying is unavailable here. Select and copy the text below.",

    text: "Your enquiry text", model: "Selected model", requestModel: "Enquire about this model",

    selected: "These details come from your selected model. We confirm available dimensions in the quote.",

    remaining: "Model selected. Complete the remaining details, then review your non-binding enquiry.",

    modelDetails: "View model details",

    adjustSelection: "Adjust selection",

    modelPriceHint: "For 1 item. Shipping is separate; final total in the quote.",

    chipPriceHint: "For the first chip. Quantity pricing appears beside the quantity; shipping is separate.",

    lengthError: "Please shorten this entry to the displayed character limit.",

    characters: "characters", optional: "optional",

    quantityHint: "Number of individual items, not packs. Base cost is calculated below.",

    bundleHint: "Number of two-card packs: 1 pack contains 2 cards. Each pack costs CHF 80.–.",

    external3d: "Your click loads 3D files from Spline and Google and shares your IP address (processing in the USA is possible). Enquiries work without 3D. See Privacy for details.",

    transfer: "Opening WhatsApp passes the enquiry text to WhatsApp. Email opens your mail app. You send the message yourself there.",

    subject: "Non-binding NFC & QR enquiry", details: "Applications and process", packages: "Compare packages",

  },

} satisfies Record<Locale, Record<string, string>>;

import type { Locale } from "./types";

export const inquiryCopy = {
  de: {
    review: "Angaben prüfen", email: "Per E-Mail anfragen", copy: "Anfrage kopieren",
    copied: "Anfrage kopiert. Sie können sie jetzt in eine Nachricht einfügen.",
    copyFailed: "Kopieren ist hier nicht möglich. Markieren und kopieren Sie den Text unten.",
    text: "Text Ihrer Anfrage", model: "Gewähltes Modell", requestModel: "Dieses Modell anfragen",
    selected: "Modell übernommen. Prüfen Sie die Auswahl und ergänzen Sie die Grösse, falls nötig.",
    lengthError: "Bitte kürzen Sie die Eingabe auf die angezeigte Zeichenanzahl.",
    characters: "Zeichen", optional: "optional",
    quantityHint: "1–999 Stück. Für grössere Mengen nutzen Sie das Nachrichtenfeld oder kontaktieren Sie mich direkt.",
    bundleHint: "Anzahl Zweierpakete: 1 Paket enthält 2 Karten. Der Paketpreis beträgt CHF 80.–.",
    external3d: "3D lädt Inhalte des externen Anbieters Spline erst nach Ihrem Klick.",
    transfer: "Beim Öffnen von WhatsApp wird der Anfragetext an WhatsApp übergeben. E-Mail öffnet Ihr Mailprogramm. Sie senden die Nachricht dort selbst ab.",
    subject: "Unverbindliche NFC & QR Anfrage", details: "Anwendungen und Ablauf", packages: "Pakete vergleichen",
  },
  en: {
    review: "Review details", email: "Enquire by email", copy: "Copy enquiry",
    copied: "Enquiry copied. You can now paste it into a message.",
    copyFailed: "Copying is unavailable here. Select and copy the text below.",
    text: "Your enquiry text", model: "Selected model", requestModel: "Enquire about this model",
    selected: "Model selected. Review your choices and add a size if needed.",
    lengthError: "Please shorten this entry to the displayed character limit.",
    characters: "characters", optional: "optional",
    quantityHint: "1–999 items. For larger quantities, use the message field or contact me directly.",
    bundleHint: "Number of two-card packs: 1 pack contains 2 cards. Each pack costs CHF 80.–.",
    external3d: "3D loads content from the external provider Spline only after you click.",
    transfer: "Opening WhatsApp passes the enquiry text to WhatsApp. Email opens your mail app. You send the message yourself there.",
    subject: "Non-binding NFC & QR enquiry", details: "Applications and process", packages: "Compare packages",
  },
} satisfies Record<Locale, Record<string, string>>;

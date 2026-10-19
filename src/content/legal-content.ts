import type { LegalContent, Locale } from "./types";
import { measurementCopy } from "./measurement-copy";

// Account-specific evidence and contract drafts belong in docs/legal, never in public placeholders.
export const imprintContent: Record<Locale, LegalContent> = {
  "de": {
    "eyebrow": "Impressum",
    "title": "Wer hinter dieser Website steht.",
    "intro": "Kontaktangaben und wichtige Hinweise zum Angebot von SILVAN Digital Studio.",
    "updatedLabel": "Stand",
    "updated": "2. Oktober 2026",
    "sections": [
      {
        "title": "Anbieter und Kontakt",
        "body": [
          "Silvan Hahn · SILVAN Digital Studio",
          "Regensbergstrasse 23",
          "8113 Boppelsen, Schweiz",
          "E-Mail: hahn.silvan.work@gmail.com",
          "Telefon: +41 78 900 85 00",
          "SILVAN Digital Studio ist die Geschäftsbezeichnung, unter der Silvan Hahn die hier beschriebenen Leistungen anbietet."
        ]
      },
      {
        "title": "Anfragen und Aufträge",
        "body": [
          "Diese Website stellt Leistungen und Produkte vor. Sie können hier keine kostenpflichtige Bestellung abschliessen. Eine Produktauswahl, das Öffnen eines Kontaktlinks oder eine versendete Anfrage ist noch kein Auftrag.",
          "Eine individuelle Offerte hält Leistungsumfang, Gesamtpreis, mögliche Versandkosten, laufende Kosten, Termine und weitere Vertragsbedingungen fest. Ein Auftrag entsteht, wenn beide Seiten das vereinbarte Angebot übereinstimmend annehmen. Änderungen und zusätzliche Leistungen müssen ebenfalls vereinbart werden."
        ]
      },
      {
        "title": "Preise und enthaltene Leistungen",
        "body": [
          "Alle Preise sind in Schweizer Franken (CHF) angegeben. Die Preisstufen gelten für den jeweils beschriebenen Umfang. Zusätzliche Leistungen werden separat offeriert. Die genannten Beträge enthalten allfällige gesetzlich geschuldete Abgaben. Versandkosten für physische Produkte hängen vom Lieferort und vom Umfang der Bestellung ab. Sie werden vor der Bestellung separat ausgewiesen.",
          "Domain, Hosting, externe Abonnements und laufende Wartung sind nur enthalten, wenn dies ausdrücklich angegeben oder in der Offerte vereinbart ist. NFC-Produkte enthalten die jeweils beschriebene Einrichtung. Eine neue Website als Ziel des Links oder ein kostenpflichtiger Buchungsdienst sind nicht automatisch inbegriffen."
        ]
      },
      {
        "title": "Beispielprojekte und Demos",
        "body": [
          "Falkenried, Café & Konditorei Vogel, Spurwerk Veloatelier und Salon Lumière sind selbst entwickelte Beispielprojekte für fiktive Unternehmen. Sie zeigen Gestaltung und Funktionen. Sie belegen keine Kundenbeziehung, Kundenempfehlung oder Geschäftsergebnisse.",
          "Die Demoformulare sind nur zum Ausprobieren mit Testdaten gedacht. Sie nehmen keine Bestellungen, Reservationen oder tatsächlichen Projektanfragen entgegen. Für Anfragen an Silvan Hahn nutzen Sie die Kontaktwege dieser Website."
        ]
      },
      {
        "title": "Bewertungen und Marken",
        "body": [
          "NFC- und QR-Produkte erleichtern den Zugang zu einer verlinkten Seite. Damit kaufen Sie keine Bewertungen und keine bestimmte Sternezahl. Bewertungen müssen auf echten Erfahrungen beruhen und frei abgegeben werden. Gegenleistungen für Bewertungen und das gezielte Ausfiltern unzufriedener Kunden gehören nicht zum Angebot.",
          "Genannte Marken gehören den jeweiligen Rechteinhabern. Hinweise auf Google, WhatsApp und andere Dienste beschreiben die vorgesehene Nutzung. Sie bedeuten keine Partnerschaft oder Zertifizierung durch diese Anbieter."
        ]
      },
      {
        "title": "Inhalte, externe Angebote und Rechte",
        "body": [
          "Die Inhalte werden sorgfältig erstellt. Offensichtliche Fehler können berichtigt werden. Gesetzliche Rechte und verbindlich vereinbarte Leistungen bleiben davon unberührt. Externe Anbieter sind für ihre eigenen Angebote verantwortlich und können Funktionen und Bedingungen ändern.",
          "Eigene Texte, Gestaltungen und Bilder sind im gesetzlich vorgesehenen Umfang geschützt. Für Inhalte Dritter gelten die Rechte und Lizenzen ihrer jeweiligen Rechteinhaber. Gesetzlich erlaubte Nutzungen bleiben zulässig. Nutzungsrechte an Kundenprojekten werden im jeweiligen Auftrag vereinbart."
        ]
      }
    ]
  },
  "en": {
    "eyebrow": "Legal notice",
    "title": "Who is behind this website.",
    "intro": "Contact details and important information about the services and products offered by SILVAN Digital Studio.",
    "updatedLabel": "Updated",
    "updated": "2 October 2026",
    "sections": [
      {
        "title": "Provider and contact details",
        "body": [
          "Silvan Hahn · SILVAN Digital Studio",
          "Regensbergstrasse 23",
          "8113 Boppelsen, Switzerland",
          "Email: hahn.silvan.work@gmail.com",
          "Phone: +41 78 900 85 00",
          "SILVAN Digital Studio is the trading name under which Silvan Hahn offers the services described here."
        ]
      },
      {
        "title": "Enquiries and orders",
        "body": [
          "This website presents services and products. You cannot complete a paid order here. Choosing a product, opening a contact link or sending an enquiry does not place an order.",
          "An individual quote sets out the scope, total price, any shipping and recurring costs, schedule and other contractual terms. A contract is formed when both parties accept the agreed offer. Changes and additional services also require agreement."
        ]
      },
      {
        "title": "Prices and included services",
        "body": [
          "All prices are in Swiss francs (CHF). Each price tier covers the work described. Additional services are quoted separately. The amounts shown include any legally applicable charges. Shipping costs for physical products depend on the destination and order size. They are stated separately before you order.",
          "Domain, hosting, external subscriptions and ongoing maintenance are included only where expressly stated or agreed in the quote. NFC products include the setup described for each product. A new website for the link to open, or a paid booking service, is not automatically included."
        ]
      },
      {
        "title": "Example projects and demos",
        "body": [
          "Falkenried, Café & Konditorei Vogel, Spurwerk Veloatelier and Salon Lumière are self-initiated example projects for fictional businesses. They demonstrate design and functionality. They do not represent client relationships, endorsements or business results.",
          "Demo forms are only for trying out the website with test data. They do not accept orders, reservations or actual project enquiries. To contact Silvan Hahn, use this website's contact channels."
        ]
      },
      {
        "title": "Reviews and trademarks",
        "body": [
          "NFC and QR products make a linked page easier to reach. They do not buy reviews or a particular star rating. Reviews must reflect real experiences and be freely given. Incentives for reviews and deliberately filtering out dissatisfied customers are not part of the offer.",
          "Trademarks belong to their respective owners. References to Google, WhatsApp and other services describe their intended use. They do not imply a partnership or certification by those providers."
        ]
      },
      {
        "title": "Content, external services and rights",
        "body": [
          "Content is prepared with care. Obvious errors may be corrected. Statutory rights and binding contractual commitments remain unaffected. External providers are responsible for their own services and may change their features and terms.",
          "Original text, design and images are protected to the extent provided by law. Third-party material remains subject to its owners' rights and licences. Uses permitted by law remain permitted. Rights in client projects are agreed in each individual contract."
        ]
      }
    ]
  }
};

export const privacyContent: Record<Locale, LegalContent> = {
  "de": {
    "eyebrow": "Datenschutz",
    "title": "Wie Ihre Daten bearbeitet werden.",
    "intro": "Diese Erklärung informiert nach dem Schweizer Datenschutzgesetz (DSG) über diese Website, ihre Konzept-Demos und die Kontaktaufnahme mit SILVAN Digital Studio.",
    "updatedLabel": "Stand",
    "updated": "2. Oktober 2026",
    "sections": [
      {
        "title": "Verantwortlicher und Geltungsbereich",
        "body": [
          "Verantwortlich ist Silvan Hahn, Regensbergstrasse 23, 8113 Boppelsen, Schweiz. Für Datenschutzanliegen schreiben Sie an hahn.silvan.work@gmail.com.",
          "Diese Erklärung gilt für silvandigital.ch und die hier verlinkten SILVAN-Konzept-Demos Falkenried, Café & Konditorei Vogel und Salon Lumière auf ihren Vercel-Adressen. Für die separat betriebene Spurwerk-Demo gelten die dort veröffentlichten Datenschutzhinweise. Für später vereinbarte Kundenprojekte können zusätzliche Informationen zum jeweiligen Projekt erforderlich sein."
        ],
        "links": [{ "label": "Datenschutz der Spurwerk-Demo", "href": "https://silvan-demo-spurwerk.vercel.app/datenschutz/" }]
      },
      {
        "title": "Wofür Daten benötigt werden",
        "body": [
          "Daten werden bearbeitet, um die Website sicher bereitzustellen, Anfragen zu beantworten, Offerten zu erstellen, vereinbarte Leistungen zu erbringen und gesetzliche Pflichten zu erfüllen. Sie können die Website ansehen, ohne eine Anfrage zu stellen. Fehlen notwendige Kontakt- oder Projektangaben, kann eine gewünschte Offerte oder Leistung unter Umständen nicht erstellt werden.",
          "Die Website hat keine Benutzerkonten, keine Kommentarfunktion und keine Kundendatenbank. Sie trifft keine automatisierten Entscheidungen mit rechtlicher Wirkung über Sie. Bitte senden Sie über die allgemeinen Kontaktwege keine Passwörter, Ausweiskopien, Gesundheitsdaten oder anderen vertraulichen Kundendaten."
        ]
      },
      {
        "title": "Hosting und technische Zugriffsdaten",
        "body": [
          "Vercel Inc., USA, stellt die Website und Demos über ein Verteilnetz bereit. Bei einem Besuch werden insbesondere Ihre IP-Adresse, der Zeitpunkt, die aufgerufene Adresse und technische Angaben zu Browser und Gerät verarbeitet. Gegebenenfalls wird auch erfasst, von welcher Website Sie kommen. Diese Angaben dienen der Bereitstellung, Fehlersuche und Abwehr missbräuchlicher Zugriffe.",
          "Daten können dabei in den USA bearbeitet werden. Vercel beschreibt in seinen Anbieterinformationen seine internationale Infrastruktur und die Teilnahme am Swiss-U.S. Data Privacy Framework. Welche Bearbeitung konkret stattfindet, hängt zusätzlich vom genutzten Dienst und dessen Vertragsbedingungen ab."
        ],
        "links": [
          {
            "label": "Datenschutzhinweise von Vercel",
            "href": "https://vercel.com/legal/privacy-notice"
          }
        ]
      },
      {
        "title": "Cookies, Speicherung im Browser und Schriften",
        "body": [
          "Die eigene Website verwendet keine Cookies für Werbung oder persönliche Profile. Sie speichert keine Anfragetexte im dauerhaften Browserspeicher (localStorage). Nicht persönliche NFC-Auswahlen werden automatisch im vorübergehenden Speicher desselben Tabs (sessionStorage) abgelegt: Modell, Anwendung, Produkttyp, Form, Grösse, Menge und Einrichtungsstatus. Nach dem Neuladen können sie wiederhergestellt werden, wenn die letzte Speicherung höchstens acht Stunden zurückliegt und dasselbe Modell ausgewählt ist. Links und Freitext werden dabei nicht automatisch gespeichert. «Neue Anfrage beginnen» setzt die Auswahl zurück. Wenn Sie im selben Tab bewusst die Sprache wechseln, wird zusätzlich der NFC-Anfrageentwurf einmalig zur Übergabe in sessionStorage gespeichert. Er ist höchstens zwei Minuten gültig und wird beim nächsten Übernahmeversuch gelöscht. Nicht übernommene Daten werden beim Schliessen des Tabs gelöscht. Abgesehen von den genannten Auswahlwerten werden Anfrageinhalte nicht automatisch gespeichert. Ohne aktivierte optionale Dienste setzt die eigene Anwendung keine Cookies. Schriften und reguläre Produktbilder werden von dieser Website geladen; es wird keine Verbindung zu Google Fonts aufgebaut.",
          "Andere Anbieterwebsites öffnen sich erst, wenn Sie einen externen Link auswählen. Dort gelten deren eigene Speicher- und Cookie-Einstellungen. Die optionale 3D-Ansicht wird in einem eigenen Abschnitt beschrieben."
        ]
      },
      {
        "title": "Messung von Nutzung und Ladezeiten",
        "body": measurementCopy.de,
        "links": [
          {
            "label": "Vercel Analytics: Datenschutz",
            "href": "https://vercel.com/docs/analytics/privacy-policy"
          }
        ]
      },
      {
        "title": "NFC-/QR-Anfragen und Zwischenablage",
        "body": [
          "Ihre Produktauswahl und die eingegebenen Angaben werden zunächst in Ihrem Browser-Tab zusammengefasst. Nicht persönliche NFC-Auswahlen werden wie oben beschrieben für die Sitzung gespeichert. Optionale Projektbeschreibungen auf der Kontaktseite bleiben im Arbeitsspeicher und werden nicht automatisch gespeichert. Kein Formular sendet Angaben an einen eigenen Website-Server. Öffentliche Produktkennungen in Links enthalten keine persönlichen Anfrageangaben.",
          "Wenn Sie einen vorbereiteten WhatsApp-Link öffnen, wird der Anfragetext bereits als Teil der Linkadresse an WhatsApp übergeben. Erst wenn Sie die Nachricht in WhatsApp absenden, wird sie an mich geschickt. Ein vorbereiteter E-Mail-Link übergibt den Inhalt an Ihr Mailprogramm. Beim Kopieren wird der Text in der Zwischenablage Ihres Geräts abgelegt. Wie diese verwaltet oder synchronisiert wird, hängt von Ihrem Gerät ab. Sie können den Text vor dem Versand ändern.",
          "Abgesehen von den beschriebenen Auswahlwerten und der Sprachübergabe gehen eingegebene Anfrageinhalte beim Neuladen verloren. Browser können den Seitenzustand vorübergehend für die Zurück- und Vorwärtsnavigation erhalten. Auf diesem Website-Server werden keine Anfrageentwürfe gespeichert."
        ]
      },
      {
        "title": "Optionale 3D-Produktansicht",
        "body": [
          "Erst wenn Sie «In 3D ansehen» auswählen, lädt Ihr Browser die Software für die Ansicht und die ausgewählte Modelldatei. Beide werden von dieser Website bereitgestellt. Die aktuellen Katalogmodelle bauen keine Verbindung zu Spline oder Google auf.",
          "Drehen und Vergrössern erfolgen auf Ihrem Gerät im Browser. Die 3D-Ansicht übermittelt keine Anfragefelder. Sie können Produktbilder ansehen und eine Anfrage vorbereiten, ohne die 3D-Ansicht zu öffnen. Beim Schliessen werden die Darstellung und die dafür verwendeten Grafikressourcen freigegeben."
        ]
      },
      {
        "title": "E-Mail, Telefon, WhatsApp und LinkedIn",
        "body": [
          "Wenn Sie Kontakt aufnehmen, werden beispielsweise Name, Kontaktdaten, Unternehmen, Nachrichten und Angaben zu vereinbarten Leistungen bearbeitet. Das veröffentlichte E-Mail-Postfach nutzt Gmail von Google. Google bearbeitet Nachrichten und technische Daten nach den Bedingungen dieses Dienstes. Google hat Gesellschaften in Irland und den USA; Daten können in diesen Staaten bearbeitet werden.",
          "Für WhatsApp-Nutzer in der europäischen Region ist WhatsApp Ireland Limited in Irland zuständig. Der Dienst nutzt auch Infrastruktur und verbundene Unternehmen in den USA. Für LinkedIn-Nutzer in der Schweiz ist LinkedIn Ireland Unlimited Company in Irland zuständig. Auch dort ist eine Bearbeitung in den USA möglich. Diese Anbieter bearbeiten Daten nach ihren jeweiligen Bedingungen auch für eigene Zwecke.",
          "Sie können E-Mail oder Telefon nutzen, wenn Sie WhatsApp oder LinkedIn nicht verwenden möchten. Eine Kontaktaufnahme erlaubt die Bearbeitung Ihrer Anfrage. Sie ist keine pauschale Einwilligung in Werbenachrichten."
        ],
        "links": [
          {
            "label": "Google: Datenschutzerklärung",
            "href": "https://policies.google.com/privacy?hl=de"
          },
          {
            "label": "WhatsApp: Datenschutz in der europäischen Region",
            "href": "https://www.whatsapp.com/legal/privacy-policy-eea"
          },
          {
            "label": "LinkedIn: Datenschutz",
            "href": "https://www.linkedin.com/legal/privacy-policy"
          }
        ]
      },
      {
        "title": "Wer Daten erhält und wo sie bearbeitet werden",
        "body": [
          "Daten erhalten die jeweils genutzten Anbieter für Hosting, Kommunikation und optionale Ansichten. Soweit im Einzelfall erforderlich, können sie auch an beauftragte Dienstleister oder gesetzlich zuständige Stellen gehen. Die genannten Dienste haben insbesondere Bezüge zur Schweiz, zu Irland und zu den USA. Ihre Anbieterinformationen nennen weitere eingesetzte Gesellschaften und Unterauftragnehmer.",
          "Im Ausland können andere Datenschutzregeln gelten. Auch behördliche Zugriffsmöglichkeiten können sich unterscheiden. Welche Schutzvoraussetzungen nötig sind, hängt vom Empfänger und vom Datenfluss ab. Das kann ein angemessenes Schutzniveau, eine anwendbare Zertifizierung, vertragliche Garantien oder eine gesetzliche Ausnahme betreffen. Dass ein Dienst erreichbar ist oder Sie einen Link auswählen, garantiert kein bestimmtes Datenschutzniveau. Fragen zu einem konkreten Kontaktkanal können Sie an die oben genannte Adresse richten."
        ]
      },
      {
        "title": "Aufbewahrung und Löschung",
        "body": [
          "Kontakt- und Projektdaten werden so lange aufbewahrt, wie dies für die Anfrage, den Vertrag, gesetzliche Pflichten oder rechtliche Ansprüche erforderlich ist. Für Geschäftsbücher und Buchungsbelege gilt grundsätzlich eine gesetzliche Aufbewahrungsfrist von zehn Jahren ab Ende des Geschäftsjahres. Das bedeutet nicht, dass jede Anfrage zehn Jahre gespeichert werden muss.",
          "Nicht mehr benötigte Daten werden gelöscht oder anonymisiert, soweit keine Aufbewahrungspflicht oder notwendige Beweissicherung dagegensteht. Für technische Protokolle und Daten, die externe Anbieter für eigene Zwecke bearbeiten, gelten zusätzlich deren Aufbewahrungsregeln."
        ]
      },
      {
        "title": "Ihre Rechte",
        "body": [
          "Im gesetzlichen Umfang können Sie Auskunft, Berichtigung und Löschung Ihrer Daten verlangen. Gegebenenfalls können Sie auch deren Herausgabe oder Übertragung verlangen. Sie können eine Einwilligung für die Zukunft widerrufen und einer Bearbeitung widersprechen. Gesetzliche Pflichten, überwiegende Interessen und Rechte Dritter können diese Ansprüche begrenzen.",
          "Schreiben Sie Ihr Anliegen an hahn.silvan.work@gmail.com. Damit die Anfrage sicher zugeordnet werden kann, ist möglicherweise ein angemessener Identitätsnachweis nötig. Auskunft wird grundsätzlich innerhalb von 30 Tagen erteilt. Über eine begründete Verzögerung werden Sie informiert. Sie können sich auch an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) wenden."
        ],
        "links": [
          {
            "label": "EDÖB: Datenschutz und Rechte",
            "href": "https://www.edoeb.admin.ch/de/datenschutz"
          }
        ]
      },
      {
        "title": "Datensicherheit und Änderungen",
        "body": [
          "HTTPS schützt die Verbindung zwischen Ihrem Browser und dieser Website. Technische und organisatorische Massnahmen sollen unbefugte Zugriffe und unbeabsichtigte Offenlegungen begrenzen. Absolute Sicherheit kann kein Online-Dienst gewährleisten.",
          "Diese Erklärung wird angepasst, wenn sich die eingesetzten Dienste oder die Datenbearbeitung ändern. Das angegebene Datum bezeichnet den jeweiligen Stand. Neue Zwecke können zusätzliche Informationen erforderlich machen."
        ]
      }
    ]
  },
  "en": {
    "eyebrow": "Privacy",
    "title": "How your personal data is processed.",
    "intro": "This statement explains how data is processed under the Swiss Federal Act on Data Protection (FADP) when you visit this website and its concept demos, or contact SILVAN Digital Studio.",
    "updatedLabel": "Updated",
    "updated": "2 October 2026",
    "sections": [
      {
        "title": "Who is responsible and what this statement covers",
        "body": [
          "The controller is Silvan Hahn, Regensbergstrasse 23, 8113 Boppelsen, Switzerland. For privacy enquiries, email hahn.silvan.work@gmail.com.",
          "This statement covers silvandigital.ch and the linked SILVAN concept demos Falkenried, Café & Konditorei Vogel and Salon Lumière on their Vercel addresses. The separately hosted Spurwerk demo has its own published privacy information. Agreed client projects may require additional information specific to the project."
        ],
        "links": [{ "label": "Spurwerk demo privacy information (German)", "href": "https://silvan-demo-spurwerk.vercel.app/datenschutz/" }]
      },
      {
        "title": "Why data is needed",
        "body": [
          "Data is processed to provide the website securely, answer enquiries, prepare quotes, carry out agreed services and meet legal obligations. You can browse without making an enquiry. Without the necessary contact or project details, a requested quote or service may not be possible.",
          "The website has no user accounts, comments or customer database. It does not make automated decisions with legal effects about you. Please do not send passwords, identity documents, health information or other confidential client data through general contact channels."
        ]
      },
      {
        "title": "Hosting and technical access data",
        "body": [
          "Vercel Inc., USA, provides the website and demos through a distribution network. A visit involves processing information such as your IP address, the time, the address you request and technical details about your browser and device. Where applicable, this includes the website you came from. These details help provide the website, find faults and prevent misuse.",
          "Data may be processed in the USA. Vercel describes its international infrastructure and participation in the Swiss-U.S. Data Privacy Framework in its provider information. The processing also depends on the service used and its contractual terms."
        ],
        "links": [
          {
            "label": "Vercel privacy notice",
            "href": "https://vercel.com/legal/privacy-notice"
          }
        ]
      },
      {
        "title": "Cookies, browser storage and fonts",
        "body": [
          "The website itself uses no cookies for advertising or profiling. It does not save enquiry text in persistent browser storage (localStorage). Non-personal NFC selections are automatically saved in temporary storage in the same tab (sessionStorage): model, destination type, product type, shape, size, quantity and setup status. They can be restored after a reload if the last save was no more than eight hours ago and the same model is selected. Links and free text are not autosaved. “Start a new enquiry” resets the selections. If you deliberately switch language in the same tab, the NFC enquiry draft is also saved once in sessionStorage for transfer. It is valid for at most two minutes and deleted on the next transfer attempt. Data that has not been transferred is deleted when the tab closes. Apart from the selections listed above, enquiry content is not autosaved. Without optional services being activated, the application itself sets no cookies. Fonts and regular product images are served by this website, without a connection to Google Fonts.",
          "Other providers' websites open only when you follow an external link. Their own storage and cookie settings then apply. The optional 3D viewer is described in a separate section."
        ]
      },
      {
        "title": "Measuring visits and loading times",
        "body": measurementCopy.en,
        "links": [
          {
            "label": "Vercel Analytics privacy",
            "href": "https://vercel.com/docs/analytics/privacy-policy"
          }
        ]
      },
      {
        "title": "NFC/QR enquiries and clipboard",
        "body": [
          "Your product choices and entered details are initially brought together in your browser tab. Non-personal NFC selections are saved for the session as described above. Optional project descriptions on the contact page remain in memory and are not autosaved. No form sends information to this website's own server. Public product identifiers in links contain no personal enquiry details.",
          "Opening a prepared WhatsApp link already passes the enquiry text to WhatsApp as part of the link address. The message reaches me only when you send it in WhatsApp. A prepared email link passes the content to your mail application. Copying places the text in your device's clipboard. How the clipboard is managed or synchronised depends on your device. You can edit the text before sending.",
          "Except for the selections and language transfer described above, reloading discards entered enquiry content. Browsers may temporarily retain page state for back and forward navigation. This website's server stores no enquiry drafts."
        ]
      },
      {
        "title": "Optional 3D product viewer",
        "body": [
          "The viewing software and selected model file load only when you choose “View in 3D”. Both are served by this website. The current catalogue models do not connect to Spline or Google.",
          "Rotation and zoom run in the browser on your device. The viewer does not transmit enquiry fields. You can view product images and prepare an enquiry without opening the 3D viewer. Closing it releases the display and the graphics resources it uses."
        ]
      },
      {
        "title": "Email, telephone, WhatsApp and LinkedIn",
        "body": [
          "When you get in touch, the data processed may include your name, contact details, business, messages and information about agreed services. The published mailbox uses Google's Gmail service. Google processes messages and technical data under that service's terms. Google has entities in Ireland and the USA; data may be processed in those countries.",
          "WhatsApp Ireland Limited in Ireland serves WhatsApp users in the European region. The service also uses infrastructure and associated companies in the USA. LinkedIn Ireland Unlimited Company in Ireland serves users in Switzerland. Data may also be processed in the USA. These providers also process data for their own purposes under their respective terms.",
          "You can use email or telephone if you prefer not to use WhatsApp or LinkedIn. Contacting me allows your enquiry to be handled. It is not blanket consent to advertising messages."
        ],
        "links": [
          {
            "label": "Google privacy policy",
            "href": "https://policies.google.com/privacy?hl=en"
          },
          {
            "label": "WhatsApp privacy policy for the European region",
            "href": "https://www.whatsapp.com/legal/privacy-policy-eea"
          },
          {
            "label": "LinkedIn privacy policy",
            "href": "https://www.linkedin.com/legal/privacy-policy"
          }
        ]
      },
      {
        "title": "Who receives data and where it is processed",
        "body": [
          "Data is received by the hosting, communication and optional viewing providers you use. Where required in a specific case, it may also go to providers carrying out an agreed service or legally competent authorities. The named services have connections in particular to Switzerland, Ireland and the USA. Their provider information identifies other entities and providers that process data on their behalf (subprocessors).",
          "Different data protection rules may apply abroad, as may different powers for government access. The protection required depends on the recipient and data flow. This may involve an adequate level of protection, an applicable certification, contractual safeguards or a statutory exception. A service being accessible, or following a link, does not guarantee a particular level of data protection. Please use the address above with questions about a specific contact channel."
        ]
      },
      {
        "title": "Retention and deletion",
        "body": [
          "Contact and project data is kept for as long as necessary to handle the enquiry, carry out the contract, meet legal obligations or protect legal claims. Accounting records and supporting documents are generally subject to a ten-year statutory retention period from the end of the financial year. This does not mean every enquiry must be kept for ten years.",
          "Data no longer needed is deleted or anonymised unless a retention obligation or necessary preservation of evidence prevents this. Technical logs and data processed by external providers for their own purposes also follow those providers' retention rules."
        ]
      },
      {
        "title": "Your rights",
        "body": [
          "To the extent provided by law, you may request access to, correction of or deletion of your data. Where applicable, you may also request a copy or transfer of it. You may withdraw consent for the future and object to processing. Legal duties, overriding interests and third-party rights may limit these rights.",
          "Email your request to hahn.silvan.work@gmail.com. Reasonable proof of identity may be needed to match the request to you safely. Access requests are generally answered within 30 days. You will be informed of a justified delay. You may also contact the Swiss Federal Data Protection and Information Commissioner (FDPIC)."
        ],
        "links": [
          {
            "label": "FDPIC: data protection",
            "href": "https://www.edoeb.admin.ch/en"
          }
        ]
      },
      {
        "title": "Security and changes",
        "body": [
          "HTTPS protects the connection between your browser and this website. Technical and organisational measures aim to limit unauthorised access and accidental disclosure. No online service can guarantee absolute security.",
          "This statement is updated when the services used or the data processing change. The date identifies the version. New purposes may require additional information."
        ]
      }
    ]
  }
};

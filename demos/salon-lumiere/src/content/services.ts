export const services = [
  {
    category: "Herren",
    items: [
      {
        id: "herrenschnitt",
        name: "Herrenschnitt",
        description: "Klassischer Haarschnitt mit Waschen, Schneiden und Föhnen.",
        price: "CHF 45",
        duration: "45 min",
      },
      {
        id: "bart-trimmen",
        name: "Bart trimmen",
        description: "Den Bart in Form bringen und pflegen, passend zu Ihren Wünschen.",
        price: "CHF 20",
        duration: "20 min",
      },
      {
        id: "schnitt-bart",
        name: "Schnitt & Bart",
        description: "Herrenschnitt und Bartpflege in einem Termin.",
        price: "CHF 60",
        duration: "60 min",
      },
    ],
  },
  {
    category: "Damen",
    items: [
      {
        id: "damenschnitt",
        name: "Damenschnitt",
        description: "Waschen, Schneiden und Föhnen, abgestimmt auf Ihre Haarlänge.",
        price: "ab CHF 85",
        duration: "60–90 min",
      },
      {
        id: "foehnfrisur",
        name: "Föhnfrisur",
        description: "Föhnen und Stylen, für den Alltag oder einen besonderen Anlass.",
        price: "ab CHF 45",
        duration: "30–45 min",
      },
      {
        id: "hochsteckfrisur",
        name: "Hochsteckfrisur",
        description: "Eine elegante Hochsteckfrisur für Hochzeiten oder besondere Anlässe.",
        price: "ab CHF 95",
        duration: "60–90 min",
      },
    ],
  },
  {
    category: "Farbe & Technik",
    items: [
      {
        id: "volltonfarbe",
        name: "Volltonfarbe",
        description: "Das ganze Haar in Ihrer Wunschfarbe färben, für einen gleichmässigen Farbton.",
        price: "ab CHF 120",
        duration: "90–120 min",
      },
      {
        id: "balayage-ombre",
        name: "Balayage / Ombré",
        description: "Weiche Farbverläufe, die natürlich wirken und sanft ineinander übergehen.",
        price: "ab CHF 160",
        duration: "120–150 min",
      },
      {
        id: "straehnen",
        name: "Strähnen",
        description: "Einzelne Strähnen färben, um Ihrer Haarfarbe mehr Abwechslung zu geben.",
        price: "ab CHF 140",
        duration: "90–150 min",
      },
      {
        id: "toning-glossing",
        name: "Toning & Glossing",
        description: "Die Haarfarbe auffrischen und dem Haar neuen Glanz geben.",
        price: "ab CHF 60",
        duration: "45 min",
      },
    ],
  },
  {
    category: "Pflege & Behandlung",
    items: [
      {
        id: "pflegekur",
        name: "Intensive Pflegekur",
        description: "Intensive Pflege für trockenes und strapaziertes Haar.",
        price: "ab CHF 35",
        duration: "20 min",
      },
      {
        id: "keratin",
        name: "Keratin-Behandlung",
        description: "Das Haar längerfristig glätten und pflegen, damit es sich leichter bändigen lässt.",
        price: "ab CHF 180",
        duration: "120–150 min",
      },
    ],
  },
];

export const allServices = services.flatMap(({ items }) => items);

// Only known public service IDs may influence the form. No arbitrary URL text.
export function serviceFromQuery(search: string): string {
  const values = new URLSearchParams(search).getAll("service");
  return values.length === 1 && allServices.some(({ id }) => id === values[0]) ? values[0] : "";
}

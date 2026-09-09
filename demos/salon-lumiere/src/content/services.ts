export const services = [
  {
    category: "Herren",
    items: [
      {
        id: "herrenschnitt",
        name: "Herrenschnitt",
        description: "Klassischer Schnitt inkl. Waschen, Schneiden und Föhnen.",
        price: "CHF 45",
        duration: "45 min",
      },
      {
        id: "bart-trimmen",
        name: "Bart trimmen",
        description: "Formgebung und Pflege des Bartes nach Ihren Wünschen.",
        price: "CHF 20",
        duration: "20 min",
      },
      {
        id: "schnitt-bart",
        name: "Schnitt & Bart",
        description: "Kombination aus Herrenschnitt und Barttrimmen.",
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
        description: "Waschen, schneiden und föhnen – massgeschneidert auf Ihre Haarlänge.",
        price: "ab CHF 85",
        duration: "60–90 min",
      },
      {
        id: "foehnfrisur",
        name: "Föhnfrisur",
        description: "Professionelles Föhnen und Stylen für jeden Anlass.",
        price: "ab CHF 45",
        duration: "30–45 min",
      },
      {
        id: "hochsteckfrisur",
        name: "Hochsteckfrisur",
        description: "Elegante Aufsteckfrisuren für Hochzeiten und besondere Anlässe.",
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
        description: "Einfärbung in Ihrer Wunschfarbe – für ein gleichmässiges, strahlendes Ergebnis.",
        price: "ab CHF 120",
        duration: "90–120 min",
      },
      {
        id: "balayage-ombre",
        name: "Balayage / Ombré",
        description: "Natürlich wirkende Farbverläufe für ein modernes, sonnenverwöhntes Finish.",
        price: "ab CHF 160",
        duration: "120–150 min",
      },
      {
        id: "straehnen",
        name: "Strähnen",
        description: "Klassische oder moderne Strähnen für mehr Tiefe und Dimension.",
        price: "ab CHF 140",
        duration: "90–150 min",
      },
      {
        id: "toning-glossing",
        name: "Toning & Glossing",
        description: "Farbauffrischung und Glanzbehandlung für strahlendes Haar.",
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
        description: "Tiefenwirksame Behandlung für trockenes und strapaziertes Haar.",
        price: "ab CHF 35",
        duration: "20 min",
      },
      {
        id: "keratin",
        name: "Keratin-Behandlung",
        description: "Langanhaltende Glättung und Pflege für widerspenstiges Haar.",
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

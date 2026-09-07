import Link from "next/link";

const services = [
  {
    category: "Herren",
    items: [
      {
        name: "Herrenschnitt",
        description: "Klassischer Schnitt inkl. Waschen, Schneiden und Föhnen.",
        price: "CHF 45",
        duration: "45 min",
      },
      {
        name: "Bart trimmen",
        description: "Formgebung und Pflege des Bartes nach Ihren Wünschen.",
        price: "CHF 20",
        duration: "20 min",
      },
      {
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
        name: "Damenschnitt",
        description: "Waschen, schneiden und föhnen – maßgeschneidert auf Ihre Haarlänge.",
        price: "ab CHF 85",
        duration: "60–90 min",
      },
      {
        name: "Föhnfrisur",
        description: "Professionelles Föhnen und Stylen für jeden Anlass.",
        price: "ab CHF 45",
        duration: "30–45 min",
      },
      {
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
        name: "Volltonfarbe",
        description: "Einfärbung in Ihrer Wunschfarbe – für ein gleichmäßiges, strahlendes Ergebnis.",
        price: "ab CHF 120",
        duration: "90–120 min",
      },
      {
        name: "Balayage / Ombré",
        description: "Natürlich wirkende Farbverläufe für ein modernes, sonnenverwöhntes Finish.",
        price: "ab CHF 160",
        duration: "120–150 min",
      },
      {
        name: "Strähnen",
        description: "Klassische oder moderne Strähnen für mehr Tiefe und Dimension.",
        price: "ab CHF 140",
        duration: "90–150 min",
      },
      {
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
        name: "Intensive Pflegekur",
        description: "Tiefenwirksame Behandlung für trockenes und strapaziertes Haar.",
        price: "ab CHF 35",
        duration: "20 min",
      },
      {
        name: "Keratin-Behandlung",
        description: "Langanhaltende Glättung und Pflege für widerspenstiges Haar.",
        price: "ab CHF 180",
        duration: "120–150 min",
      },
    ],
  },
];

export default function Leistungen() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold tracking-[0.3em] text-xs uppercase font-body font-medium mb-4">
            Was wir tun
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-cream font-semibold leading-tight max-w-xl">
            Unsere Leistungen
          </h1>
          <p className="mt-6 text-cream/60 max-w-lg text-base leading-relaxed font-body">
            Von präzisen Schnitten über kunstvolle Colorationen bis hin zu
            regenerativen Pflegebehandlungen – wir bieten Ihnen das Beste.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="space-y-16 md:space-y-24">
          {services.map(({ category, items }) => (
            <div key={category}>
              <div className="flex items-center gap-6 mb-8 md:mb-10">
                <h2 className="font-display text-2xl md:text-3xl text-charcoal font-semibold">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-cream-dark" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(({ name, description, price, duration }) => (
                  <div
                    key={name}
                    className="border border-cream-dark bg-cream p-6 md:p-8 flex flex-col gap-4 hover:border-gold/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-default"
                  >
                    <div>
                      <h3 className="font-display text-lg text-charcoal font-semibold mb-2">
                        {name}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed font-body">
                        {description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-cream-dark">
                      <span className="text-gold font-body font-semibold text-sm">{price}</span>
                      <span className="text-muted text-xs font-body">{duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-12 text-sm text-muted font-body italic border-l-2 border-gold/40 pl-4">
          Alle Preise sind unverbindlich. Der endgültige Preis wird nach Beratung und
          Beurteilung Ihrer Haarstruktur festgelegt.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-cream-dark py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal font-semibold mb-4">
            Interesse geweckt?
          </h2>
          <p className="text-muted text-base mb-8 font-body">
            Buchen Sie jetzt Ihren persönlichen Beratungstermin.
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-10 py-4 bg-charcoal text-cream text-sm font-medium tracking-wide hover:bg-charcoal-light transition-colors duration-200"
          >
            Termin buchen
          </Link>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";

const sections = [
  {
    title: "Frühstück & Morgen",
    subtitle: "Bis 11:00 Uhr · Mo–Fr ab 07:00, Sa–So ab 08:00",
    items: [
      { name: "Frühstückskorb für Zwei", desc: "Frischgebackenes Brot, Gipfeli, Butter, hausgemachte Konfitüre, Käse, Aufschnitt, Orangensaft", price: "28.00" },
      { name: "Bürli & Butter", desc: "Drei frische Bürli mit Butter und Konfitüre", price: "6.50" },
      { name: "Rühreier auf Toast", desc: "Mit frischen Kräutern und Tomatensalat", price: "12.00" },
      { name: "Müesli der Saison", desc: "Mit Joghurt, frischen Früchten und Honig", price: "9.50" },
    ],
  },
  {
    title: "Backwaren & Patisserie",
    subtitle: "Täglich frisch aus der Backstube",
    items: [
      { name: "Gipfeli", desc: "Butterig, zart, nach Hausrezept", price: "2.50" },
      { name: "Nussgipfel", desc: "Mit Haselnussfüllung, lauwarm serviert", price: "3.20" },
      { name: "Linzer Torte", desc: "Mit Johannisbeergelee, hausgemacht nach Familienrezept", price: "6.50" },
      { name: "Éclair au Chocolat", desc: "Brandteig, Schokoladencreme, Ganache-Glasur", price: "5.80" },
      { name: "Apfelstrudel", desc: "Knuspriger Blätterteig, Zimtäpfel, Puderzucker", price: "5.50" },
      { name: "Pralinés (6 Stück)", desc: "Hausgemachte Pralinen, sortiert, wechselnde Kreationen", price: "14.00" },
    ],
  },
  {
    title: "Kaffee & Heissgetränke",
    subtitle: "Mit hausgerösteten Arabica-Bohnen",
    items: [
      { name: "Café Crème", desc: "Langer schwarzer Kaffee, mild geröstet", price: "4.50" },
      { name: "Espresso", desc: "Doppelt geröstet, kräftig, kurz", price: "3.80" },
      { name: "Cappuccino", desc: "Doppelter Espresso, aufgeschäumte Vollmilch", price: "5.00" },
      { name: "Latte Macchiato", desc: "Grosse Tasse, Hafermilch auf Wunsch", price: "5.50" },
      { name: "Heisse Schokolade", desc: "Hausgemacht mit Guanaja-Kuvertüre", price: "5.80" },
      { name: "Tee (Auswahl)", desc: "Schwarztee, Kräuter, Grüntee — alle Sorten täglich frisch", price: "4.20" },
    ],
  },
  {
    title: "Torten & Festliches",
    subtitle: "Auch für Bestellungen — bitte 48h im Voraus",
    items: [
      { name: "Schwarzwälder Kirschtorte", desc: "Nach originalem Hausrezept, Kirschwasser aus der Region", price: "7.50" },
      { name: "Käsekuchen", desc: "Cremig, leicht, mit Mürbteigboden", price: "6.50" },
      { name: "Geburtstagstorte (Bestellung)", desc: "Individuell gestaltet, ab 6 Personen", price: "ab 55.00" },
      { name: "Hochzeitstorte (Bestellung)", desc: "Mehlspeiskunst nach Mass", price: "auf Anfrage" },
    ],
  },
];

export default function Speisekarte() {
  return (
    <>
      {/* Header */}
      <section className="pt-20 md:pt-24 pb-0 bg-[#F2E8D5]">
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <div className="border-2 border-[#1A1208] p-1 mb-0">
            <div className="border border-[#1A1208]/30 px-8 md:px-16 py-10 text-center">
              <p className="text-[#755031] text-[11px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                ✦ Konditorei Vogel · Zürich ✦
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-[#1A1208] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Speisekarte
              </h1>
              <div className="flex items-center gap-3 justify-center mt-4">
                <div className="h-px flex-1 bg-[#8B6040]/50" />
                <span className="text-[#755031] text-xs">✦ ✦ ✦</span>
                <div className="h-px flex-1 bg-[#8B6040]/50" />
              </div>
              <p className="text-sm text-[#1A1208]/75 mt-4 tracking-wide" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                Alle Preise in CHF inkl. MwSt. · Saisonale Änderungen vorbehalten
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speisekarte Sektionen */}
      <section className="bg-[#F2E8D5] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-14">
          {sections.map(({ title, subtitle, items }) => (
            <div key={title}>
              {/* Sektions-Header im Zeitungsstil */}
              <div className="text-center mb-8 pb-4 border-b-2 border-t border-[#1A1208]/20 pt-4">
                <h2 className="text-2xl md:text-3xl font-black text-[#1A1208]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {title}
                </h2>
                <p className="text-xs text-[#755031] tracking-[0.2em] uppercase mt-1" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                  {subtitle}
                </p>
              </div>

              {/* Items im 2-Spalten-Layout */}
              <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 divide-[#1A1208]/10">
                {items.map(({ name, desc, price }, i) => (
                  <div
                    key={name}
                    className={`flex justify-between gap-4 py-5 px-4 ${
                      i % 2 === 0 ? "md:border-r md:border-[#1A1208]/10 md:pr-8" : "md:pl-8"
                    } border-b border-[#1A1208]/10`}
                  >
                    <div className="flex-1">
                      <h3 className="text-base font-bold italic text-[#1A1208] mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {name}
                      </h3>
                      <p className="text-sm text-[#1A1208]/75 leading-relaxed" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                        {desc}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-sm font-bold text-[#755031]" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                        {price.startsWith("ab") || price === "auf Anfrage" ? price : `${price}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hinweis-Box */}
      <section className="bg-[#1A1208] py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#755031] text-[11px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>✦ Bitte beachten ✦</p>
          <p className="text-base text-[#F2E8D5]/70 leading-relaxed mb-8" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            Wir arbeiten mit frischen, regionalen Zutaten. Unser Angebot ändert sich saisonal.
            Allergene auf Anfrage — wir beraten Sie gerne persönlich.
          </p>
          <Link
            href="/kontakt"
            className="border border-[#F2E8D5]/40 text-[#F2E8D5] text-xs tracking-[0.25em] uppercase px-8 py-3 hover:border-[#F2E8D5] transition-colors duration-200 inline-block"
            style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
          >
            Tisch reservieren
          </Link>
        </div>
      </section>
    </>
  );
}

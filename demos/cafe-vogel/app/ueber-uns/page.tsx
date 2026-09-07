import Link from "next/link";

const milestones = [
  { year: "1987", text: "Elisabeth und Hans Vogel eröffnen die erste Backstube an der Beispielgasse 12 — mit zwei Ofen und einem Rezeptbuch." },
  { year: "1995", text: "Der erste Lehrling tritt ein. Die Konditorei wird für ihre Linzer Torte in der Zürcher Zeitung erwähnt." },
  { year: "2008", text: "Sohn Michael Vogel übernimmt die Backstube nach seiner Ausbildung in Wien und Paris." },
  { year: "2015", text: "Erweiterung des Cafés: 30 neue Sitzplätze im Innenhof. Specialty Coffee kommt ins Programm." },
  { year: "2024", text: "Über 300 Stammkunden täglich. Die Tradition geht weiter — täglich ab 04:00 Uhr morgens." },
];

export default function UeberUns() {
  return (
    <>
      {/* Header */}
      <section className="pt-14 bg-[#1A1208]">
        <div className="max-w-5xl mx-auto px-6 pt-8 pb-0">
          <div className="border-2 border-[#F2E8D5]/20 p-1">
            <div className="border border-[#F2E8D5]/10 px-8 md:px-16 py-12 text-center">
              <p className="text-[#755031] text-[11px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                ✦ Seit Generationen ✦
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-[#F2E8D5] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Über uns
              </h1>
              <div className="flex items-center gap-3 justify-center">
                <div className="h-px flex-1 bg-[#755031]/50" />
                <span className="text-[#755031] text-xs">✦ ✦ ✦</span>
                <div className="h-px flex-1 bg-[#755031]/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Geschichte */}
      <section className="bg-[#1A1208] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          {/* Bild */}
          <div className="relative">
            <div className="border-2 border-[#F2E8D5]/20 p-2">
              <div className="aspect-[3/4] bg-[#2A1E10] overflow-hidden">
                <img src="/demos/cafe/team-foto.jpg" alt="Familie Vogel" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#755031] text-[#F2E8D5] text-[11px] tracking-[0.2em] uppercase px-4 py-2" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
              Familie Vogel
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#F2E8D5] mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Eine Backstube.<br/>
              <span className="italic text-[#755031]">Drei Generationen.</span>
            </h2>
            <div className="space-y-4 text-base text-[#F2E8D5]/65 leading-relaxed" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
              <p>
                1987 wagten Elisabeth und Hans Vogel den Schritt — ein kleines Lokal, zwei Öfen, ein Traum. Keine Kompromisse bei den Zutaten, kein Tiefkühlteig, kein Convenience.
              </p>
              <p>
                Was als Familientraum begann, wurde zur Institution. Ihre Linzer Torte wurde legendär, die Stammkunden kamen täglich, und irgendwann stand fest: Das Rezeptbuch bleibt in der Familie.
              </p>
              <p>
                Heute führt Sohn Michael die Backstube — ergänzt um Specialty Coffee, neue Patisserie-Kreationen und einen Innenhof voller Stammgäste. Der Geist ist derselbe geblieben.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chronik */}
      <section className="bg-[#F2E8D5] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#755031] text-[11px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>✦ Chronik ✦</p>
            <h2 className="text-3xl font-black text-[#1A1208]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Unsere Geschichte
            </h2>
          </div>

          <div className="relative">
            {/* Zentrale Linie */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-[#1A1208]/20" />

            <div className="space-y-8">
              {milestones.map(({ year, text }) => (
                <div key={year} className="flex gap-6 items-start">
                  <div className="shrink-0 w-16 text-right">
                    <span className="text-sm font-black text-[#755031]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{year}</span>
                  </div>
                  <div className="shrink-0 w-px relative">
                    <div className="absolute top-1.5 left-0 w-2.5 h-2.5 border-2 border-[#8B6040] bg-[#F2E8D5] rounded-full -translate-x-[5px]" />
                  </div>
                  <p className="text-sm text-[#1A1208]/70 leading-relaxed pt-0.5" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section className="bg-[#E5D7BF] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[#755031] text-[11px] tracking-[0.35em] uppercase mb-3" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>✦ Was uns ausmacht ✦</p>
            <h2 className="text-3xl font-black text-[#1A1208]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Unsere Überzeugungen</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-0 border border-[#1A1208]/20">
            {[
              { title: "Kein Kompromiss", text: "Wir verwenden ausschliesslich frische, regionale Zutaten. Kein Tiefkühlteig, keine Convenience-Produkte." },
              { title: "Täglich neu", text: "Jeden Morgen ab 04:00 Uhr. Was übrig bleibt, wird gespendet — nie von gestern auf heute." },
              { title: "Handwerk zuerst", text: "Jede Torte, jedes Brot entsteht per Hand. Maschinen helfen, aber ersetzen keine Erfahrung." },
            ].map(({ title, text }, i) => (
              <div key={title} className={`p-8 text-center ${i < 2 ? "border-b md:border-b-0 md:border-r border-[#1A1208]/20" : ""}`}>
                <h3 className="text-lg font-black text-[#1A1208] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{title}</h3>
                <p className="text-sm text-[#1A1208]/65 leading-relaxed" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F2E8D5] py-14 text-center px-6">
        <p className="text-[#755031] text-[11px] tracking-[0.4em] uppercase mb-4" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>✦ Besuchen Sie uns ✦</p>
        <h2 className="text-2xl font-black text-[#1A1208] mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Überzeugen Sie sich selbst.
        </h2>
        <Link
          href="/kontakt"
          className="border border-[#1A1208] text-[#1A1208] text-xs tracking-[0.2em] uppercase px-8 py-3 hover:bg-[#1A1208] hover:text-[#F2E8D5] transition-colors duration-200 inline-block"
          style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
        >
          Tisch reservieren
        </Link>
      </section>
    </>
  );
}

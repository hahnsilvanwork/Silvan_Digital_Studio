import Link from "next/link";

import { featuredMenu as menu } from "./data/menu";
import { openingHours } from "./data/hours";

export default function Home() {
  return (
    <>
      <section className="cafe-hero">
        <div className="hero-copy">
          <p className="eyebrow">Café & Konditorei · Zürich · Fiktives Konzept</p>
          <h1>Ein bisschen<br />Zeit. <em>Ein Stück<br />Glück.</em></h1>
          <p className="hero-description">Noch warme Gipfeli. Der Duft von frisch gemahlenem Kaffee. Und ein Lieblingsplatz, an dem der Morgen etwas länger bleiben darf.</p>
          <div className="hero-actions">
            <Link href="/speisekarte" className="cafe-button">Unsere Speisekarte <span aria-hidden="true">✦</span></Link>
            <Link href="/kontakt" className="cafe-text-link">Reservierungsdemo <span aria-hidden="true">✦</span></Link>
          </div>
          <div className="hero-note"><span aria-hidden="true">✦</span><p>Von Hand gemacht.<br /><strong>Mit Liebe serviert.</strong></p></div>
        </div>
        <div className="hero-photo">
          <img src="/demos/cafe/hero-cafe.jpg" alt="Hausgemachte Torten in der sonnigen Vitrine unserer Konditorei" width="1280" height="1920" fetchPriority="high" />
          <div className="photo-caption"><span>Die kleinen Freuden des Alltags.</span><span>Vogel / Zürich</span></div>
          <div className="hero-seal" aria-hidden="true">Frisch aus<br /><em>der Backstube</em><br />jeden Morgen</div>
        </div>
      </section>
      <div className="cafe-ribbon"><span>Butter, Mehl & Leidenschaft</span><span aria-hidden="true">✦</span><span>In Zürich zuhause</span><span aria-hidden="true">✦</span><span>Seit 1987 von Hand gemacht</span></div>

      {/* ───── AUSWAHL DES TAGES ───── */}
      <section className="bg-[#1A1208] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">

          {/* Zeitung-Kopf */}
          <div className="text-center border-b-2 border-t-2 border-[#F2E8D5]/20 py-4 mb-10">
            <p className="text-[#755031] text-[11px] tracking-[0.4em] uppercase mb-1" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
              ✦ Auswahl des Hauses ✦
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#F2E8D5]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Unsere Spezialitäten
            </h2>
          </div>

          {/* 3-Spalten-Raster wie Zeitung */}
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#F2E8D5]/10">
            {menu.map(({ name, desc, price }, i) => (
              <div key={name} className={`px-6 py-6 ${i < 3 ? "md:border-b md:border-[#F2E8D5]/10" : ""}`}>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-base font-bold italic text-[#F2E8D5]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {name}
                  </h3>
                  <span className="text-[#755031] text-sm font-bold ml-3 shrink-0" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                    CHF {price}
                  </span>
                </div>
                <p className="text-sm text-[#F2E8D5]/75 leading-relaxed" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/speisekarte"
              className="border border-[#F2E8D5]/30 text-[#F2E8D5] text-xs tracking-[0.25em] uppercase px-8 py-3 hover:border-[#F2E8D5] transition-colors duration-200 inline-block"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
            >
              Vollständige Speisekarte
            </Link>
          </div>
        </div>
      </section>

      {/* ───── ÜBER UNS TEASER ───── */}
      <section className="py-16 md:py-24 bg-[#F2E8D5]">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Bild mit Rahmen */}
          <div className="relative">
            <div className="border-2 border-[#1A1208] p-2">
              <div className="aspect-[4/3] bg-[#E5D7BF] overflow-hidden">
                <img src="/demos/cafe/cafe-interior.jpg" loading="lazy" alt="Café & Konditorei Vogel innen" className="w-full h-full object-cover" />
              </div>
            </div>
            {/* Kleines Etikett */}
            <div className="absolute -bottom-4 -right-4 bg-[#1A1208] text-[#F2E8D5] text-[11px] tracking-[0.2em] uppercase px-4 py-2" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
              Seit 1987
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-[#8B6040]" />
              <span className="text-[#755031] text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Unsere Geschichte</span>
              <div className="h-px flex-1 bg-[#8B6040]" />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-[#1A1208] leading-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Handwerk, das<br/>
              <span className="italic text-[#755031]">man schmeckt.</span>
            </h2>

            <p className="text-base text-[#1A1208]/70 leading-relaxed mb-4" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
              Was 1987 als kleine Backstube in Zürich begann, ist heute eine Institution. Familie Vogel steht täglich um 4 Uhr morgens auf — damit Sie zur Öffnung frisches Brot und duftende Gipfeli geniessen können.
            </p>
            <p className="text-base text-[#1A1208]/70 leading-relaxed mb-8" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
              Keine Convenience-Produkte. Kein Tiefkühlteig. Nur echte Zutaten, echtes Handwerk, echte Leidenschaft.
            </p>

            <Link
              href="/ueber-uns"
              className="text-xs tracking-[0.2em] uppercase text-[#1A1208] border-b border-[#8B6040] pb-0.5 hover:text-[#755031] transition-colors duration-200"
              style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
            >
              Unsere Geschichte →
            </Link>
          </div>
        </div>
      </section>

      {/* ───── ÖFFNUNGSZEITEN & STANDORT ───── */}
      <section className="bg-[#E5D7BF] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-2 border-[#1A1208] p-1">
            <div className="border border-[#1A1208]/30 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-10">
                {/* Öffnungszeiten */}
                <div>
                  <div className="text-center mb-6">
                    <p className="text-[#755031] text-[11px] tracking-[0.35em] uppercase mb-2" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>✦ Wir sind für Sie da ✦</p>
                    <h3 className="text-2xl font-black text-[#1A1208]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Öffnungszeiten</h3>
                  </div>
                  <ul className="space-y-0">
                    {openingHours.map(({ day, time }) => (
                      <li key={day} className="flex justify-between items-center py-3 border-b border-[#1A1208]/15 last:border-0">
                        <span className="text-sm text-[#1A1208]/80" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{day}</span>
                        <span className="text-sm font-bold text-[#1A1208]" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Adresse */}
                <div className="md:border-l md:border-[#1A1208]/15 md:pl-10">
                  <div className="text-center mb-6">
                    <p className="text-[#755031] text-[11px] tracking-[0.35em] uppercase mb-2" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>✦ Finden Sie uns ✦</p>
                    <h3 className="text-2xl font-black text-[#1A1208]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Standort</h3>
                  </div>
                  <address className="not-italic text-sm text-[#1A1208]/80 text-center space-y-1 leading-relaxed mb-6" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                    <p className="font-bold text-[#1A1208] text-base">Café & Konditorei Vogel</p>
                    <p>Beispielgasse 12</p>
                    <p>Zürich · fiktiver Standort</p>
                    <p className="mt-4">
                      <span className="text-[#755031] font-bold hover:text-[#593919] transition-colors">Telefon in dieser Demo nicht verfügbar</span>
                    </p>
                    <p>
                      <span className="text-[#1A1208]/75 hover:text-[#1A1208] transition-colors">hallo@vogel.example</span>
                    </p>
                  </address>
                  <div className="text-center">
                    <Link
                      href="/kontakt"
                      className="inline-block border border-[#1A1208] text-[#1A1208] text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#1A1208] hover:text-[#F2E8D5] transition-colors duration-200"
                      style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                    >
                      Reservierungsdemo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── ZITAT ───── */}
      <section className="py-14 bg-[#F2E8D5] text-center px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-[#755031] mb-6">Fiktive Beispielstimme · Keine echte Kundenbewertung</p>
          <span className="text-5xl text-[#755031]/30 leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>"</span>
          <p className="text-xl md:text-2xl font-bold italic text-[#1A1208] leading-relaxed -mt-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Seit 35 Jahren kaufe ich mein Brot nirgendwo anders. Das ist einfach das Beste, was Zürich zu bieten hat.
          </p>
          <div className="flex items-center gap-4 justify-center mt-5">
            <div className="h-px w-12 bg-[#8B6040]" />
            <p className="text-sm text-[#755031]" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Maria S., Stammkundin</p>
            <div className="h-px w-12 bg-[#8B6040]" />
          </div>
        </div>
      </section>
    </>
  );
}

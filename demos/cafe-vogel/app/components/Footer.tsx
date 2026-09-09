import Link from "next/link";
import { openingHours } from "../data/hours";

export default function Footer() {
  return (
    <footer className="bg-[#1A1208] text-[#F2E8D5]">
      {/* Top ornament bar */}
      <div className="border-b border-[#F2E8D5]/10 py-5 text-center">
        <p className="text-[#CDA982] text-xs tracking-[0.4em] uppercase" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
          ✦ &nbsp; Café & Konditorei Vogel &nbsp; ✦ &nbsp; Zürich &nbsp; ✦ &nbsp; Seit 1987 &nbsp; ✦
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Über uns */}
        <div>
          <h3 className="text-[11px] tracking-[0.3em] uppercase text-[#CDA982] mb-4 border-b border-[#F2E8D5]/10 pb-3" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            Café & Konditorei Vogel
          </h3>
          <p className="text-sm text-[#F2E8D5]/60 leading-relaxed" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            Seit 1987 backen wir täglich frische Torten, Brote und Patisserie — mit Leidenschaft und ohne Kompromisse.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-[11px] tracking-[0.3em] uppercase text-[#CDA982] mb-4 border-b border-[#F2E8D5]/10 pb-3" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            Navigation
          </h3>
          <ul className="space-y-2">
            {[
              { href: "/", label: "Home" },
              { href: "/speisekarte", label: "Speisekarte" },
              { href: "/ueber-uns", label: "Über uns" },
              { href: "/kontakt", label: "Kontakt & Reservierungsdemo" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-sm text-[#F2E8D5]/60 hover:text-[#F2E8D5] transition-colors duration-200" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <h3 className="text-[11px] tracking-[0.3em] uppercase text-[#CDA982] mb-4 border-b border-[#F2E8D5]/10 pb-3" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            Besuchen Sie uns
          </h3>
          <address className="not-italic text-sm text-[#F2E8D5]/60 space-y-1 leading-relaxed" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            <p>Beispielgasse 12</p>
            <p>Zürich · fiktiver Standort</p>
            {openingHours.map(({ day, time }) => <p key={day}>{day}: {time}</p>)}
            <p className="mt-3">
              <span className="hover:text-[#F2E8D5] transition-colors">Telefon in dieser Demo nicht verfügbar</span>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-[#F2E8D5]/10 py-5 text-center">
        <p className="text-[11px] text-[#F2E8D5]/70 tracking-widest uppercase" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
          © 2026 Café & Konditorei Vogel · Fiktives Beispielprojekt · Keine echten Reservierungen
        </p>
      </div>
    <a href="https://silvandigital.ch/work/cafe-vogel" className="block text-center underline py-4">Zurück zu SILVAN</a>
    <a href="https://silvandigital.ch/privacy" className="block text-center underline py-4">Datenschutz dieser Demo</a></footer>
  );
}

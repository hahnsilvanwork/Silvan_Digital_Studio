import Link from "next/link";

export default function Footer() {
  return (
    <footer className="salon-footer">
      <div className="salon-shell">
        <div className="footer-main">
          <div><Link prefetch={false} href="/" className="footer-brand">Salon Lumière.</Link><p>Ein persönlicher Look beginnt<br />mit einem guten Gespräch.</p></div>
          <nav aria-label="Fussnavigation"><Link prefetch={false} href="/leistungen">Leistungen & Preise</Link><Link prefetch={false} href="/ueber-uns">Der Salon & das Team</Link><Link prefetch={false} href="/kontakt">Termin anfragen</Link></nav>
          <div className="footer-concept"><p>Ein Salonkonzept von SilvanDigital.</p><p>Fiktiver Salon in Zürich. Bilder, Personen, Öffnungszeiten und Angebote dienen der Gestaltung. Es werden keine Termine gebucht.</p></div>
        </div>
        <div className="footer-bottom"><a href="https://silvandigital.ch/work/salon-lumiere">Zum Projekt bei SilvanDigital</a><a href="https://silvandigital.ch/privacy">Datenschutz dieser Demo</a></div>
      </div>
    </footer>
  );
}

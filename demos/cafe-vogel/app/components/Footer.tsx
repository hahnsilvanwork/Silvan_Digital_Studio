import Link from "next/link";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Link prefetch={false} href="/" className="brand footer-brand">
            <span>Vogel.</span>
            <span className="brand-description">Café & Konditorei</span>
          </Link>
          <p>
            Kleine Pausen. Grosse Vorfreude.
            <br />
            Ein fiktives Café in Zürich.
          </p>
        </div>
        <nav aria-label="Seitennavigation">
          <Link prefetch={false} href="/speisekarte">
            Speisekarte
          </Link>
          <Link prefetch={false} href="/ueber-uns">
            Über Vogel
          </Link>
          <Link prefetch={false} href="/kontakt">
            Tischanfrage ausprobieren
          </Link>
        </nav>
        <div className="footer-studio">
          <p>Gefällt Ihnen dieser Auftritt?</p>
          <a href="https://silvandigital.ch/contact/">
            Eine Website für Ihr Unternehmen
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            Fiktives Website-Beispiel. Keine echten Reservierungen,
            Bestellungen oder Kundenbewertungen.
          </p>
          <div>
            <a href="https://silvandigital.ch/work/">SilvanDigital</a>
            <a href="https://silvandigital.ch/privacy/">Datenschutz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

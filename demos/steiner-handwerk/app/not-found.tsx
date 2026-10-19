import Link from "next/link";

export default function NotFound() {
  return (
    <main id="inhalt" className="section-wrap section-space">
      <p className="muted">Steiner Bau & Handwerk · Beispiel-Website</p>
      <div className="section-heading">
        <h1>
          Diese Seite
          <br />
          <em>fehlt.</em>
        </h1>
        <p>
          Die gesuchte Seite ist hier nicht verfügbar. Kehren Sie zur
          Startseite zurück, um Leistungen und Ideen für Ihr Zuhause zu
          entdecken.
        </p>
      </div>
      <nav className="hero-actions" aria-label="Weitere Seiten">
        <Link prefetch={false} href="/" className="button">
          Zur Startseite
        </Link>
        <Link prefetch={false} href="/#leistungen" className="button button-secondary">
          Leistungen ansehen
        </Link>
        <Link prefetch={false} href="/#kontakt" className="text-link">
          Zur Projektanfrage
        </Link>
      </nav>
    </main>
  );
}

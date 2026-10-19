import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap page-intro" aria-labelledby="not-found-title">
      <h1 id="not-found-title">
        Diese Seite
        <br />
        <em>fehlt.</em>
      </h1>
      <p>
        Die gesuchte Seite ist hier nicht verfügbar. Entdecken Sie das Café
        Vogel auf der Startseite oder schauen Sie direkt in die Speisekarte.
      </p>
      <nav className="hero-actions" aria-label="Weitere Seiten">
        <Link prefetch={false} href="/" className="cafe-button">
          Zur Startseite
        </Link>
        <Link prefetch={false} href="/speisekarte" className="cafe-button button-secondary">
          Speisekarte ansehen
        </Link>
        <Link prefetch={false} href="/kontakt" className="cafe-text-link">
          Zur Tischanfrage
        </Link>
      </nav>
    </section>
  );
}

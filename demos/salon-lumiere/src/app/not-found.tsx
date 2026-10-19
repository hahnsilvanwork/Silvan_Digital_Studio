import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-intro" aria-labelledby="not-found-title">
      <div className="salon-shell">
        <h1 id="not-found-title">
          Diese Seite
          <br />
          <em>fehlt.</em>
        </h1>
        <p>
          Die gesuchte Seite ist hier nicht verfügbar. Entdecken Sie den
          Salon Lumière auf der Startseite oder vergleichen Sie direkt die
          Leistungen und Richtpreise.
        </p>
        <nav className="salon-hero-actions" aria-label="Weitere Seiten">
          <Link prefetch={false} href="/" className="salon-button">
            Zur Startseite
          </Link>
          <Link prefetch={false} href="/leistungen" className="salon-button-secondary">
            Leistungen ansehen
          </Link>
          <Link prefetch={false} href="/kontakt" className="salon-text-link">
            Zur Terminanfrage
          </Link>
        </nav>
      </div>
    </section>
  );
}

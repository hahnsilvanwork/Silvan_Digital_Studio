import Link from "next/link";
import Image from "next/image";
import { featuredMenu } from "./data/menu";
import { openingHours } from "./data/hours";
import Arrow from "./components/Arrow";
export default function Home() {
  return (
    <>
      <section className="cafe-hero wrap">
        <div className="hero-copy">
          <h1>
            Ein bisschen Zeit.
            <br />
            <em>Ein Stück Glück.</em>
          </h1>
          <p className="hero-description">
            Der Duft von Kaffee. Ein Gipfeli auf dem Teller. Und ein
            Lieblingsplatz, an dem der Morgen etwas länger bleiben darf.
          </p>
          <div className="hero-actions">
            <Link prefetch={false} href="/speisekarte" className="cafe-button">
              Speisekarte entdecken <Arrow />
            </Link>
            <Link prefetch={false} href="/kontakt" className="cafe-text-link">
              Tischdemo ausprobieren <Arrow />
            </Link>
          </div>
          <p className="hero-signature">
            Kaffee, Kuchen & kleine Pausen.
            <br />
            Das Café-Konzept für Zürich.
          </p>
        </div>
        <figure className="hero-photo">
          <Image
            src="/demos/cafe/hero-cafe.webp"
            alt="Torten und feines Gebäck in einer sonnigen Café-Vitrine"
            width={1280}
            height={1920}
            priority
            sizes="(max-width: 700px) 90vw, 48vw"
          />
          <figcaption>So könnte Vogel aussehen. · Symbolbild</figcaption>
        </figure>
      </section>
      <section className="specialties section-space">
        <div className="wrap">
          <div className="section-heading">
            <h2>
              Worauf haben
              <br />
              Sie Lust?
            </h2>
            <div>
              <p>
                Etwas Süsses, etwas Herzhaftes oder einfach einen richtig guten
                Kaffee. Eine kleine Auswahl aus unserer Beispielkarte.
              </p>
              <p className="small-note">Fiktive Beispielpreise in CHF.</p>
            </div>
          </div>
          <div className="featured-menu">
            {featuredMenu.map((item) => (
              <article key={item.name} className="menu-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
                <span className="menu-price">{item.price}</span>
              </article>
            ))}
          </div>
          <Link prefetch={false} href="/speisekarte" className="cafe-text-link">
            Die ganze Speisekarte <Arrow />
          </Link>
        </div>
      </section>
      <section className="wrap section-space story-teaser">
        <figure>
          <Image
            src="/demos/cafe/cafe-interior.webp"
            alt="Warmer Café-Innenraum mit Holzstühlen, grossen Fenstern und gedeckten Tischen"
            width={1280}
            height={1923}
            loading="lazy"
            sizes="(max-width:700px) 90vw, 45vw"
          />
          <figcaption>Atmosphäre als Inspiration · Symbolbild</figcaption>
        </figure>
        <div>
          <h2>
            Hier darf die Zeit
            <br />
            <em>langsamer gehen.</em>
          </h2>
          <p className="large-copy">
            Ein Tisch am Fenster. Ein zweiter Kaffee. Ein Gespräch, das bleiben
            darf.
          </p>
          <p>
            Vogel ist die Idee eines Quartiercafés mit Konditorei: persönlich,
            warm und voller kleiner Genussmomente. Ein Ort für den schnellen
            Espresso genauso wie für den langen Sonntagsmorgen.
          </p>
          <Link prefetch={false} href="/ueber-uns" className="cafe-text-link">
            Das Café-Konzept kennenlernen <Arrow />
          </Link>
        </div>
      </section>
      <section className="visit-section section-space">
        <div className="wrap visit-grid">
          <div>
            <h2>
              Eine Pause
              <br />
              <em>passt immer.</em>
            </h2>
            <p>
              Entdecken Sie, wie ein Besuch bei Vogel aussehen könnte. Die
              Tischanfrage lässt sich direkt auf dieser Website ausprobieren.
            </p>
            <Link prefetch={false} href="/kontakt" className="cafe-button">
              Zur Reservierungsdemo <Arrow />
            </Link>
          </div>
          <div>
            <h3>Öffnungszeiten im Konzept</h3>
            <dl className="hours-list">
              {openingHours.map((h) => (
                <div key={h.day}>
                  <dt>{h.day}</dt>
                  <dd>{h.time} Uhr</dd>
                </div>
              ))}
            </dl>
            <p className="small-note">
              Fiktives Café in Zürich · kein realer Standort und keine echten
              Reservierungen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

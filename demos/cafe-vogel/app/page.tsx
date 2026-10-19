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
            Kaffeeduft, ein frisches Gipfeli und ein Platz zum Durchatmen.
            Vogel ist die Idee eines Cafés für die kleinen Pausen im Alltag.
          </p>
          <div className="hero-actions">
            <Link prefetch={false} href="/speisekarte" className="cafe-button">
              Speisekarte ansehen <Arrow />
            </Link>
            <Link prefetch={false} href="/kontakt" className="cafe-text-link">
              Tischanfrage ausprobieren <Arrow />
            </Link>
          </div>
          <p className="hero-signature">
            Kaffee, Kuchen & kleine Pausen.
            <br />
            Ein fiktives Café in Zürich.
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
          <figcaption>So könnte Vogel aussehen. Symbolbild.</figcaption>
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
                Etwas Süsses, etwas Herzhaftes oder ein guter Kaffee.
                Hier sehen Sie eine Auswahl aus unserer Beispiel-Speisekarte.
              </p>
              <p className="small-note">Fiktives Angebot mit Beispielpreisen in CHF.</p>
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
          <figcaption>Ein Eindruck der gewünschten Atmosphäre. Symbolbild.</figcaption>
        </figure>
        <div>
          <h2>
            Hier darf die Zeit
            <br />
            <em>langsamer vergehen.</em>
          </h2>
          <p className="large-copy">
            Ein Tisch am Fenster. Ein zweiter Kaffee. Zeit für ein gutes
            Gespräch.
          </p>
          <p>
            Ein Quartiercafé mit Konditorei, in dem man gerne eine Pause macht:
            Das ist die Idee hinter Vogel. Für den Espresso vor der Arbeit,
            das Frühstück zu zweit oder ein Stück Kuchen am Nachmittag.
          </p>
          <Link prefetch={false} href="/ueber-uns" className="cafe-text-link">
            Die Idee hinter Vogel <Arrow />
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
              Wie würde Ihre nächste Café-Pause aussehen? Wählen Sie Datum,
              Wunschzeit und Personenzahl in unserer Beispielanfrage.
            </p>
            <Link prefetch={false} href="/kontakt" className="cafe-button">
              Tischanfrage ausprobieren <Arrow />
            </Link>
          </div>
          <div>
            <h3>Beispiel-Öffnungszeiten</h3>
            <dl className="hours-list">
              {openingHours.map((h) => (
                <div key={h.day}>
                  <dt>{h.day}</dt>
                  <dd>{h.time} Uhr</dd>
                </div>
              ))}
            </dl>
            <p className="small-note">
              Vogel ist ein fiktives Café in Zürich. Es gibt keinen realen
              Standort; die Demo reserviert keine Tische.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

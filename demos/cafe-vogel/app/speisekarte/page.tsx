import type { Metadata } from "next";
import Link from "next/link";
import { menuSections } from "../data/menu";
import Arrow from "../components/Arrow";
export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Frühstück, Patisserie, Kaffee und Torten: die übersichtliche Beispielkarte des fiktiven Café Vogel mit Preisen in CHF.",
};
const ids = ["fruehstueck", "backwaren", "kaffee", "torten"];
const labels = ["Frühstück", "Backwaren", "Kaffee & Tee", "Torten"];
export default function Menu() {
  return (
    <>
      <section className="page-intro wrap menu-intro">
        <h1>
          Für jeden Appetit
          <br />
          <em>ein kleines Glück.</em>
        </h1>
        <p>
          Vom ersten Kaffee bis zum letzten Krümel: Entdecken Sie die
          Speisekarte von Vogel.
        </p>
        <p className="small-note">
          Alle Angaben sind Teil des fiktiven Konzepts. Beispielpreise in CHF,
          inkl. MwSt.
        </p>
      </section>
      <div className="menu-navigation">
        <nav className="wrap" aria-label="Kategorien der Speisekarte">
          {ids.map((id, i) => (
            <a href={`#${id}`} key={id}>
              {labels[i]}
              <Arrow />
            </a>
          ))}
        </nav>
      </div>
      <div className="wrap menu-sections">
        {menuSections.map((section, i) => (
          <section key={section.title} id={ids[i]} className="menu-section">
            <div className="menu-section-heading">
              <h2>{section.title}</h2>
              <p>{section.subtitle}</p>
            </div>
            <div className="menu-list">
              {section.items.map((item) => (
                <article className="menu-item" key={item.name}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <span className="menu-price">
                    {item.price === "auf Anfrage"
                      ? item.price
                      : `${item.price} CHF`}
                  </span>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <section className="menu-note section-space">
        <div className="wrap note-grid">
          <div>
            <h2>Gut zu wissen.</h2>
            <p>
              Diese Karte zeigt ein mögliches Angebot. Sie ist keine
              verbindliche Auskunft zu Zutaten oder Allergenen. In einem echten
              Café klären Sie besondere Ernährungsbedürfnisse bitte direkt mit
              dem Team.
            </p>
          </div>
          <div>
            <h3>Lust auf einen Platz am Fenster?</h3>
            <p>
              Testen Sie eine Tischanfrage mit Datum, Wunschzeit und
              Personenzahl. Es wird nichts versendet.
            </p>
            <Link prefetch={false} href="/kontakt" className="cafe-button">
              Tischdemo ausprobieren <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

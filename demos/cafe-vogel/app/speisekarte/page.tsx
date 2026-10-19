import type { Metadata } from "next";
import Link from "next/link";
import { menuSections } from "../data/menu";
import Arrow from "../components/Arrow";
export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Frühstück, Gebäck, Kaffee und Torten: die Beispiel-Speisekarte des fiktiven Cafés Vogel mit Preisen in CHF und einer Tischanfrage zum Ausprobieren.",
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
          Frühstück zu zweit, eine Kaffeepause oder Kuchen zum Teilen:
          Entdecken Sie das Beispielangebot von Vogel.
        </p>
        <p className="small-note">
          Fiktives Angebot. Alle Preise sind Beispiele in CHF, inklusive
          Mehrwertsteuer.
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
              Diese Speisekarte zeigt ein fiktives Angebot. Die Angaben zu
              Zutaten und Allergenen sind nicht verbindlich. Wenn Sie bestimmte
              Lebensmittel nicht vertragen oder meiden möchten, fragen Sie in
              einem echten Café bitte direkt beim Team nach.
            </p>
          </div>
          <div>
            <h3>Lust auf einen Platz am Fenster?</h3>
            <p>
              Probieren Sie eine Tischanfrage mit Datum, Wunschzeit und
              Personenzahl aus. Die Demo versendet nichts und reserviert
              keinen Tisch.
            </p>
            <Link prefetch={false} href="/kontakt" className="cafe-button">
              Tischanfrage ausprobieren <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

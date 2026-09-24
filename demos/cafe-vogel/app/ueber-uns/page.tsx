import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "../components/Arrow";
export const metadata: Metadata = {
  title: "Über Vogel",
  description:
    "Die Idee hinter Café Vogel: ein warmer Treffpunkt für Kaffee, Konditorei und kleine Pausen. Fiktives Gestaltungskonzept von SilvanDigital.",
};
export default function About() {
  return (
    <>
      <section className="wrap page-intro about-intro">
        <h1>
          Für die kleinen
          <br />
          <em>Pausen im Leben.</em>
        </h1>
        <p>
          Vogel ist die Idee eines Cafés, das zum Bleiben einlädt. Mit dem Duft
          von Kaffee, Freude am Backhandwerk und Platz für Begegnungen.
        </p>
      </section>
      <section className="wrap about-story section-space">
        <figure>
          <Image
            src="/demos/cafe/team-foto.webp"
            width={1600}
            height={1067}
            alt="Eine Person siebt Mehl auf eine Arbeitsfläche in einer Backstube"
            priority
            sizes="(max-width:700px) 90vw, 50vw"
          />
          <figcaption>
            Handwerk als Inspiration · Symbolbild, kein Teamfoto
          </figcaption>
        </figure>
        <div>
          <h2>
            Eine gute Idee
            <br />
            <em>braucht gute Zutaten.</em>
          </h2>
          <p className="large-copy">
            Wärme. Sorgfalt. Und etwas Zeit füreinander.
          </p>
          <p>
            Das Konzept verbindet eine klassische Konditorei mit einem
            unkomplizierten Quartiercafé. Auf der Beispielkarte treffen Gipfeli
            und Sauerteigbrot auf Cappuccino, Linzer Torte und einen
            Frühstückskorb zum Teilen.
          </p>
          <p>
            Vogel ist eine fiktive Café-Idee von SilvanDigital. Die gezeigten
            Bilder veranschaulichen die Atmosphäre und das Handwerk, für die
            dieses Konzept steht.
          </p>
        </div>
      </section>
      <section className="concept-section section-space">
        <div className="wrap">
          <h2>
            Was Vogel
            <br />
            ausmachen soll.
          </h2>
          <div className="concept-list">
            <article>
              <h3>Freude am Handwerk.</h3>
              <p>
                Die Backstube ist das Herz der Idee. Gebäck, Brot und Patisserie
                geben dem Café seinen Charakter und der Speisekarte ihren
                Schwerpunkt.
              </p>
            </article>
            <article>
              <h3>Platz für den Alltag.</h3>
              <p>
                Ein Espresso vor der Arbeit, Frühstück zu zweit oder Kuchen am
                Nachmittag: Das Konzept lässt Raum für verschiedene Arten von
                Pause.
              </p>
            </article>
            <article>
              <h3>Nähe statt Eile.</h3>
              <p>
                Warme Materialien und eine persönliche Atmosphäre stehen für
                einen Treffpunkt, an dem man sich gerne noch einen Moment Zeit
                nimmt.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="wrap section-space about-invitation">
        <div>
          <h2>
            Ihr nächster
            <br />
            <em>Lieblingsmoment?</em>
          </h2>
          <p>
            Beginnen Sie mit der Speisekarte. Oder probieren Sie aus, wie eine
            Tischanfrage auf einer solchen Website funktioniert.
          </p>
          <div className="hero-actions">
            <Link prefetch={false} href="/speisekarte" className="cafe-button">
              Zur Speisekarte <Arrow />
            </Link>
            <Link prefetch={false} href="/kontakt" className="cafe-text-link">
              Zur Tischdemo <Arrow />
            </Link>
          </div>
        </div>
        <figure>
          <Image
            src="/demos/cafe/cafe-interior.webp"
            width={1280}
            height={1923}
            alt="Holztische und gemütliche Sitzplätze in einem Café"
            loading="lazy"
            sizes="(max-width:700px) 90vw, 45vw"
          />
          <figcaption>
            So könnte ein Lieblingsplatz aussehen. · Symbolbild
          </figcaption>
        </figure>
      </section>
    </>
  );
}

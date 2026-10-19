import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Arrow from "../components/Arrow";
export const metadata: Metadata = {
  title: "Über Vogel",
  description:
    "Die Idee hinter dem fiktiven Café Vogel: Kaffee, Gebäck und Zeit füreinander. Eine Beispiel-Website von SilvanDigital.",
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
          Kaffeeduft, feines Gebäck und Zeit füreinander. Vogel ist die Idee
          eines Quartiercafés, in dem aus einer kurzen Pause gerne ein
          längerer Besuch wird.
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
            Backhandwerk als Inspiration. Symbolbild, kein Teamfoto.
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
            Die Idee verbindet eine klassische Konditorei mit einem
            unkomplizierten Quartiercafé. Die Beispiel-Speisekarte reicht von
            Gipfeli und Sauerteigbrot über Cappuccino und Linzer Torte bis zum
            Frühstückskorb für zwei.
          </p>
          <p>
            Vogel ist ein fiktives Café von SilvanDigital. Die Bilder
            zeigen, welche Atmosphäre und welches Handwerk zu dieser Idee
            passen könnten.
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
                Eine eigene Backstube steht im Mittelpunkt der Café-Idee.
                Brot, Gebäck und feine Süssigkeiten geben der Speisekarte
                ihren Schwerpunkt.
              </p>
            </article>
            <article>
              <h3>Platz für den Alltag.</h3>
              <p>
                Ein Espresso vor der Arbeit, Frühstück zu zweit oder Kuchen am
                Nachmittag. Vogel ist als Ort für kleine und grosse Pausen
                gedacht.
              </p>
            </article>
            <article>
              <h3>Nähe statt Eile.</h3>
              <p>
                Warme Materialien und gemütliche Sitzplätze sollen zum Bleiben
                einladen. Ein Treffpunkt, an dem ein gutes Gespräch genauso
                Platz hat wie ein zweiter Kaffee.
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
            Sehen Sie sich die Speisekarte an oder probieren Sie eine
            Tischanfrage aus. Sie können Ihre Angaben prüfen und ändern;
            die Demo versendet nichts.
          </p>
          <div className="hero-actions">
            <Link prefetch={false} href="/speisekarte" className="cafe-button">
              Zur Speisekarte <Arrow />
            </Link>
            <Link prefetch={false} href="/kontakt" className="cafe-text-link">
              Tischanfrage ausprobieren <Arrow />
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
            So könnte Ihr Lieblingsplatz aussehen. Symbolbild.
          </figcaption>
        </figure>
      </section>
    </>
  );
}

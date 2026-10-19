"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import InquiryForm, { type Selection } from "../components/InquiryForm";
const nav = [
  ["leistungen", "Leistungen"],
  ["projekte", "Projektideen"],
  ["ueber", "Arbeitsweise"],
  ["kontakt", "Kontakt"],
];
const services = [
  {
    title: "Renovationen",
    detail: "Mehr Raum für Ihren Alltag.",
    text: "Sie möchten Ihre Küche erneuern, das Bad umbauen oder einen Raum anders nutzen? Am Anfang steht die Frage, was bleiben kann und welche Arbeiten nötig sind.",
    scope: "Innenausbau · Küche · Bad",
  },
  {
    title: "Malerarbeiten",
    detail: "Neue Farbe für Ihre Räume.",
    text: "Ein neuer Anstrich lässt einen Raum anders wirken. Dazu gehören der passende Farbton, sorgfältig vorbereitete Wände und sauber ausgeführte Arbeiten. Auch Türen und andere lackierte Flächen können aufgefrischt werden.",
    scope: "Wände · Decken · Lackierarbeiten",
  },
  {
    title: "Bodenbeläge",
    detail: "Ein gutes Gefühl unter den Füssen.",
    text: "Ein Boden soll gut aussehen und zu Ihrem Alltag passen. Wie stark wird er genutzt, wie viel Pflege braucht er und wie fühlt er sich an? Diese Fragen helfen bei der Materialwahl.",
    scope: "Parkett · Vinyl · Platten",
  },
  {
    title: "Fassade & Aussen",
    detail: "Ein Haus mit Ausstrahlung.",
    text: "Eine gepflegte Fassade schützt das Haus und prägt seinen ersten Eindruck. Ob neuer Anstrich, sichtbare Schäden oder eine Erneuerung: Vor der Planung wird der Zustand geprüft. Auch Balkone und Terrassen gehören dazu.",
    scope: "Fassaden · Balkone · Terrassen",
  },
];
const projects = [
  {
    title: "Licht. Holz. Mehr Ruhe.",
    category: "Wohnen & Innenausbau",
    image: "proj-1",
    service: "Renovationen",
    alt: "Heller Raum mit einem Boden in Holzoptik, eingebauten Regalen und grossem Fenster",
    text: "Helle Wände, ein durchgehender Boden und platzsparende Einbauten zeigen, wie sich ein kleiner Raum übersichtlich gestalten lässt.",
    question:
      "Wie nutzen Sie den Raum heute, und was soll sich verändern? Welche Regale oder Einbauten möchten Sie behalten?",
  },
  {
    title: "Ein frischer erster Eindruck.",
    category: "Fassade & Farbe",
    image: "proj-2",
    service: "Fassade & Aussen",
    alt: "Helle Hausfassade mit gelben Farbbändern und weissem Balkongeländer",
    text: "Farben können Balkone, Fenster und Gebäudekanten betonen. Sie sollten zum Haus und seiner Umgebung passen, wie die hellen Flächen und gelben Akzente in diesem Beispiel.",
    question:
      "Geht es um einen neuen Farbton, sichtbare Schäden oder eine umfassendere Erneuerung?",
  },
  {
    title: "Platz für den Alltag.",
    category: "Bad & Renovation",
    image: "proj-3",
    service: "Renovationen",
    alt: "Bad mit hellen Wandplatten, Badewanne, WC und Waschtisch",
    text: "Was brauchen Sie morgens und abends im Bad? Gut erreichbare Ablagen, passende Staumöglichkeiten und eine klare Aufteilung helfen im Alltag. Helle Oberflächen lassen den Raum freundlich wirken.",
    question:
      "Was fehlt im bestehenden Bad? Welche Anschlüsse und welche Ausstattung sollen erhalten bleiben?",
  },
  {
    title: "Natürlich von Grund auf.",
    category: "Boden & Material",
    image: "proj-4",
    service: "Bodenbeläge",
    alt: "Nahaufnahme einer hellen Holzoberfläche im Sonnenlicht",
    text: "Farbton und Maserung prägen die Wirkung eines Holzbodens. Eine Materialprobe zeigt, wie der Boden bei Ihnen zu Hause aussieht und wie sich die Oberfläche anfühlt.",
    question:
      "Wie stark wird der Boden beansprucht? Ist Aufarbeiten möglich oder wird ein neuer Belag gebraucht?",
  },
];
const asset = (name: string) => `/demos/handwerk/${name}.webp`;
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selection, setSelection] = useState<Selection>({
    service: "Noch offen",
    project: "",
  });
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const query = matchMedia("(min-width: 900px)");
    const resize = () => {
      if (query.matches) setMenuOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    query.addEventListener("change", resize);
    document.addEventListener("keydown", escape);
    return () => {
      query.removeEventListener("change", resize);
      document.removeEventListener("keydown", escape);
    };
  }, [menuOpen]);
  function choose(
    event: MouseEvent<HTMLAnchorElement>,
    service: string,
    project = "",
  ) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    setSelection({ service, project });
    requestAnimationFrame(() =>
      document
        .getElementById("inquiry-service")
        ?.focus({ preventScroll: true }),
    );
  }
  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt
      </a>
      <div className="demo-banner">
        Ein fiktiver Handwerksbetrieb. Eine Website-Demo von{" "}
        <a href="https://silvandigital.ch/work/">SilvanDigital ↗</a>
      </div>
      <header className="site-header">
        <a
          className="brand"
          href="#start"
          aria-label="Steiner Bau – zum Anfang"
        >
          <span className="brand-symbol" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            steiner<span className="brand-sub">Bau & Handwerk</span>
          </span>
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Schliessen" : "Menü"}
          <span aria-hidden="true">{menuOpen ? "−" : "+"}</span>
        </button>
        <nav
          id="navigation"
          aria-label="Hauptnavigation"
          className={menuOpen ? "navigation is-open" : "navigation"}
        >
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main id="inhalt">
        <section id="start" className="hero-stage" aria-labelledby="hero-title">
          <div className="hero-composition">
            <div className="hero-copy">
              <h1 id="hero-title">
                Aus Räumen
                <br />
                wird ein <em>Zuhause.</em>
              </h1>
              <p>
                Renovationen, Malerarbeiten und neue Böden für ein Zuhause,
                das zu Ihrem Alltag passt. In Zürich und Umgebung.
              </p>
              <div className="hero-actions">
                <a className="button hero-primary" href="#kontakt">
                  Projekt besprechen{" "}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a className="hero-secondary" href="#projekte">
                  Ideen entdecken{" "}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M12 4v16M6 14l6 6 6-6" />
                  </svg>
                </a>
              </div>
              <div className="hero-craft">
                <span>Mit Blick fürs Ganze.</span>
                <span>Und Gespür fürs Detail.</span>
              </div>
            </div>
            <figure className="hero-visual">
              <Image
                src={asset("hero-zuhause")}
                alt="Gestaltungsidee eines warmen Wohnraums mit Eichenboden, Einbauten und grossen Fenstern im Sonnenlicht"
                width={1536}
                height={1024}
                priority
                sizes="(max-width: 700px) 100vw, 60vw"
              />
              <figcaption>So könnte es aussehen. · Symbolbild</figcaption>
            </figure>
          </div>
          <div className="hero-foundation">
            <p>
              Bestehendes bewahren.
              <br />
              <strong>Neues möglich machen.</strong>
            </p>
            <a href="#leistungen">
              Renovationen · Malerarbeiten · Böden · Fassaden
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </section>
        <section id="leistungen" className="section-wrap section-space">
          <div className="section-heading">
            <h2>
              Was haben
              <br />
              Sie vor?
            </h2>
            <p>
              Vom neuen Anstrich bis zur Renovation: Finden Sie den Bereich,
              der zu Ihrem Vorhaben passt.
            </p>
          </div>
          <div className="services">
            {services.map((s) => (
              <article className="service" key={s.title}>
                <h3>{s.title}</h3>
                <div>
                  <h4>{s.detail}</h4>
                  <p>{s.text}</p>
                  <p className="service-scope">{s.scope}</p>
                </div>
                <a
                  className="service-link"
                  href="#kontakt"
                  onClick={(e) => choose(e, s.title)}
                  aria-label={`${s.title} anfragen`}
                >
                  Projekt anfragen <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </section>
        <section id="projekte" className="projects-section section-space">
          <div className="section-wrap">
            <div className="section-heading">
              <h2>
                Eine Idee.
                <br />
                Viele Möglichkeiten.
              </h2>
              <div>
                <p>
                  Lassen Sie sich von Räumen, Farben und Materialien für Ihr
                  eigenes Vorhaben inspirieren.
                </p>
                <p className="muted">
                  Die Bilder zeigen Gestaltungsideen dieser Demo und keine
                  ausgeführten Kundenprojekte.
                </p>
              </div>
            </div>
            <div className="projects-grid">
              {projects.map((p) => (
                <article className="project" key={p.title}>
                  <div className="project-image">
                    <Image
                      src={asset(p.image)}
                      alt={p.alt}
                      width={1000}
                      height={p.image === "proj-4" ? 1500 : 667}
                      loading="lazy"
                      sizes="(max-width: 600px) 90vw, 45vw"
                    />
                  </div>
                  <p className="project-category">{p.category}</p>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <details>
                    <summary>
                      Fragen für die Planung{" "}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{p.question}</p>
                  </details>
                  <a
                    className="text-link"
                    href="#kontakt"
                    onClick={(e) => choose(e, p.service, p.title)}
                    aria-label={`Projektidee übernehmen: ${p.title}`}
                  >
                    Diese Idee besprechen <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="ueber"
          className="section-wrap section-space about-section"
        >
          <div className="about-copy">
            <h2>
              Handwerk beginnt
              <br />
              mit einem Gespräch.
            </h2>
            <p className="large-copy">
              Ihr Zuhause soll zu Ihnen passen. Deshalb stehen Ihre Wünsche
              am Anfang.
            </p>
            <p>
              Steiner Bau ist in dieser Demo ein fiktiver Handwerksbetrieb.
              Das Konzept zeigt, wie verständliche Absprachen und ein
              sorgfältiger Umgang mit dem Bestehenden eine Renovation
              begleiten können.
            </p>
            <p>
              Was soll sich verändern? Was möchten Sie behalten? Daraus
              entsteht ein Plan, der Ihre Fragen, Wünsche und Möglichkeiten
              berücksichtigt.
            </p>
            <a className="text-link" href="#ablauf">
              So könnte Ihr Projekt starten <span aria-hidden="true">↓</span>
            </a>
          </div>
          <figure>
            <Image
              src={asset("hero-handwerk")}
              alt="Ein Handwerker glättet eine Wand bei Renovationsarbeiten"
              width={1800}
              height={1200}
              loading="lazy"
              sizes="(max-width: 600px) 90vw, 45vw"
            />
            <figcaption>Einblick ins Handwerk · Symbolbild</figcaption>
          </figure>
        </section>
        <section id="ablauf" className="process-section section-space">
          <div className="section-wrap">
            <div className="section-heading">
              <h2>
                Von der Idee
                <br />
                zum nächsten Schritt.
              </h2>
              <p>
                Sie sollen wissen, was als Nächstes passiert. So könnte die
                Zusammenarbeit mit einem Handwerksbetrieb ablaufen.
              </p>
            </div>
            <ol className="process-list">
              <li>
                <h3>Erst verstehen.</h3>
                <p>
                  Sie beschreiben Ihre Wünsche. Gemeinsam wird geklärt, was
                  bereits vorhanden ist, was bleiben soll und welche Fragen
                  noch offen sind.
                </p>
              </li>
              <li>
                <h3>Gemeinsam planen.</h3>
                <p>
                  Die geplanten Arbeiten, Materialien, Kosten und Termine
                  werden vor dem Start besprochen und in einer Offerte
                  festgehalten.
                </p>
              </li>
              <li>
                <h3>Sorgfältig umsetzen.</h3>
                <p>
                  Die Arbeiten werden aufeinander abgestimmt und nach dem
                  vereinbarten Plan ausgeführt. Zum Abschluss wird das Ergebnis
                  gemeinsam geprüft.
                </p>
              </li>
            </ol>
          </div>
        </section>
        <section
          className="section-wrap section-space faq-section"
          aria-labelledby="fragen-title"
        >
          <h2 id="fragen-title">
            Vor dem
            <br />
            ersten Gespräch.
          </h2>
          <div className="faq-list">
            <details>
              <summary>
                Was gehört in eine erste Anfrage?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Eine kurze Beschreibung reicht: Was möchten Sie verändern,
                wo soll gearbeitet werden und wann wünschen Sie die Umsetzung?
                Sie müssen noch keine genauen Masse oder Materialien kennen.
                Diese Angaben können später ergänzt werden.
              </p>
            </details>
            <details>
              <summary>
                Kann ich mehrere Arbeiten kombinieren?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Ja. Beschreiben Sie die gewünschten Arbeiten gemeinsam im
                Textfeld. Wählen Sie den wichtigsten Bereich als Leistung
                oder «Noch offen», wenn Sie sich noch nicht festlegen möchten.
              </p>
            </details>
            <details>
              <summary>
                Kann ich hier einen Auftrag erteilen?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Nein. Steiner Bau ist ein fiktiver Betrieb. Das Formular zeigt
                eine Vorschau Ihrer Beispielanfrage. Die Angaben bleiben nur
                in der geöffneten Seite. Es wird nichts versendet oder
                dauerhaft gespeichert, und es entsteht kein Auftrag.
              </p>
            </details>
            <details>
              <summary>
                Warum stehen hier keine Preise?<span aria-hidden="true">+</span>
              </summary>
              <p>
                Der Aufwand hängt vom Zustand der Räume, den Flächen und den
                gewünschten Materialien ab. Ein echter Betrieb würde die Kosten
                nach der Abklärung in einer Offerte festhalten. Diese fiktive
                Demo macht keine verbindlichen Preisangaben.
              </p>
            </details>
          </div>
        </section>
        <section id="kontakt" className="contact-section section-space">
          <div className="section-wrap contact-grid">
            <div className="contact-intro">
              <h2>
                Was darf sich
                <br />
                bei Ihnen verändern?
              </h2>
              <p>
                Ein neuer Boden, frisch gestrichene Wände oder ein renoviertes
                Bad: Beschreiben Sie Ihre Idee in wenigen Sätzen.
              </p>
              <p className="contact-demo">
                Probieren Sie das Formular mit Beispieldaten aus. Die Anfrage
                wird nicht versendet. Ihre Angaben bleiben nur in dieser
                geöffneten Seite.
              </p>
              <a className="text-link" href="https://silvandigital.ch/contact/">
                Eine solche Website für Ihren Betrieb?{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <InquiryForm
              selection={selection}
              onSelectionChange={setSelection}
            />
          </div>
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <a className="brand footer-brand" href="#start">
          steiner<span className="brand-sub">Bau & Handwerk</span>
        </a>
        <p>
          Fiktiver Betrieb · Zürich und Umgebung
          <br />
          Konzept und Umsetzung:{" "}
          <a href="https://silvandigital.ch/">SilvanDigital</a>
        </p>
        <a className="text-link" href="https://silvandigital.ch/work/">
          Weitere Webprojekte <span aria-hidden="true">↗</span>
        </a>
        <p className="footer-note">
          Diese Website zeigt ein Gestaltungskonzept für einen fiktiven Betrieb.
          Die Bilder dienen als Inspiration und zeigen keine Kundenreferenzen.
          Aufträge oder Buchungen sind hier nicht möglich. Das Formular
          versendet keine Daten.
        </p>
      </footer>
    </>
  );
}

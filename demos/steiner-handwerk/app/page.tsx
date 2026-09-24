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
    detail: "Bestehendes neu denken.",
    text: "Ein Raum soll mehr können? Beim Umbau greifen Grundriss, Oberflächen und Einbauten ineinander. Am Anfang stehen Ihre Wünsche und der Blick auf das, was bereits da ist.",
    scope: "Innenausbau · Küche · Bad",
  },
  {
    title: "Malerarbeiten",
    detail: "Frische, die bleibt.",
    text: "Ein neuer Anstrich verändert einen ganzen Raum. Farbton, Licht und Untergrund gehören dabei zusammen – vom sorgfältigen Abdecken bis zur passenden Oberfläche.",
    scope: "Wände · Decken · Lackierarbeiten",
  },
  {
    title: "Bodenbeläge",
    detail: "Ein gutes Gefühl unter den Füssen.",
    text: "Warm, robust oder besonders pflegeleicht: Der richtige Boden passt zu Ihrem Alltag. Material, Aufbau und Übergänge werden gemeinsam betrachtet.",
    scope: "Parkett · Vinyl · Fliesen",
  },
  {
    title: "Fassade & Aussen",
    detail: "Ein Haus mit Ausstrahlung.",
    text: "Aussenflächen prägen den ersten Eindruck und schützen das Gebäude. Vor einer Erneuerung werden Zustand, Beanspruchung und Material aufeinander abgestimmt.",
    scope: "Fassaden · Balkone · Terrassen",
  },
];
const projects = [
  {
    title: "Licht. Holz. Mehr Ruhe.",
    category: "Wohnen & Innenausbau",
    image: "proj-1",
    service: "Renovationen",
    alt: "Heller Raum mit Holzfussboden, niedrigen Einbauten und grossem Fenster",
    text: "Helle Wände, ein durchgehender Holzboden und zurückhaltende Einbauten lassen einen kompakten Raum ruhig wirken.",
    question:
      "Welche Einbauten bleiben? Wie nutzen Sie den Raum heute – und was soll sich verändern?",
  },
  {
    title: "Ein frischer erster Eindruck.",
    category: "Fassade & Farbe",
    image: "proj-2",
    service: "Fassade & Aussen",
    alt: "Hausfassade als Inspiration für die Gestaltung von Aussenflächen",
    text: "Die Farbgestaltung einer Fassade verbindet das Haus mit seiner Umgebung. Struktur und Details geben der Fläche ihren Charakter.",
    question:
      "Geht es um einen neuen Farbton, sichtbare Schäden oder eine umfassendere Erneuerung?",
  },
  {
    title: "Platz für den Alltag.",
    category: "Bad & Renovation",
    image: "proj-3",
    service: "Renovationen",
    alt: "Bad mit hellen Fliesen, Badewanne und Waschtisch",
    text: "Ein stimmiges Bad beginnt mit den täglichen Abläufen. Helle Oberflächen und eine klare Aufteilung bilden dafür die Grundlage.",
    question:
      "Was fehlt im bestehenden Bad? Welche Anschlüsse und welche Ausstattung sollen erhalten bleiben?",
  },
  {
    title: "Natürlich von Grund auf.",
    category: "Boden & Material",
    image: "proj-4",
    service: "Bodenbeläge",
    alt: "Nahaufnahme einer hellen Holzoberfläche im Sonnenlicht",
    text: "Maserung, Farbton und Haptik verändern das Raumgefühl. Eine Materialprobe im eigenen Licht hilft bei der Entscheidung.",
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
        <section id="start" className="hero section-wrap">
          <div className="hero-heading">
            <h1>
              Gute Räume.
              <br />
              Für das <em>echte Leben.</em>
            </h1>
            <div className="hero-intro">
              <p>
                Renovieren. Auffrischen. Wieder wohlfühlen. Handwerk rund ums
                Zuhause in Zürich und Umgebung.
              </p>
              <a className="button" href="#kontakt">
                Ihr Projekt besprechen <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="#leistungen">
                Leistungen entdecken <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <figure className="hero-image">
            <Image
              src={asset("proj-1")}
              alt="Lichtdurchfluteter Innenraum mit hellem Holzboden und passgenauen Einbauten"
              width={1000}
              height={667}
              priority
              sizes="90vw"
            />
            <figcaption>
              <span>Aus Bestehendem wird Ihr Zuhause.</span>
              <span>Bild zur Gestaltungsidee · kein Kundenprojekt</span>
            </figcaption>
          </figure>
          <div className="intro-line">
            <p>
              Vom einzelnen Raum
              <br />
              bis zum neuen Wohngefühl.
            </p>
            <p>
              Gutes Handwerk beginnt mit Zuhören. Was soll bleiben, was darf
              sich verändern? Daraus entsteht ein Vorhaben, das zu Ihrem Zuhause
              passt.
            </p>
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
              Vier Leistungsbereiche, ein gemeinsamer Blick auf Ihr Zuhause.
              Wählen Sie, wo die Veränderung beginnt.
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
                  Materialien, Farben und Räume als Inspiration für Ihr
                  Vorhaben.
                </p>
                <p className="muted">
                  Die folgenden Beispiele sind Gestaltungsideen dieser Demo,
                  keine ausgeführten Kundenprojekte.
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
                      Was bei dieser Idee wichtig ist{" "}
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
              Ein Zuhause ist persönlich. Die Arbeit daran sollte es auch sein.
            </p>
            <p>
              Steiner Bau steht in diesem Gestaltungskonzept für einen nahbaren
              Handwerksbetrieb: verständliche Absprachen, ein sorgfältiger
              Umgang mit Bestehendem und ein klarer Blick auf die nächsten
              Schritte.
            </p>
            <p>
              So wird aus einer ersten Idee ein besprechbares Vorhaben – mit
              Raum für Ihre Fragen.
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
                Ein guter Ablauf schafft Orientierung. So könnte die
                Zusammenarbeit mit einem Handwerksbetrieb aussehen.
              </p>
            </div>
            <ol className="process-list">
              <li>
                <h3>Erst verstehen.</h3>
                <p>
                  Sie erzählen, was Sie verändern möchten. Wünsche, Bestand und
                  offene Fragen bilden die Grundlage.
                </p>
              </li>
              <li>
                <h3>Gemeinsam planen.</h3>
                <p>
                  Umfang, Materialien, Kosten und Termine werden vor dem Start
                  besprochen und im Angebot festgehalten.
                </p>
              </li>
              <li>
                <h3>Sorgfältig umsetzen.</h3>
                <p>
                  Die vereinbarten Arbeiten werden koordiniert. Zum Abschluss
                  wird das Ergebnis gemeinsam angeschaut.
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
                Was sollte ich für eine Anfrage wissen?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Eine kurze Beschreibung reicht für den Anfang: Was soll gemacht
                werden, wo liegt das Objekt und wann wäre die Umsetzung
                gewünscht? Masse oder Materialwünsche können später ergänzt
                werden.
              </p>
            </details>
            <details>
              <summary>
                Kann ich mehrere Arbeiten kombinieren?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Ja, beschreiben Sie die Arbeiten zusammen im Textfeld. Wählen
                Sie den Schwerpunkt als Leistungsbereich oder «Noch offen», wenn
                Sie sich noch nicht festlegen möchten.
              </p>
            </details>
            <details>
              <summary>
                Kann ich hier einen Auftrag erteilen?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Nein. Steiner Bau ist ein fiktiver Betrieb. Das Formular zeigt
                lediglich eine lokale Vorschau Ihrer Angaben. Es wird nichts
                gesendet oder gespeichert und es entsteht kein Auftrag.
              </p>
            </details>
            <details>
              <summary>
                Warum stehen hier keine Preise?<span aria-hidden="true">+</span>
              </summary>
              <p>
                Aufwand und Kosten hängen unter anderem von Zustand, Fläche und
                Material ab. Für diese fiktive Website werden deshalb keine
                Angebote oder verbindlichen Preisangaben gemacht.
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
                Ein neuer Boden, frische Wände oder ein ganzer Raum: Halten Sie
                Ihre Idee fest.
              </p>
              <p className="contact-demo">
                Probieren Sie den Anfrageablauf aus. Ihre Angaben bleiben nur in
                dieser geöffneten Seite. Bitte verwenden Sie Testdaten.
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
          Fiktiver Betrieb · Zürich & Umgebung
          <br />
          Konzept und Umsetzung:{" "}
          <a href="https://silvandigital.ch/">SilvanDigital</a>
        </p>
        <a className="text-link" href="https://silvandigital.ch/work/">
          Weitere Webprojekte <span aria-hidden="true">↗</span>
        </a>
        <p className="footer-note">
          Diese Website ist eine Portfolio-Demo. Die Bilder zeigen
          Gestaltungsideen und Symbolmotive. Keine Kundenreferenzen, keine
          Buchung, kein Versand von Formulardaten.
        </p>
      </footer>
    </>
  );
}

import type { Metadata } from "next";
import { allServices } from "@/content/services";
export const metadata: Metadata = { title: "Salon Lumière | Fiktives Salonkonzept in Zürich", description: "Ein Salonkonzept mit Team, beispielhaften Leistungen und Richtpreisen. Die Terminanfrage lässt sich lokal ohne Versand ausprobieren." };
import Link from "next/link";

const highlights = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: "Präzision",
    text: "Jeder Schnitt mit höchster Sorgfalt und technischem Know-how ausgeführt.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Expertise",
    text: "Über 15 Jahre Erfahrung und kontinuierliche Weiterbildung bei führenden Häusern.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Leidenschaft",
    text: "Haar ist unser Handwerk und unsere Berufung – das spüren Sie bei jedem Besuch.",
  },
];

export default function Home() {
  return (
    <>
      <section className="salon-hero">
        <div className="salon-hero-copy">
          <h1>Ihr Haar.<br /><em>Ihre Geschichte.</em></h1>
          <p>Ein Schnitt, der zu Ihnen passt. Farbe, die Ihre Persönlichkeit unterstreicht. Und Zeit, die nur Ihnen gehört.</p>
          <div className="salon-hero-actions">
            <Link href="/kontakt" className="salon-button">Termin anfragen</Link>
            <Link href="/leistungen" className="salon-text-link">Leistungen & Preise <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="salon-hero-note">Salon Lumière <span>Haarkultur in Zürich</span></div>
        </div>
        <figure className="salon-hero-image">
          <img src="/demos/salon/hero-bg.jpg" alt="Helles Saloninterieur mit natürlichen Materialien und warmem Licht" width="1408" height="768" fetchPriority="high" />
          <figcaption>Raum für einen neuen Look.</figcaption>
        </figure>
      </section>

      {/* Intro section */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-charcoal font-semibold leading-tight mb-6">
              Wo Schönheit und Handwerk sich begegnen
            </h2>
            <p className="text-muted text-base leading-relaxed mb-4 font-body">
              Seit über einem Jahrzehnt ist der Salon Lumière eine Oase der Ruhe und
              des Stils im Herzen Zürichs. Wir glauben, dass ein guter Haarschnitt
              mehr ist als Ästhetik – er ist Ausdruck Ihrer Persönlichkeit.
            </p>
            <p className="text-muted text-base leading-relaxed mb-8 font-body">
              Unser erfahrenes Team nimmt sich Zeit für Sie: für Ihre Wünsche,
              Ihre Haarstruktur und Ihren individuellen Look.
            </p>
            <Link
              href="/ueber-uns"
              className="inline-flex items-center gap-3 text-sm font-medium text-charcoal tracking-wide group"
            >
              Unser Team kennenlernen
              <span className="h-px w-8 bg-gold group-hover:w-12 transition-all duration-300" />
            </Link>
          </div>

          {/* Salon interior image */}
          <div className="relative aspect-[4/3] bg-cream-dark overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/demos/salon/salon-interior.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Decorative frame */}
            <div className="absolute -bottom-3 -right-3 w-3/4 h-3/4 border border-gold/30 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-charcoal py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {highlights.map(({ icon, title, text }) => (
              <div key={title} className="flex flex-col items-start gap-4">
                <span className="text-gold">{icon}</span>
                <div>
                  <h3 className="font-display text-xl text-cream font-semibold mb-2">{title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed font-body">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <div className="text-center mb-12 md:mb-16">

          <h2 className="font-display text-3xl md:text-4xl text-charcoal font-semibold">
            Unsere Leistungen
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-cream-dark">
          {allServices.filter(({ id }) => ["herrenschnitt", "damenschnitt", "volltonfarbe", "straehnen"].includes(id)).map(({ id, name, price }) => (
            <Link href={`/leistungen#${id}`}
              key={id}
              className="bg-cream p-8 md:p-10 flex flex-col justify-between gap-4 hover:bg-charcoal group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg "
            >
              <h3 className="font-display text-xl text-charcoal group-hover:text-cream transition-colors duration-300">
                {name}
              </h3>
              <div className="flex items-end justify-between">
                <span className="text-gold text-sm font-body font-medium">Richtpreis {price}</span>
                <svg
                  className="text-muted group-hover:text-gold transition-colors duration-300"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/leistungen"
            className="inline-block px-8 py-4 bg-charcoal text-cream text-sm font-medium tracking-wide hover:bg-charcoal-light transition-colors duration-200"
          >
            Alle Leistungen ansehen
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gold py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal font-semibold mb-4">
            Bereit für Ihren neuen Look?
          </h2>
          <p className="text-charcoal text-base mb-8 font-body">
            Probieren Sie die Terminanfrage aus – ohne Versand und ohne echte Buchung.
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-10 py-4 bg-charcoal text-cream text-sm font-medium tracking-wide hover:bg-charcoal-light transition-colors duration-200"
          >
            Termin anfragen
          </Link>
        </div>
      </section>
    </>
  );
}

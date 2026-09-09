import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Unser Team | Salon Lumière – Demo", description: "Drei fiktive Teamprofile und die Geschichte des Salonkonzepts. Personen und Werdegänge sind illustrative Beispiele." };

const team = [
  {
    name: "Sophie Maurer",
    role: "Inhaberin & Chefstylistin",
    bio: "Sophie gründete Salon Lumière 2010 nach Stationen in Paris und London. Mit ihrer Leidenschaft für Präzisionsschnitte und moderne Colorationstechniken hat sie den Salon zu einem der angesehensten Häuser Zürichs geformt.",
    speciality: "Balayage, Präzisionsschnitte",
  },
  {
    name: "Lukas Bernhard",
    role: "Senior Colourist",
    bio: "Lukas ist seit 2015 Teil des Teams und hat sich auf komplexe Farbkompositionen spezialisiert. Seine Arbeit wurde in mehreren Schweizer Modemagazinen vorgestellt.",
    speciality: "Colorationen, Balayage",
  },
  {
    name: "Elena Costa",
    role: "Stylistin",
    bio: "Elena bringt mediterranes Flair und eine Begeisterung für natürliche Looks mit. Sie ist bekannt für ihre einfühlsame Beratung und ihr Gespür für den individuellen Stil jeder Kundin.",
    speciality: "Damenschnitte, Stylings",
  },
];

const values = [
  {
    title: "Qualität über Quantität",
    text: "Wir nehmen uns die Zeit, die jede Kundin und jeder Kunde verdient. Kein Stress, keine Hektik.",
  },
  {
    title: "Kontinuierliche Weiterbildung",
    text: "Unser Team besucht regelmässig internationale Trainings und Seminare – damit Sie immer von den neuesten Techniken profitieren.",
  },
  {
    title: "Nachhaltige Produkte",
    text: "Wir setzen auf umweltschonende Farben und Pflegeprodukte, die Haar und Haut schonend behandeln.",
  },
];

export default function UeberUns() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold tracking-[0.3em] text-xs uppercase font-body font-medium mb-4">
            Wer wir sind
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-cream font-semibold leading-tight max-w-2xl">
            Leidenschaft für das Haar. Respekt für den Menschen.
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-charcoal font-semibold mb-6">
              Eine fiktive Salongeschichte
            </h2>
            <div className="space-y-4 text-muted text-base leading-relaxed font-body">
              <p>
                Salon Lumière wurde 2010 von Sophie Maurer mit einer klaren Vision gegründet:
                ein Ort zu schaffen, an dem sich Menschen wirklich gesehen und verstanden fühlen.
                Nicht als Kundinnen und Kunden – sondern als Persönlichkeiten mit eigenen Wünschen,
                Träumen und Geschichten.
              </p>
              <p>
                Was als kleines Studio in Zürich-Wiedikon begann, hat sich zu einem der
                meistgeschätzten Haarsalons der Stadt entwickelt. Nicht durch Werbung,
                sondern durch Empfehlungen – die beste Form des Lobs.
              </p>
              <p>
                Heute arbeiten wir mit einem Team aus drei erfahrenen Stylistinnen und
                Stylisten, die denselben Anspruch teilen: Exzellenz in jedem Detail.
              </p>
            </div>
          </div>

          <div className="relative aspect-[3/4] bg-cream-dark flex flex-col items-center justify-center gap-6 p-8 text-center">
            <span aria-hidden="true" className="font-display text-8xl text-gold">SM</span>
            <p className="font-display text-2xl text-charcoal">Sophie Maurer</p>
            <p className="text-sm text-muted">Fiktive Gründerin im Designkonzept. Alle Teamprofile und Werdegänge sind erfunden.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream-dark py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold tracking-[0.25em] text-xs uppercase font-body font-medium mb-3">
              Das Team
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal font-semibold">
              Drei Profile im Salonkonzept
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map(({ name, role, bio, speciality }) => (
              <div key={name} className="bg-cream overflow-hidden group">
                {/* Photo */}
                <div className="aspect-[4/3] bg-charcoal/10 relative overflow-hidden">
                  <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-gold font-display text-6xl tracking-widest">{name.split(" ").map(part => part[0]).join("")}</div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl text-charcoal font-semibold">{name}</h3>
                  <p className="text-gold text-xs font-body tracking-wide uppercase mt-1 mb-3">
                    {role}
                  </p>
                  <p className="text-muted text-sm leading-relaxed font-body mb-4">{bio}</p>
                  <p className="text-xs text-muted font-body">
                    <span className="text-charcoal font-medium">Spezialisierung: </span>
                    {speciality}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="text-gold tracking-[0.25em] text-xs uppercase font-body font-medium mb-3">
            Unsere Werte
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-charcoal font-semibold">
            Was uns antreibt
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map(({ title, text }, i) => (
            <div key={title} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl text-gold font-semibold leading-none">
                  0{i + 1}
                </span>
                <div className="h-px flex-1 bg-cream-dark" />
              </div>
              <h3 className="font-display text-xl text-charcoal font-semibold">{title}</h3>
              <p className="text-muted text-sm leading-relaxed font-body">{text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12"><Link href="/kontakt" className="salon-button">Demo-Anfrage ausprobieren</Link></div>
      </section>
    </>
  );
}

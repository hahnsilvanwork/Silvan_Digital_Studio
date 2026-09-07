const team = [
  {
    name: "Sophie Maurer",
    role: "Inhaberin & Chefstylistin",
    bio: "Sophie gründete Salon Lumière 2010 nach Stationen in Paris und London. Mit ihrer Leidenschaft für Präzisionsschnitte und moderne Colorationstechniken hat sie den Salon zu einem der angesehensten Häuser Zürichs geformt.",
    speciality: "Balayage, Präzisionsschnitte",
    image: "/demos/salon/team-sophie.jpg",
  },
  {
    name: "Lukas Bernhard",
    role: "Senior Colourist",
    bio: "Lukas ist seit 2015 Teil des Teams und hat sich auf komplexe Farbkompositionen spezialisiert. Seine Arbeit wurde in mehreren Schweizer Modemagazinen vorgestellt.",
    speciality: "Colorationen, Balayage",
    image: null,
  },
  {
    name: "Elena Costa",
    role: "Stylistin",
    bio: "Elena bringt mediterranes Flair und eine Begeisterung für natürliche Looks mit. Sie ist bekannt für ihre einfühlsame Beratung und ihr Gespür für den individuellen Stil jeder Kundin.",
    speciality: "Damenschnitte, Stylings",
    image: null,
  },
];

const values = [
  {
    title: "Qualität über Quantität",
    text: "Wir nehmen uns die Zeit, die jede Kundin und jeder Kunde verdient. Kein Stress, keine Hektik.",
  },
  {
    title: "Kontinuierliche Weiterbildung",
    text: "Unser Team besucht regelmäßig internationale Trainings und Seminare – damit Sie immer von den neuesten Techniken profitieren.",
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
              Eine Geschichte voller Leidenschaft
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

          {/* Owner photo */}
          <div className="relative">
            <div className="aspect-[3/4] bg-cream-dark overflow-hidden">
              <div role="img" aria-label="Sophie Maurer im Salon"
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/demos/salon/team-sophie.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gold px-6 py-4">
              <p className="font-display text-3xl font-semibold text-charcoal">15+</p>
              <p className="text-xs text-charcoal font-body tracking-wide">Jahre Erfahrung</p>
            </div>
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
              Lernen Sie uns kennen
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map(({ name, role, bio, speciality, image }) => (
              <div key={name} className="bg-cream overflow-hidden group">
                {/* Photo */}
                <div className="aspect-[4/3] bg-charcoal/10 relative overflow-hidden">
                  {image ? (
                    <div
                      className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                      style={{
                        backgroundImage: `url('${image}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                      }}
                    />
                  ) : (
                    <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-gold font-display text-6xl tracking-widest">{name.split(" ").map(part => part[0]).join("")}</div>
                  )}
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
      </section>
    </>
  );
}

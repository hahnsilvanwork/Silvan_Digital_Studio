import Link from "next/link";

import type { Metadata } from "next";
import { services } from "@/content/services";

export const metadata: Metadata = { title: "Leistungen & Richtpreise | Salon Lumière – Demo", description: "Zwölf beispielhafte Salonleistungen mit Richtpreisen und Dauer. Leistung wählen und eine Terminanfrage ohne Versand ausprobieren." };

export default function Leistungen() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold tracking-[0.3em] text-xs uppercase font-body font-medium mb-4">
            Was wir tun
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-cream font-semibold leading-tight max-w-xl">
            Unsere Leistungen
          </h1>
          <p className="mt-6 text-cream/60 max-w-lg text-base leading-relaxed font-body">
            Von präzisen Schnitten über kunstvolle Colorationen bis hin zu
            regenerativen Pflegebehandlungen – wir bieten Ihnen das Beste.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <p className="mb-10 text-sm text-muted font-body">Richtpreise im fiktiven Salon: Die Beträge und Zeitangaben dienen als Orientierung. Haarlänge, Haarstruktur und Aufwand würden den Preis bestimmen.</p>
        <div className="space-y-16 md:space-y-24">
          {services.map(({ category, items }) => (
            <div key={category}>
              <div className="flex items-center gap-6 mb-8 md:mb-10">
                <h2 className="font-display text-2xl md:text-3xl text-charcoal font-semibold">
                  {category}
                </h2>
                <div className="flex-1 h-px bg-cream-dark" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(({ id, name, description, price, duration }) => (
                  <div
                    key={id}
                    id={id}
                    className="border border-cream-dark bg-cream p-6 md:p-8 flex flex-col gap-4 hover:border-gold/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-default"
                  >
                    <div>
                      <h3 className="font-display text-lg text-charcoal font-semibold mb-2">
                        {name}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed font-body">
                        {description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-cream-dark">
                      <span className="text-gold font-body font-semibold text-sm">Richtpreis {price}</span>
                      <span className="text-muted text-xs font-body">{duration}</span>
                    </div>
                    <Link href={`/kontakt?service=${id}#demo-form`} className="salon-text-link" aria-label={`${name}: Demo-Anfrage ausprobieren`}>Leistung anfragen ↗</Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-12 text-sm text-muted font-body italic border-l-2 border-gold/40 pl-4">
          Alle Angaben sind beispielhafte Richtpreise. In einem realen Salon würde der endgültige Preis nach Beratung vor der Behandlung vereinbart.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-cream-dark py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-charcoal font-semibold mb-4">
            Interesse geweckt?
          </h2>
          <p className="text-muted text-base mb-8 font-body">
            Probieren Sie eine unverbindliche Terminanfrage mit Ihrer Wunschleistung aus.
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-10 py-4 bg-charcoal text-cream text-sm font-medium tracking-wide hover:bg-charcoal-light transition-colors duration-200"
          >
            Demo-Anfrage ausprobieren
          </Link>
        </div>
      </section>
    </>
  );
}

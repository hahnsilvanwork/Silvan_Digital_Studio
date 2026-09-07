"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";

const hours = [
  { day: "Montag", time: "09:00 – 19:00" },
  { day: "Dienstag", time: "09:00 – 19:00" },
  { day: "Mittwoch", time: "09:00 – 19:00" },
  { day: "Donnerstag", time: "09:00 – 20:00" },
  { day: "Freitag", time: "09:00 – 20:00" },
  { day: "Samstag", time: "09:00 – 17:00" },
  { day: "Sonntag", time: "Geschlossen" },
];


const dayMap = [6, 0, 1, 2, 3, 4, 5]; // map JS day to our array index
const subscribeToDay = (notify: () => void) => {
  const timer = window.setInterval(notify, 60_000);
  return () => window.clearInterval(timer);
};
const currentDay = () => dayMap[new Date().getDay()];
const serverDay = () => null;

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (submitted) statusRef.current?.focus(); }, [submitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const todayIndex = useSyncExternalStore(subscribeToDay, currentDay, serverDay);

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-gold tracking-[0.3em] text-xs uppercase font-body font-medium mb-4">
            Wir freuen uns auf Sie
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-cream font-semibold leading-tight">
            Kontakt & Termin
          </h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: Info */}
          <div className="space-y-10">
            {/* Address */}
            <div>
              <h2 className="font-display text-xl text-charcoal font-semibold mb-4">
                Adresse
              </h2>
              <address className="not-italic text-muted font-body text-base space-y-1 leading-relaxed">
                <p className="font-medium text-charcoal">Salon Lumière</p>
                <p>Beispieladresse 42</p>
                <p>8001 Zürich</p>
                <p className="mt-3">
                  <a
                    href="#demo-form"
                    className="text-charcoal hover:text-gold transition-colors duration-200"
                  >
                    Kontakt im Demoformular
                  </a>
                </p>
                <p>
                  <a
                    href="#demo-form"
                    className="text-charcoal hover:text-gold transition-colors duration-200"
                  >
                    Keine reale Kontaktadresse
                  </a>
                </p>
              </address>
            </div>

            {/* Opening hours */}
            <div>
              <h2 className="font-display text-xl text-charcoal font-semibold mb-4">
                Öffnungszeiten
              </h2>
              <ul className="space-y-2">
                {hours.map(({ day, time }, i) => (
                  <li
                    key={day}
                    className={`flex justify-between items-center py-2.5 border-b font-body text-sm ${
                      i === todayIndex
                        ? "border-gold/40 text-charcoal"
                        : "border-cream-dark text-muted"
                    }`}
                  >
                    <span
                      className={`flex items-center gap-2 ${
                        i === todayIndex ? "font-semibold" : ""
                      }`}
                    >
                      {i === todayIndex && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                      )}
                      {day}
                    </span>
                    <span
                      className={
                        time === "Geschlossen"
                          ? "text-muted italic"
                          : i === todayIndex
                          ? "text-gold font-medium"
                          : ""
                      }
                    >
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right: Contact form */}
          <div id="demo-form">
            <h2 className="font-display text-xl text-charcoal font-semibold mb-6">
              Anfrage ausprobieren
            </h2>

            {submitted ? (
              <div ref={statusRef} tabIndex={-1} role="status" className="border border-gold/30 bg-gold/5 p-8 text-center">
                <svg
                  className="w-10 h-10 text-gold mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="font-display text-xl text-charcoal font-semibold mb-2">
                  Demo ausprobiert.
                </h3>
                <p className="text-muted text-sm font-body">
                  Es wurde nichts versendet oder gespeichert. Dies ist eine Vorschau des Anfrageformulars.
                </p>
                <button className="salon-button mt-6" type="button" onClick={() => { setSubmitted(false); setTimeout(() => document.getElementById("name")?.focus(), 0); }}>Erneut ausprobieren</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-sm text-muted">Konzeptwebsite: Dieses Formular demonstriert eine Terminanfrage. Es werden keine Daten versendet.</p>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs tracking-widest uppercase font-body font-medium text-charcoal mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ihr vollständiger Name"
                    className="w-full border border-cream-dark bg-cream px-4 py-3 text-sm font-body text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-gold transition-colors duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs tracking-widest uppercase font-body font-medium text-charcoal mb-2"
                  >
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ihre@email.ch"
                    className="w-full border border-cream-dark bg-cream px-4 py-3 text-sm font-body text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-gold transition-colors duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs tracking-widest uppercase font-body font-medium text-charcoal mb-2"
                  >
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Beschreiben Sie Ihren Wunsch oder fragen Sie uns etwas…"
                    className="w-full border border-cream-dark bg-cream px-4 py-3 text-sm font-body text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-gold transition-colors duration-200 resize-none"
                  />
                </div>

                <p className="text-xs text-muted font-body">
                  Bitte verwenden Sie Beispieldaten. Alle drei Felder sind erforderlich. Ihre Eingaben bleiben nur in dieser Browseransicht.
                </p>

                <button
                  type="submit"
                  className="w-full py-4 bg-charcoal text-cream text-sm font-medium tracking-wide hover:bg-charcoal-light transition-colors duration-200 font-body"
                >
                  Anfrage ausprobieren
                </button>
              </form>
            )}

            {/* Quick booking note */}
            <div className="mt-8 p-6 bg-cream-dark border-l-2 border-gold">
              <p className="text-sm font-body text-charcoal font-medium mb-1">
                Eine Terminanfrage zum Ausprobieren
              </p>
              <p className="text-sm text-muted font-body">
                Dieser fiktive Salon nimmt keine Buchungen entgegen:{" "}
                <a
                  href="#demo-form"
                  className="text-charcoal font-semibold hover:text-gold transition-colors duration-200"
                >
                  Kontakt im Demoformular
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";

import { openingHours as hours, reservationTimes } from "../data/hours";

// The server and hydration snapshot stay locked until React has attached handlers.
const subscribeToReadiness = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function Kontakt() {
  const ready = useSyncExternalStore(subscribeToReadiness, clientReady, serverReady);
  const [form, setForm] = useState({ name: "", email: "", phone: "", persons: "", date: "", time: "", message: "" });
  const [holiday, setHoliday] = useState(false);
  const times = reservationTimes(form.date, holiday);
  const [submitted, setSubmitted] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (submitted) statusRef.current?.focus(); }, [submitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value, ...(e.target.name === "date" ? { time: "" } : {}) }));
  };
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (ready && times.includes(form.time)) setSubmitted(true); };

  return (
    <>
      {/* Header */}
      <section className="pt-14 bg-[#F2E8D5]">
        <div className="max-w-5xl mx-auto px-6 pt-8">
          <div className="border-2 border-[#1A1208] p-1">
            <div className="border border-[#1A1208]/30 px-8 md:px-16 py-10 text-center">
              <p className="text-[#755031] text-[11px] tracking-[0.4em] uppercase mb-3" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                ✦ Fiktives Café · Nichts wird versendet ✦
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-[#1A1208] [overflow-wrap:anywhere]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Kontakt &<br className="md:hidden" /> Reservierungs&shy;demo
              </h1>
              <div className="flex items-center gap-3 justify-center mt-4">
                <div className="h-px flex-1 bg-[#8B6040]/50" />
                <span className="text-[#755031] text-xs">✦ ✦ ✦</span>
                <div className="h-px flex-1 bg-[#8B6040]/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F2E8D5] py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-14">

          {/* Links: Infos */}
          <div className="space-y-10">
            {/* Adresse */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-[#8B6040]" />
                <span className="text-[#755031] text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Adresse</span>
                <div className="h-px flex-1 bg-[#8B6040]" />
              </div>
              <address className="not-italic text-base text-[#1A1208]/70 space-y-1 leading-relaxed" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                <p className="font-bold text-[#1A1208] text-lg" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Café & Konditorei Vogel</p>
                <p>Beispielgasse 12</p>
                <p>Zürich · fiktiver Standort</p>
                <p className="mt-4">
                  <span className="text-[#755031] font-bold hover:text-[#593919] transition-colors">Telefon in dieser Demo nicht verfügbar</span>
                </p>
                <p>
                  <span className="text-[#1A1208]/75 hover:text-[#1A1208] transition-colors">hallo@vogel.example</span>
                </p>
              </address>
            </div>

            {/* Öffnungszeiten */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-[#8B6040]" />
                <span className="text-[#755031] text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Öffnungszeiten</span>
                <div className="h-px flex-1 bg-[#8B6040]" />
              </div>
              <ul className="space-y-0">
                {hours.map(({ day, time }) => (
                  <li key={day} className="flex justify-between py-3 border-b border-[#1A1208]/10 last:border-0">
                    <span className="text-sm text-[#1A1208]/70" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{day}</span>
                    <span className="text-sm font-bold text-[#1A1208]" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Karte */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-[#8B6040]" />
                <span className="text-[#755031] text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Standort</span>
                <div className="h-px flex-1 bg-[#8B6040]" />
              </div>
              <div className="border-2 border-[#1A1208]/20 aspect-video overflow-hidden">
                <div className="demo-location"><span aria-hidden="true">✦</span><p>Zürich</p><small>Fiktiver Standort dieser Beispielwebsite</small></div>
              </div>
            </div>
          </div>

          {/* Rechts: Formular */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-[#8B6040]" />
              <span className="text-[#755031] text-[11px] tracking-[0.3em] uppercase" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Reservierungsdemo</span>
              <div className="h-px flex-1 bg-[#8B6040]" />
            </div>

            {submitted ? (
              <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="border-2 border-[#1A1208] p-1">
                <div className="border border-[#1A1208]/30 p-8 text-center">
                  <p className="text-[#755031] text-[11px] tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>✦ Beispielansicht ✦</p>
                  <h3 className="text-2xl font-black text-[#1A1208] mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Demo erfolgreich ausprobiert.</h3>
                  <p className="text-sm text-[#1A1208]/65" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                    Es wurde keine Reservierung versendet. Ihre Eingaben bleiben nur in dieser Browseransicht und werden nicht gespeichert.
                  </p>
                  <p className="mt-4 text-sm">Ihre Beispielauswahl: {form.date.split("-").reverse().join(".")} · {form.time} Uhr · {form.persons}{holiday ? " · Feiertagszeiten" : ""}</p>
                  <button className="cafe-button mt-6" type="button" onClick={() => { setSubmitted(false); setTimeout(() => document.getElementById("name")?.focus(), 0); }}>Erneut ausprobieren</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <noscript><p>Zum Ausprobieren bitte JavaScript aktivieren. Das Formular bleibt sonst deaktiviert.</p></noscript>
                <fieldset disabled={!ready} className="space-y-5 border-0 p-0 m-0 min-w-0" aria-label="Demo-Anfrage">
                <p className="demo-form-note">Dies ist ein Demoformular. Bitte verwenden Sie Beispieldaten. Es wird nichts versendet oder gespeichert.</p>
                {[
                  { id: "name", label: "Name *", type: "text", placeholder: "Ihr vollständiger Name" },
                  { id: "email", label: "E-Mail *", type: "email", placeholder: "ihre@email.ch" },
                  { id: "phone", label: "Telefon", type: "tel", placeholder: "Optionales Beispiel" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-[11px] tracking-[0.25em] uppercase text-[#1A1208] mb-2" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{label}</label>
                    <input
                      type={type} id={id} name={id}
                      value={form[id as keyof typeof form]}
                      onChange={handleChange}
                      required={label.includes("*")}
                      placeholder={placeholder}
                      className="w-full border border-[#1A1208]/30 bg-[#F2E8D5] px-4 py-3 text-sm text-[#1A1208] placeholder:text-[#1A1208]/75 focus:outline-none focus:border-[#8B6040] transition-colors duration-200"
                      style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                    />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="persons" className="block text-[11px] tracking-[0.25em] uppercase text-[#1A1208] mb-2" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Personen *</label>
                    <select id="persons" name="persons" value={form.persons} onChange={handleChange} required
                      className="w-full border border-[#1A1208]/30 bg-[#F2E8D5] px-4 py-3 text-sm text-[#1A1208] focus:outline-none focus:border-[#8B6040] transition-colors"
                      style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                      <option value="">Anzahl…</option>
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n} {n === 1 ? "Person" : "Personen"}</option>)}
                      <option>Mehr als 8 (Anfrage)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-[11px] tracking-[0.25em] uppercase text-[#1A1208] mb-2" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Datum *</label>
                    <input min={ready ? new Date().toLocaleDateString("sv-SE") : undefined} type="date" id="date" name="date" value={form.date} onChange={handleChange} required
                      className="w-full border border-[#1A1208]/30 bg-[#F2E8D5] px-4 py-3 text-sm text-[#1A1208] focus:outline-none focus:border-[#8B6040] transition-colors"
                      style={{ fontFamily: "'EB Garamond', Georgia, serif" }} />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-3 text-sm text-[#1A1208]">
                    <input type="checkbox" id="holiday" checked={holiday} onChange={(event) => { setHoliday(event.target.checked); setForm((prev) => ({ ...prev, time: "" })); }} />
                    Feiertagszeiten ausprobieren
                  </label>
                  <p id="time-help" className="text-sm text-[#1A1208]/75 mt-2">Halbstündliche Wunschzeiten innerhalb der Öffnungszeiten. Feiertage werden in dieser Demo manuell gewählt; es wird keine Verfügbarkeit geprüft.</p>
                  <label htmlFor="time" className="block text-[11px] tracking-[0.25em] uppercase text-[#1A1208] mt-4 mb-2">Wunschzeit *</label>
                  <select id="time" name="time" value={form.time} onChange={handleChange} required disabled={!form.date} aria-describedby="time-help"
                    className="w-full border border-[#1A1208]/30 bg-[#F2E8D5] px-4 py-3 text-sm text-[#1A1208] focus:outline-none focus:border-[#8B6040]">
                    <option value="">{form.date ? "Uhrzeit wählen…" : "Zuerst Datum wählen…"}</option>
                    {times.map((time) => <option key={time} value={time}>{time} Uhr</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[11px] tracking-[0.25em] uppercase text-[#1A1208] mb-2" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Wünsche & Anmerkungen</label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={4}
                    placeholder="Allergien, Spezialwünsche, Anlass…"
                    className="w-full border border-[#1A1208]/30 bg-[#F2E8D5] px-4 py-3 text-sm text-[#1A1208] placeholder:text-[#1A1208]/75 focus:outline-none focus:border-[#8B6040] transition-colors resize-none"
                    style={{ fontFamily: "'EB Garamond', Georgia, serif" }} />
                </div>

                <p className="text-xs text-[#1A1208]/65" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>* Pflichtfelder · Nur zur Demonstration</p>

                <button type="submit"
                  className="w-full py-4 bg-[#1A1208] text-[#F2E8D5] text-xs tracking-[0.25em] uppercase hover:bg-[#4A3C28] transition-colors duration-200"
                  style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                  Demo-Reservierung ausprobieren
                </button>
              </fieldset>
              </form>
            )}

            {/* Direktkontakt */}
            <div className="mt-8 border border-[#1A1208]/20 p-6 text-center">
              <p className="text-xs text-[#1A1208]/75 mb-1 tracking-widest uppercase" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Ein fiktives Café zum Entdecken</p>
              <span className="text-xl font-black text-[#755031] hover:text-[#593919] transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Telefon in dieser Demo nicht verfügbar
              </span>
              <p className="text-xs text-[#1A1208]/65 mt-1" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{hours.map(({ day, time }) => `${day} ${time}`).join(" · ")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

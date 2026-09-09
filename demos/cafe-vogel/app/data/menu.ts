export const menuSections = [
  {
    title: "Frühstück & Morgen",
    subtitle: "Bis 11:00 Uhr · Mo–Fr ab 07:00, Sa–So ab 08:00",
    items: [
      { name: "Frühstückskorb für Zwei", desc: "Frischgebackenes Brot, Gipfeli, Butter, hausgemachte Konfitüre, Käse, Aufschnitt, Saisonfrüchte, Orangensaft", price: "28.00" },
      { name: "Bürli & Butter", desc: "Drei frische Bürli mit Butter und Konfitüre", price: "6.50" },
      { name: "Rühreier auf Toast", desc: "Mit frischen Kräutern und Tomatensalat", price: "12.00" },
      { name: "Müesli der Saison", desc: "Mit Joghurt, frischen Früchten und Honig", price: "9.50" },
    ],
  },
  {
    title: "Backwaren & Patisserie",
    subtitle: "Täglich frisch aus der Backstube",
    items: [
      { name: "Gipfeli", desc: "Butterig, zart, nach Hausrezept", price: "2.50" },
      { name: "Buttergebäck", desc: "Täglich frisch, butterig & zart", price: "2.80" },
      { name: "Sauerteigbrot", desc: "Aus dem Steinofen, halber Laib", price: "5.80" },
      { name: "Nussgipfel", desc: "Mit Haselnussfüllung, lauwarm serviert", price: "3.20" },
      { name: "Linzer Torte", desc: "Mit Johannisbeergelee, hausgemacht nach Familienrezept", price: "6.50" },
      { name: "Éclair au Chocolat", desc: "Brandteig, Schokoladencreme, Ganache-Glasur", price: "5.80" },
      { name: "Apfelstrudel", desc: "Knuspriger Blätterteig, Zimtäpfel, Puderzucker", price: "5.50" },
      { name: "Pralinés (6 Stück)", desc: "Hausgemachte Pralinen, sortiert, wechselnde Kreationen", price: "14.00" },
    ],
  },
  {
    title: "Kaffee & Heissgetränke",
    subtitle: "Mit hausgerösteten Arabica-Bohnen",
    items: [
      { name: "Café Crème", desc: "Langer schwarzer Kaffee, mild geröstet", price: "4.50" },
      { name: "Espresso", desc: "Doppelt geröstet, kräftig, kurz", price: "3.80" },
      { name: "Cappuccino", desc: "Doppelter Espresso, aufgeschäumte Vollmilch", price: "5.00" },
      { name: "Latte Macchiato", desc: "Grosse Tasse, Hafermilch auf Wunsch", price: "5.50" },
      { name: "Heisse Schokolade", desc: "Hausgemacht mit Guanaja-Kuvertüre", price: "5.80" },
      { name: "Tee (Auswahl)", desc: "Schwarztee, Kräuter, Grüntee — alle Sorten täglich frisch", price: "4.20" },
    ],
  },
  {
    title: "Torten & Festliches",
    subtitle: "Auch für Bestellungen — bitte 48h im Voraus",
    items: [
      { name: "Schwarzwälder Kirschtorte", desc: "Nach originalem Hausrezept, Kirschwasser aus der Region", price: "7.50" },
      { name: "Käsekuchen", desc: "Cremig, leicht, mit Mürbteigboden", price: "6.50" },
      { name: "Geburtstagstorte (Bestellung)", desc: "Individuell gestaltet, ab 6 Personen", price: "ab 55.00" },
      { name: "Hochzeitstorte (Bestellung)", desc: "Mehlspeiskunst nach Mass", price: "auf Anfrage" },
    ],
  },
];

export const featuredMenu = ["Café Crème", "Cappuccino", "Buttergebäck", "Linzer Torte", "Sauerteigbrot", "Frühstückskorb für Zwei"].map((name) => {
  const item = menuSections.flatMap((section) => section.items).find((item) => item.name === name);
  if (!item) throw new Error("Missing featured menu item: " + name);
  return item;
});

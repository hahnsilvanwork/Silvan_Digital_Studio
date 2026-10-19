export const menuSections = [
  {
    title: "Frühstück",
    subtitle: "Frühstück ab Öffnung bis 11:00 Uhr",
    items: [
      {
        name: "Frühstückskorb für zwei",
        desc: "Frisches Brot, Gipfeli, Butter, hausgemachte Konfitüre, Käse, Aufschnitt, Früchte der Saison und Orangensaft",
        price: "28.00",
      },
      {
        name: "Bürli & Butter",
        desc: "Drei frische Bürli mit Butter und Konfitüre",
        price: "6.50",
      },
      {
        name: "Rühreier auf Toast",
        desc: "Mit frischen Kräutern und Tomatensalat",
        price: "12.00",
      },
      {
        name: "Müesli der Saison",
        desc: "Mit Joghurt, frischen Früchten und Honig",
        price: "9.50",
      },
    ],
  },
  {
    title: "Backwaren & Patisserie",
    subtitle: "Täglich frisch aus der Backstube",
    items: [
      {
        name: "Gipfeli",
        desc: "Nach Hausrezept mit Butter gebacken, zart im Biss",
        price: "2.50",
      },
      {
        name: "Buttergebäck",
        desc: "Täglich frisch gebacken, mit feinem Buttergeschmack",
        price: "2.80",
      },
      {
        name: "Sauerteigbrot",
        desc: "Aus dem Steinofen, halber Laib",
        price: "5.80",
      },
      {
        name: "Nussgipfel",
        desc: "Mit Haselnussfüllung, lauwarm serviert",
        price: "3.20",
      },
      {
        name: "Linzer Torte",
        desc: "Mit Johannisbeergelee und feinem Mürbteig",
        price: "6.50",
      },
      {
        name: "Éclair au Chocolat",
        desc: "Brandteig mit Schokoladencreme und Schokoladenglasur (Ganache)",
        price: "5.80",
      },
      {
        name: "Apfelstrudel",
        desc: "Knuspriger Blätterteig, Zimtäpfel, Puderzucker",
        price: "5.50",
      },
      {
        name: "Pralinés (6 Stück)",
        desc: "Sechs hausgemachte Pralinés in wechselnder Auswahl",
        price: "14.00",
      },
    ],
  },
  {
    title: "Kaffee & Heissgetränke",
    subtitle: "Vom Espresso bis zur heissen Schokolade",
    items: [
      {
        name: "Café Crème",
        desc: "Langer schwarzer Kaffee, mild geröstet",
        price: "4.50",
      },
      { name: "Espresso", desc: "Kräftig, aromatisch und kurz", price: "3.80" },
      {
        name: "Cappuccino",
        desc: "Doppelter Espresso, aufgeschäumte Vollmilch",
        price: "5.00",
      },
      {
        name: "Latte Macchiato",
        desc: "In der grossen Tasse, auf Wunsch mit Hafermilch",
        price: "5.50",
      },
      {
        name: "Heisse Schokolade",
        desc: "Hausgemacht mit Guanaja-Kuvertüre",
        price: "5.80",
      },
      {
        name: "Tee (Auswahl)",
        desc: "Schwarztee, Kräutertee oder Grüntee, frisch zubereitet",
        price: "4.20",
      },
    ],
  },
  {
    title: "Torten & Festliches",
    subtitle: "Torten zum Teilen und Feiern",
    items: [
      {
        name: "Schwarzwälder Kirschtorte",
        desc: "Schokolade, Kirschen und Rahm",
        price: "7.50",
      },
      {
        name: "Käsekuchen",
        desc: "Cremig und leicht, auf einem Mürbteigboden",
        price: "6.50",
      },
      {
        name: "Geburtstagstorte (Bestellung)",
        desc: "Nach Ihren Wünschen gestaltet, für mindestens 6 Personen",
        price: "ab 55.00",
      },
      {
        name: "Hochzeitstorte (Bestellung)",
        desc: "Individuell für Ihre Hochzeit gestaltet",
        price: "auf Anfrage",
      },
    ],
  },
];

export const featuredMenu = [
  "Café Crème",
  "Cappuccino",
  "Buttergebäck",
  "Linzer Torte",
  "Sauerteigbrot",
  "Frühstückskorb für zwei",
].map((name) => {
  const item = menuSections
    .flatMap((section) => section.items)
    .find((item) => item.name === name);
  if (!item) throw new Error("Missing featured menu item: " + name);
  return item;
});

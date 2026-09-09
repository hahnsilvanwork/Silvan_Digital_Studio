export const openingHours = [
  { day: "Montag – Freitag", time: "07:00 – 18:00", open: 7, close: 18 },
  { day: "Samstag", time: "08:00 – 17:00", open: 8, close: 17 },
  { day: "Sonntag", time: "08:00 – 16:00", open: 8, close: 16 },
  { day: "Feiertage", time: "09:00 – 14:00", open: 9, close: 14 },
];

// Holiday status is explicitly chosen for the demo, not inferred from a live calendar.
export function reservationTimes(date: string, holiday = false): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return [];
  const parsed = new Date(date + "T12:00:00Z");
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return [];
  const day = parsed.getUTCDay();
  const hours = openingHours[holiday ? 3 : day === 0 ? 2 : day === 6 ? 1 : 0];
  return Array.from({ length: (hours.close - hours.open) * 2 }, (_, index) => {
    const minutes = hours.open * 60 + index * 30;
    return String(Math.floor(minutes / 60)).padStart(2, "0") + ":" + String(minutes % 60).padStart(2, "0");
  });
}

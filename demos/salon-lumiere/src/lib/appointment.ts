export type Appointment = {
  name: string;
  email: string;
  desiredDate: string;
  desiredTime: string;
  message: string;
};
export type AppointmentErrors = Partial<Record<keyof Appointment, string>>;

export function swissDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  return ['year', 'month', 'day'].map(type => parts.find(part => part.type === type)!.value).join('-');
}

function parsedDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
}

export function nextDate(value: string): string {
  const date = parsedDate(value);
  if (!date) return '';
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}

export function localizedDate(value: string): string {
  const date = parsedDate(value);
  return date ? new Intl.DateTimeFormat('de-CH', { timeZone: 'Europe/Zurich', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date) : value;
}

export function durationMinutes(duration: string): number {
  return Math.max(...(duration.match(/\d+/g) ?? ['0']).map(Number));
}

// Fifteen-minute example starts, respecting the longest stated treatment duration.
// A service-free enquiry has no treatment duration and is not a quoted consultation.
export function timeSlots(value: string, duration: number): string[] {
  const date = parsedDate(value);
  if (!date || !Number.isFinite(duration) || duration < 0) return [];
  const day = date.getUTCDay();
  if (day === 0) return [];
  const closing = (day === 6 ? 17 : day === 4 || day === 5 ? 20 : 19) * 60;
  const slots: string[] = [];
  for (let start = 9 * 60; start < closing && start + duration <= closing; start += 15) {
    slots.push(`${String(Math.floor(start / 60)).padStart(2, '0')}:${String(start % 60).padStart(2, '0')}`);
  }
  return slots;
}

export function validateAppointment(data: Appointment, duration: number, now = new Date()): AppointmentErrors {
  const errors: AppointmentErrors = {};
  if (!data.name.trim() || data.name.length > 100) errors.name = 'Bitte einen Namen mit höchstens 100 Zeichen eingeben.';
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Bitte eine gültige E-Mail-Adresse mit höchstens 254 Zeichen eingeben.';
  const date = parsedDate(data.desiredDate);
  if (!date || data.desiredDate <= swissDate(now)) errors.desiredDate = 'Bitte ein zukünftiges Datum wählen (Schweizer Zeit).';
  else if (date.getUTCDay() === 0) errors.desiredDate = 'Sonntags ist geschlossen. Bitte einen anderen Tag wählen.';
  if (!timeSlots(data.desiredDate, duration).includes(data.desiredTime)) errors.desiredTime = 'Bitte eine passende Uhrzeit innerhalb der Öffnungszeiten wählen.';
  if (data.message.length > 1000) errors.message = 'Die Nachricht darf höchstens 1000 Zeichen enthalten.';
  return errors;
}

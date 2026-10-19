import { reservationTimes } from "./hours.ts";

export type Reservation = {
  name: string;
  email: string;
  phone: string;
  persons: string;
  date: string;
  time: string;
  holiday: boolean;
  message: string;
};
export type ReservationErrors = Partial<Record<keyof Reservation, string>>;
export const limits = { name: 100, email: 254, phone: 40, message: 1000 };
export const emptyReservation: Reservation = {
  name: "",
  email: "",
  phone: "",
  persons: "",
  date: "",
  time: "",
  holiday: false,
  message: "",
};

export function zurichClock(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: string) =>
    parts.find((item) => item.type === type)!.value;
  return {
    date: `${part("year")}-${part("month")}-${part("day")}`,
    time: `${part("hour")}:${part("minute")}`,
  };
}

export function availableTimes(
  date: string,
  holiday = false,
  now = new Date(),
): string[] {
  const current = zurichClock(now);
  if (date < current.date) return [];
  return reservationTimes(date, holiday).filter(
    (time) => date !== current.date || time > current.time,
  );
}

export function validateReservation(input: Reservation, now = new Date()) {
  const value = {
    ...input,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    message: input.message.trim(),
  };
  const errors: ReservationErrors = {};
  if (!value.name) errors.name = "Bitte geben Sie einen Namen ein.";
  else if (value.name.length > limits.name)
    errors.name = "Bitte verwenden Sie höchstens 100 Zeichen.";
  if (!value.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  else if (value.email.length > limits.email)
    errors.email = "Bitte verwenden Sie höchstens 254 Zeichen.";
  if (value.phone.length > limits.phone)
    errors.phone = "Bitte verwenden Sie höchstens 40 Zeichen.";
  if (!/^[1-8]$/.test(value.persons) && value.persons !== "more")
    errors.persons = "Bitte wählen Sie die Personenzahl.";
  if (!reservationTimes(value.date).length)
    errors.date = "Bitte wählen Sie ein gültiges Datum.";
  else if (value.date < zurichClock(now).date)
    errors.date = "Bitte wählen Sie heute oder einen späteren Tag.";
  if (!availableTimes(value.date, value.holiday, now).includes(value.time))
    errors.time = "Bitte wählen Sie eine der angebotenen Beispielzeiten.";
  if (value.message.length > limits.message)
    errors.message = "Bitte verwenden Sie höchstens 1000 Zeichen.";
  return { value, errors, valid: Object.keys(errors).length === 0 };
}

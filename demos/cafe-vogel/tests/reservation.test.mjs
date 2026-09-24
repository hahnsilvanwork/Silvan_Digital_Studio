import assert from 'node:assert/strict';
import test from 'node:test';
import { availableTimes, emptyReservation, validateReservation, zurichClock } from '../app/data/reservation.ts';

const now = new Date('2026-09-24T10:15:00Z');
const valid = { ...emptyReservation, name: ' Beispiel Gast ', email: ' gast@example.com ', persons: '2', date: '2026-09-25', time: '09:00' };

test('valid requests are normalized without modifying the original', () => {
  const result = validateReservation({ ...valid, phone: ' 123 ', message: ' Frühstück ' }, now);
  assert.equal(result.valid, true);
  assert.equal(result.value.name, 'Beispiel Gast');
  assert.equal(result.value.email, 'gast@example.com');
  assert.equal(result.value.phone, '123');
  assert.equal(result.value.message, 'Frühstück');
  assert.equal(valid.name, ' Beispiel Gast ');
});

test('required, malformed and oversized values produce field errors', () => {
  const result = validateReservation({ ...emptyReservation, name: '   ', email: 'bad@', persons: '9', date: '2026-02-30', phone: '1'.repeat(41), message: 'a'.repeat(1001) }, now);
  assert.equal(result.valid, false);
  for (const key of ['name', 'email', 'persons', 'date', 'time', 'phone', 'message']) assert.ok(result.errors[key], key);
  assert.ok(validateReservation({ ...valid, name: 'x'.repeat(101), email: 'x'.repeat(250) + '@a.ch' }, now).errors.email);
  assert.ok(validateReservation({ ...valid, name: 'x'.repeat(101) }, now).errors.name);
  for (const persons of ['1', '8', 'more']) assert.equal(validateReservation({ ...valid, persons }, now).valid, true);
});

test('past dates, closed hours and elapsed same-day slots are rejected', () => {
  for (const change of [{ date: '2026-09-23' }, { time: '18:00' }, { time: '09:15' }, { date: '2026-09-24', time: '12:00' }]) {
    assert.equal(validateReservation({ ...valid, ...change }, now).valid, false);
  }
  assert.equal(availableTimes('2026-09-24', false, now)[0], '12:30');
  assert.deepEqual(availableTimes('2026-09-24', false, new Date('2026-09-24T15:30:00Z')), []);
});

test('holiday and weekend schedules retain their defined opening and closing boundaries', () => {
  for (const [date, holiday, first, last] of [
    ['2026-09-25', false, '07:00', '17:30'],
    ['2026-09-26', false, '08:00', '16:30'],
    ['2026-09-27', false, '08:00', '15:30'],
    ['2026-09-25', true, '09:00', '13:30'],
  ]) {
    const times = availableTimes(date, holiday, now);
    assert.equal(times[0], first);
    assert.equal(times.at(-1), last);
  }
  assert.ok(validateReservation({ ...valid, holiday: true, time: '14:00' }, now).errors.time);
});

test('Zurich date follows local midnight and daylight saving changes', () => {
  assert.deepEqual(zurichClock(new Date('2026-09-24T22:15:00Z')), { date: '2026-09-25', time: '00:15' });
  assert.deepEqual(zurichClock(new Date('2026-01-24T23:15:00Z')), { date: '2026-01-25', time: '00:15' });
  assert.equal(zurichClock(new Date('2026-03-29T01:15:00Z')).time, '03:15');
  assert.equal(validateReservation({ ...valid, date: '2026-09-24' }, new Date('2026-09-24T22:15:00Z')).valid, false);
});

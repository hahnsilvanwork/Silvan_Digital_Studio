import assert from 'node:assert/strict';
import test from 'node:test';
import { reservationTimes } from '../app/data/hours.ts';

test('weekday, Saturday and Sunday selections stay inside their opening hours', () => {
  for (const [date, first, last, count] of [
    ['2026-09-09', '07:00', '17:30', 22],
    ['2026-09-12', '08:00', '16:30', 18],
    ['2026-09-13', '08:00', '15:30', 16],
  ]) {
    const times = reservationTimes(date);
    assert.equal(times[0], first);
    assert.equal(times.at(-1), last);
    assert.equal(times.length, count);
  }
});
test('holiday override respects reduced hours on any weekday', () => {
  const times = reservationTimes('2026-09-09', true);
  assert.equal(times[0], '09:00');
  assert.equal(times.at(-1), '13:30');
  assert.equal(times.length, 10);
});
test('empty or invalid dates offer no reservation times', () => {
  for (const date of ['', 'bad-date', '2026-02-30', '2026-13-01']) {
    assert.deepEqual(reservationTimes(date), []);
  }
});

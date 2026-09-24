import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const path = new URL('../src/lib/appointment.ts', import.meta.url);
const source = existsSync(path) ? readFileSync(path, 'utf8') : '';
const sandbox = { exports: {}, Intl, Date };
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, sandbox);
const { swissDate, nextDate, durationMinutes, timeSlots, validateAppointment, localizedDate } = sandbox.exports;
const valid = { name: 'Anna Beispiel', email: 'anna@example.com', message: '', desiredDate: '2026-09-25', desiredTime: '17:30' };
const now = new Date('2026-09-24T10:00:00Z');

test('Swiss calendar dates respect local midnight, DST and year boundaries', () => {
  assert.equal(typeof swissDate, 'function');
  assert.equal(swissDate(new Date('2026-09-24T22:30:00Z')), '2026-09-25');
  assert.equal(swissDate(new Date('2026-01-01T23:30:00Z')), '2026-01-02');
  assert.equal(nextDate('2026-12-31'), '2027-01-01');
  assert.equal(nextDate('2028-02-28'), '2028-02-29');
  assert.match(localizedDate('2026-09-25'), /25\. September 2026/);
});
test('slots use maximum treatment duration and finish by closing on each weekday', () => {
  assert.equal(typeof timeSlots, 'function');
  assert.equal(durationMinutes('90–150 min'), 150);
  assert.equal(durationMinutes('20 min'), 20);
  for (const [date, closing] of [['2026-09-21','16:30'], ['2026-09-22','16:30'], ['2026-09-23','16:30'], ['2026-09-24','17:30'], ['2026-09-25','17:30'], ['2026-09-26','14:30']]) {
    assert.equal(timeSlots(date, 150)[0], '09:00');
    assert.equal(timeSlots(date, 150).at(-1), closing);
  }
  assert.equal(timeSlots('2026-09-27', 20).length, 0);
  assert.equal(timeSlots('2026-02-30', 20).length, 0);
});
test('validation rejects today, past, impossible dates, Sunday and unsuitable times', () => {
  assert.equal(typeof validateAppointment, 'function');
  assert.equal(Object.keys(validateAppointment(valid, 150, now)).length, 0);
  for (const date of ['', '2026-09-23', '2026-09-24', '2026-09-27', '2026-02-30']) {
    assert.ok(validateAppointment({ ...valid, desiredDate: date }, 150, now).desiredDate);
  }
  for (const time of ['', '08:45', '17:45', '20:00', '25:00', '10:01']) {
    assert.ok(validateAppointment({ ...valid, desiredTime: time }, 150, now).desiredTime);
  }
});
test('identity fields are required and bounded; optional message is bounded', () => {
  assert.equal(typeof validateAppointment, 'function');
  for (const name of ['', '   ', 'x'.repeat(101)]) assert.ok(validateAppointment({ ...valid, name }, 45, now).name);
  for (const email of ['', 'bad', 'a@', 'x'.repeat(250) + '@a.ch']) assert.ok(validateAppointment({ ...valid, email }, 45, now).email);
  assert.ok(validateAppointment({ ...valid, message: 'x'.repeat(1001) }, 45, now).message);
  assert.equal(Object.keys(validateAppointment({ ...valid, message: '' }, 45, now)).length, 0);
});

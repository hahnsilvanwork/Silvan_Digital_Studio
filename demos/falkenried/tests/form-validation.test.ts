import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDemoValue } from '../src/lib/form-validation.ts';

test('required values reject whitespace and trimmed short messages', () => {
  assert.equal(validateDemoValue('   ', 1, 120), 'required');
  assert.equal(validateDemoValue('  hi  ', 10, 3000), 'short');
  assert.equal(validateDemoValue('  Hello there  ', 10, 3000), null);
});

test('limits count trimmed content and optional empty values remain valid', () => {
  assert.equal(validateDemoValue('abcde', 1, 4), 'long');
  assert.equal(validateDemoValue('  abcd  ', 1, 4), null);
  assert.equal(validateDemoValue(' ', 1, 4, false), null);
});

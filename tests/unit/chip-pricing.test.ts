import { expect, it } from 'vitest';
import { chipTotal } from '../../src/lib/chip-pricing';
import { buildReviewInquiryMessage } from '../../src/lib/whatsapp';
import { EMPTY_REVIEW_INQUIRY } from '../../src/lib/validation';

it.each([['1',15],['2',25],['3',30],['4',35],['10',65],['999',5010]] as const)('prices %s chips cumulatively', (quantity, total) => {
  expect(chipTotal(quantity)).toBe(total);
});
it.each(['','0','-1','1.5','1000','abc'])('rejects invalid chip quantity %s', quantity => {
  expect(chipTotal(quantity)).toBeNull();
});
it.each(['de','en'] as const)('includes the correct chip total in the %s enquiry', locale => {
  const text = buildReviewInquiryMessage({...EMPTY_REVIEW_INQUIRY, product:'nfc-chip', quantity:'3'}, locale);
  expect(text).toContain('CHF 30.–');
  expect(text).toContain('CHF 15');
});

import { expect, it } from 'vitest';
import { getMatchingInquiryModels } from '../../src/lib/inquiry-selection';
import { getContent } from '../../src/lib/locales';
import { EMPTY_REVIEW_INQUIRY } from '../../src/lib/validation';

const catalog = getContent('de').reviews.catalog;
it('waits for a product and filters real models by product, destination and shape', () => {
  expect(getMatchingInquiryModels(catalog, EMPTY_REVIEW_INQUIRY)).toEqual([]);
  const matches = getMatchingInquiryModels(catalog, { ...EMPTY_REVIEW_INQUIRY, product: 'standard-card', destination: 'reviews', shape: 'round' });
  expect(matches.length).toBeGreaterThan(0);
  expect(matches.some(model => model.id === 'review-round-black')).toBe(true);
  expect(matches.every(model => model.category === 'reviews')).toBe(true);
  expect(matches.some(model => model.id === 'review-square-blue')).toBe(false);
});
it('offers the neutral sticker for any destination but never offers a conflicting shape', () => {
  const values = { ...EMPTY_REVIEW_INQUIRY, product: 'nfc-chip', destination: 'menu' };
  expect(getMatchingInquiryModels(catalog, values).map(model => model.id)).toEqual(['nfc-030-chip']);
  expect(getMatchingInquiryModels(catalog, { ...values, shape: 'square' })).toEqual([]);
});
it('leaves unmatched combinations as an individual enquiry', () => {
  expect(getMatchingInquiryModels(catalog, { ...EMPTY_REVIEW_INQUIRY, product: 'standard-card', destination: 'other' })).toEqual([]);
});

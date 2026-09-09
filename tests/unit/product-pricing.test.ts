import { describe, expect, it } from 'vitest';
import { productPriceSummary, productTierSummary, productTotal } from '../../src/lib/product-pricing';
import { buildReviewInquiryEmail, buildReviewInquiryMessage, buildReviewInquiryUrl } from '../../src/lib/whatsapp';
import { EMPTY_REVIEW_INQUIRY } from '../../src/lib/validation';

describe('product price tiers', () => {
  it.each([
    ['standard-card', [49, 80, 100, 240, 260]],
    ['nfc-chip', [15, 25, 30, 65, 70]],
    ['personalized-card', [69, 100, 125, 300, 325]],
    ['fully-custom-card', [99, 150, 180, 390, 420]],
  ] as const)('prices %s at 1, 2, 3, 10 and 11 items', (id, expected) => {
    expect(['1', '2', '3', '10', '11'].map(quantity => productTotal(id, quantity))).toEqual(expected);
  });

  it.each(['', '0', '-1', '1.5', '1000', 'abc'])('rejects invalid quantity %s', quantity => {
    expect(productTotal('standard-card', quantity)).toBeNull();
  });

  it('does not invent stand or unknown product bulk prices', () => {
    expect(productTotal('standard-stand', '1')).toBe(49);
    expect(productTotal('standard-stand', '2')).toBeNull();
    for (const id of ['unknown', 'constructor', '__proto__', 'standard-pair']) {
      expect(productTotal(id, '2')).toBeNull();
      expect(productTierSummary(id, 'de')).toBe('');
    }
  });

  it.each(['de', 'en'] as const)('shares %s pricing across email, WhatsApp and copied message', locale => {
    const values = { ...EMPTY_REVIEW_INQUIRY, product: 'personalized-card', quantity: '11' };
    const summary = productPriceSummary(values.product, values.quantity, locale);
    expect(summary).toContain('CHF 325.–');
    expect(summary).toContain(locale === 'de' ? 'vor zusätzlichem Mengenrabatt' : 'before additional volume discount');
    expect(summary).toContain(locale === 'de' ? 'Versand' : 'Shipping');
    const message = buildReviewInquiryMessage(values, locale);
    expect(message).toContain(summary);
    expect(new URL(buildReviewInquiryEmail(values, locale)).searchParams.get('body')).toBe(message);
    expect(new URL(buildReviewInquiryUrl(values, locale)).searchParams.get('text')).toBe(message);
    expect(productPriceSummary(values.product, '10', locale)).not.toContain(locale === 'de' ? 'vor zusätzlichem Mengenrabatt' : 'before additional volume discount');
  });
});

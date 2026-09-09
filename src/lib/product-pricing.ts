import type { Locale } from '../content/types';
import { isPositiveInteger } from './validation';

export const PRODUCT_RATES = {
  'standard-card': { first: 49, pair: 80, additional: 20 },
  'nfc-chip': { first: 15, pair: 25, additional: 5 },
  'personalized-card': { first: 69, pair: 100, additional: 25 },
  'fully-custom-card': { first: 99, pair: 150, additional: 30 },
} as const;

export function productTotal(productId: string, quantity: string): number | null {
  if (!isPositiveInteger(quantity)) return null;
  const count = Number(quantity);
  if (productId === 'standard-stand') return count === 1 ? 49 : null;
  if (!Object.hasOwn(PRODUCT_RATES, productId)) return null;
  const rate = PRODUCT_RATES[productId as keyof typeof PRODUCT_RATES];
  return count === 1 ? rate.first : rate.pair + (count - 2) * rate.additional;
}

export function productTierSummary(productId: string, locale: Locale): string {
  if (productId === 'standard-stand') return locale === 'de'
    ? '1 Stück CHF 49 · mehrere Aufsteller nach Absprache.'
    : '1 item CHF 49 · multiple stands priced by agreement.';
  if (!Object.hasOwn(PRODUCT_RATES, productId)) return '';
  const rate = PRODUCT_RATES[productId as keyof typeof PRODUCT_RATES];
  return locale === 'de'
    ? `1 Stück CHF ${rate.first} · 2 Stück zusammen CHF ${rate.pair} · jedes weitere CHF ${rate.additional}.`
    : `1 item CHF ${rate.first} · 2 items total CHF ${rate.pair} · each additional item CHF ${rate.additional}.`;
}

export function productPriceSummary(productId: string, quantity: string, locale: Locale): string {
  const tiers = productTierSummary(productId, locale);
  if (!tiers) return '';
  const total = productTotal(productId, quantity);
  const bulk = isPositiveInteger(quantity) && Number(quantity) > 10;
  const label = locale === 'de'
    ? (bulk ? 'Richtpreis vor zusätzlichem Mengenrabatt' : 'Produktpreis')
    : (bulk ? 'Indicative price before additional volume discount' : 'Product price');
  const amount = total === null ? '' : `${label}: CHF ${total}.– (${Number(quantity)} ${locale === 'de' ? 'Stück' : 'items'}). `;
  const discount = bulk ? (locale === 'de'
    ? ' Über 10 Stück sind weitere Rabatte nach Absprache möglich; den endgültigen Preis erhalten Sie in der Offerte.'
    : ' For more than 10 items, further discounts are available by agreement; your quote confirms the final price.') : '';
  return `${amount}${tiers}${discount} ${locale === 'de' ? 'Versand nach Absprache, separat ausgewiesen.' : 'Shipping agreed separately and itemised in the quote.'}`;
}

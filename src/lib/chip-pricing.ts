import type { Locale } from '../content/types';
import { productPriceSummary, productTotal } from './product-pricing';

export function chipTotal(quantity: string): number | null {
  return productTotal('nfc-chip', quantity);
}

export function chipPriceSummary(quantity: string, locale: Locale): string {
  return productPriceSummary('nfc-chip', quantity, locale);
}

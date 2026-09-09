import type { Locale } from '../../content/types';
import { productTotal } from '../../lib/product-pricing';
import { isPositiveInteger } from '../../lib/validation';
import styles from './review-inquiry.module.css';

export function InquiryEstimate({ product, quantity, locale }: { readonly product: string; readonly quantity: string; readonly locale: Locale }) {
  const total = productTotal(product, quantity);
  const validQuantity = isPositiveInteger(quantity);
  const de = locale === 'de';
  return <div className={styles.estimate} data-testid="inquiry-total" role="status" aria-live="polite">
    <p className={styles.estimateAmount}>{total !== null
      ? `${de ? 'Grundkosten ca.' : 'Estimated base cost'} CHF ${total}.–`
      : product && validQuantity ? (de ? 'Grundkosten nach Absprache' : 'Base cost by agreement')
        : (de ? 'Für die Grundkosten bitte Produkt und Menge wählen.' : 'Choose a product and quantity to estimate the base cost.')}</p>
    {total !== null || (product && validQuantity) ? <p className={styles.hint}>
      {de ? 'Versand separat. Endgültiger Preis gemäss Offerte.' : 'Shipping separate. Final price confirmed in the quote.'}
      {validQuantity && Number(quantity) > 10 ? ` ${de ? 'Über 10 Stück: zusätzlicher Mengenrabatt nach Absprache, hier noch nicht abgezogen.' : 'Over 10 items: additional volume discount by agreement, not yet deducted here.'}` : ''}
    </p> : null}
  </div>;
}

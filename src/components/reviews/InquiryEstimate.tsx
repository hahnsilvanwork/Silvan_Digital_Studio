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
      ? `${de ? 'Voraussichtlicher Produktpreis:' : 'Estimated product price:'} CHF ${total}.–`
      : product && validQuantity ? (de ? 'Produktpreis nach Absprache' : 'Product price to be agreed')
        : (de ? 'Wählen Sie Produkt und Menge, um den voraussichtlichen Preis zu sehen.' : 'Choose a product and quantity to see the estimated price.')}</p>
    {total !== null || (product && validQuantity) ? <p className={styles.hint}>
      {de ? 'Versandkosten kommen hinzu. Den endgültigen Gesamtpreis erhalten Sie in der Offerte.' : 'Shipping costs are additional. Your quote confirms the final total.'}
      {validQuantity && Number(quantity) > 10 ? ` ${de ? 'Bei mehr als 10 Stück ist ein zusätzlicher Mengenrabatt nach Absprache möglich. Er ist hier noch nicht abgezogen.' : 'For more than 10 items, an additional quantity discount can be agreed. It has not been deducted here.'}` : ''}
    </p> : null}
  </div>;
}

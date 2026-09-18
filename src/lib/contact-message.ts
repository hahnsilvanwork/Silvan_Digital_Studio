import { contactCopy } from '../content/contact-copy';
import type { Locale } from '../content/types';
import { getContent } from './locales';
import type { ServiceReason, WebsiteTier } from './contact-inquiry';

export const CONTACT_BRIEF_LIMIT = 1500;

/** One draft shared by mail, WhatsApp and the copy fallback. Never persisted. */
export function buildContactMessage(locale: Locale, reason?: ServiceReason, tier?: WebsiteTier, brief = ''): string {
  const copy = contactCopy[locale];
  const selectedTier = reason === 'websites' && tier
    ? getContent(locale).websites.priceTiers.find(item => item.id === tier)
    : undefined;
  const parts = [reason ? `${copy.message} ${copy.reasons[reason]}.` : copy.generalMessage];
  if (selectedTier) parts.push(`${copy.scopeLabel}: ${selectedTier.name} (${selectedTier.price}).`);
  const text = brief.slice(0, CONTACT_BRIEF_LIMIT).trim();
  if (text) parts.push(`${copy.briefTitle}:\n${text}`);
  else if (reason) parts.push(copy.draftQuestions[reason].join('\n\n'));
  parts.push(copy.quoteRequest);
  return parts.join('\n\n');
}

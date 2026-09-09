import { getContent } from './locales';
import { EMPTY_REVIEW_INQUIRY, INQUIRY_LIMITS, type ReviewInquiryValues } from './validation';

export const DRAFT_KEY = 'silvan:language-inquiry:v1';
export const DRAFT_TTL = 2 * 60 * 1000;
export const DRAFT_REQUEST = 'silvan:prepare-inquiry-language-switch';
export interface InquiryDraft { values: ReviewInquiryValues; preview: boolean; adjustingSelection: boolean }
export interface DraftRequest { draft?: InquiryDraft }
type DraftStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
function isDraft(value: unknown): value is InquiryDraft {
  if (!value || typeof value !== 'object') return false;
  const draft = value as InquiryDraft;
  if (typeof draft.preview !== 'boolean' || typeof draft.adjustingSelection !== 'boolean' || !draft.values || typeof draft.values !== 'object') return false;
  const keys = Object.keys(EMPTY_REVIEW_INQUIRY) as (keyof ReviewInquiryValues)[];
  if (Object.keys(draft.values).length !== keys.length || !keys.every(key => typeof draft.values[key] === 'string' && draft.values[key].length <= (INQUIRY_LIMITS[key] ?? 100))) return false;
  const inquiry = getContent('de').reviews.inquiry;
  const options = { destination: inquiry.destinationOptions, product: inquiry.productOptions, shape: inquiry.shapeOptions, size: inquiry.sizeOptions, setup: inquiry.setupOptions };
  return (Object.keys(options) as (keyof typeof options)[]).every(key => draft.values[key] === '' || options[key].some(option => option.value === draft.values[key]));
}
/** Called only by an explicit same-tab language-switch click. No autosave. */
export function saveInquiryDraft(storage: DraftStorage, target: string, draft: InquiryDraft, now = Date.now()): boolean {
  try {
    if (!isDraft(draft)) return false;
    storage.setItem(DRAFT_KEY, JSON.stringify({ version: 1, createdAt: now, target, ...draft }));
    return true;
  } catch { return false; }
}
/** Delete before use, including invalid/expired data. Never restore if deletion fails. */
export function consumeInquiryDraft(storage: DraftStorage, target: string, now = Date.now()): InquiryDraft | null {
  try {
    const raw = storage.getItem(DRAFT_KEY);
    storage.removeItem(DRAFT_KEY);
    if (!raw || raw.length > 10000) return null;
    const data = JSON.parse(raw);
    if (data.version !== 1 || data.target !== target || typeof data.createdAt !== 'number' || !Number.isFinite(data.createdAt) || now < data.createdAt || now - data.createdAt > DRAFT_TTL || !isDraft(data)) return null;
    return { values: data.values, preview: data.preview, adjustingSelection: data.adjustingSelection };
  } catch { return null; }
}

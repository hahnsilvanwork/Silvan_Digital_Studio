import { getContent } from './locales';
import { getInquiryPreset } from './inquiry-selection';
import { EMPTY_REVIEW_INQUIRY, isPositiveInteger, type ReviewInquiryValues } from './validation';

export const SELECTION_KEY = 'silvan:inquiry-selection:v1';
export const SELECTION_TTL = 8 * 60 * 60 * 1000;
type SelectionStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
const fields = ['destination', 'product', 'shape', 'size', 'quantity', 'setup'] as const;
type Selection = Pick<ReviewInquiryValues, typeof fields[number]>;
const inquiry = getContent('de').reviews.inquiry;
const options = { destination: inquiry.destinationOptions, product: inquiry.productOptions, shape: inquiry.shapeOptions, size: inquiry.sizeOptions, setup: inquiry.setupOptions };

function validSelection(value: unknown): value is Selection {
  if (!value || typeof value !== 'object' || Object.keys(value).length !== fields.length) return false;
  const selection = value as Selection;
  return fields.every(field => typeof selection[field] === 'string' && selection[field].length <= 40 && (
    selection[field] === '' || (field === 'quantity' ? isPositiveInteger(selection[field]) : options[field].some(option => option.value === selection[field]))
  )) && (!(selection.shape === 'rectangle' || selection.product === 'nfc-chip') || ['', 'confirm'].includes(selection.size));
}

function matchesModel(values: Selection, modelId: string): boolean {
  if (!modelId) return true;
  const preset = getInquiryPreset(modelId);
  return Boolean(preset && preset.product === values.product && preset.shape === values.shape &&
    (preset.product === 'nfc-chip' || preset.destination === values.destination) && (!preset.size || preset.size === values.size));
}

/** Autosave only enumerated choices and bounded quantity. Never persist free text. */
export function saveInquirySelection(storage: SelectionStorage, modelId: string, values: ReviewInquiryValues, now = Date.now()): boolean {
  try {
    const selection = Object.fromEntries(fields.map(field => [field, field === 'quantity' && !isPositiveInteger(values[field]) ? '' : values[field]])) as Selection;
    if (!validSelection(selection) || !matchesModel(selection, modelId) || !fields.some(field => selection[field])) {
      storage.removeItem(SELECTION_KEY);
      return false;
    }
    storage.setItem(SELECTION_KEY, JSON.stringify({ version: 1, createdAt: now, modelId, selection }));
    return true;
  } catch { return false; }
}

/** Consume once; the mounted form renews only its validated, non-personal choices. */
export function consumeInquirySelection(storage: SelectionStorage, modelId: string, now = Date.now()): ReviewInquiryValues | null {
  try {
    const raw = storage.getItem(SELECTION_KEY);
    storage.removeItem(SELECTION_KEY);
    if (!raw || raw.length > 2000) return null;
    const data = JSON.parse(raw);
    if (data.version !== 1 || data.modelId !== modelId || !Number.isFinite(data.createdAt) || now < data.createdAt || now - data.createdAt > SELECTION_TTL || !validSelection(data.selection) || !matchesModel(data.selection, modelId)) return null;
    return { ...EMPTY_REVIEW_INQUIRY, ...data.selection };
  } catch { return null; }
}

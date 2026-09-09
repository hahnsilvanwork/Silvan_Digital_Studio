import { photoImports } from "../content/photo-products";
import type { NfcProduct } from "../content/types";
import type { ReviewInquiryValues } from "./validation";

type Preset = Pick<ReviewInquiryValues, "destination" | "product" | "shape" | "size">;
const presets: Record<string, Preset> = {
  "review-round-black": {destination:"reviews",product:"standard-card",shape:"round",size:""},
  "review-round-white": {destination:"reviews",product:"standard-card",shape:"round",size:""},
  "review-square-blue": {destination:"reviews",product:"standard-card",shape:"square",size:""},
  "review-stand-white": {destination:"reviews",product:"standard-stand",shape:"",size:""},
  "review-personalized-black": {destination:"reviews",product:"personalized-card",shape:"round",size:""},
  "menu-round-black": {destination:"menu",product:"standard-card",shape:"round",size:""},
  "menu-square-black": {destination:"menu",product:"standard-card",shape:"square",size:""},
  "menu-personalized-white": {destination:"menu",product:"personalized-card",shape:"round",size:""},
  "booking-custom-blue": {destination:"booking",product:"fully-custom-card",shape:"square",size:""},
};

for (const product of photoImports) {
  presets[product.id] = {
    destination: product.platform === 'chip' ? 'other' : product.platform === "google" ? "reviews" : product.platform,
    product: product.packageId,
    shape: product.kind === "stand" ? "" : product.kind === "card" ? "rectangle" : product.kind,
    size: product.packageId === "nfc-chip" || product.kind === "card" ? "confirm" : "",
  };
}

export function getInquiryPreset(id: string): Preset | null {
  return Object.hasOwn(presets, id) ? presets[id] : null;
}

/** Reset model-specific dimensions when switching models; keep contact details. */
export function applyInquiryPreset(values: ReviewInquiryValues, id: string): ReviewInquiryValues {
  const preset = getInquiryPreset(id);
  return preset ? { ...values, ...preset, ...(preset.product === 'nfc-chip' && values.destination ? { destination: values.destination } : {}), quantity: values.quantity || "1" } : values;
}

/** Suggestions are real catalogue models, never a fabricated design or automatic choice. */
export function getMatchingInquiryModels(catalog: readonly NfcProduct[], values: ReviewInquiryValues): readonly NfcProduct[] {
  if (!values.product) return [];
  return catalog.filter(model => {
    const preset = getInquiryPreset(model.id);
    if (!preset || preset.product !== values.product) return false;
    if (values.destination && values.product !== 'nfc-chip' && preset.destination !== values.destination) return false;
    return !values.shape || !preset.shape || preset.shape === values.shape;
  });
}

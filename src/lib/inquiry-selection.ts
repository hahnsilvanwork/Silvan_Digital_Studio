import type { ReviewInquiryValues } from "./validation";

type Preset = Pick<ReviewInquiryValues, "destination" | "product" | "shape">;
const presets: Record<string, Preset> = {
  "review-round-black": {destination:"reviews",product:"standard-card",shape:"round"},
  "review-round-white": {destination:"reviews",product:"standard-card",shape:"round"},
  "review-square-blue": {destination:"reviews",product:"standard-card",shape:"square"},
  "review-stand-white": {destination:"reviews",product:"standard-stand",shape:""},
  "review-personalized-black": {destination:"reviews",product:"personalized-card",shape:"round"},
  "menu-round-black": {destination:"menu",product:"standard-card",shape:"round"},
  "menu-square-black": {destination:"menu",product:"standard-card",shape:"square"},
  "menu-personalized-white": {destination:"menu",product:"personalized-card",shape:"round"},
  "booking-custom-blue": {destination:"booking",product:"fully-custom-card",shape:"square"},
};

export function getInquiryPreset(id: string): Preset | null {
  return Object.hasOwn(presets, id) ? presets[id] : null;
}

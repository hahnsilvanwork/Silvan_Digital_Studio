/**
 * Reveal indices for the standard heading sequence: a label leads, the headline
 * rides in word by word, and whatever follows waits for the last word instead of
 * overtaking it.
 *
 * Every block used to be handed a literal index, which put the eyebrow and the
 * first headline word on the same instant and started the supporting paragraph
 * while the headline was still arriving. Words and blocks also run on different
 * steps, so a follow-on position has to be converted between the two rather than
 * counted -- that conversion is the whole reason this lives in one place.
 */

/** Ceiling for a single word step; see `--reveal-step-word` in globals.css. */
const MAX_WORD_STEP_MS = 70;
/**
 * A headline's entrance takes about the same time whether it is three words or
 * nine. Holding the step fixed instead made a long service-page headline sweep
 * for 630ms before the call to action could even begin to arrive.
 */
const MAX_TITLE_SWEEP_MS = 420;
/** Mirrors `--reveal-step` in globals.css. */
const BLOCK_STEP_MS = 110;
/** Breathing room between the last word landing and the next block starting. */
const HANDOFF_MS = 60;

export interface RevealSequence {
  /** Where the headline's first word starts; the label holds index 0. */
  readonly titleStartIndex: number;
  /** The supporting paragraph, expressed in block steps. */
  readonly introIndex: number;
  /** Actions follow the supporting paragraph. */
  readonly actionsIndex: number;
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** The per-word step that keeps a headline's sweep inside its time budget. */
export function wordStepMs(words: number) {
  return Math.min(MAX_WORD_STEP_MS, Math.round(MAX_TITLE_SWEEP_MS / Math.max(words, 1)));
}

export function revealSequence(title: string): RevealSequence {
  const words = countWords(title);
  // The label holds index 0, so the last word sits at index `words`.
  const sweepMs = words * wordStepMs(words);
  const introIndex = round((sweepMs + HANDOFF_MS) / BLOCK_STEP_MS);

  return {
    titleStartIndex: 1,
    introIndex,
    actionsIndex: round(introIndex + 0.6),
  };
}

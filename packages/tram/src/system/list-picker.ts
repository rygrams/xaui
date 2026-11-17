import { cascade } from '../motion/motion-tokens'

/** How a list of choices opens: unfolding inside its field, or as a page of its own. */
export type ListPickerMode = 'inline' | 'fullscreen'

/** The most choices a field unfolds in place. One more and the list takes the screen. */
export const INLINE_MOST = 5

/** A row's place in its list, in points: where it starts and how tall it is. */
export type RowSpan = { y: number; height: number }

/** No row: what a list with nothing chosen reports. */
export const NO_ROW: RowSpan = { y: 0, height: 0 }

/**
 * How a list of `count` choices opens. A few unfold in place and push what is under the
 * field; more than `INLINE_MOST` take the whole screen. `forced` is the caller's word and
 * wins either way.
 */
export function listPickerMode(
  count: number,
  forced?: ListPickerMode
): ListPickerMode {
  return forced ?? (count > INLINE_MOST ? 'fullscreen' : 'inline')
}

/**
 * A row's turn in the cascade. The current choice goes first; the others follow in the
 * order they are listed. `current` is -1 when nothing is chosen, and a row the list does
 * not know (-1) goes first rather than last. Past `cascade.most` rows share a turn.
 */
export function cascadeRank(index: number, current: number): number {
  if (index < 0 || index === current) return 0

  const turn = current < 0 || index > current ? index : index + 1

  return Math.min(turn, cascade.most)
}

/** Milliseconds a row waits before it arrives, `after` whatever came before the list. */
export function cascadeDelay(rank: number, after = 0): number {
  return after + rank * cascade.stagger
}

/**
 * How far up a folded list is drawn, so that its current choice lies exactly over the
 * field's value: up to the row's start, and half of what the row is taller than the
 * field by. Nothing when no row is chosen — `span.height` is 0.
 */
export function foldedOffset(span: RowSpan, field: number): number {
  'worklet'
  if (span.height <= 0) return 0

  return span.y + (span.height - field) / 2
}

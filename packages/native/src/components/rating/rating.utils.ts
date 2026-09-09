/**
 * How much of the mark at `index` is filled, from 0 to 1.
 *
 * A fraction rather than a boolean, and that is what lets one component be both halves of
 * the job: an average of 4.3 fills the fifth mark three tenths of the way, where a boolean
 * would have to round it to 4 and lose the thing the average was for.
 */
export function fillFor(value: number, index: number): number {
  return Math.min(1, Math.max(0, value - index))
}

export type SnapOptions = {
  /** Where the press landed, in marks — `2.34` is a third of the way into the third. */
  raw: number
  /** The step a press lands on. `1` is whole marks, `0.5` halves. */
  precision: number
  max: number
}

/**
 * The value a press at `raw` marks means.
 *
 * It rounds **up**, which is the only rounding that matches what a finger meant: a tap
 * anywhere in the first mark is one star, not zero, and with `precision={0.5}` a tap on the
 * left half of the third is 2.5 while the right half is 3. Rounding to nearest would make
 * the first sliver of every mark select the one before it, so the leftmost strip of the row
 * would silently rate zero.
 *
 * Clamped into `[precision, max]`: the smallest thing a press can express is one step, and
 * no press can exceed the row it landed in.
 */
export function snapValue({ raw, precision, max }: SnapOptions): number {
  if (precision <= 0) return Math.min(max, Math.max(0, raw))

  const stepped = Math.ceil(raw / precision) * precision
  const clamped = Math.min(max, Math.max(precision, stepped))

  // Steps like 0.1 accumulate float error the moment they are multiplied back out, and a
  // value of 2.9000000000000004 reaches the caller's own state.
  return Math.round(clamped * 1000) / 1000
}

export type PressedShareOptions = {
  /** Where the press landed, in points from the mark's physical left edge (`locationX`). */
  x: number | undefined
  markSize: number
  /** A row read right to left fills each mark from its right edge. */
  isRTL: boolean
}

/**
 * How much of a mark a press covers, from 0 to 1, measured from the edge the fill grows
 * from — the start edge, so the left in a row read left to right and the right in one read
 * right to left. A press in the reach past either edge is clamped to it. A press that
 * cannot be measured — no `locationX`, as a keyboard's or an assistive tool's — counts as
 * the whole mark.
 */
export function pressedShare({ x, markSize, isRTL }: PressedShareOptions): number {
  if (markSize <= 0 || x === undefined || !Number.isFinite(x)) return 1

  const fromStart = isRTL ? markSize - x : x

  return Math.min(1, Math.max(0, fromStart / markSize))
}

export type KeepOnMarkOptions = {
  /** What Native's snap made of the press: `snapRating({ raw: index + share, … })`. */
  value: number
  /** Which mark was pressed, counted from zero. */
  index: number
  precision: number
  max: number
}

/**
 * The snapped value, never below the pressed mark's first step. A press in the reach
 * before a mark's start edge has a share of 0, and `index + 0` snaps to the mark before —
 * the third mark at a precision of 1 would give 2. It is this mark's: 3, or 2.5 at a
 * precision of a half.
 */
export function keepOnMark({
  value,
  index,
  precision,
  max,
}: KeepOnMarkOptions): number {
  const first = index + (precision > 0 ? precision : 0)

  return Math.min(max, Math.max(value, first))
}

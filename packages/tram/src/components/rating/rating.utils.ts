/**
 * How much of a mark a press at `x` points from its start covers, from just above 0 to 1.
 *
 * A press in the reach beside the mark is still this mark's, never the one before it, so
 * the share never reaches 0. A press that cannot be measured — no `locationX`, as a
 * keyboard's or an assistive tool's — counts as the whole mark.
 */
export function pressedShare(x: number | undefined, markSize: number): number {
  if (markSize <= 0 || x === undefined || !Number.isFinite(x)) return 1

  return Math.min(1, Math.max(Number.EPSILON, x / markSize))
}

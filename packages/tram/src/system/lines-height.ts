/** What a field of several lines is measured from. */
export type LinesBox = {
  /** The height of one line, in points. */
  lineHeight: number
  /** What the box adds around its lines: padding and border, top and bottom. */
  chrome: number
}

/**
 * How tall a box has to be to show `lines` whole lines — a text area's `rows`, and its
 * `maxRows`. At least one line: a field of none cannot be typed in.
 */
export function linesHeight(
  lines: number,
  { lineHeight, chrome }: LinesBox
): number {
  return Math.max(1, lines) * lineHeight + chrome
}

import type { ViewStyle } from 'react-native'

/**
 * The long stroke of the tick, as a fraction of the box it sits in. Exported because the
 * `Checkbox`'s indeterminate dash is that same stroke on its own and level, and the two
 * marks drifting apart would read as two different glyph sets.
 */
export const CHECK_SPAN = 0.5

/** The short stroke, as a fraction of the box. */
const CHECK_RISE = 0.25

/**
 * A tick drawn out of two borders of an empty box, a quarter turn from where they look
 * like one — so a control can mark itself in a project that has installed no icon set.
 *
 * It is **derived from the box** rather than tabulated: half its width, a quarter its
 * height. Two numbers in a table would drift from the box the day someone changes it, and
 * a check that is not proportional to its box reads as a different glyph at every size.
 *
 * The lift is the part worth having in one place. An "L" has its ink in one corner, not in
 * the middle of its box, so rotating it about that box's centre leaves the tick sitting
 * low. Rotating by −45° maps a point to `(dy − dx)·√2/2`, and over the two strokes that
 * spans `H` at the top and `H − t − W` at the bottom — an ink centre `(H − t)·√2/4`
 * **below** the box centre, which flexbox then dutifully centres. Lifting by exactly that
 * is what makes the mark look centred rather than measure centred.
 *
 * Both transforms are returned together, and never split across two style objects:
 * `transform` is a whole value, so a later step replaces it rather than blending into it.
 *
 * The colour is not here. A mark takes it from the variant that owns it — the box it fills
 * for a `Checkbox`, the accent's contrast for a completed `Stepper` step.
 */
export function checkGlyph(side: number, stroke: number): ViewStyle {
  const rise = side * CHECK_RISE

  return {
    width: side * CHECK_SPAN,
    height: rise,
    borderStartWidth: stroke,
    borderBottomWidth: stroke,
    transform: [
      { translateY: -((rise - stroke) * Math.SQRT2) / 4 },
      { rotate: '-45deg' },
    ],
  }
}

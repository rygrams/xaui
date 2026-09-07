import { createRecipe } from '../../system/recipe'
import { calendarCellSizes } from '../calendar'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { CalendarSize } from '../calendar'

export type RangeCalendarSlot = 'band' | 'bandStart' | 'bandEnd'

const SLOTS = ['band', 'bandStart', 'bandEnd'] as const

/**
 * **Three slots, because everything else already exists.**
 *
 * The cell, the type, the muted day, the today dot and the chosen day are the `Calendar`'s,
 * and a day in a range is one of its cells with a band behind it. Declaring the rest a second
 * time would be two tables to keep in step, and the drift would show as a range calendar and
 * a calendar side by side half a shade apart.
 *
 * `bgSelected` is what a raw `color` reaches, so the band follows the same tint the chosen
 * ends already take.
 */
const VARIANT_TOKENS: Record<'default', VariantTokens> = {
  default: { bgSelected: 'accentSoft' },
}

/**
 * The band is as tall as the day it runs between, and that number is **read from the
 * `Calendar` rather than restated here**: a table of its own drifted to 32/38/44 against the
 * calendar's 36/40/44, and two points short of the circle at each end is a strip that stops
 * just before the mark it is supposed to join.
 */
function sizeAxis(size: CalendarSize) {
  return (): SlotStyles<RangeCalendarSlot> => {
    const height = calendarCellSizes[size].cell

    return { band: { height }, bandStart: { height }, bandEnd: { height } }
  }
}

export const rangeCalendarRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    /**
     * The band runs the **whole width of the cell, and not one point more**. It is out of
     * flow and behind the number, so nothing about the day's own layout moves when it
     * appears.
     *
     * It used to overhang a point on each side, against the hairline of background a
     * seventh of a row could leave between two days. That cure was worse: a soft token is
     * translucent — `accentSoft` is the accent at fifteen percent — so the two points where
     * one cell's band lay over its neighbour's were painted twice and read as a rule down
     * every seam, which is a border on each selected day rather than one unbroken strip.
     *
     * Abutting exactly is what leaves neither. Yoga rounds a node's leading and trailing
     * edges to the pixel grid independently, so two adjacent cells share the boundary they
     * meet on and no fraction of a seventh can open a gap between them.
     */
    band: { position: 'absolute', start: 0, end: 0 },
    /**
     * **The two ends stop at the middle of their own cell**, which is where the chosen day's
     * circle is. A cell is a seventh of the row and the circle inside it is a fixed square,
     * so a cap drawn to the cell's edge sticks out past the day it belongs to — the band
     * would run four or five points beyond the first and last days of the range, and a
     * period would read as wider than the two days that bound it.
     *
     * From the centre, the cap is hidden under the circle for its whole first half and
     * emerges level with the circle's edge. That also means **no radius on the outer side**:
     * the strip's round ends are the two circles themselves, and a half-pill cap behind them
     * would curve away from the circle it sits under and leave a lens of background between
     * the two. `start` and `end`, never left and right (R13).
     */
    bandStart: { position: 'absolute', start: '50%', end: 0 },
    bandEnd: { position: 'absolute', start: 0, end: '50%' },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    band: { backgroundColor: colors.bgSelected },
    bandStart: { backgroundColor: colors.bgSelected },
    bandEnd: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  // `default` and not just the size: `paint` runs off the *selected* variant, and a table
  // with one entry still has to be selected for its tokens to be read.
  defaultVariants: { variant: 'default', size: 'md' },
})

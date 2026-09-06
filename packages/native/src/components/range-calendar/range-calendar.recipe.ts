import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { XAUITheme } from '../../theme/theme.type'
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

/** How tall the band is, per size — the cell's own height, so it fills the row. */
const HEIGHTS: Record<CalendarSize, number> = { sm: 32, md: 38, lg: 44 }

function sizeAxis(size: CalendarSize) {
  return (): SlotStyles<RangeCalendarSlot> => ({
    band: { height: HEIGHTS[size] },
    bandStart: { height: HEIGHTS[size] },
    bandEnd: { height: HEIGHTS[size] },
  })
}

export const rangeCalendarRecipe = createRecipe({
  slots: SLOTS,

  base: (theme: XAUITheme) => ({
    /**
     * The band runs the **whole width of the cell**, edge to edge, which is what makes one
     * unbroken strip out of seven separate cells. It is out of flow and behind the number,
     * so nothing about the day's own layout moves when it appears.
     *
     * Wider than the cell, in fact: a seventh of a row is a fraction, and a band that
     * stopped at the cell's own edge would leave a hairline of background between two days
     * on a screen whose width does not divide by seven.
     */
    band: {
      position: 'absolute',
      start: -1,
      end: -1,
      borderCurve: 'continuous',
    },
    // The two ends are rounded on their outer side only, so the strip has one shape rather
    // than seven. `start` and `end`, never left and right (R13).
    bandStart: {
      position: 'absolute',
      start: 0,
      end: -1,
      borderCurve: 'continuous',
      borderTopStartRadius: theme.radius.full,
      borderBottomStartRadius: theme.radius.full,
    },
    bandEnd: {
      position: 'absolute',
      start: -1,
      end: 0,
      borderCurve: 'continuous',
      borderTopEndRadius: theme.radius.full,
      borderBottomEndRadius: theme.radius.full,
    },
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

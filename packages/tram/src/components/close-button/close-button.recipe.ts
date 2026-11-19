import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import { DISC_LINE, DISC_SIZE } from '../../system/disc-size'
import type { DiscSize } from '../../system/disc-size'
import type { TramSize } from '../../theme/tram-tokens'
import type { CloseButtonSlot, CloseButtonVariant } from './close-button.type'

const SLOTS = ['root', 'glyph'] as const

export const DEFAULT_SIZE: TramSize = 'md'

export const DEFAULT_VARIANT: CloseButtonVariant = 'outline'

/**
 * How much of the glyph's square the cross spans, on each axis: 14 points of the `md`
 * button's 20, the share of its circle the Metro App Bar's cancel glyph took.
 */
const CROSS_SPAN = 0.7

function sizeAxis({ diameter, glyph }: DiscSize) {
  return (): SlotStyles<CloseButtonSlot> => ({
    root: { width: diameter, height: diameter, borderRadius: diameter / 2 },
    // A bar turned an eighth of a turn spans `length / √2` on each axis: it is longer
    // than the cross looks.
    glyph: { width: Math.round(glyph * CROSS_SPAN * Math.SQRT2) },
  })
}

/**
 * Geometry only. The colours are `discPaint`'s, read by the root from the theme, the
 * `accent` and the `color` — the `Fab`'s and the `AppBar`'s, so the three circles are one
 * drawing.
 *
 * The line is `DISC_LINE` on every size, and so is each bar of the cross: a circle and the
 * cross inside it drawn in the same stroke. No `pressed` and no `disabled` state — the
 * press is the tilt, and the grey is a paint.
 */
export const closeButtonRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    root: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: DISC_LINE,
    },
    // One bar; the root draws it twice, a quarter turn apart, laid over each other at the
    // circle's centre.
    glyph: { position: 'absolute', height: DISC_LINE },
  }),

  variants: {
    size: {
      sm: sizeAxis(DISC_SIZE.sm),
      md: sizeAxis(DISC_SIZE.md),
      lg: sizeAxis(DISC_SIZE.lg),
    },
  },

  defaultVariants: { size: DEFAULT_SIZE },
})

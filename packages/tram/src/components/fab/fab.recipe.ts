import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { DISC_LINE, DISC_SIZE } from '../../system/disc-size'
import type { DiscSize } from '../../system/disc-size'
import type { TramSize } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { FabPlacement, FabSlot, FabVariant } from './fab.type'

const SLOTS = ['root', 'label', 'icon', 'spinner'] as const

export const DEFAULT_SIZE: TramSize = 'md'

export const DEFAULT_VARIANT: FabVariant = 'contained'

/** The middle of the bottom edge: where the Metro App Bar laid its buttons. */
export const DEFAULT_PLACEMENT: FabPlacement = 'bottom-center'

/** The bar's padding under the circle, in points, over the bottom safe area. */
export const DEFAULT_OFFSET = 8

/**
 * The bar's padding over the circle, in points: with the default `offset`, a 40-point
 * circle makes a 56-point band, over the safe area.
 */
export const BAR_TOP = 8

/** The bar's padding at its sides, in points: where a circle at the start or end sits. */
export const BAR_SIDE = 16

function sizeAxis({ diameter, glyph }: DiscSize) {
  return (): SlotStyles<FabSlot> => ({
    root: { width: diameter, height: diameter, borderRadius: diameter / 2 },
    icon: { fontSize: glyph },
    // One of the two circles Tram allows itself, with a quarter left out to turn.
    spinner: {
      width: glyph,
      height: glyph,
      borderRadius: glyph / 2,
      borderWidth: DISC_LINE,
      borderTopColor: 'transparent',
    },
  })
}

/**
 * Geometry only. The colours are not here: they fade from one to the next when the
 * accent, the `color` or the disabled state changes, so the root paints them — from
 * `discPaint` — rather than the cache.
 *
 * No shadow, where the Native `Fab` carries one at rest: Tram has no depth. No `pressed`
 * and no `disabled` state either — the press is the tilt, and the grey is a paint.
 */
export const fabRecipe = createRecipe({
  slots: SLOTS,

  base: (theme: XAUITheme) => ({
    root: { alignItems: 'center', justifyContent: 'center' },
    // The App Bar's label: a caption, centred under its button.
    label: { ...roleType('caption', theme), textAlign: 'center' },
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

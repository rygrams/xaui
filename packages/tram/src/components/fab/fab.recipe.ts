import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
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

/**
 * The circle's line and the busy ring's: the `Button`'s, thin as the App Bar's circle. A
 * filled `Fab` draws it too, in its fill, so the two variants are the same size.
 */
export const LINE_WIDTH = 2

type SizeStep = {
  /** The circle's diameter. The root reaches the 48-point touch target with `hitSlop`. */
  diameter: number
  /** The glyph, and the busy ring that takes its place. */
  glyph: number
}

/**
 * The circle per size. Not Native's 40 / 56 / 72: small, as the Metro App Bar's circles
 * were in their band, eight apart — the largest is the touch target, the two others reach
 * it with `hitSlop`.
 */
export const FAB_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: { diameter: 32, glyph: 16 },
  md: { diameter: 40, glyph: 20 },
  lg: { diameter: 48, glyph: 24 },
}

function sizeAxis({ diameter, glyph }: SizeStep) {
  return (): SlotStyles<FabSlot> => ({
    root: { width: diameter, height: diameter, borderRadius: diameter / 2 },
    icon: { fontSize: glyph },
    // One of the two circles Tram allows itself, with a quarter left out to turn.
    spinner: {
      width: glyph,
      height: glyph,
      borderRadius: glyph / 2,
      borderWidth: LINE_WIDTH,
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
      sm: sizeAxis(FAB_GEOMETRY.sm),
      md: sizeAxis(FAB_GEOMETRY.md),
      lg: sizeAxis(FAB_GEOMETRY.lg),
    },
  },

  defaultVariants: { size: DEFAULT_SIZE },
})

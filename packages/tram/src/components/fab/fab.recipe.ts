import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import type { TramSize } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { FabSlot } from './fab.type'

const SLOTS = ['root', 'label', 'icon', 'spinner'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** How far in from the edges it floats, in points — the Native `Fab`'s. */
export const DEFAULT_OFFSET = 16

/** The busy ring's line: the `Button`'s. */
const LINE_WIDTH = 2

type SizeStep = {
  /** The circle's diameter. All three reach the 48-point touch target. */
  diameter: number
  /** The glyph, and the busy ring that takes its place. */
  glyph: number
}

/**
 * The circle per size. Not Native's 40 / 56 / 72: the smallest is the Metro App Bar
 * button and the touch target at once, and the steps are the `Button`'s, eight apart.
 */
export const FAB_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: { diameter: 48, glyph: 20 },
  md: { diameter: 56, glyph: 24 },
  lg: { diameter: 64, glyph: 28 },
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

import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import type { TramSize } from '../../theme/tram-tokens'
import type { SpinnerSlot } from './spinner.type'

const SLOTS = ['root', 'dot'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the colour lands. */
const DRAWING = 'ring'

/** A dot is a flat fill of the accent — its true colour, as the progress bar's bubbles. */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bg: 'accent' },
}

export type SpinnerStep = {
  /** The ring's diameter, in spacing steps. */
  diameter: number
  /** A dot's, in points. */
  dot: number
}

/**
 * The Metro progress ring at three sizes. A dot is about an eighth of the ring: big
 * enough to read as a dot at 20, small enough at 48 that five never close the ring.
 */
export const SPINNER_GEOMETRY: Record<TramSize, SpinnerStep> = {
  sm: { diameter: 5, dot: 3 },
  md: { diameter: 8, dot: 4 },
  lg: { diameter: 12, dot: 6 },
}

function sizeAxis({ diameter, dot }: SpinnerStep) {
  return (theme: XAUITheme): SlotStyles<SpinnerSlot> => {
    const ring = theme.spacing(diameter)
    // Every dot is laid at the centre and sent out along its angle.
    const centre = (ring - dot) / 2

    return {
      root: { width: ring, height: ring },
      dot: {
        width: dot,
        height: dot,
        borderRadius: dot / 2,
        top: centre,
        start: centre,
      },
    }
  }
}

export const spinnerRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    root: {},
    // A circle, the one shape that goes past the Tram corner.
    dot: { position: 'absolute' },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    dot: { backgroundColor: colors.bg },
  }),

  variants: {
    size: {
      sm: sizeAxis(SPINNER_GEOMETRY.sm),
      md: sizeAxis(SPINNER_GEOMETRY.md),
      lg: sizeAxis(SPINNER_GEOMETRY.lg),
    },
  },

  defaultVariants: { variant: DRAWING, size: DEFAULT_SIZE },
})

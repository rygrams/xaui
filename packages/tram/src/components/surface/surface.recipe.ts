import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize } from '../../theme/tram-tokens'
import type { SurfaceSlot, SurfaceVariant } from './surface.type'

const SLOTS = ['root'] as const

export const DEFAULT_VARIANT: SurfaceVariant = 'primary'

/**
 * Two greys and a line. `tertiary` names no fill: the page shows through, and the line is
 * what draws it — so a tint lands on the line, and the ground stays the page's.
 */
const VARIANT_TOKENS: Record<SurfaceVariant, VariantTokens> = {
  primary: { bg: 'surface' },
  secondary: { bg: 'surfaceSecondary' },
  tertiary: { border: 'border' },
}

type SizeStep = { padding: number; gap: number }

/** Spacing steps, not points: 12, 16 and 20 of padding. */
const SIZES: Record<TramSize, SizeStep> = {
  sm: { padding: 3, gap: 2 },
  md: { padding: 4, gap: 2.5 },
  lg: { padding: 5, gap: 3 },
}

function sizeAxis({ padding, gap }: SizeStep) {
  return (theme: XAUITheme) => ({
    root: { padding: theme.spacing(padding), gap: theme.spacing(gap) },
  })
}

/** The `radius` axis under the Tram ceiling: a ground is a box, never a pill. */
function cornerAxis(): Record<RadiusKey, StyleFn<SurfaceSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<SurfaceSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      root: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

export const surfaceRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flexDirection: 'column',
      borderRadius: boxCornerFor('lg', theme.radius),
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /** The theme's line, 3, and only where the variant names one. */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg ?? 'transparent',
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: cornerAxis(),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: 'md' },
})

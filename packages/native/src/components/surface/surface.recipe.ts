import { createRecipe, radiusAxis } from '../../system/recipe'
import type { VariantTokens } from '../../system/recipe'
import type { RadiusKey, Size, XAUITheme } from '../../theme/theme.type'
import type { SurfaceSlot, SurfaceVariant } from './surface.type'

const SLOTS = ['root'] as const

/**
 * The three surface levels the theme already names, plus nothing.
 *
 * They descend rather than compete: `primary` sits on the page, `secondary` inside a
 * `primary`, `tertiary` inside a `secondary`. That is the whole vocabulary — a fourth
 * level would be a shade nobody could place, and the `ghost` at the end is not a level but
 * the absence of one, for a `Surface` used only for its padding and its corner.
 */
const VARIANT_TOKENS: Record<SurfaceVariant, VariantTokens> = {
  primary: { bg: 'surface', fg: 'surfaceForeground' },
  secondary: { bg: 'surfaceSecondary', fg: 'surfaceSecondaryForeground' },
  tertiary: { bg: 'surfaceTertiary', fg: 'surfaceTertiaryForeground' },
  ghost: { fg: 'foreground' },
}

type SizeStep = { padding: number; gap: number; radius: RadiusKey }

/**
 * `size` moves the padding, the gap and the corner — **never a height**. A surface is a
 * ground: how tall it is, is how tall what is on it is.
 *
 * `md` is HeroUI's, measured: sixteen points of padding on a twenty-four point corner.
 */
const SIZES: Record<Size, SizeStep> = {
  xs: { padding: 2.5, gap: 1.5, radius: 'lg' },
  sm: { padding: 3, gap: 2, radius: 'xl' },
  md: { padding: 4, gap: 2.5, radius: '2xl' },
  lg: { padding: 5, gap: 3, radius: '3xl' },
}

function sizeAxis({ padding, gap, radius }: SizeStep) {
  return (theme: XAUITheme) => ({
    root: {
      padding: theme.spacing(padding),
      gap: theme.spacing(gap),
      borderRadius: theme.radius[radius],
    },
  })
}

export const surfaceRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    root: { flexDirection: 'column' as const, borderCurve: 'continuous' as const },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({ root: { backgroundColor: colors.bg } }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /**
     * Off by default and asked for, rather than tied to the variant.
     *
     * A `Card` decides for you — its `default` is always lifted. A surface is the raw
     * ground, and whether a ground is above the one under it is the layout's business:
     * the same `secondary` is flat inside a card and lifted floating over a list.
     */
    isElevated: {
      true: (theme: XAUITheme) => ({ root: theme.shadows.surface }),
    },

    radius: radiusAxis('root'),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})

export type { SurfaceSlot }

import { createRecipe, radiusAxis } from '../../system/recipe'
import type { VariantTokens } from '../../system/recipe'
import type { RadiusKey, Size, XAUITheme } from '../../theme/theme.type'
import type { SurfaceSlot, SurfaceVariant } from './surface.type'

const SLOTS = ['root'] as const

/**
 * The three levels, descending: `primary` sits on the page, `secondary` inside a
 * `primary`, `tertiary` inside a `secondary`. That is the whole vocabulary — a fourth
 * level would be a shade nobody could place.
 *
 * **`tertiary` is an edge rather than a third grey.** It takes the page's own
 * `background` and names a `border`, so what draws it is the line and not the fill: two
 * tokens the theme states per mode, which is why the edge lands darker than the ground in
 * light and lighter than it in dark with no branch written here. Below a `secondary`
 * there is no grey left that reads as a level — there is only an outline.
 */
const VARIANT_TOKENS: Record<SurfaceVariant, VariantTokens> = {
  primary: { bg: 'surface', fg: 'surfaceForeground' },
  secondary: { bg: 'surfaceSecondary', fg: 'surfaceSecondaryForeground' },
  tertiary: { bg: 'background', fg: 'foreground', border: 'border' },
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

  /** Only `tertiary` names a border, so only `tertiary` gets a width to draw it with. */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
  }),

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

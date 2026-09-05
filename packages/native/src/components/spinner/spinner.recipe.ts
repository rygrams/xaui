import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { XAUITheme } from '../../theme/theme.type'
import { alpha } from '../../utils/colors'
import type { SpinnerSize, SpinnerSlot, SpinnerVariant } from './spinner.type'

const SLOTS = ['root', 'arc'] as const

/**
 * Seven lines of data, and every one of them names an ink — see `SpinnerVariant` for why
 * `primary` is `accent` here where it is `accentForeground` on a `Chip`.
 *
 * Only `fg` is declared. `bg` and `border` are the roles of a component that has a
 * surface, and the two rings this one draws are both the same ink at two opacities, which
 * `paint` computes rather than the table naming twice.
 *
 * A raw `color` follows for free: `resolveTint` maps a bare token name to the tint itself
 * and `…SoftForeground` to its readable slice, so a tinted `secondary` stays one step off
 * the tinted `primary` exactly as the tokens are.
 */
const VARIANT_TOKENS: Record<SpinnerVariant, VariantTokens> = {
  primary: { fg: 'accent' },
  secondary: { fg: 'accentSoftForeground' },
  default: { fg: 'foreground' },
  tertiary: { fg: 'muted' },
  success: { fg: 'success' },
  warning: { fg: 'warning' },
  danger: { fg: 'danger' },
}

/**
 * How much of the ink is left in the track — the full circle the arc sweeps over.
 *
 * It is what separates this from `Button.Spinner`'s bare arc, and it is the whole reason
 * the component reads as HeroUI's does: their spinner is one stroke fading from opaque to
 * 55%, which needs a gradient and therefore `react-native-svg`. Two rings of one colour
 * at two opacities is the same figure drawn with borders — no optional peer for a core
 * component, and no SVG node per spinner in a list.
 */
const TRACK_OPACITY = 0.18

/**
 * `size` drives the diameter and the stroke together. There is no width axis to speak of:
 * a spinner is a circle, so its `size` is the only measurement it has.
 *
 * The four steps are HeroUI's three — 16, 24, 32 — with the 20 our ladder adds between
 * the first two. The stroke thickens once, at `lg`: a 2pt ring on a 32pt circle reads as
 * a hairline, and a 3pt ring on a 16pt one reads as a doughnut.
 */
function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<SpinnerSlot> => {
    const diameter = theme.spacing(step.diameter)
    const stroke = theme.borderWidth.default * step.stroke

    return {
      root: {
        width: diameter,
        height: diameter,
        borderRadius: diameter / 2,
        borderWidth: stroke,
      },
      // The arc is the same ring, drawn one stroke outside the track's box so the two
      // circles land on each other rather than nesting. R13 — `start` and `end`, so the
      // inset mirrors with the layout instead of staying put.
      arc: {
        position: 'absolute',
        top: -stroke,
        bottom: -stroke,
        start: -stroke,
        end: -stroke,
        borderRadius: diameter / 2 + stroke,
        borderWidth: stroke,
      },
    }
  }
}

type SizeStep = {
  /** Spacing steps, not pixels — `spacing(6)` is 24 on the base-4 scale. */
  diameter: number
  /** Multiples of `borderWidth.default`, so a theme that thickens its edges thickens this. */
  stroke: number
}

const SIZES: Record<SpinnerSize, SizeStep> = {
  xs: { diameter: 4, stroke: 2 },
  sm: { diameter: 5, stroke: 2 },
  md: { diameter: 6, stroke: 2 },
  lg: { diameter: 8, stroke: 3 },
}

export const spinnerRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    // Squircle corners are meaningless on a full circle, and `overflow` would clip the
    // arc that deliberately sits outside this box.
    root: { alignItems: 'center', justifyContent: 'center' },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * One ink, two opacities, and the gap that makes the rotation visible.
   *
   * `borderTopColor: 'transparent'` is structural rather than a colour the theme has an
   * opinion about — it is the quarter of the circle that is missing, and without it a
   * rotating ring is a ring.
   */
  paint: (_theme, colors) => ({
    root: { borderColor: colors.fg ? alpha(colors.fg, TRACK_OPACITY) : undefined },
    arc: { borderColor: colors.fg, borderTopColor: 'transparent' },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})

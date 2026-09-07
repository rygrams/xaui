import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { ChartSize, ChartSlot, ChartVariant } from './chart.type'

const SLOTS = ['root', 'label', 'grid', 'axis'] as const

/**
 * `bgSelected` is the series' ink — the `ProgressBar`'s role, meaning the same thing on a
 * curve instead of a bar. It is a **role** rather than a token named in an axis for the
 * reason the engine documents: the tint pass re-runs `paint` and never the axes, so a
 * series colour written as an axis would snap back to the accent the moment a caller set
 * `color`, and the palette walked out of it would go with it.
 *
 * There is no `bg`. A chart is drawn on the card it sits on; one that painted its own
 * ground would be a card inside a card.
 */
const VARIANT_TOKENS: Record<ChartVariant, VariantTokens> = {
  primary: { bgSelected: 'accent' },
  secondary: { bgSelected: 'foreground' },
  success: { bgSelected: 'success' },
  warning: { bgSelected: 'warning' },
  danger: { bgSelected: 'danger' },
}

type SizeStep = {
  /** The plot's height, in points. Off the spacing grid, like the `Slider`'s rail. */
  height: number
  label: FontSizeKey
}

/**
 * **`size` is the plot's height, never its width.** A chart spans its parent — RN's own
 * behaviour, and the reason there is no `fullWidth` — and how tall it is is the only thing
 * a caller cannot infer from the column it sits in.
 */
const SIZES: Record<ChartSize, SizeStep> = {
  sm: { height: 140, label: 'xs' },
  md: { height: 200, label: 'xs' },
  lg: { height: 280, label: 'sm' },
}

function sizeAxis(step: SizeStep) {
  const { height, label } = step

  return (theme: XAUITheme): SlotStyles<ChartSlot> => ({
    root: { height },
    label: {
      fontSize: theme.fontSizes[label],
      lineHeight: theme.lineHeights[label],
    },
  })
}

export const chartRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { width: '100%' },
    label: { fontFamily: theme.fontFamilies.body, color: theme.colors.muted },
    // The rules behind the series are the **separator**, not the border: a grid is a
    // reading aid rather than an edge, and at the border's weight it competes with the
    // line it exists to help you read.
    grid: { backgroundColor: theme.colors.separator },
    axis: { backgroundColor: theme.colors.border },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * The ink rides on `root` — a slot whose `color` is never a style anyone renders, because
   * an SVG path is painted by a **prop**. The root reads it back off the resolved styles,
   * exactly as the `ProgressCircle` reads its two strokes off two slots it never draws.
   */
  paint: (_theme, colors) => ({ root: { color: colors.bgSelected } }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})

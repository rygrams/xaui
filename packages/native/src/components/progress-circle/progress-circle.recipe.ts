import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import { SIZES } from './progress-circle.geometry'
import type {
  ProgressCircleSize,
  ProgressCircleSlot,
  ProgressCircleVariant,
} from './progress-circle.type'

const SLOTS = ['root', 'track', 'fill', 'value'] as const

/** The `ProgressBar`'s table, unchanged: one neutral ring, and five arcs on it. */
const VARIANT_TOKENS: Record<ProgressCircleVariant, VariantTokens> = {
  primary: { bg: 'default', bgSelected: 'accent' },
  secondary: { bg: 'default', bgSelected: 'foreground' },
  success: { bg: 'default', bgSelected: 'success' },
  warning: { bg: 'default', bgSelected: 'warning' },
  danger: { bg: 'default', bgSelected: 'danger' },
}

/** The type in the middle. Small enough that "100 %" fits the ring it is written in. */
const VALUE_TYPE: Record<ProgressCircleSize, FontSizeKey> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
}

function sizeAxis(size: ProgressCircleSize) {
  const { diameter } = SIZES[size]

  return (theme: XAUITheme): SlotStyles<ProgressCircleSlot> => ({
    root: { width: diameter, height: diameter },
    value: {
      fontSize: theme.fontSizes[VALUE_TYPE[size]],
      lineHeight: theme.lineHeights[VALUE_TYPE[size]],
    },
  })
}

export const progressCircleRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // No `overflow`, no squircle: a circle has no corners, and the SVG fills the box.
    root: { alignItems: 'center', justifyContent: 'center' },
    value: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.foreground,
      // A number counting up must not shift the ring's centre under it.
      fontVariant: ['tabular-nums'],
      position: 'absolute',
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * `track` and `fill` are **colour carriers, not nodes**. An SVG path takes its colour
   * from a `stroke` prop rather than from a stylesheet, so the root flattens these two and
   * hands the strings down — the same thing the `Tabs` recipe does with its `content` slot,
   * and the reason both live in the recipe is that a raw `color` has to reach the arc
   * through `resolveTint`, which only maps roles a variant declared.
   */
  paint: (_theme, colors) => ({
    track: { color: colors.bg },
    fill: { color: colors.bgSelected },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})

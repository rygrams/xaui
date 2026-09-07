import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { ChartSize, ChartSlot, ChartVariant } from './chart.type'

const SLOTS = [
  'root',
  'ink',
  'plot',
  'label',
  'grid',
  'axis',
  'header',
  'heading',
  'footer',
  'title',
  'description',
  'value',
  'legend',
  'legendItem',
  'legendDot',
  'legendLabel',
] as const

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
  title: FontSizeKey
  /** The big number a header carries when the figure is about one. */
  value: FontSizeKey
}

/**
 * **`size` is the plot's height, never its width.** A chart spans its parent — RN's own
 * behaviour, and the reason there is no `fullWidth` — and how tall it is is the only thing
 * a caller cannot infer from the column it sits in.
 */
const SIZES: Record<ChartSize, SizeStep> = {
  sm: { height: 140, label: 'xs', title: 'sm', value: 'xl' },
  md: { height: 200, label: 'xs', title: 'md', value: '2xl' },
  lg: { height: 280, label: 'sm', title: 'lg', value: '3xl' },
}

function sizeAxis(step: SizeStep) {
  const { height, label, title, value } = step

  return (theme: XAUITheme): SlotStyles<ChartSlot> => ({
    plot: { height },
    label: {
      fontSize: theme.fontSizes[label],
      lineHeight: theme.lineHeights[label],
    },
    title: {
      fontSize: theme.fontSizes[title],
      lineHeight: theme.lineHeights[title],
    },
    description: {
      fontSize: theme.fontSizes[label],
      lineHeight: theme.lineHeights[label],
    },
    value: {
      fontSize: theme.fontSizes[value],
      lineHeight: theme.lineHeights[value],
    },
    legendLabel: {
      fontSize: theme.fontSizes[label],
      lineHeight: theme.lineHeights[label],
    },
  })
}

export const chartRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // The card the figure is read against. It is the `Chart` container's, not the plot's —
    // a chart used on its own draws no ground, and this is what a caller reaches for when
    // they want the whole thing: a title, the figure, a legend under it.
    root: {
      width: '100%',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius['2xl'],
      padding: theme.spacing(4),
      gap: theme.spacing(3),
    },
    plot: { width: '100%' },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: theme.spacing(3),
    },
    /** The title and its description, as one block on the leading edge. */
    heading: { flexShrink: 1, gap: theme.spacing(0.5) },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(3),
      flexWrap: 'wrap',
    },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
      color: theme.colors.foreground,
    },
    description: { fontFamily: theme.fontFamilies.body, color: theme.colors.muted },
    value: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.bold,
      color: theme.colors.foreground,
      // A number that grows a digit must not shift the words beside it.
      fontVariant: ['tabular-nums'],
    },
    legend: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(4),
      flexWrap: 'wrap',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1.5),
    },
    legendDot: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      borderRadius: theme.radius.full,
    },
    legendLabel: { fontFamily: theme.fontFamilies.body, color: theme.colors.muted },
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
  paint: (_theme, colors) => ({ ink: { color: colors.bgSelected } }),

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

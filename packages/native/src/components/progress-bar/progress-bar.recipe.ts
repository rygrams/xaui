import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type {
  ProgressBarSize,
  ProgressBarSlot,
  ProgressBarVariant,
} from './progress-bar.type'

const SLOTS = ['root', 'header', 'label', 'value', 'track', 'fill'] as const

/**
 * `bg` is the rail and `bgSelected` is the part of it that is filled — the `Checkbox`'s
 * pair, meaning the same thing on a line instead of in a box. They are roles rather than
 * two tokens named in a `variant` axis for the reason the engine documents: the tint pass
 * re-runs `paint`, not the axes, so a fill written as an axis would snap back to the accent
 * the moment a caller set `color`.
 *
 * The rail is the same neutral under all five. What the variant names is the fill, because
 * the rail is the room left to go and that is not success, warning or danger.
 */
const VARIANT_TOKENS: Record<ProgressBarVariant, VariantTokens> = {
  primary: { bg: 'default', bgSelected: 'accent' },
  secondary: { bg: 'default', bgSelected: 'foreground' },
  success: { bg: 'default', bgSelected: 'success' },
  warning: { bg: 'default', bgSelected: 'warning' },
  danger: { bg: 'default', bgSelected: 'danger' },
}

type SizeStep = {
  /** The rail's thickness, in points. Off the spacing grid, for the `Slider`'s reason. */
  track: number
  /** The label and the value share it — they are one line read left to right. */
  header: FontSizeKey
}

/**
 * The rail is 4 to 8 points thick, and that is the whole of what `size` does here besides
 * the header's type. **Never width**: a bar's length is its parent's, exactly as a
 * `Button`'s is, which is why there is no `fullWidth` and why the root spans by default.
 *
 * Off the spacing grid on purpose, like the `Slider`'s rail: how thin a line can be and
 * still read as a bar has nothing to do with the gaps between things.
 */
const SIZES: Record<ProgressBarSize, SizeStep> = {
  sm: { track: 4, header: 'sm' },
  md: { track: 6, header: 'md' },
  lg: { track: 8, header: 'lg' },
}

function sizeAxis(step: SizeStep) {
  const { track, header } = step

  return (theme: XAUITheme): SlotStyles<ProgressBarSlot> => ({
    track: { height: track },
    label: {
      fontSize: theme.fontSizes[header],
      lineHeight: theme.lineHeights[header],
    },
    value: {
      fontSize: theme.fontSizes[header],
      lineHeight: theme.lineHeights[header],
    },
  })
}

export const progressBarRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // 6, not the grid's 8: the header is the bar's caption, not a sibling paragraph, so it
    // sits nearer the rail than one block sits from the next and the two read as one unit.
    root: { width: '100%', gap: theme.spacing(1.5) },
    // The label and the value are one line, pushed apart. R4 — the gap and the alignment
    // are the header's, and neither text slot carries a margin of its own.
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: theme.spacing(2),
    },
    label: { fontFamily: theme.fontFamilies.body, color: theme.colors.foreground },
    // Quieter than the label, because the label says what is happening and the number only
    // says how far: the reader needs one of them to be the sentence.
    value: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
      fontVariant: ['tabular-nums'],
    },
    track: {
      width: '100%',
      // The fill is a child that grows, not an absolutely positioned overlay, so the rail
      // clips it at both ends and a `radius` on the rail rounds the fill's far edge too.
      overflow: 'hidden',
      borderRadius: theme.radius.full,
      flexDirection: 'row',
    },
    fill: { height: '100%', borderRadius: theme.radius.full },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    track: { backgroundColor: colors.bg },
    fill: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** Both nodes, so a squared-off rail does not hold a rounded fill. */
    radius: radiusAxis('track', 'fill'),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})

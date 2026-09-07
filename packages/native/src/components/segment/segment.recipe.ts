import { StyleSheet } from 'react-native'
import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { SegmentSize, SegmentSlot, SegmentVariant } from './segment.type'

const SLOTS = [
  'root',
  'indicator',
  'item',
  'separator',
  'label',
  'labelSelected',
] as const

/**
 * One shape, and it is the theme's `segment` family — the tokens that exist for exactly
 * this: a raised sliver inside a recessed track, which is a pair no other component needs.
 *
 * `bgSelected` and `fgSelected` are roles rather than tokens named in a state, so a raw
 * `color` follows the pill and the word on it: the tint pass re-runs `paint`, not the axes.
 */
const VARIANT_TOKENS: Record<SegmentVariant, VariantTokens> = {
  default: {
    bg: 'default',
    bgSelected: 'segment',
    fgSelected: 'segmentForeground',
  },
}

/** One device pixel — 0.33 at 3× — and no theme has an opinion about that. */
const HAIRLINE = StyleSheet.hairlineWidth

/**
 * The track's inset, in points rather than in spacing steps. It is the gap between the
 * pill and the track's own edge, and at three points it is optical — half a spacing step
 * would be two, and the pill would touch.
 */
const TRACK_INSET = 3

type SizeStep = {
  paddingHorizontal: number
  paddingVertical: number
  gap: number
  label: FontSizeKey
}

const SIZES: Record<SegmentSize, SizeStep> = {
  sm: { paddingHorizontal: 2.5, paddingVertical: 1, gap: 1, label: 'sm' },
  md: { paddingHorizontal: 3, paddingVertical: 1.5, gap: 1.5, label: 'md' },
  lg: { paddingHorizontal: 4, paddingVertical: 2, gap: 2, label: 'lg' },
}

function sizeAxis(step: SizeStep) {
  const { paddingHorizontal, paddingVertical, gap, label } = step

  return (theme: XAUITheme): SlotStyles<SegmentSlot> => ({
    item: {
      paddingHorizontal: theme.spacing(paddingHorizontal),
      paddingVertical: theme.spacing(paddingVertical),
      gap: theme.spacing(gap),
    },
    // Inset by the option's own vertical padding, so the rule spans exactly the label
    // beside it. A hairline running the full height of the track reads as a column edge
    // rather than as the seam between two options.
    separator: {
      top: theme.spacing(paddingVertical),
      bottom: theme.spacing(paddingVertical),
    },
    label: {
      fontSize: theme.fontSizes[label],
      lineHeight: theme.lineHeights[label],
    },
  })
}

export const segmentRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      // Hugs its options rather than filling the row. A segment as wide as the screen with
      // two options in it is a navigation bar pretending to be a filter.
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      padding: TRACK_INSET,
      borderRadius: theme.radius['3xl'],
      borderCurve: 'continuous',
    },
    indicator: {
      position: 'absolute',
      zIndex: 0,
      top: TRACK_INSET,
      bottom: TRACK_INSET,
      borderRadius: theme.radius['3xl'],
      borderCurve: 'continuous',
      ...theme.shadows.surface,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Pinned to the option's own leading edge, which is the boundary between it and the
    // one before it: the track lays its options out with no gap, so the two edges coincide.
    separator: {
      position: 'absolute',
      start: 0,
      width: HAIRLINE,
      backgroundColor: theme.colors.separator,
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.muted,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    root: { backgroundColor: colors.bg },
    indicator: { backgroundColor: colors.bgSelected },
    // Read by the root and handed to the chosen option's label alone, which is why it is
    // on a slot the recipe otherwise leaves to `muted`.
    labelSelected: { color: colors.fgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('root', 'indicator'),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'default', size: 'md' },
})

export type { SegmentSlot }

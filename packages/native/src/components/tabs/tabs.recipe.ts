import { StyleSheet } from 'react-native'
import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { TabsSize, TabsSlot, TabsVariant } from './tabs.type'

const SLOTS = [
  'root',
  'list',
  'trigger',
  'separator',
  'label',
  'indicator',
  'content',
] as const

/** One device pixel — 0.33 at 3× — and no theme has an opinion about that. */
const HAIRLINE = StyleSheet.hairlineWidth

/**
 * The three shapes read the same three roles, and that is the point: a tint lands on any
 * of them through the same names, whether it ends up painting a pill, a rule or a word.
 *
 * `light` names no `bg` and no `bgSelected`, which is not an omission — it is how it has
 * no track and no rule. `paint` resolves both to nothing, so the list stays transparent
 * and the indicator, having no fill and no compound to give it a size, draws nothing even
 * when a caller leaves `<Tabs.Indicator />` in place.
 */
const VARIANT_TOKENS: Record<TabsVariant, VariantTokens> = {
  primary: { bg: 'default', bgSelected: 'segment', fgSelected: 'segmentForeground' },
  secondary: { bgSelected: 'accent', fgSelected: 'foreground' },
  // The accent rather than the foreground: with nothing else moving, the colour is the
  // whole signal, and a chosen tab in plain ink reads as one that is merely darker.
  light: { fgSelected: 'accent' },
}

type SizeStep = {
  paddingHorizontal: number
  paddingVertical: number
  gap: number
  label: FontSizeKey
}

const SIZES: Record<TabsSize, SizeStep> = {
  sm: { paddingHorizontal: 2.5, paddingVertical: 1, gap: 1, label: 'sm' },
  md: { paddingHorizontal: 3, paddingVertical: 1.5, gap: 1.5, label: 'md' },
  lg: { paddingHorizontal: 4, paddingVertical: 2, gap: 2, label: 'lg' },
}

/**
 * The track's inset, in points rather than in spacing steps. It is the gap between the
 * pill and the track's own edge, and at three points it is optical — half a spacing step
 * would be two, and the pill would touch.
 */
const TRACK_INSET = 3

function sizeAxis(step: SizeStep) {
  const { paddingHorizontal, paddingVertical, gap, label } = step

  return (theme: XAUITheme): SlotStyles<TabsSlot> => ({
    trigger: {
      paddingHorizontal: theme.spacing(paddingHorizontal),
      paddingVertical: theme.spacing(paddingVertical),
      gap: theme.spacing(gap),
    },
    // Inset by the trigger's own vertical padding, so the rule spans exactly the label
    // beside it. A hairline running the full height of the track reads as a table's
    // column edge rather than as the seam between two segments.
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

export const tabsRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'column', gap: theme.spacing(2) },
    list: {
      // Hugs its tabs rather than filling the row. A tab bar as wide as the screen with
      // three tabs in it is a segmented control pretending to be a navigation bar.
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      borderCurve: 'continuous',
    },
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
      color: theme.colors.muted,
    },
    // Behind the triggers, not over them: it is the surface the chosen tab sits on.
    indicator: { position: 'absolute', zIndex: 0, borderCurve: 'continuous' },
    // Pinned to the trigger's own leading edge, which is the boundary between it and the
    // tab before it: the list lays its triggers out with no gap, so the two edges coincide.
    separator: {
      position: 'absolute',
      start: 0,
      width: HAIRLINE,
      backgroundColor: theme.colors.separator,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors): SlotStyles<TabsSlot> => ({
    list: { backgroundColor: colors.bg },
    indicator: { backgroundColor: colors.bgSelected },
    // Read by the root and handed to the chosen trigger's label alone, which is why it is
    // on a slot the recipe otherwise leaves to `muted`.
    content: { color: colors.fgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },
    radius: radiusAxis('list', 'indicator'),
  },

  /**
   * Where the shapes differ, and `light` is absent on purpose: the base gives the list no
   * padding, no corner and no edge, so a shape that adds none of them is the base itself.
   * `primary` is a pill inside a filled track, so the track is padded and both corners are
   * round; `secondary` is a rule along a bottom edge, so the track carries a hairline and
   * the indicator is that rule.
   */
  compoundVariants: [
    {
      when: { variant: 'primary' },
      style: (theme: XAUITheme): SlotStyles<TabsSlot> => ({
        list: { padding: TRACK_INSET, borderRadius: theme.radius['3xl'] },
        indicator: {
          top: TRACK_INSET,
          bottom: TRACK_INSET,
          borderRadius: theme.radius['3xl'],
          ...theme.shadows.surface,
        },
      }),
    },
    {
      when: { variant: 'secondary' },
      style: (theme: XAUITheme): SlotStyles<TabsSlot> => ({
        list: {
          borderBottomWidth: theme.borderWidth.default,
          borderColor: theme.colors.border,
        },
        // Two points rather than a hairline: a rule that says which tab is chosen has to
        // outweigh the one it sits on.
        indicator: { bottom: 0, height: 2, borderRadius: 0 },
      }),
    },
  ],

  states: {
    disabled: theme => ({ list: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})

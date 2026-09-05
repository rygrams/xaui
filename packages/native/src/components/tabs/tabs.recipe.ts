import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { TabsSize, TabsSlot, TabsVariant } from './tabs.type'

const SLOTS = ['root', 'list', 'trigger', 'label', 'indicator', 'content'] as const

/**
 * The two shapes read the same two roles, and that is the point: what a tab looks like
 * when it is chosen is `segment` on `default` in one and `accent` under it in the other,
 * but a tint lands on both through the same names.
 */
const VARIANT_TOKENS: Record<TabsVariant, VariantTokens> = {
  primary: { bg: 'default', bgSelected: 'segment', fgSelected: 'segmentForeground' },
  secondary: { bgSelected: 'accent', fgSelected: 'foreground' },
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
   * The two shapes, and the only place they differ. `primary` is a pill inside a filled
   * track, so the track is padded and both corners are round; `secondary` is a rule along
   * a bottom edge, so the track has a hairline under it and the indicator is that rule.
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

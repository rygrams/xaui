import { StyleSheet } from 'react-native'
import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, Size, XAUITheme } from '../../theme/theme.type'
import type { AccordionSlot, AccordionVariant } from './accordion.type'

const SLOTS = [
  'root',
  'separator',
  'item',
  'trigger',
  'indicator',
  'content',
] as const

/**
 * The `Card`'s **tokens** under the `Button`'s **names**. An accordion in `primary` is a
 * card with rows in it, so the surface family is what it reads — two containers that look
 * alike and are declared apart drift, and the drift shows up as an accordion on a card
 * with a fill one step off it. But `primary` is what the library calls a strong fill
 * everywhere except the `Card`, so that is the name it takes.
 */
const VARIANT_TOKENS: Record<AccordionVariant, VariantTokens> = {
  primary: { bg: 'surface', fg: 'surfaceForeground' },
  default: { bg: 'surfaceSecondary', fg: 'surfaceSecondaryForeground' },
  tertiary: { border: 'border', fg: 'foreground' },
  ghost: { fg: 'foreground' },
}

/**
 * A hairline is one device pixel — 0.33 at 3× — and no theme has an opinion about that,
 * which is why it is the one measurement here that does not come off the scale.
 */
const HAIRLINE = StyleSheet.hairlineWidth

type SizeStep = {
  /** Spacing steps. The row's own inset, and what the panel lines up with. */
  padding: number
  /** Between the label and the chevron. */
  gap: number
  label: FontSizeKey
  glyph: FontSizeKey
}

const SIZES: Record<Size, SizeStep> = {
  xs: { padding: 2.5, gap: 2.5, label: 'sm', glyph: 'md' },
  sm: { padding: 3, gap: 3, label: 'md', glyph: 'lg' },
  md: { padding: 3, gap: 4, label: 'md', glyph: 'lg' },
  lg: { padding: 4, gap: 4, label: 'lg', glyph: 'xl' },
}

/**
 * The trigger is taller than it is wide-padded, and deliberately: HeroUI puts sixteen
 * points above and below against twelve on the sides, which is what gives a row of plain
 * text a target big enough to hit without a border to aim at.
 */
const TRIGGER_PADDING_VERTICAL = 4

function sizeAxis(step: SizeStep) {
  const { padding, gap, label, glyph } = step

  return (theme: XAUITheme): SlotStyles<AccordionSlot> => ({
    trigger: {
      paddingVertical: theme.spacing(TRIGGER_PADDING_VERTICAL),
      paddingHorizontal: theme.spacing(padding),
      gap: theme.spacing(gap),
      fontSize: theme.fontSizes[label],
      lineHeight: theme.lineHeights[label],
    },
    indicator: { fontSize: theme.fontSizes[glyph] },
    content: {
      paddingHorizontal: theme.spacing(padding),
      paddingBottom: theme.spacing(TRIGGER_PADDING_VERTICAL),
    },
  })
}

export const accordionRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // `overflow: 'hidden'` is what makes the height animation read as a panel unrolling
    // rather than as content sliding out from behind the row above it.
    root: { flexDirection: 'column', overflow: 'hidden', borderCurve: 'continuous' },
    separator: { height: HAIRLINE, backgroundColor: theme.colors.separator },
    item: { flexDirection: 'column', overflow: 'hidden' },
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
    indicator: { alignItems: 'center', justifyContent: 'center' },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * The fill is the **root's**, never the row's. A row that painted its own would stack
   * two fills where the separator sits, and the hairline would disappear into the seam.
   */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    trigger: { color: colors.fg },
    indicator: { color: theme.colors.muted },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('root'),
  },

  /**
   * A container inset from its own edge, and its separators inset with it. `ghost` has no
   * edge to be inset from, so its rows run the full width and the hairline runs with them
   * — which is the difference between a list on a page and a list in a box.
   */
  compoundVariants: (['primary', 'default', 'tertiary'] as const).map(variant => ({
    when: { variant },
    style: (theme: XAUITheme): SlotStyles<AccordionSlot> => ({
      root: { borderRadius: theme.radius['2xl'] },
      separator: { marginHorizontal: theme.spacing(3) },
    }),
  })),

  states: {
    // On the row, not on the root: pressing one row must not tint the whole container.
    pressed: theme => ({
      trigger: { backgroundColor: theme.colors.defaultSoftPressed },
    }),
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'ghost', size: 'md' },
})

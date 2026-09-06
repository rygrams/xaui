import { StyleSheet } from 'react-native'
import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, Size, XAUITheme } from '../../theme/theme.type'
import type { ListSlot, ListVariant } from './list.type'

const SLOTS = [
  'root',
  'container',
  'separator',
  'item',
  'itemPressed',
  'prefix',
  'content',
  'title',
  'description',
  'suffix',
] as const

/**
 * The `Accordion`'s ladder, and it is the same one for the same reason: a list in
 * `primary` **is** a card with rows in it, and two containers that look alike and are
 * declared apart drift until a list on a card sits one shade off it.
 *
 * `bgPressed` is what a row becomes under a finger. It is a role rather than a token named
 * in a pressed state so that a tinted list presses in its own colour — the tint pass
 * re-runs `paint`, not the axes.
 */
const VARIANT_TOKENS: Record<ListVariant, VariantTokens> = {
  primary: { bg: 'surface', fg: 'surfaceForeground', bgPressed: 'surfacePressed' },
  secondary: {
    bg: 'surfaceSecondary',
    fg: 'surfaceSecondaryForeground',
    bgPressed: 'surfacePressed',
  },
  tertiary: { border: 'border', fg: 'foreground', bgPressed: 'surfacePressed' },
  ghost: { fg: 'foreground', bgPressed: 'surfacePressed' },
}

/** One device pixel — 0.33 at 3× — and no theme has an opinion about that. */
const HAIRLINE = StyleSheet.hairlineWidth

type SizeStep = {
  /** Spacing steps. The row's own inset, and what the separator is inset by. */
  padding: number
  /** Down the row: between the prefix, the text and the suffix. */
  gap: number
  /** Between the title and the description, which is a fraction of the row's gap. */
  contentGap: number
  title: FontSizeKey
  description: FontSizeKey
  glyph: FontSizeKey
  radius: RadiusKey
}

/**
 * The corner sits one level below the `Card`'s at every step, as the `Accordion`'s does: a
 * card wraps its content with padding on all four sides so a large corner curves through
 * empty space, where a list's rows run edge to edge and the same corner would curve through
 * the first row's own text.
 */
const SIZES: Record<Size, SizeStep> = {
  xs: {
    padding: 2.5,
    gap: 2.5,
    contentGap: 0.5,
    title: 'sm',
    description: 'xs',
    glyph: 'md',
    radius: 'md',
  },
  sm: {
    padding: 3,
    gap: 3,
    contentGap: 0.5,
    title: 'md',
    description: 'sm',
    glyph: 'lg',
    radius: 'lg',
  },
  md: {
    padding: 3,
    gap: 3,
    contentGap: 0.5,
    title: 'md',
    description: 'sm',
    glyph: 'lg',
    radius: 'xl',
  },
  lg: {
    padding: 4,
    gap: 4,
    contentGap: 1,
    title: 'lg',
    description: 'md',
    glyph: 'xl',
    radius: '2xl',
  },
}

/**
 * A row is taller than it is wide-padded, the way the `Accordion`'s trigger is: sixteen
 * points above and below against twelve on the sides, which is what gives a line of plain
 * text a target big enough to hit without a border to aim at.
 */
const ITEM_PADDING_VERTICAL = 4

function sizeAxis(step: SizeStep) {
  const { padding, gap, contentGap, title, description, glyph, radius } = step

  return (theme: XAUITheme): SlotStyles<ListSlot> => ({
    // Both layers at the same value: the outer draws the corner, the inner is what a
    // pressed row is cut against.
    root: { borderRadius: theme.radius[radius] },
    container: { borderRadius: theme.radius[radius] },
    // The hairline stops where the text starts rather than running the full width. A
    // separator under a row's own inset reads as a rule the rows hang off; one that starts
    // with them reads as the gap between two rows, which is what it is.
    separator: { marginHorizontal: theme.spacing(padding) },
    item: {
      paddingVertical: theme.spacing(ITEM_PADDING_VERTICAL),
      paddingHorizontal: theme.spacing(padding),
      gap: theme.spacing(gap),
    },
    content: { gap: theme.spacing(contentGap) },
    title: {
      fontSize: theme.fontSizes[title],
      lineHeight: theme.lineHeights[title],
    },
    description: {
      fontSize: theme.fontSizes[description],
      lineHeight: theme.lineHeights[description],
    },
    prefix: { fontSize: theme.fontSizes[glyph] },
    suffix: { fontSize: theme.fontSizes[glyph] },
  })
}

export const listRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // The root carries the shadow and the border, and must **not** clip: on iOS
    // `overflow: 'hidden'` sets `masksToBounds`, which cuts the layer's own shadow off
    // with everything else, and a lifted `primary` would have none at all.
    root: { flexDirection: 'column', borderCurve: 'continuous' },
    // So the clipping is one layer in — the one extra node in this component, and it is
    // here for a platform constraint rather than for layout. Without it the press wash on
    // the first and last rows paints square over the container's rounded corner.
    container: { flexDirection: 'column', overflow: 'hidden' },
    separator: { height: HAIRLINE, backgroundColor: theme.colors.separator },
    item: { flexDirection: 'row', alignItems: 'center' },
    // `flex: 1` is what makes the suffix sit at the end of the row rather than beside the
    // title: the text takes whatever the prefix and the suffix leave.
    content: { flex: 1, flexDirection: 'column' },
    prefix: { alignItems: 'center', justifyContent: 'center' },
    suffix: { alignItems: 'center', justifyContent: 'center' },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.medium,
    },
    description: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * The fill is the **root's**, never the row's. A row that painted its own would stack two
   * fills where the separator sits, and the hairline would disappear into the seam.
   *
   * `itemPressed` is painted unconditionally on a slot the row only wears while it is held
   * down — which keeps the press out of the cache key and inside the tint pass at once.
   */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    itemPressed: { backgroundColor: colors.bgPressed },
    title: { color: colors.fg },
    prefix: { color: theme.colors.muted },
    suffix: { color: theme.colors.muted },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: radiusAxis('root', 'container'),
  },

  /**
   * `ghost` has no edge for its separators to be inset from, so its rows run the full width
   * and the hairline runs with them — the difference between a list in a box and a list on
   * a page. It is the same exception the `Accordion` makes, and for the same reading.
   */
  compoundVariants: [
    {
      when: { variant: 'ghost' },
      style: () => ({
        item: { paddingHorizontal: 0 },
        separator: { marginHorizontal: 0 },
      }),
    },
    // `primary` is the one that reads as a card, and a card is lifted. A shadow under a
    // ground that barely differs from the page reads as dirt rather than as height, so the
    // quieter three stay flat.
    {
      when: { variant: 'primary' },
      style: theme => ({ root: theme.shadows.surface }),
    },
  ],

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})

export type { ListSlot }

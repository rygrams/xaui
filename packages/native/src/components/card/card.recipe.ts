import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, XAUITheme } from '../../theme/theme.type'
import type { CardSize, CardSlot, CardVariant } from './card.type'

const SLOTS = ['root', 'header', 'body', 'footer', 'title', 'description'] as const

/**
 * Four lines of data. A variant **names tokens and computes nothing** — `paint` below is
 * the only place that decides where a colour lands.
 *
 * The theme's `surface*` family exists for exactly this: non-floating components, cards
 * first among them. `default` is the surface, `secondary` the level above it for a card
 * nested in one, `tertiary` drops the fill for the border, and `ghost` drops that too and
 * keeps only the text colour — the same ladder, and the same four names, the `Button`
 * uses for its own emphasis.
 *
 * **No `bgPressed`.** A card takes its press as a wash rather than as a change of fill —
 * see the note on the root's overlay — so no variant here names a pressed token.
 */
const VARIANT_TOKENS: Record<CardVariant, VariantTokens> = {
  default: { bg: 'surface', border: 'border', fg: 'surfaceForeground' },
  secondary: {
    bg: 'surfaceSecondary',
    border: 'border',
    fg: 'surfaceSecondaryForeground',
  },
  tertiary: { border: 'border', fg: 'foreground' },
  ghost: { fg: 'foreground' },
}

/**
 * How far the description sits behind the title.
 *
 * It is an opacity rather than the `muted` token because the card's foreground is not
 * fixed: a `color`ed card paints its text in the tint's contrasted slice, and a grey
 * secondary text on a saturated fill is the one combination that stops being readable.
 * A fraction of whatever the title uses holds for every variant and every tint.
 */
const DESCRIPTION_OPACITY = 0.7

/**
 * `size` drives padding, gaps, radius and type — **never a height**. A card is a surface:
 * it is as tall as its content, and as wide as its parent lets it be, which is RN's own
 * behaviour and the reason there is no `fullWidth` prop here either.
 *
 * Two gaps, not one. `gap` separates the sections — header, body, footer — and
 * `contentGap` separates what sits inside one of them, a title from its description. One
 * value for both reads as a list of five things rather than as three blocks.
 */
function sizeAxis(step: SizeStep) {
  const { padding, gap, contentGap, radius, title, description } = step

  return (theme: XAUITheme): SlotStyles<CardSlot> => ({
    root: {
      padding: theme.spacing(padding),
      gap: theme.spacing(gap),
      borderRadius: theme.radius[radius],
    },
    header: { gap: theme.spacing(contentGap) },
    body: { gap: theme.spacing(contentGap) },
    footer: { gap: theme.spacing(contentGap) },
    title: {
      fontSize: theme.fontSizes[title],
      lineHeight: theme.lineHeights[title],
    },
    description: {
      fontSize: theme.fontSizes[description],
      lineHeight: theme.lineHeights[description],
    },
  })
}

type SizeStep = {
  /** Spacing steps, not pixels — `spacing(3.5)` is 14 on the base-4 scale. */
  padding: number
  /** Between the sections. */
  gap: number
  /** Inside one section — a title and its description. */
  contentGap: number
  radius: RadiusKey
  title: FontSizeKey
  description: FontSizeKey
}

const SIZES: Record<CardSize, SizeStep> = {
  xs: {
    padding: 3,
    gap: 2,
    contentGap: 1,
    radius: 'lg',
    title: 'sm',
    description: 'xs',
  },
  sm: {
    padding: 4,
    gap: 2.5,
    contentGap: 1,
    radius: 'xl',
    title: 'md',
    description: 'sm',
  },
  md: {
    padding: 5,
    gap: 3,
    contentGap: 1.5,
    radius: 'xl',
    title: 'lg',
    description: 'sm',
  },
  lg: {
    padding: 6,
    gap: 4,
    contentGap: 2,
    radius: '2xl',
    title: 'xl',
    description: 'md',
  },
}

export const cardRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flexDirection: 'column',
      borderWidth: 0,
      // iOS's squircle. Free on Android, and it is what makes a card's radius read as a
      // shape rather than as four arcs meeting straight edges.
      borderCurve: 'continuous',
      // Deliberately no `overflow: 'hidden'`: on iOS it clips the node's own shadow, so
      // a `default` card would lose the elevation the variant just gave it. The press
      // wash rounds itself off the root's corners and needs no clip; a caller bleeding an
      // image to the edges writes `overflow="hidden"` and takes the trade knowingly.
    },
    // Top-aligned content — a badge, an icon, a title block. A column pinned to the
    // leading edge, which RTL mirrors on its own; `flexDirection="row"` is one prop away
    // for a header that puts an action at the far end.
    header: { alignItems: 'flex-start' },
    // `flexGrow` and not `flex: 1`. `flex: 1` also sets `flexBasis: 0`, and in a card
    // whose height comes from its content that measures the body as empty before there
    // is any free space to give back to it — the collapse is silent and total.
    body: { flexGrow: 1 },
    // A footer is an action row: the one section whose common case is horizontal, so it
    // is the one section that is a row by default.
    footer: { flexDirection: 'row', alignItems: 'center' },
    title: {
      fontFamily: theme.fontFamilies.heading,
      fontWeight: theme.fontWeights.semibold,
    },
    description: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.regular,
      opacity: DESCRIPTION_OPACITY,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Where the variant's colours land, for every variant at once. The border width follows
   * the *presence* of the border role, so `ghost` needs no rule of its own to say it has
   * no edge.
   */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    title: { color: colors.fg },
    description: { color: colors.fg },
  }),

  /** Declaration order is application order: `radius` overrides the radius `size` set. */
  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: {
      xs: t => ({ root: { borderRadius: t.radius.xs } }),
      sm: t => ({ root: { borderRadius: t.radius.sm } }),
      md: t => ({ root: { borderRadius: t.radius.md } }),
      lg: t => ({ root: { borderRadius: t.radius.lg } }),
      xl: t => ({ root: { borderRadius: t.radius.xl } }),
      '2xl': t => ({ root: { borderRadius: t.radius['2xl'] } }),
      '3xl': t => ({ root: { borderRadius: t.radius['3xl'] } }),
      '4xl': t => ({ root: { borderRadius: t.radius['4xl'] } }),
      field: t => ({ root: { borderRadius: t.radius.field } }),
      full: t => ({ root: { borderRadius: t.radius.full } }),
    },
  },

  /**
   * The elevation belongs to the one variant that is a surface standing on the
   * background. `secondary` is the level for a card *inside* a card and `tertiary` and
   * `ghost` have no fill to lift, so a shadow under any of them would read as dirt rather
   * than as height. In dark mode the theme's `surface` shadow is already nothing (§4),
   * which is why this names the role instead of a set of numbers.
   */
  compoundVariants: [
    {
      when: { variant: 'default' },
      style: theme => ({ root: theme.shadows.surface }),
    },
  ],

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'default', size: 'md' },
})

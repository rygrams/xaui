import { RADIUS_KEYS, createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, XAUITheme } from '../../theme/theme.type'
import type { WidgetSize, WidgetSlot, WidgetVariant } from './widget.type'

const SLOTS = [
  'root',
  'header',
  'heading',
  'title',
  'description',
  'content',
  'footer',
] as const

/** The card's own ground — the `Surface`'s table, because a widget is one of those. */
const VARIANT_TOKENS: Record<WidgetVariant, VariantTokens> = {
  primary: { bg: 'surface', fg: 'surfaceForeground' },
  secondary: { bg: 'surfaceSecondary', fg: 'surfaceSecondaryForeground' },
  tertiary: { bg: 'background', fg: 'foreground', border: 'border' },
}

type SizeStep = {
  /** The card's own inset, in spacing steps. */
  padding: number
  /** Between the header, the well and the footer. */
  gap: number
  /** The well's inset, which is smaller: it is a panel, not a second card. */
  well: number
  radius: RadiusKey
  title: FontSizeKey
  footer: FontSizeKey
}

/**
 * `size` moves the padding, the gaps, the corner and the type — **never a height**. A widget
 * is as tall as what is in it, which is the `Surface`'s rule and the reason neither takes a
 * height at all.
 */
const SIZES: Record<WidgetSize, SizeStep> = {
  xs: { padding: 3, gap: 2, well: 2, radius: 'xl', title: 'sm', footer: 'xs' },
  sm: {
    padding: 3.5,
    gap: 2.5,
    well: 2.5,
    radius: '2xl',
    title: 'md',
    footer: 'xs',
  },
  md: { padding: 4, gap: 3, well: 3, radius: '2xl', title: 'lg', footer: 'sm' },
  lg: { padding: 5, gap: 3.5, well: 3.5, radius: '3xl', title: 'xl', footer: 'sm' },
}

/**
 * How much smaller the well's corner is than the card's.
 *
 * The **nesting rule**: an inner corner should be the outer one less the gap between them,
 * or the two arcs run at different rates and the inset reads as a sticker rather than as a
 * well cut into the card. Here the gap is the card's own padding, so the subtraction is
 * exactly that — and it is clamped at zero, because a large padding on a small corner would
 * otherwise ask for a negative radius.
 */
function wellRadius(theme: XAUITheme, radius: RadiusKey, padding: number): number {
  return Math.max(0, theme.radius[radius] - theme.spacing(padding))
}

const SIZE_KEYS = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly WidgetSize[]

/**
 * The nesting rule, as a table.
 *
 * The well's corner depends on **both** the card's corner and the padding between them, and
 * an axis sees only its own prop: `size` does not know the `radius` the caller passed, and
 * `radius` does not know the padding. So the pair is a compound, one per combination.
 *
 * Without it, a `radius` prop would move the card's corner and leave the well's where the
 * size had put it — an inset whose arcs no longer match the ones around them, which is the
 * one thing this component's shape depends on. Forty entries written by a loop rather than
 * four written by hand.
 */
const NESTED_RADII = SIZE_KEYS.flatMap(size =>
  RADIUS_KEYS.map(radius => ({
    when: { size, radius },
    style: (theme: XAUITheme) => ({
      content: { borderRadius: wellRadius(theme, radius, SIZES[size].padding) },
    }),
  }))
)

function sizeAxis(step: SizeStep) {
  const { padding, gap, well, radius, title, footer } = step

  return (theme: XAUITheme): SlotStyles<WidgetSlot> => ({
    root: {
      padding: theme.spacing(padding),
      gap: theme.spacing(gap),
      borderRadius: theme.radius[radius],
    },
    content: {
      padding: theme.spacing(well),
      // The corner this size implies. An explicit `radius` prop replaces it through
      // `NESTED_RADII`, which is the only other place the well's corner is set.
      borderRadius: wellRadius(theme, radius, padding),
    },
    title: {
      fontSize: theme.fontSizes[title],
      lineHeight: theme.lineHeights[title],
    },
    description: {
      fontSize: theme.fontSizes[footer],
      lineHeight: theme.lineHeights[footer],
    },
    footer: {
      fontSize: theme.fontSizes[footer],
      lineHeight: theme.lineHeights[footer],
    },
  })
}

export const widgetRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flexDirection: 'column',
      // iOS's squircle. It is free on Android, and at this corner it is the difference
      // between a shape and two arcs meeting a straight edge.
      borderCurve: 'continuous',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: theme.spacing(3),
    },
    /** The title and its description, as one block that shrinks rather than pushes. */
    heading: { flexShrink: 1, gap: theme.spacing(0.5) },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
      color: theme.colors.foreground,
    },
    description: { fontFamily: theme.fontFamilies.body, color: theme.colors.muted },
    content: { borderCurve: 'continuous', overflow: 'hidden' },
    footer: { fontFamily: theme.fontFamilies.body, color: theme.colors.muted },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    title: { color: colors.fg },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** The card's corner. The well's is derived from it, so it moves with it. */
    radius: radiusAxis('root'),

    elevated: {
      true: theme => ({ root: theme.shadows.surface }),
    },
  },

  /**
   * **The well is one level below the card**, and that is the whole of what makes this a
   * widget rather than a `Card`: the content sits in a panel cut into the ground rather
   * than flush on it.
   *
   * A compound rather than a role, because it is a *second background* and the engine's
   * roles have one. Naming it `bgSelected` would have made a raw `color` paint the well,
   * which is not what a tint on a container means.
   */
  compoundVariants: [
    {
      when: { variant: 'primary' },
      style: theme => ({
        content: { backgroundColor: theme.colors.surfaceSecondary },
      }),
    },
    {
      when: { variant: 'secondary' },
      style: theme => ({
        content: { backgroundColor: theme.colors.surfaceTertiary },
      }),
    },
    {
      // The card here is the page's own colour with an outline, so there is nothing below
      // it to recess into: the well steps **up** instead, and reads as the one solid thing
      // inside an outline.
      when: { variant: 'tertiary' },
      style: theme => ({ content: { backgroundColor: theme.colors.surface } }),
    },
    ...NESTED_RADII,
  ],

  defaultVariants: { variant: 'primary', size: 'md' },
})

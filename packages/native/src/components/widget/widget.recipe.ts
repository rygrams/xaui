import { RADIUS_KEYS, createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles } from '../../system/recipe'
import type { FontSizeKey, RadiusKey, XAUITheme } from '../../theme/theme.type'
import type { WidgetSize, WidgetSlot } from './widget.type'

const SLOTS = [
  'root',
  'header',
  'heading',
  'title',
  'description',
  'content',
  'footer',
] as const

type SizeStep = {
  /** The frame's own inset, in spacing steps — how far the card is held off the edge. */
  padding: number
  /** Between the header, the card and the footer. */
  gap: number
  /** The card's own inset, which is smaller: it holds a figure, it is not a second frame. */
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
 * How much smaller the card's corner is than the frame's.
 *
 * The **nesting rule**: an inner corner should be the outer one less the gap between them,
 * or the two arcs run at different rates and the inset reads as a sticker rather than as a
 * card the frame is holding. Here the gap is the frame's own padding, so the subtraction is
 * exactly that — and it is clamped at zero, because a large padding on a small corner would
 * otherwise ask for a negative radius.
 */
function cardRadius(theme: XAUITheme, radius: RadiusKey, padding: number): number {
  return Math.max(0, theme.radius[radius] - theme.spacing(padding))
}

const SIZE_KEYS = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly WidgetSize[]

/**
 * The nesting rule, as a table.
 *
 * The card's corner depends on **both** the frame's corner and the padding between them, and
 * an axis sees only its own prop: `size` does not know the `radius` the caller passed, and
 * `radius` does not know the padding. So the pair is a compound, one per combination.
 *
 * Without it, a `radius` prop would move the frame's corner and leave the card's where the
 * size had put it — an inset whose arcs no longer match the ones around them, which is the
 * one thing this component's shape depends on. Forty entries written by a loop rather than
 * four written by hand.
 */
const NESTED_RADII = SIZE_KEYS.flatMap(size =>
  RADIUS_KEYS.map(radius => ({
    when: { size, radius },
    style: (theme: XAUITheme) => ({
      content: { borderRadius: cardRadius(theme, radius, SIZES[size].padding) },
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
      // `NESTED_RADII`, which is the only other place the card's corner is set.
      borderRadius: cardRadius(theme, radius, padding),
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
    /**
     * The frame: a quiet `defaultSoft` ground, no border. It is **not** a card — the header
     * and the footer sit straight on it, and the one card in a widget is `Widget.Content`.
     */
    root: {
      flexDirection: 'column',
      backgroundColor: theme.colors.defaultSoft,
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
      color: theme.colors.defaultSoftForeground,
    },
    description: { fontFamily: theme.fontFamilies.body, color: theme.colors.muted },
    /**
     * The card, held in the frame: `surface`, one step **up** from the soft ground. It
     * clips, so a figure drawn to its edges takes the corner rather than overhanging it.
     */
    content: {
      backgroundColor: theme.colors.surface,
      borderCurve: 'continuous',
      overflow: 'hidden',
    },
    footer: { fontFamily: theme.fontFamilies.body, color: theme.colors.muted },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** The frame's corner. The card's is derived from it, so it moves with it. */
    radius: radiusAxis('root'),

    /**
     * The shadow lifts **the card**, not the frame: the soft ground stays flat against the
     * page, and the card reads as the raised thing inside it. On by default — a widget is
     * one of several on a dashboard, and the lift is what separates the card from its frame.
     */
    elevated: {
      true: theme => ({ content: theme.shadows.surface }),
    },
  },

  compoundVariants: [...NESTED_RADII],

  defaultVariants: { size: 'md' },
})

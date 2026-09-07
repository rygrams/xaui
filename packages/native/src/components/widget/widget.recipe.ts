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
  /** The frame's side inset, in spacing steps — tighter than the top and bottom. */
  paddingX: number
  /** The frame's top and bottom inset. This is the gap the card's corner is derived from. */
  paddingY: number
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
 *
 * The side inset is one step tighter than the vertical: the card carries most of the width,
 * so a wide horizontal band on either side of it is margin the frame does not need.
 */
const SIZES: Record<WidgetSize, SizeStep> = {
  xs: {
    paddingX: 2,
    paddingY: 3,
    gap: 2,
    well: 2,
    radius: 'xl',
    title: 'sm',
    footer: 'xs',
  },
  sm: {
    paddingX: 2,
    paddingY: 3,
    gap: 2.5,
    well: 2.5,
    radius: 'xl',
    title: 'md',
    footer: 'xs',
  },
  md: {
    paddingX: 2,
    paddingY: 2,
    gap: 3,
    well: 3,
    radius: 'xl',
    title: 'lg',
    footer: 'sm',
  },
  lg: {
    paddingX: 2,
    paddingY: 3,
    gap: 3.5,
    well: 3.5,
    radius: 'xl',
    title: 'xl',
    footer: 'sm',
  },
}

/**
 * How much smaller the card's corner is than the frame's.
 *
 * The **nesting rule**: an inner corner should be the outer one less the gap between them,
 * or the two arcs run at different rates and the inset reads as a sticker rather than as a
 * card the frame is holding. The gap here is the frame's **vertical** padding — the band
 * above and below the card, which is what a near-full-width card visibly sits within — and
 * it is clamped at zero, because a large padding on a small corner would otherwise ask for a
 * negative radius.
 */
function cardRadius(theme: XAUITheme, radius: RadiusKey, paddingY: number): number {
  return Math.max(0, theme.radius[radius] - theme.spacing(paddingY))
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
      content: { borderRadius: cardRadius(theme, radius, SIZES[size].paddingY) },
    }),
  }))
)

function sizeAxis(step: SizeStep) {
  const { paddingX, paddingY, gap, well, radius, title, footer } = step

  return (theme: XAUITheme): SlotStyles<WidgetSlot> => ({
    root: {
      paddingHorizontal: theme.spacing(paddingX),
      paddingVertical: theme.spacing(paddingY),
      gap: theme.spacing(gap),
      borderRadius: theme.radius[radius],
    },
    content: {
      padding: theme.spacing(well),
      // The corner this size implies. An explicit `radius` prop replaces it through
      // `NESTED_RADII`, which is the only other place the card's corner is set.
      borderRadius: cardRadius(theme, radius, paddingY),
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
      // A hair of side padding of their own, so the header and footer text sits a touch
      // inside the card's edge rather than flush against where it begins. Fixed, not on
      // the `size` ladder — it is optical alignment, not spacing.
      paddingHorizontal: theme.spacing(1),
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
     * The card, held in the frame: one step **up** from the soft ground. It clips, so a
     * figure drawn to its edges takes the corner rather than overhanging it.
     *
     * `surface` in light is white against a near-white frame — the step is obvious. In dark
     * `surface` (`#18181b`) lands on top of what `defaultSoft` composites to (about the
     * same), so the card vanishes; and dark mode drops the surface shadow, so colour is the
     * only separation left. `surfaceSecondary` is the raised-surface step above it.
     */
    content: {
      backgroundColor:
        theme.mode === 'dark' ? theme.colors.surfaceSecondary : theme.colors.surface,
      borderCurve: 'continuous',
      overflow: 'hidden',
    },
    footer: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
      paddingHorizontal: theme.spacing(1),
    },
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
     * In dark mode `theme.shadows.surface` is empty by design, and the colour step above
     * carries the separation on its own.
     */
    elevated: {
      true: theme => ({ content: theme.shadows.surface }),
    },
  },

  compoundVariants: [...NESTED_RADII],

  defaultVariants: { size: 'md' },
})

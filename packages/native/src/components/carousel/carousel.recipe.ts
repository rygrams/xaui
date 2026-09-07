import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { CarouselSize, CarouselSlot, CarouselVariant } from './carousel.type'

const SLOTS = [
  'root',
  'content',
  'item',
  'control',
  'controlInactive',
  'chevron',
  'indicator',
  'dot',
  'dotActive',
  'counter',
  'thumbnails',
  'thumbnail',
  'thumbnailActive',
] as const

/**
 * The tokens paint the **controls**, never the slides.
 *
 * `bgSelected` and `fgSelected` are the active pill and the chevron, and they are named
 * that way for the reason `tint()` exists: those are the two things a raw `color` has to
 * reach, and only the roles survive a re-tint. The inactive dots keep a neutral fill from
 * `base`, which is what a tint should leave alone — they are the ground the pill travels on.
 */
const VARIANT_TOKENS: Record<CarouselVariant, VariantTokens> = {
  // The arrows sit **on** the slide, so their ground is the raised one rather than the
  // page's: a control the same colour as the page vanishes over a pale photograph.
  primary: {
    bg: 'surface',
    fg: 'foreground',
    bgSelected: 'accent',
    fgSelected: 'foreground',
  },
  secondary: {
    bg: 'default',
    fg: 'defaultForeground',
    bgSelected: 'defaultForeground',
    fgSelected: 'defaultForeground',
  },
  tertiary: {
    bg: 'surface',
    fg: 'foreground',
    border: 'border',
    bgSelected: 'foreground',
    fgSelected: 'foreground',
  },
  // No ground at all: the chevron is drawn straight on the slide, which is what a carousel
  // over a dark photograph wants and what a carousel over a white one must not use.
  ghost: { fg: 'foreground', bgSelected: 'accent', fgSelected: 'foreground' },
}

type SizeStep = {
  /** The arrow button's diameter. */
  control: number
  /** The chevron's own box, inside it. */
  chevron: number
  /** How thick the chevron's stroke is. */
  stroke: number
  /** An inactive dot's diameter, and the active pill's height. */
  dot: number
  /** How wide the active pill stretches. */
  pill: number
  /** Between two slides, and between two dots, in spacing steps. */
  gap: number
  /** A thumbnail's side. */
  thumbnail: number
  counter: FontSizeKey
}

/**
 * `size` moves the controls, the gaps and the corners — **never a slide**. How tall a
 * carousel is, is how tall what is in it is, and how wide a slide is comes from the track's
 * own width through `carouselMetrics`.
 */
const SIZES: Record<CarouselSize, SizeStep> = {
  xs: {
    control: 24,
    chevron: 6,
    stroke: 1.5,
    dot: 5,
    pill: 14,
    gap: 1.5,
    thumbnail: 40,
    counter: 'xs',
  },
  sm: {
    control: 30,
    chevron: 7,
    stroke: 1.5,
    dot: 6,
    pill: 18,
    gap: 2,
    thumbnail: 48,
    counter: 'xs',
  },
  md: {
    control: 36,
    chevron: 8,
    stroke: 2,
    dot: 7,
    pill: 22,
    gap: 2.5,
    thumbnail: 60,
    counter: 'sm',
  },
  lg: {
    control: 44,
    chevron: 10,
    stroke: 2,
    dot: 8,
    pill: 26,
    gap: 3,
    thumbnail: 72,
    counter: 'md',
  },
}

/** The gap the size implies, in points — the default for the root's `gap` prop. */
export function carouselGap(theme: XAUITheme, size: CarouselSize): number {
  return theme.spacing(SIZES[size].gap)
}

/**
 * Where an arrow sits: its own diameter, and how far in from the track's edge.
 *
 * Read here rather than resolved as a style because both numbers are **arithmetic at the
 * call site** — an arrow is centred on the track's measured height, and only the component
 * that knows that height can subtract half of a button from it.
 */
export function carouselControlBox(
  theme: XAUITheme,
  size: CarouselSize
): { size: number; inset: number } {
  return { size: SIZES[size].control, inset: theme.spacing(2) }
}

function sizeAxis(step: SizeStep) {
  const { control, chevron, stroke, dot, pill, gap, thumbnail, counter } = step

  return (theme: XAUITheme): SlotStyles<CarouselSlot> => ({
    control: { width: control, height: control, borderRadius: control / 2 },
    chevron: { width: chevron, height: chevron, borderWidth: stroke },
    indicator: { gap: theme.spacing(gap) * 0.5, height: dot },
    dot: { width: dot, height: dot, borderRadius: dot / 2 },
    /**
     * The chosen dot, **read as values and never applied as a style**: the width and the
     * colour are interpolated on the UI thread, and a worklet cannot read a `StyleSheet`
     * id. The root flattens this slot into `dotInk`, so the recipe still owns both numbers.
     *
     * A pill, not a wider dot: the corner stays the dot's own, so the shape grows sideways
     * out of the circle it was rather than turning into a different one.
     */
    dotActive: { width: pill, height: dot, borderRadius: dot / 2 },
    thumbnails: { gap: theme.spacing(gap) * 0.75 },
    thumbnail: { width: thumbnail, height: thumbnail },
    thumbnailActive: { width: thumbnail, height: thumbnail },
    counter: {
      fontSize: theme.fontSizes[counter],
      lineHeight: theme.lineHeights[counter],
    },
  })
}

export const carouselRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'column', gap: theme.spacing(2), position: 'relative' },
    content: { flexGrow: 0 },
    item: {
      borderCurve: 'continuous',
      overflow: 'hidden',
      // A slide is exactly as wide as `carouselMetrics` said and never less. In a row it
      // is a flex item, and a flex item with a width still *shrinks* to fit its container
      // — so five slides in a track one slide wide would each squeeze down to a fifth, the
      // content would stop overflowing, and a carousel with nowhere to scroll to would sit
      // there showing all five at once and ignoring its own arrows.
      flexShrink: 0,
    },
    /**
     * An arrow at the end of a series that does not loop. It stays in place and stays
     * legible — a control that disappears at the last slide takes its width with it and
     * shifts everything beside it.
     *
     * A slot rather than a state, because the engine's states are a fixed set and this is
     * not one of them: the carousel is not disabled, one of its two arrows is.
     */
    controlInactive: { opacity: theme.opacity.disabled },
    control: {
      // Over the slides rather than beside them: an arrow in the flow would move the track
      // it belongs to, and the two would disagree about where the middle is.
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      borderCurve: 'continuous',
      ...theme.shadows.surface,
    },
    // The box and the stroke only. Which two of the four edges are actually drawn is
    // `carousel.style.ts`'s — it is geometry, and it differs between the two arrows.
    chevron: {},
    indicator: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // A neutral fill rather than a faint version of the active one: the dots sit under
    // the slides, on the page, and a pale tint of the accent there reads as a control that
    // has half failed to load. `color` reaches the pill, which is the thing it should move.
    dot: { backgroundColor: theme.colors.default },
    counter: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.muted,
    },
    thumbnails: { flexGrow: 0, flexDirection: 'row' },
    thumbnail: {
      borderCurve: 'continuous',
      overflow: 'hidden',
      // The strip is a row too, and the same squeeze applies to it.
      flexShrink: 0,
      // The ring is always there and only its colour moves, so choosing a thumbnail does
      // not resize it — a border that appears on selection nudges every thumbnail after it.
      borderWidth: theme.borderWidth.field,
      borderColor: 'transparent',
    },
    thumbnailActive: {
      borderCurve: 'continuous',
      overflow: 'hidden',
      flexShrink: 0,
      borderWidth: theme.borderWidth.field,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (theme, colors) => ({
    control: {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    chevron: { borderColor: colors.fg },
    dotActive: { backgroundColor: colors.bgSelected },
    thumbnailActive: { borderColor: colors.bgSelected },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** The slides' corner, and the thumbnails'. The arrows stay round. */
    radius: radiusAxis('item', 'thumbnail', 'thumbnailActive'),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md', radius: '2xl' },
})

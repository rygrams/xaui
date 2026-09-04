import { createRecipe, radiusAxis } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { SwitchSize, SwitchSlot, SwitchVariant } from './switch.type'

const SLOTS = [
  'root',
  'track',
  'trackSelected',
  'thumb',
  'thumbSelected',
  'label',
] as const

/**
 * Two rows that say the same thing, because the two variants are a **geometry** axis: a
 * switch that is on is the accent whether its thumb rides inside the track or over it.
 * What differs between them is in `sizeAxis` below, one compound per shape.
 *
 * The pairs are declared all the same, for the reason they are declared on every variant
 * of every recipe: a role read outside the variant has to be found on it.
 *
 * `fg` is the theme's `white` rather than a surface token, and it is one of the two places
 * in the library where a primitive is named on purpose — a switch's knob is white in both
 * modes, the way the platform's own is, because it has to read against the neutral track
 * *and* against the accent one.
 */
const VARIANT_TOKENS: Record<SwitchVariant, VariantTokens> = {
  primary: {
    bg: 'default',
    fg: 'white',
    bgSelected: 'accent',
    fgSelected: 'accentForeground',
  },
  secondary: {
    bg: 'default',
    fg: 'white',
    bgSelected: 'accent',
    fgSelected: 'accentForeground',
  },
}

/**
 * `size` drives the track, the thumb, the gap and the label's type. The track's **width is
 * part of the control** here, unlike everywhere else in the library: a switch is a fixed
 * shape, and a track that stretched with its parent would be a progress bar.
 *
 * The knob is placed rather than laid out — `start` is where it rests and `top` is what
 * centres it, both written here because an absolutely positioned child with no insets is
 * placed by rules that differ between the two shapes. On `secondary` that `top` is
 * **negative**, which is exactly the overlap: the knob stands over the bar.
 *
 * The travel is not written: it is `width - thumb - 2 × start`, arithmetic the root does
 * on the flattened numbers, because a slide is animated and a worklet needs a number.
 */
function sizeAxis(step: SizeStep) {
  const { track, height, thumb, padding, gap, label } = step

  return (theme: XAUITheme): SlotStyles<SwitchSlot> => {
    const trackHeight = theme.spacing(height)
    const knob = theme.spacing(thumb)

    return {
      root: { gap: theme.spacing(gap) },
      track: { width: theme.spacing(track), height: trackHeight },
      thumb: {
        width: knob,
        height: knob,
        // `start`, never `left` (R13): the knob rests at the leading edge, and RTL mirrors
        // the logical property and only it.
        start: theme.spacing(padding),
        top: (trackHeight - knob) / 2,
      },
      label: {
        fontSize: theme.fontSizes[label],
        lineHeight: theme.lineHeights[label],
      },
    }
  }
}

type SizeStep = {
  /** The track's width, in spacing steps — `spacing(12)` is 48 on the base-4 scale. */
  track: number
  /** The track's height. Shorter on `secondary`, where the thumb stands over it. */
  height: number
  /** The thumb's diameter. Larger than the track's height on `secondary`. */
  thumb: number
  /** What holds the knob off the track's ends — its resting inset. Zero on `secondary`. */
  padding: number
  /** Between the track and its label. */
  gap: number
  label: FontSizeKey
}

/**
 * `md` is the legacy switch measured — a 48 × 28 track with a 22 thumb and 3 of padding —
 * and HeroUI's is the same 48 wide. Ours moves around that one, a spacing step at a time.
 */
const INSIDE: Record<SwitchSize, SizeStep> = {
  xs: { track: 10, height: 6, thumb: 4.5, padding: 0.75, gap: 2, label: 'sm' },
  sm: { track: 11, height: 6.5, thumb: 5, padding: 0.75, gap: 2, label: 'sm' },
  md: { track: 12, height: 7, thumb: 5.5, padding: 0.75, gap: 2, label: 'md' },
  lg: { track: 14, height: 8, thumb: 6.5, padding: 0.75, gap: 2.5, label: 'lg' },
}

/**
 * The same widths on a thinner bar, with a thumb that outgrows it — the legacy's
 * `overlap`, where the knob stands above and below the track it slides on.
 *
 * The padding is zero: the thumb is already taller than the track, so holding it off the
 * ends would only make the travel shorter than the eye expects.
 */
const OVERLAP: Record<SwitchSize, SizeStep> = {
  xs: { track: 10, height: 4, thumb: 5.5, padding: 0, gap: 2, label: 'sm' },
  sm: { track: 11, height: 4.5, thumb: 6, padding: 0, gap: 2, label: 'sm' },
  md: { track: 12, height: 4.5, thumb: 6.5, padding: 0, gap: 2, label: 'md' },
  lg: { track: 14, height: 5, thumb: 7.5, padding: 0, gap: 2.5, label: 'lg' },
}

export const switchRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
    track: {
      borderRadius: theme.radius.full,
      borderCurve: 'continuous',
      // Never `hidden`: on `secondary` the thumb stands outside the track, and clipping it
      // would cut the knob in half rather than let it overlap.
      overflow: 'visible',
    },
    thumb: {
      position: 'absolute',
      borderRadius: theme.radius.full,
      alignItems: 'center',
      justifyContent: 'center',
      // The knob is the thing that moves, and a shadow is what says so.
      ...theme.shadows.field,
    },
    label: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.foreground,
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Four colours on four slots, and the two `*Selected` ones exist to be **flattened into
   * values** rather than rendered: the track crosses from one to the other and the thumb
   * with it, which is an interpolation on the UI thread rather than a style swap.
   *
   * They are roles for the reason the `Checkbox`'s are: the tint pass re-runs `paint` and
   * never the axes, so this is what makes `color` the colour the switch turns on to.
   */
  paint: (_theme, colors) => ({
    track: { backgroundColor: colors.bg },
    trackSelected: { backgroundColor: colors.bgSelected },
    thumb: { backgroundColor: colors.fg },
    thumbSelected: { backgroundColor: colors.fgSelected },
  }),

  variants: {
    /**
     * Declared and empty, which is unusual and deliberate: **every** number of this
     * component depends on the shape as well as the size, so the whole table lives in the
     * compounds below. The axis is here because the selection needs it to be typed, and
     * because a reader looking for "what does `size` do" should find the answer next to
     * the other axes rather than infer it from an absence.
     */
    size: {
      xs: () => ({}),
      sm: () => ({}),
      md: () => ({}),
      lg: () => ({}),
    },

    radius: radiusAxis('track'),
  },

  /** The eight geometries — two shapes, four sizes — and nothing else. */
  compoundVariants: [
    { when: { variant: 'primary', size: 'xs' }, style: sizeAxis(INSIDE.xs) },
    { when: { variant: 'primary', size: 'sm' }, style: sizeAxis(INSIDE.sm) },
    { when: { variant: 'primary', size: 'md' }, style: sizeAxis(INSIDE.md) },
    { when: { variant: 'primary', size: 'lg' }, style: sizeAxis(INSIDE.lg) },
    { when: { variant: 'secondary', size: 'xs' }, style: sizeAxis(OVERLAP.xs) },
    { when: { variant: 'secondary', size: 'sm' }, style: sizeAxis(OVERLAP.sm) },
    { when: { variant: 'secondary', size: 'md' }, style: sizeAxis(OVERLAP.md) },
    { when: { variant: 'secondary', size: 'lg' }, style: sizeAxis(OVERLAP.lg) },
  ],

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})

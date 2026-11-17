import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { SliderOrientation, SliderSlot } from './slider.type'

const SLOTS = ['root', 'output', 'track', 'rail', 'fill', 'thumb', 'block'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the accent lands. */
const DRAWING = 'line'

/**
 * Only the filled part is the variant's colour, so only it follows `accent` and `color`.
 * The line is the soft grey and the thumb the page's ink in every accent: both are named
 * in `base`.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bgSelected: 'accent' },
}

type SizeStep = {
  /** The line's thickness, and the fill's. */
  rail: number
  /** The margin of the ground's colour that cuts the thumb out of the line. */
  cut: number
  /** The thumb, along the track. */
  thumbLength: number
  /** The thumb, across it — what the track box is as tall as. */
  thumbBreadth: number
  /** The Tram type role of the output. */
  type: TramTypeRole
  /** Spacing steps between the output and the track. */
  gap: number
}

/**
 * The Metro slider, on the `Switch`'s scale: the thumb is as wide as the switch's, size
 * for size, and a little shorter (22 / 30 / 42 for 26 / 34 / 48), over a line as thick as
 * the `ProgressBar`'s bar (8 / 12 / 16). Points, not spacing steps.
 *
 * Every size stands under the 48 touch target, which the track's gesture makes up with
 * its `hitSlop`.
 */
export const SLIDER_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: { rail: 8, cut: 2, thumbLength: 12, thumbBreadth: 22, type: 'body', gap: 3 },
  md: {
    rail: 12,
    cut: 2,
    thumbLength: 16,
    thumbBreadth: 30,
    type: 'subtitle',
    gap: 4,
  },
  lg: { rail: 16, cut: 3, thumbLength: 22, thumbBreadth: 42, type: 'title', gap: 5 },
}

/** How far a vertical track runs when the caller gives it no height of its own. */
const VERTICAL_LENGTH = 220

/**
 * What depends on the size **and** on the direction, which is all of the geometry: which
 * side of the track is its length, and where the line runs in it.
 *
 * The track is a box as broad as the thumb, with the line drawn through its middle — so
 * the thumb never stands outside its slot, and no slot needs a margin to make it room.
 */
function trackOf(step: SizeStep, orientation: SliderOrientation) {
  const { rail, cut, thumbLength, thumbBreadth } = step
  const middle = (thumbBreadth - rail) / 2

  return (theme: XAUITheme): SlotStyles<SliderSlot> => {
    const shared = {
      output: roleType(step.type, theme),
      thumb: { padding: cut },
    }

    if (orientation === 'vertical') {
      return {
        root: {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: theme.spacing(step.gap),
        },
        track: { width: thumbBreadth, height: VERTICAL_LENGTH },
        rail: { top: 0, bottom: 0, start: middle, width: rail },
        // From the bottom: a vertical slider fills upward.
        fill: { bottom: 0, start: middle, width: rail },
        thumb: {
          ...shared.thumb,
          bottom: 0,
          start: 0,
          width: thumbBreadth,
          height: thumbLength,
        },
        output: shared.output,
      }
    }

    return {
      root: { alignSelf: 'stretch', gap: theme.spacing(step.gap) },
      track: { alignSelf: 'stretch', height: thumbBreadth },
      // `start` and `end`, never `left` and `right`: the line mirrors under RTL.
      rail: { start: 0, end: 0, top: middle, height: rail },
      fill: { start: 0, top: middle, height: rail },
      thumb: {
        ...shared.thumb,
        start: 0,
        top: 0,
        width: thumbLength,
        height: thumbBreadth,
      },
      output: shared.output,
    }
  }
}

/**
 * The `radius` axis under the Tram ceiling, on every box of the drawing — `full`
 * included: the line and the thumb are rectangles, and neither becomes a pill.
 */
function cornerAxis(): Record<RadiusKey, StyleFn<SliderSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<SliderSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => {
      const borderRadius = boxCornerFor(key, theme.radius)

      return {
        rail: { borderRadius },
        fill: { borderRadius },
        thumb: { borderRadius },
        block: { borderRadius },
      }
    }
  }

  return axis
}

export const sliderRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const borderRadius = boxCornerFor('lg', theme.radius)

    return {
      output: { color: theme.colors.foreground },
      // The room left to go, in the soft grey of the `ProgressBar`'s bar: a line this
      // thick drawn in ink would swallow the thumb, which is ink.
      rail: {
        position: 'absolute',
        backgroundColor: theme.colors.default,
        borderRadius,
      },
      fill: { position: 'absolute', borderRadius },
      // The thumb is the switch's, two boxes: a margin of the ground's colour, which is
      // what cuts it out of the line, and the block of ink inside.
      thumb: {
        position: 'absolute',
        backgroundColor: theme.colors.background,
        borderRadius,
      },
      block: { flex: 1, backgroundColor: theme.colors.foreground, borderRadius },
    }
  },

  variantTokens: VARIANT_TOKENS,

  /** A flat fill, so the true colour — nothing here is the accent read as a line. */
  paint: (_theme, colors) => ({
    fill: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    // The two axes select; the compound below draws, since neither can be written
    // without the other. Declared all the same, so both are part of the cache key.
    size: { sm: () => ({}), md: () => ({}), lg: () => ({}) },
    orientation: { horizontal: () => ({}), vertical: () => ({}) },

    radius: cornerAxis(),
  },

  compoundVariants: (['sm', 'md', 'lg'] as const).flatMap(size =>
    (['horizontal', 'vertical'] as const).map(orientation => ({
      when: { size, orientation },
      style: trackOf(SLIDER_GEOMETRY[size], orientation),
    }))
  ),

  states: {
    /**
     * Everything grey and no accent left — a disabled slider still shows how far it is
     * filled, in the grey. Dimmed as well, as the switch is.
     */
    disabled: theme => ({
      root: { opacity: theme.opacity.disabled },
      output: { color: theme.colors.muted },
      fill: { backgroundColor: theme.colors.muted },
      block: { backgroundColor: theme.colors.muted },
    }),
  },

  defaultVariants: {
    variant: DRAWING,
    size: DEFAULT_SIZE,
    orientation: 'horizontal',
  },
})

/** How far the finger moves along the track before a touch becomes a drag. */
export const DRAG_SLOP = 6

/**
 * A stop nearer than this is where the finger already is: the thumb is put there. A
 * farther one — the next step of a coarse slider, a touch along the track — is reached on
 * the spring.
 */
export const FOLLOW_WITHIN = 6

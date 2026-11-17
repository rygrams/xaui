import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import { tramType } from '../../theme/tram-tokens'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { faceFor } from '../typography/typography.face'
import type { SwitchSlot } from './switch.type'
import type { TravelGeometry } from './switch.travel'

const SLOTS = ['root', 'track', 'fill', 'thumb', 'block', 'label'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the accent lands. */
const DRAWING = 'block'

/**
 * Only the fill is the variant's colour, so only the fill follows `accent` and `color`.
 * The line and the thumb are the page's ink in every accent, and are named in `base`.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bgSelected: 'accent' },
}

type SizeStep = TravelGeometry & {
  /** The track's outer height. */
  height: number
  /** The track's line, and the margin that cuts the thumb out of it. */
  line: number
  thumbHeight: number
  /** The Tram type role of the label. */
  type: TramTypeRole
  /** Spacing steps between the label and the track. */
  gap: number
}

/**
 * The Metro switch, measured — `TRAM-DESIGN.md` §ToggleSwitch. Points, not spacing steps:
 * the thumb stands 4, 5 and 7 over the track, and none of those is on the scale.
 *
 * `sm` and `md` stand under the 48 touch target, which the root makes up with `hitSlop`;
 * `lg` is the Windows Phone size, 48 tall on its own.
 */
export const SWITCH_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: {
    width: 40,
    height: 18,
    line: 2,
    inset: 3,
    thumbWidth: 12,
    thumbHeight: 26,
    type: 'body',
    gap: 3,
  },
  md: {
    width: 56,
    height: 24,
    line: 2,
    inset: 4,
    thumbWidth: 16,
    thumbHeight: 34,
    type: 'subtitle',
    gap: 4,
  },
  lg: {
    width: 80,
    height: 34,
    line: 3,
    inset: 6,
    thumbWidth: 22,
    thumbHeight: 48,
    type: 'title',
    gap: 5,
  },
}

/**
 * The design counts from the track's outer edge; a child of a bordered view is placed
 * from inside its line. Every offset below is the design's, less that line.
 *
 * The row is at least as tall as the thumb, so nothing beside the switch is drawn under
 * what stands over the track. A floor, not a height: a label may run to a second line.
 */
function sizeAxis(step: SizeStep) {
  const { width, height, line, inset, thumbWidth, thumbHeight } = step
  const overshoot = (thumbHeight - height) / 2
  const { fontSize, weight } = tramType[step.type]
  const family = weight === 'regular' ? 'body' : 'heading'

  return (theme: XAUITheme): SlotStyles<SwitchSlot> => ({
    root: { gap: theme.spacing(step.gap), minHeight: thumbHeight },
    track: { width, height, borderWidth: line },
    fill: { start: inset - line, top: inset - line, bottom: inset - line },
    thumb: {
      width: thumbWidth,
      height: thumbHeight,
      padding: line,
      // `start`, never `left`: the thumb rests at the leading edge, over the line.
      start: -line,
      top: -overshoot - line,
    },
    label: { fontSize, ...faceFor(theme.fontFamilies[family], weight) },
  })
}

/**
 * The `radius` axis under the Tram ceiling, on the two boxes at once — `full` included:
 * the track and the thumb are rectangles, and neither becomes a pill.
 */
function cornerAxis(): Record<RadiusKey, StyleFn<SwitchSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<SwitchSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => {
      const borderRadius = boxCornerFor(key, theme.radius)

      return { track: { borderRadius }, thumb: { borderRadius } }
    }
  }

  return axis
}

export const switchRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const borderRadius = boxCornerFor('lg', theme.radius)

    return {
      root: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
      track: {
        borderColor: theme.colors.foreground,
        borderRadius,
        // Never `hidden`: the thumb stands above and below the track.
        overflow: 'visible',
      },
      fill: { position: 'absolute' },
      // The thumb is two boxes: a margin of the ground's colour, which is what cuts it out
      // of the track, and the block of ink inside. A border would be one view fewer, and
      // iOS lets the fill show through the edge of a rounded one.
      thumb: {
        position: 'absolute',
        backgroundColor: theme.colors.background,
        borderRadius,
      },
      block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.foreground,
      },
      label: { color: theme.colors.foreground },
    }
  },

  variantTokens: VARIANT_TOKENS,

  /** A flat fill, so the true colour — nothing here is the accent read as a line. */
  paint: (_theme, colors) => ({
    fill: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(SWITCH_GEOMETRY.sm),
      md: sizeAxis(SWITCH_GEOMETRY.md),
      lg: sizeAxis(SWITCH_GEOMETRY.lg),
    },

    radius: cornerAxis(),
  },

  states: {
    /**
     * Everything grey and no accent left — a switch that is on and disabled still shows
     * its fill, in the grey. Dimmed as well, which on true black lands on the design's
     * `#4d4d4d` without a colour of its own.
     */
    disabled: theme => ({
      root: { opacity: theme.opacity.disabled },
      track: { borderColor: theme.colors.muted },
      fill: { backgroundColor: theme.colors.muted },
      block: { backgroundColor: theme.colors.muted },
      label: { color: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: DRAWING, size: DEFAULT_SIZE },
})

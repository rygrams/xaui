import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { faintFill } from '../../system/faint-fill'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { CarouselSlot } from './carousel.type'

const SLOTS = [
  'root',
  'content',
  'item',
  'control',
  'controlInactive',
  'chevron',
  'chevronInactive',
  'indicator',
  'dot',
  'dotActive',
  'counter',
  'counterTotal',
  'thumbnails',
  'thumbnailsContent',
  'thumbnail',
  'ring',
  'ringOn',
  'ringLine',
  'ringLineOn',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** The chevron's stroke, and the line of the chosen thumbnail's ring. */
export const LINE = 2

/** The band of the ground a chosen thumbnail wears at its edge, inside which the line sits. */
const RING_GROUND = 3

/** Between two thumbnails. */
const THUMBNAIL_GAP = 4

type CarouselStep = {
  /** An arrow's side and a thumbnail's: the size of a key. */
  key: number
  /** The chevron's own box, inside the arrow. */
  chevron: number
  /** A square of the indicator, and the gap between two of them. */
  dot: number
  /** Between two slides, in points — the default for the root's `gap`. */
  gap: number
}

/**
 * The Tram carousel, measured. `size` moves the controls and the gap between slides —
 * **never a slide**: its width is the track's, through `carouselMetrics`, and its height
 * is whatever is in it.
 */
export const CAROUSEL_GEOMETRY: Record<TramSize, CarouselStep> = {
  sm: { key: 32, chevron: 7, dot: 6, gap: 8 },
  md: { key: 40, chevron: 9, dot: 8, gap: 12 },
  lg: { key: 48, chevron: 11, dot: 10, gap: 16 },
}

/** Where an arrow sits: its side, and how far in from the track's edge. */
export function carouselControlBox(
  theme: XAUITheme,
  size: TramSize
): { size: number; inset: number } {
  return { size: CAROUSEL_GEOMETRY[size].key, inset: theme.spacing(2) }
}

function sizeAxis(step: CarouselStep) {
  const { key, chevron, dot } = step

  return (): SlotStyles<CarouselSlot> => ({
    control: { width: key, height: key },
    chevron: { width: chevron, height: chevron },
    // The gap between two squares is a square: the row reads as a dotted line.
    indicator: { gap: dot },
    dot: { width: dot, height: dot },
    thumbnail: { width: key, height: key },
  })
}

/**
 * The `radius` axis under the Tram ceiling, on the slides and the thumbnails. Unset, both
 * are square — Native's default corner is `2xl`, which Tram has no use for.
 */
function cornerAxis(): Record<RadiusKey, StyleFn<CarouselSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<CarouselSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => {
      const corner = boxCornerFor(key, theme.radius)

      return { item: { borderRadius: corner }, thumbnail: { borderRadius: corner } }
    }
  }

  return axis
}

const FILL = { position: 'absolute', top: 0, bottom: 0, start: 0, end: 0 } as const

/**
 * The controls, drawn in Metro; the slides are the caller's and nothing here paints them.
 *
 * No `variant` and no `paint`: the arrow is always a square of the page's ground with a
 * chevron in its ink — it stands out on a pale photograph in dark and on a dark one in
 * light — and the one colour on the carousel is the indicator's bar, a flat fill the root
 * gives the accent, a named one or a raw `color`. A flat fill is the true colour, so there
 * is nothing to derive.
 */
export const carouselRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const faint =
      faintFill(theme.colors.foreground, theme.colors.background) ??
      theme.colors.muted
    const body = roleType('body', theme)

    return {
      root: { flexDirection: 'column', gap: theme.spacing(3), position: 'relative' },
      content: { flexGrow: 0 },
      item: {
        overflow: 'hidden',
        // Exactly as wide as `carouselMetrics` said: a flex item with a width still
        // shrinks to fit its row, and five slides squeezed into one would never scroll.
        flexShrink: 0,
      },
      control: {
        // Over the slides rather than beside them: an arrow in the flow would move the
        // track it belongs to, and the two would disagree about where the middle is.
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      },
      // The square stays the ground: only the chevron goes quiet.
      controlInactive: {},
      chevron: { borderWidth: LINE, borderColor: theme.colors.foreground },
      chevronInactive: { borderColor: faint },
      // Held to the start: the squares begin where the slides begin.
      indicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      dot: { backgroundColor: faint },
      // Read as a value, never applied: the root flattens it into `dotInk`.
      dotActive: { backgroundColor: theme.colors.accent },
      counter: {
        ...body,
        color: theme.colors.foreground,
        fontVariant: ['tabular-nums'],
      },
      counterTotal: { color: theme.colors.muted },
      thumbnails: { flexGrow: 0 },
      thumbnailsContent: { flexDirection: 'row', gap: THUMBNAIL_GAP },
      thumbnail: { overflow: 'hidden', flexShrink: 0 },
      // Always drawn, only the colour moves: choosing one resizes nothing.
      ring: { ...FILL, borderWidth: RING_GROUND, borderColor: 'transparent' },
      ringOn: { borderColor: theme.colors.background },
      ringLine: { ...FILL, borderWidth: LINE, borderColor: 'transparent' },
      ringLineOn: { borderColor: theme.colors.foreground },
    }
  },

  variants: {
    size: {
      sm: sizeAxis(CAROUSEL_GEOMETRY.sm),
      md: sizeAxis(CAROUSEL_GEOMETRY.md),
      lg: sizeAxis(CAROUSEL_GEOMETRY.lg),
    },

    radius: cornerAxis(),
  },

  states: {
    /** No accent left, and dimmed as the other controls are. */
    disabled: theme => ({
      root: { opacity: theme.opacity.disabled },
      dotActive: { backgroundColor: theme.colors.muted },
    }),
  },

  defaultVariants: { size: DEFAULT_SIZE },
})

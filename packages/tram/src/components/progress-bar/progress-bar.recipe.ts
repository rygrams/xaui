import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { ProgressBarSlot } from './progress-bar.type'

const SLOTS = [
  'root',
  'header',
  'label',
  'value',
  'track',
  'bare',
  'fill',
  'bubble',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the colours land. */
const DRAWING = 'bar'

/**
 * The bar is the soft grey under every accent — it is the room left to go. Only what is
 * filled, and the bubbles, follow `accent` and `color`.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bg: 'default', bgSelected: 'accent' },
}

type SizeStep = {
  /** The bar's thickness. */
  bar: number
  /** A bubble's diameter: half the bar it runs in place of. */
  bubble: number
  /** The Tram type role of the label and of the value — one line, read as one. */
  type: TramTypeRole
}

/**
 * The Metro progress bar, measured: a bar thick enough to read as a bar, and bubbles half
 * as tall. Points, not spacing steps. **Never a width**: a bar is as long as its parent.
 */
export const PROGRESS_BAR_GEOMETRY: Record<TramSize, SizeStep> = {
  sm: { bar: 8, bubble: 4, type: 'caption' },
  md: { bar: 12, bubble: 6, type: 'body' },
  lg: { bar: 16, bubble: 8, type: 'subtitle' },
}

function sizeAxis(step: SizeStep) {
  const { bar, bubble } = step

  return (theme: XAUITheme): SlotStyles<ProgressBarSlot> => {
    const type = roleType(step.type, theme)

    return {
      track: { height: bar },
      // A circle, the one shape that goes past the Tram corner, centred across the bar.
      bubble: {
        width: bubble,
        height: bubble,
        borderRadius: bubble / 2,
        top: (bar - bubble) / 2,
      },
      label: type,
      value: type,
    }
  }
}

/**
 * The `radius` axis under the Tram ceiling. The track clips, so its corner is the fill's
 * at both ends; the fill's own edge, where the bar stops, stays square.
 */
function cornerAxis(): Record<RadiusKey, StyleFn<ProgressBarSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<ProgressBarSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      track: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

export const progressBarRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { alignSelf: 'stretch', gap: theme.spacing(2) },
    // The label and the value are one line, pushed apart: the gap and the alignment are
    // the header's, and neither text carries a margin.
    header: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      gap: theme.spacing(2),
    },
    label: { color: theme.colors.foreground },
    // Quieter than the label: the label says what is happening, the number how far.
    value: { color: theme.colors.muted, fontVariant: ['tabular-nums'] },
    track: {
      alignSelf: 'stretch',
      // The fill is a child that grows, so the track clips it — and the bubbles, which
      // wait before its start and end past its end.
      overflow: 'hidden',
      flexDirection: 'row',
      borderRadius: boxCornerFor('xs', theme.radius),
    },
    // What an indeterminate track adds to itself: no bar under the bubbles, which run on
    // the ground as the Metro ones do. A slot and not a state, since the engine's states
    // are the three a press knows.
    bare: { backgroundColor: 'transparent' },
    fill: { height: '100%' },
    // `start`, never `left`: the bubbles set off from the leading edge.
    bubble: { position: 'absolute', start: 0 },
  }),

  variantTokens: VARIANT_TOKENS,

  /** Flat fills, so the true colour — nothing here is the accent read as a line. */
  paint: (_theme, colors) => ({
    track: { backgroundColor: colors.bg },
    fill: { backgroundColor: colors.bgSelected },
    bubble: { backgroundColor: colors.bgSelected },
  }),

  variants: {
    size: {
      sm: sizeAxis(PROGRESS_BAR_GEOMETRY.sm),
      md: sizeAxis(PROGRESS_BAR_GEOMETRY.md),
      lg: sizeAxis(PROGRESS_BAR_GEOMETRY.lg),
    },

    radius: cornerAxis(),
  },

  states: {
    /** Everything grey and no accent left, and dimmed as the other controls are. */
    disabled: theme => ({
      root: { opacity: theme.opacity.disabled },
      label: { color: theme.colors.muted },
      fill: { backgroundColor: theme.colors.muted },
      bubble: { backgroundColor: theme.colors.muted },
    }),
  },

  defaultVariants: { variant: DRAWING, size: DEFAULT_SIZE },
})

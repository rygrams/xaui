import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { visibleSquares, wheelHeight } from '../../system/wheel'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { WheelGeometry, WheelPickerSlot } from './wheel-picker.type'

const SLOTS = [
  'root',
  'column',
  'cell',
  'item',
  'fill',
  'label',
  'current',
  'currentLabel',
] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** One drawing, so one row: it exists to name where the accent lands. */
const DRAWING = 'squares'

/**
 * Only the current square is the variant's colour: a flat fill of the accent, and the
 * text that reads on it. The neighbours are named in `base`.
 */
const VARIANT_TOKENS: Record<typeof DRAWING, VariantTokens> = {
  [DRAWING]: { bg: 'accent', fg: 'accentForeground' },
}

type SizeStep = {
  /** A square's side. */
  side: number
  /** From the square's line to its text. */
  inset: number
  /** The Tram type role of the text. */
  type: TramTypeRole
}

/**
 * The Metro date picker's squares. Points, not spacing steps: every side is over the 48
 * touch target, and the text is a title a thumb's width can be read past.
 */
export const WHEEL_SQUARES: Record<TramSize, SizeStep> = {
  sm: { side: 64, inset: 4, type: 'title' },
  md: { side: 84, inset: 6, type: 'section' },
  lg: { side: 104, inset: 8, type: 'section' },
}

/** Between two squares of a column, and between two columns. */
export const SQUARE_GAP = 8

/** The square's line — the `Button`'s and the `TextField`'s, a point under the theme's. */
const LINE_WIDTH = 2

/** How far the finger moves along a column before a touch becomes a drag. */
export const DRAG_SLOP = 6

/**
 * A wheel's measurements, from the table and the one raw number a caller gives.
 * `visibleCount` is forced odd: the whole control stands on there being a middle square.
 */
export function wheelGeometry(size: TramSize, visibleCount?: number): WheelGeometry {
  const { side } = WHEEL_SQUARES[size]
  const visible = visibleSquares(visibleCount)

  return {
    side,
    step: side + SQUARE_GAP,
    visibleCount: visible,
    height: wheelHeight(side, SQUARE_GAP, visible),
  }
}

function sizeAxis(size: TramSize) {
  const { side, inset, type } = WHEEL_SQUARES[size]

  return (theme: XAUITheme): SlotStyles<WheelPickerSlot> => ({
    column: { width: side },
    cell: { width: side, height: side },
    // The line is the fill's, drawn under the text: the text is inset from inside it.
    item: { padding: inset + LINE_WIDTH },
    label: roleType(type, theme),
  })
}

export const wheelPickerRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', gap: SQUARE_GAP },
    // A pile of squares, of which only the visible ones are let through.
    column: { overflow: 'hidden' },
    // Every square starts at the middle of its column; the wheel moves it from there.
    cell: { position: 'absolute', start: 0 },
    // The square a finger presses, its text at the bottom, at the start.
    item: { flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start' },
    // What is painted, under the text: a neighbour is the ground inside a grey line.
    fill: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      borderWidth: LINE_WIDTH,
      borderRadius: boxCornerFor('lg', theme.radius),
      borderColor: theme.colors.muted,
      backgroundColor: theme.colors.background,
    },
    label: {
      color: theme.colors.muted,
      // A wheel of numbers that shifted sideways at every square would read as broken.
      fontVariant: ['tabular-nums'],
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * Not a node's own style: the root flattens these two into the colours a square is
   * mixed toward as it reaches the middle. A flat fill, so the true colour.
   */
  paint: (_theme, colors) => ({
    current: { borderColor: colors.bg },
    currentLabel: { color: colors.fg },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    /** Grey, and no accent left. Not dimmed: the grey is the state. */
    disabled: theme => ({
      current: { borderColor: theme.colors.muted },
      currentLabel: { color: theme.colors.background },
    }),
  },

  defaultVariants: { variant: DRAWING, size: DEFAULT_SIZE },
})

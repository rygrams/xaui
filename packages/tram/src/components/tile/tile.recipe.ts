import { StyleSheet } from 'react-native'
import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import { tramType } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { TileSize, TileSlot, TileVariant } from './tile.type'

const SLOTS = ['root', 'bare', 'face', 'label', 'count', 'icon'] as const

export const DEFAULT_SIZE: TileSize = 'medium'

export const DEFAULT_VARIANT: TileVariant = 'contained'

/** How a tile gets its width and height: from its own shape, or from the grid's frame. */
export type TileShape = 'square' | 'wide' | 'filling'

/**
 * A variant names tokens and computes nothing. No line anywhere — a tile is a fill — and
 * no `…Pressed` role: a pressed tile keeps its colours and leans.
 */
const VARIANT_TOKENS: Record<TileVariant, VariantTokens> = {
  contained: { bg: 'accent', fg: 'accentForeground' },
  flat: { bg: 'accentSoft', fg: 'accentSoftForeground' },
  surface: { bg: 'surface', fg: 'surfaceForeground' },
}

/**
 * A small tile is some 70 points across: it has room for a glyph and a count, and its
 * padding is a step tighter. Spacing steps, not points.
 */
function sizeAxis(padding: number) {
  return (theme: XAUITheme): SlotStyles<TileSlot> => ({
    root: { padding: theme.spacing(padding) },
    face: { padding: theme.spacing(padding) },
  })
}

export const tileRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // What a tile holds sits at its bottom-start corner, the name last: the data first,
    // then what it is.
    root: {
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      gap: theme.spacing(0.5),
      borderRadius: boxCornerFor('lg', theme.radius),
    },
    // What a tile with two faces adds to itself: the faces carry the fill and the
    // padding, so the whole square turns and the ground shows behind it.
    bare: { backgroundColor: 'transparent', padding: 0 },
    face: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      gap: theme.spacing(0.5),
      borderRadius: boxCornerFor('lg', theme.radius),
      // A face turned away is not drawn: the other one is what is behind it.
      backfaceVisibility: 'hidden',
    },
    label: roleType('caption', theme),
    count: { ...roleType('title', theme), fontVariant: ['tabular-nums'] },
    icon: { fontSize: tramType.title.fontSize },
  }),

  variantTokens: VARIANT_TOKENS,

  /** Flat fills, and everything on them in the one colour that reads there. */
  paint: (_theme, colors) => ({
    root: { backgroundColor: colors.bg },
    face: { backgroundColor: colors.bg },
    label: { color: colors.fg },
    count: { color: colors.fg },
    icon: { color: colors.fg },
  }),

  variants: {
    size: {
      small: sizeAxis(1.5),
      medium: sizeAxis(2.5),
      wide: sizeAxis(2.5),
    },

    shape: {
      square: () => ({ root: { aspectRatio: 1 } }),
      wide: () => ({ root: { aspectRatio: 2 } }),
      filling: () => ({ root: { width: '100%', height: '100%' } }),
    },

    transition: {
      // A face that turns comes out of the square toward the eye; clipped, its near edge
      // would be cut straight.
      flip: () => ({}),
      // A face that slides leaves through the edge of the square, not over the next tile.
      slide: () => ({ root: { overflow: 'hidden' } }),
    },
  },

  states: {
    /** Dimmed as the other controls are. The fill stays: an empty square is not a tile. */
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: {
    variant: DEFAULT_VARIANT,
    size: DEFAULT_SIZE,
    shape: 'square',
    transition: 'flip',
  },
})

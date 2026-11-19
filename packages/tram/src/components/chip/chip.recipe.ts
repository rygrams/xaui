import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import { tramType } from '../../theme/tram-tokens'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import { DRAWING_TOKENS, LINE_WIDTH } from '../button/button.recipe'
import type { ChipSlot, ChipVariant } from './chip.type'

const SLOTS = [
  'root',
  'label',
  'icon',
  'dot',
  'avatar',
  'close',
  'closeGlyph',
] as const

export const DEFAULT_VARIANT: ChipVariant = 'contained'

export const DEFAULT_SIZE: TramSize = 'md'

/** The cross is drawn this much wider than the glyph box: the bars run corner to corner. */
const DIAGONAL = Math.SQRT2

type SizeStep = {
  /** All in spacing steps. */
  height: number
  padding: number
  gap: number
  label: TramTypeRole
  /** The side of the dot. */
  dot: number
  /** The side of the avatar square. */
  avatar: number
  /** The side of the box the cross is drawn in. */
  cross: number
}

/** 24, 32, 40 — the `Button`'s rectangle, smaller: the controls' 40 is the chip's largest. */
export const SIZES: Record<TramSize, SizeStep> = {
  sm: {
    height: 6,
    padding: 1.5,
    gap: 1.5,
    label: 'caption',
    dot: 1.5,
    avatar: 4,
    cross: 2.5,
  },
  md: {
    height: 8,
    padding: 2.5,
    gap: 2,
    label: 'body',
    dot: 2,
    avatar: 5,
    cross: 3,
  },
  lg: {
    height: 10,
    padding: 3.5,
    gap: 2.5,
    label: 'body',
    dot: 2,
    avatar: 7,
    cross: 3.5,
  },
}

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<ChipSlot> => {
    const height = theme.spacing(step.height)
    const inset = theme.spacing(step.padding)
    const avatar = theme.spacing(step.avatar)
    const cross = theme.spacing(step.cross)
    const dot = theme.spacing(step.dot)

    return {
      root: { height, paddingHorizontal: inset, gap: theme.spacing(step.gap) },
      label: roleType(step.label, theme),
      icon: { fontSize: tramType[step.label].fontSize },
      dot: { width: dot, height: dot },
      // As close to the start edge as the top and bottom: the square sits in a frame of
      // even width, as a thumbnail does in a Metro row.
      avatar: {
        width: avatar,
        height: avatar,
        marginStart: -Math.max(0, inset - (height - avatar) / 2),
      },
      close: { width: cross, height: cross },
      closeGlyph: { width: cross * DIAGONAL },
    }
  }
}

/** The Tram corner of 2 at most — `full` included: the chip is a box. */
function cornerAxis(): Record<RadiusKey, StyleFn<ChipSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<ChipSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({
      root: { borderRadius: boxCornerFor(key, theme.radius) },
    })
  }

  return axis
}

/** The side of the cross's box at `size`, for the touch it reaches past it. */
export function crossSide(theme: XAUITheme, size: TramSize): number {
  return theme.spacing(SIZES[size].cross)
}

export const chipRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // The `Button`'s line, always there and clear where the drawing names none, so the
      // four drawings are the same size.
      borderWidth: LINE_WIDTH,
      borderRadius: boxCornerFor('lg', theme.radius),
    },
    label: { includeFontPadding: false },
    avatar: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
    close: { alignItems: 'center', justifyContent: 'center' },
    // Two bars of the `Button`'s line, square-ended: the `CloseButton`'s cross, no circle.
    closeGlyph: { position: 'absolute', height: LINE_WIDTH },
  }),

  // The `Button`'s own: a chip is the `Button`'s rectangle, drawn the same four ways.
  variantTokens: DRAWING_TOKENS,

  paint: (_theme, colors) => ({
    root: {
      backgroundColor: colors.bg ?? 'transparent',
      borderColor: colors.border ?? 'transparent',
    },
    label: { color: colors.fg },
    icon: { color: colors.fg },
    // The ink; on `flat` the root paints it in the true colour the soft fill stands for.
    dot: { backgroundColor: colors.fg },
    closeGlyph: { backgroundColor: colors.fg },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: cornerAxis(),
  },

  // No `pressed` state: a Tram press moves the chip and leaves its colours alone.
  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: DEFAULT_SIZE },
})

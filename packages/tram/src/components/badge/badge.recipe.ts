import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { cornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import { DRAWING_TOKENS, LINE_WIDTH } from '../button/button.recipe'
import type { BadgeSlot, BadgeVariant } from './badge.type'

const SLOTS = ['root', 'label'] as const

export const DEFAULT_VARIANT: BadgeVariant = 'contained'

export const DEFAULT_SIZE: TramSize = 'md'

type SizeStep = {
  /** The height, and the narrowest the badge gets, in spacing steps. */
  height: number
  padding: number
  label: TramTypeRole
  /** The side of the dot. */
  dot: number
}

/** 16, 20, 24: a count is the smallest text on the scale, until `lg` reads as body. */
const SIZES: Record<TramSize, SizeStep> = {
  sm: { height: 4, padding: 0.5, label: 'caption', dot: 1.5 },
  md: { height: 5, padding: 0.75, label: 'caption', dot: 2 },
  lg: { height: 6, padding: 1, label: 'body', dot: 2.5 },
}

function sizeAxis({ height, padding, label }: SizeStep) {
  return (theme: XAUITheme): SlotStyles<BadgeSlot> => ({
    root: {
      height: theme.spacing(height),
      minWidth: theme.spacing(height),
      paddingHorizontal: theme.spacing(padding),
    },
    label: roleType(label, theme),
  })
}

/** A square: the padding goes, and the height becomes the width too. */
function dotAxis(side: number) {
  return (theme: XAUITheme): SlotStyles<BadgeSlot> => {
    const value = theme.spacing(side)
    return {
      root: { height: value, width: value, minWidth: value, paddingHorizontal: 0 },
    }
  }
}

/** Sharp by default; up to the Tram corner, or `full` for a pill. */
function cornerAxis(): Record<RadiusKey, StyleFn<BadgeSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<BadgeSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({ root: { borderRadius: cornerFor(key, theme.radius) } })
  }

  return axis
}

export const badgeRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      // The `Button`'s line, always there and clear where the drawing names none, so the
      // four drawings are the same size.
      borderWidth: LINE_WIDTH,
      borderRadius: 0,
    },
    label: {
      includeFontPadding: false,
      textAlign: 'center',
      // A count that ticks from 9 to 10 does not jiggle the box around it.
      fontVariant: ['tabular-nums'],
    },
  }),

  // The `Button`'s own: a count is a small box in the accent, drawn the way a button is.
  variantTokens: DRAWING_TOKENS,

  paint: (_theme, colors) => ({
    root: {
      backgroundColor: colors.bg ?? 'transparent',
      borderColor: colors.border ?? 'transparent',
    },
    label: { color: colors.fg },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    /** After `size`, so the square undoes the count's padding. */
    dot: {
      sm: dotAxis(SIZES.sm.dot),
      md: dotAxis(SIZES.md.dot),
      lg: dotAxis(SIZES.lg.dot),
    },

    radius: cornerAxis(),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: DEFAULT_SIZE },
})

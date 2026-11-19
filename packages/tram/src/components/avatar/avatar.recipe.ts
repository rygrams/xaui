import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { cornerFor } from '../../theme/tram-corner'
import { tramType } from '../../theme/tram-tokens'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import { LINE_WIDTH } from '../button/button.recipe'
import type { AvatarSlot, AvatarVariant } from './avatar.type'

const SLOTS = ['root', 'fallback', 'initials', 'icon'] as const

export const DEFAULT_VARIANT: AvatarVariant = 'contained'

export const DEFAULT_SIZE: TramSize = 'md'

/**
 * The `Button`'s tokens, for the three drawings an avatar has. The line is always there,
 * transparent where none is named, so the three are the same size.
 */
const VARIANT_TOKENS: Record<AvatarVariant, VariantTokens> = {
  contained: { bg: 'accent', border: 'accent', fg: 'accentForeground' },
  flat: { bg: 'accentSoft', fg: 'accentSoftForeground' },
  outline: { border: 'link', fg: 'link' },
}

type SizeStep = {
  /** The side, in spacing steps. */
  side: number
  /** The Tram role of the initials — and of a glyph, which is set as tall. */
  type: TramTypeRole
}

/** 40, 56 and 72 a side: the Metro list's thumbnail at `md`, a contact's at `lg`. */
const SIZES: Record<TramSize, SizeStep> = {
  sm: { side: 10, type: 'body' },
  md: { side: 14, type: 'subtitle' },
  lg: { side: 18, type: 'title' },
}

function sizeAxis({ side, type }: SizeStep) {
  return (theme: XAUITheme): SlotStyles<AvatarSlot> => ({
    root: { width: theme.spacing(side), height: theme.spacing(side) },
    initials: roleType(type, theme),
    icon: { fontSize: tramType[type].fontSize },
  })
}

/** The square by default; up to the Tram corner, or `full` for a circle. */
function cornerAxis(): Record<RadiusKey, StyleFn<AvatarSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<AvatarSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => ({ root: { borderRadius: cornerFor(key, theme.radius) } })
  }

  return axis
}

export const avatarRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    root: {
      // The clip is what shapes the photo: the image is a square laid over the frame.
      overflow: 'hidden',
      borderWidth: LINE_WIDTH,
      borderRadius: 0,
    },
    fallback: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    root: {
      backgroundColor: colors.bg ?? 'transparent',
      borderColor: colors.border ?? 'transparent',
    },
    initials: { color: colors.fg },
    icon: { color: colors.fg },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: cornerAxis(),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: DEFAULT_SIZE },
})

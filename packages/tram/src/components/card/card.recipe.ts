import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { CardSlot, CardVariant } from './card.type'

const SLOTS = [
  'root',
  'background',
  'header',
  'body',
  'footer',
  'title',
  'description',
] as const

export const DEFAULT_VARIANT: CardVariant = 'default'

export const DEFAULT_SIZE: TramSize = 'md'

/**
 * Where the ground and the title's ink come from. The title is a `…Foreground` on a fill,
 * so a tinted card derives the ink that reads on its tint; on the page it is the plain
 * `foreground`, which a tint replaces with itself.
 */
const VARIANT_TOKENS: Record<CardVariant, VariantTokens> = {
  default: { bg: 'surface', fg: 'surfaceForeground' },
  secondary: { bg: 'surfaceSecondary', fg: 'surfaceSecondaryForeground' },
  tertiary: { border: 'border', fg: 'foreground' },
  ghost: { fg: 'foreground' },
}

/**
 * How far the description sits behind the title: the title's own ink, faded. On the Tram
 * grounds it lands on `muted` — white at this much is `#A3A3A3` on black — and, unlike
 * `muted`, it still reads on a card filled with an accent.
 */
const DESCRIPTION_OPACITY = 0.64

type SizeStep = {
  /** Spacing steps, not points. */
  padding: number
  /** Between two sections. */
  gap: number
  /** Between a title and its description. */
  textGap: number
  title: TramTypeRole
  description: TramTypeRole
}

/**
 * The content list of Metro, at three scales: a title on the Tram scale and a detail one
 * role down. `md` is the mock-up's — 19 over 13, on 16 of padding.
 */
const SIZES: Record<TramSize, SizeStep> = {
  sm: { padding: 3, gap: 2.5, textGap: 0.5, title: 'body', description: 'caption' },
  md: {
    padding: 4,
    gap: 3,
    textGap: 0.5,
    title: 'subtitle',
    description: 'caption',
  },
  lg: { padding: 5, gap: 4, textGap: 1, title: 'title', description: 'body' },
}

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<CardSlot> => ({
    root: { padding: theme.spacing(step.padding), gap: theme.spacing(step.gap) },
    header: { gap: theme.spacing(step.textGap) },
    title: roleType(step.title, theme),
    description: roleType(step.description, theme),
  })
}

/** The `radius` axis under the Tram ceiling, on the card and on what is clipped to it. */
function cornerAxis(): Record<RadiusKey, StyleFn<CardSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<CardSlot>>

  for (const key of RADIUS_KEYS) {
    axis[key] = theme => {
      const borderRadius = boxCornerFor(key, theme.radius)
      return { root: { borderRadius }, background: { borderRadius } }
    }
  }

  return axis
}

export const cardRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    const borderRadius = boxCornerFor('lg', theme.radius)

    return {
      root: { flexDirection: 'column', borderRadius },
      // The whole card, under everything. The clip is here and not on the root: the root
      // has no shadow to lose, but a caller's own `overflow` on it would then decide
      // whether the image spills.
      background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        start: 0,
        end: 0,
        overflow: 'hidden',
        borderRadius,
      },
      header: { flexDirection: 'column' },
      body: { flexDirection: 'column' },
      // The actions of the Metro list: in a row, the space between them their only frame.
      footer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: theme.spacing(4),
      },
      description: { opacity: DESCRIPTION_OPACITY },
    }
  },

  variantTokens: VARIANT_TOKENS,

  /** Flat. The line is the theme's 3, and only where the variant names one. */
  paint: (theme, colors) => ({
    root: {
      backgroundColor: colors.bg ?? 'transparent',
      borderColor: colors.border,
      borderWidth: colors.border ? theme.borderWidth.default : 0,
    },
    title: { color: colors.fg },
    description: { color: colors.fg },
  }),

  variants: {
    size: {
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },

    radius: cornerAxis(),
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: DEFAULT_SIZE },
})

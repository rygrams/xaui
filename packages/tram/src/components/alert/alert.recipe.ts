import { RADIUS_KEYS, createRecipe } from '@xaui/native/system'
import type { SlotStyles, StyleFn, VariantTokens } from '@xaui/native/system'
import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { boxCornerFor } from '../../theme/tram-corner'
import { tramType } from '../../theme/tram-tokens'
import type { TramSize, TramTypeRole } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import { DRAWING_TOKENS, LINE_WIDTH } from '../button/button.recipe'
import { DESCRIPTION_OPACITY } from '../card/card.recipe'
import type { AlertSlot, AlertVariant } from './alert.type'

const SLOTS = [
  'root',
  'icon',
  'iconGlyph',
  'content',
  'title',
  'description',
  'close',
  'closeGlyph',
] as const

export const DEFAULT_VARIANT: AlertVariant = 'flat'

export const DEFAULT_SIZE: TramSize = 'md'

/** The cross is drawn this much wider than its box: the bars run corner to corner. */
const DIAGONAL = Math.SQRT2

/** The `Button`'s own, for the three drawings an alert has. */
const VARIANT_TOKENS: Record<AlertVariant, VariantTokens> = {
  contained: DRAWING_TOKENS.contained,
  flat: DRAWING_TOKENS.flat,
  outline: DRAWING_TOKENS.outline,
}

type SizeStep = {
  /** All in spacing steps. */
  padding: number
  gap: number
  contentGap: number
  title: TramTypeRole
  description: TramTypeRole
  /** The side of the icon square, and the role its glyph is set as tall as. */
  icon: number
  glyph: TramTypeRole
  /** The side of the box the cross is drawn in. */
  cross: number
}

/** The `Card`'s type steps, with a square of 32, 40, 48 at the start: a list's thumbnail. */
export const SIZES: Record<TramSize, SizeStep> = {
  sm: {
    padding: 3,
    gap: 2.5,
    contentGap: 0.5,
    title: 'body',
    description: 'caption',
    icon: 8,
    glyph: 'body',
    cross: 3,
  },
  md: {
    padding: 3,
    gap: 3,
    contentGap: 0.5,
    title: 'subtitle',
    description: 'body',
    icon: 10,
    glyph: 'subtitle',
    cross: 3.5,
  },
  lg: {
    padding: 4,
    gap: 4,
    contentGap: 1,
    title: 'title',
    description: 'body',
    icon: 12,
    glyph: 'title',
    cross: 4,
  },
}

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<AlertSlot> => {
    const icon = theme.spacing(step.icon)
    const cross = theme.spacing(step.cross)

    return {
      root: { padding: theme.spacing(step.padding), gap: theme.spacing(step.gap) },
      icon: { width: icon, height: icon },
      iconGlyph: { fontSize: tramType[step.glyph].fontSize },
      content: { gap: theme.spacing(step.contentGap) },
      title: roleType(step.title, theme),
      description: roleType(step.description, theme),
      close: { width: cross, height: cross },
      closeGlyph: { width: cross * DIAGONAL },
    }
  }
}

/** The Tram corner of 2 at most — `full` included: the alert is a box. */
function cornerAxis(): Record<RadiusKey, StyleFn<AlertSlot>> {
  const axis = {} as Record<RadiusKey, StyleFn<AlertSlot>>

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

export const alertRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      // The `Button`'s line, always there and clear where the drawing names none, so the
      // three drawings are the same size.
      borderWidth: LINE_WIDTH,
      borderRadius: boxCornerFor('lg', theme.radius),
    },
    // Its colour is the root's to give — a fill, or the ink's line (`markDrawing`). The
    // line is always there, clear where unused, so the glyph sits in the same place.
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: LINE_WIDTH,
      borderColor: 'transparent',
    },
    content: { flex: 1 },
    description: { opacity: DESCRIPTION_OPACITY },
    close: { alignItems: 'center', justifyContent: 'center' },
    // Two bars of the `Button`'s line, square-ended: the `CloseButton`'s cross, no circle.
    closeGlyph: { position: 'absolute', height: LINE_WIDTH },
  }),

  variantTokens: VARIANT_TOKENS,

  /** Flat, no shadow; a line only where the drawing names one. */
  paint: (_theme, colors) => ({
    root: {
      backgroundColor: colors.bg ?? 'transparent',
      borderColor: colors.border ?? 'transparent',
    },
    title: { color: colors.fg },
    description: { color: colors.fg },
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

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: DEFAULT_VARIANT, size: DEFAULT_SIZE },
})

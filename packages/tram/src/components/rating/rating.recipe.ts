import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import { faintFill } from '../../system/faint-fill'
import type { TramSize } from '../../theme/tram-tokens'
import type { RatingSlot } from './rating.type'

const SLOTS = ['root', 'item', 'glyph', 'glyphFill'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** A mark's side, in points, and the spacing steps between two marks. */
export const RATING_GEOMETRY: Record<TramSize, { mark: number; gap: number }> = {
  sm: { mark: 16, gap: 1 },
  md: { mark: 24, gap: 1.5 },
  lg: { mark: 32, gap: 2 },
}

function sizeAxis(size: TramSize) {
  const { mark, gap } = RATING_GEOMETRY[size]
  // The glyph's box is the mark: as tall as it is wide, the character centred in it.
  const type = { fontSize: mark, lineHeight: mark, width: mark }

  return (theme: XAUITheme): SlotStyles<RatingSlot> => ({
    root: { gap: theme.spacing(gap) },
    glyph: type,
    glyphFill: type,
  })
}

/**
 * A row of marks on the ground. A given mark is a flat fill of the accent; one not given
 * yet waits in the `Skeleton`'s grey — a fifth of the page's ink — so the row reads as a
 * scale without its empty end reading as a line. Nothing bounces, nothing glows.
 */
export const ratingRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center' },
    item: { position: 'relative' },
    glyph: {
      color:
        faintFill(theme.colors.foreground, theme.colors.background) ??
        theme.colors.muted,
      textAlign: 'center',
      includeFontPadding: false,
    },
    glyphFill: {
      color: theme.colors.accent,
      textAlign: 'center',
      includeFontPadding: false,
    },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    /** The given marks lose the accent: grey, and no press. */
    disabled: theme => ({ glyphFill: { color: theme.colors.muted } }),
  },

  defaultVariants: { size: DEFAULT_SIZE },
})

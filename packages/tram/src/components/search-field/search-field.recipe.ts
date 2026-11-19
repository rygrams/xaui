import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import { DISC_SIZE } from '../../system/disc-size'
import type { TramSize } from '../../theme/tram-tokens'
import { glassGeometry } from './search-field.utils'
import type { SearchFieldSlot, SearchFieldVariant } from './search-field.type'

const SLOTS = ['box', 'input', 'icon', 'lens', 'handle', 'clear'] as const

export const DEFAULT_SIZE: TramSize = 'md'

export const DEFAULT_VARIANT: SearchFieldVariant = 'primary'

/** The magnifier's stroke: the box's line, so the mark and the box are one drawing. */
export const GLASS_LINE = 2

/** Spacing steps between the magnifier, the typed text and the cross. */
const GAP = 2

/** How much of its glyph's square the `CloseButton`'s cross spans: 14 of the `md` 20. */
const CROSS_SPAN = 0.7

/**
 * The box's fill: the ground for `primary`, the discreet surface for `secondary`. The
 * line is not a token here — it moves, and the field animates it from `restLine`.
 */
const VARIANT_TOKENS: Record<SearchFieldVariant, VariantTokens> = {
  primary: { bg: 'fieldBackground' },
  secondary: { bg: 'surface' },
}

/**
 * The marks' side per size: the glyph of the `CloseButton` the cross is, so the
 * magnifier and the cross read as one set — 16, 20, 24.
 */
function sizeAxis(size: TramSize) {
  const { glyph, diameter } = DISC_SIZE[size]
  const glass = glassGeometry(glyph, GLASS_LINE)

  return (): SlotStyles<SearchFieldSlot> => ({
    icon: { width: glyph, height: glyph },
    lens: {
      width: glass.lens,
      height: glass.lens,
      borderRadius: glass.lens / 2,
    },
    handle: {
      width: glass.handle.length,
      start: glass.handle.start,
      top: glass.handle.top,
    },
    // The cross's circle is drawn clear, so it is pulled toward the line by what the
    // circle leaves round the cross: the cross then stands as far off the end as the
    // magnifier does off the start — the box's own padding.
    clear: { marginEnd: -Math.round((diameter - glyph * CROSS_SPAN) / 2) },
  })
}

/**
 * The box's geometry and the two variants' fills. The line, the height, the padding and
 * the type are the `TextField`'s, resolved by the root below and cut in two by the field:
 * what the box wears and what the typed text wears.
 */
export const searchFieldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    box: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(GAP),
    },
    // The typed text takes the room the marks leave, and draws no box of its own.
    input: {
      flex: 1,
      alignSelf: 'stretch',
      minWidth: 0,
      padding: 0,
    },
    icon: { position: 'relative' },
    lens: { position: 'absolute', top: 0, start: 0, borderWidth: GLASS_LINE },
    handle: {
      position: 'absolute',
      height: GLASS_LINE,
      transform: [{ rotate: '45deg' }],
    },
    clear: {},
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({ box: { backgroundColor: colors.bg } }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  defaultVariants: { size: DEFAULT_SIZE, variant: DEFAULT_VARIANT },
})

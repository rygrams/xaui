import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import type { TramSize } from '../../theme/tram-tokens'
import type { DummyFieldSlot } from './dummy-field.type'

const SLOTS = ['field', 'value', 'indicator'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** The glyph at the end, in points, and the spacing steps between it and the value. */
const SIZES: Record<TramSize, { glyph: number; gap: number }> = {
  sm: { glyph: 16, gap: 2 },
  md: { glyph: 20, gap: 2.5 },
  lg: { glyph: 24, gap: 3 },
}

function sizeAxis(size: TramSize) {
  const { glyph, gap } = SIZES[size]

  return (theme: XAUITheme): SlotStyles<DummyFieldSlot> => ({
    field: { gap: theme.spacing(gap) },
    indicator: { fontSize: glyph },
  })
}

/**
 * Only what the row adds. The box, its line, its height and the type of the value are the
 * `TextField`'s, read off its context by the field: a dummy field stacked on a text field
 * is the same box twice. The glyph is the `Select`'s chevron, at the `Select`'s sizes.
 */
export const dummyFieldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    field: { flexDirection: 'row', alignItems: 'center' },
    // It takes the room the glyph leaves, and gives it up before the glyph does.
    value: { flex: 1, minWidth: 0 },
    // Not a node's own style — the root flattens it into the glyph's size and colour.
    indicator: { color: theme.colors.fieldForeground },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    /** The glyph grey with the box. */
    disabled: theme => ({ indicator: { color: theme.colors.muted } }),
  },

  defaultVariants: { size: DEFAULT_SIZE },
})

import { createRecipe } from '../../system/recipe'
import type { SlotStyles } from '../../system/recipe'
import type { PieChartSize, PieChartSlot } from './pie-chart.type'

const SLOTS = ['root', 'center'] as const

/**
 * A ring is **square**, unlike every cartesian plot in this family: those span their parent
 * and take a height from `size`, and this one takes a diameter. So it has a ladder of its
 * own rather than the shared `chartRecipe`'s heights — and it takes its ink from that recipe
 * all the same, because a slice is the colour a bar would have been.
 */
export const DIAMETERS: Record<PieChartSize, number> = { sm: 140, md: 200, lg: 260 }

function sizeAxis(size: PieChartSize) {
  const diameter = DIAMETERS[size]

  return (): SlotStyles<PieChartSlot> => ({
    root: { width: diameter, height: diameter },
    center: { width: diameter, height: diameter },
  })
}

export const pieChartRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    root: { alignSelf: 'center' },
    // Laid over the canvas rather than inside it: SVG text needs a font file loaded and
    // ignores the platform's text size, and a total in the middle of a ring is a `Text`
    // like any other. `pointerEvents` keeps it from eating a press meant for a slice.
    center: {
      position: 'absolute',
      top: 0,
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
    },
  }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { size: 'md' },
})

import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { TramSize } from '../../theme/tram-tokens'
import type { PieChartSize, PieChartSlot } from './pie-chart.type'

const SLOTS = ['root', 'center'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** A ring is square: `size` is its diameter, Native's ladder. */
export const PIE_DIAMETERS: Record<PieChartSize, number> = {
  sm: 140,
  md: 200,
  lg: 260,
}

function sizeAxis(size: PieChartSize) {
  const diameter = PIE_DIAMETERS[size]

  return (): SlotStyles<PieChartSlot> => ({
    root: { width: diameter, height: diameter },
    center: { width: diameter, height: diameter },
  })
}

export const pieChartRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    root: { alignSelf: 'center' },
    // Laid over the canvas: what sits in the hole is a `Text` like any other, and it
    // takes no touches.
    center: {
      position: 'absolute',
      top: 0,
      start: 0,
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

  defaultVariants: { size: DEFAULT_SIZE },
})

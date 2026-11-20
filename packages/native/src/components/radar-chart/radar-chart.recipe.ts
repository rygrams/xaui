import { createRecipe } from '../../system/recipe'
import type { SlotStyles } from '../../system/recipe'
import type { FontSizeKey } from '../../theme/theme.type'
import { SVG_FRAME } from '../chart/chart.style'
import type { RadarChartSize, RadarChartSlot } from './radar-chart.type'

const SLOTS = ['root'] as const

/**
 * A radar is **square**, like the pie and unlike every cartesian plot: those span their
 * parent and take a height from `size`, and this takes a diameter. So it has a ladder of its
 * own, and takes its ink from `chartRecipe` all the same — a radar's outline is a line
 * chart's line, bent into a ring.
 */
export const DIAMETERS: Record<RadarChartSize, { box: number; label: FontSizeKey }> =
  {
    sm: { box: 180, label: 'xs' },
    md: { box: 240, label: 'xs' },
    lg: { box: 300, label: 'sm' },
  }

function sizeAxis(size: RadarChartSize) {
  const { box } = DIAMETERS[size]

  return (): SlotStyles<RadarChartSlot> => ({
    root: { width: box, height: box },
  })
}

export const radarChartRecipe = createRecipe({
  slots: SLOTS,

  // The names around the web are placed over the SVG's coordinates, which do not mirror.
  base: () => ({ root: { alignSelf: 'center', ...SVG_FRAME } }),

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { size: 'md' },
})

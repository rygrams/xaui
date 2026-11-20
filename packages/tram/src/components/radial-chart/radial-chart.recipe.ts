import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import type { TramSize } from '../../theme/tram-tokens'
import type { RadialChartSize, RadialChartSlot } from './radial-chart.type'

const SLOTS = ['root', 'canvas', 'center'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/**
 * Native's ladder: a diameter, and a thickness on the same ladder rather than a fraction
 * of it, so a chart at `sm` beside one at `lg` reads as the smaller of two charts.
 */
export const RADIAL_GEOMETRY: Record<
  RadialChartSize,
  { diameter: number; thickness: number }
> = {
  sm: { diameter: 140, thickness: 10 },
  md: { diameter: 200, thickness: 14 },
  lg: { diameter: 260, thickness: 18 },
}

function sizeAxis(size: RadialChartSize) {
  const { diameter } = RADIAL_GEOMETRY[size]

  return (): SlotStyles<RadialChartSlot> => ({
    root: { width: diameter, height: diameter },
    center: { width: diameter, height: diameter },
  })
}

export const radialChartRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    root: { alignSelf: 'center' },
    // Twelve o'clock, not three — turned on the wrapper, as in Native: `Circle`'s own
    // `rotation` writes an invalid DOM property on the web, and the middle stays upright.
    canvas: { transform: [{ rotate: '-90deg' }] },
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

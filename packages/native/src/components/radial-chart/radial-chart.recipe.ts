import { createRecipe } from '../../system/recipe'
import type { SlotStyles } from '../../system/recipe'
import type { RadialChartSize, RadialChartSlot } from './radial-chart.type'

const SLOTS = ['root', 'canvas', 'center'] as const

/**
 * A ring is **square**, like the pie's and the radar's and unlike every cartesian plot in
 * this family: those span their parent and take a height from `size`, and this takes a
 * diameter. So it has a ladder of its own — and it takes its ink from `chartRecipe` all the
 * same, because a ring is the colour a bar would have been.
 *
 * The thickness is on the same ladder rather than a fraction of the diameter: a ring that
 * scales its own stroke with its box reads as the same figure photographed closer, where a
 * chart at `sm` beside one at `lg` should read as the smaller of two charts.
 */
export const SIZES: Record<
  RadialChartSize,
  { diameter: number; thickness: number }
> = {
  sm: { diameter: 140, thickness: 10 },
  md: { diameter: 200, thickness: 14 },
  lg: { diameter: 260, thickness: 18 },
}

function sizeAxis(size: RadialChartSize) {
  const { diameter } = SIZES[size]

  return (): SlotStyles<RadialChartSlot> => ({
    root: { width: diameter, height: diameter },
    center: { width: diameter, height: diameter },
  })
}

export const radialChartRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    root: { alignSelf: 'center' },
    // Twelve o'clock, not three: a ring that starts at the right reads as already begun.
    //
    // Turned on the **wrapper** rather than on each circle, which is `ProgressCircle`'s
    // arrangement and its reason: `Circle`'s own `rotation` prop emits an invalid DOM
    // property on web, where `react-native-svg` writes it out as `transform-origin`. It
    // also keeps what sits in the middle upright, since that is this element's sibling
    // rather than its child.
    canvas: { transform: [{ rotate: '-90deg' }] },
    // Laid over the canvas rather than inside it: SVG text needs a font file loaded and
    // ignores the platform's text size, and a total in the middle of a ring is a `Text`
    // like any other. `pointerEvents` keeps it from eating a press meant for a ring.
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

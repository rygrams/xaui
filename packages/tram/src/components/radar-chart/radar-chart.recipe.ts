import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import { SVG_FRAME } from '../../system/svg-frame'
import type { TramSize } from '../../theme/tram-tokens'
import { roleType } from '../typography/typography.role'
import type { RadarChartSize, RadarChartSlot } from './radar-chart.type'

const SLOTS = ['root', 'label'] as const

export const DEFAULT_SIZE: TramSize = 'md'

/** A radar is square: `size` is its box, Native's ladder. */
export const RADAR_BOXES: Record<RadarChartSize, number> = {
  sm: 180,
  md: 240,
  lg: 300,
}

/** Wide enough for a word, narrow enough that two neighbours do not meet. */
export const RADAR_LABEL_WIDTH = 64

function sizeAxis(size: RadarChartSize) {
  const box = RADAR_BOXES[size]

  return (): SlotStyles<RadarChartSlot> => ({ root: { width: box, height: box } })
}

export const radarChartRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // The names around the web are placed in its own left-to-right frame.
    root: { alignSelf: 'center', ...SVG_FRAME },
    // The axis names: `caption`, in the muted ink, centred on the point they belong to.
    label: {
      ...roleType('caption', theme),
      color: theme.colors.muted,
      position: 'absolute',
      width: RADAR_LABEL_WIDTH,
      textAlign: 'center',
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

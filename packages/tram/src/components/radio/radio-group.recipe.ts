import { createRecipe } from '@xaui/native/system'
import type { SlotStyles } from '@xaui/native/system'
import { TRAM_TOUCH_TARGET } from '../../theme/tram-tokens'
import type { RadioGroupSlot } from './radio-group.type'
import { DEFAULT_SIZE, RADIO_GEOMETRY } from './radio.recipe'
import type { RadioSize } from './radio.type'

const SLOTS = ['root'] as const

/**
 * The set's one measurement: how far apart the options sit. It is what the circle lacks
 * to reach the touch target, so single-line options land on a pitch of 48 and the slop
 * of one never lies over the slop of the next — in a column and in a row alike.
 */
function pitchAxis(size: RadioSize) {
  const gap = Math.max(TRAM_TOUCH_TARGET - RADIO_GEOMETRY[size].box, 0)

  return (): SlotStyles<RadioGroupSlot> => ({ root: { gap } })
}

/**
 * Along a row the pitch is not enough: at `lg` it equals the gap between a circle and its
 * own label, and a label would read as belonging to either neighbour. Seven steps — 28 —
 * is twice the widest of those gaps, and what the smallest circle lacks to reach 48.
 */
const ROW_GAP = 7

/**
 * The group paints nothing: an option resolves its own colours, because it can be given
 * an `accent` or a `color` the set did not choose.
 */
export const radioGroupRecipe = createRecipe({
  slots: SLOTS,

  variants: {
    size: {
      sm: pitchAxis('sm'),
      md: pitchAxis('md'),
      lg: pitchAxis('lg'),
    },

    orientation: {
      vertical: () => ({ root: { flexDirection: 'column' } }),
      // Wrapping rather than scrolling: a row that overflowed would hide an option.
      horizontal: theme => ({
        root: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          columnGap: theme.spacing(ROW_GAP),
        },
      }),
    },
  },

  defaultVariants: { size: DEFAULT_SIZE, orientation: 'vertical' },
})

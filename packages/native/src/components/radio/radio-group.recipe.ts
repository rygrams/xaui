import { createRecipe } from '../../system/recipe'
import type { SlotStyles } from '../../system/recipe'
import type { XAUITheme } from '../../theme/theme.type'
import type { RadioGroupSlot } from './radio-group.type'
import type { RadioSize } from './radio.type'

const SLOTS = ['root'] as const

/**
 * The set's one measurement: how far apart the options sit. It follows the options' own
 * scale — a 28pt circle needs more air around it than a 20pt one — and it is the same
 * number in both orientations, because a row and a column of the same options should read
 * as the same spacing turned sideways.
 */
const GAPS: Record<RadioSize, number> = { sm: 2.5, md: 3, lg: 3.5 }

function gapAxis(step: number) {
  return (theme: XAUITheme): SlotStyles<RadioGroupSlot> => ({
    root: { gap: theme.spacing(step) },
  })
}

/**
 * The group paints nothing. It has no `variantTokens` and no `paint` for that reason: an
 * option resolves its own colours, because it can be given a `variant` or a `color` the
 * set did not choose, and a group that painted would be painting over the row that
 * disagreed with it.
 */
export const radioGroupRecipe = createRecipe({
  slots: SLOTS,

  variants: {
    size: {
      sm: gapAxis(GAPS.sm),
      md: gapAxis(GAPS.md),
      lg: gapAxis(GAPS.lg),
    },

    orientation: {
      vertical: () => ({ root: { flexDirection: 'column' } }),
      // Wrapping rather than scrolling: three short labels stay one row on a phone and
      // become two on a narrow screen, where a row that overflowed would hide an option.
      horizontal: () => ({
        root: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
      }),
    },
  },

  defaultVariants: { size: 'md', orientation: 'vertical' },
})

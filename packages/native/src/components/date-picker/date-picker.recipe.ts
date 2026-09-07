import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { XAUITheme } from '../../theme/theme.type'
import type { DatePickerSize, DatePickerSlot } from './date-picker.type'

const SLOTS = ['field'] as const

/**
 * **One slot, because everything else already exists.**
 *
 * The trigger *is* a `Select`'s trigger and the panel *is* a `Select`'s panel — the tokens,
 * the four field levels, the anchored surface, all of it — and the grid inside is the
 * `Calendar`'s. Declaring either a second time would be two tables to keep in step, and the
 * drift would show as a select and a date field side by side in a form half a shade apart.
 *
 * What is left is the one measurement neither owns: how much air the calendar gets inside
 * the panel. A list's rows run edge to edge and a month grid must not.
 */
const VARIANT_TOKENS: Record<'default', VariantTokens> = {
  // A single entry, and it is still a table: `resolveTint` only maps roles a variant
  // declared, and the field's tint travels through the `Select`'s table rather than this.
  default: { bg: 'overlay' },
}

/** The panel's inset, in spacing steps, per size. */
const PADDING: Record<DatePickerSize, number> = { sm: 3, md: 3, lg: 4 }

function sizeAxis(size: DatePickerSize) {
  return (theme: XAUITheme): SlotStyles<DatePickerSlot> => ({
    field: { padding: theme.spacing(PADDING[size]) },
  })
}

export const datePickerRecipe = createRecipe({
  slots: SLOTS,

  variantTokens: VARIANT_TOKENS,

  variants: {
    size: { sm: sizeAxis('sm'), md: sizeAxis('md'), lg: sizeAxis('lg') },
  },

  defaultVariants: { size: 'md' },
})

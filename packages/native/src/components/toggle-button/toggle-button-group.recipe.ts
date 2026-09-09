import { createRecipe } from '../../system/recipe'
import type { ToggleButtonGroupOrientation } from './toggle-button-group.type'

const SLOTS = ['root'] as const

export const toggleButtonGroupRecipe = createRecipe({
  slots: SLOTS,
  variants: {
    orientation: {
      horizontal: () => ({
        root: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
      }),
      vertical: () => ({
        root: { flexDirection: 'column', alignItems: 'flex-start' },
      }),
    },
  },
  base: theme => ({ root: { gap: theme.spacing(2) } }),
  defaultVariants: {
    orientation: 'horizontal' satisfies ToggleButtonGroupOrientation,
  },
})

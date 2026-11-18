import { FabIcon } from './fab-icon'
import { FabLabel } from './fab-label'
import { FabSpinner } from './fab-spinner'
import { FabRoot } from './fab'

export const Fab = Object.assign(FabRoot, {
  Icon: FabIcon,
  Label: FabLabel,
  Spinner: FabSpinner,
})

export { useFab } from './fab.context'
export { fabRecipe } from './fab.recipe'
export type {
  FabContextValue,
  FabIconProps,
  FabLabelProps,
  FabPlacement,
  FabProps,
  FabSize,
  FabSlot,
  FabSpinnerProps,
  FabVariant,
} from './fab.type'

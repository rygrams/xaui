import { FabIcon } from './fab-icon'
import { FabLabel } from './fab-label'
import { FabRoot } from './fab'
import { FabSpinner } from './fab-spinner'

export const Fab = Object.assign(FabRoot, {
  Icon: FabIcon,
  Label: FabLabel,
  Spinner: FabSpinner,
})

export { FabRoot } from './fab'
export { FabIcon } from './fab-icon'
export { FabLabel } from './fab-label'
export { FabSpinner } from './fab-spinner'
export { useFab } from './fab.context'
export { fabRecipe } from './fab.recipe'
export type { FabSpinnerProps } from './fab-spinner'
export type {
  FabContextValue,
  FabIconProps,
  FabLabelProps,
  FabPlacement,
  FabProps,
  FabSize,
  FabSlot,
  FabVariant,
} from './fab.type'

import { ToggleButtonIcon } from './toggle-button-icon'
import { ToggleButtonLabel } from './toggle-button-label'
import { ToggleButtonRoot } from './toggle-button'

export const ToggleButton = Object.assign(ToggleButtonRoot, {
  Label: ToggleButtonLabel,
  Icon: ToggleButtonIcon,
})

export { useToggleButton } from './toggle-button.context'
export { toggleButtonRecipe } from './toggle-button.recipe'
export type {
  ToggleButtonContextValue,
  ToggleButtonIconProps,
  ToggleButtonLabelProps,
  ToggleButtonProps,
  ToggleButtonRenderState,
  ToggleButtonSize,
  ToggleButtonSlot,
  ToggleButtonVariant,
} from './toggle-button.type'

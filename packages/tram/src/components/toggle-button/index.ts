import { ToggleButtonGroup } from './toggle-button-group'
import { ToggleButtonIcon } from './toggle-button-icon'
import { ToggleButtonLabel } from './toggle-button-label'
import { ToggleButtonRoot } from './toggle-button'

export const ToggleButton = Object.assign(ToggleButtonRoot, {
  Label: ToggleButtonLabel,
  Icon: ToggleButtonIcon,
  Group: ToggleButtonGroup,
})

export { useToggleButton } from './toggle-button.context'
export { useToggleButtonGroup } from './toggle-button-group.context'
export { toggleButtonGroupRecipe } from './toggle-button-group.recipe'
export { toggleButtonRecipe } from './toggle-button.recipe'
export type {
  ToggleButtonGroupContextValue,
  ToggleButtonGroupOrientation,
  ToggleButtonGroupProps,
  ToggleButtonGroupSlot,
} from './toggle-button-group.type'
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

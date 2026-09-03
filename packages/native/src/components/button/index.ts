import { ButtonIcon } from './button-icon'
import { ButtonLabel } from './button-label'
import { ButtonSpinner } from './button-spinner'
import { ButtonRoot } from './button'

export const Button = Object.assign(ButtonRoot, {
  Label: ButtonLabel,
  Icon: ButtonIcon,
  Spinner: ButtonSpinner,
})

export { useButton } from './button.context'
export { buttonRecipe } from './button.recipe'
export type {
  ButtonContextValue,
  ButtonIconProps,
  ButtonLabelProps,
  ButtonProps,
  ButtonSize,
  ButtonSlot,
  ButtonSpinnerProps,
  ButtonVariant,
} from './button.type'

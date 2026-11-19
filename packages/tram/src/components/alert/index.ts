import { AlertClose } from './alert-close'
import { AlertContent } from './alert-content'
import { AlertDescription } from './alert-description'
import { AlertIcon } from './alert-icon'
import { AlertTitle } from './alert-title'
import { AlertRoot } from './alert'

export const Alert = Object.assign(AlertRoot, {
  Icon: AlertIcon,
  Content: AlertContent,
  Title: AlertTitle,
  Description: AlertDescription,
  Close: AlertClose,
})

export { useAlert } from './alert.context'
export { alertRecipe } from './alert.recipe'
export type {
  AlertCloseProps,
  AlertContentProps,
  AlertContextValue,
  AlertDescriptionProps,
  AlertIconProps,
  AlertProps,
  AlertSize,
  AlertSlot,
  AlertTitleProps,
  AlertVariant,
} from './alert.type'

import { DialogClose } from './dialog-close'
import { DialogContent } from './dialog-content'
import { DialogDescription } from './dialog-description'
import { DialogOverlay } from './dialog-overlay'
import { DialogTitle } from './dialog-title'
import { DialogTrigger } from './dialog-trigger'
import { DialogRoot } from './dialog'

export const Dialog = Object.assign(DialogRoot, {
  Trigger: DialogTrigger,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
})

export { DialogRoot } from './dialog'
export { DialogClose } from './dialog-close'
export { DialogContent } from './dialog-content'
export { DialogDescription } from './dialog-description'
export { DialogOverlay } from './dialog-overlay'
export { DialogTitle } from './dialog-title'
export { DialogTrigger } from './dialog-trigger'
export { useDialog } from './dialog.context'
export { dialogRecipe } from './dialog.recipe'
export type {
  DialogCloseProps,
  DialogContentProps,
  DialogContextValue,
  DialogDescriptionProps,
  DialogMotion,
  DialogOverlayProps,
  DialogPlacement,
  DialogProps,
  DialogSlot,
  DialogTitleProps,
  DialogTriggerProps,
} from './dialog.type'

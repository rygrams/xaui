import { PopoverClose } from './popover-close'
import { PopoverContent } from './popover-content'
import { PopoverDescription } from './popover-description'
import { PopoverOverlay } from './popover-overlay'
import { PopoverTitle } from './popover-title'
import { PopoverTrigger } from './popover-trigger'
import { Popover as PopoverRoot } from './popover'

export const Popover = Object.assign(PopoverRoot, {
  Trigger: PopoverTrigger,
  Overlay: PopoverOverlay,
  Content: PopoverContent,
  Title: PopoverTitle,
  Description: PopoverDescription,
  Close: PopoverClose,
})

export { Popover as PopoverRoot } from './popover'
export { PopoverClose } from './popover-close'
export { PopoverContent } from './popover-content'
export { PopoverDescription } from './popover-description'
export { PopoverOverlay } from './popover-overlay'
export { PopoverTitle } from './popover-title'
export { PopoverTrigger } from './popover-trigger'
export { usePopover } from './popover.context'
export { popoverRecipe } from './popover.recipe'
export type {
  PopoverAlign,
  PopoverAnchor,
  PopoverCloseProps,
  PopoverContentProps,
  PopoverContextValue,
  PopoverDescriptionProps,
  PopoverInsets,
  PopoverOverlayProps,
  PopoverPlacement,
  PopoverProps,
  PopoverSlot,
  PopoverTitleProps,
  PopoverTriggerProps,
  PopoverWidth,
} from './popover.type'

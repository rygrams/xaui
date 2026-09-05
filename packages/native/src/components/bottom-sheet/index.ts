import { BottomSheetClose } from './bottom-sheet-close'
import { BottomSheetContent } from './bottom-sheet-content'
import { BottomSheetDescription } from './bottom-sheet-description'
import { BottomSheetHandle } from './bottom-sheet-handle'
import { BottomSheetOverlay } from './bottom-sheet-overlay'
import { BottomSheetTitle } from './bottom-sheet-title'
import { BottomSheetTrigger } from './bottom-sheet-trigger'
import { BottomSheet as BottomSheetRoot } from './bottom-sheet'

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Trigger: BottomSheetTrigger,
  Overlay: BottomSheetOverlay,
  Content: BottomSheetContent,
  Handle: BottomSheetHandle,
  Title: BottomSheetTitle,
  Description: BottomSheetDescription,
  Close: BottomSheetClose,
})

export { BottomSheet as BottomSheetRoot } from './bottom-sheet'
export { BottomSheetClose } from './bottom-sheet-close'
export { BottomSheetContent } from './bottom-sheet-content'
export { BottomSheetDescription } from './bottom-sheet-description'
export { BottomSheetHandle } from './bottom-sheet-handle'
export { BottomSheetOverlay } from './bottom-sheet-overlay'
export { BottomSheetTitle } from './bottom-sheet-title'
export { BottomSheetTrigger } from './bottom-sheet-trigger'
export { useBottomSheet } from './bottom-sheet.context'
export { bottomSheetRecipe } from './bottom-sheet.recipe'
export type {
  BottomSheetCloseProps,
  BottomSheetContentProps,
  BottomSheetContextValue,
  BottomSheetDescriptionProps,
  BottomSheetHandleProps,
  BottomSheetOverlayProps,
  BottomSheetProps,
  BottomSheetSlot,
  BottomSheetTitleProps,
  BottomSheetTriggerProps,
} from './bottom-sheet.type'

import { BottomSheetClose } from './bottom-sheet-close'
import { BottomSheetContent } from './bottom-sheet-content'
import { BottomSheetDescription } from './bottom-sheet-description'
import { BottomSheetOverlay } from './bottom-sheet-overlay'
import { BottomSheetTitle } from './bottom-sheet-title'
import { BottomSheetTrigger } from './bottom-sheet-trigger'
import { BottomSheetRoot } from './bottom-sheet'

export const BottomSheet = Object.assign(BottomSheetRoot, {
  Trigger: BottomSheetTrigger,
  Overlay: BottomSheetOverlay,
  Content: BottomSheetContent,
  Title: BottomSheetTitle,
  Description: BottomSheetDescription,
  Close: BottomSheetClose,
})

export { BottomSheetRoot } from './bottom-sheet'
export { BottomSheetClose } from './bottom-sheet-close'
export { BottomSheetContent } from './bottom-sheet-content'
export { BottomSheetDescription } from './bottom-sheet-description'
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
  BottomSheetMotion,
  BottomSheetOverlayProps,
  BottomSheetProps,
  BottomSheetSlot,
  BottomSheetTitleProps,
  BottomSheetTriggerProps,
} from './bottom-sheet.type'

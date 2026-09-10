import { SlideButtonFill } from './slide-button-fill'
import { SlideButtonIcon } from './slide-button-icon'
import { SlideButtonLabel } from './slide-button-label'
import { SlideButtonThumb } from './slide-button-thumb'
import { SlideButtonRoot } from './slide-button'

export const SlideButton = Object.assign(SlideButtonRoot, {
  Fill: SlideButtonFill,
  Label: SlideButtonLabel,
  Thumb: SlideButtonThumb,
  Icon: SlideButtonIcon,
})

export { SlideButtonRoot } from './slide-button'
export { SlideButtonFill } from './slide-button-fill'
export { SlideButtonLabel } from './slide-button-label'
export { SlideButtonThumb } from './slide-button-thumb'
export { SlideButtonIcon } from './slide-button-icon'
export { useSlideButton } from './slide-button.context'
export { slideButtonRecipe } from './slide-button.recipe'
export type {
  SlideButtonContextValue,
  SlideButtonFillProps,
  SlideButtonIconProps,
  SlideButtonLabelProps,
  SlideButtonProps,
  SlideButtonSize,
  SlideButtonSlot,
  SlideButtonThumbProps,
  SlideButtonVariant,
} from './slide-button.type'

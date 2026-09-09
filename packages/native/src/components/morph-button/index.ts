import { MorphButtonCollapsed, MorphButtonExpanded } from './morph-button-face'
import { MorphButtonIcon } from './morph-button-icon'
import {
  MorphButtonDescription,
  MorphButtonLabel,
  MorphButtonTitle,
} from './morph-button-text'
import { MorphButtonRoot } from './morph-button'

export const MorphButton = Object.assign(MorphButtonRoot, {
  Collapsed: MorphButtonCollapsed,
  Expanded: MorphButtonExpanded,
  Label: MorphButtonLabel,
  Title: MorphButtonTitle,
  Description: MorphButtonDescription,
  Icon: MorphButtonIcon,
})

export { MorphButtonRoot } from './morph-button'
export { MorphButtonCollapsed, MorphButtonExpanded } from './morph-button-face'
export { MorphButtonIcon } from './morph-button-icon'
export {
  MorphButtonDescription,
  MorphButtonLabel,
  MorphButtonTitle,
} from './morph-button-text'
export { useMorphButton } from './morph-button.context'
export { morphButtonRecipe } from './morph-button.recipe'
export { MORPH_SPRING } from './morph-button.animation'
export type {
  MorphButtonContextValue,
  MorphButtonFaceProps,
  MorphButtonIconProps,
  MorphButtonProps,
  MorphButtonSize,
  MorphButtonSlot,
  MorphButtonTextProps,
  MorphButtonVariant,
  MorphSpring,
} from './morph-button.type'

import { ChipAvatar } from './chip-avatar'
import { ChipClose } from './chip-close'
import { ChipDot } from './chip-dot'
import { ChipIcon } from './chip-icon'
import { ChipLabel } from './chip-label'
import { ChipRoot } from './chip'

export const Chip = Object.assign(ChipRoot, {
  Label: ChipLabel,
  Icon: ChipIcon,
  Dot: ChipDot,
  Avatar: ChipAvatar,
  Close: ChipClose,
})

export { useChip } from './chip.context'
export { chipRecipe } from './chip.recipe'
export type {
  ChipAvatarProps,
  ChipCloseProps,
  ChipContextValue,
  ChipDotProps,
  ChipIconProps,
  ChipLabelProps,
  ChipProps,
  ChipSize,
  ChipSlot,
  ChipVariant,
} from './chip.type'

import { AvatarFallback } from './avatar-fallback'
import { AvatarImage } from './avatar-image'
import { AvatarInitials } from './avatar-initials'
import { AvatarRoot } from './avatar'

export const Avatar = Object.assign(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Initials: AvatarInitials,
})

export { useAvatar } from './avatar.context'
export { avatarRecipe } from './avatar.recipe'
export type {
  AvatarContextValue,
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarInitialsProps,
  AvatarProps,
  AvatarSize,
  AvatarSlot,
  AvatarVariant,
} from './avatar.type'

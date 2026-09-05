import { createSlotContext } from '../../system/slot'
import type { AvatarContextValue } from './avatar.type'

/**
 * R10 — `useAvatar` is exported so a third party can write its own slot (`<Avatar.Status>`)
 * against the same resolved values the built-in ones read, without forking the library.
 * Outside an `<Avatar>` it throws by name rather than failing three frames later on an
 * undefined style.
 */
export const [AvatarProvider, useAvatar] =
  createSlotContext<AvatarContextValue>('Avatar')

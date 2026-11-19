import { createSlotContext } from '@xaui/native/system'
import type { AvatarContextValue } from './avatar.type'

/**
 * `useAvatar` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside an `<Avatar>` it throws by name.
 */
export const [AvatarProvider, useAvatar] =
  createSlotContext<AvatarContextValue>('Tram.Avatar')

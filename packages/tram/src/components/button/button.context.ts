import { createSlotContext } from '@xaui/native/system'
import type { ButtonContextValue } from './button.type'

/**
 * `useButton` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside a `<Button>` it throws by name.
 */
export const [ButtonProvider, useButton] =
  createSlotContext<ButtonContextValue>('Tram.Button')

import { createSlotContext } from '../../system/slot'
import type { ButtonContextValue } from './button.type'

/**
 * R10 — `useButton` is exported so a third party can write its own slot
 * (`<Button.Badge>`) against the same resolved values the built-in ones read, without
 * forking the library. Outside a `<Button>` it throws by name rather than failing three
 * frames later on an undefined style.
 */
export const [ButtonProvider, useButton] =
  createSlotContext<ButtonContextValue>('Button')

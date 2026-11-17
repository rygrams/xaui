import { createSlotContext } from '@xaui/native/system'
import type { CheckboxContextValue } from './checkbox.type'

/**
 * `useCheckbox` is exported so a third party can write its own slot against the values
 * the built-in ones read. Outside a `<Checkbox>` it throws by name.
 */
export const [CheckboxProvider, useCheckbox] =
  createSlotContext<CheckboxContextValue>('Tram.Checkbox')

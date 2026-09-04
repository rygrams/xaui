import { createSlotContext } from '../../system/slot'
import type { CheckboxContextValue } from './checkbox.type'

/**
 * R10 — `useCheckbox` is exported so a third party can write its own slot (a description
 * under the label, an indeterminate dash) against the same resolved values the built-in
 * ones read. Outside a `<Checkbox>` it throws by name rather than failing three frames
 * later on an undefined style.
 */
export const [CheckboxProvider, useCheckbox] =
  createSlotContext<CheckboxContextValue>('Checkbox')

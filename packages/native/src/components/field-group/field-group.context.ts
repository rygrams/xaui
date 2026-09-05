import { createSlotContext } from '../../system/slot'
import type { FieldGroupContextValue } from './field-group.type'

/**
 * R10 — `useFieldGroup` is exported so a third party can write its own decorator against
 * the same measurement the built-in two report into. It carries **only** what the
 * `TextField`'s own context cannot: the two measured widths. Everything visual comes from
 * `useTextField()`, because a group is a `TextField`'s field and its styles were resolved there.
 */
export const [FieldGroupProvider, useFieldGroup] =
  createSlotContext<FieldGroupContextValue>('FieldGroup')

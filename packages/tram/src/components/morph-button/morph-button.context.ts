import { createSlotContext } from '@xaui/native/system'
import type { MorphButtonContextValue } from './morph-button.type'

/**
 * `useMorphButton` is exported so a control inside a face can drive the morph
 * (`onPress={toggle}`) and a third party can write its own slot against the values the
 * built-in ones read. Outside a `<MorphButton>` it throws by name.
 */
export const [MorphButtonProvider, useMorphButton] =
  createSlotContext<MorphButtonContextValue>('Tram.MorphButton')

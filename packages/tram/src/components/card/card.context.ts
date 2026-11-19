import { createSlotContext } from '@xaui/native/system'
import type { CardContextValue } from './card.type'

/**
 * `useCard` is exported so a third party can write its own slot against the values the
 * built-in ones read. Outside a `<Card>` it throws by name.
 */
export const [CardProvider, useCard] =
  createSlotContext<CardContextValue>('Tram.Card')

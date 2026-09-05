import { createSlotContext } from '../../system/slot'
import type { CardContextValue } from './card.type'

/**
 * R10 — `useCard` is exported so a third party can write its own slot (`<Card.Media>`)
 * against the same resolved values the built-in ones read, without forking the library.
 * Outside a `<Card>` it throws by name rather than failing three frames later on an
 * undefined style.
 */
export const [CardProvider, useCard] = createSlotContext<CardContextValue>('Card')

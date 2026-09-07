import { createSlotContext } from '../../system/slot'
import type { FlipCardContextValue } from './flip-card.type'

/**
 * R10 — the live progress and the turn.
 *
 * `progress` is a shared value rather than a number, so a face reads it in a worklet and the
 * turn runs on the UI thread. A button on the back that flips the card back over is
 * `useFlipCard().flip`, and it costs no state of its own.
 */
export const [FlipCardProvider, useFlipCard] =
  createSlotContext<FlipCardContextValue>('FlipCard')

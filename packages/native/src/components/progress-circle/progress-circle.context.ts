import { createSlotContext } from '../../system/slot'
import type { ProgressCircleContextValue } from './progress-circle.type'

/**
 * R10 — `useProgressCircle` carries the resolved geometry, the two stroke colours and the
 * fraction, which is what a slot of your own needs to draw inside the ring: a second arc,
 * a mark at the target, an icon in place of the number.
 *
 * Outside a `<ProgressCircle>` it throws by name.
 */
export const [ProgressCircleProvider, useProgressCircle] =
  createSlotContext<ProgressCircleContextValue>('ProgressCircle')

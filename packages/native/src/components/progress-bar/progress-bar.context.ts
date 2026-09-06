import { createSlotContext } from '../../system/slot'
import type { ProgressBarContextValue } from './progress-bar.type'

/**
 * R10 — `useProgressBar` is exported so a third party can write its own slot against the
 * same resolved values the built-in ones read: a second line under the bar, an estimate
 * beside it, a mark at the point it has to reach. It carries the fraction, so a slot can
 * read the progress without recomputing it from props the root already clamped.
 *
 * Outside a `<ProgressBar>` it throws by name.
 */
export const [ProgressBarProvider, useProgressBar] =
  createSlotContext<ProgressBarContextValue>('ProgressBar')

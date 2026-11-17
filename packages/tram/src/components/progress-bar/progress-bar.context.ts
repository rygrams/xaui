import { createSlotContext } from '@xaui/native/system'
import type { ProgressBarContextValue } from './progress-bar.type'

/**
 * `useProgressBar` is exported so a third party can write its own slot — an estimate
 * beside the bar, a mark at the point it has to reach — against the values the built-in
 * ones read. Outside a `<ProgressBar>` it throws by name.
 */
export const [ProgressBarProvider, useProgressBar] =
  createSlotContext<ProgressBarContextValue>('Tram.ProgressBar')

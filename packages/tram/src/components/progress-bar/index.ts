import { ProgressBarFill } from './progress-bar-fill'
import { ProgressBarHeader } from './progress-bar-header'
import { ProgressBarLabel } from './progress-bar-label'
import { ProgressBarRoot } from './progress-bar'
import { ProgressBarTrack } from './progress-bar-track'
import { ProgressBarValue } from './progress-bar-value'

export const ProgressBar = Object.assign(ProgressBarRoot, {
  Header: ProgressBarHeader,
  Label: ProgressBarLabel,
  Value: ProgressBarValue,
  Track: ProgressBarTrack,
  Fill: ProgressBarFill,
})

export { useProgressBar } from './progress-bar.context'
export { progressBarRecipe } from './progress-bar.recipe'
export type {
  ProgressBarContextValue,
  ProgressBarFillProps,
  ProgressBarProps,
  ProgressBarSize,
  ProgressBarSlot,
  ProgressBarTextSlotProps,
  ProgressBarViewSlotProps,
} from './progress-bar.type'

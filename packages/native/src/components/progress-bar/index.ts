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

export { ProgressBarRoot } from './progress-bar'
export { ProgressBarFill } from './progress-bar-fill'
export { ProgressBarHeader } from './progress-bar-header'
export { ProgressBarLabel } from './progress-bar-label'
export { ProgressBarTrack } from './progress-bar-track'
export { ProgressBarValue } from './progress-bar-value'
export { useProgressBar } from './progress-bar.context'
export { progressBarRecipe } from './progress-bar.recipe'
export type {
  ProgressBarContextValue,
  ProgressBarFillProps,
  ProgressBarProps,
  ProgressBarSize,
  ProgressBarSlot,
  ProgressBarTextSlotProps,
  ProgressBarVariant,
  ProgressBarViewSlotProps,
} from './progress-bar.type'

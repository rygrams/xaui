import { SwitchLabel } from './switch-label'
import { SwitchState } from './switch-state'
import { SwitchThumb } from './switch-thumb'
import { SwitchTrack } from './switch-track'
import { SwitchRoot } from './switch'

export const Switch = Object.assign(SwitchRoot, {
  Track: SwitchTrack,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
  State: SwitchState,
})

export { useSwitch } from './switch.context'
export { switchRecipe } from './switch.recipe'
export type {
  SwitchContextValue,
  SwitchLabelProps,
  SwitchProps,
  SwitchSize,
  SwitchSlot,
  SwitchStateProps,
  SwitchThumbProps,
  SwitchTrackProps,
} from './switch.type'

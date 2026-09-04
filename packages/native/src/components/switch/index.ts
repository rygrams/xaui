import { SwitchLabel } from './switch-label'
import { SwitchThumb } from './switch-thumb'
import { SwitchTrack } from './switch-track'
import { SwitchRoot } from './switch'

export const Switch = Object.assign(SwitchRoot, {
  Track: SwitchTrack,
  Thumb: SwitchThumb,
  Label: SwitchLabel,
})

export { SwitchRoot } from './switch'
export { SwitchLabel } from './switch-label'
export { SwitchThumb } from './switch-thumb'
export { SwitchTrack } from './switch-track'
export { useSwitch } from './switch.context'
export { switchRecipe } from './switch.recipe'
export type {
  SwitchContextValue,
  SwitchLabelProps,
  SwitchProps,
  SwitchSize,
  SwitchSlot,
  SwitchThumbProps,
  SwitchTrackProps,
  SwitchVariant,
} from './switch.type'

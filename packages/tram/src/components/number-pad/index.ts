import { NumberPadRoot } from './number-pad'
import { NumberPadAction } from './number-pad-action'
import { NumberPadBackspace } from './number-pad-backspace'
import { NumberPadIcon } from './number-pad-icon'
import { NumberPadKey } from './number-pad-key'
import { NumberPadLabel } from './number-pad-label'

export const NumberPad = Object.assign(NumberPadRoot, {
  Key: NumberPadKey,
  Backspace: NumberPadBackspace,
  Action: NumberPadAction,
  Label: NumberPadLabel,
  Icon: NumberPadIcon,
})

export { NumberPadRoot } from './number-pad'
export { NumberPadAction } from './number-pad-action'
export { NumberPadBackspace } from './number-pad-backspace'
export { NumberPadIcon } from './number-pad-icon'
export { NumberPadKey } from './number-pad-key'
export { NumberPadLabel } from './number-pad-label'
export { useNumberPad, useNumberPadCell } from './number-pad.context'
export { numberPadRecipe } from './number-pad.recipe'
export type {
  NumberPadActionProps,
  NumberPadBackspaceProps,
  NumberPadCellContextValue,
  NumberPadCellTone,
  NumberPadContextValue,
  NumberPadIconProps,
  NumberPadKeyProps,
  NumberPadLabelProps,
  NumberPadProps,
  NumberPadSize,
  NumberPadSlot,
} from './number-pad.type'

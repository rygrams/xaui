import { NumberPadAction } from './number-pad-action'
import { NumberPadBackspace } from './number-pad-backspace'
import { NumberPadIcon } from './number-pad-icon'
import { NumberPadKey } from './number-pad-key'
import { NumberPadLabel } from './number-pad-label'
import { NumberPadRoot } from './number-pad'

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
export { NUMBER_PAD_ROWS, NUMBER_PAD_ZERO } from './number-pad.utils'
export type {
  NumberPadActionProps,
  NumberPadBackspaceProps,
  NumberPadCellContextValue,
  NumberPadContextValue,
  NumberPadIconProps,
  NumberPadKeyProps,
  NumberPadLabelProps,
  NumberPadProps,
  NumberPadSize,
  NumberPadSlot,
  NumberPadVariant,
} from './number-pad.type'

/**
 * What a key, the backspace and the last key do to the value — named for the root
 * entrypoint they reach, where `removeLast` alone would say nothing of a pad. `@xaui/tram`
 * reads them instead of restating them.
 */
export {
  appendKey as appendPadKey,
  isComplete as isPadComplete,
  removeLast as removePadKey,
} from './number-pad.utils'
export type { AppendOptions as AppendPadKeyOptions } from './number-pad.utils'

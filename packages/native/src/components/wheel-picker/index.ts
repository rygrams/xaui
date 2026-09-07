import { WheelPickerColumn } from './wheel-picker-column'
import { WheelPickerItem } from './wheel-picker-item'
import { WheelPickerRoot } from './wheel-picker'

export const WheelPicker = Object.assign(WheelPickerRoot, {
  Column: WheelPickerColumn,
  Item: WheelPickerItem,
})

export { WheelPickerRoot } from './wheel-picker'
export { WheelPickerColumn } from './wheel-picker-column'
export { WheelPickerItem } from './wheel-picker-item'
export { useWheelPicker, useWheelPickerColumn } from './wheel-picker.context'
export { indexFromOffset, wheelGeometry } from './wheel-picker.geometry'
export { wheelPickerRecipe } from './wheel-picker.recipe'
export type { WheelGeometry } from './wheel-picker.geometry'
export type {
  WheelPickerColumnContextValue,
  WheelPickerColumnProps,
  WheelPickerContextValue,
  WheelPickerItemProps,
  WheelPickerProps,
  WheelPickerSize,
  WheelPickerSlot,
  WheelPickerVariant,
} from './wheel-picker.type'

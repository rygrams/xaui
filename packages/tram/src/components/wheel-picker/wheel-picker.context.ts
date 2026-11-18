import { createSlotContext } from '@xaui/native/system'
import type {
  WheelPickerColumnContextValue,
  WheelPickerContextValue,
} from './wheel-picker.type'

/**
 * R10 — the resolved styles, the colours and the geometry every column measures itself
 * against. Outside a `<WheelPicker>` it throws by name.
 */
export const [WheelPickerProvider, useWheelPicker] =
  createSlotContext<WheelPickerContextValue>('Tram.WheelPicker')

/** One column's turn and its chosen square, for the squares inside it. */
export const [WheelPickerColumnProvider, useWheelPickerColumn] =
  createSlotContext<WheelPickerColumnContextValue>('Tram.WheelPicker.Column')

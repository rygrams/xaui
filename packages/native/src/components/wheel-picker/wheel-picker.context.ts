import { createSlotContext } from '../../system/slot'
import type {
  WheelPickerColumnContextValue,
  WheelPickerContextValue,
} from './wheel-picker.type'

/**
 * R10 — the resolved styles and the geometry every column measures itself against. A third
 * party writing a column of its own needs the row height above all: it is what the snap
 * interval, the padding and the rest position are all computed from.
 *
 * Outside a `<WheelPicker>` it throws by name.
 */
export const [WheelPickerProvider, useWheelPicker] =
  createSlotContext<WheelPickerContextValue>('WheelPicker')

/** One column's scroll position and its chosen row, for the rows inside it. */
export const [WheelPickerColumnProvider, useWheelPickerColumn] =
  createSlotContext<WheelPickerColumnContextValue>('WheelPicker.Column')
